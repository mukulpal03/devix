import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export const LandingBottomCta = () => (
  <section className="relative overflow-hidden px-6 py-36 text-center bg-bg-secondary/20 border-t border-white/[0.04]">
    {/* Radial glow */}
    <div className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-full w-full -translate-x-1/2 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(16,185,129,0.08)_0%,transparent_70%)]" />
    <div className="dot-grid absolute inset-0 z-0 opacity-20 pointer-events-none" />

    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
      className="relative z-10 mx-auto max-w-[640px]"
    >
      <h2 className="mb-6 font-display text-4xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-6xl">
        Start building today.
      </h2>
      <p className="mb-10 font-heading text-base leading-relaxed text-text-secondary sm:text-lg max-w-[460px] mx-auto">
        No credit card. No setup. Just open a project and code.
      </p>
      
      <Button
        size="lg"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="group h-12 rounded-full bg-accent px-8 text-base font-semibold text-white shadow-[0_0_40px_rgba(16,185,129,0.25)] transition-all duration-500 hover:scale-[1.02] hover:bg-accent/90 hover:shadow-[0_0_56px_rgba(16,185,129,0.35)] active:scale-[0.97] border-none cursor-pointer"
        style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
      >
        Launch Playground
      </Button>
    </motion.div>
  </section>
)
