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
          fill="#6366F1"
          className="opacity-90"
        />
      </svg>
    ),
    visual: (
      <div className="font-mono text-xs leading-relaxed">
        <div className="text-success">✓ Installing dependencies...</div>
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
          stroke="#A78BFA"
          strokeWidth="1.5"
        />
        <path
          d="M6 8L9 11L6 14"
          stroke="#34D399"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M10 14H14"
          stroke="#55556A"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    visual: null,
    size: "narrow", // 1/3
  },
  {
    id: "file_system",
    label: "File System",
    copy: "VS Code-style folder tree. Full git support.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M3 6a2 2 0 012-2h3l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V6z"
          stroke="#F59E0B"
          strokeWidth="1.5"
        />
      </svg>
    ),
    visual: null,
    size: "narrow",
  },
  {
    id: "collaborative_editing",
    label: "Collaborative Editing",
    copy: "Pair program in real time. Multiple cursors, shared terminals, live presence.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="7" cy="8" r="3" stroke="#E8E8ED" strokeWidth="1.5" />
        <circle cx="13" cy="8" r="3" stroke="#8B8B9E" strokeWidth="1.5" />
        <path
          d="M2 16c0-2.2 2.23-4 5-4"
          stroke="#6366F1"
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
    size: "narrow",
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
      className="group flex flex-col gap-4 rounded-xl border border-white/[0.06] bg-bg-secondary p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/20 hover:shadow-[0_8px_32px_rgba(99,102,241,0.06)]"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent/15 bg-accent/[0.07]">
        {feature.icon}
      </div>
      <div>
        <h3 className="mb-1.5 font-display text-[15px] font-semibold text-text-primary">
          {feature.label}
        </h3>
        <p className="font-heading text-sm leading-relaxed text-text-secondary">
          {feature.copy}
        </p>
      </div>
      {feature.visual && (
        <div className="mt-2 rounded-lg border border-white/[0.04] bg-bg-deep p-4">
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
          className="mb-3 font-heading text-[12px] font-semibold uppercase tracking-[0.12em] text-accent"
        >
          Everything you need
        </motion.div>
        <motion.h2
          variants={FADE_UP_VARIANTS}
          className="mb-3 font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl"
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

        {/* Grid layout */}
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <FeatureCard feature={FEATURES[0]} />
          </div>
          <FeatureCard feature={FEATURES[1]} />
          
          <FeatureCard feature={FEATURES[2]} />
          <FeatureCard feature={FEATURES[3]} />
          
          <motion.div
            variants={FADE_UP_VARIANTS}
            className="flex flex-col items-center justify-center rounded-xl border border-accent/12 bg-accent/[0.04] p-6 text-center transition-all duration-300 hover:border-accent/25 hover:shadow-[0_4px_24px_rgba(99,102,241,0.06)]"
          >
            <div className="mb-1 font-display text-3xl font-bold text-accent">
              ∞
            </div>
            <div className="font-display text-sm font-semibold text-text-primary">
              Unlimited Projects
            </div>
            <div className="mt-1 font-heading text-[12px] text-text-secondary leading-tight">
              Create as many sandboxes as you need.
            </div>
          </motion.div>
        </div>
    </section>
  );
};
