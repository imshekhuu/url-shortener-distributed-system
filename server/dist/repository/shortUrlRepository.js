import shortUrl from "../model/shortUrlModel.js";
export const saveShortUrl = async (code, url, userId) => {
    try {
        const newShortUrl = new shortUrl({
            full_url: url,
            short_url: code,
        });
        if (userId) {
            newShortUrl.user = userId;
        }
        await newShortUrl.save();
        return newShortUrl;
    }
    catch (error) {
        console.error("Error saving short URL:", error);
        throw error;
    }
};
export const getShortUrl = async (code) => {
    return await shortUrl.findOneAndUpdate({ short_url: code }, { $inc: { clicks: 1 } }, { new: true });
};
export const getCustomShortUrl = async (slug) => {
    return await shortUrl.findOne({ short_url: slug });
};
//# sourceMappingURL=shortUrlRepository.js.map