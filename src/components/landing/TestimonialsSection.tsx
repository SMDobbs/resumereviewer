import { StarIcon } from '@heroicons/react/24/outline'

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What <span className="gradient-text">Analysts</span> Are Saying
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Real feedback from analysts who've transformed their careers with our guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="glass rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-400/20 rounded-full flex items-center justify-center mr-4">
                <span className="text-green-400 font-bold">SA</span>
              </div>
              <div>
                <h4 className="font-semibold">Sarah A.</h4>
                <p className="text-sm text-gray-400">Senior Data Analyst</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              "The salary negotiation toolkit helped me secure a $25k raise in my annual review. 
              The strategies are practical and actually work in real-world situations."
            </p>
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-400/20 rounded-full flex items-center justify-center mr-4">
                <span className="text-green-400 font-bold">MJ</span>
              </div>
              <div>
                <h4 className="font-semibold">Mike J.</h4>
                <p className="text-sm text-gray-400">Analytics Manager</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              "The executive communication course transformed how I present insights. 
              I went from creating reports to driving business strategy."
            </p>
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-400/20 rounded-full flex items-center justify-center mr-4">
                <span className="text-green-400 font-bold">LK</span>
              </div>
              <div>
                <h4 className="font-semibold">Lisa K.</h4>
                <p className="text-sm text-gray-400">Business Analyst</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              "As a career changer, the industry insights helped me understand where analytics 
              fits in different sectors. Landed my dream job in retail analytics!"
            </p>
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 