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

import Navigation from "./components/navigation";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({ user: await getUser(request) });
};

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <header className="bg-dark-green flex py-5">
        <div className="container mx-auto px-10 flex items-center">
          <div className="flex items-center justify-center">
            <a href="/">
              <img src="/assets/logo.png" alt="Winner Circle Trucking Logo" className="h-18 w-24 object-cover" />
            </a>
          </div>
          <Navigation />
        </div>
      </header>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <footer className="bg-dark-green flex py-5 mt-[80px]">
        <div className="container flex justify-between items-center text-white px-8">
          <span>&copy; Winner Circle Trucking 2024 All Rights Reserved</span>
          <a href="https://www.facebook.com/profile.php?id=100091977494740" target="_blank" rel="noopener noreferrer">
            <img src="/assets/facebook.png" alt="Go to Facebook page" className="h-6 w-6" />
          </a>
        </div>
      </footer>
      </body>
    </html>
  );
}
