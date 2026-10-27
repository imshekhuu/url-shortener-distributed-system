import { Router } from "express";
import { createShortUrlwithoutUser, redirectShortUrl } from "../../../controllers/shortUrlController.js";

const urlRoute = Router();

// Define your URL routes here
urlRoute.post("/createUrlWithoutUser", createShortUrlwithoutUser);  // Example route for creating a short URL without user authentication
urlRoute.get("/:shortCode", redirectShortUrl);

export default urlRoute;