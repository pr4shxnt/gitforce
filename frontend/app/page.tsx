import Navbar from "./Components/Root/Navbar";

const stats = [
  { label: "Hackathons led", value: "3" },
  { label: "Wins secured", value: "2" },
  { label: "Avg. sprint", value: "72h" },
];

const sprintPillars = [
  {
    title: "Brief → Sprint room",
    detail: "Day zero alignment, risk sheet, and shared async docs within 2 hours.",
  },
  {
    title: "Build → Validate",
    detail: "Feature pods run paired design/dev reviews with automated QA smoke tests.",
  },
  {
    title: "Launch → Signal",
    detail: "Release notes, demo video, and KPI instrumentation shipped together.",
  },
];

const partnerTracks = [
  { title: "Gov / Civic Lab", copy: "Ops dashboards, emergency tooling, citizen portals." },
  { title: "SaaS Platform", copy: "Billing infra, onboarding flows, partner integrations." },
  { title: "AI + Data", copy: "Evaluators, agent copilots, governance controls." },
];

const deliverables = [
  "Working product + repo handoff",
  "System design + runbooks",
  "Embedded standups + retro notes",
  "Launch messaging toolkit",
];

const impactHighlights = [
  {
    title: "Decade-old issue unlocked",
    detail:
      "Designed an IoT, mobile, and AI-powered system that gives municipalities real-time awareness of water safety—a problem left unsolved for years.",
  },
  {
    title: "Respect for confidentiality",
    detail:
      "All repos are access-controlled, logs are encrypted, and only assigned members view partner data. We deliver under strict NDAs by default.",
  },
  {
    title: "Sunway College roots",
    detail:
      "Prashant Adhikari and Rojin Baniya lead the team from Sunway College Kathmandu, mentoring the next wave of permanent members.",
  },
];

const principles = [
  "We co-build with Nepali institutions first, then scale globally.",
  "We never compromise on partner privacy or data residency.",
  "We measure success by the problems solved, not the features shipped.",
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="px-6 md:px-10 lg:px-16 py-12 md:py-16 space-y-20">
        <section className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-[3fr,2fr] items-center">
          <div className="space-y-7">
            <p className="text-xs uppercase tracking-[0.4em]" style={{ color: "var(--accent)" }}>
              GitForce team
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight" style={{ color: "var(--foreground)" }}>
              Hackathon-native squad building SaaS quality releases on demand.
            </h1>
            <p className="text-base md:text-lg muted-text">
              We partner with organizations across Nepal who need usable software in days, not quarters. Drop us a brief
              and we deploy a focused pod with product, design, and engineering already in sync—including IoT, mobile,
              AI/ML, and cloud infrastructure.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#process"
                className="px-5 py-3 rounded-2xl text-sm font-medium"
                style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
              >
                See the sprint flow
              </a>
              <a
                href="mailto:team@gitforce.dev"
                className="px-5 py-3 rounded-2xl text-sm font-medium border"
                style={{ borderColor: "var(--border)" }}
              >
                Share a brief
              </a>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {stats.map(({ label, value }) => (
                <div key={label} className="surface-card rounded-2xl p-4 text-sm space-y-1">
                  <p style={{ color: "var(--foreground)" }} className="text-2xl font-semibold">
                    {value}
                  </p>
                  <p className="subtle-text">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="surface-card rounded-3xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-sm subtle-text">Current sprint</span>
              <span className="text-sm font-medium" style={{ color: "var(--accent)" }}>
                Apex Hack '25
              </span>
            </div>
            <div className="space-y-3 text-sm muted-text">
              <div className="flex justify-between">
                <span>Product owner</span>
                <span className="font-medium">DevRel Asia</span>
              </div>
              <div className="flex justify-between">
                <span>Use case</span>
                <span className="font-medium">AI partner hub</span>
              </div>
              <div className="flex justify-between">
                <span>Next demo window</span>
                <span className="font-medium">Today · 20:00 UTC</span>
              </div>
            </div>
            <div className="rounded-2xl p-4" style={{ background: "var(--muted)" }}>
              <p className="text-xs uppercase tracking-[0.4em] mb-2" style={{ color: "var(--foreground)" }}>
                focus
              </p>
              <p className="text-base leading-relaxed muted-text">
                Build once, present ready. GitForce keeps the UI minimal, instrumentation active, and handoff clear.
              </p>
            </div>
          </div>
        </section>

        <section id="process" className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col gap-3 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.4em]" style={{ color: "var(--accent)" }}>
              Sprint path
            </p>
            <h2 className="text-3xl font-semibold" style={{ color: "var(--foreground)" }}>
              A predictable arc for every 72-hour build.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {sprintPillars.map(({ title, detail }) => (
              <article key={title} className="surface-card rounded-3xl p-6 space-y-3">
                <h3 className="text-lg font-medium" style={{ color: "var(--foreground)" }}>
                  {title}
                </h3>
                <p className="text-sm subtle-text">{detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[3fr,2fr]">
          <div className="surface-card rounded-3xl p-6 space-y-5">
            <p className="text-xs uppercase tracking-[0.4em]" style={{ color: "var(--accent)" }}>
              Collaboration kit
            </p>
            <h2 className="text-2xl font-semibold" style={{ color: "var(--foreground)" }}>
              What we deliver with every engagement.
            </h2>
            <ul className="space-y-3 text-sm muted-text">
              {deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full" style={{ background: "var(--accent)", marginTop: "6px" }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4 muted-text">
            {partnerTracks.map(({ title, copy }) => (
              <div key={title} className="surface-card rounded-2xl p-5 space-y-2">
                <p className="text-xs uppercase tracking-[0.4em]" style={{ color: "var(--accent)" }}>
                  Track
                </p>
                <h3 className="text-xl font-medium" style={{ color: "var(--foreground)" }}>
                  {title}
                </h3>
                <p className="text-sm subtle-text">{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-[2fr,3fr]">
          <div className="surface-card rounded-3xl p-6 space-y-4">
            <p className="text-xs uppercase tracking-[0.4em]" style={{ color: "var(--accent)" }}>
              Impact in Nepal
            </p>
            <div className="space-y-4">
              {impactHighlights.map(({ title, detail }) => (
                <article key={title} className="space-y-2">
                  <h3 className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>
                    {title}
                  </h3>
                  <p className="text-sm muted-text leading-relaxed">{detail}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="surface-card rounded-3xl p-6 space-y-4">
            <h2 className="text-2xl font-semibold" style={{ color: "var(--foreground)" }}>
              Principles we stand by
            </h2>
            <ul className="space-y-3 text-sm muted-text leading-relaxed">
              {principles.map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <span className="h-2 w-2 rounded-full mt-2" style={{ background: "var(--accent)" }} />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm subtle-text">
              GitForce will always prioritize partners who respect Nepal’s context and honor strict confidentiality.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
