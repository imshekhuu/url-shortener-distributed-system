import { type Request, type Response } from "express";
/**
 * Controller function to register a new user without OAuth.
 * @param req - The Express request object.
 * @param res - The Express response object.
 */
declare const registerUserWithoutOauth: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Controller function to handle user login.
 * @param req - The Express request object.
 * @param res - The Express response object.
 */
declare const loginUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { registerUserWithoutOauth, loginUser };
//# sourceMappingURL=userController.d.ts.map