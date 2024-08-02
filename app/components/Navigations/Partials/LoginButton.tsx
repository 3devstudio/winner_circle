// LoginButton.tsx
import { Link, useLoaderData, Form } from "@remix-run/react";
import { UserCircleIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/20/solid";
import { getUser } from "~/session.server";
import type { LoaderFunction } from "@remix-run/node";
import Dropdown from "~/components/Dropdowns/Dropdown";

// Fetch user data in loader
export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  return { user };
};

export default function LoginButton() {
  const { user } = useLoaderData<{ user: { firstName: string; lastName: string } | null }>();

  const renderUserIcon = () => {
    if (user && user.firstName && user.lastName) {
      const initials = `${user.firstName[0]}${user.lastName[0]}`;
      return (
        <Dropdown triggerText={initials} triggerClassName="flex items-center justify-center h-8 w-8 rounded-full bg-orange-50 text-primary transition ml-4 focus:ring focus:ring-primary" showChevron={false}>
          <Link to="/admin/dashboard" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
            Dashboard
          </Link>
          <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
            Profile
          </Link>
          <Form action="/logout" method="post" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
            <button type="submit" className="flex items-center gap-2">
              <ArrowLeftOnRectangleIcon className="h-5 w-5 text-gray-800" />
              <span>Logout</span>
            </button>
          </Form>
        </Dropdown>
      );
    } else {
      return (
        <Link to="/login" className="my-auto">
          <UserCircleIcon className="h-8 w-8 text-stone-300 hover:text-slate-100 transition ml-4" />
        </Link>
      );
    }
  };

  return (
    <div className="my-auto">
      {renderUserIcon()}
    </div>
  );
}
