import Link from 'next/link'
import { ArrowRightIcon, BookOpenIcon, CodeBracketIcon, ChartBarIcon, AcademicCapIcon, PresentationChartBarIcon, CpuChipIcon } from '@heroicons/react/24/outline'

export default function RecommendedResources() {
  return (
    <section className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Curated <span className="gradient-text">Learning Paths</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Hand-picked resources and strategic guidance for building analytics skills that employers value
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* SQL Foundations */}
          <div className="glass rounded-xl p-6 card-hover">
            <div className="w-12 h-12 bg-blue-400/20 rounded-lg flex items-center justify-center mb-4">
              <ChartBarIcon className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">SQL Foundations</h3>
            <p className="text-gray-400 mb-4">
              Start with SQLBolt, progress to Mode Analytics SQL Tutorial, master advanced concepts with Window Functions.
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>3 recommended resources</span>
              <span className="text-green-400">Beginner</span>
            </div>
          </div>

          {/* Python Analytics Stack */}
          <div className="glass rounded-xl p-6 card-hover">
            <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center mb-4">
              <CodeBracketIcon className="h-6 w-6 text-yellow-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Python Analytics Stack</h3>
            <p className="text-gray-400 mb-4">
              Automate the Boring Stuff → Python for Data Analysis → Kaggle Learn. Plus my strategy guide.
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>4 recommended resources</span>
              <span className="text-blue-400">Intermediate</span>
            </div>
          </div>

          {/* BI Tools Mastery */}
          <div className="glass rounded-xl p-6 card-hover">
            <div className="w-12 h-12 bg-purple-400/20 rounded-lg flex items-center justify-center mb-4">
              <PresentationChartBarIcon className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">BI Tools Mastery</h3>
            <p className="text-gray-400 mb-4">
              Tableau Public training, Power BI Learning Path, plus my guide on which tool to learn first.
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>5 recommended resources</span>
              <span className="text-green-400">All Levels</span>
            </div>
          </div>

          {/* Breaking Into Analytics */}
          <div className="glass rounded-xl p-6 card-hover">
            <div className="w-12 h-12 bg-green-400/20 rounded-lg flex items-center justify-center mb-4">
              <BookOpenIcon className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Breaking Into Analytics</h3>
            <p className="text-gray-400 mb-4">
              Complete roadmap for career changers: portfolio projects, networking strategy, interview prep.
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>My detailed guide</span>
              <span className="text-yellow-400">Career Change</span>
            </div>
          </div>

          {/* Statistics & ML */}
          <div className="glass rounded-xl p-6 card-hover">
            <div className="w-12 h-12 bg-red-400/20 rounded-lg flex items-center justify-center mb-4">
              <CpuChipIcon className="h-6 w-6 text-red-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Statistics & ML</h3>
            <p className="text-gray-400 mb-4">
              Think Stats, Introduction to Statistical Learning, Andrew Ng's Course. Strategic learning order.
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>6 recommended resources</span>
              <span className="text-green-400">Advanced</span>
            </div>
          </div>

          {/* Industry Knowledge */}
          <div className="glass rounded-xl p-6 card-hover">
            <div className="w-12 h-12 bg-indigo-400/20 rounded-lg flex items-center justify-center mb-4">
              <AcademicCapIcon className="h-6 w-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Industry Knowledge</h3>
            <p className="text-gray-400 mb-4">
              My insights on retail, real estate, CPG, and education analytics. What matters in each sector.
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>4 industry deep-dives</span>
              <span className="text-blue-400">Strategic</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/learning" className="btn-primary inline-flex items-center text-lg px-8 py-4">
            View Learning Roadmaps
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
} 