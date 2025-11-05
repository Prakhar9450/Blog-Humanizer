# 🤖✨ Blog Humanizer

Transform AI-generated content into natural, human-like text with the power of Groq's LLaMA 3.3 model.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=flat-square&logo=tailwindcss)
![Firebase](https://img.shields.io/badge/Firebase-Auth-orange?style=flat-square&logo=firebase)
![Groq](https://img.shields.io/badge/Groq-API-purple?style=flat-square)

## 📖 Overview

Blog Humanizer is a modern web application that helps content creators transform AI-generated text into natural, engaging content that sounds authentically human. Built with Next.js 14 and powered by Groq's lightning-fast LLaMA 3.3 model, it offers multiple tone options and real-time processing.

### ✨ Key Features

- 🎯 **Multiple Tone Options**: Casual, Professional, Friendly, Formal, and Creative
- ⚡ **Lightning Fast**: Powered by Groq's optimized inference engine
- 🔒 **Secure Authentication**: Google Sign-in with Firebase
- 📱 **Fully Responsive**: Works seamlessly on mobile, tablet, and desktop
- ✍️ **Editable Output**: Refine the humanized text before copying
- 📋 **Copy & Download**: Easy clipboard copy and .txt file export
- 🎨 **Modern UI**: Beautiful interface with ShadCN UI components
- 🔐 **Protected Routes**: Authentication required for humanizer access

## 🚀 Live Demo

https://blog-humanizer.vercel.app/

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: ShadCN UI (Radix UI primitives)
- **Icons**: Lucide React

### Backend

- **API Routes**: Next.js API Routes
- **AI Model**: Groq API (LLaMA 3.3 70B Versatile)
- **Authentication**: Firebase Authentication

### Development

- **Package Manager**: npm
- **Linting**: ESLint
- **Type Checking**: TypeScript

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: 18.x or higher
- **npm**: 9.x or higher
- **Git**: For cloning the repository

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/blog-humanizer.git
cd blog-humanizer
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Groq API Configuration
GROQ_API_KEY=your_groq_api_key_here

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
```

> 📚 **Need detailed setup instructions?** Check out [SETUP_GUIDE.md](./SETUP_GUIDE.md)

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Usage

### Basic Workflow

1. **Sign In**: Click "Login" and authenticate with your Google account
2. **Enter Text**: Paste your AI-generated content (up to 5,000 characters)
3. **Select Tone**: Choose from 5 different tones:
   - **Casual**: Conversational and relaxed
   - **Professional**: Polished and business-like
   - **Friendly**: Warm and approachable
   - **Formal**: Academic and structured
   - **Creative**: Expressive and imaginative
4. **Humanize**: Click the "Humanize Text" button
5. **Review & Edit**: Review the output and make any adjustments
6. **Copy or Download**: Use the output as needed

### Example

**Input (AI-generated):**

```
Artificial intelligence represents a transformative technology that enables
machines to perform tasks requiring human intelligence. It encompasses various
subfields including machine learning and natural language processing.
```

**Output (Casual tone):**

```
AI is pretty much a game-changer in tech. It lets computers do things that
normally need human smarts - like understanding language, recognizing patterns,
and making decisions. Think of it as teaching machines to think more like us!
```

## 📁 Project Structure

```
Blog-Humanizer/
├── app/
│   ├── api/
│   │   └── humanize/
│   │       └── route.ts          # API endpoint for humanization
│   ├── humanize/
│   │   └── page.tsx              # Main humanizer interface
│   ├── login/
│   │   └── page.tsx              # Login page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles
├── components/
│   ├── Navbar.tsx                # Navigation bar
│   ├── Sidebar.tsx               # Sidebar navigation
│   ├── TextInput.tsx             # Input textarea component
│   ├── ToneSelector.tsx          # Tone selection dropdown
│   ├── OutputBox.tsx             # Output display component
│   └── ui/                       # ShadCN UI components
├── context/
│   └── AuthContext.tsx           # Authentication context
├── lib/
│   ├── groq.ts                   # Groq API integration
│   ├── firebase.ts               # Firebase configuration
│   └── utils.ts                  # Utility functions
├── .env.local                    # Environment variables (not in git)
├── package.json                  # Dependencies
└── tsconfig.json                 # TypeScript configuration
```

## 🔑 API Configuration

### Groq API

1. Visit [Groq Console](https://console.groq.com/)
2. Sign up or log in
3. Navigate to [API Keys](https://console.groq.com/keys)
4. Create a new API key
5. Add to `.env.local` as `GROQ_API_KEY`

**Benefits:**

- ⚡ Lightning-fast inference
- 🆓 Generous free tier
- 🚀 Optimized for LLaMA models

### Firebase Authentication

1. Visit [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Google Authentication
4. Get your config from Project Settings
5. Add credentials to `.env.local`

> 📚 **Detailed instructions:** See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)

## 🧪 Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🎨 Customization

### Adding New Tones

Edit `lib/groq.ts` to add custom tone instructions:

```typescript
const toneInstructions: Record<string, string> = {
  casual: "casual and conversational",
  professional: "professional and polished",
  yourTone: "your custom instructions",
};
```

Then update `components/ToneSelector.tsx` to include the new option.

### Styling

The project uses TailwindCSS with custom configuration in `tailwind.config.ts`. Modify the theme to customize colors, spacing, and other design tokens.

## 🔒 Security

- ✅ Environment variables are never exposed to the client
- ✅ API keys stored securely in `.env.local`
- ✅ Authentication required for humanizer access
- ✅ Firebase handles secure user sessions
- ✅ `.env.local` is git-ignored

## 🐛 Troubleshooting

### Common Issues

**"Invalid API key" error**

- Verify your Groq API key is correct in `.env.local`
- Restart the development server after adding the key

**"Firebase configuration not found"**

- Ensure all `NEXT_PUBLIC_FIREBASE_*` variables are set
- Check that variable names are spelled correctly
- Restart the server

**"Rate limit exceeded"**

- Wait a moment before trying again
- Consider upgrading your Groq plan for higher limits

**Authentication not working**

- Verify Google Sign-in is enabled in Firebase Console
- Check authorized domains in Firebase settings
- Clear browser cache and cookies

> 📚 **More help:** See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed troubleshooting

## 📊 Performance

- **Average Response Time**: 2-4 seconds
- **Character Limit**: 5,000 characters per request
- **Concurrent Users**: Depends on Groq API plan
- **Model**: LLaMA 3.3 70B Versatile (optimized for speed)

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in project settings
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

> ⚠️ **Remember:** Add environment variables to your deployment platform

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Groq](https://groq.com/) for blazing-fast AI inference
- [Meta](https://ai.meta.com/) for the LLaMA model
- [Firebase](https://firebase.google.com/) for authentication
- [Vercel](https://vercel.com/) for Next.js framework
- [ShadCN](https://ui.shadcn.com/) for beautiful UI components

## 📞 Support

- **Documentation**: Check out the docs in this repository
- **Issues**: Open an issue on GitHub
- **Discussions**: Use GitHub Discussions for questions

## 🗺️ Roadmap

- [ ] Support for more AI models
- [ ] Batch processing for multiple texts
- [ ] History and favorites system
- [ ] Usage analytics dashboard
- [ ] API rate limiting per user
- [ ] Dark mode support
- [ ] Export to multiple formats (PDF, DOCX)
- [ ] Browser extension

## 📝 Documentation

- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Detailed setup instructions
- [GROQ_SETUP.md](./GROQ_SETUP.md) - Groq API configuration
- [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) - Firebase authentication setup
- [PROJECT_STATUS.md](./PROJECT_STATUS.md) - Development progress and status
- [INTERVIEW_PREP.md](./INTERVIEW_PREP.md) - Technical interview preparation

---

<div align="center">
  <p>Built with ❤️ using Next.js and Groq</p>
  <p>
    <a href="#-blog-humanizer">Back to Top</a>
  </p>
</div>
