// AppLayout.tsx
import { PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { useEffect, useState } from "react";

import Footer from "app/components/footer";
import Navigation from "app/components/navigation";

export default function AppLayout() {
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
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <header className="sticky top-0 z-50">
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
        {/* Logo & Navigation */}
        <div className={`relative bg-secondary flex justify-between gap-4 w-full`}>
          <div className={`absolute left-0 -top-7 gap-2`}>
            <div
              className={`flex items-center justify-center pt-10 pb-5 lg:py-5 px-8 clip-angle-r-xl bg-accent logo-container`}
            >
              <a href="/">
                <img
                  src="/assets/logo.png"
                  alt="Winner Circle Trucking Logo"
                  className={`pr-8 md:pr-12 lg:pr-16 ${
                    isScrolled ? "h-16 md:h-20" : "h-20 md:h-24 lg:h-32"
                  }`}
                />
              </a>
            </div>
          </div>
          <div className="w-full my-auto py-2 px-5">
            <Navigation />
          </div>
        </div>
      </header>
      <body className="flex flex-col fade-in background-pattern">
        <main>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </main>
        <Footer />
      </body>
    </html>
  );
}