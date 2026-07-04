import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
];

export const LandingNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const handleCreate = () => {
    const generatedId = crypto.randomUUID();
    navigate(`/project/${generatedId}`, { state: { isNew: true } });
  };

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header className="fixed top-6 left-0 z-50 flex w-full justify-center px-6">
      <div
        className={cn(
          "flex items-center gap-16 rounded-full p-1.5 transition-all duration-700",
          scrolled
            ? "nav-glass-scrolled"
            : "nav-glass"
        )}
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent transition-all duration-500 hover:scale-105 hover:shadow-[0_0_24px_rgba(16,185,129,0.35)] active:scale-[0.96]"
          style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6 8L10 12L6 16"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13 16H18"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-12 px-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[13px] font-medium tracking-wide text-text-secondary transition-colors duration-300 hover:text-text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <button
          onClick={() => void handleCreate()}
          className="group flex h-9 items-center gap-2 rounded-full bg-accent px-6 text-[13px] font-semibold tracking-tight text-white transition-all duration-500 hover:bg-accent/90 hover:shadow-[0_0_28px_rgba(16,185,129,0.30)] active:scale-[0.96] cursor-pointer"
          style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
        >
          Launch Playground
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 group-hover:translate-x-0.5" style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}>
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 6H9.5M9.5 6L6 2.5M9.5 6L6 9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </button>
      </div>
    </header>
  );
};
