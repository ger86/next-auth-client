"use client";

import { redirect } from "next/navigation";
import { useAuthContext } from "@/contexts/authContext";
import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useAuthContext();

  if (!isLoggedIn) {
    redirect("/login");
  }

  return <div>{children}</div>;
}

export default Layout;
