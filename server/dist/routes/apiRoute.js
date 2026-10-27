import { Router } from "express";
import authRouter from "./v1/authRoute/authRoute.js";
import shortUrlRoute from "./v1/shortUrlRoute/urlRoute.js";
const routes = Router();
// Mount routes
routes.use("/auth", authRouter);
routes.use("/url", shortUrlRoute);
export default routes;
//# sourceMappingURL=apiRoute.js.map