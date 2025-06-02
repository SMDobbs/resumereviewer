import { StarIcon } from '@heroicons/react/24/outline'

export default function SuccessStories() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Real Impact, <span className="gradient-text">Real Results</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Analytics projects that saved millions and career growth strategies that work.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="glass rounded-xl p-8">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-green-400">Risk Segmentation Model</h3>
            <p className="text-gray-300 mb-4">
              Built customer risk segmentation models that identified high-risk accounts, 
              enabling proactive interventions that saved significant operational costs.
            </p>
            <div className="text-sm text-gray-500">Real Estate | Fortune 100</div>
          </div>

          <div className="glass rounded-xl p-8">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-green-400">Predictive HVAC Maintenance</h3>
            <p className="text-gray-300 mb-4">
              Developed predictive models using IoT thermostat data to identify failing HVAC systems 
              before breakdown, reducing emergency repair costs.
            </p>
            <div className="text-sm text-gray-500">Smart Home | IoT Analytics</div>
          </div>

          <div className="glass rounded-xl p-8">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-green-400">Security Analytics</h3>
            <p className="text-gray-300 mb-4">
              Created trespasser detection models from smart home sensor data, 
              improving security response times and reducing false alarms.
            </p>
            <div className="text-sm text-gray-500">Security | Machine Learning</div>
          </div>
        </div>
      </div>
    </section>
  )
} 