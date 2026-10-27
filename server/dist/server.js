import "dotenv/config";
import routes from "./routes/apiRoute.js";
import morgan from "morgan";
import app from "./app/app.js";
import mongoConnection from "./shared/Connections/mongoDb.js";
import postgresDb from "./shared/Connections/postgresDb.js";
import config from "./shared/config/settingConfig.js";
const PORT = Number(process.env.PORT) || 3000;
async function startServer() {
    try {
        // Connect to MongoDB first
        await mongoConnection.connect();
        if (config.POSTGRESQL.enabled) {
            await postgresDb.connect();
        }
        else {
            console.log("PostgreSQL is not connected: set POSTGRES_ENABLED=true to enable it.");
        }
        // Start the Express server
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("Failed to start server:", error);
        process.exitCode = 1;
    }
}
startServer();
//# sourceMappingURL=server.js.map