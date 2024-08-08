import type { MetaFunction } from "@remix-run/node";
import { requireUser } from "../session.server";

import AdminLayout from "../layouts/AdminLayout";

export const meta: MetaFunction = () => [{ title: "Reviews | Admin Portal" }];

export async function loader({ request }: { request: Request }) {
  await requireUser(request);
  return {};
}

export default function AdminReviews() {
  return (
    <AdminLayout>
      <div className="p-4 md:p-8 h-full w-full"></div>
    </AdminLayout>
  );
}
