import { useState, useRef } from "react"
import { Button } from "./ui/button"
import { FileText, Upload } from "lucide-react"

interface CVUploadBlockProps {}

export function CVUploadBlock(_props: CVUploadBlockProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ['.pdf', '.docx', '.doc', '.txt']
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'))
    
    if (!allowedTypes.includes(fileExtension)) {
      alert('Format de fichier non supporté. Veuillez utiliser PDF, DOCX ou TXT.')
      return
    }

    setUploadedFile(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      const input = fileInputRef.current
      if (input) {
        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(file)
        input.files = dataTransfer.files
        handleFileUpload({ target: { files: [file] } } as any)
      }
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  return (
    <div className="space-y-6">
      {/* Header with title on left */}
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">CV Management</h3>
          <p className="text-slate-600 dark:text-slate-400">
            Upload and manage your CV for automatic job matching
          </p>
        </div>
      </div>

      {/* Upload Area - Simple with logos in middle */}
      <div
        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all backdrop-blur-sm ${
          uploadedFile ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20' : 'border-gray-400/70 hover:border-primary/50 hover:bg-gray-50/50'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.doc,.txt"
          onChange={handleFileUpload}
          className="hidden"
        />
        
        {uploadedFile ? (
          <div className="space-y-4">
            <FileText className="h-12 w-12 text-primary mx-auto" />
            <div>
              <p className="text-neutral-text-primary font-medium">{uploadedFile.name}</p>
              <p className="text-sm text-neutral-text-secondary">
                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-white/80 backdrop-blur-sm border border-gray-300 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
              onClick={(e) => {
                e.stopPropagation()
                setUploadedFile(null)
              }}
            >
              Change file
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Upload className="h-12 w-12 text-gray-400 mx-auto" />
            <div>
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Glissez-déposez votre CV ici
              </h4>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                ou cliquez pour parcourir vos fichiers
              </p>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <Upload className="w-4 h-4 mr-2" />
                Choisir un fichier
              </Button>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Formats supportés: PDF, DOCX, TXT
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
