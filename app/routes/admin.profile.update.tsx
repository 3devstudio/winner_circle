import { ActionFunction } from "@remix-run/node";
import { updateUser } from "~/models/user.server";
import { requireUserId } from "~/session.server";

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  
  const updatedDetails = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
  };

  await updateUser(userId, updatedDetails);
};