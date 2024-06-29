import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { getUser } from "~/session.server";
import stylesheet from "~/tailwind.css";

import { PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";

import Navigation from "./components/navigation";
import Footer from "./components/footer";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({ user: await getUser(request) });
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      {/* Header */}
      <header className="sticky top-0 z-50">
        <div className="hidden lg:flex gap-8 bg-accent justify-end text-tertiary px-4 py-1">
          {/* Social Media Tags */}
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
          {/* Contact and Address Tags */}
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
              <span className="my-auto text-xs font-semibold">Nanet:</span>
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
        {/* Logo & Nav Links */}
        <div className="relative bg-secondary flex justify-between gap-4 w-full">
          {/* Logo */}
          <div className="absolute left-0 -top-7 flex gap-2">
            <div className="bg-accent flex items-center justify-center pt-10 pb-5 lg:py-5 px-8 clip-angle-r-xl">
              <a href="/">
                <img
                  src="/assets/logo.png"
                  alt="Winner Circle Trucking Logo"
                  className="h-20 md:h-24 w-full pr-8 md:pr-12"
                />
              </a>
            </div>
          </div>
          {/* Nav Links */}
          <div className="w-full my-auto py-2 px-5">
            <Navigation />
          </div>
        </div>
      </header>
      <body className="flex flex-col">
        {/* Body */}
        <main className="">
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </main>
        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
