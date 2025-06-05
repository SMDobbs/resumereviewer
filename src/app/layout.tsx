import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { UserProvider } from "@/lib/context/UserContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Dobbs Analytics Coaching - Land Your First Analytics Role",
  description: "Get the guidance, tools, and strategies you need to break into analytics and land your first role. Proven insights from Fortune 100 analysts.",
  keywords: "analytics career, first analytics job, analytics coaching, data analyst career transition, analytics resume, analytics interview prep, SQL learning, analytics skills",
  authors: [{ name: "Dobbs Analytics Coaching" }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/icon-192.svg', sizes: '192x192', type: 'image/svg+xml' },
      { rel: 'icon', url: '/icon-512.svg', sizes: '512x512', type: 'image/svg+xml' },
    ],
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className="min-h-screen bg-gray-950 text-white antialiased">
        <UserProvider>
          <Navigation />
          <main className="pt-16">
            {children}
          </main>
        </UserProvider>
      </body>
    </html>
  );
}
