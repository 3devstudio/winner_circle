import { Bars3Icon, HomeIcon } from "@heroicons/react/20/solid";
import { Link, useLocation } from "@remix-run/react";
import { useState } from "react";

import Button from "../../../Buttons/Button";
import Dropdown from "../../../Dropdowns/Dropdown";
import LoginButton, { loader as loginButtonLoader } from "./LoginButton";
import MobileNav from "../../../Navigations/Frontend/MobileNav";
import useSlideUp from "~/hooks/useSlideUp";

export const loader = loginButtonLoader;

export default function Navigation() {
  const [navLinksRef, navLinksVisible] = useSlideUp<HTMLDivElement>();
  const location = useLocation();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const openMobileNav = () => setIsMobileNavOpen(true);
  const closeMobileNav = () => setIsMobileNavOpen(false);

  return (
    <nav className="flex gap-4 justify-end">
      <div
        ref={navLinksRef}
        className={`flex slide-up ${navLinksVisible ? "show" : ""}`}
      >
        {/* Links */}
        <ul className="hidden lg:flex justify-end gap-6 lg:gap-10 text-stone-300 text-xs 2xl:text-sm font-light uppercase transition">
          <Link
            to="/"
            className={`my-auto ${
              location.pathname === "/"
                ? "text-primary"
                : "text-stone-300 hover:text-stone-200"
            }`}
          >
            <HomeIcon className="h-6 w-6" />
          </Link>

          <Dropdown
            triggerText="About Us"
            triggerClassName="uppercase text-stone-300 hover:text-stone-200"
            showChevron
          >
            <div className="flex flex-col py-2">
              <Link
                to="/our-services"
                className="text-stone-700 hover:bg-stone-100 transition px-4 py-2 capitalize"
              >
                Our Services
              </Link>
              <Link
                to="/our-principles"
                className="text-stone-700 hover:bg-stone-100 transition px-4 py-2 capitalize"
              >
                Our Principles
              </Link>
              <Link
                to="/meet-our-team"
                className="text-stone-700 hover:bg-stone-100 transition px-4 py-2 capitalize"
              >
                Meet Our Team
              </Link>
            </div>
          </Dropdown>

          {/* <Link
            to="/photo-gallery"
            className={`my-auto ${
              location.pathname === "/photo-gallery"
                ? "border-b-2 border-primary text-white"
                : "hover:border-b-2 hover:text-white"
            }`}
          >
            Photo Gallery
          </Link> */}

          {/* <Link
            to="/reviews"
            className={`my-auto ${
              location.pathname === "/reviews"
                ? "border-b-2 border-primary text-white"
                : "hover:border-b-2 hover:text-white"
            }`}
          >
            Reviews
          </Link> */}

          <Link
            to="/submit-waiver"
            className={`my-auto ${
              location.pathname === "/submit-waiver"
                ? "border-b-2 border-primary text-white"
                : "hover:border-b-2 hover:text-white"
            }`}
          >
            Waiver
          </Link>
        </ul>

        {/* Quick Quote and Login */}
        <div className="hidden lg:flex gap-2 justify-end text-sm ml-8">
          <div className="my-auto">
            <Button primary link="/quick-quote">
              Quick Quote
            </Button>
          </div>
          <LoginButton />
        </div>
      </div>

      {/* Mobile navigation */}
      <div className="lg:hidden flex justify-end text-stone-300 text-sm font-light uppercase">
        <Bars3Icon
          className="h-10 w-10 text-white hover:text-primary transition cursor-pointer"
          onClick={openMobileNav}
        />
        <LoginButton />
      </div>
      <MobileNav isOpen={isMobileNavOpen} onClose={closeMobileNav} />
    </nav>
  );
}