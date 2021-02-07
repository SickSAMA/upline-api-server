export const NODE_ENV: string = process.env.NODE_ENV || '';
export const PORT: string = process.env.PORT || '';
export const DB_HOST: string = process.env.DB_HOST || '';
export const DB_PORT: number = (process.env.DB_PORT && +process.env.DB_PORT) || 5432;
export const DB_USER: string = process.env.DB_USER || '';
export const DB_PASSWORD: string = process.env.DB_PASSWORD || '';
export const DB_NAME: string = process.env.DB_NAME || '';
export const COGNITO_POOL_ID: string = process.env.COGNITO_POOL_ID || '';
export const COGNITO_POOL_REGION: string = process.env.COGNITO_POOL_REGION || '';
export const DEPLOYMENT_ENV: string = process.env.DEPLOYMENT_ENV || '';
