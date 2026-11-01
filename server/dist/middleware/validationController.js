import { validateUrl } from "../validator/urlValidator.js";
const validateUrlMiddleware = async (req, res, next) => {
    const { fullUrl } = req.body;
    const isUrlValid = await validateUrl(fullUrl);
    if (!isUrlValid) {
        res.status(400).json({ message: "Invalid URL" });
        return;
    }
    next();
};
export default validateUrlMiddleware;
//# sourceMappingURL=validationController.js.map