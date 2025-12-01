import AdminFrame from "@/app/Components/Admin/AdminFrame";

export default function SettingsAdmin() {
  return (
    <AdminFrame title="Settings" description="Configure environment flags, privacy messages, and contact info.">
      <div className="grid md:grid-cols-2 gap-6">
        <form className="space-y-3">
          <label className="text-sm subtle-text" htmlFor="contact-email">
            Contact email
          </label>
          <input
            id="contact-email"
            placeholder="team@gitforce.dev"
            className="w-full rounded-2xl border px-4 py-3 bg-transparent"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          />
          <label className="text-sm subtle-text" htmlFor="privacy">
            Privacy statement
          </label>
          <textarea
            id="privacy"
            rows={4}
            placeholder="We respect every NDA..."
            className="w-full rounded-2xl border px-4 py-3 bg-transparent"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          />
          <label className="text-sm subtle-text" htmlFor="environment">
            Environment badge
          </label>
          <select
            id="environment"
            className="w-full rounded-2xl border px-4 py-3 bg-transparent"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          >
            <option>Production</option>
            <option>Staging</option>
            <option>Local</option>
          </select>
          <button
            type="button"
            className="px-6 py-3 rounded-2xl text-sm font-semibold"
            style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
          >
            Save settings
          </button>
        </form>
        <div className="surface-card rounded-2xl p-5 space-y-3">
          <h3 className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>
            Audit trail
          </h3>
          <ul className="space-y-2 muted-text text-sm">
            <li>✅ Updated privacy statement</li>
            <li>✅ Rotated access code</li>
            <li>⏳ Pending legal review</li>
          </ul>
        </div>
      </div>
    </AdminFrame>
  );
}



