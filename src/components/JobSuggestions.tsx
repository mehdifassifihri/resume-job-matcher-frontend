import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { MapPin, Building, Briefcase, Zap } from "lucide-react"
import { useToast } from "./ui/use-toast"
import { mockJobSuggestions } from "../lib/mock"

export function JobSuggestions() {
  const { toast } = useToast()

  const handlePrepareApplication = (jobTitle: string, company: string) => {
    toast({
      title: "Feature coming soon",
      description: `Application preparation for ${jobTitle} at ${company} will be available soon!`,
      variant: "default"
    })
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-surface-alt">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-xl">
              <Briefcase className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-heading-1 font-poppins-bold text-neutral-text-primary mb-6">
            Job suggestions
          </h2>
          <p className="text-xl text-neutral-text-secondary max-w-3xl mx-auto font-poppins-medium">
            Discover job offers that match your profile and your adapted CV.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockJobSuggestions.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Building className="h-5 w-5 text-neutral-text-secondary" />
                      <span className="text-sm text-neutral-text-secondary font-poppins">{job.company}</span>
                    </div>
                    <Badge 
                      variant={job.fit === 'Fit' ? 'success' : 'warning'}
                      className="text-xs font-poppins-medium"
                    >
                      {job.fit}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight mb-2 font-poppins-semibold">
                    {job.title}
                  </CardTitle>
                  <div className="flex items-center space-x-2 text-sm text-neutral-text-secondary font-poppins">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                    {job.isRemote && (
                      <>
                        <span>•</span>
                        <span>Remote</span>
                      </>
                    )}
                  </div>
                  {job.salary && (
                    <div className="flex items-center space-x-2 text-sm text-neutral-text-secondary font-poppins">
                      <Briefcase className="h-4 w-4" />
                      <span>{job.salary}</span>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-neutral-text-secondary leading-relaxed font-poppins">
                    {job.description}
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-poppins-semibold text-neutral-text-primary">Tech stack:</h4>
                    <div className="flex flex-wrap gap-1">
                      {job.stack.map((tech, techIndex) => (
                        <Badge 
                          key={techIndex} 
                          variant="secondary" 
                          className="text-xs font-poppins-medium"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      className="w-full mt-4 font-poppins-medium"
                      onClick={() => handlePrepareApplication(job.title, job.company)}
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      Prepare application
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-neutral-text-secondary font-poppins-medium">
            These suggestions are based on your CV and similar job offers.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
