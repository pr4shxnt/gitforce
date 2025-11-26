"use client";

export default function Footer() {
  return (
    <footer className="px-6 md:px-10 lg:px-16 py-12 mt-16 border-t" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-6xl mx-auto flex flex-col gap-6 text-sm muted-text">
        <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.4em]" style={{ color: "var(--accent)" }}>
          <span>GitForce</span>
          <span>Sunway College · Kathmandu</span>
          <span>Built with respect & confidentiality</span>
        </div>
        <p>
          GitForce is a student-led engineering squad from Sunway College Kathmandu focused on bringing resilient
          solutions to Nepal’s toughest civic and commercial problems. We collaborate with organizations under strict
          privacy agreements and treat every build as production-grade work.
        </p>
        <div className="flex flex-wrap justify-between gap-4 text-xs uppercase tracking-[0.3em]">
          <span>Contact: team@gitforce.dev</span>
          <span>Available for hackathons, pilots, and SaaS builds</span>
          <span>© {new Date().getFullYear()} GitForce</span>
        </div>
      </div>
    </footer>
  );
}

