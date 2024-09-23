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

interface Column {
  header: string;
  accessor: string;
  dataType?:
    | "text"
    | "tel"
    | "select"
    | "radio"
    | "checkbox"
    | "longText"
    | "date"
    | "number"
    | "email";
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  const fetcher = useFetcher();

  const handleEditUser = (id: string, accessor: string, value: any) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, [accessor]: value } : user
    );
    // Assuming `setUsers` is a state update function you would have if you wanted to update the state
    // setUsers(updatedUsers);
  };

  const handleUpdateUser = async (id: string, updatedUser: User) => {
    fetcher.submit(
      { ...updatedUser },
      {
        method: "post",
        action: `/api/update-user/${id}`,
      },
    );
  };

  const handleDeleteUser = async (user: User) => {
    fetcher.submit(
      { userId: user.id },
      {
        method: "post",
        action: "/api/delete-user",
      },
    );
  };

  const handleRestoreUser = async (user: User) => {
    fetcher.submit(
      { userId: user.id },
      {
        method: "post",
        action: "/api/restore-user",
      },
    );
  };

  const columns: Column[] = [
    { header: "First Name", accessor: "firstName", dataType: "text" },
    { header: "Last Name", accessor: "lastName", dataType: "text" },
    { header: "", accessor: "deletedAt", dataType: "date" },
    { header: "Email", accessor: "email", dataType: "text" },
  ];

  return (
    <BasicTable
      columns={columns}
      data={users}
      onEdit={handleEditUser}
      onUpdate={handleUpdateUser}
      onDelete={handleDeleteUser}
      onRestore={handleRestoreUser}
    />
  );
};

export default UsersTable;