declare namespace NodeJS {
    interface ProcessEnv {
        readonly PORT: any;
        readonly BASE_URL: string;
        readonly DB: string;
        readonly NODE_ENV: string;
        readonly JWT_SECRET_KEY: string;
        readonly JWT_EXPIRED_TIME: string;
    }
}