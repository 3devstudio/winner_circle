// src/routes/admin/users/_index.tsx
import React, { useState, useEffect } from "react";
import { json, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUser } from "~/session.server";
import { getAllUsers } from "~/models/user.server";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

import UsersTable from "~/components/Pages/Backend/Users/UsersTable";
import Button from "~/components/Buttons/Button";
import Search from "~/components/Inputs/Search";
import { useTitleActions } from "~/context/TitleActionsContext";

export const meta: MetaFunction = () => [{ title: "Users | Admin Portal" }];

export async function loader({ request }: { request: Request }) {
  await requireUser(request);
  const users = await getAllUsers();
  return json({ users });
}

export default function AdminUsers() {
  const { users } = useLoaderData<typeof loader>();
  const [filteredUsers, setFilteredUsers] = useState(users);
  const { setTitleActions } = useTitleActions();

  useEffect(() => {
    // Set the title actions with the Search component
    setTitleActions(
      <Search data={users} onFilter={setFilteredUsers} />
  );
  }, [setTitleActions, users]);

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col gap-8">
        <div className="flex justify-center md:justify-end">
          <Button
            primary
            link="/admin/users/add-users"
            text="Add a user"
            icon={PlusCircleIcon}
            className="max-w-[10rem]"
          />
        </div>
        <UsersTable users={filteredUsers} />
      </div>
    </div>
  );
}
