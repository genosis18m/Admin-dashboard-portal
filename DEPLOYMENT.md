# Deployment Guide for E-commerce Admin Dashboard

## ✅ Google OAuth Configured

Your Google OAuth is now set up:
- **Client ID**: `636187444822-44cf0fc074mmj7pad1nml7bghqil8uae.apps.googleusercontent.com`
- **Client Secret**: `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`
- **Status**: Active for localhost:3000

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

**Why Vercel:**
- Built specifically for Next.js
- Free tier available
- Automatic deployments
- No server management
- Easy PostgreSQL integration

**Steps:**

1. **Push to GitHub** (if not already):
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Go to https://vercel.com
   - Sign in with GitHub
   - Click "Import Project"
   - Select your repository
   - Vercel will auto-detect Next.js

3. **Add Environment Variables** in Vercel Dashboard:
   ```
   DATABASE_URL=your-production-postgres-url
   NEXTAUTH_URL=https://your-app.vercel.app
   NEXTAUTH_SECRET=generate-new-secret-for-production
   GOOGLE_CLIENT_ID=636187444822-44cf0fc074mmj7pad1nml7bghqil8uae.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=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
   ```

4. **Setup Production Database**:
   - Use Vercel Postgres (add-on)
   - Or use Neon, Supabase, Railway Postgres

5. **Update Google OAuth**:
   - Go to Google Console
   - Add production URI: `https://your-app.vercel.app/api/auth/callback/google`

6. **Deploy**: Click "Deploy" and wait ~2 minutes

---

### Option 2: Railway

**Why Railway:**
- Includes PostgreSQL
- Simple setup
- Git-based deployments

**Steps:**

1. Go to https://railway.app
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub"
4. Select repository
5. Add PostgreSQL service
6. Add environment variables
7. Deploy

---

## 📝 Pre-Deployment Checklist

- [x] Google OAuth credentials added
- [ ] Production database ready
- [ ] Environment variables configured
- [ ] Git repository up to date
- [ ] Google OAuth production URI added

## 🔐 Security Notes

**IMPORTANT:** Generate a new `NEXTAUTH_SECRET` for production:
```bash
openssl rand -base64 32
```

Never use the same secret in dev and production!

## 🌐 After Deployment

1. Update Google OAuth redirect URIs to include production URL
2. Test Google login on production
3. Run database migrations: `npx prisma migrate deploy`
4. Test all features

---

## Current Status

✅ Local development ready at http://localhost:3000
🔄 Ready for deployment to Vercel or Railway
