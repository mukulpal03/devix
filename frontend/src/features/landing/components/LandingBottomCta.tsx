import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export const LandingBottomCta = () => (
  <section className="relative overflow-hidden px-6 py-32 text-center">
    {/* Radial glow */}
    <div className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-full w-full -translate-x-1/2 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(99,102,241,0.15)_0%,transparent_70%)]" />

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-10 mx-auto max-w-[640px]"
    >
      <h2 className="mb-4 font-display text-4xl font-bold leading-tight tracking-tight text-text-primary sm:text-6xl">
        Start building today.
      </h2>
      <p className="mb-9 font-heading text-base leading-relaxed text-text-secondary sm:text-lg">
        No credit card. No setup. Just open a project and code.
      </p>
      <Button
        size="lg"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="h-12 rounded-lg bg-accent px-8 text-[15px] font-semibold text-white shadow-[0_0_32px_rgba(99,102,241,0.3)] transition-all hover:bg-accent/90 hover:shadow-[0_0_48px_rgba(99,102,241,0.4)] border-none"
      >
        Launch Playground
      </Button>
    </motion.div>
  </section>
)
