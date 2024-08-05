// app/routes/add-user.tsx
import React from "react";
import AddUserForm from "~/components/Pages/Backend/Users/Partials/AddUserForm";

const AddUserPage: React.FC = () => {
  return (
    <div className="p-4 md:p-8">
      <div className="w-full max-w-3xl">
        <AddUserForm />
      </div>
    </div>
  );
};

export default AddUserPage;
