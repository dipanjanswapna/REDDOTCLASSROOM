// TypeScript interfaces for the application

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  role: "student" | "teacher" | "admin"
  enrolledCourses: string[]
  completedCourses: string[]
  preferences: {
    language: "bn" | "en"
    notifications: boolean
    theme: "light" | "dark"
  }
  profile: {
    dateOfBirth?: string
    education?: string
    interests: string[]
    location?: string
  }
  createdAt: Date
  updatedAt: Date
}

export interface Course {
  id: string
  title: string
  titleBn: string
  description: string
  descriptionBn: string
  instructor: {
    id: string
    name: string
    nameBn: string
    avatar: string
    bio: string
    bioBn: string
    rating: number
    totalStudents: number
  }
  category: "academic" | "skills" | "admission" | "language" | "professional"
  subcategory: string
  level: "beginner" | "intermediate" | "advanced"
  price: number
  originalPrice: number
  currency: "BDT"
  duration: {
    total: string
    totalBn: string
    weeks: number
    hoursPerWeek: number
  }
  content: {
    totalLessons: number
    totalQuizzes: number
    totalAssignments: number
    downloadableResources: number
  }
  media: {
    thumbnail: string
    trailer?: string
    images: string[]
  }
  stats: {
    rating: number
    totalRatings: number
    totalStudents: number
    completionRate: number
  }
  features: {
    isLive: boolean
    isFree: boolean
    hasLiveSupport: boolean
    hasCertificate: boolean
    hasDownloads: boolean
    hasQuizzes: boolean
    hasAssignments: boolean
  }
  schedule?: {
    startDate: Date
    endDate: Date
    classTime: string
    classDays: string[]
  }
  syllabus: {
    modules: CourseModule[]
  }
  requirements: string[]
  targetAudience: string[]
  learningOutcomes: string[]
  tags: string[]
  status: "draft" | "published" | "archived"
  createdAt: Date
  updatedAt: Date
}

export interface CourseModule {
  id: string
  title: string
  titleBn: string
  description: string
  descriptionBn: string
  order: number
  duration: string
  lessons: Lesson[]
  quiz?: Quiz
  assignment?: Assignment
}

export interface Lesson {
  id: string
  title: string
  titleBn: string
  description: string
  descriptionBn: string
  type: "video" | "text" | "pdf" | "live"
  duration: string
  videoUrl?: string
  content?: string
  resources: Resource[]
  order: number
  isPreview: boolean
  isCompleted?: boolean
}

export interface Resource {
  id: string
  title: string
  type: "pdf" | "doc" | "image" | "link"
  url: string
  size?: string
}

export interface Quiz {
  id: string
  title: string
  titleBn: string
  description: string
  questions: QuizQuestion[]
  timeLimit: number // in minutes
  passingScore: number
  attempts: number
  isRandomized: boolean
}

export interface QuizQuestion {
  id: string
  question: string
  questionBn: string
  type: "multiple-choice" | "true-false" | "fill-blank"
  options: string[]
  optionsBn: string[]
  correctAnswer: number | string
  explanation?: string
  explanationBn?: string
  points: number
}

export interface Assignment {
  id: string
  title: string
  titleBn: string
  description: string
  descriptionBn: string
  instructions: string
  dueDate: Date
  maxScore: number
  submissionType: "file" | "text" | "link"
  allowedFileTypes?: string[]
  maxFileSize?: number
}

export interface Enrollment {
  id: string
  userId: string
  courseId: string
  enrolledAt: Date
  completedAt?: Date
  progress: {
    completedLessons: string[]
    completedQuizzes: string[]
    completedAssignments: string[]
    overallProgress: number
  }
  certificate?: {
    id: string
    issuedAt: Date
    certificateUrl: string
  }
  status: "active" | "completed" | "dropped"
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  subtotal: number
  discount: number
  tax: number
  total: number
  currency: "BDT"
  couponCode?: string
  paymentMethod: "bkash" | "nagad" | "rocket" | "card" | "bank"
  paymentStatus: "pending" | "completed" | "failed" | "refunded"
  orderStatus: "pending" | "confirmed" | "cancelled"
  billingAddress: Address
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  courseId: string
  courseName: string
  price: number
  quantity: number
}

export interface Address {
  name: string
  phone: string
  email: string
  address: string
  city: string
  district: string
  postalCode: string
  country: string
}

export interface Review {
  id: string
  userId: string
  courseId: string
  rating: number
  title: string
  comment: string
  isVerified: boolean
  helpfulCount: number
  createdAt: Date
  updatedAt: Date
}

export interface LiveClass {
  id: string
  courseId: string
  title: string
  titleBn: string
  description: string
  instructor: {
    id: string
    name: string
    avatar: string
  }
  scheduledAt: Date
  duration: number // in minutes
  meetingUrl: string
  recordingUrl?: string
  maxParticipants: number
  currentParticipants: number
  status: "scheduled" | "live" | "ended" | "cancelled"
  isRecorded: boolean
  createdAt: Date
}

export interface Blog {
  id: string
  title: string
  titleBn: string
  slug: string
  excerpt: string
  excerptBn: string
  content: string
  contentBn: string
  author: {
    id: string
    name: string
    avatar: string
  }
  category: string
  tags: string[]
  featuredImage: string
  readTime: number
  views: number
  likes: number
  isPublished: boolean
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Event {
  id: string
  title: string
  titleBn: string
  description: string
  descriptionBn: string
  type: "webinar" | "workshop" | "seminar" | "competition"
  startDate: Date
  endDate: Date
  location: string
  isOnline: boolean
  meetingUrl?: string
  maxParticipants?: number
  currentParticipants: number
  registrationDeadline: Date
  isFree: boolean
  price?: number
  instructor: {
    id: string
    name: string
    avatar: string
  }
  agenda: EventAgenda[]
  status: "upcoming" | "live" | "ended" | "cancelled"
  createdAt: Date
}

export interface EventAgenda {
  time: string
  title: string
  description: string
  speaker?: string
}

export interface Coupon {
  id: string
  code: string
  title: string
  description: string
  type: "percentage" | "fixed"
  value: number
  minOrderAmount?: number
  maxDiscountAmount?: number
  usageLimit?: number
  usedCount: number
  validFrom: Date
  validUntil: Date
  applicableCourses?: string[]
  applicableCategories?: string[]
  isActive: boolean
  createdAt: Date
}

export interface Notification {
  id: string
  userId: string
  title: string
  titleBn: string
  message: string
  messageBn: string
  type: "info" | "success" | "warning" | "error"
  category: "course" | "payment" | "system" | "promotion"
  isRead: boolean
  actionUrl?: string
  createdAt: Date
}

export interface Analytics {
  courseViews: number
  enrollments: number
  completions: number
  revenue: number
  activeUsers: number
  newUsers: number
  retentionRate: number
  averageRating: number
  period: "daily" | "weekly" | "monthly" | "yearly"
  date: Date
}
