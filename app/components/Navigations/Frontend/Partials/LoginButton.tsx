// LoginButton.tsx
import { useLoaderData, Link, Form } from "@remix-run/react";
import { UserCircleIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/20/solid";
import { json, LoaderFunction } from "@remix-run/node";
import { prisma } from "~/db.server";
import { getSession } from "~/session.server";

import Dropdown from "~/components/Dropdowns/Dropdown";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request);
  const userId = session.get("userId");

  if (!userId) {
    return json({ user: null });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { firstName: true, lastName: true },
  });

  return json({ user });
};

export default function LoginButton() {
  const loaderData = useLoaderData<typeof loader>();
  const user = loaderData?.user ?? null;
  console.log(user);

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