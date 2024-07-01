import type { MetaFunction } from "@remix-run/node";

import { requireUser } from "../session.server";

export const meta: MetaFunction = () => [{ title: "Winners Cirlce" }];

export async function loader({ request }: { request: Request }) {
  await requireUser(request);
  return {};
}

export default function AdminPhotos() {
  return (
    <div>
      <h1>Admin Photos</h1>
    </div>
  )
}