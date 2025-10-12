# Installation Guide - Resume Job Matcher

Thank you for purchasing Resume Job Matcher from CodeCanyon! This guide will help you set up and deploy the application.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** version 18.0.0 or higher
- **npm** version 8.0.0 or higher (comes with Node.js)
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A code editor (VS Code, Sublime Text, etc.)

## 🚀 Quick Start

### Step 1: Extract Files

Extract the downloaded ZIP file to your desired location on your computer.

### Step 2: Install Dependencies

Open a terminal/command prompt in the project directory and run:

```bash
npm install
```

This will install all required dependencies. It may take a few minutes.

### Step 3: Configure Environment Variables

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open the `.env` file in your code editor and update the values:

   **Required Configuration:**
   ```env
   # Your backend API URL
   REACT_APP_API_BASE_URL=https://your-backend-api.com
   
   # Stripe Configuration (for payments)
   REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
   REACT_APP_STRIPE_PRICE_ID=price_your_price_id_here
   ```

   **Optional Configuration:**
   ```env
   REACT_APP_API_TIMEOUT=120000
   REACT_APP_APP_NAME="Resume Job Matcher"
   REACT_APP_ENVIRONMENT=production
   REACT_APP_ENABLE_MOCK_DATA=false
   ```

### Step 4: Start Development Server

```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

### Step 5: Build for Production

When ready to deploy, create a production build:

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🔧 Configuration Details

### Backend API Setup

This frontend application requires a backend API. The backend handles:
- Resume and job description analysis
- User authentication
- Payment processing
- Analysis history storage

**Backend API Endpoints Required:**
- `POST /match/upload` - Resume matching analysis
- `GET /health` - Health check
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user
- `POST /auth/refresh` - Refresh token

See `API_INTEGRATION.md` for detailed API documentation.

### Stripe Configuration

To enable payment features:

1. Create a Stripe account at https://stripe.com
2. Get your publishable key from https://dashboard.stripe.com/apikeys
3. Create a product and price at https://dashboard.stripe.com/products
4. Copy the price ID to your `.env` file

### Mock Data Mode

For development or testing without a backend:

Set in `.env`:
```env
REACT_APP_ENABLE_MOCK_DATA=true
```

This enables mock data for testing the UI without a real backend.

## 📦 Deployment

### Deployment to Netlify

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Deploy:
   ```bash
   netlify deploy --prod
   ```

### Deployment to Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel --prod
   ```

### Deployment to AWS S3

1. Build the project:
   ```bash
   npm run build
   ```

2. Upload the `build` folder contents to your S3 bucket

3. Configure S3 bucket for static website hosting

4. Set up CloudFront distribution (optional, for CDN)

### Deployment to cPanel

1. Build the project:
   ```bash
   npm run build
   ```

2. Compress the `build` folder contents to a ZIP file

3. Upload to your cPanel File Manager

4. Extract in your public_html or desired directory

5. Configure `.htaccess` for React Router:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteCond %{REQUEST_FILENAME} !-l
     RewriteRule . /index.html [L]
   </IfModule>
   ```

## 🛠️ Troubleshooting

### Port Already in Use

If port 3000 is already in use:
```bash
PORT=3001 npm start
```

### Node Version Issues

Check your Node.js version:
```bash
node --version
```

If it's below 18.0.0, upgrade Node.js from https://nodejs.org

### Build Errors

Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Environment Variables Not Working

- Ensure `.env` file is in the project root
- Restart the development server after changing `.env`
- Variables must start with `REACT_APP_`

## 📚 Additional Documentation

- `README.md` - Project overview and features
- `API_INTEGRATION.md` - Backend API integration details
- `JWT_AUTH.md` - Authentication system documentation
- `STRIPE_SETUP.md` - Stripe payment setup guide
- `HISTORY_FEATURE.md` - Analysis history feature documentation

## 💡 Tips for Production

1. **Security:**
   - Never commit `.env` file
   - Use HTTPS for production deployment
   - Keep API keys secure
   - Enable CORS properly on backend

2. **Performance:**
   - Use CDN for static assets
   - Enable gzip compression
   - Set proper cache headers
   - Optimize images

3. **SEO:**
   - Update meta tags in `public/index.html`
   - Add sitemap.xml
   - Configure robots.txt
   - Use proper Open Graph tags

4. **Analytics:**
   - Add Google Analytics ID
   - Set up error tracking (Sentry, etc.)
   - Monitor performance

## 🆘 Support

If you encounter any issues:

1. Check the documentation files
2. Review the troubleshooting section
3. Contact support through CodeCanyon

**Support includes:**
- Installation assistance
- Configuration help
- Bug fixes
- Documentation clarification

**Support does NOT include:**
- Customization services
- New feature development
- Server setup/maintenance
- Third-party service configuration

## 📄 License

This item is licensed under the Envato Market License.
See `LICENSE` file for complete terms.

## 🔄 Updates

To update to the latest version:

1. Download the latest version from CodeCanyon
2. Backup your current `.env` and custom changes
3. Replace files (except `.env`)
4. Run `npm install` to update dependencies
5. Test thoroughly before deploying

---

**Version:** 1.0.0  
**Last Updated:** October 2024  
**Author Support:** Available through CodeCanyon

Thank you for choosing Resume Job Matcher! 🎉
