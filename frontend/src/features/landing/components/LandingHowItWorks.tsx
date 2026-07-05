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
    className="px-6 relative"
    style={{
      backgroundColor: "var(--surface-page-base)",
      paddingTop: "120px",
      paddingBottom: "120px",
    }}
  >
    <div className="mx-auto max-w-[1200px]">
      {/* Header */}
      <div
        className="mb-16 md:mx-auto md:text-center flex flex-col md:items-center"
        style={{ maxWidth: "560px" }}
      >
        <div
          className="mb-4 font-mono text-[12px] font-normal uppercase tracking-[0.04em]"
          style={{ color: "var(--text-body-muted)" }}
        >
          How it works
        </div>
        <h2
          className="font-display font-semibold tracking-tight"
          style={{
            fontSize: "clamp(32px, 4vw, 48px)",
            color: "var(--text-heading)",
            letterSpacing: "-0.01em",
            lineHeight: "1.10",
          }}
        >
          From zero to shipped in minutes.
        </h2>
      </div>

      {/* Center Video Container */}
      <div className="mb-16 w-full px-4 md:px-0">
        <div
          className="w-full mx-auto overflow-hidden border border-[var(--border-default-subtle)]"
          style={{
            borderRadius: "24px",
            backgroundColor: "var(--surface-elevated)", // Fallback if video hasn't loaded
            boxShadow: "none",
            maxWidth: "1000px",
          }}
        >
          <video
            src="/devix.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto object-cover"
            style={{
              borderRadius: "24px",
              display: "block",
              aspectRatio: "16/9",
            }}
          />
        </div>
      </div>

      {/* Steps — Card-less Editorial Grid */}
      <div className="grid gap-12 md:gap-8 lg:gap-16 md:grid-cols-3 mt-12">
        {STEPS.map((step) => (
          <div
            key={step.number}
            className="flex flex-col"
            style={{
              borderTop: "1px solid var(--border-default)", // Sharp editorial ink-line
              paddingTop: "24px",
            }}
          >
            {/* Step number */}
            <div className="mb-4 flex items-baseline gap-2">
              <span
                className="font-mono text-[14px] font-medium uppercase tracking-[0.04em]"
                style={{ color: "var(--text-body-subtle)" }}
              >
                Step {step.number}
              </span>
            </div>

            {/* Content */}
            <h3
              className="mb-3 font-sans text-[20px] font-semibold tracking-tight"
              style={{ color: "var(--text-heading)" }}
            >
              {step.label}
            </h3>
            <p
              className="font-sans text-[15.5px] font-normal leading-[1.6]"
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
