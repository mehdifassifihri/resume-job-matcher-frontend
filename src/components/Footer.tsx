import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export function Footer() {
  return (
    <motion.footer 
      className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-neutral-border transition-all duration-300 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Background with blur effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-accent/3 to-primary/5"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-surface/95 to-transparent"></div>
      
      {/* Floating elements */}
      <div className="absolute top-10 right-10 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 left-10 w-20 h-20 bg-accent/10 rounded-full blur-2xl"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Resume Matcher</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">AI-powered job matching</p>
              </div>
            </div>
            <p className="text-neutral-text-secondary mb-4 max-w-md">
              Optimize your chances of landing your dream job with our system that adapts your CV to job offers.
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-neutral-text-primary font-semibold mb-4">Quick links</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  className="text-neutral-text-secondary hover:text-neutral-text-primary transition-colors text-left"
                  onClick={() => {
                    // Scroll to top
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  className="text-neutral-text-secondary hover:text-neutral-text-primary transition-colors text-left"
                  onClick={() => {
                    // Scroll to how it works section
                    const section = document.querySelector('[data-how-it-works]')
                    if (section) {
                      section.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                >
                  How it works
                </button>
              </li>
              <li>
                <button 
                  className="text-neutral-text-secondary hover:text-neutral-text-primary transition-colors text-left"
                  onClick={() => {
                    // Scroll to pricing section
                    const section = document.querySelector('[data-pricing]')
                    if (section) {
                      section.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                >
                  Pricing
                </button>
              </li>
              <li>
                <button 
                  className="text-neutral-text-secondary hover:text-neutral-text-primary transition-colors text-left"
                  onClick={() => {
                    // Scroll to contact section or show contact modal
                    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
                  }}
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-neutral-text-primary font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  className="text-neutral-text-secondary hover:text-neutral-text-primary transition-colors text-left"
                  onClick={() => {
                    // Open help center or show help modal
                    alert('Help center coming soon!')
                  }}
                >
                  Help center
                </button>
              </li>
              <li>
                <button 
                  className="text-neutral-text-secondary hover:text-neutral-text-primary transition-colors text-left"
                  onClick={() => {
                    // Open FAQ or show FAQ modal
                    alert('FAQ coming soon!')
                  }}
                >
                  FAQ
                </button>
              </li>
              <li>
                <button 
                  className="text-neutral-text-secondary hover:text-neutral-text-primary transition-colors text-left"
                  onClick={() => {
                    // Open privacy policy or show privacy modal
                    alert('Privacy policy coming soon!')
                  }}
                >
                  Privacy policy
                </button>
              </li>
              <li>
                <button 
                  className="text-neutral-text-secondary hover:text-neutral-text-primary transition-colors text-left"
                  onClick={() => {
                    // Open terms of use or show terms modal
                    alert('Terms of use coming soon!')
                  }}
                >
                  Terms of use
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-text-secondary text-sm">
            © 2024 Resume & Job Matcher. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button 
              className="text-neutral-text-secondary hover:text-neutral-text-primary transition-colors text-sm"
              onClick={() => {
                // Open legal notice or show legal modal
                alert('Legal notice coming soon!')
              }}
            >
              Legal notice
            </button>
            <button 
              className="text-neutral-text-secondary hover:text-neutral-text-primary transition-colors text-sm"
              onClick={() => {
                // Open privacy policy or show privacy modal
                alert('Privacy policy coming soon!')
              }}
            >
              Privacy policy
            </button>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
