// app/models/token.server.ts
import { prisma } from "~/db.server";
import { randomBytes } from "crypto";

export async function createPasswordResetToken(userId: string) {
  const token = randomBytes(32).toString("hex");

  await prisma.passwordResetToken.create({
    data: {
      token,
      userId,
      expiresAt: new Date(Date.now() + 3600000),
    },
  });

  return token;
}

export async function getTokenByToken(token: string) {
  return prisma.passwordResetToken.findUnique({
    where: { token },
  });
}