import { ApolloServer } from 'apollo-server-express';
import * as TypeORM from 'typeorm';
import * as TypeGraphQL from 'type-graphql';
import { Container } from 'typedi';

import { User } from './entities/user';
import { Recipe } from './entities/recipe';
import { Rate } from './entities/rate';
import { seedDatabase } from './helpers';
import { RecipeResolver } from './resolvers/recipe-resolver';
import { RateResolver } from './resolvers/rate-resolver';

import { dbHost, dbPort, dbUser, dbPassword, dbName } from './config';

export interface Context {
  user: User
}

export async function createApolloServer(): Promise<ApolloServer> {
  TypeORM.useContainer(Container);

  await TypeORM.createConnection({
    type: 'postgres',
    host: dbHost,
    port: dbPort,
    username: dbUser,
    password: dbPassword,
    database: dbName,
    entities: [Recipe, Rate, User],
    synchronize: true,
    logging: 'all',
    dropSchema: true,
    cache: true,
  });

  const { defaultUser } = await seedDatabase();

  const schema = await TypeGraphQL.buildSchema({
    resolvers: [RecipeResolver, RateResolver],
    container: Container,
  });

  return new ApolloServer({
    schema,
    context: (/* { req } */) => {
      // We can use req to retrieve the real user
      // Here we just use the defaultUser for demo purpose
      return { defaultUser };
    },
  });
}
