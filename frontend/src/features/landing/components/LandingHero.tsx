import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const FADE_UP_VARIANTS = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const CODE_LINES = [
  { delay: 0.8, content: <><span className="text-[#34D399]">import</span> <span className="text-[#6EE7B7]">{"{"}</span> <span className="text-[#A7F3D0]">createApp</span> <span className="text-[#6EE7B7]">{"}"}</span> <span className="text-[#34D399]">from</span> <span className="text-[#FCD34D]">'devix'</span></> },
  { delay: 1.2, content: <><span className="text-[#484860]">// Initialize workspace</span></> },
  { delay: 1.6, content: <><span className="text-[#34D399]">const</span> <span className="text-[#EAEAF0]">app</span> = <span className="text-[#A7F3D0]">createApp</span><span className="text-[#6EE7B7]">({"{"}</span></> },
  { delay: 2.0, content: <><span className="pl-6 text-[#FCD34D]">runtime</span><span className="text-[#6EE7B7]">:</span> <span className="text-[#FCD34D]">'node:22'</span><span className="text-[#6EE7B7]">,</span></> },
  { delay: 2.4, content: <><span className="pl-6 text-[#FCD34D]">template</span><span className="text-[#6EE7B7]">:</span> <span className="text-[#FCD34D]">'react-vite'</span></> },
  { delay: 2.8, content: <><span className="text-[#6EE7B7]">{"}"})</span></> },
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
    <div className="card-shell">
      <div className="card-core overflow-hidden">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 bg-bg-deep px-4 py-2.5 border-b border-white/[0.04]">
          <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FBBF24]/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#34D399]/60" />
          <span className="flex-1 text-center font-heading text-[11px] text-text-tertiary tracking-wider">
            devix — workspace
          </span>
        </div>

        {/* IDE Layout */}
        <div className="flex h-[380px]">
          {/* Sidebar */}
          <div className="w-[160px] shrink-0 border-r border-white/[0.04] bg-bg-deep py-2">
            <div className="px-3 py-1.5 text-[10px] font-heading font-medium uppercase tracking-[0.14em] text-text-tertiary">
              Explorer
            </div>
            {FILE_TREE_ITEMS.slice(0, treeItems).map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-[3px] text-[12px] font-heading text-text-secondary",
                  i === 1 && "bg-accent/8 text-text-primary border-l-2 border-accent"
                )}
                style={{ paddingLeft: `${12 + (item.indent || 0) * 12}px` }}
              >
                {item.type === "folder" ? (
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M1 3.5A1 1 0 012 2.5h3l1 1h4a1 1 0 011 1V9.5a1 1 0 01-1 1H2a1 1 0 01-1-1V3.5z" fill="#10B981" className="opacity-60" /></svg>
                ) : (
                  <svg width="9" height="11" viewBox="0 0 10 12" fill="none"><rect x="0" y="0" width="7" height="9" rx="1" fill="#7A7A90" className="opacity-50" /></svg>
                )}
                {item.name}
              </motion.div>
            ))}
          </div>

          {/* Editor + Terminal */}
          <div className="flex flex-1 flex-col overflow-hidden">
            {/* Tab */}
            <div className="flex h-7 bg-bg-deep border-b border-white/[0.04]">
              <div className="flex items-center gap-1.5 border-b-2 border-accent bg-bg-card-inner px-4 text-[12px] font-heading text-text-primary">
                <svg width="9" height="11" viewBox="0 0 10 12" fill="none"><rect x="0" y="0" width="7" height="9" rx="1" fill="#10B981" className="opacity-70" /></svg>
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
                  transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
                >
                  {line.content}
                </motion.div>
              ))}
              {visibleLines < CODE_LINES.length && (
                <span className={cn("inline-block h-[14px] w-[7px] bg-accent mt-0.5", showCursor ? "opacity-100" : "opacity-0")} />
              )}
            </div>

            {/* Terminal */}
            <div className="h-[90px] bg-bg-deep border-t border-white/[0.04] p-2 px-3 font-mono text-[11px]">
              <div className="mb-1.5 text-[10px] uppercase tracking-[0.14em] text-text-tertiary font-heading">
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
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16">
      {/* Background layers */}
      <div className="mesh-bg absolute inset-0 z-0 pointer-events-none" />
      <div className="absolute top-[10%] left-1/4 z-0 h-[600px] w-[600px] bg-[radial-gradient(ellipse,rgba(16,185,129,0.06)_0%,transparent_60%)] pointer-events-none animate-breathe" />
      <div className="absolute bottom-[20%] right-[15%] z-0 h-[400px] w-[400px] bg-[radial-gradient(ellipse,rgba(52,211,153,0.04)_0%,transparent_60%)] pointer-events-none" />

      {/* Content — Split layout */}
      <div className="relative z-10 mx-auto grid w-full max-w-[1200px] items-center gap-12 lg:gap-16 lg:grid-cols-[1fr_1.15fr]">
        {/* Left — Text */}
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1 }}
          className="flex flex-col items-start text-left"
        >
          {/* Badge */}
          <motion.div
            variants={FADE_UP_VARIANTS}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-accent/20 bg-accent/[0.06] px-4 py-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
            <span className="text-[12px] font-medium text-accent tracking-wider">Now in Alpha</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={FADE_UP_VARIANTS}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className="mb-6 font-display text-[clamp(40px,6vw,72px)] font-bold tracking-[-0.035em] text-text-primary leading-[1.05]"
          >
            Code. <span className="accent-gradient">Run.</span> Ship.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={FADE_UP_VARIANTS}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className="mb-10 max-w-[440px] font-heading text-lg leading-relaxed text-text-secondary"
          >
            A full development environment in your browser. No setup. No config.
            Just code.
          </motion.p>

          {/* CTA Row */}
          <motion.div
            variants={FADE_UP_VARIANTS}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className="flex items-center gap-5"
          >
            <Button
              size="lg"
              onClick={() => void handleCreate()}
              className="group h-12 rounded-full bg-accent px-8 text-base font-semibold text-white shadow-[0_0_40px_rgba(16,185,129,0.25)] transition-all duration-500 hover:scale-[1.02] hover:bg-accent/90 hover:shadow-[0_0_56px_rgba(16,185,129,0.35)] active:scale-[0.97] border-none"
              style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
            >
              Launch Playground
            </Button>
            <a
              href="#features"
              className="text-[14px] font-medium text-text-secondary hover:text-text-primary transition-colors duration-300"
            >
              Learn more
              <span className="inline-block ml-1 transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Right — Code Pulse Animation */}
        <motion.div
          variants={FADE_UP_VARIANTS}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.9, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
          className="relative w-full max-w-lg lg:max-w-none mx-auto"
        >
          {/* Glow behind */}
          <div className="absolute -inset-6 z-0 rounded-3xl bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(16,185,129,0.06)_0%,transparent_70%)] pointer-events-none" />
          <div className="relative z-10">
            <CodePulse />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
