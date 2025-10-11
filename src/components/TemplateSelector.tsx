import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { motion } from 'framer-motion'
import { Check, Star } from 'lucide-react'
import faangLogo from '../assets/faang.png'

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

interface TemplateSelectorProps {
  onTemplateSelect: (template: Template) => void
  selectedTemplate?: Template | null
}

const templates: Template[] = [
  {
    id: 'faang-path',
    name: 'FAANG Path',
    description: 'Professional template designed for top-tier tech companies. Clean, modern layout optimized for FAANG applications.',
    category: 'Tech',
    difficulty: 'Advanced',
    features: [
      'Clean professional design',
      'Skills categorization',
      'Project highlights',
      'Achievement metrics',
      'FAANG-optimized format'
    ],
    logo: faangLogo,
    isPopular: true
  }
]

export function TemplateSelector({ onTemplateSelect, selectedTemplate }: TemplateSelectorProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'Advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-neutral-text mb-4">
          Choose Your Template
        </h2>
        <p className="text-neutral-text-secondary text-lg">
          Select a professional template that matches your career goals
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {templates.map((template) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card 
              className={`relative cursor-pointer transition-all duration-300 hover:shadow-2xl backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg ${
                selectedTemplate?.id === template.id 
                  ? 'ring-2 ring-primary border-primary shadow-2xl bg-white/90 dark:bg-gray-800/90' 
                  : 'hover:shadow-xl hover:bg-white/90 dark:hover:bg-gray-800/90'
              }`}
              onClick={() => onTemplateSelect(template)}
            >
              {template.isPopular && (
                <div className="absolute -top-2 -right-2 z-10">
                  <Badge className="bg-gradient-to-r from-primary to-primary/80 text-white">
                    <Star className="w-3 h-3 mr-1" />
                    Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    {template.logo && (
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-white border-2 border-neutral-border flex items-center justify-center">
                        <img 
                          src={template.logo} 
                          alt={`${template.name} logo`}
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-xl text-neutral-text">
                        {template.name}
                      </CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {template.category}
                        </Badge>
                        <Badge className={`text-xs ${getDifficultyColor(template.difficulty)}`}>
                          {template.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {selectedTemplate?.id === template.id && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-neutral-text-secondary mb-4">
                  {template.description}
                </p>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-neutral-text text-sm">Key Features:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {template.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-neutral-text-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button 
                    variant={selectedTemplate?.id === template.id ? "default" : "outline"}
                    onClick={(e) => {
                      e.stopPropagation()
                      onTemplateSelect(template)
                    }}
                    className="min-w-[120px]"
                  >
                    {selectedTemplate?.id === template.id ? 'Selected' : 'Select Template'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

