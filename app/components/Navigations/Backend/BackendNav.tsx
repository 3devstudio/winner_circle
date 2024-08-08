import React from "react";
import { Link, useLocation, Form } from "@remix-run/react";

import {
  PencilSquareIcon,
  CalendarIcon,
  StarIcon,
  PhotoIcon,
  UserGroupIcon,
  UserCircleIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

interface SidebarNavProps {
  className?: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ className }) => {
  const location = useLocation();

  const getLinkClassNames = (path: string) => {
    const isActive = location.pathname === path;
    return `flex items-center py-1 px-3 rounded-lg transition cursor-pointer ${
      isActive
        ? "bg-primary/25 text-orange-500"
        : "text-stone-300 hover:text-stone-100 hover:bg-black/25"
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

  // const bottomLinks = [
  //   //Used for settings, etc.
  // ];

  return (
    // desktop
    <div className={`hidden md:flex flex-col h-screen gap-8 min-w-64 bg-secondary p-4 border-r border-stone-200 z-30 ${ className }`}>
      {/* Logo */}
      <div>
        <img src="/assets/logo.png" alt="logo" className="h-24 mx-auto" />
      </div>
      {/* Authentication */}
      {/* <div className="flex flex-col gap-4">
        <Link to="/admin/profile" className={getLinkClassNames("/admin/profile")}>
          <UserCircleIcon className={getIconClassNames("/admin/profile")} />
          <span className="text-sm my-auto">Profile</span>
        </Link>
        <Link to="/admin/logout" className={getLinkClassNames("/admin/logout")}>
          <UserCircleIcon className={getIconClassNames("/admin/logout")} />
          <span className="text-sm my-auto">Logout</span>
        </Link>
      </div> */}
      {/* Links */}
      <div className="flex flex-col h-full justify-between gap-4">
        <div className="flex flex-col gap-2">
          {topLinks.map(({ path, label, Icon }) => (
            <Link key={path} to={path} className={getLinkClassNames(path)}>
              <Icon className={getIconClassNames(path)} />
              <span className="text-sm my-auto">{label}</span>
            </Link>
          ))}
        </div>
        {/* <div className="flex flex-col gap-2">
          {bottomLinks.map(({ path, label, Icon }) => (
            <Link key={path} to={path} className={getLinkClassNames(path)}>
              <Icon className={getIconClassNames(path)} />
              <span className="text-sm my-auto">{label}</span>
            </Link>
          ))}
        </div> */}
      </div>
    </div>
    // mobile
  );
};

export default SidebarNav;
