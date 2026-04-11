import type { Metadata } from "next";
import { Montserrat, DM_Sans } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Aziron — Production-Ready AI Agent Platform",
  description:
    "Go-based solution for building, deploying, and scaling AI-agent systems. The execution layer between AI and real work.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${dmSans.variable}`}>
      <body className="min-h-full antialiased bg-white text-[#0F172A]">
        {children}
      </body>
    </html>
  );
}
