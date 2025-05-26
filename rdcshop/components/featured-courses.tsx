"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Star, Clock, Users, Play, BookOpen } from "lucide-react"

const courses = [
  {
    id: 1,
    title: "HSC Physics Complete Course",
    instructor: "Dr. Rahman Ahmed",
    rating: 4.9,
    students: 12500,
    duration: "120 hours",
    price: 2500,
    originalPrice: 3500,
    image: "/placeholder.svg?height=200&width=300",
    category: "HSC",
    level: "Intermediate",
    isLive: true,
    isFree: false,
    lessons: 45,
    badge: "Best Seller",
  },
  {
    id: 2,
    title: "Medical Admission Complete Preparation",
    instructor: "Prof. Fatima Khan",
    rating: 4.8,
    students: 8900,
    duration: "200 hours",
    price: 4500,
    originalPrice: 6000,
    image: "/placeholder.svg?height=200&width=300",
    category: "Medical",
    level: "Advanced",
    isLive: true,
    isFree: false,
    lessons: 78,
    badge: "Popular",
  },
  {
    id: 3,
    title: "IELTS Speaking Masterclass",
    instructor: "Sarah Johnson",
    rating: 4.7,
    students: 5600,
    duration: "40 hours",
    price: 0,
    originalPrice: 0,
    image: "/placeholder.svg?height=200&width=300",
    category: "IELTS",
    level: "Beginner",
    isLive: false,
    isFree: true,
    lessons: 20,
    badge: "Free",
  },
  {
    id: 4,
    title: "Web Development Bootcamp",
    instructor: "Md. Karim Hassan",
    rating: 4.9,
    students: 3400,
    duration: "80 hours",
    price: 3000,
    originalPrice: 4000,
    image: "/placeholder.svg?height=200&width=300",
    category: "Programming",
    level: "Beginner",
    isLive: true,
    isFree: false,
    lessons: 35,
    badge: "New",
  },
]

export function FeaturedCourses() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "HSC", "Medical", "Engineering", "IELTS", "Programming", "Skills"]

  const filteredCourses =
    selectedCategory === "All" ? courses : courses.filter((course) => course.category === selectedCategory)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(filteredCourses.length / 2))
  }

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + Math.ceil(filteredCourses.length / 2)) % Math.ceil(filteredCourses.length / 2),
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Featured Courses</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our most popular courses designed by expert instructors to help you achieve your goals
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Overlays */}
                    <div className="absolute top-3 left-3">
                      <Badge
                        variant={course.badge === "Free" ? "secondary" : "default"}
                        className={`
                          ${course.badge === "Best Seller" ? "bg-orange-500" : ""}
                          ${course.badge === "Popular" ? "bg-green-500" : ""}
                          ${course.badge === "New" ? "bg-blue-500" : ""}
                          ${course.badge === "Free" ? "bg-gray-500" : ""}
                        `}
                      >
                        {course.badge}
                      </Badge>
                    </div>

                    {course.isLive && (
                      <div className="absolute top-3 right-3">
                        <Badge variant="destructive" className="bg-red-500">
                          <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse" />
                          Live
                        </Badge>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button size="sm" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
                        <Play className="w-4 h-4 mr-1" />
                        Preview
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {course.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {course.level}
                      </Badge>
                    </div>

                    <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </h3>

                    <p className="text-sm text-gray-600">by {course.instructor}</p>

                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        {course.rating}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {course.students.toLocaleString()}
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-1" />
                        {course.lessons}
                      </div>
                    </div>

                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {course.duration}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                  <div className="w-full space-y-3">
                    <div className="flex items-center justify-between">
                      {course.isFree ? (
                        <span className="text-2xl font-bold text-green-600">Free</span>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-gray-900">৳{course.price.toLocaleString()}</span>
                          {course.originalPrice > course.price && (
                            <span className="text-sm text-gray-500 line-through">
                              ৳{course.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <Button className="w-full" size="sm">
                      {course.isFree ? "Enroll Free" : "Enroll Now"}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="px-8">
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  )
}
