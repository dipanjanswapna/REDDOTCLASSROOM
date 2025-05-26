// Firebase configuration for EduLMS
// This would be your actual Firebase config

export const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "edulms-platform.firebaseapp.com",
  projectId: "edulms-platform",
  storageBucket: "edulms-platform.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id",
}

// Firestore Collections Schema
export const collections = {
  users: "users",
  courses: "courses",
  enrollments: "enrollments",
  orders: "orders",
  reviews: "reviews",
  quizzes: "quizzes",
  liveClasses: "liveClasses",
  blogs: "blogs",
  events: "events",
  coupons: "coupons",
}

// Sample data structures for Firestore
export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: "student" | "teacher" | "admin"
  avatar?: string
  enrolledCourses: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Course {
  id: string
  title: string
  description: string
  instructor: string
  instructorId: string
  category: string
  level: "Beginner" | "Intermediate" | "Advanced"
  price: number
  originalPrice: number
  duration: string
  lessons: number
  rating: number
  students: number
  image: string
  isLive: boolean
  isFree: boolean
  syllabus: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  id: string
  userId: string
  courseIds: string[]
  totalAmount: number
  couponCode?: string
  discount: number
  status: "pending" | "completed" | "cancelled"
  createdAt: Date
}

export interface Quiz {
  id: string
  courseId: string
  title: string
  questions: QuizQuestion[]
  timeLimit: number
  createdAt: Date
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}
