import type { Request, Response } from "express";
/**
 * Controller function to handle the retrieval of a short URL.
 * @param req - The Express request object.
 * @param res - The Express response object.
 */
declare function createShortUrlwithoutUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * Controller function to handle the redirection of a short URL.
 * @param req - The Express request object.
 * @param res - The Express response object.
 */
declare function redirectShortUrl(req: Request, res: Response): Promise<void | Response<any, Record<string, any>>>;
declare function createShortUrlWithUser(req: Request, res: Response): Promise<Response>;
export { createShortUrlwithoutUser, redirectShortUrl, createShortUrlWithUser };
//# sourceMappingURL=shortUrlController.d.ts.map