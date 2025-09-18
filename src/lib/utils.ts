import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`
}

export function clampScore(score: number): number {
  return Math.max(0, Math.min(100, score))
}

export function copyToClipboard(text: string): Promise<boolean> {
  return navigator.clipboard.writeText(text).then(() => true).catch(() => false)
}

export function downloadMock(filename: string, content: string, type: 'docx' | 'pdf'): void {
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function simulateFileUpload(file: File): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Handle TXT files directly
      if (file.name.toLowerCase().endsWith('.txt')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const content = e.target?.result as string
          resolve(content)
        }
        reader.readAsText(file)
        return
      }
      
      // Simulate text extraction from other file types
      const mockContent = `Education
University of California, Los Angeles (UCLA) | B.S. Computer Science
Sept 2019 - Expected Jun 2023
GPA: 3.389

Technical Skills
Programming Languages: JavaScript, Ruby, Python, SQL, C/C++, TypeScript, HTML/CSS, Swift
Frameworks: React, React Native, Ruby on Rails, Node.js, Express.js
Development Tools: Git, Jira, MongoDB, Firebase, GCP, Heroku

Work Experience
Handshake | Full Stack Software Engineering Intern, Jun 2022 - Aug 2022
- Built a full-stack filter to search for users by language proficiency using React, Ruby on Rails, and PostgreSQL, enabling 30+ partners to identify candidates for international roles.
- Served as Subject Matter Expert for filter dropdown, linking components to fetch data from backend while proposing UX improvements.

BlackLine | Software Engineering Intern, Jun 2021 - Aug 2021
- Developed and restyled components in the UI component library using React and CSS for modernization projects.
- Spearheaded the addition of a new filter type to the Table component, enhancing data selection capabilities.

Projects
Hussle | Co-Founder, Jun 2020 - Present
- Developing a freelance marketplace app for college students using React Native and Node.js, gaining 250+ users within the first month.
- Led design and development of in-app chat implementation, integrating third-party libraries for real-time messaging.

Nova, Tech for Good | Project Co-Lead, Oct 2020 - Present
- Leading development of an instant messaging iOS app for victims of sexual assault, collaborating with a team of 12 to complete the beta version.

Achievements
- UCLA Stanton & Stockwell Architects Scholarship Fund (2023)
- NJ-11 Congressional App Challenge Winner (2018)
- Lockheed Martin STEM Scholar (2019)

Professional Memberships
- Society of Women Engineers
- National Center for Women in Technology & Computing
- Sigma Eta Pi`
      
      resolve(mockContent)
    }, 1500)
  })
}

export function calculateMockScore(cvContent: string, jobDescription: string): number {
  const cvLower = cvContent.toLowerCase()
  const jdLower = jobDescription.toLowerCase()
  
  // Simple keyword matching
  const keywords = ['javascript', 'react', 'node.js', 'python', 'java', 'sql', 'git', 'aws', 'docker', 'api']
  let score = 0
  const keywordWeight = 10 // 10 points per matching keyword
  
  keywords.forEach((keyword: string) => {
    if (cvLower.includes(keyword) && jdLower.includes(keyword)) {
      score += keywordWeight
    }
  })
  
  // Add some randomness but ensure max is 100%
  const randomBonus = Math.random() * 20
  const finalScore = Math.round(score + randomBonus)
  
  return Math.min(finalScore, 100)
}

export function generateMockRecommendations(score: number): string[] {
  const recommendations = [
    "Add more specific technical skills mentioned in the job description",
    "Include quantifiable achievements in your work experience",
    "Highlight relevant projects that match the job requirements",
    "Optimize your resume summary to align with the job role",
    "Add industry-specific certifications or training"
  ]
  
  // Return 3-4 recommendations based on score
  if (score < 50) {
    return recommendations.slice(0, 4)
  } else if (score < 75) {
    return recommendations.slice(1, 4)
  } else {
    return recommendations.slice(2, 4)
  }
}
