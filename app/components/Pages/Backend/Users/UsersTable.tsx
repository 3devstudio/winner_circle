import React from "react";

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
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-stone-200 border border-stone-200">
        <thead className="bg-stone-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider"
            >
              First Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider"
            >
              Last Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider"
            >
              Email
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-stone-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-stone-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-stone-900">
                {user.firstName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">
                {user.lastName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">
                {user.email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;