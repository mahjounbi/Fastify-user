import { FastifyInstance } from 'fastify';
import { loginController, verifyTokenController } from './auth.controller';

const authRoutes = async (app: FastifyInstance) => {
  app.post('/auth/login', loginController);
  app.get('/auth/verify', verifyTokenController);
};

export default authRoutes;
