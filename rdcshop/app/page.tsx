import { HeroBanner } from "@/components/hero-banner"
import { PromoBanner } from "@/components/promo-banner"
import { AcademicSection } from "@/components/academic-section"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { SkillsSection } from "@/components/skills-section"
import { FeaturedCourses } from "@/components/featured-courses-new"
import { LocationSection } from "@/components/location-section"
import { LiveClassBanner } from "@/components/live-class-banner"
import { StatsSection } from "@/components/stats-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <PromoBanner />
      <Carousel className="w-full max-w-xs mx-auto">
        <CarouselContent>
          <CarouselItem>
            <img src="https://via.placeholder.com/300x200/FF0000/FFFFFF?text=Image+1" alt="Image 1" />
          </CarouselItem>
          <CarouselItem>
            <img src="https://via.placeholder.com/300x200/00FF00/FFFFFF?text=Image+2" alt="Image 2" />
          </CarouselItem>
          <CarouselItem>
            <img src="https://via.placeholder.com/300x200/0000FF/FFFFFF?text=Image+3" alt="Image 3" />
          </CarouselItem>
          {/* Add more CarouselItems for additional images */}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
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
