import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card"
import { Sparkles, Search, CheckCircle, Settings } from "lucide-react"

const steps = [
  {
    icon: Sparkles,
    title: "Analyze CV",
    description: "Our AI analyzes your CV to identify your skills, experiences and key achievements.",
    color: "text-primary"
  },
  {
    icon: Search,
    title: "Read job posting",
    description: "AI extracts requirements and keywords from the job posting to understand expectations.",
    color: "text-accent"
  },
  {
    icon: CheckCircle,
    title: "Generate adapted CV",
    description: "AI generates an optimized CV that highlights relevant skills for the position.",
    color: "text-success"
  }
]

export function HowItWorks() {
  return (
    <section data-section="how-it-works" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Effets de fond pour cette section - matching other sections */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 via-accent/3 to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-success/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/2 right-0 w-64 h-64 bg-warning/5 rounded-full blur-3xl" />
      
      {/* Additional floating elements for visual richness */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-primary/5 via-accent/5 to-success/5 rounded-full blur-3xl"></div>
      <div className="absolute top-10 right-20 w-24 h-24 bg-warning/8 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-20 w-28 h-28 bg-info/8 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-xl">
              <Settings className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-heading-1 font-optimized text-neutral-text-primary text-neutral-text-primary mb-6">
            How does it work?
          </h2>
          <p className="text-body-large font-optimized text-neutral-text-secondary text-neutral-text-secondary max-w-3xl mx-auto font-medium">
            In three simple steps, our AI transforms your CV to maximize your chances of being selected.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full text-center group hover:shadow-2xl transition-all duration-300 bg-white/10 bg-neutral-surface/10 backdrop-blur-xl border border-white/20 border-neutral-border/20 hover:border-primary/30 hover:bg-white/20 hover:bg-neutral-surface/20">
                <CardHeader className="pb-4">
                  <div className={`mx-auto mb-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-${step.color.replace('text-', '')}/10 to-${step.color.replace('text-', '')}/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className={`h-8 w-8 ${step.color}`} />
                  </div>
                  <div className="flex items-center justify-center mb-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent text-white text-sm font-bold mr-3">
                      {index + 1}
                    </span>
                    <CardTitle className="text-heading-3 font-optimized text-neutral-text-primary text-neutral-text-primary">{step.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed text-neutral-text-secondary text-neutral-text-secondary">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
