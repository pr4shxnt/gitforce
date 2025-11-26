import Navbar from "../Components/Root/Navbar";

const projects = [
  {
    title: "Nepal Water Grid",
    stack: "IoT · Edge compute · Supabase · Next.js",
    summary:
      "Low-cost sensors feed water quality data to the cloud, while mobile dashboards alert municipalities when contamination spikes. Addresses a decade-old gap in public health monitoring.",
  },
  {
    title: "Supply Guard",
    stack: "Full-stack web · Mobile · Cloud functions",
    summary:
      "Tracks essential goods across hilly regions, predicts shortages, and alerts cooperatives. Built during a hackathon, now piloted with partners that demanded strict data isolation.",
  },
  {
    title: "Crisis Assist AI",
    stack: "LLM orchestration · Voice interface · Observability",
    summary:
      "Conversational assistant that triages incidents in Nepali/English, routes to the right response team, and logs every action for audit trails. Deployed with privacy-first architecture.",
  },
];

const guarantees = [
  "100% respect for partner privacy and confidentiality agreements.",
  "Clear documentation, handover guides, and runbooks included with every deployment.",
  "Ability to embed across IoT devices, SaaS platforms, mobile apps, and AI/ML services.",
];

export default function Projects() {
  return (
    <>
      <Navbar />
      <main className="px-6 md:px-10 lg:px-16 py-12 space-y-16">
        <section className="max-w-5xl mx-auto space-y-4">
          <p className="text-xs uppercase tracking-[0.4em]" style={{ color: "var(--accent)" }}>
            Projects
          </p>
          <h1 className="text-4xl font-semibold" style={{ color: "var(--foreground)" }}>
            Products and pilots proving GitForce can solve decade-old issues in Nepal.
          </h1>
          <p className="text-lg muted-text leading-relaxed">
            From IoT to AI, we design stacks that endure. These projects show how GitForce translates hackathon energy
            into dependable software for organizations that trust us with sensitive operations.
          </p>
        </section>

        <section className="max-w-6xl mx-auto grid gap-6 md:grid-cols-3">
          {projects.map(({ title, stack, summary }) => (
            <article key={title} className="surface-card rounded-3xl p-6 space-y-3">
              <h2 className="text-xl font-semibold" style={{ color: "var(--foreground)" }}>
                {title}
              </h2>
              <p className="text-xs uppercase tracking-[0.3em]" style={{ color: "var(--accent)" }}>
                {stack}
              </p>
              <p className="text-sm muted-text leading-relaxed">{summary}</p>
            </article>
          ))}
        </section>

        <section className="max-w-5xl mx-auto surface-card rounded-3xl p-6 space-y-4">
          <h2 className="text-2xl font-semibold" style={{ color: "var(--foreground)" }}>
            Delivery guarantees
          </h2>
          <ul className="space-y-2 text-sm muted-text leading-relaxed">
            {guarantees.map((item) => (
              <li key={item} className="flex gap-3 items-start">
                <span className="h-2 w-2 rounded-full mt-2" style={{ background: "var(--accent)" }} />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}

