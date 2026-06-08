import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "FitAura — AI Fitness Coach",
  description: "Get personalized AI workouts, smart meal plans, calorie tracking, and real-time form correction. Join the waitlist for early access.",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "FitAura — AI Fitness Coach",
    description: "Personalized workouts, AI meal plans, and real-time pose correction. Join the waitlist.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "FitAura",
    applicationCategory: "HealthApplication",
    operatingSystem: "iOS, Android",
    description: "AI-powered fitness coach with personalized workouts, meal plans, calorie tracking, and real-time form correction.",
  };
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable, spaceGrotesk.variable)}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
