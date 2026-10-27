import { Router } from "express";
import authRouter from "./v1/authRoute/authRoute.js";
const routes = Router();
// Mount routes
routes.use("/auth", authRouter);
export default routes;
//# sourceMappingURL=apiRoute.js.map