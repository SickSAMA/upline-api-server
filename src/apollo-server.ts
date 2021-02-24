import { ApolloServer, ApolloServerExpressConfig } from 'apollo-server-express';
import * as TypeORM from 'typeorm';
import * as TypeGraphQL from 'type-graphql';
import { Container } from 'typedi';
import authChecker from './utils/authChecker';

import { seedDatabase } from './helpers';
import { RecipeResolver } from './resolvers/recipe-resolver';
import { RateResolver } from './resolvers/rate-resolver';
import { RequestContext } from './types/RequestContext';

import { DEPLOYMENT_ENV } from './configs/env';
import { getORMConfig } from './configs/ormconfig';

export async function createApolloServer(): Promise<ApolloServer> {
  TypeORM.useContainer(Container);

  await TypeORM.createConnection(getORMConfig());

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
