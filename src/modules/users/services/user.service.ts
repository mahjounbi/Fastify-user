import { prisma } from '../../../config/db';
import { User, Prisma } from '@prisma/client';

export const getAllUsers = async (): Promise<User[]> => {
  return prisma.user.findMany();
};

export const getUserById = async (id: number): Promise<User | null> => {
  return prisma.user.findUnique({ where: { id } });
};

export const createUser = async (userData: Prisma.UserCreateInput): Promise<User> => {
  return prisma.user.create({ data: userData });
};

export const updateUser = async (id: number, updates: Prisma.UserUpdateInput): Promise<User> => {
  return prisma.user.update({ where: { id }, data: updates });
};

export const deleteUser = async (id: number): Promise<User> => {
  return prisma.user.delete({ where: { id } });
};
