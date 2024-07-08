import { Link, useLocation } from "@remix-run/react";
import { useState } from "react";
import { Bars3Icon, HomeIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import MobileNav from "./mobilenav";
import Button from "./button";

export default function Navigation() {
  const location = useLocation();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const openMobileNav = () => setIsMobileNavOpen(true);
  const closeMobileNav = () => setIsMobileNavOpen(false);

  return (
    <nav className="flex flex-col xl:flex-row gap-4 justify-end">
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
        <Link
          to="/about"
          className={`my-auto ${
            location.pathname === "/about"
              ? "border-b-2 border-primary text-white"
              : "hover:border-b-2 hover:text-white"
          }`}
        >
          About
        </Link>
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
          to="/submit-review"
          className={`my-auto ${
            location.pathname === "/submit-review"
              ? "border-b-2 border-primary text-white"
              : "hover:border-b-2 hover:text-white"
          }`}
        >
          Submit Review
        </Link>
        <Link
          to="/reviews"
          className={`my-auto ${
            location.pathname === "/reviews"
              ? "border-b-2 border-primary text-white"
              : "hover:border-b-2 hover:text-white"
          }`}
        >
          Our Reviews
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
      <div className="md:hidden flex justify-end gap-6 text-stone-300 text-sm font-light uppercase">
        <Bars3Icon
          className="h-10 w-10 text-white hover:text-primary transition cursor-pointer"
          onClick={openMobileNav}
        />
        <Link to="/login" className="my-auto">
          <UserCircleIcon className="h-8 w-8 text-stone-300 hover:text-slate-100 transition ml-4" />
        </Link>
      </div>
      <MobileNav isOpen={isMobileNavOpen} onClose={closeMobileNav} />
    </nav>
  );
}
