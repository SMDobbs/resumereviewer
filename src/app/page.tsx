'use client'

import HeroSection from '@/components/landing/HeroSection'
import WhyAnalystHubWorks from '@/components/landing/WhyAnalystHubWorks'
import RecommendedResources from '@/components/landing/CoursePreview'
import FeaturesSection from '@/components/landing/FeaturesSection'
import PricingSection from '@/components/landing/PricingSection'
import SuccessStories from '@/components/landing/SuccessStories'
import TestimonialsSection from '@/components/landing/TestimonialsSection'
import FAQSection from '@/components/landing/FAQSection'
import CTASection from '@/components/landing/CTASection'
import MeetTheTeam from '@/components/landing/MeetTheTeam'

export default function Home() {
  return (
    <div className="min-h-screen">
      <div id="home">
        <HeroSection />
      </div>
      <div className="section-divider"></div>
      <div id="about" className="bg-gray-900/50">
        <WhyAnalystHubWorks />
      </div>
      <div className="section-divider"></div>
      <div id="features" className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <FeaturesSection />
      </div>
      <div className="section-divider"></div>
      <div id="resources" className="bg-gray-900/30">
        <RecommendedResources />
      </div>
      <div className="section-divider"></div>
      <div id="pricing">
        <PricingSection />
      </div>
      <div className="section-divider"></div>
      <MeetTheTeam />
      <div className="section-divider"></div>
      <div id="success" className="bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900">
        <SuccessStories />
      </div>
      <div className="section-divider"></div>
      <div id="testimonials" className="bg-gray-900/50">
        <TestimonialsSection />
      </div>
      <div className="section-divider"></div>
      <div id="faq" className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <FAQSection />
      </div>
      <div className="section-divider"></div>
      <CTASection />
    </div>
  )
}
