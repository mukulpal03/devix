import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export const LandingBottomCta = () => (
  <section className="relative overflow-hidden px-6 py-32 text-center">
    {/* Radial glow */}
    <div className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-full w-full -translate-x-1/2 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(91,127,255,0.2)_0%,transparent_70%)]" />

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-10 mx-auto max-w-[640px]"
    >
      <h2 className="mb-4 font-display text-4xl font-normal italic leading-tight tracking-tight text-text-primary sm:text-6xl">
        Start building today.
      </h2>
      <p className="mb-9 font-heading text-base leading-relaxed text-text-secondary sm:text-lg">
        No credit card. No setup. Just open a project and code.
      </p>
      <Button
        size="lg"
        className="h-12 rounded-[4px] bg-accent px-7 text-[15px] font-medium text-white shadow-[0_0_32px_rgba(91,127,255,0.4)] transition-all hover:opacity-90 hover:shadow-[0_0_48px_rgba(91,127,255,0.5)] border-none"
      >
        Start for free
      </Button>
    </motion.div>
  </section>
)
