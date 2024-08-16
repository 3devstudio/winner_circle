import {
  json,
  redirect,
  LoaderFunction,
  ActionFunction,
} from "@remix-run/node";
import { getTokenByToken } from "~/models/token.server";
import { updateUserPassword } from "~/models/user.server";
import { prisma } from "~/db.server";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return redirect("/"); // Redirect if the token is null
  }

  const tokenRecord = await getTokenByToken(token);

  if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
    return redirect("/");
  }

  return json({ token });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = new URLSearchParams(await request.text());
  const password = formData.get("password");
  const token = formData.get("token");

  if (!password || !token) {
    return json({ error: "Missing token or password" }, { status: 400 }); // Handle the case where either is null
  }

  const tokenRecord = await getTokenByToken(token);

  if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
    return json({ error: "Invalid or expired token" }, { status: 400 });
  }

  await updateUserPassword(tokenRecord.userId, password);
  await prisma.passwordResetToken.delete({ where: { token } });

  return redirect("/login");
};
