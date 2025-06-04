import { UserGroupIcon, BriefcaseIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

export default function MeetTheTeam() {
  const team = [
    {
      name: "Mark Dobbs",
      role: "Co-Founder & Analytics Strategist",
      experience: "20+ years in analytics",
      currentRole: "VP of Analytics @ Sworn AI",
      background: "Career spanning Bair Analytics, LexisNexis, and Walmart. Awarded medals for analytics work with California police departments.",
      specialties: ["Crime Prediction", "Geospatial Analytics", "Law Enforcement Analytics", "Fortune 500 Experience"],
      bio: "Mark brings over two decades of analytics expertise across Bair Analytics, LexisNexis, and Walmart, specializing in crime prediction and geospatial analysis. He has been awarded medals for his groundbreaking analytics work with police departments throughout California. As VP of Analytics at SWORN AI, he continues advancing public safety through data-driven solutions and evidence-based problem-solving.",
      // Actual headshot image
      avatar: "MD",
      image: "/md.jpeg"
    },
    {
      name: "Spencer Dobbs",
      role: "Co-Founder & Lead Data Analyst",
      experience: "10+ years in analytics",
      currentRole: "Lead Data Analyst specializing in Asset Management",
      background: "Expert in Real Estate Analytics, CPG, and Retail sectors. Ex-Walmart Pricing Analytics. Full-stack developer with experience building web applications.",
      specialties: ["Python", "SQL", "Next.js", "Django", "Executive Reporting", "Web Development"],
      bio: "Spencer combines technical expertise with executive communication skills across multiple industries. His experience includes pricing analytics at Walmart and specialized work in real estate, CPG, and retail sectors. He writes production Python and SQL code while regularly presenting insights to C-level executives, and develops websites and web applications using Next.js and Django.",
      // Actual headshot image
      avatar: "SD",
      image: "/sd.jpeg"
    }
  ]

  return (
    <section id="team" className="py-24 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center mb-6">
            <UserGroupIcon className="h-8 w-8 text-green-400 mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold">
              Meet <span className="gradient-text">The Team</span>
            </h2>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Our founders combine 30+ years of Fortune 100 analytics experience across multiple industries, 
            bringing you proven strategies that have driven real career growth and business impact.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <div key={index} className="glass rounded-2xl p-8 group card-hover flex flex-col">
              {/* Header with Avatar and Basic Info - Fixed Height for Alignment */}
              <div className="flex items-start space-x-6 mb-8 h-[140px]">
                {/* Avatar Placeholder */}
                <div className="relative flex-shrink-0">
                  {member.image ? (
                    <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-green-400/25 transition-all duration-300">
                      <Image 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                        width={96}
                        height={96}
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-green-400/25 transition-all duration-300">
                      <span className="text-white text-2xl font-bold">{member.avatar}</span>
                    </div>
                  )}
                  {/* Professional Badge */}
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                    <BriefcaseIcon className="h-4 w-4 text-gray-900" />
                  </div>
                </div>

                {/* Name and Title */}
                <div className="flex-1 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-green-400 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-green-400 font-semibold mb-2">{member.role}</p>
                    <p className="text-gray-400 text-sm mb-3">{member.experience}</p>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-auto">
                    <ChartBarIcon className="h-4 w-4 mr-2" />
                    <span className="leading-tight">{member.currentRole}</span>
                  </div>
                </div>
              </div>

              {/* Background Section - Fixed Height for Alignment */}
              <div className="mb-8 h-[120px] flex flex-col">
                <h4 className="text-lg font-semibold mb-3 text-gray-200">Background</h4>
                <div className="flex-1 flex items-start">
                  <p className="text-gray-400 leading-relaxed">{member.background}</p>
                </div>
              </div>

              {/* Bio Section - Fixed Height for Alignment */}
              <div className="mb-8 h-[200px] flex flex-col">
                <h4 className="text-lg font-semibold mb-3 text-gray-200">Bio</h4>
                <div className="flex-1 flex items-start overflow-hidden">
                  <p className="text-gray-300 leading-relaxed">{member.bio}</p>
                </div>
              </div>

              {/* Specialties Section - Consistent Bottom Alignment */}
              <div className="mt-auto pt-4">
                <h4 className="text-lg font-semibold mb-4 text-gray-200">Specialties</h4>
                <div className="flex flex-wrap gap-2 min-h-[60px] items-start">
                  {member.specialties.map((specialty, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-green-400/10 text-green-400 rounded-full text-sm border border-green-400/20 group-hover:bg-green-400/20 transition-colors"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="glass rounded-xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready to learn from <span className="gradient-text">industry veterans</span>?
            </h3>
            <p className="text-gray-400 mb-6">
              Get access to the same strategies and insights that helped us build successful analytics careers 
              at Fortune 100 companies and scale analytics teams.
            </p>
            <a 
              href="#pricing" 
              className="btn-primary inline-flex items-center px-8 py-3 text-lg font-semibold"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Get Full Access Now
              <ChartBarIcon className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
} 