import { LandingNavbar } from "@/features/landing/components/LandingNavbar";
import { LandingHero } from "@/features/landing/components/LandingHero";
import { LandingFeatures } from "@/features/landing/components/LandingFeatures";
import { LandingHowItWorks } from "@/features/landing/components/LandingHowItWorks";
import { LandingTestimonials } from "@/features/landing/components/LandingTestimonials";
import { LandingPricing } from "@/features/landing/components/LandingPricing";
import { LandingBottomCta } from "@/features/landing/components/LandingBottomCta";
import { LandingFooter } from "@/features/landing/components/LandingFooter";

export const HomePage = () => (
  <div
    className="min-h-screen font-sans"
    style={{
      backgroundColor: "var(--surface-page-base)",
      color: "var(--text-heading)",
    }}
  >
    <LandingNavbar />
    <main>
      <LandingHero />
      <LandingFeatures />
      <LandingHowItWorks />
      <LandingTestimonials />
      <LandingPricing />
      <LandingBottomCta />
    </main>
    <LandingFooter />
  </div>
);
