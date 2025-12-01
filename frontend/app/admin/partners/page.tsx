import AdminFrame from "@/app/Components/Admin/AdminFrame";

const partners = [
  { org: "DevRel Asia", stage: "Co-build" },
  { org: "Nepal Civic Lab", stage: "Brief" },
  { org: "Sunway Ops", stage: "Active" },
];

export default function PartnersAdmin() {
  return (
    <AdminFrame
      title="Partners"
      description="Capture collaboration history, NDAs, and contact info for organizations."
    >
      <div className="grid md:grid-cols-2 gap-6">
        <form className="space-y-3">
          <input
            placeholder="Organization"
            className="w-full rounded-2xl border px-4 py-3 bg-transparent"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          />
          <input
            placeholder="Primary contact"
            className="w-full rounded-2xl border px-4 py-3 bg-transparent"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          />
          <input
            placeholder="Engagement stage"
            className="w-full rounded-2xl border px-4 py-3 bg-transparent"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          />
          <textarea
            placeholder="Notes / privacy considerations"
            rows={4}
            className="w-full rounded-2xl border px-4 py-3 bg-transparent"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          />
          <button
            type="button"
            className="px-6 py-3 rounded-2xl text-sm font-semibold"
            style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
          >
            Save partner
          </button>
        </form>
        <div className="space-y-3">
          {partners.map(({ org, stage }) => (
            <div key={org} className="surface-card rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold" style={{ color: "var(--foreground)" }}>
                  {org}
                </p>
                <p className="text-sm subtle-text">Stage: {stage}</p>
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



