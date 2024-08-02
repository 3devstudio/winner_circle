import React from "react";
import { Link, useLocation, Form } from "@remix-run/react";

import {
  PencilSquareIcon,
  CalendarIcon,
  StarIcon,
  PhotoIcon,
  UserGroupIcon,
  CogIcon,
  UserCircleIcon,
  Squares2X2Icon,
  ArrowLeftEndOnRectangleIcon
} from "@heroicons/react/24/outline";
import Button from "../../Buttons/Button";

interface SidebarNavProps {}

const SidebarNav: React.FC<SidebarNavProps> = ({}) => {
  const location = useLocation();

  const getLinkClassNames = (path: string) => {
    const isActive = location.pathname === path;
    return `flex items-center py-1 px-3 rounded-lg transition cursor-pointer ${
      isActive
        ? "bg-primary/25 text-orange-500"
        : "text-stone-600 hover:text-stone-700 hover:bg-stone-200/50"
    }`;
  };

  const getIconClassNames = (path: string) => {
    return location.pathname === path
      ? "h-6 w-6 mr-5 text-orange-500"
      : "h-6 w-6 mr-5 text-stone-400";
  };

  const topLinks = [
    { path: "/admin/dashboard", label: "Dashboard", Icon: Squares2X2Icon },
    { path: "/admin/quotes", label: "Quotes", Icon: PencilSquareIcon },
    { path: "/admin/trips", label: "Trips", Icon: CalendarIcon },
    { path: "/admin/reviews", label: "Reviews", Icon: StarIcon },
    { path: "/admin/photo-library", label: "Photo Library", Icon: PhotoIcon },
    { path: "/admin/users", label: "Users", Icon: UserGroupIcon },
  ];

  const bottomLinks = [
    { path: "/admin/settings", label: "Settings", Icon: CogIcon },
    { path: "/admin/profile", label: "Your Profile", Icon: UserCircleIcon },
  ];

  return (
    <div className="h-screen flex flex-col gap-8 w-64 bg-stone-100 p-4 border-r border-stone-200 z-30">
      <div>
        <img src="/assets/logo.png" alt="logo" className="h-24 mx-auto" />
      </div>
      <div className="flex flex-col h-full justify-between gap-4">
        <div className="flex flex-col gap-2">
          {topLinks.map(({ path, label, Icon }) => (
            <Link key={path} to={path} className={getLinkClassNames(path)}>
              <Icon className={getIconClassNames(path)} />
              <span className="text-sm my-auto">{label}</span>
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {bottomLinks.map(({ path, label, Icon }) => (
            <Link key={path} to={path} className={getLinkClassNames(path)}>
              <Icon className={getIconClassNames(path)} />
              <span className="text-sm my-auto">{label}</span>
            </Link>
          ))}
        </div>
      </div>
      {/* Back to Site/Logout */}
      <div className="w-full flex gap-4 justify-center">
          <Button
            tertiary
            text="Back to Site"
            link="/"
          />
          <Form action="/logout" method="post">
            <Button
              tertiary
              text="Logout"
              icon={ArrowLeftEndOnRectangleIcon}
            />
          </Form>
      </div>
    </div>
  );
};

export default SidebarNav;
