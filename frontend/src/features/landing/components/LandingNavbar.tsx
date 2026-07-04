import { Link, useNavigate } from "react-router-dom";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
];

export const LandingNavbar = () => {
  const navigate = useNavigate();

  const handleCreate = () => {
    const generatedId = crypto.randomUUID();
    navigate(`/project/${generatedId}`, { state: { isNew: true } });
  };

  return (
    <header
      className="fixed top-0 left-0 z-50 w-full transition-all duration-200 ease-out"
      style={{
        backgroundColor: "var(--surface-page-base)",
      }}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
        {/* Logo / Wordmark */}
        <Link
          to="/"
          className="font-heading text-[20px] font-bold tracking-tight transition-colors duration-200"
          style={{ color: "var(--text-heading)", letterSpacing: "-0.01em" }}
        >
          devix
        </Link>

        {/* Nav links + CTA */}
        <div className="flex items-center gap-2">
          <nav className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-2 font-sans text-[15px] font-normal transition-colors duration-200"
                style={{ color: "var(--text-body)", letterSpacing: "-0.002em" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--text-heading)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-body)";
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Primary Nav CTA */}
          <button
            onClick={() => void handleCreate()}
            className="ml-4 btn-brand font-sans text-[14px] font-medium px-[20px] py-[8px]"
            style={{ letterSpacing: "-0.002em" }}
          >
            Launch Playground
          </button>
        </div>
      </div>
    </header>
  );
};
