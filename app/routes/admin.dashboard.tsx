import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import { requireUser } from "../session.server";

export const meta: MetaFunction = () => [{ title: "Winners Cirlce" }];

export async function loader({ request }: { request: Request }) {
  await requireUser(request);
  return {};
}

export default function AdminDashboard() {
  return (
    <div className="mt-20">
      <h1>Admin Dashboard</h1>
      <Link to="/admin/quotes">Quotes</Link>
      <Link to="/admin/trips">Trips</Link>
      <Link to="/admin/reviews">Reviews</Link>
      <Link to="/admin/photo-library">Photo Library</Link>
      <Link to="/admin/users">Users</Link>
    </div>
  )
}