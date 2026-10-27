declare const settingConfig: {
    MONGODB: {
        mongoURI: string;
        port: number;
    };
    POSTGRESQL: {
        enabled: boolean;
        host: string;
        port: number;
        database: string;
        user: string;
        password: string;
    };
    AUTH: {
        jwtSecret: string;
        AccessTokenExpiry: string;
        RefreshTokenExpiry: string;
        AccessTokenCookieName: string;
        RefreshTokenCookieName: string;
    };
    GOOGLE_AUTH: {
        clientId: string;
        clientSecret: string;
        redirectUri: string;
    };
    REDIS: {
        host: string;
        port: number;
    };
    REBBITMQ: {
        host: string;
        port: number;
    };
};
export default settingConfig;
//# sourceMappingURL=settingConfig.d.ts.map