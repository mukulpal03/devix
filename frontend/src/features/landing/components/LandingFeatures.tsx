import { motion } from "framer-motion";

const FEATURES = [
  {
    id: "instant_environments",
    label: "Instant Environments",
    copy: "Zero setup. Pick a template and get a fully configured runtime in under 3 seconds.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 2L12.5 8.5H19L13.5 12.5L15.5 19L10 15L4.5 19L6.5 12.5L1 8.5H7.5L10 2Z"
          fill="#5B7FFF"
          className="opacity-80"
        />
      </svg>
    ),
    visual: (
      <div className="font-mono text-xs leading-relaxed">
        <div className="text-terminal-green">✓ Installing dependencies...</div>
        <div className="text-success">✓ Configuring runtime...</div>
        <div className="text-accent">
          ✓ Environment ready{" "}
          <span className="text-text-secondary">in 2.4s</span>
        </div>
        <div className="mt-2 text-text-primary">
          <span className="text-accent">~/app</span>
          <span className="text-text-secondary"> $ </span>
          <span>pnpm dev</span>
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
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect
          x="2"
          y="4"
          width="16"
          height="12"
          rx="2"
          stroke="#5B7FFF"
          strokeWidth="1.5"
        />
        <path
          d="M6 8L9 11L6 14"
          stroke="#3EFF9E"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M10 14H14"
          stroke="#6E6D6A"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    visual: null,
    size: "narrow", // 1/3
  },
  {
    id: "collaborative_editing",
    label: "Collaborative Editing",
    copy: "Pair program in real time. Multiple cursors, shared terminals, live presence.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="7" cy="8" r="3" stroke="#5B7FFF" strokeWidth="1.5" />
        <circle cx="13" cy="8" r="3" stroke="#A78BFA" strokeWidth="1.5" />
        <path
          d="M2 16c0-2.2 2.23-4 5-4"
          stroke="#5B7FFF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M18 16c0-2.2-2.23-4-5-4"
          stroke="#A78BFA"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    visual: null,
    size: "equal",
  },
  {
    id: "ai_code_assist",
    label: "AI Code Assist",
    copy: "Inline completions that understand your codebase.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z"
          stroke="#5B7FFF"
          strokeWidth="1.5"
        />
        <path
          d="M7 10l2 2 4-4"
          stroke="#2DD98F"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    visual: null,
    size: "equal",
  },
  {
    id: "file_system",
    label: "File System",
    copy: "VS Code-style folder tree. Full git support.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M3 6a2 2 0 012-2h3l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V6z"
          stroke="#FFB547"
          strokeWidth="1.5"
        />
      </svg>
    ),
    visual: null,
    size: "equal",
  },
  {
    id: "one_click_deploy",
    label: "Deploy in One Click",
    copy: "GitHub → Railway/Vercel/Render. Live in seconds.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 3v10M6 9l4 4 4-4"
          stroke="#5B7FFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 15h12"
          stroke="#2DD98F"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    visual: (
      <div className="font-mono text-xs leading-loose">
        <div className="text-text-secondary">Deploying to Railway...</div>
        <div className="text-success">
          ✓ Build complete <span className="text-text-tertiary">12.3s</span>
        </div>
        <div className="text-success">✓ Health check passed</div>
        <div className="mt-1 text-accent">
          🚀 Live:{" "}
          <span className="text-text-primary underline">app.railway.app</span>
        </div>
      </div>
    ),
    size: "large", // 2/3
  },
];

const FADE_UP_VARIANTS = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

function FeatureCard({ feature }: { feature: (typeof FEATURES)[0] }) {
  return (
    <motion.div
      variants={FADE_UP_VARIANTS}
      className="group flex flex-col gap-4 rounded-md border border-white/6 bg-bg-secondary p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/12"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-md border border-accent/15 bg-accent/7">
        {feature.icon}
      </div>
      <div>
        <h3 className="mb-1.5 font-heading text-[15px] font-medium text-text-primary">
          {feature.label}
        </h3>
        <p className="font-heading text-sm leading-relaxed text-text-secondary">
          {feature.copy}
        </p>
      </div>
      {feature.visual && (
        <div className="mt-2 rounded-[4px] border border-white/5 bg-bg-deep p-4">
          {feature.visual}
        </div>
      )}
    </motion.div>
  );
}

export const LandingFeatures = () => {
  return (
    <section id="features" className="mx-auto w-full max-w-[1100px] px-6 py-24">
      {/* Section label */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.1 }}
        className="mb-14 text-center"
      >
        <motion.div
          variants={FADE_UP_VARIANTS}
          className="mb-3 font-heading text-[12px] font-medium uppercase tracking-[0.1em] text-accent"
        >
          Everything you need
        </motion.div>
        <motion.h2
          variants={FADE_UP_VARIANTS}
          className="mb-3 font-display text-4xl font-normal italic tracking-tight text-text-primary sm:text-5xl"
        >
          A seamless workflow.
        </motion.h2>
        <motion.p
          variants={FADE_UP_VARIANTS}
          className="mx-auto max-w-[480px] font-heading text-base leading-relaxed text-text-secondary"
        >
          Devix combines the power of a local IDE with the accessibility of the
          web.
        </motion.p>
      </motion.div>

      {/* Grid Layout */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ staggerChildren: 0.08 }}
        className="flex flex-col gap-3"
      >
        {/* Row 1 — 2/3 + 1/3 */}
        <div className="grid gap-3 sm:grid-cols-[2fr_1fr]">
          <FeatureCard feature={FEATURES[0]} />
          <FeatureCard feature={FEATURES[1]} />
        </div>

        {/* Row 2 — 3 equal */}
        <div className="grid gap-3 sm:grid-cols-3">
          <FeatureCard feature={FEATURES[2]} />
          <FeatureCard feature={FEATURES[3]} />
          <FeatureCard feature={FEATURES[4]} />
        </div>

        {/* Row 3 — 1/3 + 2/3 mirrored */}
        <div className="grid gap-3 sm:grid-cols-[1fr_2fr]">
          <motion.div
            variants={FADE_UP_VARIANTS}
            className="flex flex-col items-center justify-center rounded-md border border-accent/12 bg-accent/4 p-6 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/25"
          >
            <div className="mb-2 font-display text-3xl font-normal italic text-accent">
              ∞
            </div>
            <div className="font-heading text-[15px] font-medium text-text-primary">
              Unlimited Projects
            </div>
            <div className="mt-1.5 font-heading text-[13px] text-text-secondary">
              Free tier. No credit card.
            </div>
          </motion.div>
          <FeatureCard feature={FEATURES[5]} />
        </div>
      </motion.div>
    </section>
  );
};
