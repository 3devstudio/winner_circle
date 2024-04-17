import type { MetaFunction } from "@remix-run/node";

// import { Link } from "@remix-run/react";

// import { useOptionalUser } from "~/utils";

export const meta: MetaFunction = () => [{ title: "Winner Circle" }];

export default function Waiver() {
  // const user = useOptionalUser();
  return (
    <main>
      <h1>Submit Waver</h1>
    </main>
  );
}