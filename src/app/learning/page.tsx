import { 
  PlayIcon,
  BookOpenIcon,
  ClockIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ChartBarIcon,
  CodeBracketIcon,
  PresentationChartLineIcon,
  StarIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

export default function LearningPage() {
  const learningPaths = [
    {
      title: "SQL Mastery for Analysts",
      description: "From basic queries to advanced analytics. Master the language of data.",
      level: "Beginner to Advanced",
      duration: "12 weeks",
      modules: 8,
      students: "2.3k",
      rating: 4.9,
      image: "sql",
      skills: ["Query Optimization", "Window Functions", "CTEs", "Performance Tuning"],
      featured: true
    },
    {
      title: "Python for Data Analytics",
      description: "Data manipulation, visualization, and analysis using Python's powerful libraries.",
      level: "Intermediate",
      duration: "10 weeks", 
      modules: 10,
      students: "1.8k",
      rating: 4.8,
      image: "python",
      skills: ["Pandas", "NumPy", "Matplotlib", "Data Cleaning"],
      featured: true
    },
    {
      title: "Executive Communication",
      description: "Present data insights that drive business decisions and advance your career.",
      level: "All Levels",
      duration: "6 weeks",
      modules: 6,
      students: "3.1k", 
      rating: 4.9,
      image: "communication",
      skills: ["Data Storytelling", "Executive Dashboards", "Stakeholder Management", "Presentation Skills"],
      featured: true
    }
  ]

  const courses = [
    {
      title: "Tableau Fundamentals",
      description: "Build stunning visualizations and interactive dashboards",
      duration: "4 weeks",
      level: "Beginner",
      students: "1.2k",
      rating: 4.7,
      category: "BI Tools"
    },
    {
      title: "Power BI Advanced",
      description: "Advanced DAX, data modeling, and enterprise deployment",
      duration: "6 weeks", 
      level: "Advanced",
      students: "890",
      rating: 4.8,
      category: "BI Tools"
    },
    {
      title: "Looker Studio Mastery",
      description: "Create powerful reports and automate analytics workflows",
      duration: "3 weeks",
      level: "Intermediate", 
      students: "650",
      rating: 4.6,
      category: "BI Tools"
    },
    {
      title: "Advanced Statistics",
      description: "Statistical methods for data analysis and hypothesis testing",
      duration: "8 weeks",
      level: "Advanced",
      students: "720",
      rating: 4.9,
      category: "Statistics"
    },
    {
      title: "Machine Learning Basics",
      description: "Introduction to ML concepts and practical applications",
      duration: "10 weeks",
      level: "Intermediate",
      students: "1.5k", 
      rating: 4.7,
      category: "Machine Learning"
    },
    {
      title: "Data Governance",
      description: "Ensure data quality, security, and compliance",
      duration: "4 weeks",
      level: "Intermediate",
      students: "430",
      rating: 4.5,
      category: "Management"
    }
  ]

  const categories = ["All", "BI Tools", "Programming", "Statistics", "Management", "Machine Learning"]

  return (
    <div className="min-h-screen bg-gray-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Analytics <span className="gradient-text">Learning</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Master the skills that matter. From SQL and Python to executive communication, 
            learn what top analysts use to drive business impact.
          </p>
        </div>

        {/* Featured Learning Paths */}
        <section className="mb-20">
          <div className="flex items-center mb-12">
            <AcademicCapIcon className="h-8 w-8 text-green-400 mr-3" />
            <h2 className="text-3xl font-bold">Featured Learning Paths</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {learningPaths.map((path, index) => (
              <div key={index} className="glass rounded-xl overflow-hidden card-hover">
                <div className="h-48 bg-gradient-to-br from-green-900/50 to-gray-900/50 flex items-center justify-center">
                  <div className="text-center">
                    {path.image === 'sql' && <CodeBracketIcon className="h-16 w-16 text-green-400 mx-auto mb-2" />}
                    {path.image === 'python' && <ChartBarIcon className="h-16 w-16 text-green-400 mx-auto mb-2" />}
                    {path.image === 'communication' && <PresentationChartLineIcon className="h-16 w-16 text-green-400 mx-auto mb-2" />}
                    <span className="text-green-400 font-medium">{path.title}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold">{path.title}</h3>
                    <div className="flex items-center text-yellow-400">
                      <StarIcon className="h-4 w-4 mr-1" />
                      <span className="text-sm">{path.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 mb-4">{path.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center text-gray-300">
                      <ClockIcon className="h-4 w-4 mr-2 text-green-400" />
                      {path.duration}
                    </div>
                    <div className="flex items-center text-gray-300">
                      <BookOpenIcon className="h-4 w-4 mr-2 text-green-400" />
                      {path.modules} modules
                    </div>
                    <div className="flex items-center text-gray-300">
                      <UserGroupIcon className="h-4 w-4 mr-2 text-green-400" />
                      {path.students} students
                    </div>
                    <div className="text-green-400 font-medium">
                      {path.level}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">You'll Learn:</h4>
                    <div className="grid grid-cols-2 gap-1">
                      {path.skills.map((skill, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-400">
                          <CheckCircleIcon className="h-3 w-3 text-green-400 mr-1" />
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button className="w-full btn-primary">
                    Start Learning Path
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Course Catalog */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <BookOpenIcon className="h-8 w-8 text-green-400 mr-3" />
              <h2 className="text-3xl font-bold">Course Catalog</h2>
            </div>
            
            {/* Category Filter */}
            <div className="hidden md:flex space-x-2 bg-gray-900 p-2 rounded-lg">
              {categories.map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 rounded-md text-sm font-medium transition-colors bg-green-400/20 text-green-400"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <div key={index} className="glass rounded-xl p-6 card-hover">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-blue-400/20 text-blue-400 text-xs rounded-full">
                    {course.category}
                  </span>
                  <div className="flex items-center text-yellow-400">
                    <StarIcon className="h-4 w-4 mr-1" />
                    <span className="text-sm">{course.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-400 mb-4">{course.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div className="flex items-center text-gray-300">
                    <ClockIcon className="h-4 w-4 mr-2 text-green-400" />
                    {course.duration}
                  </div>
                  <div className="text-green-400 font-medium">
                    {course.level}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <UserGroupIcon className="h-4 w-4 mr-2 text-green-400" />
                    {course.students} students
                  </div>
                </div>
                
                <button className="w-full py-3 border border-green-400 text-green-400 rounded-lg hover:bg-green-400/10 transition-colors">
                  View Course
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Learning Stats */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-green-900/30 to-gray-900/30 rounded-2xl p-8 lg:p-12 border border-green-400/20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Real Learning, <span className="gradient-text">Real Results</span>
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Our courses are designed based on what actually matters in analytics careers. 
                Here's what our students achieve.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">85%</div>
                <div className="text-gray-400">Get promoted within 6 months</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">$18k</div>
                <div className="text-gray-400">Average salary increase</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">94%</div>
                <div className="text-gray-400">Course completion rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">4.8</div>
                <div className="text-gray-400">Average course rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Roadmap */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Your <span className="gradient-text">Learning Roadmap</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Follow this proven path from beginner to expert analyst. 
              Each level builds on the previous, ensuring steady progress.
            </p>
          </div>
          
          <div className="space-y-8">
            {/* Level 1 */}
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-black font-bold">
                1
              </div>
              <div className="flex-1 glass rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-2">Foundation Level</h3>
                <p className="text-gray-400 mb-4">
                  Build strong fundamentals in SQL, basic statistics, and data visualization.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-green-400/20 text-green-400 text-sm rounded-full">SQL Basics</span>
                  <span className="px-3 py-1 bg-green-400/20 text-green-400 text-sm rounded-full">Excel Advanced</span>
                  <span className="px-3 py-1 bg-green-400/20 text-green-400 text-sm rounded-full">Tableau Fundamentals</span>
                </div>
              </div>
            </div>
            
            {/* Level 2 */}
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-green-400/70 rounded-full flex items-center justify-center text-black font-bold">
                2
              </div>
              <div className="flex-1 glass rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-2">Intermediate Level</h3>
                <p className="text-gray-400 mb-4">
                  Learn Python for data analysis, advanced SQL, and business intelligence tools.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-green-400/20 text-green-400 text-sm rounded-full">Python Analytics</span>
                  <span className="px-3 py-1 bg-green-400/20 text-green-400 text-sm rounded-full">Advanced SQL</span>
                  <span className="px-3 py-1 bg-green-400/20 text-green-400 text-sm rounded-full">Power BI</span>
                </div>
              </div>
            </div>
            
            {/* Level 3 */}
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-green-400/40 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <div className="flex-1 glass rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-2">Advanced Level</h3>
                <p className="text-gray-400 mb-4">
                  Master machine learning, advanced statistics, and executive communication.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-green-400/20 text-green-400 text-sm rounded-full">Machine Learning</span>
                  <span className="px-3 py-1 bg-green-400/20 text-green-400 text-sm rounded-full">Executive Communication</span>
                  <span className="px-3 py-1 bg-green-400/20 text-green-400 text-sm rounded-full">Advanced Statistics</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start <span className="gradient-text">Learning</span>?
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            Join thousands of analysts who've accelerated their careers with our proven curriculum.
          </p>
          <button className="btn-primary mr-4">
            Browse All Courses
          </button>
          <button className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-green-400 hover:text-green-400 transition-colors">
            Talk to Advisor
          </button>
        </div>
      </div>
    </div>
  )
} 