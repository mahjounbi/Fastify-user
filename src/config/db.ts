import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

export const prisma = new PrismaClient();

export const initDb = async () => {
  console.log('Starting database initialization...');
  const adminEmail = 'admin@corum.com';
  const adminPassword = 'Corum2024';
  const hashedPassword = bcrypt.hashSync(adminPassword, 10);

  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });

  if (!existingAdmin) {
    console.log('Creating default admin user...');
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'Corum',
        birthDate: new Date(),
        role: 'admin',
      },
    });
    console.log('Admin user created.');
  } else {
    console.log('Admin user already exists.');
  }
};

export default prisma;
