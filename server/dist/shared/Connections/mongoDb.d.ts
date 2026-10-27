import mongoose from "mongoose";
/**
 * MongoDB database manager/connector
 */
declare class MongoConnection {
    private connection;
    /**
     * Connect to MongoDB
     * @returns {Promise<typeof mongoose>}
     */
    connect(): Promise<typeof mongoose>;
    /**
     * Disconnect the active MongoDB connection
     */
    disconnect(): Promise<void>;
    /**
     * Get the active MongoDB connection
     */
    getConnection(): typeof mongoose | null;
}
declare const _default: MongoConnection;
export default _default;
//# sourceMappingURL=mongoDb.d.ts.map