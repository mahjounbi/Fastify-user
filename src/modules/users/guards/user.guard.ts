import { FastifyReply, FastifyRequest } from 'fastify';

export const validateUserPayload = async (req: FastifyRequest, reply: FastifyReply) => {
  const { email, password, firstName, lastName, birthDate } = req.body as any;

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return reply.status(400).send({ error: 'Invalid email format.' });
  }

  if (!password || typeof password !== 'string' || password.length < 8) {
    return reply.status(400).send({ error: 'Password must be at least 8 characters long.' });
  }

  if (!firstName || typeof firstName !== 'string') {
    return reply.status(400).send({ error: 'First name is required.' });
  }

  if (!lastName || typeof lastName !== 'string') {
    return reply.status(400).send({ error: 'Last name is required.' });
  }

  if (!birthDate || isNaN(new Date(birthDate).getTime())) {
    return reply.status(400).send({ error: 'Invalid birth date.' });
  }
};
