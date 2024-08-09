// MobileNav.tsx

import { XMarkIcon } from "@heroicons/react/20/solid";
import { Link, useLocation } from "@remix-run/react";
import Button from "../../Buttons/Button";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: Array<{ path: string, label: string }>;
  showQuickQuote?: boolean;
}

export default function MobileNav({ isOpen, onClose, links, showQuickQuote = false }: MobileNavProps) {
  const location = useLocation();

  return (
    <div
      className={`fixed inset-0 bg-secondary flex flex-col justify-center items-center transition-transform z-[99] ${
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

      <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col gap-4 text-xl px-8">
        {showQuickQuote && <Button primary link="/quick-quote">Quick Quote</Button>}
        <Button secondary link="/login">Login</Button>
      </div>
    </div>
  );
}