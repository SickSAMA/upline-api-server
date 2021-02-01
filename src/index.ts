import 'reflect-metadata';
import http from 'http';
import express from 'express';
import cookieParser from 'cookie-parser';
import { createApolloServer } from './apollo-server';
import jwt from './middlewares/jwt';
import { PORT } from './config';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(jwt());

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

    httpServer.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
}

bootstrap();
