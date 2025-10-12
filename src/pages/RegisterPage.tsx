import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { motion } from 'framer-motion'
import { UserPlus, Mail, Lock, User, AlertCircle, Sparkles, User2, Eye, EyeOff, ArrowRight, CheckCircle2, XCircle } from 'lucide-react'
import { ThemeToggle } from '../components/ui/theme-toggle'

export function RegisterPage() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{
    email?: string
    username?: string
    password?: string
  }>({})

  const { register, isAuthenticated, isLoading: authLoading } = useAuth()
  const navigate = useNavigate()

  // Password strength calculation
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { strength: 0, label: '', color: '' }
    let strength = 0
    if (pwd.length >= 6) strength++
    if (pwd.length >= 8) strength++
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++
    if (/[0-9]/.test(pwd)) strength++
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++
    
    if (strength <= 2) return { strength, label: 'Weak', color: 'bg-red-500' }
    if (strength <= 3) return { strength, label: 'Fair', color: 'bg-yellow-500' }
    if (strength <= 4) return { strength, label: 'Good', color: 'bg-blue-500' }
    return { strength, label: 'Strong', color: 'bg-green-500' }
  }

  const passwordStrength = getPasswordStrength(password)

  // Redirect if user is already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, authLoading, navigate])

  const validateForm = () => {
    const newErrors: {
      email?: string
      username?: string
      password?: string
    } = {}

    // Email validation
    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid'
    }

    // Username validation
    if (!username) {
      newErrors.username = 'Username is required'
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores'
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      await register(email, username, password, fullName || undefined)
      navigate('/')
    } catch (err: any) {
      // Handle specific error messages from the API
      const errorMessage = err.message || 'Registration failed'
      if (errorMessage.includes('Email already registered')) {
        setError('This email is already registered. Please try logging in or use a different email.')
      } else if (errorMessage.includes('Username already taken')) {
        setError('This username is already taken. Please choose a different username.')
      } else {
        setError(errorMessage)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 relative overflow-hidden flex items-center justify-center p-4 font-poppins">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-pink-200 dark:bg-pink-800 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]"></div>

      {/* Theme Toggle - Top Right */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 mb-6 shadow-2xl shadow-blue-500/30"
            whileHover={{ scale: 1.05, rotate: 5 }}
            animate={{ 
              boxShadow: [
                "0 20px 25px -5px rgba(59, 130, 246, 0.3)",
                "0 20px 25px -5px rgba(168, 85, 247, 0.3)",
                "0 20px 25px -5px rgba(59, 130, 246, 0.3)"
              ]
            }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 10,
              boxShadow: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h1 
            className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent mb-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Create Account
          </motion.h1>
          <motion.p 
            className="text-slate-600 dark:text-slate-400 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join us to start matching your resume with jobs
          </motion.p>
        </div>

        {/* Register Form Card */}
        <motion.div
          className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 dark:border-slate-700/30 p-8 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ 
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            y: -2
          }}
        >
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>
          <form onSubmit={handleRegister} className="space-y-5">
            {/* Global Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start space-x-3"
              >
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
              </motion.div>
            )}

            {/* Email Field */}
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 font-semibold text-sm">
                Email Address *
              </Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setErrors({ ...errors, email: undefined })
                  }}
                  placeholder="you@example.com"
                  className={`pl-10 py-6 bg-white/50 dark:bg-slate-700/50 border-2 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-blue-500/20 ${
                    errors.email 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-slate-200 dark:border-slate-600 focus:border-blue-500'
                  }`}
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <motion.p 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.email}
                </motion.p>
              )}
            </motion.div>

            {/* Username Field */}
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              <Label htmlFor="username" className="text-slate-700 dark:text-slate-300 font-semibold text-sm">
                Username *
              </Label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                    setErrors({ ...errors, username: undefined })
                  }}
                  placeholder="johndoe"
                  className={`pl-10 py-6 bg-white/50 dark:bg-slate-700/50 border-2 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-blue-500/20 ${
                    errors.username 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-slate-200 dark:border-slate-600 focus:border-blue-500'
                  }`}
                  disabled={isLoading}
                />
              </div>
              {errors.username && (
                <motion.p 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.username}
                </motion.p>
              )}
            </motion.div>

            {/* Full Name Field (Optional) */}
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Label htmlFor="fullName" className="text-slate-700 dark:text-slate-300 font-semibold text-sm">
                Full Name <span className="text-slate-400 text-xs font-normal">(Optional)</span>
              </Label>
              <div className="relative group">
                <User2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="pl-10 py-6 bg-white/50 dark:bg-slate-700/50 border-2 border-slate-200 dark:border-slate-600 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  disabled={isLoading}
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.45 }}
            >
              <Label htmlFor="password" className="text-slate-700 dark:text-slate-300 font-semibold text-sm">
                Password *
              </Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setErrors({ ...errors, password: undefined })
                  }}
                  placeholder="••••••••"
                  className={`pl-10 pr-10 py-6 bg-white/50 dark:bg-slate-700/50 border-2 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-blue-500/20 ${
                    errors.password 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-slate-200 dark:border-slate-600 focus:border-blue-500'
                  }`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {password && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${passwordStrength.color} transition-all duration-300`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                      />
                    </div>
                    <span className={`text-xs font-medium ${
                      passwordStrength.strength <= 2 ? 'text-red-600 dark:text-red-400' :
                      passwordStrength.strength <= 3 ? 'text-yellow-600 dark:text-yellow-400' :
                      passwordStrength.strength <= 4 ? 'text-blue-600 dark:text-blue-400' :
                      'text-green-600 dark:text-green-400'
                    }`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className={`flex items-center gap-1 ${password.length >= 8 ? 'text-green-600 dark:text-green-400' : 'text-slate-400'}`}>
                      {password.length >= 8 ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      8+ characters
                    </div>
                    <div className={`flex items-center gap-1 ${/[A-Z]/.test(password) && /[a-z]/.test(password) ? 'text-green-600 dark:text-green-400' : 'text-slate-400'}`}>
                      {/[A-Z]/.test(password) && /[a-z]/.test(password) ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      Upper & lowercase
                    </div>
                    <div className={`flex items-center gap-1 ${/[0-9]/.test(password) ? 'text-green-600 dark:text-green-400' : 'text-slate-400'}`}>
                      {/[0-9]/.test(password) ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      Number
                    </div>
                    <div className={`flex items-center gap-1 ${/[^a-zA-Z0-9]/.test(password) ? 'text-green-600 dark:text-green-400' : 'text-slate-400'}`}>
                      {/[^a-zA-Z0-9]/.test(password) ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      Special char
                    </div>
                  </div>
                </motion.div>
              )}
              
              {errors.password && (
                <motion.p 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.password}
                </motion.p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="pt-2"
            >
              <Button
                type="submit"
                disabled={isLoading}
                className="relative w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating account...
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5 mr-2" />
                      Create Account
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </motion.div>
          </form>

          {/* Divider */}
          <motion.div 
            className="relative my-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-300 dark:border-slate-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/90 dark:bg-slate-800/90 text-slate-500 dark:text-slate-400 font-medium">
                Already have an account?
              </span>
            </div>
          </motion.div>

          {/* Login Link */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            <Link to="/login">
              <Button
                variant="outline"
                className="w-full border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-semibold py-6 rounded-xl transition-all duration-300 group"
              >
                <span className="flex items-center justify-center">
                  Sign In
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
          </motion.div>

          {/* Back to Home */}
          <motion.div 
            className="text-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          >
            <Link
              to="/"
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium inline-flex items-center gap-2 hover:gap-3 transition-all"
            >
              ← Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

