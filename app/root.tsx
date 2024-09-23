// root.tsx
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  Link,
} from "@remix-run/react";
import stylesheet from "~/tailwind.css";
import { getUser } from "~/session.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

type LoaderData = {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  } | null;
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  return json<LoaderData>({ user });
};

export default function App() {
  const { user } = useLoaderData<LoaderData>();

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
        <div id="portal-root"></div>
        <Outlet context={{ user }} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

// ErrorBoundary for general errors
export function ErrorBoundary({ error }: { error: Error | null }) {
  if (!error) return null;
  let errorMessage = error.message || "An error occurred";
  console.log(error);

  return (
    <html>
      <head>
        <title>Something went wrong</title>
      </head>
      <body>
        <div className="error-container">
          <h1>Application Error</h1>
          <p>Sorry, something went wrong.</p>
          <pre>{errorMessage}</pre>
          <Link to="/">Go back to the homepage</Link>
        </div>
      </body>
    </html>
  );
}

// CatchBoundary using error boundaries in place of useCatch
export function CatchBoundary({ caught }: { caught: Response }) {
  return (
    <html>
      <head>
        <title>
          {caught.status} {caught.statusText}
        </title>
      </head>
      <body>
        <div className="error-container">
          <h1>
            {caught.status}: {caught.statusText}
          </h1>
          {caught.status === 404 ? (
            <p>Sorry, the page you are looking for does not exist.</p>
          ) : (
            <p>Something went wrong.</p>
          )}
          <Link to="/">Go back to the homepage</Link>
        </div>
      </body>
    </html>
  );
}
