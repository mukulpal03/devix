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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export const LandingHowItWorks = () => (
  <section className="border-y border-white/[0.05] bg-bg-primary py-24 px-6">
    <div className="mx-auto max-w-[1100px]">
      {/* Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.1 }}
        className="mb-16 text-center"
      >
        <motion.div
          variants={FADE_UP_VARIANTS}
          className="mb-3 font-heading text-[12px] font-semibold uppercase tracking-[0.12em] text-accent"
        >
          How it works
        </motion.div>
        <motion.h2
          variants={FADE_UP_VARIANTS}
          className="font-display text-4xl font-bold tracking-tight text-text-primary sm:text-[44px]"
        >
          From zero to shipped in minutes.
        </motion.h2>
      </motion.div>

      {/* Steps — Vertical build-log layout */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ staggerChildren: 0.2 }}
        className="mx-auto max-w-[640px]"
      >
        {STEPS.map((step, i) => (
          <React.Fragment key={step.number}>
            <motion.div
              variants={FADE_UP_VARIANTS}
              className="relative flex gap-5"
            >
              {/* Timeline line + dot */}
              <div className="flex flex-col items-center">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 font-display text-[13px] font-semibold text-accent">
                  {i + 1}
                </div>
                {i < STEPS.length - 1 && (
                  <div className="w-px flex-1 bg-gradient-to-b from-accent/20 to-transparent my-2" />
                )}
              </div>

              {/* Content */}
              <div className={i < STEPS.length - 1 ? "pb-10" : "pb-0"}>
                <h3 className="mb-1.5 font-display text-base font-semibold text-text-primary">
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
