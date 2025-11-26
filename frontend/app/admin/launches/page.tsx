import AdminFrame from "@/app/Components/Admin/AdminFrame";

const releases = [
  { name: "GitForce Pulse v0.4", window: "QA" },
  { name: "Collab Nexus v1.0", window: "Launch ready" },
  { name: "LaunchDock billing kit", window: "Review" },
];

export default function LaunchesAdmin() {
  return (
    <AdminFrame title="Launches" description="Coordinate release notes, approvals, and go-live windows.">
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-6">
          <form className="space-y-3">
            <input
              placeholder="Release name"
              className="w-full rounded-2xl border px-4 py-3 bg-transparent"
              style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
            />
            <input
              placeholder="Window (e.g., QA, Launch)"
              className="w-full rounded-2xl border px-4 py-3 bg-transparent"
              style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
            />
            <textarea
              placeholder="Notes"
              rows={4}
              className="w-full rounded-2xl border px-4 py-3 bg-transparent"
              style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
            />
            <button
              type="button"
              className="px-6 py-3 rounded-2xl text-sm font-semibold"
              style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
            >
              Save release
            </button>
          </form>
          <div className="space-y-3">
            {releases.map(({ name, window }) => (
              <div key={name} className="surface-card rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold" style={{ color: "var(--foreground)" }}>
                    {name}
                  </p>
                  <p className="text-sm subtle-text">{window}</p>
                </div>
                <div className="text-xs uppercase tracking-[0.3em] space-x-3">
                  <button>notes</button>
                  <button>approve</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminFrame>
  );
}

