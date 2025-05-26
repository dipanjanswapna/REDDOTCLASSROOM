"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Star, Users, Clock, Play, BookOpen, AlertCircle } from "lucide-react"
import { getCourses } from "@/lib/courses"
import type { Course } from "@/lib/types"

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedLevel, setSelectedLevel] = useState<string>("all")
  const [showFreeOnly, setShowFreeOnly] = useState(false)

  const categories = [
    { value: "academic", label: "একাডেমিক", labelBn: "একাডেমিক" },
    { value: "skills", label: "স্কিলস", labelBn: "স্কিলস" },
    { value: "admission", label: "ভর্তি পরীক্ষা", labelBn: "ভর্তি পরীক্ষা" },
    { value: "language", label: "ভাষা", labelBn: "ভাষা" },
    { value: "professional", label: "প্রফেশনাল", labelBn: "প্রফেশনাল" },
  ]

  const levels = [
    { value: "beginner", label: "শুরুর স্তর", labelBn: "শুরুর স্তর" },
    { value: "intermediate", label: "মধ্যম স্তর", labelBn: "মধ্যম স্তর" },
    { value: "advanced", label: "উন্নত স্তর", labelBn: "উন্নত স্তর" },
  ]

  useEffect(() => {
    loadCourses()
  }, [selectedCategory, selectedLevel, showFreeOnly])

  const loadCourses = async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await getCourses(
        selectedCategory === "all" ? undefined : selectedCategory,
        undefined,
        selectedLevel === "all" ? undefined : selectedLevel,
        showFreeOnly || undefined,
      )

      if (result.error) {
        setError(result.error)
      } else {
        setCourses(result.courses || [])
      }
    } catch (error) {
      console.error("Error loading courses:", error)
      setError("Failed to load courses. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const filteredCourses = courses.filter(
    (course) =>
      course.titleBn?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor?.nameBn?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const renderCourseCard = (course: Course) => (
    <Card
      key={course.id}
      className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all group overflow-hidden"
    >
      <div className="relative">
        <img
          src={course.media?.thumbnail || "/placeholder.svg?height=200&width=300"}
          alt={course.titleBn || course.title || "Course"}
          className="w-full h-48 object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button size="sm" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
            <Play className="w-4 h-4 mr-1" />
            প্রিভিউ
          </Button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex space-x-2">
          {course.features?.isFree && <Badge className="bg-green-500">ফ্রি</Badge>}
          {course.features?.isLive && (
            <Badge className="bg-red-500 animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full mr-1" />
              লাইভ
            </Badge>
          )}
        </div>

        {/* Category */}
        <div className="absolute top-3 right-3">
          <Badge variant="outline" className="bg-white/90 text-gray-900">
            {categories.find((c) => c.value === course.category)?.labelBn || course.category}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-white line-clamp-2">
              {course.titleBn || course.title || "Untitled Course"}
            </h3>
            <p className="text-sm text-gray-400">
              {course.instructor?.nameBn || course.instructor?.name || "Unknown Instructor"}
            </p>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>{course.stats?.rating || 0}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{course.stats?.totalStudents?.toLocaleString() || 0}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{course.duration?.totalBn || course.duration?.total || "0 hours"}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-400">{course.content?.totalLessons || 0} টি লেসন</span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-700">
            {course.features?.isFree ? (
              <span className="text-2xl font-bold text-green-400">ফ্রি</span>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-white">৳{course.price?.toLocaleString() || 0}</span>
                {course.originalPrice && course.originalPrice > (course.price || 0) && (
                  <span className="text-sm text-gray-500 line-through">৳{course.originalPrice.toLocaleString()}</span>
                )}
              </div>
            )}
          </div>

          <Button className="w-full bg-green-600 hover:bg-green-700">
            {course.features?.isFree ? "ফ্রি এনরোল" : "এনরোল করুন"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">সকল কোর্স</h1>
          <p className="text-gray-300 text-lg">আপনার পছন্দের কোর্স খুঁজে নিন এবং আজই শেখা শুরু করুন</p>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="কোর্স বা ইন্সট্রাক্টর খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="ক্যাটেগরি" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব ক্যাটেগরি</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.labelBn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Level Filter */}
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="স্তর" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব স্তর</SelectItem>
                {levels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.labelBn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Free Filter */}
            <Button
              variant={showFreeOnly ? "default" : "outline"}
              onClick={() => setShowFreeOnly(!showFreeOnly)}
              className="border-gray-600"
            >
              <Filter className="w-4 h-4 mr-2" />
              শুধু ফ্রি কোর্স
            </Button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-900/20 border border-red-500 rounded-lg p-6 mb-8">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-6 h-6 text-red-400" />
              <div>
                <h3 className="text-lg font-semibold text-red-400">Error Loading Courses</h3>
                <p className="text-red-300">{error}</p>
                <Button onClick={loadCourses} className="mt-3 bg-red-600 hover:bg-red-700" size="sm">
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Course Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="bg-gray-800 border-gray-700 animate-pulse">
                <div className="h-48 bg-gray-700 rounded-t-lg"></div>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-700 rounded"></div>
                    <div className="h-3 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map(renderCourseCard)}
          </div>
        )}

        {/* No Results */}
        {!loading && !error && filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">কোন কোর্স পাওয়া যায়নি</h3>
            <p className="text-gray-500">অন্য ফিল্টার বা সার্চ টার্ম ব্যবহার করে দেখুন</p>
            {courses.length === 0 && (
              <div className="mt-4">
                <p className="text-gray-400 mb-3">ডেটাবেসে কোন কোর্স নেই। প্রাথমিক ডেটা যোগ করুন:</p>
                <Button onClick={() => (window.location.href = "/admin")} className="bg-blue-600 hover:bg-blue-700">
                  অ্যাডমিন প্যানেলে যান
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Load More */}
        {!loading && !error && filteredCourses.length > 0 && (
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
              আরো কোর্স লোড করুন
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
