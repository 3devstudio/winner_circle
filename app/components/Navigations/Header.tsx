import { useEffect, useState } from "react";
import { PhoneIcon, MapPinIcon } from "@heroicons/react/24/solid";
import NavLinks from "~/components/Navigations/Partials/NavLinks";
import useSlideUp from "~/hooks/useSlideUp";

interface HeaderProps {
  className?: string;
}

export default function Header({ className = "" }: HeaderProps) {
  const [logoRef, logoVisible] = useSlideUp();
  const [scrollCount, setScrollCount] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setScrollCount((prevCount) => prevCount + 1);
      } else if (currentScrollY < lastScrollY && currentScrollY === 0) {
        setScrollCount(0);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const isScrolled = scrollCount > 3;

  return (
    <header className={`sticky top-0 ${className}`}>
      {/* Contact Bar */}
      <div className="hidden lg:flex gap-8 bg-accent justify-end text-tertiary px-4 py-1">
        <div className="flex gap-2">
          <a
            href="https://www.facebook.com/profile.php?id=100091977494740"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/assets/facebook.png"
              alt="Go to Facebook page"
              className="h-5 w-5"
            />
          </a>
        </div>
        <div className="flex gap-6">
          <div className="flex gap-1">
            <PhoneIcon className="h-4 w-4 my-auto" />
            <span className="my-auto text-xs font-semibold">Chet:</span>
            <a href="tel:8016689989" className="my-auto text-sm">
              (801) 668-9989
            </a>
          </div>
          <div className="flex gap-1">
            <PhoneIcon className="h-4 w-4 my-auto" />
            <span className="my-auto text-xs font-semibold">Nanette:</span>
            <a href="tel:4356020959" className="my-auto text-sm">
              (435) 602-0959
            </a>
          </div>
          <div className="flex gap-1">
            <MapPinIcon className="h-4 w-4 my-auto" />
            <span className="my-auto text-sm">Based in Northern Utah</span>
          </div>
        </div>
      </div>
      {/* Logo & NavLinks */}
      <div className="relative bg-secondary flex justify-between gap-4 w-full">
        {/* Logo */}
        <div className="absolute left-0 clip-angle-r-xl bg-accent px-8 md:px-12 py-6 md:py-8 lg:py-0 lg:pb-8 logo-container">
          <a href="/">
            <img
              ref={logoRef}
              src="/assets/logo.png"
              alt="Winner Circle Trucking Logo"
              className={`pr-8 md:pr-12 lg:pr-16 ${
                isScrolled ? "h-14 md:h-20" : "h-20 md:h-24 lg:h-32"
              } slide-up ${logoVisible ? "show" : ""}`}
            />
          </a>
        </div>
        {/* Nav Links */}
        <div className="w-full my-auto py-2 px-5">
          <NavLinks />
        </div>
      </div>
    </header>
  );
}