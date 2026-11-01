import { validateUrl } from "../validator/urlValidator.js";
import type { NextFunction, Request, Response } from "express";

const validateUrlMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { fullUrl } = req.body as { fullUrl?: unknown };
  const isUrlValid = await validateUrl(fullUrl);
  if (!isUrlValid) {
    res.status(400).json({ message: "Invalid URL" });
    return;
  }
  next();
};

export default validateUrlMiddleware;
