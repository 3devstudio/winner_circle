import type { MetaFunction, LinksFunction } from "@remix-run/node";
import { useEffect } from "react";
import { requireUser } from "../session.server";

import AdminLayout from "~/layouts/AdminLayout";

// Meta tags for the page
export const meta: MetaFunction = () => [
  { title: "Report a Bug | Admin Portal" },
];

// Loader function to ensure user authentication
export async function loader({ request }: { request: Request }) {
  await requireUser(request);
  return {};
}

// LinksFunction to include the Typeform embed script and custom CSS
export const links: LinksFunction = () => [
  { rel: "preload", href: "//embed.typeform.com/next/embed.js", as: "script" },
  { rel: "stylesheet", href: "/styles/report-a-bug.css" },
];

export default function ReportABug() {
  useEffect(() => {
    // Dynamically load the Typeform embed script
    const script = document.createElement("script");
    script.src = "//embed.typeform.com/next/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // MutationObserver to detect when the Typeform div is added
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          const typeformWidget = document.querySelector("[data-tf-widget]");
          if (typeformWidget) {
            (typeformWidget as HTMLElement).style.height = "100%";
          }
        }
      });
    });

    // Start observing the #typeform-container for child node changes
    const typeformContainer = document.getElementById("typeform-container");
    if (typeformContainer) {
      observer.observe(typeformContainer, { childList: true });
    }

    return () => {
      document.body.removeChild(script);
      observer.disconnect();
    };
  }, []);

  return (
    <AdminLayout>
      <div
        id="typeform-container"
        data-tf-live="01J4SSAP1RCEDXVR120X76CDY8"
        className="w-full h-full"
      ></div>
    </AdminLayout>
  );
}
