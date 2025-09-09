import { useEffect, useRef } from 'react'

export function InteractiveParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Particules interactives
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
    }> = []

    let mouseX = 0
    let mouseY = 0
    let isMouseMoving = false

    // Créer des particules
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1,
        color: Math.random() > 0.5 ? 'rgba(147, 51, 234, ' : 'rgba(34, 211, 238, '
      })
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Dessiner les particules
      particles.forEach(particle => {
        // Attraction vers la souris
        if (isMouseMoving) {
          const dx = mouseX - particle.x
          const dy = mouseY - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 100) {
            const force = (100 - distance) / 100
            particle.vx += dx * force * 0.001
            particle.vy += dy * force * 0.001
          }
        }

        // Mouvement naturel
        particle.x += particle.vx
        particle.y += particle.vy

        // Rebondir aux bords
        if (!canvas) return
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Limiter la vitesse
        particle.vx *= 0.99
        particle.vy *= 0.99

        // Dessiner la particule
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color + particle.opacity + ')'
        ctx.fill()

        // Effet de lueur
        ctx.shadowBlur = 10
        ctx.shadowColor = particle.color.replace('rgba(', '').replace(', ' + particle.opacity + ')', '')
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Dessiner les connexions entre particules proches
      particles.forEach((particle1, i) => {
        particles.slice(i + 1).forEach(particle2 => {
          const dx = particle1.x - particle2.x
          const dy = particle1.y - particle2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 80 && ctx) {
            ctx.beginPath()
            ctx.moveTo(particle1.x, particle1.y)
            ctx.lineTo(particle2.x, particle2.y)
            ctx.strokeStyle = `rgba(147, 51, 234, ${0.1 * (1 - distance / 80)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    // Gestionnaires d'événements
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      isMouseMoving = true
      
      setTimeout(() => {
        isMouseMoving = false
      }, 100)
    }

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  )
}
