// app/routes/add-user.tsx
import { json, redirect, ActionFunction } from "@remix-run/node";
import { createUser, getUserByEmail } from "~/models/user.server";
import { sendPasswordSetupEmail } from "~/services/email.server";
import { createPasswordResetToken } from "~/models/token.server";

// Type the action function with ActionFunction
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.json();
  const { email, firstName, lastName } = formData;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return json({ error: "User already exists" }, { status: 400 });
  }

  // Create the user without a password initially
  const user = await createUser(email, "", firstName, lastName);

  // Generate the password setup token
  const token = await createPasswordResetToken(user.id);

  // Send the password setup email
  await sendPasswordSetupEmail(email, token);

  return json({ success: true });
};