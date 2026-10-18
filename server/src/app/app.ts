import express, { type ErrorRequestHandler } from "express";
import routes from "../routes/apiRoute.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "URL Shortener API is running",
  });
});

// route 
app.use("/api/v1", routes)

// Global error handler
const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  console.error("Error:", error);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};

app.use(errorHandler);

export default app;
