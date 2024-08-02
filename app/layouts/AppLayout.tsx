import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import Header from "app/components/Navigations/Header";
import Footer from "~/components/Navigations/Footer";

export default function AppLayout() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body className="flex flex-col background-pattern z-10">
        <Header className="z-30"/>
        <main className="flex-1 min-h-screen z-20">
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </main>
        <Footer
          className={`flex-none z-20`}
        />
      </body>
    </html>
  );
}