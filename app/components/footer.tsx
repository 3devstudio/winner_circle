import { Link, useLocation } from "@remix-run/react";

export default function Footer() {
  const location = useLocation();

  return (
    <footer className="bg-secondary text-stone-100">
      <div className="flex justify-between gap-8 p-4">
        <div className="flex gap-8">
          <a href="/" className="my-auto ml-10">
            <img
              src="/assets/logo.png"
              alt="Winner Circle Trucking Logo"
              className="h-20 md:h-24 w-full pr-8 md:pr-12"
            />
          </a>
          <div className="flex gap-24">
            <div className="flex flex-col gap-4">
              <h2 className="font-bold text-primary border-b border-primary pb-1 text-xs w-[8rem]">
                Helpful Links
              </h2>
              <ul className="grid grid-rows-4 grid-flow-col gap-4 text-xs">
                <Link
                  to="/"
                  className={`my-auto ${
                    location.pathname === "/"
                      ? "text-primary"
                      : "text-stone-300 hover:text-stone-200"
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className={`my-auto ${
                    location.pathname === "/about"
                      ? "text-white"
                      : "hover:text-white"
                  }`}
                >
                  About
                </Link>
                <Link
                  to="/photo-gallery"
                  className={`my-auto ${
                    location.pathname === "/photo-gallery"
                      ? "text-white"
                      : "hover:text-white"
                  }`}
                >
                  Photo Gallery
                </Link>
                <Link
                  to="/submit-review"
                  className={`my-auto ${
                    location.pathname === "/submit-review"
                      ? "text-white"
                      : "hover:text-white"
                  }`}
                >
                  Submit Review
                </Link>
                <Link
                  to="/reviews"
                  className={`my-auto ${
                    location.pathname === "/reviews"
                      ? "text-white"
                      : "hover:text-white"
                  }`}
                >
                  Our Reviews
                </Link>
                <Link
                  to="/submit-waiver"
                  className={`my-auto ${
                    location.pathname === "/submit-waiver"
                      ? "text-white"
                      : "hover:text-white"
                  }`}
                >
                  Waiver
                </Link>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="font-bold text-primary border-b border-primary pb-1 text-xs w-[8rem]">
                Social Media
              </h2>
              <ul className="flex flex-col gap-2 text-xs">
                <a
                  href="https://www.facebook.com/profile.php?id=100091977494740"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="my-auto flex gap-2"
                >
                  <img
                    src="/assets/facebook.png"
                    alt="Go to Facebook page"
                    className="h-4 w-4"
                  />
                  <span className="my-auto">Facebook</span>
                </a>
                {/* More social media? */}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="py-2 flex justify-center items-center text-xs bg-accent">
        <span>&copy; Winner Circle Trucking 2024 All Rights Reserved</span>
      </div>
    </footer>
  );
}
