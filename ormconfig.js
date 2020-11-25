// this option file is only used for db migration
// typeorm will automatically load .env
module.exports = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  type: 'postgres',
  database: process.env.DB_NAME,
  entities: ['src/entities/*.ts'],
  logging: 'all',
  migrations: ['src/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
