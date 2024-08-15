// MobileNav.tsx

import { XMarkIcon } from "@heroicons/react/20/solid";
import { Link, useLocation, Form, useOutletContext } from "@remix-run/react";
import {
  BugAntIcon,
  ArrowLeftOnRectangleIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

import Button from "../../Buttons/Button";
import useSlideUp from "~/hooks/useSlideUp";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: Array<{ path: string; label: string }>;
  actionButtons?: boolean;
}

export default function MobileNav({
  isOpen,
  onClose,
  links,
  actionButtons = false,
}: MobileNavProps) {
  const location = useLocation();

  const { user } = useOutletContext<{
    user: { firstName: string; lastName: string; email: string } | null;
  }>();

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`;
  };

  const initials = user ? getInitials(user.firstName, user.lastName) : "";

  const [logoRef, logoVisible] = useSlideUp<HTMLImageElement>();
  const [closeButtonRef, closeButtonVisible] = useSlideUp<HTMLDivElement>();
  const [linksRef, linksVisible] = useSlideUp<HTMLUListElement>();
  const [actionButtonsRef, actionButtonsVisible] = useSlideUp<HTMLDivElement>();

  return (
    <div
      className={`fixed inset-0 bg-secondary flex flex-col justify-center items-center transition-transform z-[99] ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div
        ref={closeButtonRef}
        className={`h-10 w-10 text-white absolute top-4 right-4 cursor-pointer slide-up ${
          closeButtonVisible ? "show" : ""
        }`}
      >
        <XMarkIcon className="object-over" onClick={onClose} />
      </div>
      <div
        ref={logoRef}
        className={`absolute left-0 top-0 flex items-center justify-center py-5 px-8 slide-up ${
          logoVisible ? "show" : ""
        }`}
      >
        <a href="/">
          <img
            src="/assets/img/logo.png"
            alt="Winner Circle Trucking Logo"
            className="h-40 w-full"
          />
        </a>
      </div>
      <ul
        ref={linksRef}
        className={`flex flex-col items-start w-full justify-start px-8 gap-6 text-stone-300 text-2xl md:text-4xl font-light uppercase slide-up ${
          linksVisible ? "show" : ""
        }`}
      >
        {links.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className={`${
              location.pathname === path
                ? "border-l-2 border-primary text-primary"
                : "hover:border-l-2 hover:text-white"
            }`}
          >
            <p className="pl-4">{label}</p>
          </Link>
        ))}
      </ul>
      <div
        ref={actionButtonsRef}
        className={`absolute bottom-0 inset-x-0 p-4 flex flex-col gap-4 px-8 slide-up ${
          actionButtonsVisible ? "show" : ""
        }`}
      >
        {actionButtons && (
          <div className="flex flex-col gap-2">
            <Button secondary link="/quick-quote" textSize="text-lg">
              Quick Quote
            </Button>
            <Button primary link="/submit-waiver" textSize="text-lg">
              Book Now
            </Button>
          </div>
        )}
        {/* ONLY SHOW THESE IF ON ADMIN PORTAL */}
        {location.pathname.includes("/admin") && (
          <div className="flex flex-col gap-2">
            {/* User Profile */}
            <Link
              to="/admin/profile"
              className={`flex gap-2 justify-center items-center h-14 border border-stone-700 slide-up
        ${
          location.pathname === "/admin/profile"
            ? "border-primary text-primary"
            : "hover:border-primary hover:text-primary"
        }
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
            <div className="flex flex-col gap-2 p-2 rounded-lg text-stone-300">
              {/* Report a Bug */}
              <Link
                to="/admin/report-a-bug"
                className={`w-full flex justify-center items-center h-10 border border-stone-700`}
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
                    className={`w-full flex justify-center items-center h-10 border border-stone-700
                ${
                  location.pathname === "/logout"
                    ? "border-primary text-primary"
                    : "hover:border-primary hover:text-primary"
                }
              `}
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
                  className={`w-full flex justify-center items-center h-10 border border-stone-700
              ${
                location.pathname === "/"
                  ? "border-primary text-primary"
                  : "hover:border-primary hover:text-primary"
              }
            `}
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
        )}
      </div>
    </div>
  );
}
