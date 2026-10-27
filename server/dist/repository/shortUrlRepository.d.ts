/**
 * Create a short URL without a user ID.
 * @param {string} fullUrl - The full URL to be shortened.
 * @param {string} userId - The user ID associated with the short URL.
 * @returns {Promise<{message: string, shortUrl: string}>} - The generated short URL.
 */
declare const createShortUrlWithoutUser: (fullUrl: string) => Promise<{
    message: string;
    shortUrl: string;
}>;
export { createShortUrlWithoutUser };
//# sourceMappingURL=shortUrlRepository.d.ts.map