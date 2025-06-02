import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

export default function CTASection() {
  return (
    <section className="py-24 bg-gray-950">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Land Your <span className="gradient-text">First Analytics Role</span>?
        </h2>
        <p className="text-xl text-gray-400 mb-8">
          Join hundreds of successful analysts who used our tools, guides, and coaching to break into 
          analytics. Most land their first role within 30-60 days.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/tools" className="btn-primary inline-flex items-center justify-center">
            Get Started Free
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
          <Link href="/coaching" className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-green-400 hover:text-green-400 transition-colors">
            Book Free Consultation
          </Link>
        </div>
        <p className="text-sm text-gray-500 mt-6">
          Free tools available • Premium features from $27 • 100% satisfaction guarantee
        </p>
      </div>
    </section>
  )
} 