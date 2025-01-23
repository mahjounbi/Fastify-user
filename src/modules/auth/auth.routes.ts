import { FastifyInstance } from 'fastify';
import { loginController, verifyTokenController } from './auth.controller';

const authRoutes = async (app: FastifyInstance) => {
  app.post('/auth/login', {
    schema: {
      description: 'Authenticate a user and return a JWT token',
      tags: ['Auth'],
      body: {
        type: 'object',
        properties: {
          email: { type: 'string', format: 'email', description: 'User email' },
          password: { type: 'string', description: 'User password' },
        },
        required: ['email', 'password'],
      },
      response: {
        200: {
          description: 'Authentication successful',
          type: 'object',
          properties: {
            token: { type: 'string', description: 'JWT token' },
          },
        },
        401: {
          description: 'Invalid credentials',
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
    },
    handler: loginController,
  });

  app.get('/auth/verify', {
    schema: {
      description: 'Verify if a provided JWT token is valid',
      tags: ['Auth'],
      security: [{ bearerAuth: [] }],
      response: {
        200: {
          description: 'Token is valid',
          type: 'object',
          properties: {
            valid: { type: 'boolean', example: true },
            user: {
              type: 'object',
              properties: {
                id: { type: 'string', description: 'User Id' },
                email: { type: 'string', description: 'User email' },
              },
            },
          },
        },
        401: {
          description: 'Invalid or missing token',
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
    },
    handler: verifyTokenController,
  });
};

export default authRoutes;

