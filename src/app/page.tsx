'use client'

import HeroSection from '@/components/landing/HeroSection'
import WhyAnalystHubWorks from '@/components/landing/WhyAnalystHubWorks'
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
      {/* Hero Section */}
      <div id="home" className="bg-gradient-to-b from-gray-950 to-gray-900">
        <HeroSection />
      </div>
      
      {/* About Section */}
      <div id="about" className="bg-gradient-to-b from-gray-900 to-slate-900">
        <WhyAnalystHubWorks />
      </div>
      
      {/* Features Section */}
      <div id="features" className="bg-gradient-to-b from-slate-900 to-gray-950">
        <FeaturesSection />
      </div>
      
      {/* Pricing Section */}
      <div id="pricing" className="bg-gradient-to-b from-gray-950 to-gray-900">
        <PricingSection />
      </div>
      
      {/* Meet the Team */}
      <div className="bg-gradient-to-b from-gray-900 to-slate-900">
        <MeetTheTeam />
      </div>
      
      {/* Success Stories */}
      <div id="success" className="bg-gradient-to-b from-slate-900 to-gray-950">
        <SuccessStories />
      </div>
      
      {/* Testimonials */}
      <div id="testimonials" className="bg-gradient-to-b from-gray-950 to-slate-900">
        <TestimonialsSection />
      </div>
      
      {/* FAQ Section */}
      <div id="faq" className="bg-gradient-to-b from-slate-900 to-gray-950">
        <FAQSection />
      </div>
      
      {/* CTA Section */}
      <div className="bg-gray-950">
        <CTASection />
      </div>
    </div>
  )
}
