import { HeroBanner } from "@/components/hero-banner"
import { PromoBanner } from "@/components/promo-banner"
import { AcademicSection } from "@/components/academic-section"
import { SkillsSection } from "@/components/skills-section"
import { FeaturedCourses } from "@/components/featured-courses-new"
import { LocationSection } from "@/components/location-section"
import { LiveClassBanner } from "@/components/live-class-banner"
import { StatsSection } from "@/components/stats-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <PromoBanner />
      <HeroBanner />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <div className="grid lg:grid-cols-2 gap-8">
          <AcademicSection />
          <SkillsSection />
        </div>
        <FeaturedCourses />
        <LocationSection />
        <StatsSection />
      </div>
      <LiveClassBanner />
    </div>
  )
}
