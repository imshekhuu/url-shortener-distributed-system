import express, { type ErrorRequestHandler } from "express";
import routes from "../routes/apiRoute.js";
import morgan from "morgan";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

// Health check
app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "URL Shortener API is running",
  });
});

// API routes
app.use("/api", routes);
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
