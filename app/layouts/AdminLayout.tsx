import { Outlet, useLocation } from "@remix-run/react";
import SidebarNav from "../components/Navigations/Backend/SidebarNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
          <div className="flex full h-20 bg-stone-100 border-b border-stone-200 px-4 py-2">
            <h1 className="text-xl font-bold text-stone-800 my-auto uppercase">
              {title}
            </h1>
          </div>
          {children}
          <Outlet />
        </div>
      </main>
    </div>
  );
}
