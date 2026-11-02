import type { Request, Response } from "express";
import {
  createShortUrlWithoutUser,
  findMainUrlByShortCode,
  createShortUrlWithUser as createShortUrlForUser,
} from "../repository/shortUrlRepository.js";
import { validateUrl } from "../validator/urlValidator.js";
import { redis } from "../shared/config/redis.js";
import { sendMessage } from "../producers/clickProducer.js";
import PostgresConnection from "../shared/Connections/postgresDb.js";
import postgresDb from "../shared/Connections/postgresDb.js";
import { randomUUID } from "crypto";

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

  if (!shortCode) {
    return res.status(400).json({
      message: "Short code is required",
    });
  }

  const pool = postgresDb.getConnection();

  if (!pool) {
    throw new Error("PostgreSQL is not connected. Set POSTGRES_ENABLED=true.");
  }

  try {
    let originalUrl = await redis.get(`url:${shortCode}`);

    // 1. Redis cache hit
    if (originalUrl) {
      console.log("Redis Cache HIT");

      return res.redirect(originalUrl);
    }

    // 2. Redis cache miss -> PostgreSQL
    console.log("Redis Cache MISS");

    const result = await pool.query(
      `SELECT original_url
             FROM urls
             WHERE short_code = $1`,
      [shortCode],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "URL not found",
      });
    }

    originalUrl = result.rows[0].original_url;

    // 3. Store the result in Redis
    await redis.set(`url:${shortCode}`, originalUrl, "EX", 3600);


    const clickEvent = {
        eventId: randomUUID(),
        shortUrl: shortCode,
        clickedAt: new Date().toISOString(),
        referrer: req.get("Referrer") || null,
        userAgent: req.get("User-Agent") || null,
    };

    await sendMessage({ shortUrl: shortCode.toString() }, clickEvent);

    // 4. Redirect
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
        function randomUUID() {
            throw new Error("Function not implemented.");
        }

