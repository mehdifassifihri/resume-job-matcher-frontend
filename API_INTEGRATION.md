# API Integration Guide

## Overview

The application is integrated with a backend API for resume analysis and tailored CV generation.

## Configuration

### Environment Variables

Create a `.env` file at the project root with the following variables:

```env
# API Configuration
REACT_APP_API_BASE_URL=http://localhost:8000
REACT_APP_API_TIMEOUT=120000

# Application Settings
REACT_APP_APP_NAME="Resume Job Matcher"
REACT_APP_ENVIRONMENT=development
REACT_APP_ENABLE_MOCK_DATA=false
```

### Default Configuration

If no environment variables are defined, the application uses default values:
- **API Base URL**: `https://web-production-fb736.up.railway.app`
- **Timeout**: `120000ms` (2 minutes)
- **Environment**: `development`

## API Endpoints

### 1. Resume Upload and Analysis

**Endpoint**: `POST /match/upload`

**Body** (FormData):
```javascript
{
  "resume_file": File,      // Resume file (PDF, DOCX, TXT)
  "job_file": File,         // Job description file
  "model": "gpt-4o-mini",   // AI model to use
  "user_id": number         // Optional: User ID to save to history
}
```

**Response**:
```json
{
  "score": 85.5,
  "coverage": {
    "must_have": 90,
    "responsibilities": 80,
    "seniority_fit": 85
  },
  "gaps": {
    "matched_skills": [
      "Python",
      "React",
      "TypeScript",
      "Docker"
    ],
    "missing_skills": [
      "Kubernetes",
      "AWS",
      "GraphQL"
    ],
    "weak_evidence_for_responsibilities": [
      "Team leadership",
      "Project management"
    ]
  },
  "rationale": "The candidate demonstrates strong technical skills in web development with React and TypeScript. However, there are some gaps in DevOps technologies like Kubernetes and cloud platforms. Leadership experience could be better documented.",
  "tailored_resume_text": "...",
  "structured_resume": {
    "contact_info": {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1 (555) 123-4567",
      "location": "San Francisco, CA"
    },
    "summary": "Experienced Full Stack Developer...",
    "experience": [...],
    "education": [...],
    "skills": {...},
    "certifications": [...],
    "projects": [...]
  },
  "recommendations": [
    "Add Kubernetes certification or experience",
    "Highlight cloud platform experience (AWS/GCP/Azure)",
    "Include more leadership examples",
    "Quantify achievements with metrics"
  ],
  "flags": [
    "missing_cloud_experience",
    "limited_devops_skills"
  ],
  "meta": {
    "detected_language": "en",
    "processing_time": 3.5,
    "model_used": "gpt-4o-mini"
  }
}
```

### 2. Health Check

**Endpoint**: `GET /health`

**Response**:
```json
{
  "status": "healthy",
  "timestamp": "2024-10-12T10:00:00Z",
  "version": "1.0.0"
}
```

### 3. Authentication Endpoints

See [JWT_AUTH.md](JWT_AUTH.md) for complete authentication documentation.

**Endpoints**:
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/refresh` - Token refresh
- `GET /auth/me` - Get current user

### 4. Analysis History

**Get User History**:
```
GET /analysis/history/{user_id}

Headers:
Authorization: Bearer {access_token}

Response:
{
  "analyses": [
    {
      "id": 1,
      "user_id": 123,
      "score": 85.5,
      "created_at": "2024-10-12T10:00:00Z",
      "resume_filename": "resume.pdf",
      "job_filename": "job_description.txt"
    }
  ],
  "total": 10,
  "page": 1,
  "per_page": 20
}
```

## API Service Implementation

File: `src/lib/api.ts`

### Key Functions

```typescript
class APIService {
  // Upload resume and job description for analysis
  async uploadResumeAndJob(
    resumeFile: File,
    jobDescription: File | string,
    model: string = 'gpt-4o-mini',
    userId?: number
  ): Promise<APIResponse>
  
  // Health check
  async healthCheck(): Promise<{ status: string }>
  
  // Get analysis history
  async getAnalysisHistory(userId: number): Promise<AnalysisHistory[]>
}
```

### Usage Example

```typescript
import { apiService } from '../lib/api'

// Upload and analyze
const result = await apiService.uploadResumeAndJob(
  resumeFile,
  jobDescriptionFile,
  'gpt-4o-mini',
  userId  // optional
)

// Check backend health
const health = await apiService.healthCheck()

// Get user's analysis history
const history = await apiService.getAnalysisHistory(userId)
```

## Error Handling

### API Errors

The service includes comprehensive error handling:

```typescript
try {
  const result = await apiService.uploadResumeAndJob(...)
} catch (error) {
  if (error instanceof APIError) {
    // Structured error with status code and message
    console.error(error.message)
    console.error(error.statusCode)
  } else {
    // Network or other error
    console.error('Unexpected error:', error)
  }
}
```

### Error Types

- **400 Bad Request**: Invalid file format or missing required fields
- **401 Unauthorized**: Missing or invalid authentication token
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **413 Payload Too Large**: File size exceeds limit
- **422 Unprocessable Entity**: Invalid data format
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Server error
- **503 Service Unavailable**: Service temporarily unavailable
- **Network Error**: Connection failed

## File Upload Requirements

### Supported Formats

- **Resume**: PDF, DOCX, DOC, TXT
- **Job Description**: PDF, DOCX, DOC, TXT, or plain text string

### File Size Limits

- Maximum file size: 10MB per file
- Configurable in `src/lib/config.ts`

### Validation

```typescript
// File type validation
const allowedTypes = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
  'text/plain'
]

// File size validation
const maxSize = 10 * 1024 * 1024 // 10MB
```

## Mock Data Mode

For development or testing without a backend:

### Enable Mock Data

```env
REACT_APP_ENABLE_MOCK_DATA=true
```

### Mock Data Features

- Simulated API responses
- Realistic scoring algorithms
- Generated recommendations
- Sample structured resume data
- No backend required

### Mock Response Generation

File: `src/lib/mock.ts`

```typescript
// Generate mock analysis result
export const mockAnalysisResponse = {
  score: 85,
  coverage: {
    must_have: 90,
    responsibilities: 80,
    seniority_fit: 85
  },
  gaps: {
    matched_skills: [...],
    missing_skills: [...],
    weak_evidence_for_responsibilities: [...]
  },
  // ... complete mock data
}
```

## Request/Response Flow

### 1. File Upload Flow

```
User selects files
    ↓
Validate file types and sizes
    ↓
Create FormData object
    ↓
Add files and parameters
    ↓
Send POST request to /match/upload
    ↓
Show loading state
    ↓
Receive response
    ↓
Parse and display results
    ↓
Save to history (if authenticated)
```

### 2. Authentication Flow

```
User logs in
    ↓
Receive JWT tokens
    ↓
Store in localStorage
    ↓
Add to request headers
    ↓
On 401 error, refresh token
    ↓
Retry original request
    ↓
If refresh fails, logout
```

## CORS Configuration

Your backend must enable CORS for the frontend origin:

```python
# Example for FastAPI (Python)
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://yourdomain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

```javascript
// Example for Express (Node.js)
const cors = require('cors')

app.use(cors({
  origin: ['http://localhost:3000', 'https://yourdomain.com'],
  credentials: true
}))
```

## Rate Limiting

Implement rate limiting on your backend to prevent abuse:

```python
# Example limits
- Authentication endpoints: 5 requests per minute
- Analysis endpoint: 10 requests per hour per user
- Health check: 100 requests per minute
```

## Testing

### Test Health Check

```bash
curl http://localhost:8000/health
```

### Test Upload (with curl)

```bash
curl -X POST http://localhost:8000/match/upload \
  -F "resume_file=@resume.pdf" \
  -F "job_file=@job.txt" \
  -F "model=gpt-4o-mini"
```

### Test Authentication

```bash
# Register
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","username":"testuser","password":"securepass"}'

# Login
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"securepass"}'
```

## Performance Optimization

### Timeouts

```typescript
// Configured in config.ts
api: {
  timeout: 120000  // 2 minutes for AI processing
}
```

### Retry Logic

The API service includes automatic retry for transient errors:

```typescript
// Retries on:
- Network errors
- 503 Service Unavailable
- 429 Too Many Requests (with backoff)
```

### Caching

Consider implementing caching for:
- Analysis results (by file hash)
- User profile data
- Static resources

## Security Considerations

### API Key Management

- Never commit API keys to version control
- Use environment variables
- Rotate keys regularly
- Use different keys for dev/staging/production

### Request Validation

Backend should validate:
- File types and sizes
- Request parameters
- Authentication tokens
- Rate limits

### Data Privacy

- Don't log sensitive data
- Encrypt data in transit (HTTPS)
- Implement proper access controls
- Follow GDPR/privacy regulations

## Deployment Configuration

### Development

```env
REACT_APP_API_BASE_URL=http://localhost:8000
REACT_APP_ENVIRONMENT=development
REACT_APP_ENABLE_MOCK_DATA=true
```

### Staging

```env
REACT_APP_API_BASE_URL=https://staging-api.yourdomain.com
REACT_APP_ENVIRONMENT=staging
REACT_APP_ENABLE_MOCK_DATA=false
```

### Production

```env
REACT_APP_API_BASE_URL=https://api.yourdomain.com
REACT_APP_ENVIRONMENT=production
REACT_APP_ENABLE_MOCK_DATA=false
```

## Troubleshooting

### Connection Refused

- Check backend is running
- Verify API URL is correct
- Check firewall settings
- Verify network connectivity

### CORS Errors

- Enable CORS on backend
- Add frontend origin to allowed origins
- Check credentials settings

### Timeout Errors

- Increase timeout value
- Optimize backend processing
- Check server resources
- Implement progress updates

### File Upload Fails

- Check file size limits
- Verify file format
- Check server disk space
- Validate file content

## Integration Checklist

- [ ] Backend API deployed and accessible
- [ ] CORS configured for frontend domain
- [ ] Authentication endpoints working
- [ ] File upload endpoint working
- [ ] Analysis endpoint returning correct format
- [ ] Error handling implemented
- [ ] Rate limiting configured
- [ ] HTTPS enabled in production
- [ ] Environment variables set
- [ ] Health check endpoint working
- [ ] API documentation available
- [ ] Testing completed

## Additional Resources

- [Axios Documentation](https://axios-http.com/)
- [FormData API](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
- [CORS Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

---

**Version**: 1.0.0  
**Last Updated**: October 2024  
**Status**: Production Ready
