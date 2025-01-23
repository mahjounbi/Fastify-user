import { FastifyReply, FastifyRequest } from 'fastify';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../../config/db';
import { config } from '../../config';

export const loginController = async (req: FastifyRequest, reply: FastifyReply) => {
  const { email, password } = req.body as any;

  if (!email || !password) {
    return reply.status(400).send({ error: 'Email and password are required.' });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return reply.status(401).send({ error: 'Invalid credentials.' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    config.jwtSecret,
    { expiresIn: '1h' }
  );

  reply.send({ token, user: { id: user.id, email: user.email, role: user.role } });
};

export const verifyTokenController = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return reply.status(401).send({ error: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, config.jwtSecret);
    reply.send({ valid: true, decoded });
  } catch (error) {
    return reply.status(401).send({ error: 'Invalid or expired token.' });
  }
};
