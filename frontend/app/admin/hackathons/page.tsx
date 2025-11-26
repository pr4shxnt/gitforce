import AdminFrame from "@/app/Components/Admin/AdminFrame";

const hackathons = [
  { name: "Apex Hack '25", result: "In progress" },
  { name: "Sunway Innovate", result: "Winner" },
  { name: "Nepal Civic Build", result: "Winner" },
];

export default function HackathonsCrud() {
  return (
    <AdminFrame
      title="Hackathons CRUD"
      description="Track registrations, results, judges, and deliverables for each event."
    >
      <div className="grid lg:grid-cols-[3fr,2fr] gap-6">
        <form className="space-y-3">
          <input
            placeholder="Hackathon name"
            className="w-full rounded-2xl border px-4 py-3 bg-transparent"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          />
          <input
            placeholder="Location"
            className="w-full rounded-2xl border px-4 py-3 bg-transparent"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          />
          <input
            placeholder="Result / status"
            className="w-full rounded-2xl border px-4 py-3 bg-transparent"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          />
          <textarea
            placeholder="Outcome summary"
            rows={4}
            className="w-full rounded-2xl border px-4 py-3 bg-transparent"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          />
          <button
            type="button"
            className="px-6 py-3 rounded-2xl text-sm font-semibold"
            style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
          >
            Save record
          </button>
        </form>
        <div className="space-y-3">
          {hackathons.map(({ name, result }) => (
            <div key={name} className="surface-card rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold" style={{ color: "var(--foreground)" }}>
                  {name}
                </p>
                <p className="text-sm subtle-text">{result}</p>
              </div>
              <div className="text-xs uppercase tracking-[0.3em] space-x-3">
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

