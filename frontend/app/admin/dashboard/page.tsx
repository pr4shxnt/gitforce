import AdminFrame from "@/app/Components/Admin/AdminFrame";

const metrics = [
  { label: "Pending briefs", value: "04" },
  { label: "Content drafts", value: "09" },
  { label: "Publishing queue", value: "03" },
];

export default function AdminDashboard() {
  return (
    <AdminFrame title="Dashboard" description="High-level overview of GitForce admin operations.">
      <div className="grid md:grid-cols-3 gap-4">
        {metrics.map(({ label, value }) => (
          <div key={label} className="rounded-2xl p-4" style={{ background: "var(--muted)" }}>
            <p className="text-xs uppercase tracking-[0.3em] subtle-text">{label}</p>
            <p className="text-3xl font-semibold" style={{ color: "var(--foreground)" }}>
              {value}
            </p>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="surface-card rounded-2xl p-5 space-y-3">
          <h3 className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>
            Recent updates
          </h3>
          <ul className="space-y-2 muted-text text-sm">
            <li>Gallery: Added IoT deployment images.</li>
            <li>Team: Updated bios for Prashant and Rojin.</li>
            <li>Projects: Published crisis assistant details.</li>
          </ul>
        </div>
        <div className="surface-card rounded-2xl p-5 space-y-3">
          <h3 className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>
            Actions
          </h3>
          <ul className="space-y-2 muted-text text-sm">
            <li>Review partner brief for civic innovation lab.</li>
            <li>Publish new hackathon recap post.</li>
            <li>Confirm telemetry feed for LaunchDock.</li>
          </ul>
        </div>
      </div>
    </AdminFrame>
  );
}

