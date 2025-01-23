import { FastifyInstance } from 'fastify';
import { authMiddleware } from '../../../utils/middleware';
import { validateUserPayload } from '../guards/user.guard';
import {
  getAllUsersController,
  getUserController,
  createUserController,
  updateUserController,
  deleteUserController,
} from '../controllers/user.controller';
import { ParamsWithId, UpdateUserPayload } from '../types/user.type';

const userRoutes = async (app: FastifyInstance) => {
  app.get('/users', {
    preHandler: authMiddleware,
    schema: {
      description: 'Retrieve all users',
      tags: ['Users'],
      security: [{ bearerAuth: [] }],
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              firstName: { type: 'string' },
              lastName: { type: 'string' },
              email: { type: 'string' },
              birthDate: { type: 'string', format: 'date' },
            },
          },
        },
      },
    },
    handler: getAllUsersController,
  });

  app.get<{ Params: ParamsWithId['Params'] }>('/users/:id', {
    preHandler: authMiddleware,
    schema: {
      description: 'Retrieve user by Id',
      tags: ['Users'],
      security: [{ bearerAuth: [] }],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'User Id' },
        },
        required: ['id'],
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string' },
            birthDate: { type: 'string', format: 'date' },
          },
        },
        404: {
          description: 'User not found',
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
    },
    handler: getUserController,
  });

  app.post('/users', {
    preHandler: [authMiddleware, validateUserPayload],
    schema: {
      description: 'Create a new user',
      tags: ['Users'],
      security: [{ bearerAuth: [] }],
      body: {
        type: 'object',
        properties: {
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          email: { type: 'string' },
          password: { type: 'string' },
          birthDate: { type: 'string', format: 'date' },
        },
        required: ['firstName', 'lastName', 'email', 'password', 'birthDate'],
      },
      response: {
        201: {
          description: 'User created successfully',
          type: 'object',
          properties: {
            id: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string' },
            birthDate: { type: 'string', format: 'date' },
          },
        },
      },
    },
    handler: createUserController,
  });

  app.put<{ Params: ParamsWithId['Params']; Body: UpdateUserPayload['Body'] }>('/users/:id', {
    preHandler: [authMiddleware, validateUserPayload],
    schema: {
      description: 'Update an existing user by Id',
      tags: ['Users'],
      security: [{ bearerAuth: [] }],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'User Id' },
        },
        required: ['id'],
      },
      body: {
        type: 'object',
        properties: {
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          email: { type: 'string' },
          password: { type: 'string' },
          birthDate: { type: 'string', format: 'date' },
        },
        required: ['firstName', 'lastName', 'email', 'birthDate'],
      },
      response: {
        200: {
          description: 'User updated successfully',
          type: 'object',
          properties: {
            id: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string' },
            birthDate: { type: 'string', format: 'date' },
          },
        },
      },
    },
    handler: updateUserController,
  });

  app.delete<{ Params: ParamsWithId['Params'] }>('/users/:id', {
    preHandler: authMiddleware,
    schema: {
      description: 'Delete a user by Id',
      tags: ['Users'],
      security: [{ bearerAuth: [] }],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'User Id' },
        },
        required: ['id'],
      },
      response: {
        200: {
          description: 'User deleted successfully',
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
        404: {
          description: 'User not found',
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
    },
    handler: deleteUserController,
  });
};

export default userRoutes;
