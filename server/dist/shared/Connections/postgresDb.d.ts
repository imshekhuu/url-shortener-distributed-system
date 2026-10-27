declare const Pool: typeof import("pg").Pool;
type PoolType = InstanceType<typeof Pool>;
/**
 * PostgreSQL database manager/connector
 */
declare class PostgresConnection {
    private pool;
    /**
     * Connect to PostgreSQL
     */
    connect(): Promise<PoolType>;
    /**
     * Disconnect PostgreSQL
     */
    disconnect(): Promise<void>;
    /**
     * Get active connection pool
     */
    getConnection(): PoolType | null;
}
declare const _default: PostgresConnection;
export default _default;
//# sourceMappingURL=postgresDb.d.ts.map