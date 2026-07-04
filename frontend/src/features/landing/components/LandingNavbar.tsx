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
    <header className="fixed top-8 left-0 z-50 flex w-full justify-center px-6">
      <div 
        className={cn(
          "flex items-center gap-24 rounded-full border transition-all duration-700 p-1.5",
          scrolled 
            ? "border-accent/25 bg-bg-secondary/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(99,102,241,0.1)]" 
            : "border-white/8 bg-white/[0.02] backdrop-blur-md shadow-none"
        )}
      >
        {/* Left — Logo */}
        <Link 
          to="/" 
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] active:scale-95"
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

        {/* Center — Nav links */}
        <nav className="flex items-center gap-14 px-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[13px] font-medium tracking-wide text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button 
          onClick={() => void handleCreate()}
          className="flex h-9 items-center justify-center rounded-full bg-accent px-8 text-[13px] font-semibold tracking-tight text-white transition-all hover:bg-accent/90 hover:shadow-[0_0_24px_rgba(99,102,241,0.35)] active:scale-95 cursor-pointer"
        >
          Launch Playground
        </button>
      </div>
    </header>
  );
};
