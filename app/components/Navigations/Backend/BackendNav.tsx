import React, { useState } from "react";
import { Link, useLocation, Form, useOutletContext } from "@remix-run/react";
import {
  PencilSquareIcon,
  CalendarIcon,
  StarIcon,
  PhotoIcon,
  UserGroupIcon,
  GlobeAltIcon,
  ArrowLeftOnRectangleIcon,
  Squares2X2Icon,
  BugAntIcon,
  DocumentTextIcon
} from "@heroicons/react/24/outline";
import MobileNav from "~/components/Navigations/Frontend/MobileNav";
import useIntersectionObserver from "~/hooks/useIntersectionObserver";

interface SidebarNavProps {
  className?: string;
  ref?: React.RefObject<HTMLDivElement>;
}

const BackendNav: React.FC<SidebarNavProps> = ({ className, ref }) => {
  // Get the authenticated user
  const { user } = useOutletContext<{
    user: { firstName: string; lastName: string; email: string } | null;
  }>();

  const location = useLocation();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  const getLinkClassNames = (path: string) => {
    const isActive = location.pathname === path;
    return `flex items-center py-2 px-3 rounded-lg transition cursor-pointer ${
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

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`;
  };

  const initials = user ? getInitials(user.firstName, user.lastName) : "";

  const topLinks = [
    { path: "/admin/dashboard", label: "Dashboard", Icon: Squares2X2Icon },
    { path: "/admin/waivers", label: "Waivers", Icon: DocumentTextIcon },
    { path: "/admin/quotes", label: "Quotes", Icon: PencilSquareIcon },
    // { path: "/admin/trips", label: "Trips", Icon: CalendarIcon },
    // { path: "/admin/reviews", label: "Reviews", Icon: StarIcon },
    // { path: "/admin/photo-library", label: "Photo Library", Icon: PhotoIcon },
    { path: "/admin/users", label: "Users", Icon: UserGroupIcon },
  ];

  const mobileLinks = topLinks.map(({ path, label }) => ({ path, label }));

  //Desktop Slide Up Transitions
  const [logoRef, logoVisible] = useIntersectionObserver<HTMLImageElement>();
  const [linksRef, linksVisible] = useIntersectionObserver<HTMLDivElement>();
  const [actionButtonsRef, actionButtonsVisible] = useIntersectionObserver<HTMLDivElement>();
  const [userProfileRef, userProfileVisible] = useIntersectionObserver<HTMLAnchorElement>();

  //Mobile Slide Up Transitions
  const [mobileLogoRef, mobileLogoVisible] = useIntersectionObserver<HTMLImageElement>();
  const [menuButtonRef, menuButtonVisible] = useIntersectionObserver<HTMLButtonElement>();

  return (
    <div className="sticky top-0 z-30">
      {/* desktop */}
      <div
        className={`hidden md:flex flex-col h-screen gap-8 min-w-64 bg-secondary p-4 border-r border-stone-200 z-30 ${className}`}
      >
        {/* Logo */}
        <div ref={logoRef} className={`slide-up ${logoVisible ? "show" : ""}`}>
          <img src="/assets/img/logo.png" alt="logo" className="h-24 mx-auto" />
        </div>
        {/* User Profile */}
        <Link
          ref={userProfileRef}
          to="/admin/profile"
          className={`flex gap-2 justify-start items-center h-14 border border-stone-700 slide-up
            ${getLinkClassNames("/admin/profile")}
            ${userProfileVisible ? "show" : ""}
          `}
        >
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-orange-50 text-primary transition focus:ring focus:ring-primary">
            {initials}
          </div>
          <div className="flex flex-col text-sm my-auto">
            <span>
              {user ? `${user.firstName} ${user.lastName}` : "Your profile"}
            </span>
            <span className="text-xs text-stone-500">{user?.email}</span>
          </div>
        </Link>
        {/* Links */}
        <div className="flex flex-col h-full justify-between gap-4">
          <div
            ref={linksRef}
            className={`flex flex-col gap-2 slide-up ${
              linksVisible ? "show" : ""
            }`}
          >
            {topLinks.map(({ path, label, Icon }) => (
              <Link key={path} to={path} className={getLinkClassNames(path)}>
                <Icon className={getIconClassNames(path)} />
                <span className="text-sm my-auto">{label}</span>
              </Link>
            ))}
          </div>
          <div
            ref={actionButtonsRef}
            className={`flex flex-col gap-2 slide-up ${
              actionButtonsVisible ? "show" : ""
            }`}
          >
            <div className="flex flex-col gap-2 p-2 rounded-lg">
              {/* Report a Bug */}
              <Link
                to="/admin/report-a-bug"
                className={`w-full flex justify-center items-center h-10 border border-stone-700 ${getLinkClassNames(
                  "/admin/report-a-bug",
                )}`}
              >
                <div className="text-xs my-auto flex gap-1">
                  <BugAntIcon className="h-5 w-5" />
                  <span className="my-auto whitespace-nowrap">
                    Report a Bug
                  </span>
                </div>
              </Link>
              <div className="flex gap-2">
                {/* Logout */}
                <Form action="/logout" method="post" className="w-full">
                  <button
                    type="submit"
                    className={`w-full flex justify-center items-center h-10 border border-stone-700 ${getLinkClassNames(
                      "/logout",
                    )}`}
                  >
                    <div className="flex gap-1 text-xs my-auto">
                      <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                      <span className="my-auto whitespace-nowrap">Logout</span>
                    </div>
                  </button>
                </Form>
                {/* Back to site */}
                <Link
                  to="/"
                  className={`w-full flex justify-center items-center h-10 border border-stone-700 ${getLinkClassNames(
                    "/logout",
                  )}`}
                >
                  <div className="text-xs my-auto flex gap-1">
                    <GlobeAltIcon className="h-5 w-5" />
                    <span className="my-auto whitespace-nowrap">
                      Visit site
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* mobile */}
      <div className="flex md:hidden justify-between items-center p-4 bg-secondary border-b border-stone-200">
        <div
          ref={mobileLogoRef}
          className={`flex gap-2 slide-up ${mobileLogoVisible ? "show" : ""}`}
        >
          <img src="/assets/img/logo.png" alt="logo" className="h-16 my-auto" />
          <p className="text-stone-300 text-sm my-auto text-xl font-semibold">
            Admin Panel
          </p>
        </div>
        <button
          ref={menuButtonRef}
          onClick={() => setMobileNavOpen(true)}
          className={`p-2 rounded-lg bg-primary/25 text-stone-300 hover:text-stone-100 hover:bg-black/25 slide-up ${
            menuButtonVisible ? "show" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        links={mobileLinks}
      />
    </div>
  );
};

export default BackendNav;
