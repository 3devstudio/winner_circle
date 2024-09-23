import type { Password, User } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

//Get User by Id
export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id } });
}

//Get User by Email
export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } });
}

//Create User
export async function createUser(email: User["email"], password: string, firstName: string, lastName: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      email,
      firstName,
      lastName,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });
}

//Update
export async function updateUser(
  userId: User["id"],
  updatedDetails: { firstName: string; lastName: string; email: string }
) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      firstName: updatedDetails.firstName,
      lastName: updatedDetails.lastName,
      email: updatedDetails.email,
    },
  });
}

//Soft Delete User by Id
export async function softDeleteUserById(userId: User['id']) {
  return prisma.user.update({
    where: { id: userId },
    data: { deletedAt: new Date() },
  });
}

//Delete User by Email
export async function deleteUserByEmail(email: User["email"]) {
  return prisma.user.delete({ where: { email } });
}

//Restore User by Id
export async function restoreUserById(userId: User['id']) {
  return prisma.user.update({
    where: { id: userId },
    data: { deletedAt: null },
  });
}

//Fetch all users
export async function getAllUsers() {
  return prisma.user.findMany();
}

//Verify Login
export async function verifyLogin(
  email: User["email"],
  password: Password["hash"],
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash,
  );

  if (!isValid) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}

//Update User Password
export async function updateUserPassword(userId: string, newPassword: string) {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await prisma.password.update({
    where: { userId },
    data: { hash: hashedPassword },
  });
}