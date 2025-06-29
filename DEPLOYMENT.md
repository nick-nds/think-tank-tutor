# GitHub Pages Deployment Guide

## Setup Instructions

### 1. Repository Configuration

1. **Push your code to GitHub** (make sure your main branch is `main`)
2. **Go to your repository settings** on GitHub
3. **Navigate to Pages** (in the left sidebar)
4. **Set Source to "GitHub Actions"**

### 2. GitHub Actions Setup

The deployment workflow is already configured in `.github/workflows/deploy.yml`. This workflow will:

- ✅ **Automatically trigger** on pushes to the `main` branch
- ✅ **Build the Nuxt.js app** using `npm run generate`
- ✅ **Deploy to GitHub Pages** with proper static site configuration
- ✅ **Handle base URL** automatically for your repository

### 3. Repository Settings

Make sure your repository has these settings:

1. **Pages Source**: GitHub Actions
2. **Branch Protection** (optional): Protect your main branch
3. **Actions Permissions**: Allow GitHub Actions to run

### 4. Environment Variables

No environment variables are needed for this deployment. The app will automatically:

- Use the correct base URL (`/think-tank-tutor/` in production)
- Configure static site generation
- Handle client-side routing properly

### 5. Custom Domain (Optional)

If you want to use a custom domain:

1. Add a `CNAME` file to the `public` folder with your domain
2. Configure your DNS to point to GitHub Pages
3. Update the `baseURL` in `nuxt.config.ts` to `'/'`

## Deployment Process

### Automatic Deployment

Every time you push to the `main` branch:

1. ✅ **GitHub Actions triggers** the deployment workflow
2. ✅ **Dependencies installed** with `npm ci`
3. ✅ **Static site generated** with `npm run generate`
4. ✅ **Files uploaded** to GitHub Pages
5. ✅ **Site deployed** at `https://<username>.github.io/prac-calc/`

### Manual Deployment

You can also trigger deployment manually:

1. Go to **Actions** tab in your repository
2. Select **"Deploy to GitHub Pages"** workflow
3. Click **"Run workflow"** button
4. Select the branch and click **"Run workflow"**

## Accessing Your Deployed App

After successful deployment, your app will be available at:

```
https://<your-username>.github.io/think-tank-tutor/
```

Replace `<your-username>` with your actual GitHub username.

## Troubleshooting

### Common Issues

1. **404 Error**: Make sure Pages source is set to "GitHub Actions"
2. **Assets not loading**: Check that baseURL is correctly set in nuxt.config.ts
3. **Build fails**: Check the Actions tab for error logs
4. **Permission denied**: Ensure Actions have write permissions to Pages

### Checking Deployment Status

1. Go to **Actions** tab in your repository
2. Click on the latest workflow run
3. Check logs for any errors
4. Verify the deployment step completed successfully

### Local Testing

Test the production build locally before deploying:

```bash
# Generate static files
npm run generate

# Preview the generated site
npx serve dist
```

## Features Enabled

Your deployed app includes:

✅ **Client-side routing** with proper fallbacks  
✅ **LocalStorage persistence** for user settings  
✅ **Progressive Web App** capabilities  
✅ **Optimized static assets** for fast loading  
✅ **SEO-friendly** meta tags and structure  

## Updates

To update your deployed app:

1. Make changes to your code
2. Commit and push to the `main` branch
3. GitHub Actions automatically deploys the updates
4. Changes are live within 2-5 minutes

## Notes

- The app runs entirely client-side (SPA mode)
- All user data is stored locally in browser storage
- No server-side functionality required
- Perfect for GitHub Pages hosting