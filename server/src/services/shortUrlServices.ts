import generateCode from "../utils/generateCode.js"
import { saveShortUrl, cu } from "../repository/shortUrlRepository.js"

export const createShortUrlWithoutUser = async (url: string) => {
    const shortUrl = generateCode()
    if(!shortUrl) throw new Error("Short URL not generated")
    await saveShortUrl(shortUrl,url)
    return shortUrl
}

export const createShortUrlWithUser = async (url: string, userId: string, slug: string | null = null) => {
    const shortUrl = slug || generateCode()
    const exists = await getCustomShortUrl(slug)
    if(exists) throw new Error("This custom url already exists")

    await saveShortUrl(shortUrl,url,userId)
    return shortUrl
}