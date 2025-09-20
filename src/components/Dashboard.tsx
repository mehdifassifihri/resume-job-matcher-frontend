import { motion } from "framer-motion"
import { useState } from "react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { 
  FileText, 
  Settings, 
  Link,
  TrendingUp,
  Activity,
  Zap,
  LayoutDashboard
} from "lucide-react"
import { CVUploadBlock, AutoApplyPreferences, ConnectionsConsent } from "./index"
import { DashboardFooter } from "./DashboardFooter"

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<'cv' | 'preferences' | 'connections'>('cv')

  const tabs = [
    { id: 'cv', label: 'CV Actuel', icon: FileText, color: 'from-blue-500 to-cyan-500' },
    { id: 'preferences', label: 'Préférences', icon: Settings, color: 'from-purple-500 to-pink-500' },
    { id: 'connections', label: 'Connexions', icon: Link, color: 'from-green-500 to-emerald-500' }
  ]

  const stats = [
    { label: 'Applications envoyées', value: '24', change: '+12%', icon: TrendingUp, color: 'text-green-500' },
    { label: 'Taux de match', value: '94%', change: '+5%', icon: Activity, color: 'text-blue-500' },
    { label: 'Offres trouvées', value: '156', change: '+23%', icon: Zap, color: 'text-purple-500' }
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 relative overflow-hidden font-poppins">
      {/* Simple Background Pattern */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 dark:bg-pink-800 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]"></div>
      
      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        {/* Modern Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                  <LayoutDashboard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
                    Dashboard
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400 text-lg">
                    Gérez votre auto-apply intelligent
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-4 py-2 text-sm font-medium">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-2"></div>
                Système actif
              </Badge>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg">
                <Zap className="w-4 h-4 mr-2" />
                Mode Auto
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-white/30 dark:border-slate-700/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-slate-700/30"></div>
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                      {stat.change}
                    </span>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                      {stat.value}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Modern Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-2 border border-white/30 dark:border-slate-700/30 shadow-lg">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id as 'cv' | 'preferences' | 'connections')}
                  className={`flex-1 min-w-[200px] flex items-center justify-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? `bg-gradient-to-r ${tab.color} text-white shadow-lg shadow-${tab.color.split('-')[1]}-500/25`
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-semibold text-sm">{tab.label}</span>
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Content with Modern Card */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-3xl border border-white/30 dark:border-slate-700/30 shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-slate-700/30 pointer-events-none"></div>
            <div className="relative p-8">
              {activeTab === 'cv' && <CVUploadBlock />}
              {activeTab === 'preferences' && <AutoApplyPreferences />}
              {activeTab === 'connections' && <ConnectionsConsent />}
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Footer */}
      <DashboardFooter />
    </div>
  )
}
