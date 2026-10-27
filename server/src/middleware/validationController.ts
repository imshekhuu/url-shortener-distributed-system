import { validateUrl } from "../validator/urlValidator.js";

const validateUrlMiddleware = async (req: any, res: any, next: any) => {
  const { fullUrl } = req.body;
  const isUrlValid = await validateUrl(fullUrl);
  if (!isUrlValid) {
    return res.status(400).json({ message: "Invalid URL" });
  }
  next();
};
