import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Particules flottantes
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
    }> = []

    // Créer des particules
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.1
      })
    }

    function animate() {
      if (!ctx || !canvas) return
      
      const context = ctx as CanvasRenderingContext2D
      const canvasElement = canvas as HTMLCanvasElement
      
      context.clearRect(0, 0, canvasElement.width, canvasElement.height)

      // Dessiner les particules
      particles.forEach(particle => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Rebondir aux bords
        if (particle.x < 0 || particle.x > canvasElement.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvasElement.height) particle.vy *= -1

        context.beginPath()
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        context.fillStyle = `rgba(147, 51, 234, ${particle.opacity})`
        context.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Canvas pour les particules */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Formes géométriques flottantes */}
      <div className="absolute inset-0">
                 {/* Cercle gradient en haut à gauche */}
         <motion.div
           className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
                 {/* Cercle gradient en bas à droite */}
         <motion.div
           className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-tl from-accent/20 to-primary/20 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
                 {/* Forme géométrique au centre */}
         <motion.div
           className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Lignes de connexion */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.1 }}>
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-primary)" />
              <stop offset="100%" stopColor="var(--color-accent)" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 100 200 Q 300 100 500 200 T 900 200"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            fill="none"
            animate={{
              d: [
                "M 100 200 Q 300 100 500 200 T 900 200",
                "M 100 200 Q 300 300 500 200 T 900 200",
                "M 100 200 Q 300 100 500 200 T 900 200"
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.path
            d="M 100 400 Q 400 300 700 400 T 1100 400"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            fill="none"
            animate={{
              d: [
                "M 100 400 Q 400 300 700 400 T 1100 400",
                "M 100 400 Q 400 500 700 400 T 1100 400",
                "M 100 400 Q 400 300 700 400 T 1100 400"
              ]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
        
        {/* Grille subtile */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(147,51,234,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>
      
      {/* Overlay de gradient radial */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-neutral-bg/50" />
    </div>
  )
}
