import AdminFrame from "@/app/Components/Admin/AdminFrame";

const members = [
  { name: "Prashant Adhikari", role: "Lead Engineer", status: "Active" },
  { name: "Rojin Baniya", role: "Full-stack Engineer", status: "Active" },
  { name: "New recruit", role: "Pending role", status: "Invited" },
];

export default function TeamCrud() {
  return (
    <AdminFrame title="Team CRUD" description="Add, update, and archive members who represent GitForce.">
      <div className="grid lg:grid-cols-[2fr,3fr] gap-6">
        <form className="space-y-3">
          <input
            placeholder="Full name"
            className="w-full rounded-2xl border px-4 py-3 bg-transparent"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          />
          <input
            placeholder="Role"
            className="w-full rounded-2xl border px-4 py-3 bg-transparent"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          />
          <textarea
            placeholder="Short bio"
            rows={4}
            className="w-full rounded-2xl border px-4 py-3 bg-transparent"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          />
          <button
            type="button"
            className="px-6 py-3 rounded-2xl text-sm font-semibold"
            style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
          >
            Save member
          </button>
        </form>
        <div className="space-y-3">
          {members.map(({ name, role, status }) => (
            <div key={name} className="surface-card rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold" style={{ color: "var(--foreground)" }}>
                  {name}
                </p>
                <p className="text-sm subtle-text">{role}</p>
              </div>
              <div className="text-xs uppercase tracking-[0.3em] space-x-3">
                <span>{status}</span>
                <button>edit</button>
                <button>archive</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminFrame>
  );
}



