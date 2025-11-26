import Navbar from "../Components/Root/Navbar";
import ResNavbar from "../Components/Root/ResNavbar";

const milestones = [
  {
    title: "Ecobin: a waste management tool",
    detail: "Designed and developed in hackathons of MIT x Thrive 2025 and Code For Change Techspire.",
    note: "mongodb, reactjs, express",
  },
  {
    title: "Transitpay: Revolutionize Your Digital Commute",
    detail: "Unified transit tickets, fares, and nfc based user wallet to work offline for public transport.",
    note: "IoT, react-native, nextjs, express",
  }
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
      <ResNavbar/>
      <main className="px-6 md:px-10 lg:px-16 py-12 space-y-16">
        <section className="max-w-6xl mx-auto space-y-4">
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

        <section className="max-w-6xl mx-auto space-y-3 surface-card rounded-3xl p-6">
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

