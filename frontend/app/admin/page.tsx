'use client'

import { FormEvent, useState } from "react";
import Link from "next/link";
import Navbar from "../Components/Root/Navbar";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { login, logout } from "@/lib/authSlice";

const ACCESS_CODE = "gitforce";

export default function AdminHome() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (code.trim().toLowerCase() === ACCESS_CODE) {
      dispatch(login({ name: name || "GitForce Admin" }));
      setError("");
      setCode("");
    } else {
      setError("Access code invalid. Coordinate with core team.");
    }
  };

  return (
    <>
      <Navbar />
      <main className="px-6 md:px-10 lg:px-16 py-12 space-y-10">
        <section className="max-w-4xl mx-auto surface-card rounded-3xl p-8 space-y-6">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.4em]" style={{ color: "var(--accent)" }}>
              Admin access
            </p>
            <h1 className="text-3xl font-semibold" style={{ color: "var(--foreground)" }}>
              Secure the room before editing live content.
            </h1>
            <p className="muted-text">
              This lightweight auth flow is purely for demo purposes. The production backend will replace it with proper
              role-based controls.
            </p>
          </div>
          {!isAuthenticated ? (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <label className="text-sm subtle-text" htmlFor="name">
                  Your name
                </label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-2xl border px-4 py-3 bg-transparent"
                  style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
                  placeholder="Prashant Adhikari"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm subtle-text" htmlFor="code">
                  Access code
                </label>
                <input
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="rounded-2xl border px-4 py-3 bg-transparent"
                  style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
                  placeholder="Enter shared code"
                  type="password"
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button
                type="submit"
                className="px-6 py-3 rounded-2xl text-sm font-semibold"
                style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
              >
                Authenticate
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <p className="text-lg" style={{ color: "var(--foreground)" }}>
                Welcome back, {user?.name}.
              </p>
              <p className="muted-text">
                Use the quick links below to jump into CRUD tools. Remember to log out when you are done.
              </p>
              <div className="flex flex-wrap gap-3 text-sm">
                {[
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
                ].map(({ href, label }) => (
                  <Link key={href} href={href} className="nav-link text-xs uppercase tracking-[0.3em]">
                    {label}
                  </Link>
                ))}
              </div>
              <button
                onClick={() => dispatch(logout())}
                className="text-xs uppercase tracking-[0.4em]"
                style={{ color: "var(--accent)" }}
              >
                Logout
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

