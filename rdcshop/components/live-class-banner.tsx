"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Calendar, Clock, Users, Bell } from "lucide-react"

const upcomingClasses = [
  {
    id: 1,
    title: "HSC Physics - Wave Motion",
    instructor: "Dr. Rahman Ahmed",
    time: "8:00 PM",
    date: "Today",
    duration: "1.5 hours",
    students: "2,500+",
    isLive: false,
    subject: "Physics",
  },
  {
    id: 2,
    title: "IELTS Speaking Practice",
    instructor: "Sarah Johnson",
    time: "9:00 PM",
    date: "Today",
    duration: "1 hour",
    students: "1,200+",
    isLive: true,
    subject: "IELTS",
  },
  {
    id: 3,
    title: "Math Problem Solving",
    instructor: "Prof. Karim Hassan",
    time: "7:00 PM",
    date: "Tomorrow",
    duration: "2 hours",
    students: "3,100+",
    isLive: false,
    subject: "Mathematics",
  },
]

export function LiveClassBanner() {
  return (
    <section className="bg-gradient-to-r from-purple-900 to-indigo-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">আজকের লাইভ ক্লাস</h2>
            <p className="text-xl text-purple-200">বিশেষজ্ঞ শিক্ষকদের সাথে লাইভ ক্লাসে অংশগ্রহণ করুন</p>
          </div>

          {/* Live Classes Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingClasses.map((classItem) => (
              <Card
                key={classItem.id}
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all group"
              >
                <CardContent className="p-6 text-white">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <Badge className={`${classItem.isLive ? "bg-red-500 animate-pulse" : "bg-blue-500"}`}>
                        {classItem.isLive && <div className="w-2 h-2 bg-white rounded-full mr-1" />}
                        {classItem.isLive ? "Live Now" : "Upcoming"}
                      </Badge>
                      <Badge variant="outline" className="border-white/30 text-white">
                        {classItem.subject}
                      </Badge>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold">{classItem.title}</h3>
                      <p className="text-purple-200">by {classItem.instructor}</p>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 text-sm text-purple-200">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{classItem.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>
                          {classItem.time} ({classItem.duration})
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>{classItem.students} joined</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2 pt-2">
                      {classItem.isLive ? (
                        <Button className="flex-1 bg-red-600 hover:bg-red-700">
                          <Play className="w-4 h-4 mr-1" />
                          Join Live
                        </Button>
                      ) : (
                        <>
                          <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                            <Bell className="w-4 h-4 mr-1" />
                            Set Reminder
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button
              size="lg"
              className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold"
            >
              সকল লাইভ ক্লাস দেখুন
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
