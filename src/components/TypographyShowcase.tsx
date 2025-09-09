import { motion } from 'framer-motion'

export function TypographyShowcase() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-surface-alt">
      <div className="container mx-auto max-w-4xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-heading-1 font-optimized text-neutral-text-primary mb-6">
            Typographie Poppins
          </h2>
          <p className="text-body-large font-optimized text-neutral-text-secondary max-w-2xl mx-auto">
            Une police moderne et lisible pour une expérience utilisateur optimale
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Display Text */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl"
          >
            <h3 className="text-caption text-neutral-text-secondary mb-2">Display Text</h3>
            <p className="text-display font-optimized text-neutral-text-primary">
              Titre principal
            </p>
          </motion.div>

          {/* Heading 1 */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl"
          >
            <h3 className="text-caption text-neutral-text-secondary mb-2">Heading 1</h3>
            <p className="text-heading-1 font-optimized text-neutral-text-primary">
              Titre de section
            </p>
          </motion.div>

          {/* Heading 2 */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl"
          >
            <h3 className="text-caption text-neutral-text-secondary mb-2">Heading 2</h3>
            <p className="text-heading-2 font-optimized text-neutral-text-primary">
              Sous-titre
            </p>
          </motion.div>

          {/* Body Large */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl"
          >
            <h3 className="text-caption text-neutral-text-secondary mb-2">Body Large</h3>
            <p className="text-body-large font-optimized text-neutral-text-primary">
              Texte de paragraphe principal avec une taille plus grande pour une meilleure lisibilité.
            </p>
          </motion.div>

          {/* Body */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl"
          >
            <h3 className="text-caption text-neutral-text-secondary mb-2">Body</h3>
            <p className="text-body font-optimized text-neutral-text-primary">
              Texte de paragraphe standard avec une taille normale pour le contenu principal.
            </p>
          </motion.div>

          {/* Caption */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl"
          >
            <h3 className="text-caption text-neutral-text-secondary mb-2">Caption</h3>
            <p className="text-caption font-optimized text-neutral-text-primary">
              TEXTE EN PETITES MAJUSCULES
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
