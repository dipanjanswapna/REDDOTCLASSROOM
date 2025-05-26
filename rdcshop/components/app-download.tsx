"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Smartphone, Download, Star, Users, CheckCircle, Play } from "lucide-react"

const features = [
  "Offline video downloads",
  "Push notifications for live classes",
  "AI-powered study reminders",
  "Interactive practice tests",
  "Progress tracking",
  "Dark mode support",
]

const appStats = [
  { icon: Download, label: "Downloads", value: "100K+" },
  { icon: Star, label: "Rating", value: "4.8/5" },
  { icon: Users, label: "Active Users", value: "50K+" },
]

export function AppDownload() {
  const handleDownload = (platform: string) => {
    // Simulate app download
    alert(`Redirecting to ${platform} store...`)
  }

  return (
    <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-white/20 text-white border-white/30">
                <Smartphone className="w-4 h-4 mr-1" />
                Mobile App Available
              </Badge>

              <h2 className="text-3xl lg:text-4xl font-bold">Learn Anywhere, Anytime with Our Mobile App</h2>

              <p className="text-xl text-purple-100">
                Download the EduLMS mobile app and take your learning on the go. Access all courses, live classes, and
                practice tests from your smartphone.
              </p>
            </div>

            {/* App Stats */}
            <div className="grid grid-cols-3 gap-6">
              {appStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-purple-200">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold mb-4">App Features:</h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-purple-100">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-black text-white hover:bg-gray-800 flex items-center space-x-2"
                onClick={() => handleDownload("Google Play")}
              >
                <Play className="w-5 h-5" />
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="font-semibold">Google Play</div>
                </div>
              </Button>

              <Button
                size="lg"
                className="bg-black text-white hover:bg-gray-800 flex items-center space-x-2"
                onClick={() => handleDownload("App Store")}
              >
                <div className="w-5 h-5 bg-white text-black rounded flex items-center justify-center text-xs font-bold">
                  A
                </div>
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="font-semibold">App Store</div>
                </div>
              </Button>
            </div>

            {/* QR Code */}
            <div className="flex items-center space-x-4">
              <div className="bg-white p-3 rounded-lg">
                <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-xs text-gray-600">QR Code</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-purple-200">Scan QR code to download</p>
                <p className="text-xs text-purple-300">Available for Android & iOS</p>
              </div>
            </div>
          </div>

          {/* Right Content - Phone Mockup */}
          <div className="relative">
            <div className="relative mx-auto max-w-sm">
              {/* Phone Frame */}
              <div className="bg-gray-900 rounded-3xl p-2 shadow-2xl">
                <div className="bg-white rounded-2xl overflow-hidden">
                  {/* Phone Screen */}
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 h-96">
                    {/* Status Bar */}
                    <div className="flex justify-between items-center text-xs text-gray-600 mb-4">
                      <span>9:41</span>
                      <div className="flex space-x-1">
                        <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
                        <div className="w-4 h-2 bg-gray-300 rounded-sm"></div>
                        <div className="w-4 h-2 bg-gray-300 rounded-sm"></div>
                      </div>
                    </div>

                    {/* App Header */}
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">E</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">EduLMS</h3>
                        <p className="text-xs text-gray-600">Learning Platform</p>
                      </div>
                    </div>

                    {/* App Content Preview */}
                    <div className="space-y-3">
                      <Card className="p-3 shadow-sm">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-medium">Physics Live Class</p>
                            <p className="text-xs text-gray-500">Starting in 5 min</p>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-3 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-medium">Daily Quiz</p>
                            <p className="text-xs text-gray-500">Mathematics</p>
                          </div>
                          <Badge className="text-xs bg-green-100 text-green-800">Complete</Badge>
                        </div>
                      </Card>

                      <Card className="p-3 shadow-sm">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-blue-100 rounded"></div>
                          <div className="flex-1">
                            <p className="text-xs font-medium">Chemistry Notes</p>
                            <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                              <div className="bg-blue-600 h-1 rounded-full w-3/4"></div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-bounce">
                Free Download
              </div>
              <div className="absolute -bottom-4 -left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Offline Mode
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
