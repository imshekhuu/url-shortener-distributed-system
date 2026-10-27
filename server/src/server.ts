
import "dotenv/config";
import routes from "./routes/apiRoute.js";

import app from "./app/app.js";
import mongoConnection from "./shared/Connections/mongoDb.js";
import postgresDb from "./shared/Connections/postgresDb.js";

const PORT = Number(process.env.PORT) || 3000;
routes.use("/api", routes);

async function startServer() {
    try {
        // Connect to MongoDB first
        await mongoConnection.connect();
        await postgresDb.connect()

        // Start the Express server
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exitCode = 1;
    }
}

startServer();
