"use client";

import Link from "next/link";
import AdminNav from "./AdminNav";
import { useAppSelector } from "@/lib/hooks";

type Props = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function AdminFrame({ title, description, children }: Props) {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return (
      <div className="px-6 md:px-10 lg:px-16 py-12">
        <div className="surface-card rounded-3xl p-8 space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.4em]" style={{ color: "var(--accent)" }}>
            Restricted
          </p>
          <p className="text-lg muted-text">Please authenticate to view admin tools.</p>
          <Link href="/admin" className="nav-link">
            Return to admin login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="px-6 md:px-10 lg:px-16 py-12 space-y-8">
      <AdminNav />
      <section className="surface-card rounded-3xl p-8 space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em]" style={{ color: "var(--accent)" }}>
            {title}
          </p>
          <p className="text-lg muted-text">{description}</p>
        </div>
        {children}
      </section>
    </main>
  );
}

