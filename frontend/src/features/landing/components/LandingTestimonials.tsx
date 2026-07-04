import { motion } from "framer-motion"

const TESTIMONIALS = [
  {
    quote: "Devix cut our onboarding time from days to minutes. New devs have a working environment before the standup ends.",
    name: "Sarah Chen",
    role: "Engineering Lead @ Anthropic",
    initials: "SC",
    color: "bg-accent",
  },
  {
    quote: "The terminal is actually usable. Not a toy. Real bash, real output. I run my full build pipeline from it.",
    name: "Tom Keller",
    role: "Senior SWE @ Stripe",
    initials: "TK",
    color: "bg-accent-soft",
  },
  {
    quote: "I was skeptical about browser IDEs. Then I used Devix. Monaco + xterm in one place — it just works.",
    name: "Priya Nair",
    role: "Indie Hacker",
    initials: "PN",
    color: "bg-[#10B981]",
  },
  {
    quote: "Our team uses Devix for interview rounds. Candidates get a real environment, we get signal. Game changer.",
    name: "Alex Rivera",
    role: "CTO @ Vercel",
    initials: "AR",
    color: "bg-accent",
  },
  {
    quote: "Collaborative editing with live presence is exactly what pair programming should feel like.",
    name: "James Wu",
    role: "Staff Eng @ Linear",
    initials: "JW",
    color: "bg-accent-soft",
  },
  {
    quote: "Deploy from the terminal straight to Railway. The workflow is so clean it feels like cheating.",
    name: "Maya Osei",
    role: "Full-Stack @ Supabase",
    initials: "MO",
    color: "bg-[#34D399]",
  },
]

const FADE_UP_VARIANTS = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
}

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <motion.div
      variants={FADE_UP_VARIANTS}
      className="mb-4 group relative rounded-[2rem] border border-white/[0.04] bg-white/[0.01] p-1.5 transition-all duration-700 hover:border-accent/15"
      style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
    >
      <div className="rounded-[1.625rem] bg-bg-card-inner p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)] h-full flex flex-col justify-between">
        <p className="mb-6 font-heading text-[14px] leading-relaxed text-text-primary">
          <span className="text-accent font-semibold mr-1">“</span>
          {t.quote}
          <span className="text-accent font-semibold ml-1">”</span>
        </p>
        <div className="flex items-center gap-3">
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white ${t.color}`}
          >
            {t.initials}
          </div>
          <div>
            <div className="font-heading text-[13px] font-semibold text-text-primary">{t.name}</div>
            <div className="font-heading text-[11px] text-text-secondary">{t.role}</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export const LandingTestimonials = () => {
  const col1 = TESTIMONIALS.filter((_, i) => i % 3 === 0)
  const col2 = TESTIMONIALS.filter((_, i) => i % 3 === 1)
  const col3 = TESTIMONIALS.filter((_, i) => i % 3 === 2)

  return (
    <section className="mx-auto w-full max-w-[1200px] px-6 py-28 relative">
      <div className="absolute top-[40%] right-0 z-0 h-[400px] w-[400px] bg-[radial-gradient(ellipse,rgba(16,185,129,0.02)_0%,transparent_60%)] pointer-events-none" />

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
          Loved by builders
        </motion.div>
        <motion.h2
          variants={FADE_UP_VARIANTS}
          className="font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl"
        >
          What engineers say.
        </motion.h2>
      </motion.div>

      {/* Masonry 3-col */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ staggerChildren: 0.08 }}
        className="grid gap-4 sm:grid-cols-3 relative z-10"
      >
        <div className="flex flex-col">{col1.map((t) => <TestimonialCard key={t.name} t={t} />)}</div>
        <div className="flex flex-col sm:mt-6">{col2.map((t) => <TestimonialCard key={t.name} t={t} />)}</div>
        <div className="flex flex-col">{col3.map((t) => <TestimonialCard key={t.name} t={t} />)}</div>
      </motion.div>
    </section>
  )
}
