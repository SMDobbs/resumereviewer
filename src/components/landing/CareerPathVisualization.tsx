import { ArrowRightIcon } from '@heroicons/react/24/outline'

export default function CareerPathVisualization() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 to-green-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your <span className="gradient-text">Career Journey</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Follow the proven path from analyst to executive. Each stage builds on the previous 
            with specific skills, strategies, and milestones.
          </p>
        </div>

        <div className="relative">
          {/* Career Path Timeline */}
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-8">
            {/* Junior Analyst */}
            <div className="flex-1 text-center">
              <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-400">
                <span className="text-green-400 font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Junior Analyst</h3>
              <p className="text-gray-400 text-sm mb-2">$45k - $65k</p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• SQL fundamentals</li>
                <li>• Basic visualization</li>
                <li>• Data quality checks</li>
              </ul>
            </div>

            <ArrowRightIcon className="h-8 w-8 text-green-400 rotate-90 lg:rotate-0" />

            {/* Analyst */}
            <div className="flex-1 text-center">
              <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-400">
                <span className="text-green-400 font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Analyst</h3>
              <p className="text-gray-400 text-sm mb-2">$65k - $85k</p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Advanced SQL & Python</li>
                <li>• Business insights</li>
                <li>• Stakeholder communication</li>
              </ul>
            </div>

            <ArrowRightIcon className="h-8 w-8 text-green-400 rotate-90 lg:rotate-0" />

            {/* Senior Analyst */}
            <div className="flex-1 text-center">
              <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-400">
                <span className="text-green-400 font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Senior Analyst</h3>
              <p className="text-gray-400 text-sm mb-2">$85k - $110k</p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Machine learning</li>
                <li>• Project leadership</li>
                <li>• Executive presentations</li>
              </ul>
            </div>

            <ArrowRightIcon className="h-8 w-8 text-green-400 rotate-90 lg:rotate-0" />

            {/* Analytics Manager */}
            <div className="flex-1 text-center">
              <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-400">
                <span className="text-green-400 font-bold">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Analytics Manager</h3>
              <p className="text-gray-400 text-sm mb-2">$110k - $150k+</p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Team leadership</li>
                <li>• Strategy development</li>
                <li>• Business partnership</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 