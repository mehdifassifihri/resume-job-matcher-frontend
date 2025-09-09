import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { FileText, Briefcase, Upload, Sparkles, Brain } from "lucide-react"
import { simulateFileUpload } from "../lib/utils"

interface HeroUploadProps {
  onCVUpload: (content: string) => void
  onJobDescriptionUpload: (content: string) => void
  onAdaptCV: () => void
  isLoading: boolean
}

export function HeroUpload({ onCVUpload, onJobDescriptionUpload, onAdaptCV, isLoading }: HeroUploadProps) {
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [jdFile, setJdFile] = useState<File | null>(null)
  const [cvContent, setCvContent] = useState<string>("")
  const [jdContent, setJdContent] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)

  const handleFileUpload = useCallback(async (file: File, type: 'cv' | 'jd') => {
    if (!file) return

    const allowedTypes = ['.pdf', '.docx', '.doc']
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'))
    
    if (!allowedTypes.includes(fileExtension)) {
      alert('Unsupported file format. Please use PDF or DOCX.')
      return
    }

    setIsUploading(true)
    try {
      const content = await simulateFileUpload(file)
      if (type === 'cv') {
        setCvFile(file)
        setCvContent(content)
        onCVUpload(content)
      } else {
        setJdFile(file)
        setJdContent(content)
        onJobDescriptionUpload(content)
      }
    } catch (error) {
      console.error('Upload error:', error)
    } finally {
      setIsUploading(false)
    }
  }, [onCVUpload, onJobDescriptionUpload])

  const handleDrop = useCallback((e: React.DragEvent, type: 'cv' | 'jd') => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files[0], type)
    }
  }, [handleFileUpload])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  const canAdapt = cvContent && jdContent && !isLoading && !isUploading

  return (
    <section data-section="home" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Effets de fond pour cette section */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 via-accent/3 to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-success/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/2 right-0 w-64 h-64 bg-warning/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div 
              className="relative"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary to-accent flex items-center justify-center mr-4 shadow-xl pulse-glow">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <motion.div 
                className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full flex items-center justify-center"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="h-3 w-3 text-white" />
              </motion.div>
            </motion.div>
          </div>
          <h1 className="text-display font-optimized text-neutral-text-primary mb-6">
            Adapt your CV to job offers with AI
          </h1>
          <p className="text-body-large font-optimized text-neutral-text-secondary max-w-3xl mx-auto font-medium">
            Upload your CV and job description. Our AI will analyze compatibility and generate an optimized CV to maximize your chances.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-8 mb-12"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* CV Upload */}
          <Card className="relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-primary/20 transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mr-3">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-heading-3 font-optimized text-neutral-text-primary">Your CV</h3>
              </div>
              
              <div
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all backdrop-blur-sm ${
                  cvFile ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20' : 'border-gray-400/70 hover:border-primary/50 hover:bg-gray-50/50'
                }`}
                onDrop={(e) => handleDrop(e, 'cv')}
                onDragOver={handleDragOver}
              >
                {cvFile ? (
                  <div className="space-y-4">
                    <FileText className="h-12 w-12 text-primary mx-auto" />
                    <div>
                      <p className="text-neutral-text-primary font-medium">{cvFile.name}</p>
                      <p className="text-sm text-neutral-text-secondary">
                        {(cvFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-white/80 backdrop-blur-sm border border-gray-300 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                      onClick={() => {
                        setCvFile(null)
                        setCvContent("")
                        onCVUpload("")
                      }}
                    >
                      Change file
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-12 w-12 text-neutral-text-secondary mx-auto" />
                    <div>
                      <p className="text-neutral-text-primary font-medium mb-2">
                        Drag and drop your CV here
                      </p>
                      <p className="text-sm text-neutral-text-secondary mb-4">
                        or click to select a file
                      </p>
                      <p className="text-xs text-neutral-text-secondary">
                        Accepted formats: PDF, DOCX
                      </p>
                    </div>
                    <input
                      type="file"
                      accept=".pdf,.docx,.doc"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleFileUpload(file, 'cv')
                      }}
                      className="hidden"
                      id="cv-upload"
                    />
                    <label htmlFor="cv-upload">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-surface/80 backdrop-blur-sm border border-border hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 dark:bg-surface-alt/80 dark:border-border"
                        asChild
                      >
                        <span className="mt-4 cursor-pointer">Choose file</span>
                      </Button>
                    </label>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Job Description Upload */}
          <Card className="relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-accent/20 transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mr-3">
                  <Briefcase className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-heading-3 font-optimized text-neutral-text-primary">Job Description</h3>
              </div>
              
              <div
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all backdrop-blur-sm ${
                  jdFile ? 'border-accent bg-accent/10 shadow-lg shadow-accent/20' : 'border-gray-400/70 hover:border-accent/50 hover:bg-gray-50/50'
                }`}
                onDrop={(e) => handleDrop(e, 'jd')}
                onDragOver={handleDragOver}
              >
                {jdFile ? (
                  <div className="space-y-4">
                    <Briefcase className="h-12 w-12 text-accent mx-auto" />
                    <div>
                      <p className="text-neutral-text-primary font-medium">{jdFile.name}</p>
                      <p className="text-sm text-neutral-text-secondary">
                        {(jdFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-surface/80 backdrop-blur-sm border border-border hover:bg-accent/10 hover:border-accent/50 transition-all duration-300 dark:bg-surface-alt/80 dark:border-border"
                      onClick={() => {
                        setJdFile(null)
                        setJdContent("")
                        onJobDescriptionUpload("")
                      }}
                    >
                      Change file
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-12 w-12 text-neutral-text-secondary mx-auto" />
                    <div>
                      <p className="text-neutral-text-primary font-medium mb-2">
                        Drag and drop job description here
                      </p>
                      <p className="text-sm text-neutral-text-secondary mb-4">
                        or click to select a file
                      </p>
                      <p className="text-xs text-neutral-text-secondary">
                        Accepted formats: PDF, DOCX, TXT
                      </p>
                    </div>
                    <input
                      type="file"
                      accept=".pdf,.docx,.doc,.txt"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleFileUpload(file, 'jd')
                      }}
                      className="hidden"
                      id="jd-upload"
                    />
                    <label htmlFor="jd-upload">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-surface/80 backdrop-blur-sm border border-border hover:bg-accent/10 hover:border-accent/50 transition-all duration-300 dark:bg-surface-alt/80 dark:border-border"
                        asChild
                      >
                        <span className="mt-4 cursor-pointer">Choose file</span>
                      </Button>
                    </label>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          className="text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div
            whileHover={canAdapt ? { scale: 1.05 } : {}}
            whileTap={canAdapt ? { scale: 0.95 } : {}}
          >
            <Button 
              size="lg" 
              className="text-lg px-12 py-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-xl hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105"
              onClick={onAdaptCV}
              disabled={!canAdapt}
            >
              {isLoading || isUploading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Analysis in progress...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5" />
                  <span>Adapt CV</span>
                </div>
              )}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
