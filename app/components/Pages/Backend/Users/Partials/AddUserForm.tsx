// AddUserForm.tsx
import React, { useState } from "react";

import Input from "~/components/Inputs/Input";
import Button from "~/components/Buttons/Button";

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

const AddUserForm: React.FC = () => {
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <Input
            label="First Name"
            placeholder="First Name"
            required={true}
            value={user.firstName}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="w-full md:w-1/2">
          <Input
            label="Last Name"
            placeholder="Last Name"
            required={true}
            value={user.lastName}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
      <div className="w-full">
        <Input
          label="Email"
          placeholder="Email"
          required={true}
          value={user.email}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="w-full flex justify-end">
        <Button primary type="submit" text="Add" className="max-w-[10rem]" />
      </div>
    </form>
  );
};

export default AddUserForm;
