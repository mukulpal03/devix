import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
];

export const LandingNavbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex h-16 w-full items-center bg-bg-primary/85 backdrop-blur-xl transition-colors duration-200",
        scrolled
          ? "border-b border-border-accent/10"
          : "border-b border-border-default/5",
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-8">
        {/* Left — Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
            <rect x="2" y="2" width="7" height="7" className="fill-accent" />
            <rect
              x="11"
              y="2"
              width="7"
              height="7"
              className="fill-accent-glow"
            />
            <rect
              x="2"
              y="11"
              width="7"
              height="7"
              className="fill-accent-glow"
            />
            <rect x="11" y="11" width="7" height="7" className="fill-accent" />
          </svg>
          <span className="font-heading text-lg font-semibold tracking-tight text-text-primary">
            devix
          </span>
        </Link>

        {/* Right — Nav links */}
        <nav className="flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};
