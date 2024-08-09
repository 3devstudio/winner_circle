// src/layouts/AdminLayout.tsx
import { Outlet, useLocation, useNavigate } from "@remix-run/react";
import BackendNav from "../components/Navigations/Backend/BackendNav";
import { ReactNode } from "react";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";

interface AdminLayoutProps {
  backArrow?: boolean;
  titleActions?: ReactNode;
  children: ReactNode;
}

export default function AdminLayout({ backArrow, titleActions, children }: AdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const getTitleFromPath = (path: string) => {
    const segments = path.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    return lastSegment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const title = getTitleFromPath(location.pathname);

  const handleBackClick = () => {
    const segments = location.pathname.split("/").filter(Boolean);
    if (segments.length > 2) {
      // Remove the last segment to get the parent path
      const parentPath = segments.slice(0, -1).join("/");
      navigate(`/${parentPath}`);
    } else {
      // Fallback to the previous page if no index page is defined
      navigate(-1);
    }
  };

  return (
    <div className="flex flex-col md:flex-row background-pattern z-10">
      <BackendNav className=""/>
      <main className="overflow-x-auto w-full min-h-screen z-20">
        <div className="flex flex-col h-full">
          <div className="flex justify-between gap-4 md:gap-8 h-20 bg-white border-b border-stone-200 px-4 md:px-8 py-2">
            <div className="flex gap-2 md:gap-4">
              {backArrow && (
                <div className="flex justify-center items-center">
                  <ArrowLeftCircleIcon
                    className="h-12 w-12 text-stone-600 hover:text-primary transition cursor-pointer"
                    onClick={handleBackClick}
                  />
                </div>
              )}
              <div className="flex justify-center">
                <h1 className="text-xl font-bold text-stone-800 my-auto uppercase">
                  {title}
                </h1>
              </div>
            </div>
            <div className="flex justify-center items-center">
              {titleActions}
            </div>
          </div>
          <div className="flex h-full">
            {children}
          </div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}