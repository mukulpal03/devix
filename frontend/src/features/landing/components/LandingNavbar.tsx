import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Docs", href: "#docs" },
  { label: "Pricing", href: "#pricing" },
  { label: "Changelog", href: "#changelog" },
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
        "sticky top-0 z-50 flex h-14 w-full items-center bg-bg-primary/85 backdrop-blur-xl transition-colors duration-200",
        scrolled
          ? "border-b border-border-accent/10"
          : "border-b border-border-default/5",
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6">
        {/* Left — Logo */}
        <Link to="/" className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
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
          <span className="font-heading text-[15px] font-medium tracking-tight text-text-primary">
            devix
          </span>
        </Link>

        {/* Center — Nav links */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right — Sign in + CTA */}
        <div className="flex items-center gap-4">
          <a
            href="#signin"
            className="text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            Sign in
          </a>
          <Button className="h-8 rounded-[4px] bg-accent px-3 text-sm font-medium text-white shadow-[0_0_16px_rgba(91,127,255,0.3)] hover:opacity-90">
            <a href="#start">Start building</a>
          </Button>
        </div>
      </div>
    </header>
  );
};
