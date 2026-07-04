import { useNavigate } from "react-router-dom";

export const LandingHero = () => {
  const navigate = useNavigate();

  const handleCreate = () => {
    const generatedId = crypto.randomUUID();
    navigate(`/project/${generatedId}`, { state: { isNew: true } });
  };

  return (
    <section
      className="relative px-6 pt-32 pb-24"
      style={{ backgroundColor: "var(--surface-page-base)" }}
    >
      {/* Content — Centered stacked layout */}
      <div className="mx-auto flex flex-col items-center gap-16 w-full max-w-[1200px]">
        {/* Header Block */}
        <div className="flex flex-col items-center text-center max-w-[800px] pt-8">
          {/* Headline — Anthropic Sans bold with underline emphasis */}
          <h1
            className="mb-6 font-display font-bold leading-[1.1]"
            style={{
              fontSize: "clamp(40px, 6vw, 72px)",
              letterSpacing: "-0.02em",
              color: "var(--text-heading)",
            }}
          >
            Code. <span className="emphasis-underline">Run.</span> Ship.
          </h1>

          {/* Subheading — centered brief paragraph */}
          <p
            className="mb-10 max-w-[560px] font-sans text-[20px] leading-[1.4] mx-auto"
            style={{ color: "var(--text-body)", letterSpacing: "-0.002em" }}
          >
            A full development environment in your browser. No setup. No config.
            Just code.
          </p>

          {/* CTA Row */}
          <div className="flex items-center justify-center gap-6">
            {/* Brand button — slate-dark fill, ivory text */}
            <button
              onClick={() => void handleCreate()}
              className="btn-brand font-sans text-[15px] font-medium px-[31px] py-[12px]"
              style={{ letterSpacing: "-0.002em" }}
            >
              Launch Playground
            </button>

            {/* Arrow Text Link */}
            <a
              href="#features"
              className="arrow-link font-sans text-[15px] font-normal"
              style={{ color: "var(--text-heading)" }}
            >
              Learn more →
            </a>
          </div>
        </div>

        {/* Coding Playground Visual — Centered and Large */}
        <div className="relative w-full max-w-[1200px] mx-auto overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-default-subtle)] shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
          <img
            src="/1.png"
            alt="Devix Coding Playground"
            loading="eager"
            className="w-full h-auto object-contain block transition-transform duration-700 hover:scale-[1.01]"
          />
        </div>
      </div>
    </section>
  );
};
