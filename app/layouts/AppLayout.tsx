import { Outlet } from "@remix-run/react";

import Header from "~/components/Navigations/Frontend/Header";
import Footer from "~/components/Navigations/Frontend/Footer";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col background-pattern z-10">
      <Header className="z-30" />
      <main className="flex-1 min-h-screen z-20">
        {children}
        <Outlet />
      </main>
      <Footer className="flex-none z-20" />
    </div>
  );
}