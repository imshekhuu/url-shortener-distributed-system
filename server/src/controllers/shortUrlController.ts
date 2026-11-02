import type { Request, Response } from "express";
import {
  createShortUrlWithoutUser,
  createShortUrlWithUser as createShortUrlForUser,
} from "../repository/shortUrlRepository.js";
import { validateUrl } from "../validator/urlValidator.js";
import { redis } from "../shared/config/redis.js";
import { sendMessage } from "../producers/clickProducer.js";
import postgresDb from "../shared/Connections/postgresDb.js";
import { randomUUID } from "node:crypto";

/**
 * Controller function to handle the retrieval of a short URL.
 * @param req - The Express request object.
 * @param res - The Express response object.
 */
async function createShortUrlwithoutUser(req: Request, res: Response) {
  //   full: string;
  //   userId?: mongoose.Types.ObjectId;
  //   short: string;
  //   clicks: number;

  const { fullUrl } = req.body as { fullUrl?: unknown };

  if (typeof fullUrl !== "string" || !fullUrl.trim()) {
    return res.status(400).json({ message: "No data provided" });
  }

  const isUrlValid = await validateUrl(fullUrl);
  if (!isUrlValid) {
    return res.status(400).json({ message: "Invalid URL" });
  }

  try {
    const result = await createShortUrlWithoutUser(fullUrl.trim());
    await redis.set(`url:${result.shortUrl}`, fullUrl);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error creating short URL:", error);
    return res.status(500).json({ message: "Failed to create short URL" });
  }
}

/**
 * Controller function to handle the redirection of a short URL.
 * @param req - The Express request object.
 * @param res - The Express response object.
 */
async function redirectShortUrl(req: Request, res: Response) {
  const { shortCode } = req.params;

  if (typeof shortCode !== "string" || !shortCode) {
    return res.status(400).json({
      message: "Short code is required",
    });
  }

  try {
    let originalUrl = await redis.get(`url:${shortCode}`);

    if (!originalUrl) {
      const pool = postgresDb.getConnection();
      if (!pool) {
        throw new Error(
          "PostgreSQL is not connected. Set POSTGRES_ENABLED=true.",
        );
      }

      const result = await pool.query<{ full_url: string }>(
        "SELECT full_url FROM short_urls WHERE short_code = $1",
        [shortCode],
      );

      if (!result.rows[0]) {
        return res.status(404).json({ message: "URL not found" });
      }

      originalUrl = result.rows[0].full_url;
      await redis.set(`url:${shortCode}`, originalUrl, "EX", 3600);
    }

    const clickEvent = {
      eventId: randomUUID(),
      shortCode,
      clickedAt: new Date().toISOString(),
      referer: req.get("Referer") || null,
      userAgent: req.get("User-Agent") || null,
    };

    await sendMessage({ shortUrl: shortCode }, clickEvent);

    return res.redirect(originalUrl);
  } catch (error) {
    console.error("Error redirecting short URL:", error);

    return res.status(500).json({
      message: "Failed to redirect short URL",
    });
  }
}

async function createShortUrlWithUser(
  req: Request,
  res: Response,
): Promise<Response> {
  const { fullUrl } = req.body as { fullUrl?: unknown };

  if (typeof fullUrl !== "string" || !fullUrl.trim()) {
    return res.status(400).json({ message: "No data provided" });
  }

  const isUrlValid = await validateUrl(fullUrl);
  if (!isUrlValid) {
    return res.status(400).json({ message: "Invalid URL" });
  }

  try {
    const result = await createShortUrlForUser(fullUrl.trim());

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error creating short URL:", error);
    return res.status(500).json({ message: "Failed to create short URL" });
  }
}

export { createShortUrlwithoutUser, redirectShortUrl, createShortUrlWithUser };
