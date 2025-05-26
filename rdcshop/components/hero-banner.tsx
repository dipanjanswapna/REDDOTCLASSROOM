"use client"

import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export function HeroBanner() {
  return (
    <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white py-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              <span className="text-white">সেখানে যাত্রা শুরু </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 relative">
                এখানেই
                <Sparkles className="absolute -top-2 -right-8 w-8 h-8 text-yellow-400 animate-pulse" />
              </span>
            </h1>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold"
            >
              অনলাইন কোর্স
            </Button>
            <Button
              size="lg"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl text-lg font-semibold"
            >
              অনলাইন কোর্স
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
