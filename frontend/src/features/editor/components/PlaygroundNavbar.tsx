import { Link } from "react-router-dom";

interface PlaygroundNavbarProps {
  projectId: string;
}

export const PlaygroundNavbar = ({ projectId }: PlaygroundNavbarProps) => {
  return (
    <header
      className="z-20 flex h-12 w-full shrink-0 items-center justify-between px-4"
      style={{
        backgroundColor: "var(--surface-page-base)",
        borderBottom: "1px solid var(--border-default-subtle)",
        boxShadow: "none",
      }}
    >
      {/* Left — Logo + Breadcrumb */}
      <div className="flex items-center gap-4">
        <Link
          to="/"
          title="Back to Home"
          className="font-heading text-[16px] font-bold tracking-tight transition-colors duration-200"
          style={{
            color: "var(--text-heading)",
            letterSpacing: "-0.01em",
            textDecoration: "none",
          }}
        >
          devix
        </Link>

        <div
          className="h-4 w-px"
          style={{ backgroundColor: "var(--border-default-subtle)" }}
        />

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-sans text-[14px]">
          <span style={{ color: "var(--text-body-muted)" }}>workspace</span>
          <span style={{ color: "var(--text-body-muted)" }}>/</span>
          <span
            className="font-medium px-2 py-0.5"
            style={{
              color: "var(--text-heading)",
              backgroundColor: "var(--surface-elevated)",
              border: "1px solid var(--border-default-subtle)",
              borderRadius: "0px",
            }}
          >
            {projectId.slice(0, 8)}...
          </span>
        </div>
      </div>
    </header>
  );
};
