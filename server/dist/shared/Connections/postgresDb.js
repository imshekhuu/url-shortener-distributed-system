import pg from "pg";
import config from "../config/settingConfig.js";
const { Pool } = pg;
/**
 * PostgreSQL database manager/connector
 */
class PostgresConnection {
    pool = null;
    /**
     * Connect to PostgreSQL
     */
    async connect() {
        try {
            if (this.pool) {
                return this.pool;
            }
            const pool = new Pool({
                host: config.POSTGRESQL.host,
                port: config.POSTGRESQL.port,
                database: config.POSTGRESQL.database,
                user: config.POSTGRESQL.user,
                password: config.POSTGRESQL.password,
            });
            // Verify connection before storing the pool
            await pool.query("SELECT 1");
            this.pool = pool;
            console.log(`PostgreSQL connected: ${config.POSTGRESQL.database}`);
            pool.on("error", (err) => {
                console.error("PostgreSQL pool error:", err);
            });
            return pool;
        }
        catch (error) {
            console.error("Failed to connect to PostgreSQL:", error);
            throw error;
        }
    }
    /**
     * Disconnect PostgreSQL
     */
    async disconnect() {
        if (this.pool) {
            const pool = this.pool;
            this.pool = null;
            await pool.end();
            console.log("PostgreSQL disconnected!");
        }
    }
    /**
     * Get active connection pool
     */
    getConnection() {
        return this.pool;
    }
}
export default new PostgresConnection();
//# sourceMappingURL=postgresDb.js.map