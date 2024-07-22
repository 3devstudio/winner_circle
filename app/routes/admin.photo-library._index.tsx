import { Link } from "@remix-run/react";

export default function PhotoLibraryIndexPage() {
  return (
    <p>
      No photo selected. Select a photo on the left, or{" "}
      <Link to="new-photo" className="text-blue-500 underline">
        add a new photo.
      </Link>
    </p>
  );
}