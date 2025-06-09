import { DocumentTextIcon, UserGroupIcon, AcademicCapIcon, LightBulbIcon } from '@heroicons/react/24/outline'

export default function WhyAnalystHubWorks() {
  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why People Struggle to <span className="gradient-text">Break Into Analytics</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Most people don't know where to start, what to learn, or how to stand out. 
            We solve these problems with a proven system that gets results.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Pain Points */}
          <div className="glass rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-red-400">Common Struggles</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-red-400 mr-3 mt-1">×</span>
                <span className="text-gray-300">Don't know which skills to learn first</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-3 mt-1">×</span>
                <span className="text-gray-300">Resume gets ignored by recruiters</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-3 mt-1">×</span>
                <span className="text-gray-300">Lack confidence in interviews</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-3 mt-1">×</span>
                <span className="text-gray-300">No analytics experience to showcase</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-3 mt-1">×</span>
                <span className="text-gray-300">Don't know how to position themselves</span>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div className="glass rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-green-400">Our Solutions</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">✓</span>
                <span className="text-gray-300">Strategic skill development guidance</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">✓</span>
                <span className="text-gray-300">AI-powered resume & LinkedIn reviews</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">✓</span>
                <span className="text-gray-300">Mock interviews with real questions</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">✓</span>
                <span className="text-gray-300">Portfolio templates to showcase work</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">✓</span>
                <span className="text-gray-300">1-on-1 coaching from experienced analysts</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <AcademicCapIcon className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Learn What Matters</h3>
            <p className="text-gray-400 text-sm">
              Focus on skills that actually get you hired
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <DocumentTextIcon className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Stand Out</h3>
            <p className="text-gray-400 text-sm">
              Resumes that get past ATS and impress hiring managers
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserGroupIcon className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Interview Confidently</h3>
            <p className="text-gray-400 text-sm">
              Practice with real questions and get expert feedback
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <LightBulbIcon className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Get Guidance</h3>
            <p className="text-gray-400 text-sm">
              Direct mentorship from successful analysts
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 