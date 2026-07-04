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
            ? "border-white/20 bg-white/[0.05] backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.15)]" 
            : "border-white/10 bg-white/[0.02] backdrop-blur-md shadow-none"
        )}
      >
        {/* Left — Logo */}
        <Link 
          to="/" 
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white transition-transform hover:scale-105 active:scale-95"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M6 8L10 12L6 16" 
              stroke="black" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            <path 
              d="M13 16H18" 
              stroke="black" 
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
          className="flex h-9 items-center justify-center rounded-full bg-white px-8 text-[13px] font-bold tracking-tight text-black transition-all hover:bg-white/95 active:scale-95 shadow-sm cursor-pointer"
        >
          Launch Playground
        </button>
      </div>
    </header>
  );
};
