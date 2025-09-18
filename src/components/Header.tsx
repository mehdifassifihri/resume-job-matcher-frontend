import { Button } from "./ui/button"
import { ThemeToggle } from "./ui/theme-toggle"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Home, Info, DollarSign } from "lucide-react"
import { useState, useEffect } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'how-it-works', 'pricing']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.querySelector(`[data-section="${section}"]`)
        if (element) {
          const { offsetTop, offsetHeight } = element as HTMLElement
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(`[data-section="${sectionId}"]`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'how-it-works', label: 'How it works', icon: Info },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
  ]

  return (
    <motion.header 
      className="sticky top-0 z-50 w-full bg-white/80 dark:bg-[#0b1020]/90 backdrop-blur-xl border-b border-white/20 dark:border-[#0b1020]/50 shadow-lg shadow-black/5"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <motion.div 
          className="flex items-center space-x-3 cursor-pointer group"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          onClick={() => scrollToSection('home')}
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse"></div>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Resume Matcher
            </h1>
            <p className="text-xs text-neutral-text-secondary">AI-powered</p>
          </div>
        </motion.div>

        {/* Navigation Desktop */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant={activeSection === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeSection === item.id 
                      ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/25' 
                      : 'hover:bg-white/50 dark:hover:bg-neutral-surface-alt/50 text-neutral-text-primary hover:text-primary'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                </Button>
              </motion.div>
            )
          })}
        </nav>

        {/* Actions Desktop */}
        <div className="hidden md:flex items-center space-x-3">
          <ThemeToggle />
        </div>

        {/* Menu Mobile Button */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg bg-white/50 dark:bg-[#0b1020]/40 hover:bg-white/80 dark:hover:bg-[#0b1020]/60 transition-colors border border-white/20 dark:border-[#0b1020]/50"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-white/20 dark:border-[#0b1020]/50 bg-white/90 dark:bg-[#0b1020]/80 backdrop-blur-xl"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      variant={activeSection === item.id ? "default" : "ghost"}
                      size="sm"
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full justify-start space-x-3 rounded-lg ${
                        activeSection === item.id 
                          ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg' 
                          : 'hover:bg-white/50 dark:hover:bg-neutral-surface-alt/50'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="font-medium">{item.label}</span>
                    </Button>
                  </motion.div>
                )
              })}
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

