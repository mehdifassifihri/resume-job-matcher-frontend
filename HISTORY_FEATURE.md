# Analysis History Feature Documentation

## Overview

The Analysis History feature allows logged-in users to automatically save their CV analysis results and view them later. This feature seamlessly integrates with your existing FastAPI backend.

## Features

### 1. **Automatic History Saving**
- When a logged-in user analyzes their CV, the analysis is automatically saved to their history
- Anonymous users can still use the analysis feature, but results are not saved
- Uses the existing `/match/upload` endpoint with `user_id` parameter

### 2. **History Dashboard**
- Dedicated page at `/history` to view all past analyses
- Beautiful UI with score indicators and date stamps
- Quick preview of job descriptions and tailored resumes
- Detailed view modal for each analysis

### 3. **Easy Access**
- "History" button in the header for authenticated users
- Available on both desktop and mobile views
- One-click navigation from any page

## User Flow

### For Anonymous Users
1. User visits the site (not logged in)
2. User uploads CV and job description
3. Analysis is performed and results are displayed
4. **Results are NOT saved** (analysis in real-time only)
5. User sees a suggestion to "Sign up to save your analyses"

### For Authenticated Users
1. User logs in
2. User uploads CV and job description
3. Analysis is performed with `user_id` parameter
4. **Results are automatically saved to history**
5. User can view results immediately or access them later via History page
6. User can view, download, or copy any past analysis

## Technical Implementation

### Files Modified/Created

#### New Components:
1. **`src/components/AnalysisHistory.tsx`**
   - Main history component
   - Displays all user analyses
   - Handles loading, error states, and empty states
   - Includes detailed view modal

2. **`src/pages/HistoryPage.tsx`**
   - Dedicated page wrapper for history
   - Includes navigation back to home

#### Modified Files:
1. **`src/lib/api.ts`**
   - Added `userId` parameter to `uploadResumeAndJob()` method
   - Added `getAnalysisHistory()` method for fetching user history

2. **`src/pages/App.tsx`**
   - Added `/history` route
   - Integrated `useAuth` hook in LandingPageContent
   - Passes `userId` to API when user is authenticated

3. **`src/components/Header.tsx`**
   - Added "History" button for authenticated users
   - Available in both desktop and mobile menus
   - Uses Clock icon for visual consistency

4. **`src/components/index.ts`**
   - Exported new `AnalysisHistory` component

### API Integration

The frontend integrates with your FastAPI backend endpoints:

#### Analysis with History Saving:
```typescript
// When user is logged in
const response = await apiService.uploadResumeAndJob(
  resumeFile, 
  jobDescription, 
  'gpt-4o-mini',
  userId  // ← Automatically saves to history
)
```

#### Fetching History:
```typescript
// Fetch user's analysis history
const history = await apiService.getAnalysisHistory(userId)
```

### Backend Endpoints Used

1. **`POST /match/upload`**
   - Parameters: `resume_file`, `job_description`, `model`, `user_id` (optional)
   - When `user_id` is provided, analysis is saved to history
   - Returns: Full analysis response

2. **`GET /history/analyses/{user_id}`**
   - Returns: Array of past analyses for the user
   - Includes: `id`, `tailored_resume`, `job_text`, `score`, `created_at`

## UI/UX Features

### History List View
- **Score Badges**: Color-coded based on score (green: 80+, yellow: 60-79, red: <60)
- **Date Display**: Formatted timestamps for easy reference
- **Job Preview**: First 200 characters of job description
- **Resume Preview**: Formatted code block with first 200 characters
- **Action Buttons**: View Details, Download
- **Animated Score Bar**: Visual representation of compatibility score

### Detail Modal
- **Full Job Description**: Complete text of the job posting
- **Complete Tailored Resume**: Full optimized resume text
- **Copy to Clipboard**: One-click copy functionality
- **Download**: Save analysis as text file
- **Responsive Design**: Works on all screen sizes

### Empty States
- **No History**: Friendly message with CTA to analyze first CV
- **Not Logged In**: Clear message explaining login requirement
- **Error State**: User-friendly error messages with retry option
- **Loading State**: Smooth loading spinner

## Security Considerations

1. **Authentication**: Users can only access their own history
2. **No Sensitive Data**: History is fetched directly from backend
3. **Session Management**: Uses existing auth context
4. **HTTPS**: All API calls should use HTTPS in production

## Future Enhancements

Potential improvements for v2:

1. **Delete History**: Allow users to delete individual analyses
2. **Export Options**: Export as PDF, DOCX, or multiple formats
3. **Comparison View**: Compare multiple analyses side-by-side
4. **Search/Filter**: Search through past analyses
5. **Tags/Categories**: Organize analyses by job type or company
6. **Analytics**: Show trends in scores over time
7. **Bulk Operations**: Download or delete multiple analyses at once
8. **Share Analysis**: Generate shareable links for analyses

## Testing

### Manual Testing Checklist

#### Anonymous User:
- [ ] Can analyze CV without login
- [ ] Results are displayed correctly
- [ ] "Sign up" suggestion is shown
- [ ] No history is saved

#### Authenticated User:
- [ ] Can see "History" button in header
- [ ] Analysis is automatically saved
- [ ] Can view history at `/history`
- [ ] All past analyses are displayed
- [ ] Can view details of each analysis
- [ ] Can copy resume to clipboard
- [ ] Can download analysis
- [ ] Empty state shows when no history
- [ ] Loading state shows while fetching
- [ ] Error state shows on failure

#### Navigation:
- [ ] Can navigate to history from header
- [ ] Can navigate back from history page
- [ ] Mobile menu shows history link
- [ ] History link not shown when logged out

## Deployment Notes

1. **Backend Setup**: Ensure your FastAPI backend is running and accessible
2. **API URL**: Update `src/lib/config.ts` with production API URL
3. **CORS**: Ensure backend allows requests from your frontend domain
4. **Authentication**: Verify auth tokens are properly handled
5. **Database**: Ensure history table exists in your database

## Environment Variables

No additional environment variables required. Uses existing configuration:

```typescript
// src/lib/config.ts
export const config = {
  api: {
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
    // ...
  }
}
```

## Support

For issues or questions:
1. Check browser console for API errors
2. Verify backend is running and accessible
3. Check network tab for failed requests
4. Ensure user is properly authenticated
5. Verify user_id is being sent correctly

## Changelog

### Version 1.0.0 (Current)
- ✅ Initial release
- ✅ Automatic history saving for authenticated users
- ✅ History dashboard with list and detail views
- ✅ Header navigation integration
- ✅ Mobile responsive design
- ✅ Copy and download functionality
- ✅ Empty and error states
- ✅ Loading indicators

---

**Note**: This feature requires the FastAPI backend to be running with the history endpoints implemented as documented in your `API_INTEGRATION.md` file.

