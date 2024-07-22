import { Link } from "@remix-run/react";

export default function UserIndexPage() {
  return (
    <p>
      No user selected. Select a user on the left, or{" "}
      <Link to="new-user" className="text-blue-500 underline">
        add a new user.
      </Link>
    </p>
  );
}