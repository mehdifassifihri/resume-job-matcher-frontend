import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, ArrowRight, Github, Chrome, CheckCircle, Zap, Loader2 } from 'lucide-react'
import { BackgroundEffects } from './BackgroundEffects'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Checkbox } from './ui/checkbox'
// Simple password strength hook
const usePasswordStrength = (password: string) => {
  const [showStrength, setShowStrength] = useState(false)
  
  const strength = Math.min(100, password.length * 10)
  const color = strength < 30 ? 'text-red-500' : strength < 60 ? 'text-yellow-500' : 'text-green-500'
  const text = strength < 30 ? 'Weak' : strength < 60 ? 'Medium' : 'Strong'
  
  return { strength, color, text, showStrength, setShowStrength }
}

// Simple validation functions
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return {
    isValid: emailRegex.test(email),
    message: emailRegex.test(email) ? '' : 'Please enter a valid email address'
  }
}

const validatePassword = (password: string) => {
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' }
  }
  return { isValid: true, message: '' }
}

export function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const passwordStrength = usePasswordStrength(password)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate inputs
    const emailValidation = validateEmail(email)
    const passwordValidation = isLogin ? { isValid: true, message: '' } : validatePassword(password)
    
    if (!emailValidation.isValid || !passwordValidation.isValid) {
      setErrors({
        email: emailValidation.message,
        password: passwordValidation.message
      })
      return
    }
    
    setErrors({})
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onLogin()
    }, 1500)
  }

  const handleSocialLogin = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      onLogin()
    }, 1000)
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-neutral-bg">
      <BackgroundEffects />
      
      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-tl from-accent/20 to-primary/20 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-success/20 to-emerald/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-md px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo and branding */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <motion.div
            className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-xl"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Zap className="text-2xl text-white drop-shadow-lg" />
          </motion.div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            AI Job Matcher
          </h1>
          <p className="text-neutral-text-secondary mt-2">Resume optimization</p>
          <Badge variant="secondary" className="mt-3 bg-primary/10 text-primary border-primary/20">
            <Chrome className="w-3 h-3 mr-1" />
            Beta
          </Badge>
        </motion.div>

        {/* Login/Register Card */}
        <motion.div variants={cardVariants}>
          <Card className="backdrop-blur-xl bg-neutral-surface/95 border-neutral-border/50 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-semibold text-neutral-text-primary">
                {isLogin ? 'Welcome back' : 'Create account'}
              </CardTitle>
              <CardDescription className="text-neutral-text-secondary">
                {isLogin 
                  ? 'Sign in to your account to continue' 
                  : 'Join thousands of job seekers optimizing their resumes'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Social Login */}
              <motion.div variants={itemVariants}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    variant="outline" 
                    className="w-full h-12 bg-neutral-surface/60 backdrop-blur-sm border-neutral-border hover:bg-neutral-surface/80 transition-all duration-200 text-neutral-text-primary"
                    onClick={handleSocialLogin}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    ) : (
                      <Github className="w-5 h-5 mr-2" />
                    )}
                    Continue with GitHub
                  </Button>
                </motion.div>
              </motion.div>


              {/* Form */}
              <motion.form onSubmit={handleSubmit} className="space-y-4" variants={itemVariants}>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-neutral-text-primary text-neutral-text-primary">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-text-secondary text-neutral-text-secondary w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`pl-10 h-12 bg-neutral-surface/60 backdrop-blur-sm border-neutral-border focus:border-primary focus:ring-primary transition-all duration-200 text-neutral-text-primary placeholder-neutral-text-secondary ${
                        errors.email ? 'border-red-500' : ''
                      }`}
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-neutral-text-primary text-neutral-text-primary">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-text-secondary text-neutral-text-secondary w-4 h-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => !isLogin && passwordStrength.setShowStrength(true)}
                      onBlur={() => !isLogin && passwordStrength.setShowStrength(false)}
                      className={`pl-10 pr-10 h-12 bg-neutral-surface/60 backdrop-blur-sm border-neutral-border focus:border-primary focus:ring-primary transition-all duration-200 text-neutral-text-primary placeholder-neutral-text-secondary ${
                        errors.password ? 'border-red-500' : ''
                      }`}
                      required
                    />
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                    )}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-text-secondary text-neutral-text-secondary hover:text-neutral-text-primary hover:text-neutral-text-primary transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  
                  {/* Password strength indicator */}
                  {!isLogin && passwordStrength.showStrength && password && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-text-secondary text-neutral-text-secondary">Password strength:</span>
                        <span className={`font-medium ${passwordStrength.color.replace('bg-', 'text-')}`}>
                          {passwordStrength.text}
                        </span>
                      </div>
                      <Progress value={passwordStrength.strength} className="h-1" />
                      <div className="flex items-center space-x-2 text-xs text-neutral-text-secondary text-neutral-text-secondary">
                        {password.length >= 8 && <CheckCircle className="w-3 h-3 text-success" />}
                        {/[a-z]/.test(password) && <CheckCircle className="w-3 h-3 text-success" />}
                        {/[A-Z]/.test(password) && <CheckCircle className="w-3 h-3 text-success" />}
                        {/[0-9!@#$%^&*]/.test(password) && <CheckCircle className="w-3 h-3 text-success" />}
                        <span>8+ chars, lowercase, uppercase, number/symbol</span>
                      </div>
                    </motion.div>
                  )}
                </div>

                {isLogin && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                                             <Checkbox 
                         id="remember" 
                         checked={rememberMe}
                         onCheckedChange={(checked: boolean | 'indeterminate') => setRememberMe(checked === true)}
                       />
                      <Label htmlFor="remember" className="text-sm text-neutral-text-secondary text-neutral-text-secondary">
                        Remember me
                      </Label>
                    </div>
                    <button type="button" className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
                      Forgot password?
                    </button>
                  </div>
                )}

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={isLoading || (!isLogin && passwordStrength.strength < 50)}
                    className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        {isLogin ? 'Sign in' : 'Create account'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </motion.form>

              {/* Toggle login/register */}
              <motion.div className="text-center" variants={itemVariants}>
                <p className="text-sm text-neutral-text-secondary text-neutral-text-secondary">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin)
                      setEmail('')
                      setPassword('')
                      // Password strength will be reset automatically by the hook
                    }}
                    className="ml-1 text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features preview */}
        <motion.div className="mt-8 text-center space-y-4" variants={itemVariants}>
          <div className="grid grid-cols-3 gap-4 text-xs text-neutral-text-secondary text-neutral-text-secondary">
            <motion.div 
              className="bg-neutral-surface/40 backdrop-blur-sm rounded-lg p-3 cursor-pointer border border-neutral-border/20"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-2 shadow-lg" />
              <p>Analysis</p>
            </motion.div>
            <motion.div 
              className="bg-neutral-surface/40 backdrop-blur-sm rounded-lg p-3 cursor-pointer border border-neutral-border/20"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-6 h-6 bg-gradient-to-br from-accent to-primary rounded-full mx-auto mb-2 shadow-lg" />
              <p>Smart Matching</p>
            </motion.div>
            <motion.div 
              className="bg-neutral-surface/40 backdrop-blur-sm rounded-lg p-3 cursor-pointer border border-neutral-border/20"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-6 h-6 bg-gradient-to-br from-success to-emerald rounded-full mx-auto mb-2 shadow-lg" />
              <p>Real-time</p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
