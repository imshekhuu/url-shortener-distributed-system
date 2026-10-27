import generateShortUrl from "../utils/generateCode.js";
import shortUrlModel from "../model/shortUrlModel.js";

/**
 * Create a short URL without a user ID.
 * @param {string} fullUrl - The full URL to be shortened.
 * @param {string} userId - The user ID associated with the short URL.  
 * @returns {Promise<{message: string, shortUrl: string}>} - The generated short URL.
 */
const createShortUrlWithoutUser = async (
  fullUrl: string,
): Promise<{ message: string; shortUrl: string }> => {
  // Check if the full URL already exists in the database

  const existingShortUrl = await shortUrlModel.findOne({ full: fullUrl });
  if (existingShortUrl) {
    return {
      message: "Short URL already exists",
      shortUrl: existingShortUrl.short,
    };
  }

  // Generate a unique short code
  const shortCode = await generateShortUrl(6);

  try {
    // Create a new short URL document
    const newShortUrl = new shortUrlModel({
      full: fullUrl,
      short: shortCode,
      clicks: 0,
    });
    await newShortUrl.save();

    return {
      message: "Short URL created successfully",
      shortUrl: newShortUrl.short,
    };
  } catch (error) {
    console.error("Error creating short URL:", error);
    throw new Error("Failed to create short URL");
  }
};

// const createShortUrlWithUser = async (

export { createShortUrlWithoutUser };
