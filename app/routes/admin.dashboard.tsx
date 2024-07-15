import type { MetaFunction } from "@remix-run/node";

import { requireUser } from "../session.server";

export const meta: MetaFunction = () => [{ title: "Winners Cirlce" }];

export async function loader({ request }: { request: Request }) {
  await requireUser(request);
  return {};
}

export default function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
    </div>
  )
}