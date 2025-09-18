
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


export const mockAdaptedCV = `JOHN DOE
San Francisco, California 94109 | (555) 123-4567 | john.doe@email.com | linkedin.com/in/johndoe

SUMMARY
Analytical and results-driven Full Stack Software Engineer with 5+ years of experience in modern web development. Expert in JavaScript, TypeScript, React, Node.js, and cloud technologies. Proven track record of building scalable applications, leading development teams, and implementing innovative solutions that enhance efficiency and improve user experience. Strong background in both frontend and backend development with expertise in DevOps practices.

EDUCATION
UNIVERSITY OF CALIFORNIA, Los Angeles, California
Bachelor of Science (B.S.), Computer Science, 2019
GPA: 3.7/4.0

SKILLS
Programming Languages: JavaScript, TypeScript, Python, Java, SQL, HTML/CSS, C++
Frontend Technologies: React, React Native, Angular, Vue.js, Redux, Next.js
Backend Technologies: Node.js, Express.js, Python, Django, Spring Boot
Databases: PostgreSQL, MongoDB, MySQL, Redis
Cloud & DevOps: AWS, Docker, Kubernetes, CI/CD, Git, Jenkins
Development Tools: VS Code, Git, Jira, Postman, Figma

EXPERIENCE
TECH CORP, San Francisco, California
Senior Full Stack Developer, 2021-2024
- Led development of microservices architecture using Node.js and React, serving 100,000+ daily active users
- Implemented CI/CD pipelines with Docker and AWS, reducing deployment time by 60%
- Collaborated with cross-functional teams to deliver high-quality features on time and within budget
- Mentored 3 junior developers and established coding standards and best practices
- Optimized database queries and application performance, improving response time by 40%

STARTUPXYZ, San Francisco, California
Full Stack Developer, 2019-2021
- Built responsive web applications using React, TypeScript, and Node.js for e-commerce platform
- Developed RESTful APIs and integrated third-party services (Stripe, Twilio, AWS)
- Implemented automated testing strategies, achieving 90% code coverage
- Participated in agile development process and daily standups with product and design teams

SOFTWARE ENGINEERING PROJECTS
E-Commerce Platform - Full Stack Developer
- Developed a complete e-commerce solution using React, Node.js, and PostgreSQL
- Implemented payment processing with Stripe API and real-time inventory management
- Deployed application on AWS with Docker containers and automated CI/CD pipeline

Task Management App - Frontend Developer
- Created a collaborative task management application using React and Redux
- Integrated real-time updates with WebSocket connections for team collaboration
- Implemented responsive design and accessibility features for optimal user experience

Weather Dashboard - Full Stack Developer
- Built a weather forecasting dashboard using React, Node.js, and OpenWeather API
- Implemented data visualization with Chart.js and responsive design principles
- Deployed on Heroku with automated testing and continuous integration`

export const mockStructuredResume = {
  contact_info: {
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "(555) 123-4567",
    location: "San Francisco, California 94109",
    photo: undefined // Will be set by user upload
  },
  summary: "Analytical and results-driven Full Stack Software Engineer with 5+ years of experience in modern web development. Expert in JavaScript, TypeScript, React, Node.js, and cloud technologies. Proven track record of building scalable applications, leading development teams, and implementing innovative solutions that enhance efficiency and improve user experience. Strong background in both frontend and backend development with expertise in DevOps practices.",
  experience: [
    {
      company: "TECH CORP",
      title: "Senior Full Stack Developer",
      start_date: "2021",
      end_date: "2024",
      achievements: [
        "Led development of microservices architecture using Node.js and React, serving 100,000+ daily active users",
        "Implemented CI/CD pipelines with Docker and AWS, reducing deployment time by 60%",
        "Collaborated with cross-functional teams to deliver high-quality features on time and within budget",
        "Mentored 3 junior developers and established coding standards and best practices",
        "Optimized database queries and application performance, improving response time by 40%"
      ]
    },
    {
      company: "STARTUPXYZ",
      title: "Full Stack Developer",
      start_date: "2019",
      end_date: "2021",
      achievements: [
        "Built responsive web applications using React, TypeScript, and Node.js for e-commerce platform",
        "Developed RESTful APIs and integrated third-party services (Stripe, Twilio, AWS)",
        "Implemented automated testing strategies, achieving 90% code coverage",
        "Participated in agile development process and daily standups with product and design teams"
      ]
    }
  ],
  education: [
    {
      degree: "Bachelor of Science (B.S.), Computer Science",
      institution: "University of California, Los Angeles",
      start_date: "2015",
      end_date: "2019"
    }
  ],
  skills: {
    technical: ["JavaScript", "TypeScript", "Python", "Java", "SQL", "HTML/CSS", "C++", "React", "React Native", "Angular", "Vue.js", "Redux", "Next.js", "Node.js", "Express.js", "Django", "Spring Boot", "PostgreSQL", "MongoDB", "MySQL", "Redis", "AWS", "Docker", "Kubernetes", "CI/CD", "Git", "Jenkins"],
    soft: ["Leadership", "Communication", "Team Collaboration", "Problem Solving"],
    languages: ["English (Native)", "Spanish (Fluent)", "French (Conversational)"]
  },
  certifications: [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023"
    },
    {
      name: "Google Cloud Professional Developer",
      issuer: "Google Cloud",
      date: "2022"
    }
  ],
  projects: [
    {
      name: "E-Commerce Platform",
      description: "Developed a complete e-commerce solution using React, Node.js, and PostgreSQL",
      technologies_used: ["React", "Node.js", "PostgreSQL", "Stripe API", "AWS", "Docker"],
      achievements: [
        "Implemented payment processing with Stripe API and real-time inventory management",
        "Deployed application on AWS with Docker containers and automated CI/CD pipeline"
      ]
    },
    {
      name: "Task Management App",
      description: "Created a collaborative task management application using React and Redux",
      technologies_used: ["React", "Redux", "WebSocket", "Node.js"],
      achievements: [
        "Integrated real-time updates with WebSocket connections for team collaboration",
        "Implemented responsive design and accessibility features for optimal user experience"
      ]
    }
  ],
  achievements: [
    "Led development of microservices architecture serving 100,000+ daily active users",
    "Reduced deployment time by 60% through CI/CD pipeline optimization",
    "Achieved 90% code coverage through automated testing strategies"
  ]
}
