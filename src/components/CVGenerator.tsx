import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { motion } from 'framer-motion'
import { Download, Eye, FileDown } from 'lucide-react'
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
    programming_languages?: string[]
    tools?: string[]
    libraries?: string[]
    databases?: string[]
    cloud_platforms?: string[]
    methodologies?: string[]
    other?: string[]
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
  awards?: string[]
  publications?: Array<{
    title: string
    journal?: string
    venue?: string
  }>
  volunteer_work?: Array<{
    organization?: string
    title?: string
    description?: string
    role?: string
  }>
  interests?: string[]
  references?: Array<{
    name: string
    position: string
    company: string
    contact: string
  }>
  languages?: Array<{
    name: string
    proficiency?: string
    level?: string
  }>
  additional_sections?: Record<string, any[]>
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

      <h2 class="h-right">Achievements</h2>
      {{ACHIEVEMENTS_ITEMS}}

      <h2 class="h-right">Awards</h2>
      {{AWARDS_ITEMS}}

      <h2 class="h-right">Publications</h2>
      {{PUBLICATIONS_ITEMS}}

      <h2 class="h-right">Volunteer Work</h2>
      {{VOLUNTEER_WORK_ITEMS}}

      <h2 class="h-right">Interests</h2>
      {{INTERESTS_ITEMS}}

      <h2 class="h-right">References</h2>
      {{REFERENCES_ITEMS}}

      <h2 class="h-right">Languages</h2>
      {{LANGUAGES_ITEMS}}

      {{ADDITIONAL_SECTIONS}}
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
      --name-size: 1.9rem;
      --body-size: 11pt;
      --section-heading-size: 15pt;
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
      font-size: 11pt; 
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
      font-size: var(--section-heading-size);
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
      font-size: 11pt; 
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

    <!-- Achievements -->
    <section class="section" aria-label="Achievements">
      <h2 class="section-title">Achievements</h2>
      <hr />
      <div class="section-content">
        <ul class="bullets">
          {{ACHIEVEMENTS_ITEMS}}
        </ul>
      </div>
    </section>

    <!-- Awards -->
    <section class="section" aria-label="Awards">
      <h2 class="section-title">Awards</h2>
      <hr />
      <div class="section-content">
        <ul class="bullets">
          {{AWARDS_ITEMS}}
        </ul>
      </div>
    </section>

    <!-- Publications -->
    <section class="section" aria-label="Publications">
      <h2 class="section-title">Publications</h2>
      <hr />
      <div class="section-content">
        <ul class="bullets">
          {{PUBLICATIONS_ITEMS}}
        </ul>
      </div>
    </section>

    <!-- Volunteer Work -->
    <section class="section" aria-label="Volunteer Work">
      <h2 class="section-title">Volunteer Work</h2>
      <hr />
      <div class="section-content">
        <ul class="bullets">
          {{VOLUNTEER_WORK_ITEMS}}
        </ul>
      </div>
    </section>

    <!-- Interests -->
    <section class="section" aria-label="Interests">
      <h2 class="section-title">Interests</h2>
      <hr />
      <div class="section-content">
        <ul class="bullets">
          {{INTERESTS_ITEMS}}
        </ul>
      </div>
    </section>

    <!-- References -->
    <section class="section" aria-label="References">
      <h2 class="section-title">References</h2>
      <hr />
      <div class="section-content">
        <ul class="bullets">
          {{REFERENCES_ITEMS}}
        </ul>
      </div>
    </section>

    <!-- Additional Sections -->
    {{ADDITIONAL_SECTIONS}}
  </main>
</body>
</html>`

export function CVGenerator({ structuredResume, templateId }: CVGeneratorProps) {
  const [showPreview, setShowPreview] = useState(false)
  const { toast } = useToast()

  // Helper function to remove empty sections
  const removeSection = (cv: string, sectionTitle: string, placeholder: string) => {
    // Remove sections with different possible patterns
    const patterns = [
      // Modern Professional pattern
      new RegExp(`<h2 class="h-right">${sectionTitle}</h2>[\\s\\S]*?${placeholder}`, 'g'),
      new RegExp(`<h2 class="h-left">${sectionTitle}</h2>[\\s\\S]*?${placeholder}`, 'g'),
      // FAANG pattern
      new RegExp(`<h2 class="section-title">${sectionTitle}</h2>[\\s\\S]*?${placeholder}`, 'g'),
      // Section with wrapper
      new RegExp(`<section[^>]*>[\\s\\S]*?<h2[^>]*>${sectionTitle}</h2>[\\s\\S]*?${placeholder}[\\s\\S]*?</section>`, 'g'),
      // Just the placeholder
      new RegExp(placeholder, 'g')
    ]
    
    let result = cv
    patterns.forEach(pattern => {
      result = result.replace(pattern, '')
    })
    
    return result
  }

  // Dynamic section generators for different templates
  const sectionGenerators = {
    'faang-path': {
      education: (items: any[]) => items.map(edu => {
        // Handle both date formats: separate start_date/end_date or single dates field
        const dateString = edu.dates || `${edu.start_date || ''} - ${edu.end_date || ''}`.replace(/ - $/, '')
        return `<div class="item">
          <div class="item-header">${edu.degree}</div>
          <div class="item-subheader">${edu.institution} • ${dateString}</div>
        </div>`
      }).join(''),
      
      skills: (skills: any) => {
        const sections = []
        
        // Handle new structure: {programming_languages, tools, libraries, databases, cloud_platforms, methodologies, other}
        if (skills.programming_languages?.length) sections.push(`<dt>Programming Languages:</dt><dd>${skills.programming_languages.join(', ')}</dd>`)
        if (skills.tools?.length) sections.push(`<dt>Tools:</dt><dd>${skills.tools.join(', ')}</dd>`)
        if (skills.libraries?.length) sections.push(`<dt>Libraries:</dt><dd>${skills.libraries.join(', ')}</dd>`)
        if (skills.databases?.length) sections.push(`<dt>Databases:</dt><dd>${skills.databases.join(', ')}</dd>`)
        if (skills.cloud_platforms?.length) sections.push(`<dt>Cloud Platforms:</dt><dd>${skills.cloud_platforms.join(', ')}</dd>`)
        if (skills.methodologies?.length) sections.push(`<dt>Methodologies:</dt><dd>${skills.methodologies.join(', ')}</dd>`)
        if (skills.other?.length) sections.push(`<dt>Other:</dt><dd>${skills.other.join(', ')}</dd>`)
        
        // Handle legacy structures for backward compatibility
        if (skills.languages?.length) sections.push(`<dt>Languages:</dt><dd>${skills.languages.join(', ')}</dd>`)
        if (skills.technical?.length) sections.push(`<dt>Technical:</dt><dd>${skills.technical.join(', ')}</dd>`)
        if (skills.soft?.length) sections.push(`<dt>Soft Skills:</dt><dd>${skills.soft.join(', ')}</dd>`)
        
        return sections.join('')
      },
      
      experience: (items: any[]) => items.map(exp => {
        // Handle both date formats: separate start_date/end_date or single dates field
        const dateString = exp.dates || `${exp.start_date || ''} - ${exp.end_date || ''}`.replace(/ - $/, '')
        const achievements = Array.isArray(exp.achievements) ? exp.achievements : []
        return `<div class="item">
          <div class="item-header">${exp.title}</div>
          <div class="item-subheader">${exp.company} • ${dateString}</div>
          <ul class="bullets">
            ${achievements.map((achievement: string) => `<li>${achievement}</li>`).join('')}
          </ul>
        </div>`
      }).join(''),
      
      projects: (items: any[]) => items.map(project => {
        const technologies = Array.isArray(project.technologies_used) 
          ? project.technologies_used.join(', ')
          : String(project.technologies_used || '')
        return `<li><strong>${project.name}:</strong> ${project.description} <em>(${technologies})</em></li>`
      }).join(''),
      
      certifications: (items: any[]) => items.map(cert => 
        `<li><strong>${cert.name}</strong>${cert.issuer !== 'Unknown' ? ` - ${cert.issuer}` : ''}</li>`
      ).join(''),
      
      achievements: (items: string[]) => items.map(achievement => `<li>${achievement}</li>`).join(''),
      
      awards: (items: any[]) => items.map(award => `<li>${award}</li>`).join(''),
      
      publications: (items: any[]) => items.map(pub => 
        `<li><strong>${pub.title}</strong> - ${pub.journal || pub.venue || ''}</li>`
      ).join(''),
      
      volunteer_work: (items: any[]) => items.map(work => 
        `<li><strong>${work.organization || work.title}</strong> - ${work.description || work.role}</li>`
      ).join(''),
      
      interests: (items: string[]) => items.map(interest => `<li>${interest}</li>`).join(''),
      
      references: (items: any[]) => items.map(ref => 
        `<li><strong>${ref.name}</strong> - ${ref.position}, ${ref.company} (${ref.contact})</li>`
      ).join(''),
      
      languages: (items: any[]) => items.map(lang => 
        `<li><strong>${lang.name}</strong> - ${lang.proficiency || lang.level}</li>`
      ).join(''),
      
      additional_sections: (sections: any) => {
        return Object.entries(sections).map(([sectionName, items]: [string, any]) => {
          const itemsHtml = Array.isArray(items) ? items.map((item: any) => {
            if (typeof item === 'string') return `<li>${item}</li>`
            if (typeof item === 'object') {
              const fields = Object.entries(item).map(([key, value]) => 
                `<strong>${key}:</strong> ${value}`
              ).join(', ')
              return `<li>${fields}</li>`
            }
            return `<li>${item}</li>`
          }).join('') : ''
          
          return `
            <div class="section">
              <h3>${sectionName}</h3>
              <ul>${itemsHtml}</ul>
            </div>
          `
        }).join('')
      }
    },
    
    'modern-professional': {
      education: (items: any[]) => items.map(edu => {
        // Handle both date formats: separate start_date/end_date or single dates field
        const dateString = edu.dates || `${edu.start_date || ''}–${edu.end_date || ''}`.replace(/–$/, '')
        return `<article class="item">
          <div class="role-line">
            <span class="role">${edu.degree}</span>
            <span class="org">— <i>${edu.institution}</i>.</span>
            <span class="dates">${dateString}</span>
          </div>
        </article>`
      }).join(''),
      
      skills: (skills: any) => {
        // Handle new structure: {programming_languages, tools, libraries, databases, cloud_platforms, methodologies, other}
        const newStructureSkills = [
          ...(skills.programming_languages || []),
          ...(skills.tools || []),
          ...(skills.libraries || []),
          ...(skills.databases || []),
          ...(skills.cloud_platforms || []),
          ...(skills.methodologies || []),
          ...(skills.other || [])
        ]
        
        // Handle legacy structures for backward compatibility
        const legacySkills = [
          ...(skills.languages || []),
          ...(skills.technical || []),
          ...(skills.soft || [])
        ]
        
        // Use whichever structure has data
        const allSkills = newStructureSkills.length > 0 ? newStructureSkills : legacySkills
        
        return allSkills.map(skill => `<li>${skill}</li>`).join('')
      },
      
      experience: (items: any[]) => items.map(exp => {
        // Handle both date formats: separate start_date/end_date or single dates field
        const dateString = exp.dates || `${exp.start_date || ''}–${exp.end_date || ''}`.replace(/–$/, '')
        const achievements = Array.isArray(exp.achievements) ? exp.achievements : []
        return `<article class="item">
          <div class="role-line">
            <span class="role">${exp.title}</span>
            <span class="org">at <i>${exp.company}</i>.</span>
            <span class="dates">${dateString}</span>
          </div>
          ${achievements.map((achievement: string) => `<p class="bullet-mini diamond">${achievement}</p>`).join('')}
        </article>`
      }).join(''),
      
      projects: (items: any[]) => items.map(project => {
        const technologies = Array.isArray(project.technologies_used) 
          ? project.technologies_used.join(', ')
          : String(project.technologies_used || '')
        return `<article class="item">
          <div class="role-line">
            <span class="role">${project.name}</span>
            <span class="org">— <i>${technologies}</i></span>
          </div>
          <p class="bullet-mini diamond">${project.description}</p>
        </article>`
      }).join(''),
      
      certifications: (items: any[]) => items.map(cert => 
        `<article class="item">
          <div class="role-line">
            <span class="role">${cert.name}</span>
            <span class="org">— <i>${cert.issuer !== 'Unknown' ? cert.issuer : 'Certification'}</i></span>
            <span class="dates">${cert.date !== 'Unknown' ? cert.date : ''}</span>
          </div>
        </article>`
      ).join(''),
      
      achievements: (items: string[]) => items.map(achievement => `<li>${achievement}</li>`).join(''),
      
      awards: (items: any[]) => items.map(award => 
        `<article class="item">
          <p class="bullet-mini diamond">${award}</p>
        </article>`
      ).join(''),
      
      publications: (items: any[]) => items.map(pub => 
        `<article class="item">
          <div class="role-line">
            <span class="role">${pub.title}</span>
            <span class="org">— <i>${pub.journal || pub.venue || 'Publication'}</i></span>
          </div>
        </article>`
      ).join(''),
      
      volunteer_work: (items: any[]) => items.map(work => 
        `<article class="item">
          <div class="role-line">
            <span class="role">${work.organization || work.title}</span>
            <span class="org">— <i>${work.description || work.role}</i></span>
          </div>
        </article>`
      ).join(''),
      
      interests: (items: string[]) => items.map(interest => `<li>${interest}</li>`).join(''),
      
      references: (items: any[]) => items.map(ref => 
        `<article class="item">
          <div class="role-line">
            <span class="role">${ref.name}</span>
            <span class="org">— <i>${ref.position}, ${ref.company}</i></span>
          </div>
        </article>`
      ).join(''),
      
      languages: (items: any[]) => items.map(lang => 
        `<article class="item">
          <div class="role-line">
            <span class="role">${lang.name}</span>
            <span class="org">— <i>${lang.proficiency || lang.level}</i></span>
          </div>
        </article>`
      ).join(''),
      
      additional_sections: (sections: any) => {
        return Object.entries(sections).map(([sectionName, items]: [string, any]) => {
          const itemsHtml = Array.isArray(items) ? items.map((item: any) => {
            if (typeof item === 'string') {
              return `<article class="item"><p class="bullet-mini diamond">${item}</p></article>`
            }
            if (typeof item === 'object') {
              const fields = Object.entries(item).map(([key, value]) => 
                `<strong>${key}:</strong> ${value}`
              ).join(', ')
              return `<article class="item"><p class="bullet-mini diamond">${fields}</p></article>`
            }
            return `<article class="item"><p class="bullet-mini diamond">${item}</p></article>`
          }).join('') : ''
          
          return `
            <div class="section">
              <h3>${sectionName}</h3>
              ${itemsHtml}
            </div>
          `
        }).join('')
      }
    }
  }

  // Comprehensive section configuration with placeholders and section names
  const sectionConfig = [
    { key: 'education', placeholder: '{{EDUCATION_ITEMS}}', sectionNames: ['Education'] },
    { key: 'skills', placeholder: '{{SKILLS_ITEMS}}', sectionNames: ['Skills'] },
    { key: 'experience', placeholder: '{{EXPERIENCE_ITEMS}}', sectionNames: ['Experience'] },
    { key: 'projects', placeholder: '{{PROJECTS_ITEMS}}', sectionNames: ['Projects'] },
    { key: 'certifications', placeholder: '{{CERTIFICATIONS_ITEMS}}', sectionNames: ['Certifications'] },
    { key: 'achievements', placeholder: '{{ACHIEVEMENTS_ITEMS}}', sectionNames: ['Achievements'] },
    { key: 'awards', placeholder: '{{AWARDS_ITEMS}}', sectionNames: ['Awards'] },
    { key: 'publications', placeholder: '{{PUBLICATIONS_ITEMS}}', sectionNames: ['Publications'] },
    { key: 'volunteer_work', placeholder: '{{VOLUNTEER_WORK_ITEMS}}', sectionNames: ['Volunteer Work'] },
    { key: 'interests', placeholder: '{{INTERESTS_ITEMS}}', sectionNames: ['Interests'] },
    { key: 'references', placeholder: '{{REFERENCES_ITEMS}}', sectionNames: ['References'] },
    { key: 'languages', placeholder: '{{LANGUAGES_ITEMS}}', sectionNames: ['Languages'] },
    { key: 'additional_sections', placeholder: '{{ADDITIONAL_SECTIONS}}', sectionNames: [] }
  ]

  const generatedCV = useMemo(() => {
    let cv = ''
    
    if (templateId === 'faang-path') {
      cv = FAANG_TEMPLATE
    } else if (templateId === 'modern-professional') {
      cv = MODERN_PROFESSIONAL_TEMPLATE
    } else {
      return ''
    }

    // Extract contact information dynamically from any structure
    const extractContactInfo = (data: any, field: string) => {
      // Try multiple possible locations for the field
      const possiblePaths = [
        data.contact_info?.[field],
        data[field],
        data.contact?.[field],
        data.personal_info?.[field],
        data.profile?.[field]
      ]
      
      // Return the first non-empty value found
      const value = possiblePaths.find(value => value && String(value).trim())
      return value ? String(value).trim() : ''
    }
    
    const name = extractContactInfo(structuredResume, 'name') || 'Your Name'
    const email = extractContactInfo(structuredResume, 'email') || 'your.email@example.com'
    const phone = extractContactInfo(structuredResume, 'phone') || '+1 (555) 000-0000'
    const location = extractContactInfo(structuredResume, 'location') || 'Your Location'
    
    console.log('=== CONTACT INFO DEBUG ===')
    console.log('Full resume structure:', structuredResume)
    console.log('Resume keys:', Object.keys(structuredResume))
    
    // Debug each field extraction
    const debugField = (field: string) => {
      const paths = [
        { path: 'contact_info.' + field, value: (structuredResume as any).contact_info?.[field] },
        { path: field, value: (structuredResume as any)[field] },
        { path: 'contact.' + field, value: (structuredResume as any).contact?.[field] },
        { path: 'personal_info.' + field, value: (structuredResume as any).personal_info?.[field] },
        { path: 'profile.' + field, value: (structuredResume as any).profile?.[field] }
      ]
      console.log(`--- ${field.toUpperCase()} EXTRACTION ---`)
      paths.forEach(({ path, value }) => {
        console.log(`${path}:`, value, `(type: ${typeof value}, length: ${String(value).length})`)
      })
      return extractContactInfo(structuredResume, field)
    }
    
    console.log('Final extracted values:')
    console.log('Name:', debugField('name'))
    console.log('Email:', debugField('email'))
    console.log('Phone:', debugField('phone'))
    console.log('Location:', debugField('location'))
    
    // Additional debug for name specifically
    console.log('=== NAME DEBUG ===')
    console.log('structuredResume.contact_info:', structuredResume.contact_info)
    console.log('structuredResume.contact_info?.name:', structuredResume.contact_info?.name)
    console.log('Final name value that will be used:', name)
    
    cv = cv.replace(/{{NAME}}/g, name)
    cv = cv.replace(/{{EMAIL}}/g, email)
    cv = cv.replace(/{{PHONE}}/g, phone)
    cv = cv.replace(/{{LOCATION}}/g, location)
    cv = cv.replace(/{{LINKEDIN}}/g, 'LinkedIn Profile')
    cv = cv.replace(/{{WEBSITE}}/g, 'Portfolio Website')
    
    // Handle Summary/Profile section conditionally
    console.log('=== SUMMARY DEBUG ===')
    console.log('Summary field:', structuredResume.summary)
    console.log('Summary type:', typeof structuredResume.summary)
    console.log('Summary length:', structuredResume.summary?.length)
    console.log('Summary trimmed:', structuredResume.summary?.trim())
    console.log('Summary exists and not empty:', !!(structuredResume.summary && structuredResume.summary.trim()))
    
    if (structuredResume.summary && structuredResume.summary.trim()) {
      console.log('Replacing SUMMARY with:', structuredResume.summary)
      cv = cv.replace(/{{SUMMARY}}/g, structuredResume.summary)
    } else {
      console.log('Removing summary sections because no content')
      // Remove profile section if no summary - use more precise removal
      // For Modern Professional template (Profile section in left sidebar)
      cv = cv.replace(/<h2 class="h-left">Profile<\/h2>\s*<p>{{SUMMARY}}<\/p>/g, '')
      // For FAANG template (Summary section)
      cv = cv.replace(/<section class="section" aria-label="Summary">[\s\S]*?<p>{{SUMMARY}}<\/p>[\s\S]*?<\/section>/g, '')
      // Remove any remaining SUMMARY placeholders
      cv = cv.replace(/{{SUMMARY}}/g, '')
    }
    
    // Generate Photo Placeholder
    const photoPlaceholder = structuredResume.contact_info?.photo 
      ? `<img class="avatar" src="${structuredResume.contact_info.photo}" alt="Profile photo" />`
      : `<div class="avatar"></div>`
    cv = cv.replace(/{{PHOTO_PLACEHOLDER}}/g, photoPlaceholder)

    // Dynamic section processing - loop through all configured sections
    sectionConfig.forEach(config => {
      const data = structuredResume[config.key as keyof typeof structuredResume]
      const generator = sectionGenerators[templateId as keyof typeof sectionGenerators]?.[config.key as keyof typeof sectionGenerators['faang-path']]
      
      // Debug for skills section
      if (config.key === 'skills') {
        console.log('=== PROCESSING SKILLS SECTION ===')
        console.log('Data:', data)
        console.log('Generator:', generator)
        console.log('Template:', templateId)
      }
      
      // Check if we have data and generator
      if (data && generator) {
        let items: any[] = []
        let hasData = false
        
        // Handle different data structures consistently
        if (Array.isArray(data)) {
          // Standard array handling
          items = data
          hasData = data.length > 0
        } else if (typeof data === 'object' && data !== null) {
          // Object-based sections - check if they have meaningful content
          if (config.key === 'skills') {
            // Skills object: check if any skill category has data (handle both old and new structure)
            hasData = Object.values(data).some((skillArray: any) => Array.isArray(skillArray) && skillArray.length > 0)
          } else if (config.key === 'additional_sections') {
            // Additional sections: check if any custom section has data
            hasData = Object.keys(data).length > 0
          } else {
            // Generic object: treat as having data if not empty
            hasData = Object.keys(data).length > 0
          }
          items = [data] // Always pass the entire object for object-based sections
        }
        
        if (hasData) {
          // For object-based sections (skills, additional_sections), pass the object directly
          const dataToPass = (config.key === 'skills' || config.key === 'additional_sections') ? items[0] : items
          const generatedItems = generator(dataToPass)
          cv = cv.replace(new RegExp(config.placeholder, 'g'), generatedItems)
        } else {
          // Remove section if no data
          config.sectionNames.forEach(sectionName => {
            cv = removeSection(cv, sectionName, config.placeholder)
          })
          
          // Remove placeholder for any section that has no data
          cv = cv.replace(new RegExp(config.placeholder, 'g'), '')
        }
      } else {
        // Handle case where data is null/undefined or generator doesn't exist
        // Remove section titles and placeholders
        config.sectionNames.forEach(sectionName => {
          cv = removeSection(cv, sectionName, config.placeholder)
        })
        
        // Remove placeholder for any section that has no data
        cv = cv.replace(new RegExp(config.placeholder, 'g'), '')
      }
    })

    return cv
  }, [structuredResume, templateId])



  const handleDownloadPDF = async () => {
    try {
      // Create a new window for printing
      const printWindow = window.open('', '_blank')
      if (!printWindow) {
        throw new Error('Unable to open print window')
      }

      // Write the CV content to the new window
      printWindow.document.write(generatedCV)
      printWindow.document.close()

      // Wait for content to load
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Focus the window and trigger print
      printWindow.focus()
      printWindow.print()
      
      // Close the window after a delay
      setTimeout(() => {
        printWindow.close()
      }, 1000)
      
      toast({
        title: "Print dialog opened",
        description: "Choose 'Save as PDF' in the print dialog to download your CV as PDF.",
        variant: "default"
      })
    } catch (error) {
      console.error('Error opening print dialog:', error)
      toast({
        title: "Error",
        description: "Unable to open print dialog. Please try again.",
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
              <FileDown className="w-4 h-4 mr-1" />
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
              onClick={handleDownloadPDF}
              className="flex items-center space-x-2"
            >
              <FileDown className="w-4 h-4" />
              <span>Download PDF File</span>
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

