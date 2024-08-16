// src/routes/admin/users/_index.tsx
import { useState } from "react";
import { json, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUser } from "~/session.server";
import { getAllUsers } from "~/models/user.server";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

import AdminLayout from "~/layouts/AdminLayout";
import UsersTable from "~/components/Pages/Backend/Users/UsersTable";
import Button from "~/components/Buttons/Button";
import Search from "~/components/Inputs/Search";

export const meta: MetaFunction = () => [{ title: "Users | Admin Portal" }];

export async function loader({ request }: { request: Request }) {
  await requireUser(request);
  const users = await getAllUsers();
  return json({ users });
}

export default function AdminUsers() {
  const { users } = useLoaderData<typeof loader>();
  const [filteredUsers, setFilteredUsers] = useState(users);

  return (
    <AdminLayout
      titleActions={
        <div className="flex gap-2 md:gap-4">
          <Search data={users} onFilter={setFilteredUsers} className="w-96" />
          <Button
            primary
            link="/admin/users/add-users"
            text="Add a user"
            icon={PlusCircleIcon}
            className="w-36"
          />
        </div>
      }
    >
      <div className="p-4 md:p-8 h-full w-full">
        <div className="flex flex-col gap-8">
          <UsersTable users={filteredUsers} />
        </div>
      </div>
    </AdminLayout>
  );
}
