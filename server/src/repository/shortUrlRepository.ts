import generateShortUrl from "../utils/generateCode.js";
import postgresDb from "../shared/Connections/postgresDb.js";

/**
 * Create a short URL without a user ID.
 * @param {string} fullUrl - The full URL to be shortened.
 * @returns {Promise<{message: string, shortUrl: string}>} - The generated short URL.
 */
const createShortUrlWithoutUser = async (
  fullUrl: string,
): Promise<{ message: string; shortUrl: string }> => {
  const pool = postgresDb.getConnection();
  if (!pool) {
    throw new Error(
      "PostgreSQL is not connected. Set POSTGRES_ENABLED=true and configure PostgreSQL credentials.",
    );
  }

  const existingShortUrl = await pool.query<{ short_code: string }>(
    "SELECT short_code FROM short_urls WHERE full_url = $1",
    [fullUrl],
  );
  if (existingShortUrl.rows[0]) {
    return {
      message: "Short URL already exists",
      shortUrl: existingShortUrl.rows[0].short_code,
    };
  }

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const shortCode = await generateShortUrl(6);
    const result = await pool.query<{ short_code: string }>(
      `
        INSERT INTO short_urls (full_url, short_code)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
        RETURNING short_code
      `,
      [fullUrl, shortCode],
    );

    if (result.rows[0]) {
      return {
        message: "Short URL created successfully",
        shortUrl: result.rows[0].short_code,
      };
    }

    const existing = await pool.query<{ short_code: string }>(
      "SELECT short_code FROM short_urls WHERE full_url = $1",
      [fullUrl],
    );
    if (existing.rows[0]) {
      return {
        message: "Short URL already exists",
        shortUrl: existing.rows[0].short_code,
      };
    }
  }

  throw new Error("Failed to generate a unique short URL code");
};

/** * Retrieve the full URL associated with a short code.
 * @param {string} shortCode - The short code to look up.
 * @returns {Promise<string | undefined>} - The full URL if found, otherwise undefined.
 * */
const findMainUrlByShortCode = async (
  shortCode: string,
): Promise<string | undefined> => {
  // 1. Validate the short code.
  if (!shortCode) {
    throw new Error("Short code is required");
  }

  // 2. Validate the short code length.
  if (shortCode.length !== 6) {
    throw new Error("Short code must be 6 characters long");
  }

  // 3. Get the PostgreSQL connection pool.
  const pool = postgresDb.getConnection();

  if (!pool) {
    throw new Error(
      "PostgreSQL is not connected. Set POSTGRES_ENABLED=true and configure PostgreSQL credentials.",
    );
  }

  try {
    // 4. Query the database.
    const result = await pool.query<{ fullUrl: string }>(
      `SELECT full_url AS "fullUrl"
             FROM short_urls
             WHERE short_code = $1`,
      [shortCode],
    );

    // 5. Return undefined if no matching URL exists.
    const row = result.rows[0];

    if (!row) {
      return undefined;
    }

    // 6. Return the original URL.
    return row.fullUrl;
  } catch (error: unknown) {
    // 7. Log the original error for debugging.
    console.error("Database lookup failed:", error);

    throw new Error("Error finding main URL by short code");
  }
};

export { findMainUrlByShortCode, createShortUrlWithoutUser };
