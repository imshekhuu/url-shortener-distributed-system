import { Router } from "express";
import { createShortUrlWithUser, createShortUrlwithoutUser, redirectShortUrl, } from "../../../controllers/shortUrlController.js";
import authMiddleware from "../../../middleware/authMiddleware.js";
const urlRoute = Router();
// Define your URL routes here
urlRoute.post("/createUrlWithoutUser", createShortUrlwithoutUser); // Example route for creating a short URL without user authentication
urlRoute.post("/createUrl", authMiddleware, createShortUrlWithUser);
urlRoute.get("/:shortCode", redirectShortUrl);
export default urlRoute;
//# sourceMappingURL=urlRoute.js.map