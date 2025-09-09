import { motion } from "framer-motion"

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
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="text-xl font-bold text-neutral-text-primary">Resume & Job Matcher</span>
            </div>
            <p className="text-neutral-text-secondary mb-4 max-w-md">
              Optimize your chances of landing your dream job with our AI that adapts your CV to job offers.
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-neutral-text-primary font-semibold mb-4">Quick links</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#" 
                  className="text-neutral-text-secondary hover:text-neutral-text-primary transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    // Scroll to top
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-neutral-text-secondary hover:text-neutral-text-primary transition-colors"
                  onClick={(e) => e.preventDefault()}
                >
                  How it works
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-neutral-text-secondary hover:text-neutral-text-primary transition-colors"
                  onClick={(e) => e.preventDefault()}
                >
                  Pricing
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-neutral-text-secondary hover:text-neutral-text-primary transition-colors"
                  onClick={(e) => e.preventDefault()}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-neutral-text-primary font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#" 
                  className="text-neutral-text-secondary hover:text-neutral-text-primary transition-colors"
                  onClick={(e) => e.preventDefault()}
                >
                  Help center
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-neutral-text-secondary hover:text-neutral-text-primary transition-colors"
                  onClick={(e) => e.preventDefault()}
                >
                  FAQ
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-neutral-text-secondary hover:text-neutral-text-primary transition-colors"
                  onClick={(e) => e.preventDefault()}
                >
                  Privacy policy
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-neutral-text-secondary hover:text-neutral-text-primary transition-colors"
                  onClick={(e) => e.preventDefault()}
                >
                  Terms of use
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-text-secondary text-sm">
            © 2024 AI Resume & Job Matcher. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a 
              href="#" 
              className="text-neutral-text-secondary hover:text-neutral-text-primary transition-colors text-sm"
              onClick={(e) => e.preventDefault()}
            >
              Legal notice
            </a>
            <a 
              href="#" 
              className="text-neutral-text-secondary hover:text-neutral-text-primary transition-colors text-sm"
              onClick={(e) => e.preventDefault()}
            >
              Privacy policy
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
