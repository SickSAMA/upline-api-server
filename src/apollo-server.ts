import { ApolloServer, ApolloServerExpressConfig } from 'apollo-server-express';
import * as TypeORM from 'typeorm';
import * as TypeGraphQL from 'type-graphql';
import { Container } from 'typedi';
import authChecker from './utils/authChecker';

import { User } from './entities/user';
import { Recipe } from './entities/recipe';
import { Rate } from './entities/rate';
import { Resume } from './entities/resume';
import { seedDatabase } from './helpers';
import { RecipeResolver } from './resolvers/recipe-resolver';
import { RateResolver } from './resolvers/rate-resolver';
import { RequestContext } from './types/RequestContext';

import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, DEPLOYMENT_ENV } from './config';

export async function createApolloServer(): Promise<ApolloServer> {
  TypeORM.useContainer(Container);

  await TypeORM.createConnection({
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
  });

  await seedDatabase();

  const schema = await TypeGraphQL.buildSchema({
    resolvers: [RecipeResolver, RateResolver],
    container: Container,
    authChecker,
  });

  const apolloServerConig: ApolloServerExpressConfig = {
    schema,
    context: ({ req }): RequestContext => {
      return { user: req.user };
    },
  };

  if (DEPLOYMENT_ENV !== 'Production') {
    apolloServerConig.introspection = true;
    apolloServerConig.playground = true;
  }

  return new ApolloServer(apolloServerConig);
}
