import Navbar from "../Components/Root/Navbar";

const milestones = [
  {
    title: "IoT water safety network",
    detail: "Prototype deployed across three municipalities to spot contamination spikes in community taps.",
    note: "Solved a decade-long monitoring issue using low-cost sensors and cloud pipelines.",
  },
  {
    title: "Sunway campus ops dashboard",
    detail: "Unified maintenance tickets, lab schedules, and student feedback in one responsive interface.",
    note: "Ran across tablets, desktop kiosks, and mobile apps with offline sync.",
  },
  {
    title: "AI-ready crisis assistant",
    detail: "Voice + text helper that routes emergency data to verified responders in Nepali and English.",
    note: "Evaluated on locally collected datasets to ensure cultural fit.",
  },
];

const galleryNotes = [
  "Rapid prototypes built during two winning hackathons with judges present.",
  "Field tests with Nepali municipal partners who needed telemetry within days.",
  "Partner demos for companies exploring confidential pilots.",
];

export default function Gallery() {
  return (
    <>
      <Navbar />
      <main className="px-6 md:px-10 lg:px-16 py-12 space-y-16">
        <section className="max-w-5xl mx-auto space-y-4">
          <p className="text-xs uppercase tracking-[0.4em]" style={{ color: "var(--accent)" }}>
            Gallery
          </p>
          <h1 className="text-4xl font-semibold" style={{ color: "var(--foreground)" }}>
            Snapshots from hack rooms, field deployments, and product demos.
          </h1>
          <p className="text-lg muted-text leading-relaxed">
            We document every build—whiteboards, Figma frames, sensor rigs, and partner briefings. These are the moments
            that keep GitForce shipping for Nepal.
          </p>
        </section>

        <section className="max-w-6xl mx-auto grid gap-6 md:grid-cols-3">
          {milestones.map(({ title, detail, note }) => (
            <article key={title} className="surface-card rounded-3xl p-6 space-y-3">
              <h2 className="text-xl font-semibold" style={{ color: "var(--foreground)" }}>
                {title}
              </h2>
              <p className="text-sm muted-text leading-relaxed">{detail}</p>
              <p className="text-xs uppercase tracking-[0.3em]" style={{ color: "var(--accent)" }}>
                {note}
              </p>
            </article>
          ))}
        </section>

        <section className="max-w-5xl mx-auto space-y-3 surface-card rounded-3xl p-6">
          <h2 className="text-2xl font-semibold" style={{ color: "var(--foreground)" }}>
            What the photos cannot show
          </h2>
          <div className="space-y-2 text-sm muted-text leading-relaxed">
            {galleryNotes.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

