import mongoose from "mongoose";
import settingConfig from "../config/settingConfig.js";
const mongoConnection = async () => {
    try {
        await mongoose.connect(settingConfig.MONGO_URL || "mongodb://localhost:27017/url_shortener", {});
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
};
export default mongoConnection;
//# sourceMappingURL=db.js.map