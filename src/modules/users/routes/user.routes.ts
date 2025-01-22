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
  app.get('/users', { preHandler: authMiddleware }, getAllUsersController);

  app.get<{ Params: ParamsWithId['Params'] }>('/users/:id', { preHandler: authMiddleware }, getUserController);

  app.post('/users', { preHandler: [authMiddleware, validateUserPayload] }, createUserController);

  app.put<{ Params: ParamsWithId['Params']; Body: UpdateUserPayload['Body'] }>(
    '/users/:id',
    { preHandler: [authMiddleware, validateUserPayload] },
    updateUserController
  );

  app.delete<{ Params: ParamsWithId['Params'] }>(
    '/users/:id',
    { preHandler: authMiddleware },
    deleteUserController
  );
};

export default userRoutes;
