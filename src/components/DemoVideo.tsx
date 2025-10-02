import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { FileText, Briefcase, Brain, Sparkles, Upload, CheckCircle } from "lucide-react"

export function DemoVideo() {
  const [currentStep, setCurrentStep] = useState(0)
  
  const steps = [
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Upload CV",
      description: "Drag & drop your resume",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: "Job Description",
      description: "Add the job posting",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI Analysis",
      description: "Smart compatibility check",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Optimized CV",
      description: "Download your result",
      color: "from-pink-500 to-pink-600"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length)
    }, 2000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full blur-xl" />
        <div className="absolute top-20 right-20 w-16 h-16 bg-purple-500 rounded-full blur-xl" />
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-green-500 rounded-full blur-xl" />
        <div className="absolute bottom-10 right-10 w-18 h-18 bg-pink-500 rounded-full blur-xl" />
      </div>

      {/* Header */}
      <div className="relative z-10 p-6 text-center">
        <motion.div
          className="flex items-center justify-center mb-4"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
            <Brain className="h-6 w-6 text-white" />
          </div>
        </motion.div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Resume Job Matcher</h2>
        <p className="text-sm text-gray-600">AI-Powered CV Optimization</p>
      </div>

      {/* Steps */}
      <div className="relative z-10 px-6 space-y-4">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className={`relative p-4 rounded-xl transition-all duration-500 ${
              currentStep === index 
                ? `bg-gradient-to-r ${step.color} text-white shadow-lg scale-105` 
                : 'bg-white/80 text-gray-600 shadow-sm'
            }`}
            animate={{
              y: currentStep === index ? [-2, 2, -2] : 0,
            }}
            transition={{
              duration: 1,
              repeat: currentStep === index ? Infinity : 0,
            }}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                currentStep === index 
                  ? 'bg-white/20' 
                  : 'bg-gray-100'
              }`}>
                {step.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">{step.title}</h3>
                <p className="text-xs opacity-80">{step.description}</p>
              </div>
              {currentStep > index && (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-white/20 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            animate={{
              width: `${((currentStep + 1) / steps.length) * 100}%`
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-xs text-gray-600 mt-2 text-center">
          Step {currentStep + 1} of {steps.length}
        </p>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 right-4 w-3 h-3 bg-blue-400 rounded-full"
        animate={{
          y: [0, -20, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 0,
        }}
      />
      <motion.div
        className="absolute top-1/3 left-4 w-2 h-2 bg-purple-400 rounded-full"
        animate={{
          y: [0, -15, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          delay: 0.5,
        }}
      />
    </div>
  )
}



