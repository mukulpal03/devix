import { useNavigate } from "react-router-dom";
import { useCreateProject } from "@/hooks/useCreateProject";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const AVATARS = ["JD", "MK", "AR", "TP", "SL"];
const AVATAR_COLORS = ["#5B7FFF", "#A78BFA", "#2DD98F", "#FFB547", "#FF5757"];

const FADE_UP_VARIANTS = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export const LandingHero = () => {
  const { createProject, isCreatingProject, projectError } = useCreateProject();
  const navigate = useNavigate();

  const handleCreate = async () => {
    try {
      const res = await createProject();
      navigate(`/project/${res.id}`);
    } catch {}
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20 pb-16">
      {/* Dot grid background */}
      <div className="dot-grid absolute inset-0 z-0 pointer-events-none" />

      {/* Accent glow */}
      <div className="absolute top-[10%] left-1/2 z-0 h-[400px] w-[700px] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(91,127,255,0.12)_0%,transparent_70%)] pointer-events-none" />

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.08 }}
        className="relative z-10 flex w-full max-w-[860px] flex-col items-center text-center"
      >
        {/* Badge */}
        <motion.div variants={FADE_UP_VARIANTS} transition={{ duration: 0.6 }}>
          <Badge
            variant="muted"
            className="mb-7 inline-flex h-auto items-center gap-2 rounded-full border border-border-default/10 bg-bg-secondary px-3 py-1 text-xs font-normal text-text-secondary"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent sm:h-1.5 sm:w-1.5" />
            Now in public beta
          </Badge>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={FADE_UP_VARIANTS}
          transition={{ duration: 0.6 }}
          className="mb-5 font-display text-5xl font-normal tracking-tight italic text-text-primary leading-[1.05] sm:text-[clamp(52px,8vw,88px)]"
        >
          Code.{" "}
          <span className="accent-gradient">Run.</span>{" "}
          Ship.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={FADE_UP_VARIANTS}
          transition={{ duration: 0.6 }}
          className="mb-9 max-w-[520px] font-heading text-lg leading-relaxed text-text-secondary sm:text-xl"
        >
          A full development environment in your browser. No setup. No config.
          Just code.
        </motion.p>

        {/* CTA Row */}
        <motion.div
          variants={FADE_UP_VARIANTS}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Button
            size="lg"
            onClick={() => void handleCreate()}
            disabled={isCreatingProject}
            className={cn(
              "h-10 rounded-[4px] bg-accent px-5 text-sm font-medium text-white shadow-[0_0_20px_rgba(91,127,255,0.35)] transition-opacity hover:opacity-90 disabled:opacity-70"
            )}
          >
            {isCreatingProject ? (
              <>
                <Spinner className="mr-2" />
                Allocating...
              </>
            ) : (
              "Start for free"
            )}
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="group h-10 rounded-[4px] border-border-default/12 px-5 text-sm font-medium text-text-primary hover:border-accent"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mr-2">
              <path d="M2.5 1.5L9.5 6L2.5 10.5V1.5Z" className="fill-text-primary" />
            </svg>
            View demo
          </Button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          variants={FADE_UP_VARIANTS}
          transition={{ duration: 0.6 }}
          className="mt-5 flex items-center gap-2.5"
        >
          <div className="flex">
            {AVATARS.map((initials, i) => (
              <div
                key={initials}
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full border-2 border-bg-primary text-[9px] font-medium text-white",
                  i !== 0 && "-ml-2"
                )}
                style={{ background: AVATAR_COLORS[i] }}
              >
                {initials}
              </div>
            ))}
          </div>
          <span className="text-sm font-heading text-text-tertiary">
            Trusted by 12,000+ developers
          </span>
        </motion.div>

        {/* Error */}
        {projectError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 rounded-md border border-error/30 bg-error/10 px-4 py-3 text-sm text-error"
          >
            {projectError}
          </motion.div>
        )}
      </motion.div>

      {/* Hero Visual — Product UI Mock */}
      <motion.div
        variants={FADE_UP_VARIANTS}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-10 mx-auto mt-16 w-full max-w-[1000px]"
      >
        <div className="overflow-hidden rounded-lg border border-white/8 bg-bg-editor shadow-[0_0_80px_rgba(91,127,255,0.12),0_0_0_1px_rgba(255,255,255,0.06)]">
          {/* Window chrome */}
          <div className="flex items-center gap-1.5 bg-bg-primary px-4 py-2.5 border-b border-white/6">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5757]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FFB547]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#2DD98F]" />
            <span className="flex-1 text-center font-heading text-xs text-text-tertiary">
              devix — workspace / App.tsx
            </span>
          </div>

          {/* IDE Layout */}
          <div className="flex h-[420px]">
            {/* Sidebar */}
            <div className="w-[180px] shrink-0 border-r border-white/6 bg-bg-editor py-2">
              <div className="px-3 py-1.5 text-[11px] font-heading uppercase tracking-widest text-text-tertiary">
                Explorer
              </div>
              {[
                { name: "src", type: "folder", depth: 0 },
                {
                  name: "App.tsx",
                  type: "file",
                  depth: 1,
                  color: "#4FC1FF",
                  active: true,
                },
                { name: "index.css", type: "file", depth: 1, color: "#E879F9" },
                { name: "main.tsx", type: "file", depth: 1, color: "#4FC1FF" },
                { name: "components", type: "folder", depth: 1 },
                {
                  name: "package.json",
                  type: "file",
                  depth: 0,
                  color: "#FFB547",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1 font-heading text-sm transition-colors",
                    item.active ? "bg-accent/10 border-l-2 border-accent text-text-primary" : "text-text-secondary hover:bg-white/4 border-l-2 border-transparent"
                  )}
                  style={{ paddingLeft: `${12 + item.depth * 12}px` }}
                >
                  {item.type === "folder" ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M1 3.5A1 1 0 012 2.5h3l1 1h4a1 1 0 011 1V9.5a1 1 0 01-1 1H2a1 1 0 01-1-1V3.5z"
                        className="fill-accent/50"
                      />
                    </svg>
                  ) : (
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                      <rect
                        x="0"
                        y="0"
                        width="7"
                        height="9"
                        rx="1"
                        fill={item.color || "#6E6D6A"}
                        className="opacity-80"
                      />
                    </svg>
                  )}
                  {item.name}
                </div>
              ))}
            </div>

            {/* Editor */}
            <div className="flex flex-1 flex-col overflow-hidden">
              {/* Tabs */}
              <div className="flex h-8 bg-bg-primary border-b border-white/6">
                <div className="flex items-center gap-1.5 border-b border-accent bg-bg-editor px-4 font-heading text-sm text-text-primary">
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                    <rect
                      x="0"
                      y="0"
                      width="7"
                      height="9"
                      rx="1"
                      fill="#4FC1FF"
                      className="opacity-80"
                    />
                  </svg>
                  App.tsx
                </div>
              </div>

              {/* Code */}
              <div className="flex-1 overflow-hidden p-4 font-mono text-[13px] leading-relaxed">
                <div>
                  <span className="text-[#C792EA]">import</span>{" "}
                  <span className="text-[#89DDFF]">{"{"}</span>{" "}
                  <span className="text-[#82AAFF]">useState</span>{" "}
                  <span className="text-[#89DDFF]">{"}"}</span>{" "}
                  <span className="text-[#C792EA]">from</span>{" "}
                  <span className="text-[#C3E88D]">'react'</span>
                </div>
                <br />
                <div>
                  <span className="text-[#C792EA]">
                    export default function
                  </span>{" "}
                  <span className="text-[#82AAFF]">App</span>
                  <span className="text-[#89DDFF]">()</span>{" "}
                  <span className="text-[#89DDFF]">{"{"}</span>
                </div>
                <div className="pl-6">
                  <span className="text-[#C792EA]">const</span> [
                  <span className="text-[#EEFFFF]">count</span>,{" "}
                  <span className="text-[#EEFFFF]">setCount</span>] ={" "}
                  <span className="text-[#82AAFF]">useState</span>
                  <span className="text-[#89DDFF]">(</span>
                  <span className="text-[#F78C6C]">0</span>
                  <span className="text-[#89DDFF]">)</span>
                </div>
                <br />
                <div className="pl-6">
                  <span className="text-[#C792EA]">return</span>{" "}
                  <span className="text-[#89DDFF]">(</span>
                </div>
                <div className="pl-12 text-[#89DDFF]">
                  {"<"}
                  <span className="text-[#82AAFF]">div</span>{" "}
                  <span className="text-[#FFCB6B]">className</span>
                  ="
                  <span className="text-[#C3E88D]">min-h-screen</span>
                  "{">"}
                </div>
                <div className="pl-16 text-[#89DDFF]">
                  {"<"}
                  <span className="text-[#82AAFF]">h1</span>
                  {">"}
                  <span className="text-[#EEFFFF]">
                    Devix is blazing fast
                  </span>
                  {"</h1>"}
                </div>
                <div className="pl-12 text-[#89DDFF]">
                  {"</div>"}
                </div>
                <div className="pl-6 text-[#89DDFF]">
                  )
                </div>
                <div>
                  <span className="text-[#89DDFF]">{"}"}</span>
                </div>
              </div>

              {/* Terminal */}
              <div className="h-[120px] bg-bg-deep border-t border-white/7 p-2 px-3 font-mono text-xs">
                <div className="mb-2 text-[11px] uppercase tracking-widest text-text-tertiary">
                  Terminal
                </div>
                <div>
                  <span className="text-accent">~/workspace</span>
                  <span className="text-text-secondary"> $ </span>
                  <span className="text-text-primary">pnpm run dev</span>
                </div>
                <div className="mt-1 text-terminal-green">
                  {" "}
                  VITE v6.0.0 ready in 142ms
                </div>
                <div className="text-accent">
                  {" "}
                  ➜ Local:{" "}
                  <span className="text-text-secondary">
                    http://localhost:5173/
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-1">
                  <span className="text-accent">~/workspace</span>
                  <span className="text-text-secondary"> $ </span>
                  <span className="inline-block h-3.5 w-2 animate-pulse bg-terminal-green" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
