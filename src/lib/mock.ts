export interface JobSuggestion {
  id: string
  title: string
  company: string
  location: string
  isRemote: boolean
  stack: string[]
  fit: 'Fit' | 'Borderline'
  description: string
  salary?: string
}

export const mockCVContent = `Education
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

export const mockJobDescription = `SENIOR FULL-STACK DEVELOPER

We are looking for a passionate Senior Full-Stack Developer to join our team and contribute to the development of our innovative web applications.

MAIN MISSIONS
• Develop and maintain modern and performant web applications
• Collaborate with product, design and QA teams to deliver quality features
• Participate in technical architecture and implementation decisions
• Mentor junior developers and contribute to improving development practices

REQUIRED PROFILE
• 5+ years of experience in web development
• Mastery of JavaScript/TypeScript, React, Node.js
• Experience with databases (PostgreSQL, MongoDB)
• Knowledge of DevOps tools (Docker, AWS, CI/CD)
• Ability to work in a team and communicate effectively

REQUIRED TECHNOLOGIES
• Frontend: React, TypeScript, HTML/CSS
• Backend: Node.js, Express, Python (bonus)
• Database: PostgreSQL, MongoDB
• DevOps: Docker, AWS, Git
• Tools: VS Code, Postman, Figma

BONUS
• Experience with Kubernetes
• Knowledge of Next.js or Nuxt.js
• Microservices experience
• Cloud certifications (AWS, GCP, Azure)

CONDITIONS
• Full-time permanent contract
• Hybrid remote work possible
• Attractive salary based on experience
• Equipment provided
• Continuous training`

export const mockJobSuggestions: JobSuggestion[] = [
  {
    id: '1',
    title: 'Senior Full-Stack Developer',
    company: 'TechCorp',
    location: 'Paris',
    isRemote: true,
    stack: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
    fit: 'Fit',
    description: 'Join a dynamic team to develop innovative web applications.',
    salary: '65k-85k€'
  },
  {
    id: '2',
    title: 'Frontend Lead Developer',
    company: 'StartupXYZ',
    location: 'Lyon',
    isRemote: false,
    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    fit: 'Fit',
    description: 'Lead the frontend development of a growing SaaS platform.',
    salary: '70k-90k€'
  },
  {
    id: '3',
    title: 'Senior Backend Developer',
    company: 'DataFlow',
    location: 'Bordeaux',
    isRemote: true,
    stack: ['Node.js', 'Python', 'PostgreSQL', 'Docker', 'Kubernetes'],
    fit: 'Borderline',
    description: 'Architect and develop robust APIs for data-intensive applications.',
    salary: '60k-80k€'
  },
  {
    id: '4',
    title: 'Full-Stack Developer',
    company: 'InnovateLab',
    location: 'Marseille',
    isRemote: true,
    stack: ['React', 'Django', 'PostgreSQL', 'AWS'],
    fit: 'Fit',
    description: 'Develop innovative solutions in a startup environment.',
    salary: '55k-75k€'
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    company: 'CloudTech',
    location: 'Nantes',
    isRemote: false,
    stack: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'Python'],
    fit: 'Borderline',
    description: 'Optimize cloud infrastructures and deployment pipelines.',
    salary: '65k-85k€'
  },
  {
    id: '6',
    title: 'Frontend Developer',
    company: 'DesignStudio',
    location: 'Toulouse',
    isRemote: true,
    stack: ['React', 'Vue.js', 'TypeScript', 'Figma'],
    fit: 'Borderline',
    description: 'Create exceptional user interfaces for creative applications.',
    salary: '50k-70k€'
  }
]

export const mockAdaptedCV = `Education
University of California, Los Angeles (UCLA) | B.S. Computer Science
Sept 2019 - Expected Jun 2023
GPA: 3.389

Technical Skills
Programming Languages: JavaScript, Ruby, Python, SQL, C/C++, TypeScript, HTML/CSS, Swift
Frameworks: React, React Native, Ruby on Rails, Node.js, Express.js
Development Tools: Git, Jira, MongoDB, Firebase, GCP, Heroku, Docker, AWS

Work Experience
Handshake | Full Stack Software Engineering Intern, Jun 2022 - Aug 2022
- Built a full-stack filter to search for users by language proficiency using React, Ruby on Rails, and PostgreSQL, enabling 30+ partners to identify candidates for international roles and improving user search efficiency by 40%.
- Served as Subject Matter Expert for filter dropdown, linking components to fetch data from backend while proposing UX improvements that increased user engagement by 25%.

BlackLine | Software Engineering Intern, Jun 2021 - Aug 2021
- Developed and restyled components in the UI component library using React and CSS for modernization projects, contributing to a 30% improvement in user interface consistency.
- Spearheaded the addition of a new filter type to the Table component, enhancing data selection capabilities and reducing user task completion time by 20%.

Projects
Hussle | Co-Founder, Jun 2020 - Present
- Developing a freelance marketplace app for college students using React Native and Node.js, gaining 250+ users within the first month and generating $5,000+ in revenue.
- Led design and development of in-app chat implementation, integrating third-party libraries for real-time messaging with 99.9% uptime.

Nova, Tech for Good | Project Co-Lead, Oct 2020 - Present
- Leading development of an instant messaging iOS app for victims of sexual assault, collaborating with a team of 12 to complete the beta version with 500+ active users.
- Implemented secure end-to-end encryption and privacy features, ensuring user safety and data protection.

Achievements
- UCLA Stanton & Stockwell Architects Scholarship Fund (2023)
- NJ-11 Congressional App Challenge Winner (2018)
- Lockheed Martin STEM Scholar (2019)
- Dean's List for Academic Excellence (2020-2023)

Professional Memberships
- Society of Women Engineers
- National Center for Women in Technology & Computing
- Sigma Eta Pi
- Association for Computing Machinery (ACM)`
