import Navbar from "../Components/Root/Navbar";
import ResNavbar from "../Components/Root/ResNavbar";

const members = [
  {
    name: "Prashant Adhikari",
    role: "Lead Engineer · Product",
    bio: "Systems thinker focused on IoT networks, cloud automation, and translating community needs into reliable software.",
    focus: "Owns architecture decisions, leads incoming members outreach, and mentors incoming members.",
  },
  {
    name: "Rojin Baniya",
    role: "AI/ML Engineer · Computer Vision",
    bio: "Builds and trains integrated AI/ML models within a framework that is scalable and reliable.",
    focus: "Keeps GitForce demos crisp, handles design systems, and manages device testing labs.",
  },
];

const openRoles = [
  { title: "AI/ML builder", detail: "Model fine-tuning, evaluation harnesses, and data governance for civic use cases." },
  { title: "Mobile engineer", detail: "Hybrid/native experiences that sync with our IoT and SaaS stacks." },
  { title: "Partner success", detail: "Run standups, capture briefs, and ensure confidentiality with stakeholders." },
];

export default function Team() {
  return (
    <>
      <Navbar />
      <ResNavbar/>
      <main className="px-6 md:px-10 lg:px-16 py-12 space-y-16">
        <section className="max-w-6xl mx-auto space-y-4">
          <p className="text-xs uppercase tracking-[0.4em]" style={{ color: "var(--accent)" }}>
            Team
          </p>
          <h1 className="text-4xl font-semibold" style={{ color: "var(--foreground)" }}>
            Students from Sunway College Kathmandu, operating like a pro product squad.
          </h1>
          <p className="text-lg muted-text leading-relaxed">
            GitForce is intentionally small. Every member can ship across the stack, talk to partners, and present to
            judges. We are expanding, but only with people who understand Nepal’s infrastructure realities and respect
            confidentiality.
          </p>
        </section>

        <section className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2">
          {members.map(({ name, role, bio, focus }) => (
            <article key={name} className="surface-card rounded-3xl p-6 space-y-3">
              <div>
                <h2 className="text-2xl font-semibold" style={{ color: "var(--foreground)" }}>
                  {name}
                </h2>
                <p className="text-sm uppercase tracking-[0.3em]" style={{ color: "var(--accent)" }}>
                  {role}
                </p>
              </div>
              <p className="text-sm muted-text leading-relaxed">{bio}</p>
              <p className="text-sm subtle-text">
                <span className="font-semibold" style={{ color: "var(--foreground)" }}>
                  Currently:
                </span>{" "}
                {focus}
              </p>
            </article>
          ))}
        </section>

        <section className="max-w-6xl mx-auto grid lg:grid-cols-[2fr,3fr] gap-8 items-center">
          <div className="surface-card rounded-3xl p-6 space-y-4">
            <h2 className="text-2xl font-semibold" style={{ color: "var(--foreground)" }}>
              Recruiting permanent members
            </h2>
            <p className="text-sm muted-text leading-relaxed">
              We are fielding applications from builders who can commit to long-term civic projects while attending
              Sunway College or neighboring universities. GitForce is a safe place for bold ideas and for honoring our
              collaborators’ trust.
            </p>
          </div>
          <div className="grid gap-4">
            {openRoles.map(({ title, detail }) => (
              <div key={title} className="surface-card rounded-2xl p-5 space-y-2">
                <h3 className="text-lg font-medium" style={{ color: "var(--foreground)" }}>
                  {title}
                </h3>
                <p className="text-sm muted-text">{detail}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

