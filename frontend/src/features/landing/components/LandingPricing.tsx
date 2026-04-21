import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const TIERS = [
  {
    name: "Free",
    price: "$0",
    description: "For solo developers getting started.",
    cta: "Get started",
    ctaVariant: "outline" as const,
    features: [
      "3 active projects",
      "512MB RAM per project",
      "Community support",
      "Public projects only",
    ],
  },
  {
    name: "Pro",
    price: "$12",
    description: "For serious developers who ship.",
    cta: "Start for free",
    ctaVariant: "default" as const,
    badge: "Most popular",
    highlighted: true,
    features: [
      "Unlimited projects",
      "4GB RAM per project",
      "Priority support",
      "Private projects",
      "Custom domains",
      "AI code assist",
    ],
  },
  {
    name: "Team",
    price: "$48",
    description: "For teams building together.",
    cta: "Contact us",
    ctaVariant: "outline" as const,
    features: [
      "Everything in Pro",
      "Collaborative editing",
      "SSO / SAML",
      "Audit logs",
      "Dedicated support",
      "SLA guarantee",
    ],
  },
]

const FADE_UP_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

function PricingTierCard({ tier }: { tier: (typeof TIERS)[0] }) {
  return (
    <motion.div
      variants={FADE_UP_VARIANTS}
      className={cn(
        "relative flex flex-col rounded-md p-7 transition-all duration-200",
        tier.highlighted
          ? "border border-accent/40 bg-bg-secondary bg-gradient-to-b from-accent/5 to-transparent shadow-[0_0_40px_rgba(91,127,255,0.05)]"
          : "border border-white/6 bg-bg-secondary hover:border-white/12"
      )}
    >
      {/* Badge */}
      {tier.badge && (
        <Badge
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent px-3 py-0.5 text-[11px] font-medium text-white hover:bg-accent"
        >
          {tier.badge}
        </Badge>
      )}

      {/* Tier name */}
      <div className="mb-3 font-heading text-[13px] text-text-secondary">
        {tier.name}
      </div>

      {/* Price */}
      <div className="mb-1.5 flex items-baseline gap-1">
        <span className="font-display text-4xl font-normal italic text-text-primary">
          {tier.price}
        </span>
        <span className="font-heading text-sm text-text-secondary">
          /mo
        </span>
      </div>
      
      <p className="mb-6 font-heading text-[13px] leading-relaxed text-text-secondary">
        {tier.description}
      </p>

      {/* CTA */}
      <Button
        variant={tier.ctaVariant}
        className={cn(
          "mb-6 h-9 w-full rounded-[4px] font-medium transition-opacity hover:opacity-90",
          tier.highlighted && "bg-accent text-white shadow-[0_0_16px_rgba(91,127,255,0.25)] border-none"
        )}
      >
        {tier.cta}
      </Button>

      {/* Separator */}
      <div className="mb-5 h-px w-full bg-white/6" />

      {/* Features */}
      <ul className="flex flex-col gap-2.5">
        {tier.features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-2 font-heading text-[14px] text-text-primary"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2.5 7L5.5 10L11.5 4"
                stroke="#2DD98F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export const LandingPricing = () => {
  return (
    <section id="pricing" className="bg-[#0D0D10] px-6 py-24">
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
            className="mb-3 font-heading text-[12px] font-medium uppercase tracking-[0.1em] text-accent"
          >
            Pricing
          </motion.div>
          <motion.h2
            variants={FADE_UP_VARIANTS}
            className="mb-3 font-display text-4xl font-normal italic tracking-tight text-text-primary sm:text-[44px]"
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

        {/* Tier Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.08 }}
          className="grid gap-3 sm:grid-cols-3"
        >
          {TIERS.map((tier) => (
            <PricingTierCard key={tier.name} tier={tier} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
