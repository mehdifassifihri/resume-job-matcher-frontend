import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Progress } from "./ui/progress"
import { Badge } from "./ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Copy, Download, FileText, TrendingUp, Target, Lightbulb, BarChart3 } from "lucide-react"
import { copyToClipboard, downloadMock, formatPercentage } from "../lib/utils"
import { useToast } from "./ui/use-toast"

interface ResultPanelProps {
  score: number
  coverage: number
  recommendations: string[]
  adaptedCV: string
  isVisible: boolean
}

export function ResultPanel({ score, coverage, recommendations, adaptedCV, isVisible }: ResultPanelProps) {
  const { toast } = useToast()
  const [isDownloadDialogOpen, setIsDownloadDialogOpen] = useState(false)
  const [downloadType, setDownloadType] = useState<'docx' | 'pdf'>('docx')

  const handleCopy = async () => {
    const success = await copyToClipboard(adaptedCV)
    if (success) {
      toast({
        title: "CV copied!",
        description: "The adapted CV has been copied to your clipboard.",
        variant: "success"
      })
    } else {
      toast({
        title: "Error",
        description: "Unable to copy the CV. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleDownload = (type: 'docx' | 'pdf') => {
    setDownloadType(type)
    setIsDownloadDialogOpen(true)
  }

  const confirmDownload = () => {
    const filename = `CV_Adapte.${downloadType}`
    downloadMock(filename, adaptedCV, downloadType)
    toast({
      title: "Download in progress",
      description: `The file ${filename} will be downloaded.`,
      variant: "default"
    })
    setIsDownloadDialogOpen(false)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success"
    if (score >= 60) return "text-warning"
    return "text-danger"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Good"
    return "Needs improvement"
  }

  if (!isVisible) return null

  return (
    <motion.section 
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div 
              className="w-20 h-20 rounded-3xl bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-2xl"
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
              <BarChart3 className="h-10 w-10 text-white" />
            </motion.div>
          </div>
          <h2 className="text-heading-1 font-poppins font-bold text-neutral-text-primary text-neutral-text-primary mb-6 bg-gradient-to-r from-neutral-text-primary to-neutral-text-secondary bg-clip-text text-transparent">
            Analysis Results
          </h2>
          <p className="text-body-large font-poppins text-neutral-text-secondary text-neutral-text-secondary max-w-2xl mx-auto">
            Here is your comprehensive match score and personalized recommendations to optimize your CV for maximum impact.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Score d'adéquation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="relative overflow-hidden bg-gradient-to-br from-neutral-surface/80 to-neutral-surface/40 backdrop-blur-xl border-0 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
              <CardHeader className="relative z-10">
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="w-12 h-12 rounded-2xl bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <TrendingUp className="h-6 w-6 text-white" />
                  </motion.div>
                  <CardTitle className="text-heading-3 font-poppins font-semibold text-neutral-text-primary text-neutral-text-primary">Match Score</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-8 relative z-10">
                <div className="text-center">
                  <div className="relative inline-block">
                    <motion.svg 
                      className="w-40 h-40 transform -rotate-90"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                    >
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="transparent"
                        className="text-neutral-border/30"
                      />
                      <motion.circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 70}`}
                        strokeDashoffset={`${2 * Math.PI * 70 * (1 - score / 100)}`}
                        className={`${getScoreColor(score)} transition-all duration-2000 ease-out`}
                        strokeLinecap="round"
                        initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 70 * (1 - score / 100) }}
                        transition={{ delay: 0.8, duration: 2, ease: "easeOut" }}
                      />
                    </motion.svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div 
                        className="text-center"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.6 }}
                      >
                        <div className={`text-heading-1 font-poppins font-bold ${getScoreColor(score)}`}>
                          {score}%
                        </div>
                        <div className="text-body font-poppins text-neutral-text-secondary text-neutral-text-secondary">
                          {getScoreLabel(score)}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-body font-poppins">
                    <span className="text-neutral-text-secondary text-neutral-text-secondary">Overall match</span>
                    <span className="text-neutral-text-primary text-neutral-text-primary font-semibold">{score}%</span>
                  </div>
                  <div className="relative">
                    <Progress value={score} className="h-3 bg-neutral-border/20" />
                    <motion.div 
                      className="absolute top-0 left-0 h-3 bg-gradient-to-r from-primary to-accent rounded-full"
                      style={{ width: `${score}%` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Must-have coverage */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="relative overflow-hidden bg-gradient-to-br from-neutral-surface/80 to-neutral-surface/40 backdrop-blur-xl border-0 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5" />
              <CardHeader className="relative z-10">
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="w-12 h-12 rounded-2xl bg-gradient-to-r from-accent to-primary flex items-center justify-center shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Target className="h-6 w-6 text-white" />
                  </motion.div>
                  <CardTitle className="text-heading-3 font-poppins font-semibold text-neutral-text-primary text-neutral-text-primary">Must-have coverage</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-8 relative z-10">
                <div className="space-y-4">
                  <div className="flex justify-between text-body font-poppins">
                    <span className="text-neutral-text-secondary text-neutral-text-secondary">Required skills covered</span>
                    <span className="text-neutral-text-primary text-neutral-text-primary font-semibold">{formatPercentage(coverage)}</span>
                  </div>
                  <div className="relative">
                    <Progress value={coverage} className="h-3 bg-neutral-border/20" />
                    <motion.div 
                      className="absolute top-0 left-0 h-3 bg-gradient-to-r from-accent to-primary rounded-full"
                      style={{ width: `${coverage}%` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${coverage}%` }}
                      transition={{ delay: 1.8, duration: 1.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-body font-poppins font-semibold text-neutral-text-primary text-neutral-text-primary">Matched skills:</h4>
                  <div className="flex flex-wrap gap-3">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 2.0, duration: 0.3 }}
                    >
                      <Badge variant="success" className="px-3 py-1 text-sm font-medium">React</Badge>
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 2.1, duration: 0.3 }}
                    >
                      <Badge variant="success" className="px-3 py-1 text-sm font-medium">Node.js</Badge>
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 2.2, duration: 0.3 }}
                    >
                      <Badge variant="success" className="px-3 py-1 text-sm font-medium">TypeScript</Badge>
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 2.3, duration: 0.3 }}
                    >
                      <Badge variant="success" className="px-3 py-1 text-sm font-medium">PostgreSQL</Badge>
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 2.4, duration: 0.3 }}
                    >
                      <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">Docker</Badge>
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 2.5, duration: 0.3 }}
                    >
                      <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">AWS</Badge>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recommandations */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-white/80 to-white/40 from-neutral-surface/80 to-neutral-surface/40 backdrop-blur-xl border-0 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-warning/5 to-accent/5" />
            <CardHeader className="relative z-10">
              <div className="flex items-center space-x-3">
                <motion.div 
                  className="w-12 h-12 rounded-2xl bg-gradient-to-r from-warning to-accent flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Lightbulb className="h-6 w-6 text-white" />
                </motion.div>
                <CardTitle className="text-heading-3 font-poppins font-semibold text-neutral-text-primary text-neutral-text-primary">Gaps & Recommendations</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="space-y-6">
                {recommendations.map((recommendation, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start space-x-4 p-6 rounded-2xl bg-gradient-to-r from-neutral-surface-alt/60 to-neutral-surface-alt/40 backdrop-blur-sm border border-neutral-border/50 shadow-lg hover:shadow-xl transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <motion.div 
                      className="w-3 h-3 rounded-full bg-gradient-to-r from-warning to-accent mt-2 flex-shrink-0 shadow-lg"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                    />
                    <p className="text-body font-poppins text-neutral-text-secondary text-neutral-text-secondary leading-relaxed">
                      {recommendation}
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CV adapté preview */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-white/80 to-white/40 from-neutral-surface/80 to-neutral-surface/40 backdrop-blur-xl border-0 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-primary/5" />
            <CardHeader className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="w-12 h-12 rounded-2xl bg-gradient-to-r from-success to-primary flex items-center justify-center shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <FileText className="h-6 w-6 text-white" />
                  </motion.div>
                  <CardTitle className="text-heading-3 font-poppins font-semibold text-neutral-text-primary text-neutral-text-primary">Adapted CV</CardTitle>
                </div>
                <div className="flex space-x-3">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="outline" size="sm" onClick={handleCopy} className="bg-neutral-surface/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 hover:bg-primary/5">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </motion.div>
                  <Dialog open={isDownloadDialogOpen} onOpenChange={setIsDownloadDialogOpen}>
                    <DialogTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button variant="outline" size="sm" onClick={() => handleDownload('docx')} className="bg-neutral-surface/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 hover:bg-primary/5">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </motion.div>
                    </DialogTrigger>
                    <DialogContent className="bg-neutral-surface/95 backdrop-blur-xl border-0 shadow-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-heading-3 font-poppins font-semibold text-neutral-text-primary text-neutral-text-primary">Download adapted CV</DialogTitle>
                        <DialogDescription className="text-body font-poppins text-neutral-text-secondary text-neutral-text-secondary">
                          Choose your preferred download format.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex space-x-3">
                        <Button 
                          variant={downloadType === 'docx' ? 'default' : 'outline'}
                          onClick={() => setDownloadType('docx')}
                          className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                        >
                          DOCX
                        </Button>
                        <Button 
                          variant={downloadType === 'pdf' ? 'default' : 'outline'}
                          onClick={() => setDownloadType('pdf')}
                          className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                        >
                          PDF
                        </Button>
                      </div>
                      <DialogFooter>
                        <Button onClick={confirmDownload} className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                          Download
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="max-h-96 overflow-y-auto p-6 bg-gradient-to-br from-neutral-surface-alt/60 to-neutral-surface-alt/40 backdrop-blur-sm rounded-2xl border border-neutral-border/50 shadow-lg">
                <pre className="whitespace-pre-wrap text-body font-poppins text-neutral-text-secondary text-neutral-text-secondary leading-relaxed">
                  {adaptedCV}
                </pre>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  )
}
