'use client'

import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

export default function FAQSection() {
  const [openItem, setOpenItem] = useState<number | null>(null)

  const faqs = [
    {
      question: "What's included in the monthly subscription?",
      answer: "Your subscription includes unlimited access to all career articles, curated learning roadmaps, downloadable resume templates, career frameworks, and industry insights. You get strategic guidance for breaking into analytics, advancing your career, and navigating different industry sectors based on real Fortune 100 experience."
    },
    {
      question: "Do you provide actual courses or just recommendations?",
      answer: "We focus on strategic career guidance and curated recommendations rather than creating courses ourselves. You'll get expert recommendations for the best external courses, books, and resources, along with strategic guidance on how to structure your learning for maximum career impact."
    },
    {
      question: "How is this different from other career advice platforms?",
      answer: "Unlike generic career advice, this guidance comes from real Fortune 100 experience across multiple industries (retail, real estate, CPG, education). You get specific insights on what each industry values, proven strategies that drove $55k to $110k+ growth, and actionable frameworks rather than theoretical advice."
    },
    {
      question: "Can I get personalized help with my specific situation?",
      answer: "Yes! While the subscription gives you access to all strategic articles and resources, you can book optional 1:1 career strategy sessions or mock interviews for $99 each. These sessions provide personalized guidance, resume optimization, and career roadmap development tailored to your specific goals and background."
    }
  ]

  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-xl text-gray-400">
            Everything you need to know about accelerating your analytics career
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass rounded-xl p-6 cursor-pointer"
              onClick={() => setOpenItem(openItem === index ? null : index)}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                <ChevronDownIcon
                  className={`h-5 w-5 text-green-400 transition-transform ${
                    openItem === index ? 'rotate-180' : ''
                  }`}
                />
              </div>
              {openItem === index && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 