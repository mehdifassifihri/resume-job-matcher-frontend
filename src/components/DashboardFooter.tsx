import { motion } from "framer-motion"
import { 
  Heart, 
  Github, 
  Twitter, 
  Linkedin, 
  Mail,
  Sparkles,
  ArrowUp
} from "lucide-react"

export function DashboardFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200/50 dark:border-slate-700/50 overflow-hidden font-poppins">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-2xl"></div>
        <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-2xl"></div>
      </div>
      
      <div className="relative z-10">
        {/* Main Footer Content - Compact */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand Section - Compact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Resume Matcher</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">AI-powered job matching</p>
              </div>
            </motion.div>

            {/* Social Links - Compact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <button className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors group" onClick={() => window.open('https://github.com', '_blank')}>
                <Github className="w-4 h-4 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white" />
              </button>
              <button className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors group" onClick={() => window.open('https://twitter.com', '_blank')}>
                <Twitter className="w-4 h-4 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white" />
              </button>
              <button className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors group" onClick={() => window.open('https://linkedin.com', '_blank')}>
                <Linkedin className="w-4 h-4 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white" />
              </button>
              <button className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors group" onClick={() => window.open('mailto:support@example.com', '_blank')}>
                <Mail className="w-4 h-4 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white" />
              </button>
            </motion.div>
          </div>

          {/* Bottom Bar - Compact */}
          <div className="mt-6 pt-6 border-t border-slate-200/50 dark:border-slate-700/50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <span>&copy; 2024 Resume Matcher.</span>
                <span className="hidden sm:inline">Tous droits réservés.</span>
                <span className="flex items-center gap-1">
                  <span>Fait avec</span>
                  <Heart className="w-3 h-3 text-red-500" />
                  <span>en France</span>
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <button className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Mentions légales</button>
                <button className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Confidentialité</button>
                <button className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">CGU</button>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Top Button - Smaller */}
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <ArrowUp className="w-4 h-4 mx-auto" />
        </motion.button>
      </div>
    </footer>
  )
}
