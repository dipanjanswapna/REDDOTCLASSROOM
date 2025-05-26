"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, Video, Bell, ChevronLeft, ChevronRight } from "lucide-react"

const events = [
  {
    id: 1,
    title: "Physics Webinar: Quantum Mechanics Simplified",
    date: "2025-05-26",
    time: "8:00 PM",
    duration: "2 hours",
    instructor: "Dr. Rahman Ahmed",
    type: "Live Webinar",
    category: "HSC Physics",
    attendees: 1250,
    maxAttendees: 2000,
    isLive: true,
    isFree: true,
    description: "Master the fundamentals of quantum mechanics with practical examples and interactive Q&A session.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Medical Entrance Mock Test Discussion",
    date: "2025-05-27",
    time: "7:00 PM",
    duration: "1.5 hours",
    instructor: "Prof. Fatima Khan",
    type: "Live Session",
    category: "Medical",
    attendees: 890,
    maxAttendees: 1500,
    isLive: false,
    isFree: false,
    description: "Detailed discussion of recent mock test questions with solving strategies.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "IELTS Speaking Practice Session",
    date: "2025-05-28",
    time: "6:00 PM",
    duration: "1 hour",
    instructor: "Sarah Johnson",
    type: "Interactive Session",
    category: "IELTS",
    attendees: 450,
    maxAttendees: 500,
    isLive: false,
    isFree: true,
    description: "Practice speaking with real IELTS questions and get instant feedback.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Career Guidance: Engineering vs Medical",
    date: "2025-05-29",
    time: "8:30 PM",
    duration: "1 hour",
    instructor: "Multiple Experts",
    type: "Panel Discussion",
    category: "Career",
    attendees: 2100,
    maxAttendees: 3000,
    isLive: false,
    isFree: true,
    description: "Expert panel discussion to help students choose the right career path.",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export function EventCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentEventIndex, setCurrentEventIndex] = useState(0)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  const isToday = (dateString: string) => {
    const today = new Date().toDateString()
    const eventDate = new Date(dateString).toDateString()
    return today === eventDate
  }

  const nextEvent = () => {
    setCurrentEventIndex((prev) => (prev + 1) % events.length)
  }

  const prevEvent = () => {
    setCurrentEventIndex((prev) => (prev - 1 + events.length) % events.length)
  }

  const currentEvent = events[currentEventIndex]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Upcoming Events & Live Classes</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join our live sessions, webinars, and interactive classes with expert instructors
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Featured Event */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden shadow-lg border-0">
              <div className="relative">
                <img
                  src={currentEvent.image || "/placeholder.svg"}
                  alt={currentEvent.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 left-4 flex space-x-2">
                  <Badge variant={currentEvent.isFree ? "secondary" : "default"}>
                    {currentEvent.isFree ? "Free" : "Premium"}
                  </Badge>
                  {currentEvent.isLive && (
                    <Badge variant="destructive" className="bg-red-500">
                      <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse" />
                      Live Now
                    </Badge>
                  )}
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="bg-white/90">
                    {currentEvent.category}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900">{currentEvent.title}</h3>

                  <p className="text-gray-600">{currentEvent.description}</p>

                  <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span>{formatDate(currentEvent.date)}</span>
                      {isToday(currentEvent.date) && (
                        <Badge variant="outline" className="text-xs">
                          Today
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>
                        {currentEvent.time} ({currentEvent.duration})
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Video className="w-4 h-4 text-blue-600" />
                      <span>{currentEvent.type}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span>
                        {currentEvent.attendees}/{currentEvent.maxAttendees} joined
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-3">
                      <img
                        src="/placeholder.svg?height=40&width=40"
                        alt={currentEvent.instructor}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{currentEvent.instructor}</p>
                        <p className="text-sm text-gray-600">Expert Instructor</p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Bell className="w-4 h-4 mr-1" />
                        Remind Me
                      </Button>
                      <Button size="sm">{currentEvent.isLive ? "Join Now" : "Register"}</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-center space-x-4 mt-6">
              <Button variant="outline" size="sm" onClick={prevEvent}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={nextEvent}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Event List */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">All Upcoming Events</h3>

            {events.map((event, index) => (
              <Card
                key={event.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  index === currentEventIndex ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setCurrentEventIndex(index)}
              >
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {event.category}
                      </Badge>
                      {event.isLive && (
                        <Badge variant="destructive" className="text-xs bg-red-500">
                          Live
                        </Badge>
                      )}
                    </div>

                    <h4 className="font-medium text-gray-900 line-clamp-2">{event.title}</h4>

                    <div className="space-y-1 text-xs text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{event.attendees} joined</span>
                      </div>
                    </div>

                    <Button size="sm" className="w-full text-xs">
                      {event.isLive ? "Join Now" : "Register"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button variant="outline" className="w-full">
              View All Events
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
