import AdminFrame from "@/app/Components/Admin/AdminFrame";

const projects = [
  { title: "Nepal Water Grid", stage: "Pilot" },
  { title: "Supply Guard", stage: "Live" },
  { title: "Crisis Assist AI", stage: "QA" },
];

export default function ProjectsCrud() {
  return (
    <AdminFrame
      title="Projects CRUD"
      description="Document flagship builds, update stacks, and mark delivery stages."
    >
      <div className="grid md:grid-cols-2 gap-6">
        <form className="space-y-3">
          <input
            placeholder="Project title"
            className="w-full rounded-2xl border px-4 py-3 bg-transparent"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          />
          <input
            placeholder="Tech stack"
            className="w-full rounded-2xl border px-4 py-3 bg-transparent"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          />
          <textarea
            placeholder="Summary"
            rows={4}
            className="w-full rounded-2xl border px-4 py-3 bg-transparent"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          />
          <select
            className="w-full rounded-2xl border px-4 py-3 bg-transparent"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          >
            <option value="Draft">Draft</option>
            <option value="QA">QA</option>
            <option value="Pilot">Pilot</option>
            <option value="Live">Live</option>
          </select>
          <button
            type="button"
            className="px-6 py-3 rounded-2xl text-sm font-semibold"
            style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
          >
            Save project
          </button>
        </form>
        <div className="space-y-3">
          {projects.map(({ title, stage }) => (
            <div key={title} className="surface-card rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold" style={{ color: "var(--foreground)" }}>
                  {title}
                </p>
                <p className="text-sm subtle-text">Stage: {stage}</p>
              </div>
              <div className="text-xs uppercase tracking-[0.3em] space-x-3">
                <button>edit</button>
                <button>delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminFrame>
  );
}

