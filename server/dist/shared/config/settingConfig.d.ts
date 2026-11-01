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
        AccessTokenCookieName: string;
        RefreshTokenCookieName: string;
        ACCESS_TOKEN_SECRET: string;
        REFRESH_TOKEN_SECRET: string;
        ACCESS_TOKEN_EXPIRATION: string;
        REFRESH_TOKEN_EXPIRATION: string;
    };
    SERVER: {};
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