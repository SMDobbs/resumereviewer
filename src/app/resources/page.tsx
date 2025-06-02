import { 
  DocumentTextIcon, 
  ArrowDownTrayIcon, 
  BookOpenIcon,
  MapIcon,
  PresentationChartLineIcon,
  ClipboardDocumentListIcon,
  LightBulbIcon,
  StarIcon
} from '@heroicons/react/24/outline'

export default function ResourcesPage() {
  const resumeTemplates = [
    {
      title: "Senior Data Analyst Resume",
      description: "Perfect for 3-7 years experience. Highlights technical skills and business impact.",
      category: "Resume Templates",
      downloads: "2.1k",
      rating: 4.9,
      tags: ["ATS-Optimized", "Technical Focus", "Impact Metrics"]
    },
    {
      title: "Entry-Level Analytics Resume",
      description: "Designed for new graduates and career changers entering analytics.",
      category: "Resume Templates", 
      downloads: "3.2k",
      rating: 4.8,
      tags: ["Entry-Level", "Skills-Based", "Project Showcase"]
    },
    {
      title: "Analytics Manager Resume",
      description: "Leadership-focused template for management and director-level positions.",
      category: "Resume Templates",
      downloads: "1.5k", 
      rating: 4.9,
      tags: ["Leadership", "Strategic", "Team Management"]
    }
  ]

  const careerGuides = [
    {
      title: "The Analytics Career Roadmap",
      description: "Complete guide from entry-level to C-suite. Includes salary benchmarks, skill requirements, and timeline expectations.",
      category: "Career Guides",
      pages: 42,
      rating: 4.9,
      tags: ["Career Planning", "Comprehensive", "Salary Data"]
    },
    {
      title: "Negotiation Strategies for Analysts",
      description: "Proven tactics for salary negotiations, promotion discussions, and offer evaluations.",
      category: "Career Guides",
      pages: 28,
      rating: 4.8,
      tags: ["Negotiation", "Salary", "Practical Tips"]
    },
    {
      title: "Remote Analytics Work Guide",
      description: "How to excel as a remote analyst, build relationships, and advance your career from anywhere.",
      category: "Career Guides",
      pages: 35,
      rating: 4.7,
      tags: ["Remote Work", "Communication", "Productivity"]
    }
  ]

  const worksheets = [
    {
      title: "Skills Gap Analysis Worksheet",
      description: "Identify your skill gaps and create a personalized development plan.",
      category: "Worksheets",
      format: "PDF",
      rating: 4.8,
      tags: ["Self-Assessment", "Planning", "Development"]
    },
    {
      title: "Project Impact Calculator",
      description: "Calculate and articulate the business impact of your analytics projects.",
      category: "Worksheets", 
      format: "Excel",
      rating: 4.9,
      tags: ["Impact Metrics", "ROI", "Business Value"]
    },
    {
      title: "Interview Preparation Checklist",
      description: "Comprehensive checklist for technical and behavioral interview preparation.",
      category: "Worksheets",
      format: "PDF",
      rating: 4.7,
      tags: ["Interview Prep", "Checklist", "Preparation"]
    }
  ]

  const caseStudies = [
    {
      title: "Real Estate Risk Analytics",
      description: "How risk segmentation models saved $2M+ in operational costs",
      industry: "Real Estate",
      impact: "$2M+ Savings",
      rating: 4.9,
      tags: ["Risk Modeling", "Machine Learning", "Cost Reduction"]
    },
    {
      title: "IoT Predictive Maintenance",
      description: "Predicting HVAC failures using smart thermostat data",
      industry: "PropTech",
      impact: "40% Cost Reduction",
      rating: 4.8,
      tags: ["IoT Analytics", "Predictive Models", "Maintenance"]
    },
    {
      title: "Security Analytics Platform",
      description: "Trespasser detection using smart home sensor networks",
      industry: "Security",
      impact: "85% Accuracy",
      rating: 4.7,
      tags: ["Security", "Sensor Data", "Real-time Analytics"]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Career <span className="gradient-text">Resources</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Templates, guides, and resources crafted from real-world experience. 
            Everything you need to build a successful analytics career.
          </p>
        </div>

       

        {/* Resume Templates */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <DocumentTextIcon className="h-8 w-8 text-green-400 mr-3" />
            <h2 className="text-3xl font-bold">Resume Templates</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumeTemplates.map((template, index) => (
              <div key={index} className="glass rounded-xl p-6 card-hover">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{template.title}</h3>
                  <div className="flex items-center text-yellow-400">
                    <StarIcon className="h-4 w-4 mr-1" />
                    <span className="text-sm">{template.rating}</span>
                  </div>
                </div>
                <p className="text-gray-400 mb-4">{template.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.tags.map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 bg-green-400/20 text-green-400 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{template.downloads} downloads</span>
                  <button className="px-4 py-2 bg-green-400/20 text-green-400 rounded-lg hover:bg-green-400/30 transition-colors">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Career Guides */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <MapIcon className="h-8 w-8 text-green-400 mr-3" />
            <h2 className="text-3xl font-bold">Career Guides</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careerGuides.map((guide, index) => (
              <div key={index} className="glass rounded-xl p-6 card-hover">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{guide.title}</h3>
                  <div className="flex items-center text-yellow-400">
                    <StarIcon className="h-4 w-4 mr-1" />
                    <span className="text-sm">{guide.rating}</span>
                  </div>
                </div>
                <p className="text-gray-400 mb-4">{guide.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {guide.tags.map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 bg-green-400/20 text-green-400 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{guide.pages} pages</span>
                  <button className="px-4 py-2 bg-green-400/20 text-green-400 rounded-lg hover:bg-green-400/30 transition-colors">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Worksheets */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <ClipboardDocumentListIcon className="h-8 w-8 text-green-400 mr-3" />
            <h2 className="text-3xl font-bold">Interactive Worksheets</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {worksheets.map((worksheet, index) => (
              <div key={index} className="glass rounded-xl p-6 card-hover">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{worksheet.title}</h3>
                  <span className="px-2 py-1 bg-blue-400/20 text-blue-400 text-xs rounded-full">
                    {worksheet.format}
                  </span>
                </div>
                <p className="text-gray-400 mb-4">{worksheet.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {worksheet.tags.map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 bg-green-400/20 text-green-400 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-yellow-400">
                    <StarIcon className="h-4 w-4 mr-1" />
                    <span className="text-sm">{worksheet.rating}</span>
                  </div>
                  <button className="px-4 py-2 bg-green-400/20 text-green-400 rounded-lg hover:bg-green-400/30 transition-colors">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Case Studies */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <LightBulbIcon className="h-8 w-8 text-green-400 mr-3" />
            <h2 className="text-3xl font-bold">Real-World Case Studies</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((study, index) => (
              <div key={index} className="glass rounded-xl p-6 card-hover">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{study.title}</h3>
                  <span className="px-2 py-1 bg-purple-400/20 text-purple-400 text-xs rounded-full">
                    {study.industry}
                  </span>
                </div>
                <p className="text-gray-400 mb-4">{study.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {study.tags.map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 bg-green-400/20 text-green-400 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-green-400">{study.impact}</span>
                  <button className="px-4 py-2 bg-green-400/20 text-green-400 rounded-lg hover:bg-green-400/30 transition-colors">
                    Read Study
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-8 lg:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Get New Resources <span className="gradient-text">First</span>
          </h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Join 5,000+ analysts who get notified when we release new templates, guides, and tools. 
            Plus, get exclusive content and early access to new features.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-400"
            />
            <button className="btn-primary">
              Subscribe
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            No spam. Unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </div>
  )
} 