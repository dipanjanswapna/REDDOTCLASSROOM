"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Phone, MapPin } from "lucide-react"

export function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-3 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Left Content */}
          <div className="flex items-center space-x-4">
            <div className="bg-yellow-400 text-red-800 px-3 py-1 rounded-full font-bold text-sm">ফ্রি কোর্স</div>
            <div className="text-center lg:text-left">
              <div className="text-lg font-bold">AFTER SSC</div>
              <div className="text-2xl font-bold">ENGLISH</div>
            </div>
            <div className="hidden sm:block text-sm">
              <div>১৫২ দিন গর্ভে</div>
            </div>
          </div>

          {/* Center Content */}
          <div className="flex items-center space-x-2">
            <Phone className="w-5 h-5" />
            <span className="text-xl font-bold">16910</span>
          </div>

          {/* Right Content - Locations */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>উত্তরা</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>পান্থপথ</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>মিরপুর</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>মতিঝিল</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>চট্টগ্রাম, সিলেট</span>
            </div>
            <Button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-full text-sm">
              ফ্রি বুকিং
            </Button>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 lg:relative lg:top-0 lg:right-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
