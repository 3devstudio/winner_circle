import React from "react";
import BasicTable from "~/components/Blocks/Tables/BasicTable";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface UsersTableProps {
  users: User[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  const columns = [
    { header: "First Name", rows: "firstName" },
    { header: "Last Name", rows: "lastName" },
    { header: "Email", rows: "email" },
  ];

  return <BasicTable columns={columns} data={users} />;
};

export default UsersTable;
