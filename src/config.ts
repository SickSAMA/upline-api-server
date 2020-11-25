export const nodeEnv: string = process.env.NODE_ENV || '';
export const port: string = process.env.PORT || '';
export const dbHost: string = process.env.DB_HOST || '';
export const dbPort: number = (process.env.DB_PORT && +process.env.DB_PORT) || 5432;
export const dbUser: string = process.env.DB_USER || '';
export const dbPassword: string = process.env.DB_PASSWORD || '';
export const dbName: string = process.env.DB_NAME || '';
