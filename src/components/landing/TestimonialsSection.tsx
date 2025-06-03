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

        <div className="max-w-5xl mx-auto">
          <div className="glass rounded-xl p-8 md:p-16 text-center relative overflow-hidden">
            {/* Background Quote Marks */}
            <div className="absolute top-8 left-8 text-8xl text-green-400/10 font-serif leading-none">"</div>
            <div className="absolute bottom-8 right-8 text-8xl text-green-400/10 font-serif leading-none rotate-180">"</div>
            
            {/* Main Content */}
            <div className="relative z-10">
              {/* Quote */}
              <blockquote className="text-xl md:text-2xl text-gray-200 mb-10 italic leading-relaxed max-w-3xl mx-auto">
                Spencer's coaching was a game-changer for my career. He has this amazing ability to break down complex concepts and show you exactly how to apply them in the real world. Working with him was definitely worth the investment!
              </blockquote>
              
              {/* Rating */}
              <div className="flex justify-center mb-8">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-7 w-7 text-yellow-400 fill-current mx-0.5" />
                ))}
              </div>
              
              {/* Author */}
              <div className="flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400/30 to-green-500/30 rounded-full flex items-center justify-center mr-6 border-2 border-green-400/20">
                  <span className="text-green-400 font-bold text-xl">HB</span>
                </div>
                <div className="text-left">
                  <div className="font-bold text-xl text-white">Hannah Beck</div>
                  <div className="text-gray-300 text-lg">Manager, Business Systems Analyst</div>
                  <div className="text-green-400 text-sm font-medium">Walmart</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 