import type { MetaFunction } from "@remix-run/node";

// import { Link } from "@remix-run/react";

// import { useOptionalUser } from "~/utils";

export const meta: MetaFunction = () => [{ title: "Winner Circle" }];

export default function Contact() {
  // const user = useOptionalUser();
  return (
    <main>
      <h1>Contact Us</h1>
    </main>
  );
}