import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { HeaderNew } from "@/components/header-new"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { DemoAuthProvider } from "@/components/demo-auth-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EduLMS - বাংলাদেশের #১ শিক্ষা প্ল্যাটফর্ম",
  description:
    "বিশেষজ্ঞ শিক্ষক ও AI-চালিত শিক্ষার মাধ্যমে আপনার একাডেমিক লক্ষ্য অর্জন করুন। HSC, মেডিকেল, ইঞ্জিনিয়ারিং ও দক্ষতা উন্নয়নের জন্য ৫,০০,০০০+ শিক্ষার্থীর সাথে যুক্ত হন।",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bn">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <DemoAuthProvider>
            <HeaderNew />
            <main>{children}</main>
            <Footer />
          </DemoAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
