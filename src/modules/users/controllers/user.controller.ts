import { FastifyReply, FastifyRequest } from 'fastify';
import bcrypt from 'bcrypt';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from '../services/user.service';
import { ParamsWithId, UpdateUserPayload } from '../types/user.type';

export const getAllUsersController = async (_req: FastifyRequest, reply: FastifyReply) => {
  const users = await getAllUsers();
  reply.send(users);
};

export const getUserController = async (
  req: FastifyRequest<ParamsWithId>,
  reply: FastifyReply
) => {
  const { id } = req.params;

  const user = await getUserById(Number(id));
  if (!user) {
    return reply.status(404).send({ error: 'User not found' });
  }

  return reply.send(user);
};

export const createUserController = async (req: FastifyRequest, reply: FastifyReply) => {
  const { email, password, firstName, lastName, birthDate } = req.body as any;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = await createUser({ email, password: hashedPassword, firstName, lastName, birthDate: new Date(birthDate) });
  reply.status(201).send(user);
};

export const updateUserController = async (
  req: FastifyRequest<ParamsWithId & UpdateUserPayload>,
  reply: FastifyReply
) => {
  const { id } = req.params;
  const updates = req.body;

  const updatedUser = await updateUser(Number(id), updates);
  if (!updatedUser) {
    return reply.status(404).send({ error: 'User not found' });
  }

  return reply.send(updatedUser);
};

export const deleteUserController = async (
  req: FastifyRequest<ParamsWithId>,
  reply: FastifyReply
) => {
  const { id } = req.params;

  try {
    await deleteUser(Number(id));
    return reply.status(204).send();
  } catch (error) {
    return reply.status(404).send({ error: 'User not found' });
  }
};
