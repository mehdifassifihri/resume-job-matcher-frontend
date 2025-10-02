import { motion } from "framer-motion"
import { useState } from "react"
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { 
  Settings, 
  Filter, 
  Clock, 
  Target,
  ToggleLeft,
  ToggleRight,
  X
} from "lucide-react"

interface AutoApplyPreferencesProps {}

export function AutoApplyPreferences(_props: AutoApplyPreferencesProps) {
  const [isAutoApplyEnabled, setIsAutoApplyEnabled] = useState(false)
  const [preferences, setPreferences] = useState({
    // Job filters
    jobTitles: ['Software Engineer', 'Full Stack Developer', 'Frontend Developer'],
    locations: ['Remote', 'Paris', 'Lyon', 'Marseille'],
    techStacks: ['React', 'TypeScript', 'Node.js', 'Python', 'Java'],
    experienceLevel: 'Mid', // Junior, Mid, Senior
    
    // Limits
    maxApplicationsPerDay: 5,
    workingHours: { start: '09:00', end: '18:00' },
    activeDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    
    // Dry run mode
    dryRunMode: true
  })

  const [newJobTitle, setNewJobTitle] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const [newTechStack, setNewTechStack] = useState('')

  const addJobTitle = () => {
    if (newJobTitle.trim() && !preferences.jobTitles.includes(newJobTitle.trim())) {
      setPreferences(prev => ({
        ...prev,
        jobTitles: [...prev.jobTitles, newJobTitle.trim()]
      }))
      setNewJobTitle('')
    }
  }

  const removeJobTitle = (title: string) => {
    setPreferences(prev => ({
      ...prev,
      jobTitles: prev.jobTitles.filter(t => t !== title)
    }))
  }

  const addLocation = () => {
    if (newLocation.trim() && !preferences.locations.includes(newLocation.trim())) {
      setPreferences(prev => ({
        ...prev,
        locations: [...prev.locations, newLocation.trim()]
      }))
      setNewLocation('')
    }
  }

  const removeLocation = (location: string) => {
    setPreferences(prev => ({
      ...prev,
      locations: prev.locations.filter(l => l !== location)
    }))
  }

  const addTechStack = () => {
    if (newTechStack.trim() && !preferences.techStacks.includes(newTechStack.trim())) {
      setPreferences(prev => ({
        ...prev,
        techStacks: [...prev.techStacks, newTechStack.trim()]
      }))
      setNewTechStack('')
    }
  }

  const removeTechStack = (tech: string) => {
    setPreferences(prev => ({
      ...prev,
      techStacks: prev.techStacks.filter(t => t !== tech)
    }))
  }

  const toggleActiveDay = (day: string) => {
    setPreferences(prev => ({
      ...prev,
      activeDays: prev.activeDays.includes(day)
        ? prev.activeDays.filter(d => d !== day)
        : [...prev.activeDays, day]
    }))
  }

  // Composant pour les boîtes supprimables
  const RemovableBox = ({ item, onRemove }: { 
    item: string; 
    onRemove: (item: string) => void;
  }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02 }}
      className="
        inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
        bg-slate-100 dark:bg-slate-700
        border border-slate-200 dark:border-slate-600
        text-slate-700 dark:text-slate-300
        hover:bg-slate-200 dark:hover:bg-slate-600
        transition-all duration-200 shadow-sm hover:shadow-md
      "
    >
      <span className="truncate max-w-[200px]">{item}</span>
      <button
        onClick={() => onRemove(item)}
        className="
          flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center
          bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400
          hover:bg-red-200 dark:hover:bg-red-900/50 hover:text-red-700 dark:hover:text-red-300
          transition-colors duration-150
        "
      >
        <X className="w-3 h-3" />
      </button>
    </motion.div>
  )

  const daysOfWeek = [
    { key: 'monday', label: 'Lundi' },
    { key: 'tuesday', label: 'Mardi' },
    { key: 'wednesday', label: 'Mercredi' },
    { key: 'thursday', label: 'Jeudi' },
    { key: 'friday', label: 'Vendredi' },
    { key: 'saturday', label: 'Samedi' },
    { key: 'sunday', label: 'Dimanche' }
  ]

  return (
    <div className="space-y-6 pb-8">
      {/* Auto-Apply Toggle */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Settings className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-text-primary">
                Activer l'auto-apply
              </h3>
              <p className="text-sm text-neutral-text-secondary">
                Permettre au système d'appliquer automatiquement aux offres correspondantes
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={() => setIsAutoApplyEnabled(!isAutoApplyEnabled)}
            className="p-0"
          >
            {isAutoApplyEnabled ? (
              <ToggleRight className="w-12 h-6 text-primary" />
            ) : (
              <ToggleLeft className="w-12 h-6 text-neutral-text-secondary" />
            )}
          </Button>
        </div>
      </Card>

      {isAutoApplyEnabled && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Job Filters */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Filter className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-text-primary">
                  Filtres d'emploi
                </h3>
                <p className="text-sm text-neutral-text-secondary">
                  Définissez vos critères de recherche
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Job Titles */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Intitulés de poste
                </Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Ex: Software Engineer"
                    value={newJobTitle}
                    onChange={(e) => setNewJobTitle(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addJobTitle()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={addJobTitle} 
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                  >
                    Ajouter
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {preferences.jobTitles.map((title) => (
                    <RemovableBox
                      key={title}
                      item={title}
                      onRemove={removeJobTitle}
                    />
                  ))}
                </div>
              </div>

              {/* Locations */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Lieux / Remote
                </Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Ex: Remote, Paris"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addLocation()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={addLocation} 
                    size="sm"
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                  >
                    Ajouter
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {preferences.locations.map((location) => (
                    <RemovableBox
                      key={location}
                      item={location}
                      onRemove={removeLocation}
                    />
                  ))}
                </div>
              </div>

              {/* Tech Stacks */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Technologies
                </Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Ex: React, Python"
                    value={newTechStack}
                    onChange={(e) => setNewTechStack(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTechStack()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={addTechStack} 
                    size="sm"
                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white"
                  >
                    Ajouter
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {preferences.techStacks.map((tech) => (
                    <RemovableBox
                      key={tech}
                      item={tech}
                      onRemove={removeTechStack}
                    />
                  ))}
                </div>
              </div>

              {/* Experience Level */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Niveau d'expérience
                </Label>
                <div className="flex gap-2">
                  {['Junior', 'Mid', 'Senior'].map((level) => (
                    <Button
                      key={level}
                      variant={preferences.experienceLevel === level ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreferences(prev => ({
                        ...prev,
                        experienceLevel: level
                      }))}
                      className={
                        preferences.experienceLevel === level 
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0" 
                          : "border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                      }
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Limits & Schedule */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-text-primary">
                  Limites & Planning
                </h3>
                <p className="text-sm text-neutral-text-secondary">
                  Contrôlez la fréquence et les horaires d'application
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Max Applications per Day */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Max applications/jour</Label>
                <Input
                  type="number"
                  min="1"
                  max="20"
                  value={preferences.maxApplicationsPerDay}
                  onChange={(e) => setPreferences(prev => ({
                    ...prev,
                    maxApplicationsPerDay: parseInt(e.target.value) || 1
                  }))}
                  className="w-32"
                />
              </div>

              {/* Working Hours */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Créneau horaire</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="time"
                    value={preferences.workingHours.start}
                    onChange={(e) => setPreferences(prev => ({
                      ...prev,
                      workingHours: { ...prev.workingHours, start: e.target.value }
                    }))}
                    className="w-32"
                  />
                  <span className="text-neutral-text-secondary">-</span>
                  <Input
                    type="time"
                    value={preferences.workingHours.end}
                    onChange={(e) => setPreferences(prev => ({
                      ...prev,
                      workingHours: { ...prev.workingHours, end: e.target.value }
                    }))}
                    className="w-32"
                  />
                </div>
              </div>

              {/* Active Days */}
              <div className="space-y-3 md:col-span-2">
                <Label className="text-sm font-medium">Jours actifs</Label>
                <div className="flex flex-wrap gap-2">
                  {daysOfWeek.map((day) => (
                    <Button
                      key={day.key}
                      variant={preferences.activeDays.includes(day.key) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleActiveDay(day.key)}
                    >
                      {day.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Dry Run Mode */}
          <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">
                  Mode Dry-Run (Simulation)
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  Testez vos filtres sans risquer de vraies candidatures
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                  En mode simulation, vous recevrez un email de prévisualisation
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-400">
                  au lieu d'une vraie candidature pour ajuster vos filtres
                </p>
              </div>
              <Button
                variant={preferences.dryRunMode ? "default" : "outline"}
                onClick={() => setPreferences(prev => ({
                  ...prev,
                  dryRunMode: !prev.dryRunMode
                }))}
              >
                {preferences.dryRunMode ? "Activé" : "Désactivé"}
              </Button>
            </div>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
              Sauvegarder les préférences
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
