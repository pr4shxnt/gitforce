import Navbar from "../Components/Root/Navbar";
import ResNavbar from "../Components/Root/ResNavbar";

const commitments = [
  {
    title: "Respect for privacy",
    copy: "Every collaboration includes NDAs, encrypted repos, and strict access control. We treat partner data as if it belongs to the next billion Nepalese citizens.",
  },
  {
    title: "Real-world focus",
    copy: "We build for emergency response, municipal utilities, education equity, and fintech access—the problems we live with in Nepal every day.",
  },
  {
    title: "Students, founders, builders",
    copy: "GitForce started in the labs of Sunway College Kathmandu and operates like a product studio. We study in the morning and ship production code at night.",
  },
];

const hackathonStory = [
  "GitForce has participated in three national-level hackathons since 2023.",
  "We have placed first in two of them, with judges citing our system reliability and the clarity of our demos.",
  "The third hackathon led to a long-term collaboration where we continue to maintain the deployed tooling.",
];

export default function About() {
  return (
    <>
      <Navbar />
      <ResNavbar/>
      <main className="px-6 md:px-10 lg:px-16 py-12 space-y-16">
        <section className="max-w-6xl mx-auto space-y-6">
          <p className="text-xs uppercase tracking-[0.4em]" style={{ color: "var(--accent)" }}>
            About GitForce
          </p>
          <h1 className="text-4xl font-semibold" style={{ color: "var(--foreground)" }}>
            A Nepal-first engineering unit for hackathons and production pilots.
          </h1>
          <p className="text-lg muted-text leading-relaxed">
            We formed GitForce to prove that student teams can deliver mission-grade software. Operating out of Sunway
            College Kathmandu, we mix IoT, full-stack web, mobile, AI/ML, and cloud infrastructure into compact sprints.
            Our north star is simple: solve native problems inside Nepal with the same care that top SaaS companies give
            to global clients.
          </p>
        </section>

        <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {commitments.map(({ title, copy }) => (
            <article key={title} className="surface-card rounded-3xl p-6 space-y-3">
              <h2 className="text-xl font-medium" style={{ color: "var(--foreground)" }}>
                {title}
              </h2>
              <p className="text-sm muted-text leading-relaxed">{copy}</p>
            </article>
          ))}
        </section>

        <section className="max-w-6xl mx-auto space-y-5">
          <h2 className="text-2xl font-semibold" style={{ color: "var(--foreground)" }}>
            Hackathon performance
          </h2>
          <div className="surface-card rounded-3xl p-6 space-y-3 muted-text leading-relaxed">
            {hackathonStory.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto space-y-4">
          <h2 className="text-2xl font-semibold" style={{ color: "var(--foreground)" }}>
            Long-term vision
          </h2>
          <p className="text-base muted-text leading-relaxed">
            We are building GitForce as a permanent strike team that can sit next to ministries, NGOs, venture builders,
            and private companies. Today our roster lists Prashant Adhikari and Rojin Baniya as core members, with
            additional engineers joining soon. GitForce will always remain grounded in Nepal while partnering with
            regional and global teams who respect our values.
          </p>
        </section>
      </main>
    </>
  );
}

