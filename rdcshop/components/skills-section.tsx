"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Users } from "lucide-react"

const skillCourses = [
  {
    id: 1,
    title: "Spoken English",
    instructor: "Munzereen Shahid",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.9,
    students: "২৫,০০০+",
    badge: "IELTS",
    color: "bg-red-500",
  },
  {
    id: 2,
    title: "IELTS Course",
    instructor: "Sakib Bin Rashid",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.8,
    students: "১৮,০০০+",
    badge: "IELTS",
    color: "bg-red-500",
  },
  {
    id: 3,
    title: "English Grammar",
    instructor: "Tamim Shahriar",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.9,
    students: "৩২,০০০+",
    badge: "English",
    color: "bg-blue-500",
  },
  {
    id: 4,
    title: "Freelancing Course",
    instructor: "Sadman Sadik",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.7,
    students: "১৫,০০০+",
    badge: "Freelancing",
    color: "bg-green-500",
  },
]

export function SkillsSection() {
  return (
    <Card className="bg-gradient-to-br from-amber-900 to-orange-900 border-0 text-white overflow-hidden">
      <CardContent className="p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">পছন্দের স্কিল শিখুন, নিজেকে এগিয়ে</h2>
            <h3 className="text-xl">রাখুন সবার থেকে এগিয়ে</h3>
          </div>

          {/* Instructor Grid */}
          <div className="grid grid-cols-2 gap-4">
            {skillCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-3 hover:bg-white/20 transition-all cursor-pointer group"
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className="relative">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.instructor}
                      className="w-16 h-16 rounded-full object-cover border-2 border-white/30"
                    />
                    <Badge className={`absolute -bottom-1 -right-1 ${course.color} text-white text-xs px-2 py-0.5`}>
                      {course.badge}
                    </Badge>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-sm">{course.title}</h4>
                    <p className="text-xs text-orange-200">{course.instructor}</p>
                    <div className="flex items-center justify-center space-x-2 mt-1">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs">{course.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span className="text-xs">{course.students}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center">
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-900 rounded-full px-6"
            >
              ৩০+ টি কোর্স এবং আরো অনেক কিছু করুন →
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
