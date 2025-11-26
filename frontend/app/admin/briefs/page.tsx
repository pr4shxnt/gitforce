import AdminFrame from "@/app/Components/Admin/AdminFrame";

const briefs = [
  { title: "Gov emergency ops", status: "Needs review" },
  { title: "Fintech onboarding", status: "Approved" },
  { title: "Campus telemetry", status: "Draft" },
];

export default function BriefsAdmin() {
  return (
    <AdminFrame
      title="Briefs"
      description="Collect requirements from partners and route them to the right GitForce pod."
    >
      <div className="grid md:grid-cols-2 gap-6">
        <form className="space-y-3">
          <input
            placeholder="Brief title"
            className="w-full rounded-2xl border px-4 py-3 bg-transparent"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          />
          <select
            className="w-full rounded-2xl border px-4 py-3 bg-transparent"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          >
            <option>Needs review</option>
            <option>Approved</option>
            <option>Blocked</option>
          </select>
          <textarea
            placeholder="Key goals"
            rows={4}
            className="w-full rounded-2xl border px-4 py-3 bg-transparent"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          />
          <button
            type="button"
            className="px-6 py-3 rounded-2xl text-sm font-semibold"
            style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
          >
            Save brief
          </button>
        </form>
        <div className="space-y-3">
          {briefs.map(({ title, status }) => (
            <div key={title} className="surface-card rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold" style={{ color: "var(--foreground)" }}>
                  {title}
                </p>
                <p className="text-sm subtle-text">{status}</p>
              </div>
              <div className="text-xs uppercase tracking-[0.3em] space-x-3">
                <button>open</button>
                <button>archive</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminFrame>
  );
}

