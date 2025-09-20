import { motion } from "framer-motion"
import { 
  Zap, 
  Bot, 
  ArrowRight,
  Play
} from "lucide-react"
import n8nLogo from "../assets/n8n.png"

export function AutoApplySection() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8">
      {/* Enhanced background effect for dark mode */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 dark:via-primary/8 to-transparent" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-poppins-medium mb-6 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/30">
            <Zap className="w-4 h-4" />
            Coming Soon
          </div>
          
          <h2 className="text-3xl md:text-4xl font-poppins-bold mb-6 text-neutral-text-primary">
            Auto-Apply with{" "}
            <span className="inline-flex items-center gap-2">
              <img 
                src={n8nLogo} 
                alt="n8n" 
                className="h-12 w-auto"
              />
            </span>
          </h2>
          
          <p className="text-lg max-w-2xl mx-auto text-neutral-text-secondary leading-relaxed font-poppins">
            Let AI automatically apply to jobs that match your profile. 
            Powered by n8n workflows for maximum reliability.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-poppins-semibold mb-2 text-neutral-text-primary">
                    Smart Automation
                  </h3>
                  <p className="text-neutral-text-secondary leading-relaxed font-poppins">
                    AI analyzes job postings and applies automatically when they match your criteria.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-poppins-semibold mb-2 text-neutral-text-primary">
                    Reliable Workflows
                  </h3>
                  <p className="text-neutral-text-secondary leading-relaxed font-poppins">
                    Built on n8n's proven automation platform for enterprise-grade reliability.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg font-poppins-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-lg dark:shadow-blue-500/25">
                <Play className="w-4 h-4" />
                Get Early Access
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-white/50 dark:bg-neutral-surface backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-neutral-border shadow-lg dark:shadow-2xl">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg dark:shadow-blue-500/30">
                  <Bot className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-xl font-poppins-semibold mb-2 text-neutral-text-primary">
                  AI Agent Active
                </h3>
                <p className="text-neutral-text-secondary mb-6 font-poppins">
                  Monitoring job boards 24/7
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-3 px-4 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-700/50 shadow-sm dark:shadow-green-500/10">
                    <span className="text-sm font-poppins-medium text-green-800 dark:text-green-200">Applications Today</span>
                    <span className="text-lg font-poppins-bold text-green-600 dark:text-green-300">12</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 px-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-700/50 shadow-sm dark:shadow-blue-500/10">
                    <span className="text-sm font-poppins-medium text-blue-800 dark:text-blue-200">Match Rate</span>
                    <span className="text-lg font-poppins-bold text-blue-600 dark:text-blue-300">94%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
