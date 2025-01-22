import Fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifyJwt from '@fastify/jwt';
import { config } from './config';
import userRoutes from './modules/users/routes/user.routes';
import authRoutes from './modules/auth/auth.routes';
import { initDb } from './config/db';
import cors from '@fastify/cors';

const app = Fastify();

app.register(fastifySwagger, {
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'API Documentation',
      description: 'Fastify API documentation with Swagger',
      version: '1.0.0',
    },
  },
  exposeRoute: true,
});

app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

app.register(fastifyJwt, {
  secret: config.jwtSecret,
});
app.register(authRoutes, { prefix: '/api' });
app.register(userRoutes, { prefix: '/api' });

export const startApp = async () => {
  try {
    await initDb();
    app.listen({ port: config.port }, (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Server running at ${address}`);
    });
  } catch (error) {
    console.error('Error starting the application:', error);
    process.exit(1);
  }
};

startApp();
