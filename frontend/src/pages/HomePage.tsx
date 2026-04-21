import { LandingNavbar } from "@/features/landing/components/LandingNavbar";
import { LandingHero } from "@/features/landing/components/LandingHero";
import { LandingFeatures } from "@/features/landing/components/LandingFeatures";
import { LandingHowItWorks } from "@/features/landing/components/LandingHowItWorks";
import { LandingTestimonials } from "@/features/landing/components/LandingTestimonials";
import { LandingPricing } from "@/features/landing/components/LandingPricing";
import { LandingBottomCta } from "@/features/landing/components/LandingBottomCta";
import { LandingFooter } from "@/features/landing/components/LandingFooter";

export const HomePage = () => (
  <div className="min-h-screen bg-bg-primary text-text-primary font-sans selection:bg-accent/30 selection:text-white">
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
