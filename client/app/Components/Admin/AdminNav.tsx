"use client";

import Link from "next/link";
import { logout } from "@/lib/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

const links = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/gallery", label: "Gallery CRUD" },
  { href: "/admin/team", label: "Team CRUD" },
  { href: "/admin/projects", label: "Projects CRUD" },
  { href: "/admin/hackathons", label: "Hackathons CRUD" },
  { href: "/admin/partners", label: "Partners" },
  { href: "/admin/briefs", label: "Briefs" },
  { href: "/admin/telemetry", label: "Telemetry" },
  { href: "/admin/launches", label: "Launches" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminNav() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="surface-card rounded-3xl p-5 flex flex-wrap items-center justify-between gap-4">
      <div>
        <p className="text-xs uppercase tracking-[0.4em]" style={{ color: "var(--accent)" }}>
          Admin routes
        </p>
        <p className="text-sm muted-text">Authenticated as {user?.name ?? "Guest"}</p>
      </div>
      <div className="flex flex-wrap gap-3 text-sm">
        {links.map(({ href, label }) => (
          <Link key={href} href={href} className="nav-link text-xs uppercase tracking-[0.3em]">
            {label}
          </Link>
        ))}
      </div>
      <button
        onClick={handleLogout}
        className="text-xs uppercase tracking-[0.4em]"
        style={{ color: "var(--accent)" }}
      >
        Logout
      </button>
    </div>
  );
}

