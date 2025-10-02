import { motion } from "framer-motion"
import { useState } from "react"
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Checkbox } from "./ui/checkbox"
import { Separator } from "./ui/separator"
import { 
  Link, 
  Shield, 
  Key, 
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  ExternalLink,
  Settings,
  Bot,
  Lock,
  Camera,
  User
} from "lucide-react"
// Import des logos depuis les assets
import indeedLogo from "../assets/indeed.png"
import linkedinLogo from "../assets/linkedin.png"
import { PhotoUpload } from "./PhotoUpload"

interface ConnectionsConsentProps {}

export function ConnectionsConsent(_props: ConnectionsConsentProps) {
  const [connections, setConnections] = useState({
    indeed: { enabled: false, method: 'api' as 'api' | 'browser', apiKey: '', status: 'disconnected' as 'connected' | 'testing' | 'disconnected' },
    welcometothejungle: { enabled: false, method: 'browser' as 'api' | 'browser', status: 'disconnected' as 'connected' | 'testing' | 'disconnected' },
    linkedin: { enabled: false, method: 'browser' as 'api' | 'browser', status: 'disconnected' as 'connected' | 'testing' | 'disconnected' },
    apec: { enabled: false, method: 'api' as 'api' | 'browser', apiKey: '', status: 'disconnected' as 'connected' | 'testing' | 'disconnected' }
  })

  const [consentGiven, setConsentGiven] = useState(false)
  const [showApiKeys, setShowApiKeys] = useState<Record<string, boolean>>({})
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null)

  const jobBoards = [
    {
      id: 'indeed',
      name: 'Indeed',
      description: 'Plateforme mondiale de recherche d\'emploi',
      methods: ['api', 'browser'],
      apiDoc: 'https://developer.indeed.com/'
    },
    {
      id: 'welcometothejungle',
      name: 'Welcome to the Jungle',
      description: 'Plateforme française spécialisée tech',
      icon: '🌿',
      methods: ['browser'],
      apiDoc: null
    },
    {
      id: 'linkedin',
      name: 'LinkedIn Easy Apply',
      description: 'Candidatures rapides LinkedIn',
      methods: ['browser'],
      apiDoc: null
    },
    {
      id: 'apec',
      name: 'APEC',
      description: 'Association pour l\'emploi des cadres',
      icon: '🎯',
      methods: ['api', 'browser'],
      apiDoc: 'https://www.apec.fr/'
    }
  ]

  const toggleConnection = (boardId: string) => {
    setConnections(prev => ({
      ...prev,
      [boardId]: {
        ...prev[boardId as keyof typeof prev],
        enabled: !prev[boardId as keyof typeof prev].enabled
      }
    }))
  }

  const setConnectionMethod = (boardId: string, method: 'api' | 'browser') => {
    setConnections(prev => ({
      ...prev,
      [boardId]: {
        ...prev[boardId as keyof typeof prev],
        method
      }
    }))
  }

  const setApiKey = (boardId: string, apiKey: string) => {
    setConnections(prev => ({
      ...prev,
      [boardId]: {
        ...prev[boardId as keyof typeof prev],
        apiKey
      }
    }))
  }

  const toggleApiKeyVisibility = (boardId: string) => {
    setShowApiKeys(prev => ({
      ...prev,
      [boardId]: !prev[boardId]
    }))
  }

  const testConnection = async (boardId: string) => {
    // Simulate connection test
    setConnections(prev => ({
      ...prev,
      [boardId]: {
        ...prev[boardId as keyof typeof prev],
        status: 'testing'
      }
    }))

    // Simulate API call
    setTimeout(() => {
      setConnections(prev => ({
        ...prev,
        [boardId]: {
          ...prev[boardId as keyof typeof prev],
          status: 'connected'
        }
      }))
    }, 2000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'testing':
        return <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      case 'disconnected':
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected':
        return 'Connecté'
      case 'testing':
        return 'Test en cours...'
      case 'disconnected':
        return 'Déconnecté'
      default:
        return 'Inconnu'
    }
  }

  return (
    <div className="space-y-8">
      {/* Modern Job Boards Configuration */}
      <div className="relative">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
            <Link className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Job Boards
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Activez/désactivez les sources d'emploi et configurez les connexions
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          {jobBoards.map((board, index) => {
            const connection = connections[board.id as keyof typeof connections]
            return (
              <motion.div
                key={board.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        {board.id === 'indeed' ? (
                          <img 
                            src={indeedLogo} 
                            alt={board.name}
                            className="w-10 h-10 object-contain"
                          />
                        ) : board.id === 'linkedin' ? (
                          <img 
                            src={linkedinLogo} 
                            alt={board.name}
                            className="w-10 h-10 object-contain"
                          />
                        ) : board.icon ? (
                          <span className="text-3xl">{board.icon}</span>
                        ) : null}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white">{board.name}</h4>
                        <p className="text-slate-600 dark:text-slate-400 text-lg">{board.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(connection.status)}
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          {getStatusText(connection.status)}
                        </span>
                      </div>
                      <Button
                        className={`${
                          connection.enabled 
                            ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg shadow-green-500/25" 
                            : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600"
                        } border-0 rounded-xl px-6 py-2 font-semibold transition-all duration-300`}
                        onClick={() => toggleConnection(board.id)}
                      >
                        {connection.enabled ? "Activé" : "Désactivé"}
                      </Button>
                    </div>
                  </div>

                {connection.enabled && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <Separator />
                    
                    {/* Method Selection */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Méthode d'envoi</Label>
                      <div className="flex gap-2">
                        {board.methods.map((method) => (
                          <Button
                            key={method}
                            variant={connection.method === method ? "default" : "outline"}
                            size="sm"
                            onClick={() => setConnectionMethod(board.id, method as 'api' | 'browser')}
                            className={`${
                              connection.method === method 
                                ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-blue-500/25" 
                                : "border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                            }`}
                          >
                            {method === 'api' ? (
                              <>
                                <Key className="w-4 h-4 mr-2" />
                                API Officielle
                              </>
                            ) : (
                              <>
                                <Bot className="w-4 h-4 mr-2" />
                                Navigateur Automatisé
                              </>
                            )}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* API Key Configuration */}
                    {connection.method === 'api' && (
                      <div className="space-y-3">
                        <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Clé API</Label>
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Input
                              type={showApiKeys[board.id] ? "text" : "password"}
                              placeholder="Entrez votre clé API"
                              value={'apiKey' in connection ? connection.apiKey : ''}
                              onChange={(e) => setApiKey(board.id, e.target.value)}
                              className="pr-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
                            />
                            <button
                              type="button"
                              onClick={() => toggleApiKeyVisibility(board.id)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                            >
                              {showApiKeys[board.id] ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => testConnection(board.id)}
                            disabled={!('apiKey' in connection ? connection.apiKey : '') || connection.status === 'testing'}
                            className="border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50"
                          >
                            {connection.status === 'testing' ? '⏳ Test...' : '🧪 Tester'}
                          </Button>
                        </div>
                        {board.apiDoc && (
                          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <ExternalLink className="w-4 h-4" />
                            <a
                              href={board.apiDoc}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                              📚 Documentation API
                            </a>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Browser Method Info */}
                    {connection.method === 'browser' && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                          <div>
                            <h5 className="font-medium text-blue-800 dark:text-blue-300 mb-1">
                              🤖 Navigateur Automatisé
                            </h5>
                            <p className="text-sm text-blue-700 dark:text-blue-400 mb-3">
                              Nous utiliserons Playwright côté serveur avec votre session stockée de manière chiffrée.
                              Vous devrez vous connecter une seule fois à chaque plateforme.
                            </p>
                            <Button
                              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg shadow-lg shadow-blue-600/25"
                              onClick={() => testConnection(board.id)}
                            >
                              🔗 Connecter mon compte {board.name}
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Account Connection Section */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800/30 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                            <span className="text-white text-sm">👤</span>
                          </div>
                          <div>
                            <h5 className="font-medium text-purple-800 dark:text-purple-300">
                              Compte {board.name}
                            </h5>
                            <p className="text-sm text-purple-600 dark:text-purple-400">
                              {connection.status === 'connected' ? '✅ Compte connecté' : '❌ Non connecté'}
                            </p>
                          </div>
                        </div>
                        <Button
                          className={`${
                            connection.status === 'connected' 
                              ? "bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/25" 
                              : "bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-600/25"
                          } text-sm px-4 py-2 rounded-lg`}
                          onClick={() => testConnection(board.id)}
                        >
                          {connection.status === 'connected' ? '✅ Connecté' : '🔗 Se connecter'}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
                </div>
              </motion.div>
            )
            })}
          </div>
        </div>

      {/* Profile Photo Section */}
      <div className="relative">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
            <Camera className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Profile Photo
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Add a professional photo to your CV for better job matching
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <PhotoUpload 
            onPhotoChange={setProfilePhoto}
            currentPhoto={profilePhoto}
            className="max-w-sm"
          />
        </div>
      </div>

      {/* Security & Consent */}
      <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              🔒 Sécurité & Consentement
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Vos données sont protégées et chiffrées
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Data Security Info */}
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
              <div>
                <h5 className="font-medium text-green-800 dark:text-green-300 mb-2">
                  Protection des données
                </h5>
                <ul className="text-sm text-green-700 dark:text-green-400 space-y-1">
                  <li>• Toutes les clés API sont chiffrées avec AES-256</li>
                  <li>• Les sessions de navigateur sont stockées de manière sécurisée</li>
                  <li>• Aucune donnée personnelle n'est partagée avec des tiers</li>
                  <li>• Conformité RGPD et standards de sécurité</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Consent Checkbox */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Checkbox
                id="consent"
                checked={consentGiven}
                onCheckedChange={(checked) => setConsentGiven(checked as boolean)}
                className="mt-1"
              />
              <div className="space-y-2">
                <Label htmlFor="consent" className="text-sm font-medium cursor-pointer text-slate-700 dark:text-slate-300">
                  🤖 Consentement explicite pour l'auto-apply
                </Label>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  J'autorise l'envoi automatique de candidatures selon mes filtres configurés.
                  Je comprends que le système appliquera uniquement aux offres correspondant à mes critères.
                </p>
              </div>
            </div>

            {consentGiven && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4"
              >
                <div className="flex items-center gap-2 text-blue-800 dark:text-blue-300">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    ✅ Consentement enregistré - Auto-apply activé
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </Card>

      {/* Save Configuration */}
      <div className="flex justify-end">
        <Button 
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-blue-500/25 disabled:opacity-50"
          disabled={!consentGiven}
        >
          <Settings className="w-4 h-4 mr-2" />
          💾 Sauvegarder la configuration
        </Button>
      </div>
    </div>
  )
}
