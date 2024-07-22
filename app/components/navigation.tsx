import { Link, useLocation } from "@remix-run/react";
import { useState } from "react";
import { Bars3Icon, HomeIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import MobileNav from "./mobilenav";
import Button from "./Button";
import Dropdown from "./dropdown";

export default function Navigation() {
  const location = useLocation();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const openMobileNav = () => setIsMobileNavOpen(true);
  const closeMobileNav = () => setIsMobileNavOpen(false);

  return (
    <nav className="flex flex-col xl:flex-row gap-4 justify-end">
      {/* Action buttons (medium screens) */}
      <div className="hidden md:flex gap-2 xl:hidden justify-end text-sm">
        <div className="my-auto">
          <Button secondary link="/contact-us">
            Contact Us
          </Button>
        </div>
        <div className="my-auto">
          <Button secondary>Quick Quote</Button>
        </div>
        <div className="my-auto">
          <Button primary>Book Now</Button>
        </div>
        <Link to="/login" className="my-auto">
          <UserCircleIcon className="h-8 w-8 text-stone-300 hover:text-slate-100 transition ml-4" />
        </Link>
      </div>

      <ul className="hidden md:flex justify-end gap-6 lg:gap-10 text-stone-300 text-xs 2xl:text-sm font-light uppercase transition">
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
        >
          <div className="flex flex-col py-2">
            <Link
              to="/our-services"
              className="text-stone-700 hover:bg-stone-100 transition px-4 py-2 capitalize"
            >
              Our Services
            </Link>
            <Link
              to="/principles"
              className="text-stone-700 hover:bg-stone-100 transition px-4 py-2 capitalize"
            >
              Our Principles
            </Link>
            <Link
              to="/team"
              className="text-stone-700 hover:bg-stone-100 transition px-4 py-2 capitalize"
            >
              Meet Our Team
            </Link>
          </div>
        </Dropdown>

        <Link
          to="/photo-gallery"
          className={`my-auto ${
            location.pathname === "/photo-gallery"
              ? "border-b-2 border-primary text-white"
              : "hover:border-b-2 hover:text-white"
          }`}
        >
          Photo Gallery
        </Link>

        <Link
          to="/reviews"
          className={`my-auto ${
            location.pathname === "/reviews"
              ? "border-b-2 border-primary text-white"
              : "hover:border-b-2 hover:text-white"
          }`}
        >
          Reviews
        </Link>

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

      {/* Action buttons (large screens) */}
      <div className="hidden xl:flex gap-2 justify-end text-sm">
        <div className="my-auto">
          <Button secondary link="/contact-us">
            Contact Us
          </Button>
        </div>
        <div className="my-auto">
          <Button secondary>Quick Quote</Button>
        </div>
        <div className="my-auto">
          <Button primary>Book Now</Button>
        </div>
        <Link to="/login" className="my-auto">
          <UserCircleIcon className="h-8 w-8 text-stone-300 hover:text-slate-100 transition ml-4" />
        </Link>
      </div>

      {/* Mobile navigation */}
      <div className="md:hidden flex justify-end gap-6 text-stone-300 text-sm font-light uppercase">
        <Bars3Icon
          className="h-10 w-10 text-white hover:text-primary transition cursor-pointer"
          onClick={openMobileNav}
        />
        <Link to="/login" className="my-auto">
          <UserCircleIcon className="h-8 w-8 text-stone-300 hover:text-slate-100 transition" />
        </Link>
      </div>
      <MobileNav isOpen={isMobileNavOpen} onClose={closeMobileNav} />
    </nav>
  );
}
