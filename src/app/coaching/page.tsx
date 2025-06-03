'use client'

import { UserGroupIcon, ClockIcon, CalendarIcon, CheckCircleIcon, StarIcon } from '@heroicons/react/24/outline'
import { PagePaywall } from '@/components/Paywall'

export default function CoachingPage() {
  const coachingOptions = [
    {
      id: 1,
      title: "Mock Interview Session",
      duration: "45 minutes",
      price: "$74.99",
      description: "Practice with an experienced analyst who knows what hiring managers look for",
      includes: [
        "Behavioral interview practice",
        "Technical question walkthrough",
        "Real-time feedback",
        "Personalized improvement plan",
        "Recording of session"
      ],
      popular: false,
      paymentLink: "https://calendly.com/databydobbs-support/mock-interview-session"
    },
    {
      id: 2,
      title: "Career Strategy Session",
      duration: "60 minutes",
      price: "$99.99",
      description: "Get a personalized roadmap for breaking into analytics based on your background",
      includes: [
        "Skills gap analysis",
        "Career path planning",
        "Application strategy",
        "Networking tips",
        "30-day action plan"
      ],
      popular: true,
      paymentLink: "https://calendly.com/databydobbs-support/30min"
    },
    {
      id: 3,
      title: "Resume & LinkedIn Review",
      duration: "30 minutes",
      price: "$49.99",
      description: "Get your resume and LinkedIn profile optimized for analytics roles",
      includes: [
        "Line-by-line resume review",
        "LinkedIn optimization",
        "Keyword recommendations",
        "Before/after comparison",
        "ATS optimization tips"
      ],
      popular: false,
      paymentLink: "https://calendly.com/databydobbs-support/resume-linkedin-review"
    }
  ]

  const testimonials = [
    {
      name: "Hannah Beck",
      role: "Manager, Business Systems Analyst at Walmart",
      content: "Spencer's coaching was a game-changer for my career. He has this amazing ability to break down complex concepts and show you exactly how to apply them in the real world. Working with him was definitely worth the investment!",
      rating: 5
    }
  ]

  return (
    <PagePaywall
      title="1-on-1 Coaching Sessions"
      description="Get personalized guidance from experienced analysts who've successfully made the transition and helped hundreds of others do the same."
      feature="Access to premium coaching sessions and career mentorship"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">
          1-on-1 <span className="gradient-text">Coaching Sessions</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl">
          Get personalized guidance from experienced analysts who've successfully made the transition 
          and helped hundreds of others do the same.
        </p>
      </div>

      {/* Coaching Options */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
        {coachingOptions.map((option) => (
          <div key={option.id} className={`glass rounded-xl p-6 relative ${option.popular ? 'ring-2 ring-green-400' : ''}`}>
            {option.popular && (
              <div className="absolute -top-3 right-6 bg-green-400 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
            )}
            
            <div className="mb-6">
              <UserGroupIcon className="h-12 w-12 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
              <p className="text-gray-400 mb-4">{option.description}</p>
              
              <div className="flex items-center gap-4 mb-4">
                <span className="flex items-center text-sm text-gray-500">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  {option.duration}
                </span>
                <span className="text-2xl font-bold text-green-400">Included</span>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-500 mb-3">What's Included:</h4>
              <ul className="space-y-2">
                {option.includes.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircleIcon className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a 
              href={option.paymentLink}
              target="_blank"
              rel="noopener noreferrer"
              className={option.popular ? "btn-primary w-full inline-block text-center" : "w-full px-4 py-2 border border-green-400 text-green-400 rounded-lg hover:bg-green-400/10 transition-colors inline-block text-center"}
            >
              Book Session
            </a>
          </div>
        ))}
      </div>

      {/* How It Works */}
      <div className="glass rounded-xl p-8 mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">How Coaching Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-green-400 font-bold">1</span>
            </div>
            <h3 className="font-medium mb-1">Book Your Session</h3>
            <p className="text-sm text-gray-400">Choose your coaching type and preferred time</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-green-400 font-bold">2</span>
            </div>
            <h3 className="font-medium mb-1">Prep Materials</h3>
            <p className="text-sm text-gray-400">Receive pre-session questionnaire and resources</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-green-400 font-bold">3</span>
            </div>
            <h3 className="font-medium mb-1">Live Session</h3>
            <p className="text-sm text-gray-400">Get personalized coaching via video call</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-green-400 font-bold">4</span>
            </div>
            <h3 className="font-medium mb-1">Follow-up</h3>
            <p className="text-sm text-gray-400">Receive session notes and action plan</p>
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">What Clients Are Saying</h2>
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-xl p-8 md:p-12 text-center relative">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 text-6xl text-green-400/20 font-serif">"</div>
            
            {/* Main Quote */}
            <blockquote className="text-lg md:text-xl text-gray-300 mb-8 italic leading-relaxed">
              Spencer's coaching was a game-changer for my career. He has this amazing ability to break down complex concepts and show you exactly how to apply them in the real world. Working with him was definitely worth the investment!
            </blockquote>
            
            {/* Rating */}
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
            </div>
            
            {/* Author Info */}
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mr-4">
                <span className="text-green-400 font-bold text-lg">HB</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-lg">Hannah Beck</div>
                <div className="text-gray-400">Manager, Business Systems Analyst</div>
                <div className="text-gray-500 text-sm">Walmart</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </PagePaywall>
  )
} 