import * as React from "react"
import { motion } from "framer-motion"

const STEPS = [
  {
    number: '01',
    label: 'Create a project',
    copy: 'Pick a template or start from scratch. Ready in under 3 seconds.',
  },
  {
    number: '02',
    label: 'Write and run code',
    copy: 'Full IDE in your browser. Terminal, file explorer, and live preview — everything you need.',
  },
  {
    number: '03',
    label: 'Build and iterate',
    copy: 'Use the playground to prototype ideas and test code instantly.',
  },
]

const FADE_UP_VARIANTS = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
}

export const LandingHowItWorks = () => (
  <section className="border-y border-white/[0.04] bg-bg-secondary/40 py-28 px-6 relative overflow-hidden">
    <div className="dot-grid absolute inset-0 z-0 opacity-40 pointer-events-none" />
    <div className="absolute top-0 right-0 z-0 h-[300px] w-[300px] bg-[radial-gradient(ellipse,rgba(16,185,129,0.02)_0%,transparent_60%)] pointer-events-none" />

    <div className="mx-auto max-w-[1200px] relative z-10">
      {/* Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.1 }}
        className="mb-20 text-center"
      >
        <motion.div
          variants={FADE_UP_VARIANTS}
          className="mb-4 font-heading text-[12px] font-semibold uppercase tracking-[0.16em] text-accent"
        >
          How it works
        </motion.div>
        <motion.h2
          variants={FADE_UP_VARIANTS}
          className="font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl"
        >
          From zero to shipped in minutes.
        </motion.h2>
      </motion.div>

      {/* Steps — Horizontal 3-Column Layout */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ staggerChildren: 0.15 }}
        className="grid gap-8 md:grid-cols-3 relative"
      >
        {STEPS.map((step, i) => (
          <React.Fragment key={step.number}>
            <motion.div
              variants={FADE_UP_VARIANTS}
              className="relative group flex flex-col justify-between rounded-[2rem] border border-white/[0.04] bg-white/[0.01] p-1.5 transition-all duration-700 hover:border-accent/10"
              style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
            >
              {/* Connector line for large screens */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-[5.5rem] -right-4 z-20 w-8 h-px bg-gradient-to-r from-white/[0.08] to-transparent" />
              )}

              <div className="rounded-[1.625rem] bg-bg-card-inner p-8 flex flex-col h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)] min-h-[200px]">
                {/* Number with decorative dot */}
                <div className="mb-6 flex items-baseline gap-2">
                  <span className="font-mono text-4xl font-extrabold tracking-tight text-accent/20 transition-colors duration-500 group-hover:text-accent">
                    {step.number}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-accent opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <h3 className="mb-3 font-display text-base font-semibold text-text-primary">
                  {step.label}
                </h3>
                <p className="font-heading text-sm font-normal leading-relaxed text-text-secondary">
                  {step.copy}
                </p>
              </div>
            </motion.div>
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  </section>
)
