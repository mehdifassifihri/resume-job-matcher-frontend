import React, { useState, useRef } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Upload, Camera, X, User } from 'lucide-react'
import { useToast } from './ui/use-toast'

interface PhotoUploadProps {
  onPhotoChange: (photo: File | null) => void
  currentPhoto?: File | null
  className?: string
}

export function PhotoUpload({ onPhotoChange, currentPhoto, className = "" }: PhotoUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileSelect = (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (JPG, PNG, etc.)",
        variant: "destructive"
      })
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive"
      })
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    onPhotoChange(file)
    
    toast({
      title: "Photo uploaded",
      description: "Your profile photo has been added to the CV",
      variant: "default"
    })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const removePhoto = () => {
    setPreview(null)
    onPhotoChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    
    toast({
      title: "Photo removed",
      description: "Profile photo has been removed from the CV",
      variant: "default"
    })
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <Card className={`w-full max-w-md ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Camera className="w-5 h-5 text-primary" />
          <span>Profile Photo</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`
            relative border-2 border-dashed rounded-lg p-6 text-center transition-colors
            ${isDragOver 
              ? 'border-primary bg-primary/5' 
              : 'border-neutral-border hover:border-primary/50'
            }
            ${preview ? 'border-solid' : ''}
          `}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Profile preview"
                className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-white shadow-lg"
              />
              <Button
                size="sm"
                variant="destructive"
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
                onClick={removePhoto}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-24 h-24 mx-auto rounded-full bg-neutral-surface-alt flex items-center justify-center">
                <User className="w-12 h-12 text-neutral-text-secondary" />
              </div>
              <div>
                <p className="text-sm text-neutral-text-secondary mb-2">
                  Drag & drop a photo here, or click to select
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={openFileDialog}
                  className="flex items-center space-x-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Choose Photo</span>
                </Button>
              </div>
            </div>
          )}
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
          />
        </div>
        
        <div className="mt-4 text-xs text-neutral-text-secondary">
          <p>• Supported formats: JPG, PNG, GIF</p>
          <p>• Maximum size: 5MB</p>
          <p>• Recommended: Square image, 400x400px</p>
        </div>
      </CardContent>
    </Card>
  )
}
