import * as React from "react"
import { motion } from "framer-motion"

const STEPS = [
  {
    number: '01',
    label: 'Create a project',
    copy: 'Pick a template or import from GitHub. Ready in under 3 seconds.',
  },
  {
    number: '02',
    label: 'Write and run code',
    copy: 'Full IDE in browser. Terminal, files, AI assist — everything you need.',
  },
  {
    number: '03',
    label: 'Ship it',
    copy: 'One-click deploy or export to any platform. Live in seconds.',
  },
]

const FADE_UP_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export const LandingHowItWorks = () => (
  <section className="border-y border-white/5 bg-bg-primary py-24 px-6">
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
          className="mb-3 font-heading text-[12px] font-medium uppercase tracking-[0.1em] text-accent"
        >
          How it works
        </motion.div>
        <motion.h2
          variants={FADE_UP_VARIANTS}
          className="font-display text-4xl font-normal italic tracking-tight text-text-primary sm:text-[44px]"
        >
          From zero to shipped in minutes.
        </motion.h2>
      </motion.div>

      {/* Steps */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ staggerChildren: 0.15 }}
        className="flex flex-col items-center justify-center gap-12 sm:flex-row sm:items-start sm:gap-0"
      >
        {STEPS.map((step, i) => (
          <React.Fragment key={step.number}>
            <motion.div
              variants={FADE_UP_VARIANTS}
              className="relative flex-1 px-6 text-center"
            >
              {/* Big background number */}
              <div className="pointer-events-none absolute top-[-12px] left-1/2 -translate-x-1/2 select-none font-mono text-[64px] font-medium leading-none text-text-primary opacity-[0.06]">
                {step.number}
              </div>

              {/* Step number pill */}
              <div className="mb-5 inline-flex h-8 w-8 items-center justify-center rounded-full border border-accent/30 bg-accent/10 font-heading text-[12px] text-accent">
                {i + 1}
              </div>

              <h3 className="mb-2 font-heading text-base font-medium text-text-primary">
                {step.label}
              </h3>
              <p className="font-heading text-sm font-normal leading-relaxed text-text-secondary">
                {step.copy}
              </p>
            </motion.div>

            {/* Connector — hidden on mobile, shown on sm+ */}
            {i < STEPS.length - 1 && (
              <motion.div
                variants={{
                  hidden: { scaleX: 0, opacity: 0 },
                  visible: { scaleX: 1, opacity: 1 },
                }}
                className="hidden h-px w-20 origin-left border-t border-dashed border-white/10 sm:block sm:self-start sm:mt-4"
              />
            )}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  </section>
)
