import { json, ActionFunction } from "@remix-run/node";
import { restoreUserById } from "~/models/user.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const userId = formData.get("userId") as string;

  if (userId) {
    await restoreUserById(userId);
  }

  return json({ success: true });
};