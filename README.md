# AnalystHub - Analytics Career Development Platform

A comprehensive platform designed to accelerate analytics careers through proven strategies, tools, and resources. Built with Next.js, TypeScript, and Clerk authentication.

## Features

### 🎯 Core Value Proposition
- **$29.99/month** for unlimited access to all courses, tools, and resources
- **$99 Mock Interviews** - 1-hour realistic practice sessions
- **$99 Career Coaching** - Personalized 1:1 strategy sessions

### 🛡️ Authentication & Access Control
- Secure authentication with Clerk
- Protected routes for paid content
- Free trial access for new users
- Seamless sign-up and onboarding flow

### 📚 Content & Resources
- **Technical Skills**: SQL, Python, Machine Learning, Tableau, Power BI, Looker
- **Career Development**: Resume templates, interview prep, salary negotiation
- **Business Skills**: Executive communication, data storytelling, project management
- **Industry Insights**: Real-world case studies from Fortune 100 companies

### 🔧 Career Tools
- Resume Builder with professional templates
- Interview Preparation with technical/behavioral questions
- Salary Calculator with market rates
- Career Path Planner with progression roadmaps
- Portfolio Builder for showcasing projects
- Negotiation Toolkit with scripts and strategies

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Authentication**: Clerk
- **Icons**: Heroicons
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Clerk account for authentication

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd analyst-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Clerk Authentication**
   - Create a Clerk account at [clerk.com](https://clerk.com)
   - Create a new application
   - Copy your API keys

4. **Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Clerk Auth Keys
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
   CLERK_SECRET_KEY=sk_test_your_secret_key_here

   # Clerk URLs
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Authentication Flow

### Public Access
- **Landing Page** (`/`) - Marketing content and pricing
- **Sign In/Up** - Clerk authentication modals

### Protected Content (Requires Authentication)
- **Dashboard** (`/dashboard`) - User overview and progress
- **Tools** (`/tools`) - Career development tools
- **Resources** (`/resources`) - Templates and guides  
- **Learning** (`/learning`) - Courses and training
- **Industry** (`/industry`) - Case studies and insights

### Route Protection
The app uses Clerk middleware to automatically protect routes:
- Unauthenticated users are redirected to sign-in
- Authenticated users are redirected to dashboard from home page
- All protected content requires active subscription (future: Stripe integration)

## Pricing Model

### Subscription Tier
- **$29.99/month** - Full platform access
- 30-day free trial
- Cancel anytime
- Access to all courses, tools, and resources

### Premium Services (Add-ons)
- **Mock Interview** - $99/session (1 hour)
- **Career Coaching** - $99/session (1 hour)

## Development

### Project Structure
```
src/
├── app/                 # Next.js app router pages
│   ├── dashboard/       # Protected dashboard
│   ├── tools/          # Career tools
│   ├── resources/      # Templates & guides
│   ├── learning/       # Courses
│   └── industry/       # Case studies
├── components/         # Reusable components
└── middleware.ts       # Clerk auth middleware
```

### Key Components
- **Navigation** - Dynamic auth-aware navigation
- **Dashboard** - User overview and progress tracking
- **Protected Pages** - Content requiring authentication

### Styling
The app uses a custom dark theme with green accents:
- **Primary**: Green (#10b981)
- **Background**: Dark gray (#0a0a0a)
- **Glass effects**: Backdrop blur with transparency
- **Gradients**: Green accent gradients for CTAs

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Environment Variables for Production
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_your_live_key
CLERK_SECRET_KEY=sk_live_your_live_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up  
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

## Future Enhancements

- [ ] Stripe integration for subscription management
- [ ] Progress tracking and course completion
- [ ] User-generated content and community features
- [ ] Mobile app with React Native
- [ ] Advanced analytics dashboard
- [ ] AI-powered career recommendations

## Analytics Career Background

This platform is built based on real experience:
- **10+ years** in analytics across education, retail, CPG, and real estate
- **Fortune 100 experience** with proven track record
- **$55k → $110k+** salary growth in first year
- **Real project examples**: Risk segmentation, predictive HVAC maintenance, security analytics

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Support

For questions or support:
- Create an issue in this repository
- Contact: [your-email@domain.com]
