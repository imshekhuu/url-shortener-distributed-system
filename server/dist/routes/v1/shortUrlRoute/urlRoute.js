import { Router } from "express";
import { createShortUrlwithoutUser } from "../../../controllers/shortUrlController.js";
const urlRoute = Router();
// Define your URL routes here
urlRoute.post("/createUrlWithoutUser", createShortUrlwithoutUser); // Example route for creating a short URL without user authentication
export default urlRoute;
//# sourceMappingURL=urlRoute.js.map