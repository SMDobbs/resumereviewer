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
  title: "Analytics Mentor - Land Your First Analytics Role",
  description: "Get the tools, guides, and mentorship you need to land your first analytics role. From resume reviews to interview prep and skill assessments.",
  keywords: "analytics career, first analytics job, analytics mentor, data analyst career transition, analytics resume, analytics interview prep, SQL learning, analytics skills",
  authors: [{ name: "Analytics Mentor" }],
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
