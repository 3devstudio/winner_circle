// mobilenav.tsx
import { Link, useLocation } from "@remix-run/react";
import { UserCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import Button from "~/components/Buttons/Button";

export default function MobileNav({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const location = useLocation();

  return (
    <div
      className={`fixed inset-0 bg-secondary flex flex-col justify-center items-center transition-transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <XMarkIcon
        className="h-10 w-10 text-white absolute top-4 right-4 cursor-pointer"
        onClick={onClose}
      />
      <div className="absolute left-0 top-0 flex items-center justify-center py-5 px-8">
        <a href="/">
          <img
            src="/assets/logo.png"
            alt="Winner Circle Trucking Logo"
            className="h-40 w-full"
          />
        </a>
      </div>

      <ul className="flex flex-col items-start w-full justify-start px-8 gap-6 text-stone-300 text-2xl md:text-4xl font-light uppercase">
        <Link
          to="/"
          className={`${
            location.pathname === "/"
              ? "border-l-2 border-primary text-primary"
              : "hover:border-l-2 hover:text-white"
          }`}
        >
          <p className="pl-4">Home</p>
        </Link>
        <Link
          to="/meet-our-team"
          className={`${
            location.pathname === "/meet-our-team"
              ? "border-l-2 border-primary text-primary"
              : "hover:border-l-2 hover:text-white"
          }`}
        >
          <p className="pl-4">Meet Our Team</p>
        </Link>
        <Link
          to="/our-services"
          className={`${
            location.pathname === "/our-services"
              ? "border-l-2 border-primary text-primary"
              : "hover:border-l-2 hover:text-white"
          }`}
        >
          <p className="pl-4">Our Services</p>
        </Link>
        <Link
          to="/our-principles"
          className={`${
            location.pathname === "/our-principles"
              ? "border-l-2 border-primary text-primary"
              : "hover:border-l-2 hover:text-white"
          }`}
        >
          <p className="pl-4">Our Principles</p>
        </Link>
        <Link
          to="/photo-gallery"
          className={`${
            location.pathname === "/photo-gallery"
              ? "border-l-2 border-primary text-primary"
              : "hover:border-l-2 hover:text-white"
          }`}
        >
          <p className="pl-4">Photo Gallery</p>
        </Link>
        <Link
          to="/submit-review"
          className={`${
            location.pathname === "/submit-review"
              ? "border-l-2 border-primary text-primary"
              : "hover:border-l-2 hover:text-white"
          }`}
        >
          <p className="pl-4">Submit a Review</p>
        </Link>
        <Link
          to="/reviews"
          className={`${
            location.pathname === "/reviews"
              ? "border-l-2 border-primary text-primary"
              : "hover:border-l-2 hover:text-white"
          }`}
        >
          <p className="pl-4">Our Reviews</p>
        </Link>
        <Link
          to="/submit-waiver"
          className={`${
            location.pathname === "/submit-waiver"
              ? "border-l-2 border-primary text-primary"
              : "hover:border-l-2 hover:text-white"
          }`}
        >
          <p className="pl-4">Waiver</p>
        </Link>
      </ul>

      <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col gap-4 text-xl px-8">
        <Button secondary>Contact Us</Button>
        <Button secondary>Quick Quote</Button>
        <Button primary>Book Now</Button>
        <Button tertiary>Login</Button>
      </div>
    </div>
  );
}
