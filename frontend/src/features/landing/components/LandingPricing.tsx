import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const FADE_UP_VARIANTS = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export const LandingPricing = () => {
  return (
    <section id="pricing" className="bg-bg-primary px-6 py-28 relative">
      <div className="absolute top-[20%] left-[10%] z-0 h-[400px] w-[400px] bg-[radial-gradient(ellipse,rgba(16,185,129,0.02)_0%,transparent_60%)] pointer-events-none" />

      <div className="mx-auto max-w-[1000px] relative z-10">
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
            Pricing
          </motion.div>
          <motion.h2
            variants={FADE_UP_VARIANTS}
            className="mb-4 font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl"
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

        {/* Coming Soon Box - Double-Bezel Architecture */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.04] bg-white/[0.01] p-2 text-center"
        >
          <div className="pricing-pro-gradient absolute inset-0 z-0 opacity-40" />
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.04)_0%,transparent_70%)]" />

          <div className="relative z-10 rounded-[2.25rem] bg-bg-card-inner px-8 py-16 sm:px-16 shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]">
            <div className="mx-auto max-w-xl">
              <Badge className="mb-8 bg-accent/[0.08] text-accent border-accent/20 px-4 py-1 text-xs font-semibold tracking-wider uppercase rounded-full">
                Phase 1: Alpha
              </Badge>
              <h3 className="mb-4 font-display text-3xl font-bold text-text-primary sm:text-4xl">
                Pricing is coming soon.
              </h3>
              <p className="mb-10 font-heading text-base leading-relaxed text-text-secondary">
                We're currently in alpha and everything is free to use. Create as
                many projects as you want, and enjoy built-in{" "}
                <span className="text-text-primary font-medium">collaborative editing</span>{" "}
                while we build the most powerful browser-based IDE.
              </p>
              
              <div className="h-px w-full bg-white/[0.05] mb-10" />
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
                <div className="text-center group">
                  <div className="text-4xl font-display font-extrabold text-text-primary tracking-tight transition-transform duration-500 group-hover:scale-105">
                    $0
                  </div>
                  <div className="mt-2 text-[10px] font-heading font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                    Current Price
                  </div>
                </div>
                
                <div className="h-10 w-px bg-white/[0.05] hidden sm:block" />
                
                <div className="text-center group">
                  <div className="text-4xl font-display font-extrabold text-accent tracking-tight transition-transform duration-500 group-hover:scale-105">
                    ∞
                  </div>
                  <div className="mt-2 text-[10px] font-heading font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                    Projects
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
