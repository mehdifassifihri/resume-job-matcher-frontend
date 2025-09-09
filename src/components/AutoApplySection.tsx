import { motion } from "framer-motion"
import { 
  Zap, 
  Bot, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Play,
  Settings,
  BarChart3
} from "lucide-react"
import n8nLogo from "../assets/n8n.png"

export function AutoApplySection() {

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Effets de fond pour cette section - matching HeroUpload and PricingPlans */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 via-accent/3 to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-success/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/2 right-0 w-64 h-64 bg-warning/5 rounded-full blur-3xl" />
      
      {/* Additional floating elements for visual richness */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-primary/5 via-accent/5 to-success/5 rounded-full blur-3xl"></div>
      <div className="absolute top-10 right-20 w-24 h-24 bg-warning/8 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-20 w-28 h-28 bg-info/8 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full text-sm font-poppins-medium mb-6 bg-blue-100 text-blue-700">
            <Zap className="w-4 h-4" />
            Soon
          </div>
          <h2 className="text-4xl md:text-5xl font-poppins-bold mb-6 text-neutral-text-primary">
            Intelligent Auto-Apply with{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent inline-flex items-center gap-2 justify-center rounded-lg">
              <img 
                src={n8nLogo} 
                alt="n8n" 
                className="w-40 px-2 rounded-lg"
              />
            </span>
          </h2>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed font-poppins-medium text-neutral-text-secondary">
            Let our AI agent powered by n8n automatically apply to job offers 
            that perfectly match your profile. No more manual applications!
          </p>
        </motion.div>

        {/* Main Feature Showcase */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left: Feature Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-100">
                  <Bot className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-poppins-bold mb-2 text-neutral-text-primary">
                    Intelligent AI Agent
                  </h3>
                  <p className="leading-relaxed font-poppins text-neutral-text-secondary">
                    Our AI agent analyzes new job offers in real-time and 
                    automatically applies according to your criteria and preferences.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-purple-100">
                  <Settings className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-poppins-bold mb-2 text-neutral-text-primary">
                    Advanced Workflows
                  </h3>
                  <p className="leading-relaxed font-poppins text-neutral-text-secondary">
                    Robust and reliable automation with intelligent workflows. 
                    Advanced application management and real-time tracking.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-green-100">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-poppins-bold mb-2 text-neutral-text-primary">
                    Analytics and Optimization
                  </h3>
                  <p className="leading-relaxed font-poppins text-neutral-text-secondary">
                    Track your performance, optimize your applications and 
                    improve your response rate with AI insights.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-xl font-poppins-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <Play className="w-5 h-5" />
                Start Auto-Apply
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-poppins-semibold transition-all duration-300 border-2 bg-white/10 backdrop-blur-xl text-neutral-text-primary border-white/20 hover:bg-white/20 hover:border-white/30">
                <Settings className="w-5 h-5" />
                Configure
              </button>
            </div>
          </motion.div>

          {/* Right: Key Statistics */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="rounded-2xl p-8 shadow-2xl bg-white/10 backdrop-blur-xl border border-white/20">
              {/* Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-poppins-bold text-neutral-text-primary mb-2">
                  Real-time Performance
                </h3>
                <p className="text-neutral-text-secondary font-poppins">
                  Our AI agents work 24/7 for you
                </p>
              </div>

              {/* Key Statistics */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-3xl font-poppins-bold text-blue-600 mb-1">24/7</p>
                  <p className="text-sm font-poppins text-neutral-text-secondary">Monitoring</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-3xl font-poppins-bold text-green-600 text-green-400 mb-1">98%</p>
                  <p className="text-sm font-poppins text-neutral-text-secondary">Accuracy</p>
                </div>
              </div>

              {/* Additional Stats */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-blue-50/50 bg-blue-900/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 bg-blue-800 rounded-lg flex items-center justify-center">
                      <Bot className="w-5 h-5 text-blue-600 text-blue-400" />
                    </div>
                    <div>
                      <p className="font-poppins-semibold text-neutral-text-primary">Automatic Applications</p>
                      <p className="text-sm text-neutral-text-secondary">Per day</p>
                    </div>
                  </div>
                  <span className="text-2xl font-poppins-bold text-blue-600 text-blue-400">50+</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-purple-50/50 bg-purple-900/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 bg-purple-800 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-purple-600 text-purple-400" />
                    </div>
                    <div>
                      <p className="font-poppins-semibold text-neutral-text-primary">Response Rate</p>
                      <p className="text-sm text-neutral-text-secondary">Average</p>
                    </div>
                  </div>
                  <span className="text-2xl font-poppins-bold text-purple-600 text-purple-400">85%</span>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
          </motion.div>
        </div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          <div className="rounded-xl p-6 shadow-lg bg-white/10 backdrop-blur-xl border border-white/20 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-blue-100">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-poppins-bold mb-3 text-neutral-text-primary">Time Saving</h3>
            <p className="font-poppins text-neutral-text-secondary">
              Save hours every week by automating your applications
            </p>
          </div>

          <div className="rounded-xl p-6 shadow-lg bg-white/10 backdrop-blur-xl border border-white/20 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-purple-100">
              <CheckCircle className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-poppins-bold mb-3 text-neutral-text-primary">AI Accuracy</h3>
            <p className="font-poppins text-neutral-text-secondary">
              Targeted applications with 98% accuracy thanks to AI
            </p>
          </div>

          <div className="rounded-xl p-6 shadow-lg bg-white/10 backdrop-blur-xl border border-white/20 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-green-100">
              <BarChart3 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-poppins-bold mb-3 text-neutral-text-primary">Advanced Tracking</h3>
            <p className="font-poppins text-neutral-text-secondary">
              Detailed analytics to optimize your application strategies
            </p>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-poppins-bold mb-4">
                Ready to revolutionize your job search?
              </h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto font-poppins-medium">
                Join thousands of professionals who already use our 
                AI agent to automate their applications and maximize their chances.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-poppins-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Start Free
                </button>
                <button className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-xl font-poppins-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
                  View Demo
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
