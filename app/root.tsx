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
  useLoaderData,
  useLocation,
} from "@remix-run/react";

import AppLayout from "~/layouts/AppLayout";
import AdminLayout from "~/layouts/AdminLayout";
import { getUser } from "~/session.server";
import stylesheet from "~/tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await getUser(request);
  return json({ user });
};

export default function App() {
  const { user } = useLoaderData<{ user: ReturnType<typeof getUser> }>();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const areAdminPages = location.pathname.startsWith("/admin");

  const Layout = () => {
    if (isLoginPage) {
      return <Outlet />;
    }
    if (areAdminPages) {
      return (
        <AdminLayout>
          <Outlet />
        </AdminLayout>
      );
    }
    return (
      <AppLayout>
        <Outlet />
      </AppLayout>
    );
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body>
        <Layout />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
