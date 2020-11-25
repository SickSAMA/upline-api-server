import 'reflect-metadata';
import http from 'http';
import express from 'express';
import cookieParser from 'cookie-parser';
import { createApolloServer } from './apollo-server';
import { port } from './config';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

// Health check
app.get('/ping', (_, res) => {
  res.send('pong');
});

async function bootstrap() {
  try {
    const apolloServer = await createApolloServer();
    apolloServer.applyMiddleware({
      app,
      path: '/graphql',
    });
    const httpServer = http.createServer(app);

    httpServer.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

bootstrap();
