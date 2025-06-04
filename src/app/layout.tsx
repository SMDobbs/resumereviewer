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
