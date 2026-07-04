const TESTIMONIALS = [
  {
    quote:
      "Devix cut our onboarding time from days to minutes. New devs have a working environment before the standup ends.",
    name: "Sarah Chen",
    role: "Engineering Lead @ Anthropic",
    initials: "SC",
  },
  {
    quote:
      "The terminal is actually usable. Not a toy. Real bash, real output. I run my full build pipeline from it.",
    name: "Tom Keller",
    role: "Senior SWE @ Stripe",
    initials: "TK",
  },
  {
    quote:
      "I was skeptical about browser IDEs. Then I used Devix. Monaco + xterm in one place — it just works.",
    name: "Priya Nair",
    role: "Indie Hacker",
    initials: "PN",
  },
  {
    quote:
      "Our team uses Devix for interview rounds. Candidates get a real environment, we get signal. Game changer.",
    name: "Alex Rivera",
    role: "CTO @ Vercel",
    initials: "AR",
  },
  {
    quote:
      "Collaborative editing with live presence is exactly what pair programming should feel like.",
    name: "James Wu",
    role: "Staff Eng @ Linear",
    initials: "JW",
  },
  {
    quote:
      "Deploy from the terminal straight to Railway. The workflow is so clean it feels like cheating.",
    name: "Maya Osei",
    role: "Full-Stack @ Supabase",
    initials: "MO",
  },
];

function TestimonialCard({ t }: { t: (typeof TESTIMONIALS)[0] }) {
  return (
    <div
      className="mb-4 flex flex-col justify-between h-full"
      style={{
        backgroundColor: "var(--surface-warm-card)",
        borderRadius: "24px",
        padding: "31px",
        border: "none",
        boxShadow: "none",
      }}
    >
      <p
        className="mb-6 font-sans text-[15px] leading-[1.5]"
        style={{ color: "var(--text-body)" }}
      >
        "{t.quote}"
      </p>
      <div className="flex items-center gap-3">
        {/* Square avatar — 0px radius */}
         <div
          className="flex h-10 w-10 shrink-0 items-center justify-center font-sans text-[13px] font-medium"
          style={{
            backgroundColor: "var(--bg-brand)",
            color: "var(--text-on-brand)",
            borderRadius: "0px",
          }}
        >
          {t.initials}
        </div>
        <div>
          <div
            className="font-sans text-[15px] font-medium"
            style={{ color: "var(--text-heading)" }}
          >
            {t.name}
          </div>
          <div
            className="font-sans text-[14px] font-normal"
            style={{ color: "var(--text-body-subtle)" }}
          >
            {t.role}
          </div>
        </div>
      </div>
    </div>
  );
}

export const LandingTestimonials = () => {
  const col1 = TESTIMONIALS.filter((_, i) => i % 3 === 0);
  const col2 = TESTIMONIALS.filter((_, i) => i % 3 === 1);
  const col3 = TESTIMONIALS.filter((_, i) => i % 3 === 2);

  return (
    <section
      className="px-6"
      style={{
        backgroundColor: "var(--surface-page-base)",
        paddingTop: "84px",
        paddingBottom: "84px",
      }}
    >
      <div className="mx-auto w-full max-w-[1200px]">
        {/* Header */}
        <div className="mb-12" style={{ maxWidth: "560px" }}>
          <div
            className="mb-4 font-mono text-[12px] font-normal uppercase tracking-[0.04em]"
            style={{ color: "var(--text-body-muted)" }}
          >
            Loved by builders
          </div>
          <h2
            className="font-display font-semibold tracking-tight"
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              color: "var(--text-heading)",
              letterSpacing: "-0.01em",
              lineHeight: "1.15",
            }}
          >
            What engineers say.
          </h2>
        </div>

        {/* Masonry 3-col */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex flex-col">
            {col1.map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>
          <div className="flex flex-col sm:mt-8">
            {col2.map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>
          <div className="flex flex-col">
            {col3.map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
