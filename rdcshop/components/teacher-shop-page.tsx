"use client"

import { useState, useEffect } from "react"
import { AlertCircle, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  getTeacherBySlug,
  getTeacherCourses,
  getTeacherAmazonProducts,
  initializeDemoTeachers,
} from "@/lib/demo-teacher-management"

export function TeacherShopPage({ slug }: { slug: string }) {
  const [teacher, setTeacher] = useState<any>(null)
  const [courses, setCourses] = useState<any[]>([])
  const [amazonProducts, setAmazonProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadTeacherData = async () => {
      try {
        setLoading(true)

        // Initialize demo teachers if needed
        initializeDemoTeachers()

        // Get teacher data
        const teacherResult = await getTeacherBySlug(slug)
        if (teacherResult.error || !teacherResult.teacher) {
          setError("Teacher not found")
          return
        }

        setTeacher(teacherResult.teacher)

        // Get teacher courses
        const coursesResult = await getTeacherCourses(teacherResult.teacher.id)
        setCourses(coursesResult.courses || [])

        // Get Amazon products
        const productsResult = await getTeacherAmazonProducts(teacherResult.teacher.id)
        setAmazonProducts(productsResult.products || [])
      } catch (err: any) {
        console.error("Error loading teacher data:", err)
        setError("Failed to load teacher data")
      } finally {
        setLoading(false)
      }
    }

    loadTeacherData()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading teacher profile...</p>
        </div>
      </div>
    )
  }

  if (error || !teacher) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Teacher Not Found</h1>
          <p className="text-gray-400 mb-6">{error || "The requested teacher profile could not be found."}</p>
          <Button onClick={() => (window.location.href = "/")}>Return to Home</Button>
        </div>
      </div>
    )
  }

  // Rest of the component remains the same...
}
