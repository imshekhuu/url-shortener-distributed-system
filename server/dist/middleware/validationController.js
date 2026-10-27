import { validateUrl } from "../validator/urlValidator.js";
const validateUrlMiddleware = async (req, res, next) => {
    const { fullUrl } = req.body;
    const isUrlValid = await validateUrl(fullUrl);
    if (!isUrlValid) {
        return res.status(400).json({ message: "Invalid URL" });
    }
    next();
};
//# sourceMappingURL=validationController.js.map