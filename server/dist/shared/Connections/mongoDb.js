import mongoose from "mongoose";
import config from "../config/settingConfig.js";
/**
 * MongoDB database manager/connector
 */
class MongoConnection {
    connection = null;
    /**
     * Connect to MongoDB
     * @returns {Promise<typeof mongoose>}
     */
    async connect() {
        try {
            if (this.connection) {
                return this.connection;
            }
            await mongoose.connect(config.MONGODB.mongoURI);
            this.connection = mongoose;
            console.log(`MongoDB connected: ${config.MONGODB.mongoURI}`);
            mongoose.connection.on("error", (err) => {
                console.error("MongoDB connection error:", err);
            });
            mongoose.connection.on("disconnected", () => {
                console.error("MongoDB disconnected");
                this.connection = null;
            });
            return this.connection;
        }
        catch (error) {
            console.error("Failed to connect to MongoDB:", error);
            throw error;
        }
    }
    /**
     * Disconnect the active MongoDB connection
     */
    async disconnect() {
        try {
            if (this.connection) {
                await mongoose.disconnect();
                this.connection = null;
                console.log("MongoDB disconnected!");
            }
        }
        catch (error) {
            console.error("Failed to disconnect MongoDB:", error);
            throw error;
        }
    }
    /**
     * Get the active MongoDB connection
     */
    getConnection() {
        return this.connection;
    }
}
export default new MongoConnection();
//# sourceMappingURL=mongoDb.js.map