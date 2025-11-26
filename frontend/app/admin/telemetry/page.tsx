import AdminFrame from "@/app/Components/Admin/AdminFrame";

const streams = [
  { name: "IoT water sensors", status: "Healthy" },
  { name: "LaunchDock billing", status: "Degraded" },
  { name: "Crisis assistant AI", status: "Recording" },
];

export default function TelemetryAdmin() {
  return (
    <AdminFrame title="Telemetry" description="Monitor live data streams that feed dashboards and demos.">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          {streams.map(({ name, status }) => (
            <div key={name} className="surface-card rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold" style={{ color: "var(--foreground)" }}>
                  {name}
                </p>
                <p className="text-sm subtle-text">Status: {status}</p>
              </div>
              <button className="text-xs uppercase tracking-[0.3em]">details</button>
            </div>
          ))}
        </div>
        <form className="space-y-3">
          <input
            placeholder="Stream name"
            className="w-full rounded-2xl border px-4 py-3 bg-transparent"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          />
          <input
            placeholder="Source URL / topic"
            className="w-full rounded-2xl border px-4 py-3 bg-transparent"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          />
          <select
            className="w-full rounded-2xl border px-4 py-3 bg-transparent"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          >
            <option>Healthy</option>
            <option>Degraded</option>
            <option>Recording</option>
          </select>
          <button
            type="button"
            className="px-6 py-3 rounded-2xl text-sm font-semibold"
            style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
          >
            Register stream
          </button>
        </form>
      </div>
    </AdminFrame>
  );
}

