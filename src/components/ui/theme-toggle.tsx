import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "../../contexts/ThemeContext"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-neutral-surface/20 hover:bg-neutral-surface/30 transition-colors duration-200 border border-neutral-border/30"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <motion.div
        animate={{
          rotate: theme === 'dark' ? 180 : 0,
        }}
        transition={{
          duration: 0.3,
        }}
      >
        {theme === 'dark' ? (
          <Sun className="h-4 w-4 text-neutral-text-primary" />
        ) : (
          <Moon className="h-4 w-4 text-neutral-text-primary" />
        )}
      </motion.div>
    </motion.button>
  )
}

