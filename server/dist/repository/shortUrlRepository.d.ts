/**
 * Create a short URL without a user ID.
 * @param {string} fullUrl - The full URL to be shortened.
 * @returns {Promise<{message: string, shortUrl: string}>} - The generated short URL.
 */
declare const createShortUrlWithoutUser: (fullUrl: string) => Promise<{
    message: string;
    shortUrl: string;
}>;
/** * Retrieve the full URL associated with a short code.
 * @param {string} shortCode - The short code to look up.
 * @returns {Promise<string | undefined>} - The full URL if found, otherwise undefined.
 * */
declare const findMainUrlByShortCode: (shortCode: string) => Promise<string | undefined>;
/** * Create a short URL with a user ID.
 * @param {string} url - The full URL to be shortened.
 * @returns The generated short URL, or an already-existing URL response.
 */
declare const createShortUrlWithUser: (url: string) => Promise<{
    message: string;
    shortUrl: string;
}>;
export { findMainUrlByShortCode, createShortUrlWithoutUser, createShortUrlWithUser };
//# sourceMappingURL=shortUrlRepository.d.ts.map