import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Upload, 
  Settings, 
  Linkedin, 
  FileText, 
  User,
  Trash2,
  CheckCircle,
  Link as LinkIcon,
  X,
  LayoutDashboard,
  Home,
  ArrowLeft
} from 'lucide-react'

interface UploadedFile {
  name: string
  date: string
  size: string
}

interface LinkedInAccount {
  username: string
  isConnected: boolean
}

export function SaaSDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'upload' | 'preferences' | 'linkedin'>('upload')
  const [onboardingComplete, setOnboardingComplete] = useState(false)
  const [, setCurrentStep] = useState(1)
  const [stepStatus, setStepStatus] = useState({
    step1: 'current', // completed, current, locked
    step2: 'locked',
    step3: 'locked'
  })
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>({
    name: 'my-resume.pdf',
    date: '2024-01-15',
    size: '2.4 MB'
  })
  const [linkedinAccount, setLinkedinAccount] = useState<LinkedInAccount>({
    username: 'john.doe',
    isConnected: true
  })
  const [preferences, setPreferences] = useState({
    targetPosition: 'Software Engineer',
    techStack: ['React', 'TypeScript', 'Node.js'],
    experienceLevel: 'Senior',
    autoApplyFrequency: '2x/week',
    enableAutoApply: true
  })

  const [selectedTechStack, setSelectedTechStack] = useState<string[]>(['React', 'TypeScript', 'Node.js'])

  const techStackSuggestions = [
    'React', 'Vue.js', 'Angular', 'Svelte', 'Next.js', 'Nuxt.js',
    'Node.js', 'Express', 'FastAPI', 'Django', 'Flask', 'Spring Boot',
    'TypeScript', 'JavaScript', 'Python', 'Java', 'C#', 'Go', 'Rust',
    'SQL', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch',
    'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform',
    'GraphQL', 'REST', 'WebSocket', 'gRPC', 'Tailwind CSS', 'Bootstrap'
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile({
        name: file.name,
        date: new Date().toISOString().split('T')[0],
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`
      })
    }
  }

  const handleDeleteFile = () => {
    setUploadedFile(null)
  }

  const handleLinkedinConnect = () => {
    setLinkedinAccount({
      username: 'john.doe',
      isConnected: true
    })
  }

  const handleLinkedinDisconnect = () => {
    setLinkedinAccount({
      username: '',
      isConnected: false
    })
  }

  const handlePreferencesChange = (field: string, value: string | boolean) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleTechStackToggle = (tech: string) => {
    setSelectedTechStack(prev => {
      const isSelected = prev.includes(tech)
      const newSelection = isSelected 
        ? prev.filter(item => item !== tech)
        : [...prev, tech]
      
      setPreferences(prevPrefs => ({
        ...prevPrefs,
        techStack: newSelection
      }))
      
      return newSelection
    })
  }


  const completeStep1 = () => {
    if (uploadedFile) {
      setStepStatus({
        step1: 'completed',
        step2: 'current',
        step3: 'locked'
      })
      setCurrentStep(2)
      setActiveTab('preferences')
    }
  }

  const completeStep2 = () => {
    setStepStatus({
      step1: 'completed',
      step2: 'completed',
      step3: 'current'
    })
    setCurrentStep(3)
    setActiveTab('linkedin')
  }

  const completeStep3 = () => {
    setOnboardingComplete(true)
  }

  const steps = [
    { id: 1, title: 'Upload CV', status: stepStatus.step1 },
    { id: 2, title: 'Preferences', status: stepStatus.step2 },
    { id: 3, title: 'LinkedIn', status: stepStatus.step3 }
  ]

  const sidebarItems = [
    {
      id: 'upload',
      label: 'Upload CV',
      icon: Upload
    },
    {
      id: 'preferences',
      label: 'Preferences',
      icon: Settings
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: Linkedin
    }
  ]

  // Auto Apply Dashboard final après onboarding
  if (onboardingComplete) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 relative overflow-hidden font-poppins">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 dark:bg-pink-800 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]"></div>

        <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
                    Dashboard
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400">Your auto-apply system is ready!</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/')}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-xl transition-all duration-300 font-medium"
                >
                  <Home className="w-4 h-4" />
                  Accueil
                </motion.button>
                <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-xl">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-700 dark:text-green-400 font-medium">Auto-Apply Active</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Hero Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-3xl border border-white/30 dark:border-slate-700/30 shadow-xl p-8 mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {preferences.targetPosition} | {preferences.autoApplyFrequency} | Stack {preferences.techStack.join(', ')}
                </h2>
                <p className="text-slate-600 dark:text-slate-400">Next auto-apply run: Tomorrow at 9:00 AM</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-600 dark:text-slate-400">Auto-Apply</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={preferences.enableAutoApply} className="sr-only peer" />
                  <div className="w-12 h-6 bg-slate-300 dark:bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-green-500 peer-checked:to-emerald-500"></div>
                </label>
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-3xl border border-white/30 dark:border-slate-700/30 shadow-xl p-8"
          >
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { company: "TechCorp", position: "Senior React Developer", score: 94, status: "Applied", date: "2 hours ago" },
                { company: "StartupXYZ", position: "Full Stack Engineer", score: 87, status: "Applied", date: "5 hours ago" },
                { company: "BigTech Inc", position: "Frontend Developer", score: 91, status: "Applied", date: "1 day ago" }
              ].map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-slate-50/50 dark:bg-slate-700/30 rounded-xl"
                >
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">{job.position} at {job.company}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{job.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Score: {job.score}%</span>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
                      {job.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 relative overflow-hidden font-poppins flex">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 dark:bg-pink-800 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]"></div>

      {/* Sidebar */}
      <motion.div 
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-80 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-xl border-r border-white/30 dark:border-slate-700/30 flex flex-col relative z-10"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/30 dark:border-slate-700/30">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
                Auto Apply 
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
              Dashboard
              </p>
            </div>
          </div>
          
          {/* Bouton Retour à l'accueil */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50 rounded-xl transition-all duration-300 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </motion.button>
        </div>
        
        
        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(item.id as 'upload' | 'preferences' | 'linkedin')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                </motion.li>
              )
            })}
          </ul>
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-8 relative z-10">
        <div className="max-w-4xl w-full mx-auto">
          {/* Stepper */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-8">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                        step.status === 'completed'
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                          : step.status === 'current'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {step.status === 'completed' ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : step.status === 'locked' ? (
                        <X className="w-5 h-5" />
                      ) : (
                        step.id
                      )}
                    </motion.div>
                    
                    {index < steps.length - 1 && (
                      <div className={`w-16 h-1 mx-4 rounded-full transition-all duration-300 ${
                        step.status === 'completed'
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                          : 'bg-slate-200 dark:bg-slate-700'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center mt-4">
              <div className="flex space-x-16">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className={`text-center ${
                      step.status === 'current' ? 'text-blue-600 dark:text-blue-400' : 
                      step.status === 'completed' ? 'text-green-600 dark:text-green-400' :
                      'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    <p className="text-sm font-medium">{step.title}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {/* Upload CV Tab */}
            {activeTab === 'upload' && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="flex items-center gap-4 mb-2"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                    <Upload className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
                      Upload CV
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">Upload your resume to get started with job matching</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-3xl border border-white/30 dark:border-slate-700/30 shadow-xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-slate-700/30 pointer-events-none"></div>
                  <div className="relative p-8">
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                      >
                        <FileText className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                      </motion.div>
                      
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Upload your CV</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-8">Drag and drop your CV file here, or click to browse</p>
                      
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl p-8 mb-6 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 bg-slate-50/50 dark:bg-slate-700/30"
                      >
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="cv-upload"
                        />
                        <label
                          htmlFor="cv-upload"
                          className="cursor-pointer flex flex-col items-center gap-3"
                        >
                          <Upload className="w-10 h-10 text-slate-400 dark:text-slate-500" />
                          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                            Choose file or drag and drop
                          </span>
                          <span className="text-xs text-slate-500 dark:text-slate-500">PDF, DOC, DOCX up to 10MB</span>
                        </label>
                      </motion.div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Upload CV
                      </motion.button>
                      
                      {uploadedFile && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={completeStep1}
                          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 mt-4"
                        >
                          Continue to Preferences →
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Latest Uploaded File */}
                {uploadedFile && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl border border-white/30 dark:border-slate-700/30 shadow-lg overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 pointer-events-none"></div>
                    <div className="relative p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl flex items-center justify-center shadow-lg">
                            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900 dark:text-white">{uploadedFile.name}</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Uploaded on {uploadedFile.date} • {uploadedFile.size}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                          >
                            Replace
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleDeleteFile}
                            className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <motion.div
                key="preferences"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="flex items-center gap-4 mb-2"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
                      Preferences
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">Configure your job search preferences</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-3xl border border-white/30 dark:border-slate-700/30 shadow-xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-slate-700/30 pointer-events-none"></div>
                  <div className="relative p-8">
                    <div className="space-y-6">
                      {/* Target Position */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                          Target Position
                        </label>
                        <input
                          type="text"
                          value={preferences.targetPosition}
                          onChange={(e) => handlePreferencesChange('targetPosition', e.target.value)}
                          className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 transition-all duration-300 backdrop-blur-sm"
                          placeholder="e.g. Software Engineer"
                        />
                      </motion.div>

                      {/* Tech Stack Selector */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                          Tech Stack
                        </label>
                        
                        {/* Selected Tech Stack */}
                        {selectedTechStack.length > 0 && (
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                              {selectedTechStack.map((tech) => (
                                <motion.div
                                  key={tech}
                                  initial={{ scale: 0.8, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0.8, opacity: 0 }}
                                  className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-medium rounded-full shadow-sm"
                                >
                                  <CheckCircle className="w-3 h-3" />
                                  {tech}
                                  <button
                                    onClick={() => handleTechStackToggle(tech)}
                                    className="ml-1 hover:bg-white/20 rounded-full p-0.5 transition-colors"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Tech Stack Suggestions */}
                        <div className="flex flex-wrap gap-2">
                          {techStackSuggestions.map((tech) => {
                            const isSelected = selectedTechStack.includes(tech)
                            return (
                              <motion.button
                                key={tech}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleTechStackToggle(tech)}
                                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-200 ${
                                  isSelected
                                    ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300'
                                    : 'bg-white/50 dark:bg-slate-700/50 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-blue-400 dark:hover:border-blue-500 hover:ring-1 hover:ring-blue-200 dark:hover:ring-blue-800'
                                }`}
                              >
                                {tech}
                              </motion.button>
                            )
                          })}
                        </div>
                        
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">Click to add/remove technologies</p>
                      </motion.div>

                      {/* Experience Level */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                      >
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                          Experience Level
                        </label>
                        <select
                          value={preferences.experienceLevel}
                          onChange={(e) => handlePreferencesChange('experienceLevel', e.target.value)}
                          className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 transition-all duration-300 backdrop-blur-sm"
                        >
                          <option value="Junior">Junior</option>
                          <option value="Mid">Mid</option>
                          <option value="Senior">Senior</option>
                        </select>
                      </motion.div>

                      {/* Auto-apply Frequency */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                      >
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                          Auto-apply Frequency
                        </label>
                        <select
                          value={preferences.autoApplyFrequency}
                          onChange={(e) => handlePreferencesChange('autoApplyFrequency', e.target.value)}
                          className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 transition-all duration-300 backdrop-blur-sm"
                        >
                          <option value="Once a week">Once a week</option>
                          <option value="2x/week">2x/week</option>
                          <option value="3x/week">3x/week</option>
                        </select>
                      </motion.div>

                      {/* Enable Auto-Apply Toggle */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200/30 dark:border-blue-700/30"
                      >
                        <div>
                          <h3 className="font-semibold text-slate-900 dark:text-white">Enable Auto-Apply</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Automatically apply to matching job opportunities</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={preferences.enableAutoApply}
                            onChange={(e) => handlePreferencesChange('enableAutoApply', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-12 h-6 bg-slate-300 dark:bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-500"></div>
                        </label>
                      </motion.div>

                      {/* Save Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="pt-4"
                      >
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={completeStep2}
                          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          Continue to LinkedIn →
                        </motion.button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* LinkedIn Tab */}
            {activeTab === 'linkedin' && (
              <motion.div
                key="linkedin"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="flex items-center gap-4 mb-2"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg">
                    <Linkedin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
                      LinkedIn
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">Connect your LinkedIn account for enhanced job matching</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-3xl border border-white/30 dark:border-slate-700/30 shadow-xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-slate-700/30 pointer-events-none"></div>
                  <div className="relative p-8">
                    {linkedinAccount.isConnected ? (
                      <div className="text-center">
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                          className="mx-auto w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                        >
                          <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                        </motion.div>
                        
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">LinkedIn Connected</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-8">
                          Connected as <span className="font-semibold text-blue-600 dark:text-blue-400">@{linkedinAccount.username}</span>
                        </p>
                        
                        <div className="flex gap-4 justify-center">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-700 dark:text-blue-300 rounded-xl hover:from-blue-100 hover:to-cyan-100 dark:hover:from-blue-900/50 dark:hover:to-cyan-900/50 transition-all duration-300 font-medium"
                          >
                            <User className="w-5 h-5" />
                            View Profile
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleLinkedinDisconnect}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/30 text-red-700 dark:text-red-300 rounded-xl hover:from-red-100 hover:to-pink-100 dark:hover:from-red-900/50 dark:hover:to-pink-900/50 transition-all duration-300 font-medium"
                          >
                            <X className="w-5 h-5" />
                            Disconnect
                          </motion.button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                          className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                        >
                          <Linkedin className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                        </motion.div>
                        
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Connect LinkedIn</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
                          Link your LinkedIn account to access more job opportunities and improve matching accuracy
                        </p>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleLinkedinConnect}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto font-semibold shadow-lg"
                        >
                          <LinkIcon className="w-5 h-5" />
                          Link LinkedIn Account
                        </motion.button>
                        
                        {linkedinAccount.isConnected && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={completeStep3}
                            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto font-semibold shadow-lg mt-4"
                          >
                            <CheckCircle className="w-5 h-5" />
                            Finish Setup →
                          </motion.button>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Benefits Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl border border-white/30 dark:border-slate-700/30 shadow-lg overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 pointer-events-none"></div>
                  <div className="relative p-6">
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-6 text-lg">Benefits of connecting LinkedIn:</h4>
                    <ul className="space-y-4">
                      {[
                        "Access to more job opportunities",
                        "Improved job matching accuracy", 
                        "Automatic application tracking",
                        "Network insights and recommendations"
                      ].map((benefit, index) => (
                        <motion.li
                          key={benefit}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                          className="flex items-center gap-4"
                        >
                          <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                          </div>
                          <span className="text-slate-700 dark:text-slate-300 font-medium">{benefit}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
