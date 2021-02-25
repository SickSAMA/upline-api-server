import { ConnectionOptions } from 'typeorm';
import { DB_HOST, DB_PORT, DB_PASSWORD, DB_NAME, DB_USER, NODE_ENV } from './env';

export function getORMConfig(isMigration = false): ConnectionOptions {
  let options: ConnectionOptions = {
    type: 'postgres',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: false,
    dropSchema: false,
    logging: 'all',
    cache: true,
  };

  if (NODE_ENV === 'production') {
    options = {
      ...options,
      entities: ['build/entities/*.js'],
    };
  } else {
    options = {
      ...options,
      entities: ['src/entities/*.ts'],
    };
  }

  if (isMigration) {
    options = {
      ...options,
      migrations: ['src/migrations/*.ts'],
      cli: {
        migrationsDir: 'src/migrations',
      },
    };
  }

  return options;
}

export default getORMConfig(true);
