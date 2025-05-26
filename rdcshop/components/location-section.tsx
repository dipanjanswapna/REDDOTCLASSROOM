"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Users, BookOpen, Award } from "lucide-react"

const locations = [
  { name: "উত্তরা", students: "৫,০০০+", icon: MapPin },
  { name: "পান্থপথ", students: "৭,৫০০+", icon: MapPin },
  { name: "মিরপুর", students: "৪,২০০+", icon: MapPin },
  { name: "মতিঝিল", students: "৬,৮০০+", icon: MapPin },
  { name: "চট্টগ্রাম, সিলেট", students: "৩,৫০০+", icon: MapPin },
]

export function LocationSection() {
  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">অনলাইন ও লাইভ ক্লাসের শিক্ষার্থীদের ইতিবৃত্তে</h2>
        <h3 className="text-2xl text-gray-300">নিয়ে আমরা এখন অফলাইনে</h3>
      </div>

      {/* Location Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {locations.map((location, index) => (
          <Card
            key={index}
            className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all cursor-pointer group"
          >
            <CardContent className="p-6 text-center">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <location.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{location.name}</h4>
                  <p className="text-sm text-gray-400">{location.students} শিক্ষার্থী</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats Section */}
      <Card className="bg-gradient-to-r from-red-900 to-red-800 border-0 text-white">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold">অফলাইন সেন্টার</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <Users className="w-12 h-12 mx-auto text-yellow-400" />
                <div className="text-3xl font-bold">২৭,০০০+</div>
                <div className="text-red-200">মোট শিক্ষার্থী</div>
              </div>

              <div className="space-y-2">
                <BookOpen className="w-12 h-12 mx-auto text-yellow-400" />
                <div className="text-3xl font-bold">৫০+</div>
                <div className="text-red-200">কোর্স</div>
              </div>

              <div className="space-y-2">
                <Award className="w-12 h-12 mx-auto text-yellow-400" />
                <div className="text-3xl font-bold">৯৫%</div>
                <div className="text-red-200">সফলতার হার</div>
              </div>
            </div>

            <Button className="bg-white text-red-900 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold">
              নিকটতম সেন্টার খুঁজুন
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
