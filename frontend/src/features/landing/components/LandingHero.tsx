import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const FADE_UP_VARIANTS = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const CODE_LINES = [
  { delay: 0.8, content: <><span className="text-[#C792EA]">import</span> <span className="text-[#89DDFF]">{"{"}</span> <span className="text-[#82AAFF]">createApp</span> <span className="text-[#89DDFF]">{"}"}</span> <span className="text-[#C792EA]">from</span> <span className="text-[#C3E88D]">'devix'</span></> },
  { delay: 1.2, content: <><span className="text-[#55556A]">// Initialize workspace</span></> },
  { delay: 1.6, content: <><span className="text-[#C792EA]">const</span> <span className="text-[#EEFFFF]">app</span> = <span className="text-[#82AAFF]">createApp</span><span className="text-[#89DDFF]">({"{"}</span></> },
  { delay: 2.0, content: <><span className="pl-6 text-[#FFCB6B]">runtime</span><span className="text-[#89DDFF]">:</span> <span className="text-[#C3E88D]">'node:22'</span><span className="text-[#89DDFF]">,</span></> },
  { delay: 2.4, content: <><span className="pl-6 text-[#FFCB6B]">template</span><span className="text-[#89DDFF]">:</span> <span className="text-[#C3E88D]">'react-vite'</span></> },
  { delay: 2.8, content: <><span className="text-[#89DDFF]">{"}"})</span></> },
];

const TERMINAL_LINES = [
  { delay: 3.2, text: "✓ Dependencies installed", color: "text-success" },
  { delay: 3.6, text: "✓ Dev server running on :5173", color: "text-accent" },
  { delay: 4.0, text: "Ready in 2.1s", color: "text-accent-warm" },
];

const FILE_TREE_ITEMS = [
  { delay: 0.6, name: "src", type: "folder" },
  { delay: 0.9, name: "App.tsx", type: "file", indent: 1 },
  { delay: 1.1, name: "main.tsx", type: "file", indent: 1 },
  { delay: 1.3, name: "package.json", type: "file", indent: 0 },
  { delay: 1.5, name: "vite.config.ts", type: "file", indent: 0 },
];

function CodePulse() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [terminalLines, setTerminalLines] = useState(0);
  const [treeItems, setTreeItems] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // File tree items appear
    FILE_TREE_ITEMS.forEach((item, i) => {
      timers.push(setTimeout(() => setTreeItems(i + 1), item.delay * 1000));
    });

    // Code lines appear
    CODE_LINES.forEach((line, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), line.delay * 1000));
    });

    // Terminal lines appear
    TERMINAL_LINES.forEach((line, i) => {
      timers.push(setTimeout(() => setTerminalLines(i + 1), line.delay * 1000));
    });

    // Loop the animation
    const loopTimer = setTimeout(() => {
      setVisibleLines(0);
      setTerminalLines(0);
      setTreeItems(0);
      // Small delay then restart
      setTimeout(() => {
        setVisibleLines(0);
        setTerminalLines(0);
        setTreeItems(0);
      }, 200);
    }, 6500);
    timers.push(loopTimer);

    const cursorInterval = setInterval(() => setShowCursor(v => !v), 530);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(cursorInterval);
    };
  }, [visibleLines === 0 && terminalLines === 0]);

  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-bg-editor shadow-[0_0_80px_rgba(99,102,241,0.08),0_0_0_1px_rgba(99,102,241,0.06)]">
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 bg-bg-primary px-4 py-2.5 border-b border-white/[0.05]">
        <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#34D399]/70" />
        <span className="flex-1 text-center font-heading text-[11px] text-text-tertiary tracking-wide">
          devix — workspace
        </span>
      </div>

      {/* IDE Layout */}
      <div className="flex h-[380px]">
        {/* Sidebar */}
        <div className="w-[160px] shrink-0 border-r border-white/[0.05] bg-bg-editor py-2">
          <div className="px-3 py-1.5 text-[10px] font-heading font-medium uppercase tracking-[0.1em] text-text-tertiary">
            Explorer
          </div>
          {FILE_TREE_ITEMS.slice(0, treeItems).map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className={cn(
                "flex items-center gap-1.5 px-3 py-[3px] text-[12px] font-heading text-text-secondary",
                i === 1 && "bg-accent/10 text-text-primary border-l-2 border-accent"
              )}
              style={{ paddingLeft: `${12 + (item.indent || 0) * 12}px` }}
            >
              {item.type === "folder" ? (
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M1 3.5A1 1 0 012 2.5h3l1 1h4a1 1 0 011 1V9.5a1 1 0 01-1 1H2a1 1 0 01-1-1V3.5z" fill="#6366F1" className="opacity-60" /></svg>
              ) : (
                <svg width="9" height="11" viewBox="0 0 10 12" fill="none"><rect x="0" y="0" width="7" height="9" rx="1" fill="#8B8B9E" className="opacity-50" /></svg>
              )}
              {item.name}
            </motion.div>
          ))}
        </div>

        {/* Editor + Terminal */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Tab */}
          <div className="flex h-7 bg-bg-primary border-b border-white/[0.05]">
            <div className="flex items-center gap-1.5 border-b-2 border-accent bg-bg-editor px-4 text-[12px] font-heading text-text-primary">
              <svg width="9" height="11" viewBox="0 0 10 12" fill="none"><rect x="0" y="0" width="7" height="9" rx="1" fill="#6366F1" className="opacity-70" /></svg>
              App.tsx
            </div>
          </div>

          {/* Code area */}
          <div className="flex-1 overflow-hidden p-4 font-mono text-[12px] leading-[1.7]">
            {CODE_LINES.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {line.content}
              </motion.div>
            ))}
            {visibleLines < CODE_LINES.length && (
              <span className={cn("inline-block h-[14px] w-[7px] bg-accent mt-0.5", showCursor ? "opacity-100" : "opacity-0")} />
            )}
          </div>

          {/* Terminal */}
          <div className="h-[90px] bg-bg-deep border-t border-white/[0.05] p-2 px-3 font-mono text-[11px]">
            <div className="mb-1.5 text-[10px] uppercase tracking-[0.1em] text-text-tertiary font-heading">
              Terminal
            </div>
            <div className="flex items-center gap-1">
              <span className="text-accent">~/workspace</span>
              <span className="text-text-tertiary">$</span>
              <span className="text-text-primary">devix init</span>
            </div>
            {TERMINAL_LINES.slice(0, terminalLines).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
                className={cn("mt-0.5", line.color)}
              >
                {line.text}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const LandingHero = () => {
  const navigate = useNavigate();

  const handleCreate = () => {
    const generatedId = crypto.randomUUID();
    navigate(`/project/${generatedId}`, { state: { isNew: true } });
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-40 pb-16">
      {/* Mesh gradient background */}
      <div className="mesh-bg absolute inset-0 z-0 pointer-events-none" />
      
      {/* Accent glow */}
      <div className="absolute top-[15%] left-1/2 z-0 h-[500px] w-[800px] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(99,102,241,0.1)_0%,transparent_60%)] pointer-events-none" />

      {/* Content — Split layout */}
      <div className="relative z-10 mx-auto grid w-full max-w-[1100px] items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
        {/* Left — Text */}
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.08 }}
          className="flex flex-col items-start text-left"
        >
          {/* Badge */}
          <motion.div
            variants={FADE_UP_VARIANTS}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3.5 py-1"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
            <span className="text-[12px] font-medium text-accent tracking-wide">Now in Alpha</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={FADE_UP_VARIANTS}
            transition={{ duration: 0.6 }}
            className="mb-5 font-display text-5xl font-bold tracking-tight text-text-primary leading-[1.08] sm:text-[clamp(52px,7vw,80px)]"
          >
            Code. <span className="accent-gradient">Run.</span> Ship.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={FADE_UP_VARIANTS}
            transition={{ duration: 0.6 }}
            className="mb-9 max-w-[440px] font-heading text-lg leading-relaxed text-text-secondary"
          >
            A full development environment in your browser. No setup. No config.
            Just code.
          </motion.p>

          {/* CTA Row */}
          <motion.div
            variants={FADE_UP_VARIANTS}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4"
          >
            <Button
              size="lg"
              onClick={() => void handleCreate()}
              className={cn(
                "h-12 rounded-lg bg-accent px-8 text-base font-semibold text-white shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-all hover:scale-[1.02] hover:bg-accent/90 hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] active:scale-[0.98] border-none",
              )}
            >
              Launch Playground
            </Button>
            <a href="#features" className="text-[14px] font-medium text-text-secondary hover:text-text-primary transition-colors">
              Learn more →
            </a>
          </motion.div>
        </motion.div>

        {/* Right — Code Pulse Animation */}
        <motion.div
          variants={FADE_UP_VARIANTS}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          {/* Glow behind the mock */}
          <div className="absolute -inset-4 z-0 rounded-2xl bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(99,102,241,0.08)_0%,transparent_70%)] pointer-events-none" />
          <div className="relative z-10">
            <CodePulse />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
