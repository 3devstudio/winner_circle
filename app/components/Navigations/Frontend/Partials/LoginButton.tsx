// LoginButton.tsx
import { Link, Form, useOutletContext } from "@remix-run/react";
import {
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/20/solid";
import Dropdown from "~/components/Dropdowns/Dropdown";

export default function LoginButton() {
  const { user } = useOutletContext<{
    user: { firstName: string; lastName: string } | null;
  }>();

  const renderUserIcon = () => {
    if (user && user.firstName && user.lastName) {
      const initials = `${user.firstName[0]}${user.lastName[0]}`;

      return (
        <Dropdown
          triggerText={initials}
          triggerClassName="flex items-center justify-center h-8 w-8 rounded-full bg-orange-50 text-primary transition ml-4 focus:ring focus:ring-primary"
          showChevron={false}
        >
          <Link
            to="/admin/dashboard"
            className="block px-4 py-2 text-gray-500 hover:bg-gray-100 transition"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/quotes"
            className="block px-4 py-2 text-gray-500 hover:bg-gray-100 transition"
          >
            Quotes
          </Link>
          {/* <Link
            to="/admin/trips"
            className="block px-4 py-2 text-gray-500 hover:bg-gray-100 transition"
          >
            Trips
          </Link> */}
          {/* <Link
            to="/admin/reviews"
            className="block px-4 py-2 text-gray-500 hover:bg-gray-100 transition"
          >
            Reviews
          </Link> */}
          {/* <Link
            to="/admin/photo-library"
            className="block px-4 py-2 text-gray-500 hover:bg-gray-100 transition"
          >
            Photo Library
          </Link> */}
          <Link
            to="/admin/users"
            className="block px-4 py-2 text-gray-500 hover:bg-gray-100 transition"
          >
            Manage Users
          </Link>
          <Link
            to="/admin/profile"
            className="block px-4 py-2 text-gray-500 hover:bg-gray-100 transition"
          >
            Profile
          </Link>
          <Form
            action="/logout"
            method="post"
            className="block px-4 py-2 text-gray-500 hover:bg-gray-100 transition"
          >
            <button type="submit" className="flex items-center gap-2 w-full">
              <ArrowLeftOnRectangleIcon className="h-5 w-5" />
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

  return <div className="my-auto">{renderUserIcon()}</div>;
}
