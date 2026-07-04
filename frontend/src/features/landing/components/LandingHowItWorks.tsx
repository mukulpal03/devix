const STEPS = [
  {
    number: "01",
    label: "Create a project",
    copy: "Pick a template or start from scratch. Ready in under 3 seconds.",
  },
  {
    number: "02",
    label: "Write and run code",
    copy: "Full IDE in your browser. Terminal, file explorer, and live preview — everything you need.",
  },
  {
    number: "03",
    label: "Build and iterate",
    copy: "Use the playground to prototype ideas and test code instantly.",
  },
];

export const LandingHowItWorks = () => (
  <section
    className="px-6"
    style={{
      backgroundColor: "var(--surface-page-base)",
      paddingTop: "84px",
      paddingBottom: "84px",
    }}
  >
    <div className="mx-auto max-w-[1200px]">
      {/* Header */}
      <div className="mb-12" style={{ maxWidth: "560px" }}>
        <div
          className="mb-4 font-mono text-[12px] font-normal uppercase tracking-[0.04em]"
          style={{ color: "var(--text-body-muted)" }}
        >
          How it works
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
          From zero to shipped in minutes.
        </h2>
      </div>

      {/* Steps — 3-column card grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <div
            key={step.number}
            className="flex flex-col h-full"
            style={{
              backgroundColor:
                i % 2 === 0
                  ? "var(--surface-elevated)"
                  : "var(--surface-warm-card)",
              borderRadius: "24px",
              padding: "31px",
              border: "none",
              boxShadow: "none",
              minHeight: "200px",
            }}
          >
            {/* Step number — Anthropic Mono */}
            <div className="mb-6 flex items-baseline gap-2">
              <span
                className="font-mono text-[14px] font-medium uppercase"
                style={{ color: "var(--text-body-subtle)" }}
              >
                {step.number}.
              </span>
            </div>

            {/* Content */}
            <h3
              className="mb-3 font-sans text-[18px] font-semibold"
              style={{ color: "var(--text-heading)" }}
            >
              {step.label}
            </h3>
            <p
              className="font-sans text-[15px] font-normal leading-[1.4]"
              style={{ color: "var(--text-body)" }}
            >
              {step.copy}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
