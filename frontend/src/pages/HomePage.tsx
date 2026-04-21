import { LandingNavbar } from '../components/organisms/LandingNavbar'
import { LandingHero } from '../components/organisms/LandingHero'
import { LandingFeatures } from '../components/organisms/LandingFeatures'
import { LandingFooter } from '../components/organisms/LandingFooter'

export const HomePage = () => (
  <div className="flex min-h-screen flex-col bg-background text-foreground antialiased selection:bg-primary/30">
    <LandingNavbar />
    <main className="flex-1">
      <LandingHero />
      <LandingFeatures />
    </main>
    <LandingFooter />
  </div>
)
