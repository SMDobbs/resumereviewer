'use client'

import { UserGroupIcon, ClockIcon, CalendarIcon, CheckCircleIcon, StarIcon } from '@heroicons/react/24/outline'
import { PagePaywall } from '@/components/Paywall'

export default function CoachingPage() {
  const coachingOptions = [
    {
      id: 1,
      title: "Mock Interview Session",
      duration: "60 minutes",
      price: "$97",
      description: "Practice with an experienced analyst who knows what hiring managers look for",
      includes: [
        "Behavioral interview practice",
        "Technical question walkthrough",
        "Real-time feedback",
        "Personalized improvement plan",
        "Recording of session"
      ],
      popular: false
    },
    {
      id: 2,
      title: "Career Strategy Session",
      duration: "90 minutes",
      price: "$147",
      description: "Get a personalized roadmap for breaking into analytics based on your background",
      includes: [
        "Skills gap analysis",
        "Career path planning",
        "Application strategy",
        "Networking tips",
        "30-day action plan"
      ],
      popular: true
    },
    {
      id: 3,
      title: "Resume & LinkedIn Review",
      duration: "45 minutes",
      price: "$77",
      description: "Get your resume and LinkedIn profile optimized for analytics roles",
      includes: [
        "Line-by-line resume review",
        "LinkedIn optimization",
        "Keyword recommendations",
        "Before/after comparison",
        "ATS optimization tips"
      ],
      popular: false
    }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Data Analyst at Microsoft",
      content: "The mock interview session gave me the confidence I needed. I landed my dream role within 3 weeks!",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      role: "Analytics Consultant",
      content: "The career strategy session was a game-changer. I finally had a clear path forward.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Business Analyst at Target",
      content: "My resume went from zero responses to 5 interviews in 2 weeks. Worth every penny!",
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

            <button className={option.popular ? "btn-primary w-full" : "w-full px-4 py-2 border border-green-400 text-green-400 rounded-lg hover:bg-green-400/10 transition-colors"}>
              Book Session
            </button>
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

      {/* Testimonials */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="glass rounded-xl p-6">
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-4 italic">"{testimonial.content}"</p>
              <div>
                <p className="font-medium">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Package Deal */}
      <div className="glass rounded-xl p-8 bg-gradient-to-br from-green-900/20 to-green-800/20 text-center">
        <h3 className="text-2xl font-bold mb-2">Premium Coaching Access</h3>
        <p className="text-gray-400 mb-6">All coaching sessions included with your premium membership</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
          <div>
            <span className="text-4xl font-bold text-green-400">Unlimited</span>
          </div>
          <div className="text-left">
            <p className="text-sm text-gray-400">✓ Mock Interview Sessions</p>
            <p className="text-sm text-gray-400">✓ Career Strategy Sessions</p>
            <p className="text-sm text-gray-400">✓ Resume & LinkedIn Reviews</p>
            <p className="text-sm text-gray-400">✓ Follow-up Support</p>
          </div>
        </div>

        <button className="btn-primary text-lg px-8 py-3">
          <CalendarIcon className="h-5 w-5 inline mr-2" />
          Schedule Your First Session
        </button>
        <p className="text-sm text-gray-500 mt-2">Premium members get priority booking</p>
      </div>
    </PagePaywall>
  )
} 