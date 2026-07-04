import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const FADE_UP_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const LandingPricing = () => {
  return (
    <section id="pricing" className="bg-bg-primary px-6 py-24">
      <div className="mx-auto max-w-[960px]">
        {/* Header */}
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
            Pricing
          </motion.div>
          <motion.h2
            variants={FADE_UP_VARIANTS}
            className="mb-3 font-display text-4xl font-bold tracking-tight text-text-primary sm:text-[44px]"
          >
            Simple pricing, no surprises.
          </motion.h2>
          <motion.p
            variants={FADE_UP_VARIANTS}
            className="font-heading text-base text-text-secondary"
          >
            Start free. Scale when you need to.
          </motion.p>
        </motion.div>

        {/* Coming Soon */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-xl border border-white/[0.07] bg-bg-secondary p-12 text-center"
        >
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.04)_0%,transparent_70%)]" />

          <div className="relative z-10 mx-auto max-w-lg">
            <Badge className="mb-6 bg-accent/15 text-accent border-accent/20 px-3 py-1 text-xs font-medium">
              Phase 1: Alpha
            </Badge>
            <h3 className="mb-4 font-display text-3xl font-bold text-text-primary">
              Pricing is coming soon.
            </h3>
            <p className="mb-8 font-heading text-base leading-relaxed text-text-secondary">
              We're currently in alpha and everything is free to use. Create as
              many projects as you want, and enjoy built-in{" "}
              <span className="text-text-primary">collaborative editing</span>{" "}
              while we build the most powerful browser-based IDE.
            </p>
            <div className="h-px w-full bg-white/[0.06] mb-8" />
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-display font-bold text-text-primary">
                  $0
                </div>
                <div className="text-xs font-heading font-medium uppercase tracking-widest text-text-tertiary">
                  Current Price
                </div>
              </div>
              <div className="h-8 w-px bg-white/[0.06] hidden sm:block" />
              <div className="text-center">
                <div className="text-2xl font-display font-bold text-accent">
                  ∞
                </div>
                <div className="text-xs font-heading font-medium uppercase tracking-widest text-text-tertiary">
                  Projects
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
