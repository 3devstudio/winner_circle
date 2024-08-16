import React from "react";
import BasicTable from "~/components/Blocks/Tables/BasicTable";
import { useFetcher } from "@remix-run/react";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  deletedAt?: string | null;
}

interface UsersTableProps {
  users: User[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  const fetcher = useFetcher();

  const handleDeleteUser = async (user: User) => {
    await fetcher.submit(
      { userId: user.id },
      {
        method: "post",
        action: "/api/delete-user",
      },
    );
  };

  const handleRestoreUser = async (user: User) => {
    await fetcher.submit(
      { userId: user.id },
      {
        method: "post",
        action: "/api/restore-user",
      },
    );
  };

  const columns = [
    { header: "First Name", rows: "firstName" },
    { header: "Last Name", rows: "lastName" },
    { header: "", rows: "deletedAt" },
    { header: "Email", rows: "email" },
  ];

  return (
    <BasicTable
      columns={columns}
      data={users}
      onDelete={handleDeleteUser}
      onRestore={handleRestoreUser}
    />
  );
};

export default UsersTable;