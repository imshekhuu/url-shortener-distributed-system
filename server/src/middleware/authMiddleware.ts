import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import settings from "../shared/config/settingConfig.js";

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;

  // 1. Check authorization header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      message: "Unauthorized: Token missing",
    });
    return;
  }

  // 2. Extract token
  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({
      message: "Unauthorized: Invalid token format",
    });
    return;
  }

  try {
    // 3. Verify token
    const secret = settings.AUTH.ACCESS_TOKEN_SECRET;
    if (!secret) {
      res.status(500).json({ message: "Authentication is not configured" });
      return;
    }

    const decoded = jwt.verify(token, secret);

    // 4. Attach decoded payload to request
    req.user = decoded;

    // 5. Move to next middleware/controller
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized: Invalid or expired token",
    });
    return;
  }
};

export default authMiddleware;
