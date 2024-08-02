import type { MetaFunction } from "@remix-run/node";

import { requireUser } from "../session.server";

export const meta: MetaFunction = () => [{ title: "Quotes | Admin Portal" }];

export async function loader({ request }: { request: Request }) {
  await requireUser(request);
  return {};
}

export default function AdminQuotes() {
  return (
    <div>

    </div>
  )
}