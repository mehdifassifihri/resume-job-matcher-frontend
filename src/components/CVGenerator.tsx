import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { motion } from 'framer-motion'
import { Download, Eye, Copy, FileText } from 'lucide-react'
import { useToast } from './ui/use-toast'

interface StructuredResume {
  contact_info: {
    name: string
    email: string
    phone: string
    location: string
    photo?: string // Base64 encoded photo
  }
  summary: string
  experience: Array<{
    company: string
    title: string
    start_date: string
    end_date: string
    achievements: string[]
  }>
  education: Array<{
    degree: string
    institution: string
    start_date: string
    end_date: string
  }>
  skills: {
    technical: string[]
    soft: string[]
    languages: string[]
  }
  certifications: Array<{
    name: string
    issuer: string
    date: string
  }>
  projects: Array<{
    name: string
    description: string
    technologies_used: string[]
    achievements: string[]
  }>
  achievements: string[]
}

interface CVGeneratorProps {
  structuredResume: StructuredResume
  templateId: string
}

// Modern Professional Template HTML
const MODERN_PROFESSIONAL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{{NAME}} — CV</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@300;400;500;700;900&display=swap" rel="stylesheet">
  <style>
    :root{
      --cv-blue:#304263;
      --cv-blue-90:#3b4c72;
      --text:#111;
      --rule:#000;
      --link:#1a73e8;
      --page-margin: 0.4in;
      --name-size: 1.6rem;
      --body-size: 11pt;
      --tight: 1.25;
    }

    html,body{ height:100%; }
    body{
      margin:0;
      color:var(--text);
      font: 400 var(--body-size)/var(--tight) "Fira Sans", system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Arial, "Noto Sans", sans-serif;
      background:#fff;
    }

    .page{
      max-width: 1120px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 0.36fr 0.64fr;
      column-gap: 2.5em;
      padding: clamp(16px, 1.5vw, 24px);
    }

    .left{
      display:flex;
      flex-direction:column;
    }
    .left-top-band{ height:5mm; background:var(--cv-blue); }
    .left-box{
      background: linear-gradient(0deg, var(--cv-blue-90), var(--cv-blue-90));
      color:#fff;
      padding-left: 9%;
      padding-right: 9%;
      padding-top: 24px;
      padding-bottom: 28px;
      min-height: 293mm;
    }

    .name{
      font-size: clamp(1.2rem, 2.2vw, var(--name-size));
      text-transform: uppercase;
      letter-spacing: 0.06em;
      font-weight: 700;
      margin: 0 0 12px 0;
    }
    .name b{ font-weight:900; }

    .avatar-wrap{ display:flex; justify-content:center; margin:10px 0 12px; }
    .avatar{ width:65%; max-width: 220px; aspect-ratio:1/1; border-radius:50%; object-fit:cover; border:3px solid rgba(255,255,255,.35); background:#fff; }

    .h-left{
      margin-top: 18px;
      margin-bottom: 6px;
      font-weight:800;
      text-transform: uppercase;
      letter-spacing: .06em;
      font-size: .92rem;
      position: relative;
    }
    .h-left::after{
      content: "";
      display:block;
      height:2px;
      background:#fff;
      opacity:.85;
      margin-top:6px;
    }

    .left p{ margin: 8px 0; }

    .contact{
      font-size: .92rem;
      line-height: 1.35;
      word-break: break-word;
    }

    .list{
      margin: 6px 0 0;
      padding-left: 1.2em;
    }
    .list li{ margin: 3px 0; }

    a{ color: var(--link); text-decoration: none; }
    .left a{ color:#fff; text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 2px; }

    .right{ padding-top: 18px; }

    .h-right{
      color: var(--cv-blue);
      text-transform: uppercase;
      letter-spacing: .06em;
      font-weight: 800;
      font-size: 1.25rem;
      margin: 18px 0 8px;
      position: relative;
    }
    .h-right::after{
      content:"";
      display:block;
      height:2px; background: var(--cv-blue);
      opacity:.9; margin-top:4px;
    }

    .item{ margin-top: 10px; }
    .role-line{
      display:flex; align-items: baseline; gap: 8px; flex-wrap: wrap;
    }
    .role{
      font-variant-caps: small-caps;
      font-weight: 700;
    }
    .org{ font-style: italic; }
    .dates{ margin-left:auto; font-weight:700; white-space:nowrap; }

    .bullet-mini{ font-size:.96rem; margin-top: 4px; color:#222; }
    .diamond::before{ content:"◆\\00a0"; }

    .compact p{ margin: 6px 0; }

    @media print{
      @page{ size:A4; margin: var(--page-margin); }
      body{ -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .page{ padding:0; }
      a{ color:inherit; text-decoration: none; }
    }

    @media (max-width: 900px){
      .page{ grid-template-columns: 1fr; }
      .left-top-band{ display:none; }
      .left-box{ min-height:auto; border-radius: 12px; }
      .dates{ margin-left: 0; font-weight:600; }
    }
  </style>
</head>
<body>
  <main class="page">
    <section class="left">
      <div class="left-top-band"></div>
      <aside class="left-box">
        <h1 class="name">{{NAME}}</h1>
        <div class="avatar-wrap">
          {{PHOTO_PLACEHOLDER}}
        </div>

        <h2 class="h-left">Profile</h2>
        <p>{{SUMMARY}}</p>

        <h2 class="h-left">Contact details</h2>
        <div class="contact">
          <div>✉︎ <a href="mailto:{{EMAIL}}">{{EMAIL}}</a></div>
          <div>☎︎ {{PHONE}}</div>
          <div>🌐 <a href="{{WEBSITE}}" target="_blank" rel="noreferrer">{{WEBSITE}}</a></div>
          <div>📍 {{LOCATION}}</div>
        </div>

        <h2 class="h-left">Skills</h2>
        <ul class="list">
          {{SKILLS_ITEMS}}
        </ul>

        <h2 class="h-left">Languages</h2>
        <ul class="list">
          {{LANGUAGES_ITEMS}}
        </ul>
      </aside>
    </section>

    <section class="right">
      <h2 class="h-right">Experience</h2>
      {{EXPERIENCE_ITEMS}}

      <h2 class="h-right">Education</h2>
      {{EDUCATION_ITEMS}}

      <h2 class="h-right">Projects</h2>
      {{PROJECTS_ITEMS}}

      <h2 class="h-right">Certifications</h2>
      {{CERTIFICATIONS_ITEMS}}
    </section>
  </main>
</body>
</html>`

// FAANG Path Template HTML
const FAANG_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Resume</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    /* ========== Base & Variables ========== */
    :root{
      --page-margin: 0.4in;
      --rule-color: #000;
      --link-color: #1a73e8;
      --text-color: #111;
      --name-size: 1.6rem;
      --body-size: 11pt;
      --line-tight: 1.25;
      --diamond: "◆";
    }
    
    @media print {
      @page { margin: var(--page-margin); size: Letter; }
      a { color: var(--link-color) !important; text-decoration: none !important; }
    }
    
    html, body {
      background: #fff;
      color: var(--text-color);
      font: var(--body-size)/var(--line-tight) "Segoe UI", Roboto, "Helvetica Neue", Arial, system-ui, -apple-system, sans-serif;
      margin: 0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    
    .resume { margin: var(--page-margin); }
    
    /* ========== Header ========== */
    .name { 
      text-transform: uppercase; 
      font-weight: 800; 
      font-size: var(--name-size); 
      text-align: center; 
      margin: 0 0 .6rem 0; 
      letter-spacing: .02em; 
    }
    
    .addresses { 
      display: grid; 
      gap: .35rem; 
      justify-items: center; 
      margin-bottom: .6rem; 
    }
    
    .address-line { 
      display: inline-flex; 
      gap: .5rem; 
      flex-wrap: wrap; 
      align-items: center; 
      justify-content: center; 
      text-align: center; 
      font-size: .95em; 
      white-space: normal; 
    }
    
    .address-line .sep::before { 
      content: var(--diamond); 
      margin: 0 .35rem; 
      font-size: .8em; 
      position: relative; 
      top: -0.02em; 
    }
    
    /* ========== Sections ========== */
    .section { margin-top: .6rem; }
    .section-title { 
      text-transform: uppercase; 
      font-weight: 800; 
      margin: 0 0 .4rem 0; 
      letter-spacing: .04em; 
    }
    .section hr { 
      border: 0; 
      border-top: 1px solid var(--rule-color); 
      margin: 0 0 .4rem 0; 
    }
    .section-content { margin: 0; padding: 0; }
    
    /* ========== Experience block ========== */
    .item { margin-bottom: .6rem; }
    .item-header { 
      display: flex; 
      justify-content: space-between; 
      font-weight: 700; 
    }
    .item-subheader { 
      display: flex; 
      justify-content: space-between; 
      font-style: italic; 
      margin-top: .15rem; 
    }
    .bullets { 
      list-style-type: none; 
      padding: 0; 
      margin: .2rem 0 0 0; 
    }
    .bullets li { 
      position: relative; 
      padding-left: 1em; 
      margin: .15rem 0; 
    }
    .bullets li::before { 
      content: "•"; 
      position: absolute; 
      left: 0; 
      line-height: 1; 
    }
    
    /* ========== Skills table ========== */
    .skills { 
      display: grid; 
      grid-template-columns: max-content 1fr; 
      column-gap: 2.5rem; 
      row-gap: .25rem; 
      font-size: .98em; 
    }
    .skills dt { font-weight: 800; }
    .skills dd { margin: 0; }
    
    /* ========== Typography & Links ========== */
    p { margin: 0 0 .35rem 0; }
    a { color: var(--link-color); text-decoration: none; }
    a:hover { text-decoration: underline; }
    
    /* ========== Print tweaks ========== */
    @media print { .resume { margin: 0; } }
  </style>
</head>
<body>
  <main class="resume" role="main">
    <!-- Header -->
    <h1 class="name">{{NAME}}</h1>
    <div class="addresses">
      <div class="address-line">
        <span>{{PHONE}}</span>
        <span class="sep"></span>
        <span>{{LOCATION}}</span>
      </div>
      <div class="address-line">
        <a href="mailto:{{EMAIL}}">{{EMAIL}}</a>
        <span class="sep"></span>
        <a href="{{LINKEDIN}}">{{LINKEDIN}}</a>
        <span class="sep"></span>
        <a href="{{WEBSITE}}">{{WEBSITE}}</a>
      </div>
    </div>
    
    <!-- Summary -->
    <section class="section" aria-label="Summary">
      <h2 class="section-title">Summary</h2>
      <hr />
      <div class="section-content">
        <p>{{SUMMARY}}</p>
      </div>
    </section>
    
    <!-- Education -->
    <section class="section" aria-label="Education">
      <h2 class="section-title">Education</h2>
      <hr />
      <div class="section-content">
        {{EDUCATION_ITEMS}}
      </div>
    </section>
    
    <!-- Skills -->
    <section class="section" aria-label="Skills">
      <h2 class="section-title">Skills</h2>
      <hr />
      <div class="section-content">
        <dl class="skills">
          {{SKILLS_ITEMS}}
        </dl>
      </div>
    </section>
    
    <!-- Experience -->
    <section class="section" aria-label="Experience">
      <h2 class="section-title">Experience</h2>
      <hr />
      <div class="section-content">
        {{EXPERIENCE_ITEMS}}
      </div>
    </section>
    
    <!-- Projects -->
    <section class="section" aria-label="Projects">
      <h2 class="section-title">Projects</h2>
      <hr />
      <div class="section-content">
        <ul class="bullets">
          {{PROJECTS_ITEMS}}
        </ul>
      </div>
    </section>
    
    <!-- Certifications -->
    <section class="section" aria-label="Certifications">
      <h2 class="section-title">Certifications</h2>
      <hr />
      <div class="section-content">
        <ul class="bullets">
          {{CERTIFICATIONS_ITEMS}}
        </ul>
      </div>
    </section>
  </main>
</body>
</html>`

export function CVGenerator({ structuredResume, templateId }: CVGeneratorProps) {
  const [showPreview, setShowPreview] = useState(false)
  const { toast } = useToast()

  const generatedCV = useMemo(() => {
    let cv = ''
    
    if (templateId === 'faang-path') {
      cv = FAANG_TEMPLATE
    } else if (templateId === 'modern-professional') {
      cv = MODERN_PROFESSIONAL_TEMPLATE
    } else {
      return ''
    }

    // Replace basic placeholders
    cv = cv.replace(/{{NAME}}/g, structuredResume.contact_info.name || '')
    cv = cv.replace(/{{EMAIL}}/g, structuredResume.contact_info.email || '')
    cv = cv.replace(/{{PHONE}}/g, structuredResume.contact_info.phone || '')
    cv = cv.replace(/{{LOCATION}}/g, structuredResume.contact_info.location || '')
    cv = cv.replace(/{{LINKEDIN}}/g, 'LinkedIn Profile')
    cv = cv.replace(/{{WEBSITE}}/g, 'Portfolio Website')
    cv = cv.replace(/{{SUMMARY}}/g, structuredResume.summary || '')
    
    // Generate Photo Placeholder
    const photoPlaceholder = structuredResume.contact_info.photo 
      ? `<img class="avatar" src="${structuredResume.contact_info.photo}" alt="Profile photo" />`
      : `<div class="avatar"></div>`
    cv = cv.replace(/{{PHOTO_PLACEHOLDER}}/g, photoPlaceholder)

    // Generate Education Items (different format for each template)
    if (templateId === 'faang-path') {
      const educationItems = structuredResume.education.map(edu => 
        `<div class="item">
          <div class="item-header">${edu.degree}</div>
          <div class="item-subheader">${edu.institution} • ${edu.start_date} - ${edu.end_date}</div>
        </div>`
      ).join('')
      cv = cv.replace(/{{EDUCATION_ITEMS}}/g, educationItems)
    } else if (templateId === 'modern-professional') {
      const educationItems = structuredResume.education.map(edu => 
        `<article class="item">
          <div class="role-line">
            <span class="role">${edu.degree}</span>
            <span class="org">— <i>${edu.institution}</i>.</span>
            <span class="dates">${edu.start_date}–${edu.end_date}</span>
          </div>
        </article>`
      ).join('')
      cv = cv.replace(/{{EDUCATION_ITEMS}}/g, educationItems)
    }

    // Generate Skills Items (different format for each template)
    if (templateId === 'faang-path') {
      const skillsItems = [
        ...(structuredResume.skills.technical.length > 0 ? [`<dt>Technical:</dt><dd>${structuredResume.skills.technical.join(', ')}</dd>`] : []),
        ...(structuredResume.skills.soft.length > 0 ? [`<dt>Soft Skills:</dt><dd>${structuredResume.skills.soft.join(', ')}</dd>`] : []),
        ...(structuredResume.skills.languages.length > 0 ? [`<dt>Languages:</dt><dd>${structuredResume.skills.languages.join(', ')}</dd>`] : [])
      ].join('')
      cv = cv.replace(/{{SKILLS_ITEMS}}/g, skillsItems)
    } else if (templateId === 'modern-professional') {
      // For Modern Professional, combine technical and soft skills
      const allSkills = [...structuredResume.skills.technical, ...structuredResume.skills.soft]
      const skillsItems = allSkills.map(skill => `<li>${skill}</li>`).join('')
      cv = cv.replace(/{{SKILLS_ITEMS}}/g, skillsItems)
      
      // Generate Languages Items for Modern Professional
      const languagesItems = structuredResume.skills.languages.map(lang => `<li>${lang}</li>`).join('')
      cv = cv.replace(/{{LANGUAGES_ITEMS}}/g, languagesItems)
    }

    // Generate Experience Items (different format for each template)
    if (templateId === 'faang-path') {
      const experienceItems = structuredResume.experience.map(exp => 
        `<div class="item">
          <div class="item-header">${exp.title}</div>
          <div class="item-subheader">${exp.company} • ${exp.start_date} - ${exp.end_date}</div>
          <ul class="bullets">
            ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
          </ul>
        </div>`
      ).join('')
      cv = cv.replace(/{{EXPERIENCE_ITEMS}}/g, experienceItems)
    } else if (templateId === 'modern-professional') {
      const experienceItems = structuredResume.experience.map(exp => 
        `<article class="item">
          <div class="role-line">
            <span class="role">${exp.title}</span>
            <span class="org">at <i>${exp.company}</i>.</span>
            <span class="dates">${exp.start_date}–${exp.end_date}</span>
          </div>
          ${exp.achievements.map(achievement => `<p class="bullet-mini diamond">${achievement}</p>`).join('')}
        </article>`
      ).join('')
      cv = cv.replace(/{{EXPERIENCE_ITEMS}}/g, experienceItems)
    }

    // Generate Projects Items (different format for each template)
    if (templateId === 'faang-path') {
      const projectsItems = structuredResume.projects.map(project => 
        `<li><strong>${project.name}:</strong> ${project.description} <em>(${project.technologies_used.join(', ')})</em></li>`
      ).join('')
      cv = cv.replace(/{{PROJECTS_ITEMS}}/g, projectsItems)
    } else if (templateId === 'modern-professional') {
      const projectsItems = structuredResume.projects.map(project => 
        `<article class="item">
          <div class="role-line">
            <span class="role">${project.name}</span>
            <span class="org">— <i>${project.technologies_used.join(', ')}</i></span>
          </div>
          <p class="bullet-mini diamond">${project.description}</p>
        </article>`
      ).join('')
      cv = cv.replace(/{{PROJECTS_ITEMS}}/g, projectsItems)
    }

    // Generate Certifications Items (different format for each template)
    if (templateId === 'faang-path') {
      const certificationsItems = structuredResume.certifications.map(cert => 
        `<li><strong>${cert.name}</strong>${cert.issuer !== 'Unknown' ? ` - ${cert.issuer}` : ''}</li>`
      ).join('')
      cv = cv.replace(/{{CERTIFICATIONS_ITEMS}}/g, certificationsItems)
    } else if (templateId === 'modern-professional') {
      const certificationsItems = structuredResume.certifications.map(cert => 
        `<article class="item">
          <div class="role-line">
            <span class="role">${cert.name}</span>
            <span class="org">— <i>${cert.issuer !== 'Unknown' ? cert.issuer : 'Certification'}</i></span>
            <span class="dates">${cert.date !== 'Unknown' ? cert.date : ''}</span>
          </div>
        </article>`
      ).join('')
      cv = cv.replace(/{{CERTIFICATIONS_ITEMS}}/g, certificationsItems)
    }

    return cv
  }, [structuredResume, templateId])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedCV)
      toast({
        title: "CV copied!",
        description: "The generated CV has been copied to your clipboard.",
        variant: "default"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to copy the CV. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleDownloadPDF = async () => {
    try {
      // Create a new window with the CV content
      const printWindow = window.open('', '_blank')
      if (!printWindow) {
        throw new Error('Unable to open print window')
      }
      
      printWindow.document.write(generatedCV)
      printWindow.document.close()
      
      // Wait for content to load
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Trigger print dialog
      printWindow.print()
      
      // Close the window after printing
      setTimeout(() => {
        printWindow.close()
      }, 1000)
      
      toast({
        title: "PDF download started",
        description: "Your CV is being prepared for PDF download.",
        variant: "default"
      })
    } catch (error) {
      console.error('PDF generation error:', error)
      toast({
        title: "Error",
        description: "Unable to generate PDF. Please try again.",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-neutral-text">
                CV Generator
              </CardTitle>
              <p className="text-neutral-text-secondary mt-2">
                Generate your professional CV using the {templateId === 'faang-path' ? 'FAANG Path' : 'Modern Professional'} template
              </p>
            </div>
            <Badge variant="outline" className="text-sm">
              <FileText className="w-4 h-4 mr-1" />
              {templateId === 'faang-path' ? 'FAANG Path Template' : 'Modern Professional Template'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={() => setShowPreview(!showPreview)}
              variant={showPreview ? "default" : "outline"}
              className="flex items-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>{showPreview ? 'Hide Preview' : 'Show Preview'}</span>
            </Button>
            
            <Button 
              onClick={handleCopy}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Copy className="w-4 h-4" />
              <span>Copy HTML</span>
            </Button>
            
            <Button 
              onClick={handleDownloadPDF}
              className="flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {showPreview && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-neutral-text">
                CV Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <iframe
                  srcDoc={generatedCV}
                  className="w-full h-[800px] border-0"
                  title="CV Preview"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

