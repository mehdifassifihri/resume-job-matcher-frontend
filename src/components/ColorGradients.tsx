import { motion } from 'framer-motion'

export function ColorGradients() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Gradient radial principal */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-accent/3 to-transparent" />
      
      {/* Formes colorées flottantes */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-bl from-success/20 to-warning/20 rounded-full blur-2xl"
        animate={{
          x: [0, -25, 0],
          y: [0, 15, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-32 left-40 w-28 h-28 bg-gradient-to-tr from-info/20 to-primary/20 rounded-full blur-2xl"
        animate={{
          x: [0, 20, 0],
          y: [0, -15, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-40 w-20 h-20 bg-gradient-to-tl from-warning/20 to-success/20 rounded-full blur-2xl"
        animate={{
          x: [0, -15, 0],
          y: [0, 25, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Lignes de couleur animées */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.1 }}>
        <defs>
          <linearGradient id="colorGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-primary)" />
            <stop offset="50%" stopColor="var(--color-accent)" />
            <stop offset="100%" stopColor="var(--color-success)" />
          </linearGradient>
          <linearGradient id="colorGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-warning)" />
            <stop offset="50%" stopColor="var(--color-info)" />
            <stop offset="100%" stopColor="var(--color-primary)" />
          </linearGradient>
        </defs>
        
        <motion.path
          d="M 50 100 Q 200 50 350 100 T 650 100"
          stroke="url(#colorGradient1)"
          strokeWidth="3"
          fill="none"
          animate={{
            d: [
              "M 50 100 Q 200 50 350 100 T 650 100",
              "M 50 100 Q 200 150 350 100 T 650 100",
              "M 50 100 Q 200 50 350 100 T 650 100"
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.path
          d="M 100 300 Q 300 250 500 300 T 900 300"
          stroke="url(#colorGradient2)"
          strokeWidth="2"
          fill="none"
          animate={{
            d: [
              "M 100 300 Q 300 250 500 300 T 900 300",
              "M 100 300 Q 300 350 500 300 T 900 300",
              "M 100 300 Q 300 250 500 300 T 900 300"
            ]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>
      
      {/* Overlay de couleur subtil */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/2 via-accent/1 to-success/2" />
    </div>
  )
}
