import type { Metadata } from "next";
import { Suspense } from "react";
import Dashboard from "./Dashboard";

export const metadata: Metadata = {
  title: "Dashboard · Oxbridge Knights",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <Suspense>
      <Dashboard />
    </Suspense>
  );
}
