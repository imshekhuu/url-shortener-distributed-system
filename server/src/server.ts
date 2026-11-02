import "dotenv/config";
import app from "./app/app.js";
import mongoConnection from "./shared/Connections/mongoDb.js";
import postgresDb from "./shared/Connections/postgresDb.js";
import config from "./shared/config/settingConfig.js";
import { producerConnect } from "./producers/clickProducer.js";
import { log } from "node:console";

const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
  try {
    // Connect to Kafka producer
    await producerConnect();
    log("Kafka producer connected successfully");
    // Connect to MongoDB first
    await mongoConnection.connect();
    if (config.POSTGRESQL.enabled) {
      await postgresDb.connect();
    } else {
      console.log(
        "PostgreSQL is not connected: set POSTGRES_ENABLED=true to enable it.",
      );
    }

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
