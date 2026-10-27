import pg from "pg";
import config from "../config/settingConfig.js";

const { Pool } = pg;

type PoolType = InstanceType<typeof Pool>;

/**
 * PostgreSQL database manager/connector
 */
class PostgresConnection {
  private pool: PoolType | null = null;

  /**
   * Connect to PostgreSQL
   */
  async connect(): Promise<PoolType> {
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
      await pool.query(`
        CREATE TABLE IF NOT EXISTS short_urls (
          id BIGSERIAL PRIMARY KEY,
          full_url TEXT NOT NULL UNIQUE,
          short_code VARCHAR(32) NOT NULL UNIQUE,
          clicks INTEGER NOT NULL DEFAULT 0 CHECK (clicks >= 0),
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `);

      this.pool = pool;

      console.log(`PostgreSQL connected: ${config.POSTGRESQL.database}`);

      pool.on("error", (err: Error) => {
        console.error("PostgreSQL pool error:", err);
      });

      return pool;
    } catch (error) {
      console.error("Failed to connect to PostgreSQL:", error);
      throw error;
    }
  }

  /**
   * Disconnect PostgreSQL
   */
  async disconnect(): Promise<void> {
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
  getConnection(): PoolType | null {
    return this.pool;
  }
}

export default new PostgresConnection();
