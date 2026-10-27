import generateShortUrl from "../utils/generateCode.js";
import postgresDb from "../shared/Connections/postgresDb.js";
/**
 * Create a short URL without a user ID.
 * @param {string} fullUrl - The full URL to be shortened.
 * @param {string} userId - The user ID associated with the short URL.
 * @returns {Promise<{message: string, shortUrl: string}>} - The generated short URL.
 */
const createShortUrlWithoutUser = async (fullUrl) => {
    const pool = postgresDb.getConnection();
    if (!pool) {
        throw new Error("PostgreSQL is not connected. Set POSTGRES_ENABLED=true and configure PostgreSQL credentials.");
    }
    const existingShortUrl = await pool.query("SELECT short_code FROM short_urls WHERE full_url = $1", [fullUrl]);
    if (existingShortUrl.rows[0]) {
        return {
            message: "Short URL already exists",
            shortUrl: existingShortUrl.rows[0].short_code,
        };
    }
    for (let attempt = 0; attempt < 5; attempt += 1) {
        const shortCode = await generateShortUrl(6);
        const result = await pool.query(`
        INSERT INTO short_urls (full_url, short_code)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
        RETURNING short_code
      `, [fullUrl, shortCode]);
        if (result.rows[0]) {
            return {
                message: "Short URL created successfully",
                shortUrl: result.rows[0].short_code,
            };
        }
        const existing = await pool.query("SELECT short_code FROM short_urls WHERE full_url = $1", [fullUrl]);
        if (existing.rows[0]) {
            return {
                message: "Short URL already exists",
                shortUrl: existing.rows[0].short_code,
            };
        }
    }
    throw new Error("Failed to generate a unique short URL code");
};
// const createShortUrlWithUser = async (
export { createShortUrlWithoutUser };
//# sourceMappingURL=shortUrlRepository.js.map