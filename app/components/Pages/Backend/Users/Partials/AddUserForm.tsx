import React, { useState } from "react";
import Input from "~/components/Inputs/Input";
import Button from "~/components/Buttons/Button";
import ResponseMessage from "~/components/Blocks/Messaging/ResponseMessage";

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

interface Errors {
  firstName?: string;
  lastName?: string;
  email?: string;
  general?: string;
}

const AddUserForm: React.FC = () => {
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState<string | null>(null); // State for the message
  const [messageType, setMessageType] = useState<
    "success" | "error" | "info" | "warning"
  >("success"); // State for the message type

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    // Clear the error for the field being edited
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const clearMessage = () => {
    setMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        setUser({ firstName: "", lastName: "", email: "" });
        setErrors({});
        setMessage("User added successfully!");
        setMessageType("success");
      } else {
        const errorData = await response.json();
        if (errorData.error) {
          if (errorData.error === "User already exists") {
            setErrors((prevErrors) => ({
              ...prevErrors,
              email: "A user with this email already exists.",
            }));
            setMessage("A user with this email already exists.");
            setMessageType("error");
          } else {
            console.error("Unexpected error:", errorData.error);
            setMessage("Unexpected error occurred.");
            setMessageType("error");
          }
        } else {
          console.error("Response was not ok");
          setMessage("Failed to add user.");
          setMessageType("error");
        }
      }
    } catch (error) {
      console.error("Failed to create user", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: "An unexpected error occurred. Please try again later.",
      }));
      setMessage("An unexpected error occurred. Please try again later.");
      setMessageType("error");
    }
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
            onChange={handleChange}
            name="firstName"
            error={errors.firstName}
          />
        </div>
        <div className="w-full md:w-1/2">
          <Input
            label="Last Name"
            placeholder="Last Name"
            required={true}
            value={user.lastName}
            onChange={handleChange}
            name="lastName"
            error={errors.lastName}
          />
        </div>
      </div>
      <div className="w-full">
        <Input
          label="Email"
          placeholder="Email"
          required={true}
          value={user.email}
          onChange={handleChange}
          name="email"
          error={errors.email}
        />
      </div>
      <div className="w-full flex justify-end">
        <Button primary type="submit" text="Add" className="max-w-[10rem]" />
      </div>
      <ResponseMessage
        message={message}
        clearMessage={clearMessage}
        type={messageType}
      />
      {errors.general && (
        <div className="text-red-500 text-sm mt-2">{errors.general}</div>
      )}
    </form>
  );
};

export default AddUserForm;
