import { motion } from "framer-motion";

const FEATURES = [
  {
    id: "instant_environments",
    label: "Instant Environments",
    copy: "Zero setup. Pick a template and get a fully configured runtime in under 3 seconds.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 2L12.5 8.5H19L13.5 12.5L15.5 19L10 15L4.5 19L6.5 12.5L1 8.5H7.5L10 2Z"
          fill="#10B981"
          className="opacity-90"
        />
      </svg>
    ),
    visual: (
      <div className="font-mono text-[11px] leading-relaxed">
        <div className="text-success flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
          <span>Installing dependencies...</span>
        </div>
        <div className="text-success flex items-center gap-1.5 mt-1">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          <span>Configuring runtime...</span>
        </div>
        <div className="text-accent flex items-center gap-1.5 mt-1">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span>Environment ready <span className="text-text-secondary">in 2.4s</span></span>
        </div>
        <div className="mt-3 border-t border-white/[0.04] pt-2 text-text-primary">
          <span className="text-accent">~/app</span>
          <span className="text-text-secondary"> $ </span>
          <span className="font-medium">pnpm dev</span>
        </div>
      </div>
    ),
    size: "large", // 2/3
  },
  {
    id: "integrated_terminal",
    label: "Integrated Terminal",
    copy: "Full-featured bash/zsh terminal, right where you code.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <rect
          x="2"
          y="4"
          width="16"
          height="12"
          rx="2"
          stroke="#34D399"
          strokeWidth="1.5"
        />
        <path
          d="M6 8L9 11L6 14"
          stroke="#10B981"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 14H14"
          stroke="#484860"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    visual: (
      <div className="font-mono text-[11px] leading-relaxed text-text-secondary">
        <div>$ node -v</div>
        <div className="text-text-primary font-medium">v22.4.0</div>
        <div className="mt-1">$ git branch</div>
        <div className="text-accent font-medium">* main</div>
      </div>
    ),
    size: "narrow", // 1/3
  },
  {
    id: "file_system",
    label: "File System",
    copy: "VS Code-style folder tree. Full git support.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <path
          d="M3 6a2 2 0 012-2h3l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V6z"
          stroke="#10B981"
          strokeWidth="1.5"
        />
      </svg>
    ),
    visual: (
      <div className="font-mono text-[11px] leading-relaxed text-text-secondary space-y-1">
        <div className="flex items-center gap-1.5">
          <span className="text-accent">📂</span> <span className="text-text-primary font-medium">src</span>
        </div>
        <div className="flex items-center gap-1.5 pl-4 border-l border-white/[0.04]">
          <span>📄</span> <span>App.tsx</span>
        </div>
        <div className="flex items-center gap-1.5 pl-4 border-l border-white/[0.04]">
          <span>📄</span> <span>main.tsx</span>
        </div>
      </div>
    ),
    size: "narrow",
  },
  {
    id: "collaborative_editing",
    label: "Collaborative Editing",
    copy: "Pair program in real time. Multiple cursors, shared terminals, live presence.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <circle cx="7" cy="8" r="3" stroke="#EAEAF0" strokeWidth="1.5" />
        <circle cx="13" cy="8" r="3" stroke="#7A7A90" strokeWidth="1.5" />
        <path
          d="M2 16c0-2.2 2.23-4 5-4"
          stroke="#10B981"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M18 16c0-2.2-2.23-4-5-4"
          stroke="#6EE7B7"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    visual: (
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-bg-card-inner bg-accent font-sans text-[10px] font-semibold text-white">SC</div>
          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-bg-card-inner bg-accent-soft font-sans text-[10px] font-semibold text-white">TK</div>
        </div>
        <span className="text-[11px] font-medium text-text-secondary">2 active editors</span>
      </div>
    ),
    size: "narrow",
  },
];

const FADE_UP_VARIANTS = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

function FeatureCard({ feature }: { feature: (typeof FEATURES)[0] }) {
  return (
    <motion.div
      variants={FADE_UP_VARIANTS}
      className="group relative rounded-[2rem] border border-white/[0.04] bg-white/[0.01] p-1.5 transition-all duration-700 hover:border-accent/15 hover:shadow-[0_12px_40px_rgba(16,185,129,0.04)]"
      style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
    >
      <div className="rounded-[1.625rem] bg-bg-card-inner p-6 h-full flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)] min-h-[220px]">
        <div>
          <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-xl border border-accent/15 bg-accent/[0.05] transition-transform duration-500 group-hover:scale-105">
            {feature.icon}
          </div>
          <h3 className="mb-2 font-display text-[15px] font-semibold text-text-primary">
            {feature.label}
          </h3>
          <p className="font-heading text-sm leading-relaxed text-text-secondary mb-4">
            {feature.copy}
          </p>
        </div>
        {feature.visual && (
          <div className="mt-2 rounded-xl border border-white/[0.04] bg-bg-deep p-4 shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]">
            {feature.visual}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export const LandingFeatures = () => {
  return (
    <section id="features" className="mx-auto w-full max-w-[1200px] px-6 py-28 relative">
      {/* Glow behind */}
      <div className="absolute top-[30%] left-1/2 z-0 h-[500px] w-[500px] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(16,185,129,0.02)_0%,transparent_60%)] pointer-events-none" />

      {/* Section Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ staggerChildren: 0.1 }}
        className="mb-20 text-center relative z-10"
      >
        <motion.div
          variants={FADE_UP_VARIANTS}
          className="mb-4 font-heading text-[12px] font-semibold uppercase tracking-[0.16em] text-accent"
        >
          Everything you need
        </motion.div>
        <motion.h2
          variants={FADE_UP_VARIANTS}
          className="mb-4 font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl"
        >
          A seamless workflow.
        </motion.h2>
        <motion.p
          variants={FADE_UP_VARIANTS}
          className="mx-auto max-w-[500px] font-heading text-base leading-relaxed text-text-secondary"
        >
          Devix combines the power of a local IDE with the accessibility of the
          web.
        </motion.p>
      </motion.div>

      {/* Bento Grid layout */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ staggerChildren: 0.08 }}
        className="grid gap-6 sm:grid-cols-3 relative z-10"
      >
        {/* Row 1 */}
        <div className="sm:col-span-2">
          <FeatureCard feature={FEATURES[0]} />
        </div>
        <div className="sm:col-span-1">
          <FeatureCard feature={FEATURES[1]} />
        </div>
        
        {/* Row 2 */}
        <div className="sm:col-span-1">
          <FeatureCard feature={FEATURES[2]} />
        </div>
        <div className="sm:col-span-1">
          <FeatureCard feature={FEATURES[3]} />
        </div>
        
        {/* Row 2 - End Card */}
        <motion.div
          variants={FADE_UP_VARIANTS}
          className="group relative rounded-[2rem] border border-accent/15 bg-accent/[0.02] p-1.5 transition-all duration-700 hover:border-accent/30 hover:shadow-[0_12px_40px_rgba(16,185,129,0.06)]"
          style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
        >
          <div className="rounded-[1.625rem] bg-bg-card-inner p-6 h-full flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(16,185,129,0.08)] min-h-[220px]">
            <div>
              <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-xl bg-accent font-display text-lg font-bold text-white transition-transform duration-500 group-hover:scale-105">
                ∞
              </div>
              <h3 className="mb-2 font-display text-[15px] font-semibold text-text-primary">
                Unlimited Projects
              </h3>
              <p className="font-heading text-sm leading-relaxed text-text-secondary">
                Create as many sandboxes as you need, without limits or artificial throttles.
              </p>
            </div>
            <div className="mt-4 font-mono text-[10px] uppercase tracking-wider text-accent font-semibold">
              Always Free in Alpha
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
