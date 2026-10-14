
import express, { type Request, type Response } from "express";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("URL Shortener API is running!");
});

export default app;
