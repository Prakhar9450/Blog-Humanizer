# 🛠️ Complete Setup Guide - Blog Humanizer

This comprehensive guide will walk you through setting up the Blog Humanizer application from scratch. Follow each section carefully for a smooth setup experience.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Groq API Configuration](#groq-api-configuration)
4. [Firebase Authentication Setup](#firebase-authentication-setup)
5. [Running the Application](#running-the-application)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)
8. [Advanced Configuration](#advanced-configuration)

---

## Prerequisites

### Required Software

Before starting, ensure you have the following installed:

#### 1. Node.js and npm

**Minimum Version**: Node.js 18.x or higher

**Check your version:**

```bash
node --version
npm --version
```

**Installation:**

- Download from [nodejs.org](https://nodejs.org/)
- Or use nvm (Node Version Manager):

  ```bash
  # Install nvm (macOS/Linux)
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

  # Install and use Node.js 18
  nvm install 18
  nvm use 18
  ```

#### 2. Git

**Check if installed:**

```bash
git --version
```

**Installation:**

- Download from [git-scm.com](https://git-scm.com/)
- Or use package manager:

  ```bash
  # macOS
  brew install git

  # Ubuntu/Debian
  sudo apt-get install git

  # Windows
  # Download installer from git-scm.com
  ```

#### 3. A Code Editor

Recommended: [Visual Studio Code](https://code.visualstudio.com/)

**VS Code Extensions (Optional but Helpful):**

- ESLint
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features
- Prettier - Code formatter

### Required Accounts

You'll need accounts for:

1. **Groq** (free): [console.groq.com](https://console.groq.com/)
2. **Firebase/Google** (free): [console.firebase.google.com](https://console.firebase.google.com/)
3. **GitHub** (optional, for deployment): [github.com](https://github.com/)

---

## Initial Setup

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/blog-humanizer.git

# Navigate into the directory
cd blog-humanizer

# Verify you're in the right directory
ls
```

You should see files like `package.json`, `README.md`, etc.

### Step 2: Install Dependencies

```bash
# Install all npm packages
npm install
```

This may take 2-5 minutes depending on your internet connection.

**What gets installed:**

- Next.js framework
- React libraries
- TypeScript
- TailwindCSS
- UI components (Radix UI, ShadCN)
- Groq SDK
- Firebase SDK
- Other utilities

### Step 3: Create Environment File

```bash
# Create the environment file
touch .env.local

# Or on Windows Command Prompt:
type nul > .env.local

# Or manually create the file in your code editor
```

**Important:** This file should never be committed to Git. It's already in `.gitignore`.

---

## Groq API Configuration

Groq provides ultra-fast AI inference for the LLaMA model we use to humanize text.

### Step 1: Create Groq Account

1. Visit [console.groq.com](https://console.groq.com/)
2. Click **"Sign Up"** or **"Get Started"**
3. Sign up with your email or Google account
4. Verify your email if required

### Step 2: Generate API Key

1. Once logged in, navigate to [API Keys section](https://console.groq.com/keys)
2. Click **"Create API Key"** button
3. Give your key a name (e.g., "Blog Humanizer Dev")
4. Click **"Create"**
5. **Copy your API key immediately** - you won't be able to see it again!

Your API key will look something like:

```
gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Step 3: Add to Environment File

Open `.env.local` and add:

```bash
# Groq API Configuration
GROQ_API_KEY=your_actual_api_key_here
```

Replace `your_actual_api_key_here` with the key you just copied.

### Groq Free Tier Limits

- ✅ **Requests**: 30 requests per minute
- ✅ **Tokens**: 14,400 tokens per minute
- ✅ **Models**: Access to LLaMA 3.3 70B Versatile
- ✅ **No Credit Card Required**

---

## Firebase Authentication Setup

Firebase provides secure Google Sign-in for the application.

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** (or **"Create a project"**)
3. Enter a project name (e.g., "Blog Humanizer")
4. **Google Analytics**: Choose as desired (optional)
5. Click **"Create project"** and wait for it to initialize
6. Click **"Continue"** when ready

### Step 2: Register Web App

1. On your project dashboard, click the **Web icon** (`</>`)
2. Give your app a nickname: "Blog Humanizer Web"
3. **Do NOT** check "Set up Firebase Hosting" (unless you want to)
4. Click **"Register app"**
5. You'll see configuration code - **keep this tab open!**

The config will look like:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  appId: "1:123456789012:web:xxxxxxxxxxxx",
};
```

### Step 3: Enable Google Authentication

1. In the left sidebar, click **"Authentication"**
2. Click **"Get started"** if this is your first time
3. Go to the **"Sign-in method"** tab
4. Find **"Google"** in the providers list
5. Click on it to expand
6. Toggle the **"Enable"** switch to ON
7. Select a **"Project support email"** from dropdown
8. Click **"Save"**

### Step 4: Configure Authorized Domains

1. Still in Authentication, go to the **"Settings"** tab
2. Scroll to **"Authorized domains"**
3. `localhost` should already be there for development
4. Later, add your production domain here when deploying

### Step 5: Add Firebase Config to Environment File

Open `.env.local` and add your Firebase configuration:

```bash
# Groq API Configuration (from previous step)
GROQ_API_KEY=your_groq_api_key

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
```

**Important Notes:**

- Use the `NEXT_PUBLIC_` prefix for Firebase variables (they're used in browser)
- Do NOT use quotes around values
- Make sure there are no extra spaces

### Example Complete `.env.local` File

```bash
# Groq API Configuration
GROQ_API_KEY=gsk_abcdefghijklmnopqrstuvwxyz1234567890

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD1234567890abcdefghijklmnop
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=blog-humanizer-12345.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=blog-humanizer-12345
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

---

## Running the Application

### Step 1: Start Development Server

```bash
npm run dev
```

You should see output like:

```
   ▲ Next.js 14.2.0
   - Local:        http://localhost:3000
   - Environments: .env.local

 ✓ Ready in 2.3s
```

### Step 2: Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000)

### Step 3: Test the Application

1. You should see the landing page
2. Click **"Login"** in the navigation bar
3. You'll be redirected to the login page
4. Click **"Continue with Google"**
5. Select your Google account
6. Grant permissions when prompted
7. You should be redirected to `/humanize`

### Step 4: Try Humanizing Text

1. Paste some AI-generated text in the input box
2. Select a tone (e.g., "Casual")
3. Click **"Humanize Text"**
4. Wait 2-4 seconds for processing
5. Review the humanized output
6. Use **Copy** or **Download** buttons

---

## Testing

### Manual Testing Checklist

#### Authentication Flow

- [ ] Can access login page
- [ ] Google Sign-in popup appears
- [ ] Successfully logs in
- [ ] Redirects to `/humanize` after login
- [ ] Displays user avatar in navbar
- [ ] Can log out
- [ ] Redirects to login when accessing `/humanize` while logged out

#### Humanizer Functionality

- [ ] Can input text
- [ ] Character counter works (shows X/5000)
- [ ] Can select different tones
- [ ] "Humanize" button disabled when input is empty
- [ ] Loading state shows during processing
- [ ] Output displays after processing
- [ ] Output is different from input
- [ ] Can edit output text
- [ ] Copy button works
- [ ] Download button creates .txt file
- [ ] Error messages display when API fails

#### Responsive Design

- [ ] Works on desktop (1920px)
- [ ] Works on laptop (1366px)
- [ ] Works on tablet (768px)
- [ ] Works on mobile (375px)
- [ ] Sidebar hides on mobile
- [ ] All buttons are clickable on mobile

### Automated Testing (Optional)

If you want to add tests:

```bash
# Install testing libraries
npm install -D @testing-library/react @testing-library/jest-dom jest

# Run tests
npm test
```

---

## Troubleshooting

### Common Issues and Solutions

#### Issue 1: "npm install" fails

**Symptoms:**

```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solutions:**

```bash
# Try with legacy peer deps
npm install --legacy-peer-deps

# Or clear cache and try again
npm cache clean --force
npm install

# Or delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Issue 2: "Invalid API key" (Groq)

**Symptoms:**

- Error message: "Invalid API key. Please check your Groq API key configuration."

**Solutions:**

1. Verify the API key in `.env.local` is correct
2. Make sure there are no quotes around the key
3. Check for extra spaces or newlines
4. Restart the development server:
   ```bash
   # Press Ctrl+C to stop
   npm run dev
   ```
5. Generate a new API key if the old one doesn't work

#### Issue 3: "Firebase configuration not found"

**Symptoms:**

- Error in browser console: "Firebase: Error (auth/configuration-not-found)"

**Solutions:**

1. Ensure `.env.local` exists in project root
2. Verify all Firebase variables have the `NEXT_PUBLIC_` prefix
3. Check variable names are spelled exactly right
4. Restart the server (Ctrl+C, then `npm run dev`)
5. Clear browser cache and cookies
6. Try in incognito/private mode

#### Issue 4: "Firebase: Error (auth/unauthorized-domain)"

**Symptoms:**

- Login popup closes immediately
- Error about unauthorized domain

**Solutions:**

1. Go to Firebase Console → Authentication → Settings
2. Find **"Authorized domains"** section
3. Add `localhost` if not present
4. Wait 1-2 minutes for changes to propagate
5. Try logging in again

#### Issue 5: Port 3000 already in use

**Symptoms:**

```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solutions:**

```bash
# Option 1: Use a different port
PORT=3001 npm run dev

# Option 2: Kill the process using port 3000
# On macOS/Linux:
lsof -ti:3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Then restart
npm run dev
```

#### Issue 6: TypeScript errors

**Symptoms:**

- Red squiggly lines in VS Code
- Build fails with type errors

**Solutions:**

```bash
# Ensure TypeScript is installed
npm install --save-dev typescript

# Check tsconfig.json exists
cat tsconfig.json

# Restart TypeScript server in VS Code
# Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"

# Check for missing type definitions
npm install --save-dev @types/react @types/node
```

#### Issue 7: Styles not loading

**Symptoms:**

- Page looks unstyled
- No colors or layout

**Solutions:**

```bash
# Ensure TailwindCSS is installed
npm install -D tailwindcss postcss autoprefixer

# Check if tailwind.config.ts exists
cat tailwind.config.ts

# Restart the server
npm run dev
```

#### Issue 8: Rate limit exceeded (Groq)

**Symptoms:**

- Error: "Rate limit exceeded. Please try again in a moment."

**Solutions:**

1. Wait 60 seconds before trying again
2. Check your usage in Groq Console
3. Consider upgrading to paid plan for higher limits
4. Reduce the frequency of requests during testing

### Getting Help

If you're still stuck:

1. **Check the browser console**: Press F12 → Console tab
2. **Check the terminal**: Look for error messages where you ran `npm run dev`
3. **Review environment variables**: Make sure `.env.local` is configured correctly
4. **Try in a different browser**: Sometimes browser extensions cause issues
5. **Check file permissions**: Ensure you have read/write access to the project directory

---

## Advanced Configuration

### Custom Tone Instructions

To add custom tones, edit `lib/groq.ts`:

```typescript
const toneInstructions: Record<string, string> = {
  casual: "casual and conversational",
  professional: "professional and polished",
  friendly: "warm and friendly",
  formal: "formal and academic",
  creative: "creative and expressive",
  // Add your custom tone:
  humorous: "funny and entertaining",
};
```

Then update `components/ToneSelector.tsx` to include the new option.

### Adjusting Character Limit

To change the 5000 character limit, update these files:

**1. `components/TextInput.tsx`:**

```typescript
const MAX_CHARS = 10000; // Change from 5000
```

**2. `app/api/humanize/route.ts`:**

```typescript
if (inputText.length > 10000) {
  // Change from 5000
  // ...
}
```

### Modifying AI Parameters

In `lib/groq.ts`, adjust these parameters:

```typescript
const chatCompletion = await groq.chat.completions.create({
  model: "llama-3.3-70b-versatile",
  temperature: 0.7, // Creativity (0-2, higher = more creative)
  max_tokens: 2048, // Maximum output length
  top_p: 1, // Nucleus sampling (optional)
  frequency_penalty: 0, // Reduce repetition (optional)
  presence_penalty: 0, // Encourage new topics (optional)
});
```

### Environment-Specific Configuration

Create different env files for different environments:

```bash
.env.local           # Local development (git-ignored)
.env.development     # Development defaults
.env.production      # Production settings
```

### Deployment Configuration

For production deployment, you'll need to:

1. **Set environment variables** in your hosting platform
2. **Update Firebase authorized domains** to include your production URL
3. **Consider rate limiting** to prevent abuse
4. **Enable analytics** to track usage
5. **Set up monitoring** for errors and performance

---

## Next Steps

After completing setup:

1. ✅ Read the [README.md](./README.md) for usage instructions
2. ✅ Review [PROJECT_STATUS.md](./PROJECT_STATUS.md) for project overview
3. ✅ Check [INTERVIEW_PREP.md](./INTERVIEW_PREP.md) if using for interviews
4. ✅ Customize the application to your needs
5. ✅ Deploy to production (see Deployment section in README)

---

## Useful Commands Reference

```bash
# Development
npm run dev              # Start dev server
npm run build            # Create production build
npm run start            # Start production server
npm run lint             # Run ESLint

# Package Management
npm install              # Install all dependencies
npm install <package>    # Install a new package
npm update               # Update packages
npm outdated            # Check for outdated packages

# Git
git status              # Check changes
git add .               # Stage all changes
git commit -m "message" # Commit changes
git push                # Push to remote

# Debugging
npm run build           # Check for build errors
npm run lint -- --fix   # Auto-fix linting issues
```

---

## Resources

### Official Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Groq API Docs](https://console.groq.com/docs)
- [Firebase Auth Docs](https://firebase.google.com/docs/auth)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Community

- [Next.js GitHub](https://github.com/vercel/next.js)
- [Groq Discord](https://groq.com/discord)
- [Firebase Support](https://firebase.google.com/support)

### Video Tutorials

- [Next.js 14 Tutorial](https://www.youtube.com/results?search_query=nextjs+14+tutorial)
- [Firebase Auth Tutorial](https://www.youtube.com/results?search_query=firebase+auth+tutorial)
- [TailwindCSS Crash Course](https://www.youtube.com/results?search_query=tailwindcss+crash+course)

---

<div align="center">
  <p>📚 Setup complete! Ready to humanize some content!</p>
  <p><a href="README.md">← Back to README</a></p>
</div>

