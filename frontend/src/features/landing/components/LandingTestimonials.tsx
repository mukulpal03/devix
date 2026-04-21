import { motion } from "framer-motion"

const TESTIMONIALS = [
  {
    quote: "Devix cut our onboarding time from days to minutes. New devs have a working environment before the standup ends.",
    name: "Sarah Chen",
    role: "Engineering Lead @ Anthropic",
    initials: "SC",
    color: "#5B7FFF",
  },
  {
    quote: "The terminal is actually usable. Not a toy. Real bash, real output. I run my full build pipeline from it.",
    name: "Tom Keller",
    role: "Senior SWE @ Stripe",
    initials: "TK",
    color: "#A78BFA",
  },
  {
    quote: "I was skeptical about browser IDEs. Then I used Devix. Monaco + xterm in one place — it just works.",
    name: "Priya Nair",
    role: "Indie Hacker",
    initials: "PN",
    color: "#2DD98F",
  },
  {
    quote: "Our team uses Devix for interview rounds. Candidates get a real environment, we get signal. Game changer.",
    name: "Alex Rivera",
    role: "CTO @ Vercel",
    initials: "AR",
    color: "#FFB547",
  },
  {
    quote: "Collaborative editing with live presence is exactly what pair programming should feel like.",
    name: "James Wu",
    role: "Staff Eng @ Linear",
    initials: "JW",
    color: "#5B7FFF",
  },
  {
    quote: "Deploy from the terminal straight to Railway. The workflow is so clean it feels like cheating.",
    name: "Maya Osei",
    role: "Full-Stack @ Supabase",
    initials: "MO",
    color: "#A78BFA",
  },
]

const FADE_UP_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <motion.div
      variants={FADE_UP_VARIANTS}
      className="mb-3 break-inside-avoid rounded-md border border-white/6 bg-bg-secondary p-5"
    >
      <p className="mb-4 font-heading text-[15px] leading-relaxed text-text-primary">
        <span className="text-xl leading-none text-accent">"</span>
        {t.quote}
        <span className="text-xl leading-none text-accent">"</span>
      </p>
      <div className="flex items-center gap-2.5">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-medium text-white"
          style={{ background: t.color }}
        >
          {t.initials}
        </div>
        <div>
          <div className="font-heading text-[13px] font-medium text-text-primary">{t.name}</div>
          <div className="font-heading text-[12px] text-text-secondary">{t.role}</div>
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
    <section className="mx-auto w-full max-w-[1100px] px-6 py-24">
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
          className="mb-3 font-heading text-[12px] font-medium uppercase tracking-[0.1em] text-accent"
        >
          Loved by builders
        </motion.div>
        <motion.h2
          variants={FADE_UP_VARIANTS}
          className="font-display text-4xl font-normal italic tracking-tight text-text-primary sm:text-[44px]"
        >
          What engineers say.
        </motion.h2>
      </motion.div>

      {/* Masonry 3-col */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ staggerChildren: 0.1 }}
        className="grid gap-3 sm:grid-cols-3"
      >
        <div className="flex flex-col">{col1.map((t) => <TestimonialCard key={t.name} t={t} />)}</div>
        <div className="flex flex-col sm:mt-6">{col2.map((t) => <TestimonialCard key={t.name} t={t} />)}</div>
        <div className="flex flex-col">{col3.map((t) => <TestimonialCard key={t.name} t={t} />)}</div>
      </motion.div>
    </section>
  )
}
