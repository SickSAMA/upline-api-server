import { ConnectionOptions } from 'typeorm';
import { DB_HOST, DB_PORT, DB_PASSWORD, DB_NAME, DB_USER } from './env';
import { User } from '../entities/user';
import { Recipe } from '../entities/recipe';
import { Rate } from '../entities/rate';
import { Resume } from '../entities/resume';

export function getORMConfig(isMigration = false): ConnectionOptions {
  let options: ConnectionOptions = {
    type: 'postgres',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    entities: [Recipe, Rate, User, Resume],
    synchronize: false,
    dropSchema: false,
    logging: 'all',
    cache: true,
  };

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
