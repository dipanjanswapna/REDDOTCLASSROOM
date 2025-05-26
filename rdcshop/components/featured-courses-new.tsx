"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Star, Users, Clock, ChevronRight } from "lucide-react"

const featuredCourses = [
  {
    id: 1,
    title: "After SSC English Course",
    subtitle: "ইংরেজি শেখার সহজ উপায়",
    instructor: "Munzereen Shahid",
    image: "/placeholder.svg?height=120&width=200",
    instructorImage: "/placeholder.svg?height=40&width=40",
    rating: 4.9,
    students: "২৫,০০০+",
    duration: "৬ মাস",
    isLive: false,
    badge: "Popular",
    color: "from-blue-600 to-purple-600",
  },
  {
    id: 2,
    title: "Spoken English Junior",
    subtitle: "কথোপকথন ইংরেজি শিখুন",
    instructor: "Sakib Bin Rashid",
    image: "/placeholder.svg?height=120&width=200",
    instructorImage: "/placeholder.svg?height=40&width=40",
    rating: 4.8,
    students: "১৮,০০০+",
    duration: "৪ মাস",
    isLive: false,
    badge: "Trending",
    color: "from-purple-600 to-pink-600",
  },
  {
    id: 3,
    title: "Spoken English Junior LIVE ব্যাচ",
    subtitle: "লাইভ ক্লাসে ইংরেজি শিখুন",
    instructor: "Tamim Shahriar",
    image: "/placeholder.svg?height=120&width=200",
    instructorImage: "/placeholder.svg?height=40&width=40",
    rating: 4.9,
    students: "১২,০০০+",
    duration: "৩ মাস",
    isLive: true,
    badge: "Live",
    color: "from-green-600 to-teal-600",
  },
]

export function FeaturedCourses() {
  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">জনপ্রিয় কোর্সসমূহ</h2>
        <p className="text-gray-300">আমাদের সবচেয়ে জনপ্রিয় কোর্সগুলো দেখুন</p>
      </div>

      {/* Course Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {featuredCourses.map((course) => (
          <Card
            key={course.id}
            className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-300 group overflow-hidden"
          >
            <div className="relative">
              <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-48 object-cover" />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Button size="sm" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
                  <Play className="w-4 h-4 mr-1" />
                  Preview
                </Button>
              </div>

              {/* Badges */}
              <div className="absolute top-3 left-3">
                <Badge
                  className={`
                    ${course.badge === "Live" ? "bg-red-500 animate-pulse" : ""}
                    ${course.badge === "Popular" ? "bg-orange-500" : ""}
                    ${course.badge === "Trending" ? "bg-purple-500" : ""}
                  `}
                >
                  {course.isLive && <div className="w-2 h-2 bg-white rounded-full mr-1" />}
                  {course.badge}
                </Badge>
              </div>

              {/* Instructor */}
              <div className="absolute bottom-3 right-3">
                <img
                  src={course.instructorImage || "/placeholder.svg"}
                  alt={course.instructor}
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
              </div>
            </div>

            <CardContent className="p-6 text-white">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">{course.title}</h3>
                  <p className="text-gray-300 text-sm">{course.subtitle}</p>
                  <p className="text-gray-400 text-sm">by {course.instructor}</p>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-300">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{course.students}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white">
                  কোর্স দেখুন
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center">
        <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800 px-8">
          আরো কোর্স দেখুন
        </Button>
      </div>
    </section>
  )
}
