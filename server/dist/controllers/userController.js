import { createUser } from "../repository/userRepository.js";
import { userValidator } from "../validator/uservalidator.js";
import {} from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";
import settings from "../shared/config/settingConfig.js";
const issueTokens = (user) => {
    const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, ACCESS_TOKEN_EXPIRATION, REFRESH_TOKEN_EXPIRATION, } = settings.AUTH;
    if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
        throw new Error("Authentication secrets are not configured");
    }
    const payload = { id: user._id, email: user.email };
    const accessTokenOptions = {
        expiresIn: ACCESS_TOKEN_EXPIRATION,
    };
    const refreshTokenOptions = {
        expiresIn: REFRESH_TOKEN_EXPIRATION,
    };
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        ...accessTokenOptions,
    });
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
        ...refreshTokenOptions,
    });
    return { accessToken, refreshToken };
};
/**
 * Controller function to register a new user without OAuth.
 * @param req - The Express request object.
 * @param res - The Express response object.
 */
const registerUserWithoutOauth = async (req, res) => {
    const { name, email, password } = req.body;
    if (typeof name !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string") {
        return res.status(400).json({ message: "Name, email, and password are required" });
    }
    const normalizedEmail = email.trim().toLowerCase();
    try {
        const validatedData = userValidator.parse({
            name: name.trim(),
            email: normalizedEmail,
            password,
            authProvider: "local",
            isEmailVerified: false,
        });
        const existingUser = await userModel.findOne({ email: validatedData.email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(validatedData.password, 10);
        const requiredUser = {
            name: validatedData.name,
            email: validatedData.email,
            password: hashedPassword,
            authProvider: validatedData.authProvider,
            isEmailVerified: false, // Set to false for non-OAuth users
        };
        const newUser = await createUser(requiredUser);
        const { accessToken, refreshToken } = issueTokens(newUser);
        // Saev the refresh token in a secure HTTP-only cookie
        res.cookie(settings.AUTH.RefreshTokenCookieName, refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "strict",
        });
        res
            .status(201)
            .json({
            message: "User registered successfully",
            user: newUser,
            accessToken,
        });
    }
    catch (error) {
        if (error instanceof Error && error.name === "ZodError") {
            return res.status(400).json({ message: error.message });
        }
        if (error instanceof Error && error.message === "Email already exists.") {
            return res.status(409).json({ message: "User already exists" });
        }
        if (error instanceof Error &&
            error.message === "Authentication secrets are not configured") {
            return res.status(503).json({ message: "Authentication is not configured" });
        }
        return res.status(500).json({ message: "Failed to register user" });
    }
};
/**
 * Controller function to handle user login.
 * @param req - The Express request object.
 * @param res - The Express response object.
 */
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (typeof email !== "string" || typeof password !== "string") {
        return res.status(400).json({ message: "Email and password are required" });
    }
    try {
        const validatedData = userValidator.pick({ email: true, password: true }).parse({
            email: email.trim().toLowerCase(),
            password,
        });
        const user = await userModel
            .findOne({ email: validatedData.email })
            .select("+password");
        if (!user?.password) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isPasswordValid = await bcrypt.compare(validatedData.password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const { accessToken, refreshToken } = issueTokens(user);
        // Save the refresh token in a secure HTTP-only cookie
        res.cookie(settings.AUTH.RefreshTokenCookieName, refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "strict",
        });
        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                authProvider: user.authProvider,
                googleId: user.googleId,
                isEmailVerified: user.isEmailVerified,
            },
            accessToken,
        });
    }
    catch (error) {
        if (error instanceof Error && error.name === "ZodError") {
            return res.status(400).json({ message: error.message });
        }
        if (error instanceof Error &&
            error.message === "Authentication secrets are not configured") {
            return res.status(503).json({ message: "Authentication is not configured" });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
};
export { registerUserWithoutOauth, loginUser };
//# sourceMappingURL=userController.js.map