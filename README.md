# Resume Job Matcher

A modern, AI-powered web application that analyzes resume-job compatibility and generates optimized resumes tailored to specific job descriptions.

## 🚀 Features

- **File Upload Support**: PDF, DOCX, and TXT file formats for both resumes and job descriptions
- **AI-Powered Analysis**: Intelligent matching algorithm with compatibility scoring
- **Skills Gap Analysis**: Identifies missing skills and provides improvement recommendations
- **Tailored Resume Generation**: Creates optimized resumes for specific job applications
- **Professional Templates**: Multiple HTML resume templates with modern styling
- **Real-time API Integration**: Connects to backend analysis services with fallback mode
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Built with React 19, Tailwind CSS, and Framer Motion animations

## 🛠️ Technology Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS with DaisyUI components
- **UI Components**: Radix UI primitives with shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Create React App
- **Deployment**: Static hosting (Netlify, Vercel, etc.)

## 📋 Prerequisites

- Node.js 18.0.0 or higher
- npm 8.0.0 or higher (or yarn 1.22.0+)
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

## 🚀 Quick Start

### 1. Installation

```bash
# Clone or download the project
git clone <repository-url>
cd resume-jobmatcher

# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env
```

### 2. Configuration

Edit the `.env` file with your settings:

```env
# API Configuration
REACT_APP_API_BASE_URL=http://localhost:8000
REACT_APP_API_TIMEOUT=30000

# Application Settings
REACT_APP_APP_NAME="Resume Job Matcher"
REACT_APP_ENVIRONMENT=development
REACT_APP_ENABLE_MOCK_DATA=true
```

### 3. Start Development Server

```bash
npm start
```

The application will be available at `http://localhost:3000`

## 🚀 Deployment

### Production Build

```bash
# Create production build
npm run build

# The build folder contains the production-ready files
# Deploy the contents of the build folder to your hosting service
```

### Deployment Options

- **Netlify**: Drag and drop the `build` folder to Netlify
- **Vercel**: Connect your repository and deploy automatically
- **GitHub Pages**: Use GitHub Actions to deploy the build folder
- **AWS S3**: Upload the build folder contents to an S3 bucket
- **Any Static Host**: Upload the build folder contents to any static hosting service

## 📖 Documentation

Additional documentation files in the project:

- **[API Integration](API_INTEGRATION.md)** - Backend API integration details
- **[Timeout Configuration](TIMEOUT_CONFIG.md)** - API timeout and configuration settings

## 🔧 Configuration Options

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `REACT_APP_API_BASE_URL` | Backend API server URL | `http://localhost:8000` | Yes |
| `REACT_APP_API_TIMEOUT` | API request timeout (ms) | `30000` | No |
| `REACT_APP_APP_NAME` | Application display name | `"Resume Job Matcher"` | No |
| `REACT_APP_ENVIRONMENT` | Environment mode | `development` | No |
| `REACT_APP_ENABLE_MOCK_DATA` | Use mock data when API unavailable | `true` | No |
| `REACT_APP_USE_EXTERNAL_FONTS` | Load fonts from Google Fonts | `true` | No |

### Feature Flags

- **Analytics**: Enable Google Analytics tracking
- **Debug Mode**: Show detailed logging and development features
- **Mock Data**: Use sample data when backend is unavailable
- **External Fonts**: Load fonts from Google Fonts or use system fonts

## 🎨 Customization

### Templates

The application includes professional HTML resume templates:

- **Professional Template**: Clean, ATS-friendly design
- **Modern Template**: Contemporary styling with visual elements
- **Custom Styling**: Configurable colors, fonts, and layouts

### Styling

- **Color Schemes**: Customizable primary and accent colors
- **Typography**: Multiple font options with fallbacks
- **Layout**: Responsive grid system with mobile-first design
- **Animations**: Smooth transitions and micro-interactions

## 🔌 API Integration

### Required Backend Endpoints

- `GET /health` - Health check endpoint
- `POST /match/upload` - Resume matching analysis

### API Request Format

```javascript
// FormData with files and model parameter
const formData = new FormData();
formData.append('resume_file', resumeFile);
formData.append('job_file', jobFile);
formData.append('model', 'gpt-4o-mini');
```

### API Response Format

```json
{
  "score": 85,
  "coverage": {
    "must_have": 90,
    "responsibilities": 80,
    "seniority_fit": 85
  },
  "gaps": {
    "matched_skills": ["Java", "Spring Boot"],
    "missing_skills": ["Kubernetes", "Docker"],
    "weak_evidence_for_responsibilities": ["Team leadership"]
  },
  "rationale": "Strong technical skills but missing some DevOps experience...",
  "tailored_resume_text": "Optimized resume content...",
  "recommendations": [
    "Add Kubernetes experience",
    "Highlight leadership examples"
  ],
  "flags": ["missing_cloud_experience"],
  "meta": {
    "detected_language": "en"
  }
}
```

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components (shadcn/ui)
│   ├── Header.tsx      # Application header
│   ├── HeroUpload.tsx  # File upload section
│   ├── ResultPanel.tsx # Analysis results
│   ├── CVGenerator.tsx # Resume generation
│   ├── TemplateSystem.tsx # Template management
│   └── ...
├── lib/                # Utility libraries
│   ├── api.ts          # API service
│   ├── config.ts       # Configuration management
│   ├── mock.ts         # Mock data for development
│   └── utils.ts        # Helper functions
├── contexts/           # React contexts (Theme)
├── pages/              # Page components
├── assets/             # Static assets (images, logos)
└── styles/             # Global styles
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## 📦 Building for Production

```bash
# Create production build
npm run build

# Serve the build locally for testing
npx serve -s build -l 3000

# Or use any static file server
# The build folder contains all necessary files for deployment
```

## 🔒 Security Features

- **Environment Variables**: No hardcoded secrets or API keys
- **CORS Configuration**: Proper cross-origin request handling
- **Content Security Policy**: Security headers for production
- **Input Validation**: File type and size validation
- **Error Handling**: Graceful error handling with user feedback

## 🌐 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 📱 Mobile Support

- **Responsive Design**: Mobile-first approach
- **Touch Interactions**: Optimized for touch devices
- **Performance**: Optimized for mobile networks
- **Accessibility**: WCAG AA compliance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Radix UI** for accessible component primitives
- **Framer Motion** for smooth animations
- **Lucide** for beautiful icons
- **All Contributors** who make open source possible

## 📞 Support

- **Documentation**: Check the project documentation files
- **Issues**: Report bugs and request features
- **API Integration**: See `API_INTEGRATION.md` for backend setup
- **Configuration**: See `TIMEOUT_CONFIG.md` for timeout settings

## 🔄 Version History

- **v1.0.0** - Initial release with core functionality
- **v1.1.0** - Added template customization and improved UI
- **v1.2.0** - Enhanced API integration and error handling

---

**Built with ❤️ for job seekers and recruiters worldwide**# resume-job-matcher-frontend
