// src/layouts/AdminLayout.tsx
import { Outlet, useLocation } from "@remix-run/react";
import SidebarNav from "../components/Navigations/Backend/SidebarNav";
import { useTitleActions } from "../context/TitleActionsContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { titleActions } = useTitleActions();
  const location = useLocation();

  const getTitleFromPath = (path: string) => {
    const segments = path.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    return lastSegment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const title = getTitleFromPath(location.pathname);

  return (
    <div className="flex flex-col md:flex-row background-pattern z-10">
      <SidebarNav />
      <main className="flex-1 min-h-screen z-20">
        <div className="flex flex-col">
          <div className="flex justify-between gap-4 md:gap-8 h-20 bg-white border-b border-stone-200 px-4 md:px-8 py-2">
            <div className="flex justify-center">
              <h1 className="text-xl font-bold text-stone-800 my-auto uppercase">
                {title}
              </h1>
            </div>
            <div className="flex justify-center items-center">{titleActions}</div>
          </div>
          {children}
          <Outlet />
        </div>
      </main>
    </div>
  );
}
