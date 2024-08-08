// app/routes/add-user.tsx
import React from "react";

import AddUserForm from "~/components/Pages/Backend/Users/Partials/AddUserForm";
import AdminLayout from "~/layouts/AdminLayout";

const AddUserPage: React.FC = () => {
  return (
    <AdminLayout backArrow>
      <div className="p-4 md:p-8 h-full w-full">
        <div className="w-full max-w-3xl">
          <AddUserForm />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddUserPage;
