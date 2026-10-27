import type { Request, Response } from "express";
import { createShortUrlWithoutUser } from "../repository/shortUrlRepository.js";   
import { validateUrl } from "../validator/urlValidator.js";

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

    const {fullUrl} = req.body;

    if(!fullUrl) {
        return res.status(400).json({ message: "No data provided" });
    }

    const isUrlValid = await validateUrl(fullUrl);
    if (!isUrlValid) {
        return res.status(400).json({ message: "Invalid URL" });
    }

    try {

        const result = await createShortUrlWithoutUser(fullUrl);

        return res.status(200).json(result);

    } catch (error) {
        console.error("Error creating short URL:", error);
        return res.status(500).json({ message: "Failed to create short URL" });
    }

};



export { createShortUrlwithoutUser };