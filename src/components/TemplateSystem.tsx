import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'
import { TemplateSelector } from './TemplateSelector'
import { CVGenerator } from './CVGenerator'
import { PhotoUpload } from './PhotoUpload'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'

interface StructuredResume {
  contact_info: {
    name: string
    email: string
    phone: string
    location: string
    photo?: string // Base64 encoded photo
  }
  summary: string
  experience: Array<{
    company: string
    title: string
    start_date: string
    end_date: string
    achievements: string[]
  }>
  education: Array<{
    degree: string
    institution: string
    start_date: string
    end_date: string
  }>
  skills: {
    programming_languages?: string[]
    tools?: string[]
    libraries?: string[]
    databases?: string[]
    cloud_platforms?: string[]
    methodologies?: string[]
    other?: string[]
  }
  certifications: Array<{
    name: string
    issuer: string
    date: string
  }>
  projects: Array<{
    name: string
    description: string
    technologies_used: string[]
    achievements: string[]
  }>
  achievements: string[]
}

interface Template {
  id: string
  name: string
  description: string
  category: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  features: string[]
  logo?: string
  isPopular?: boolean
}

interface TemplateSystemProps {
  structuredResume: StructuredResume
  onBack?: () => void
}

type Step = 'select' | 'photo' | 'generate'

export function TemplateSystem({ structuredResume, onBack }: TemplateSystemProps) {
  const [currentStep, setCurrentStep] = useState<Step>('select')
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null)
  const [photoBase64, setPhotoBase64] = useState<string | null>(null)

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template)
  }

  const handleNext = () => {
    if (selectedTemplate) {
      setCurrentStep('photo')
    }
  }

  const handlePhotoNext = () => {
    setCurrentStep('generate')
  }

  const handleBack = () => {
    if (currentStep === 'generate') {
      setCurrentStep('photo')
    } else if (currentStep === 'photo') {
      setCurrentStep('select')
    } else if (onBack) {
      onBack()
    }
  }

  const handlePhotoChange = (photo: File | null) => {
    setProfilePhoto(photo)
    if (photo) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhotoBase64(e.target?.result as string)
      }
      reader.readAsDataURL(photo)
    } else {
      setPhotoBase64(null)
    }
  }

  const steps = [
    { id: 'select', title: 'Select Template', completed: currentStep !== 'select' },
    { id: 'photo', title: 'Add Photo', completed: currentStep === 'generate' },
    { id: 'generate', title: 'Generate CV', completed: false }
  ]

  return (
    <div className="w-full min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-bounce"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-40">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>
        
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-white/60 dark:from-gray-900/80 dark:via-transparent dark:to-gray-900/60"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step.completed 
                      ? 'bg-primary text-white' 
                      : currentStep === step.id 
                        ? 'bg-primary/20 text-primary border-2 border-primary' 
                        : 'bg-neutral-border text-neutral-text-secondary'
                  }`}>
                    {step.completed ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    currentStep === step.id ? 'text-primary' : 'text-neutral-text-secondary'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    step.completed ? 'bg-primary' : 'bg-neutral-border'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {currentStep === 'select' && (
            <motion.div
              key="select"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <TemplateSelector
                onTemplateSelect={handleTemplateSelect}
                selectedTemplate={selectedTemplate}
              />
            </motion.div>
          )}

          {currentStep === 'photo' && selectedTemplate && (
            <motion.div
              key="photo"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-full max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-neutral-text mb-4">
                    Add Profile Photo
                  </h2>
                  <p className="text-neutral-text-secondary text-lg">
                    Upload a professional photo for your CV (optional)
                  </p>
                </div>
                <div className="flex justify-center">
                  <PhotoUpload
                    onPhotoChange={handlePhotoChange}
                    currentPhoto={profilePhoto}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 'generate' && selectedTemplate && (
            <motion.div
              key="generate"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CVGenerator
                structuredResume={{
                  ...structuredResume,
                  contact_info: {
                    ...structuredResume.contact_info,
                    photo: photoBase64 || undefined
                  }
                }}
                templateId={selectedTemplate.id}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            onClick={handleBack}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>

          {currentStep === 'select' && (
            <Button
              onClick={handleNext}
              disabled={!selectedTemplate}
              className="flex items-center space-x-2"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}

          {currentStep === 'photo' && (
            <Button
              onClick={handlePhotoNext}
              className="flex items-center space-x-2"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Selected Template Info */}
        {selectedTemplate && currentStep === 'select' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6"
          >
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-white border-2 border-primary/20 flex items-center justify-center">
                    {selectedTemplate.logo && (
                      <img 
                        src={selectedTemplate.logo} 
                        alt={`${selectedTemplate.name} logo`}
                        className="w-8 h-8 object-contain"
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-text">
                      {selectedTemplate.name} Selected
                    </h3>
                    <p className="text-sm text-neutral-text-secondary">
                      Ready to generate your professional CV
                    </p>
                  </div>
                  <Badge className="ml-auto bg-primary/10 text-primary border-primary/20">
                    {selectedTemplate.difficulty}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}

