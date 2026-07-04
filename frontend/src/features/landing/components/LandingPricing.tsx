export const LandingPricing = () => {
  return (
    <section
      id="pricing"
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
            Pricing
          </div>
          <h2
            className="mb-4 font-display font-semibold tracking-tight"
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              color: "var(--text-heading)",
              letterSpacing: "-0.01em",
              lineHeight: "1.15",
            }}
          >
            Simple pricing, no surprises.
          </h2>
          <p
            className="font-sans text-[18px] leading-[1.4]"
            style={{ color: "var(--text-body)", letterSpacing: "-0.002em" }}
          >
            Start free. Scale when you need to.
          </p>
        </div>

        {/* Dark Editorial Feature Card — pricing content */}
        <div
          className="text-center"
          style={{
            backgroundColor: "var(--surface-feature-dark)",
            borderRadius: "24px",
            padding: "0",
            border: "none",
            boxShadow: "none",
          }}
        >
          <div className="px-8 py-16 sm:px-16">
            <div className="mx-auto max-w-xl">
              {/* Badge — 0px radius, ivory border on dark */}
              <div
                className="mb-8 inline-block font-mono text-[12px] font-normal uppercase tracking-[0.04em]"
                style={{
                  color: "var(--surface-page-base)",
                  border: "1px solid var(--border-on-feature-dark-strong)",
                  borderRadius: "0px",
                  padding: "4px 12px",
                }}
              >
                Phase 1: Alpha
              </div>

              {/* Headline — Serif on dark surface */}
              <h3
                className="mb-4 font-serif font-normal"
                style={{
                  fontSize: "clamp(32px, 5vw, 48px)",
                  color: "var(--surface-page-base)",
                  lineHeight: "1.1",
                }}
              >
                Pricing is coming soon.
              </h3>

              <p
                className="mb-10 font-sans text-[16px] leading-[1.5] mx-auto"
                style={{ color: "var(--text-on-feature-dark-subtle)", maxWidth: "420px" }}
              >
                We're currently in alpha and everything is free to use. Create
                as many projects as you want, and enjoy built-in{" "}
                <span style={{ color: "var(--surface-page-base)", fontWeight: 500 }}>
                  collaborative editing
                </span>{" "}
                while we build the most powerful browser-based IDE.
              </p>

              {/* Divider */}
              <div
                className="mb-10 mx-auto"
                style={{
                  height: "1px",
                  backgroundColor: "var(--border-on-feature-dark)",
                  maxWidth: "300px",
                }}
              />

              {/* Stats */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
                <div className="text-center">
                  <div
                    className="font-display font-bold tracking-tight"
                    style={{ fontSize: "40px", color: "var(--surface-page-base)" }}
                  >
                    $0
                  </div>
                  <div
                    className="mt-2 font-mono text-[10px] uppercase tracking-[0.04em]"
                    style={{ color: "var(--text-body-muted)" }}
                  >
                    Current Price
                  </div>
                </div>

                <div
                  className="h-10 w-px hidden sm:block"
                  style={{ backgroundColor: "var(--border-on-feature-dark)" }}
                />

                <div className="text-center">
                  <div
                    className="font-display font-bold tracking-tight"
                    style={{ fontSize: "40px", color: "var(--accent-clay)" }}
                  >
                    ∞
                  </div>
                  <div
                    className="mt-2 font-mono text-[10px] uppercase tracking-[0.04em]"
                    style={{ color: "var(--text-body-muted)" }}
                  >
                    Projects
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
