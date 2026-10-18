import { Router } from "express";

const authRouter = Router();

authRouter.post("/login", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Login route working",
    });
});

authRouter.post("/register", (req, res) => {
    res.status(201).json({
        success: true,
        message: "Register route working",
    });
});

export default authRouter;