// admin.profile._index.tsx
import { redirect, json, LoaderFunction, ActionFunction } from "@remix-run/node";
import { useLoaderData, Form, useActionData, useNavigation } from "@remix-run/react";
import AdminLayout from "../layouts/AdminLayout";
import Input from "../components/Inputs/Input";
import { getUserById, updateUser } from "~/models/user.server";
import { requireUserId } from "~/session.server";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import Button from "../components/Buttons/Button";

type LoaderData = {
  user: Awaited<ReturnType<typeof getUserById>> | null;
};

type ActionData = {
  success?: boolean;
  error?: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const user = await getUserById(userId);

  if (!user) {
    throw new Response("User not found", { status: 404 });
  }

  return json<LoaderData>({ user });
};

export const action: ActionFunction = async ({ request }) => {
  try {
    const userId = await requireUserId(request);
    const formData = await request.formData();

    const updatedDetails = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
    };

    await updateUser(userId, updatedDetails);
    return json<ActionData>({ success: true });
  } catch (error) {
    console.error("Error updating user:", error);
    return json<ActionData>({ error: "Failed to update user details." }, { status: 500 });
  }
};

const UserProfile: React.FC = () => {
  const { user } = useLoaderData<LoaderData>();
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();

  // Local state for form fields
  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [email, setEmail] = useState(user?.email ?? "");

  // Display success or error messages
  useEffect(() => {
    if (actionData?.success) {
      toast.success("Profile updated successfully!");
    } else if (actionData?.error) {
      toast.error(actionData.error);
    }
  }, [actionData]);

  // Check if the form is currently submitting
  const isSubmitting = navigation.state === "submitting";

  return (
    <AdminLayout>
      <Form method="post" className="w-1/3 p-4 md:p-8 flex flex-col gap-4">
        <div className="w-full">
          <Input
            type="text"
            name="firstName"
            label="First Name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="w-full">
          <Input
            type="text"
            name="lastName"
            label="Last Name"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="w-full">
          <Input
            type="email"
            name="email"
            label="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button primary type="submit" className="mt-4" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Profile"}
        </Button>
      </Form>
      <ToastContainer autoClose={5000} />
    </AdminLayout>
  );
};

export default UserProfile;