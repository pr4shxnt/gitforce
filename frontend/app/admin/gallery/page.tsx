import AdminFrame from "@/app/Components/Admin/AdminFrame";

const galleryItems = [
  { id: 1, title: "IoT deployment", status: "Published" },
  { id: 2, title: "Sunway war room", status: "Draft" },
  { id: 3, title: "Crisis assistant demo", status: "Review" },
];

export default function GalleryCrud() {
  return (
    <AdminFrame
      title="Gallery CRUD"
      description="Manage visual stories from hack rooms, deployments, and partner demos."
    >
      <div className="grid md:grid-cols-2 gap-6">
        <form className="space-y-3">
          <input
            placeholder="Title"
            className="w-full rounded-2xl border px-4 py-3 bg-transparent"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          />
          <textarea
            placeholder="Description"
            rows={4}
            className="w-full rounded-2xl border px-4 py-3 bg-transparent"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          />
          <input
            type="url"
            placeholder="Image URL"
            className="w-full rounded-2xl border px-4 py-3 bg-transparent"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          />
          <button
            type="button"
            className="px-6 py-3 rounded-2xl text-sm font-semibold"
            style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
          >
            Save media
          </button>
        </form>
        <div className="space-y-3">
          {galleryItems.map(({ id, title, status }) => (
            <div key={id} className="surface-card rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold" style={{ color: "var(--foreground)" }}>
                  {title}
                </p>
                <p className="text-sm subtle-text">Status: {status}</p>
              </div>
              <div className="flex gap-2 text-xs uppercase tracking-[0.3em]">
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

