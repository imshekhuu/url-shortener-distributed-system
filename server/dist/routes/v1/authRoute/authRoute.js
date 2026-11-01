import { Router } from "express";
import { registerUserWithoutOauth, loginUser } from "../../../controllers/userController.js";
const authRouter = Router();
authRouter.post("/register", registerUserWithoutOauth);
authRouter.post("/login", loginUser);
export default authRouter;
//# sourceMappingURL=authRoute.js.map