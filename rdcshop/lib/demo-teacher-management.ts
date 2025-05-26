// Demo teacher management system using localStorage
import type { User, Course } from "./types"

export interface TeacherProfile extends User {
  role: "teacher"
  teacherData: {
    slug: string // URL slug like "abhi-dutta-tushar"
    shopUrl: string // Full shop URL
    bio: string
    bioBn: string
    specialization: string[]
    experience: number
    education: string
    achievements: string[]
    socialLinks: {
      facebook?: string
      youtube?: string
      linkedin?: string
      website?: string
    }
    amazonAffiliateId?: string
    isVerified: boolean
    isActive: boolean
    joinedAt: Date
    totalEarnings: number
    commissionRate: number
    bankDetails?: {
      accountName: string
      accountNumber: string
      bankName: string
      routingNumber: string
    }
  }
}

export interface TeacherCourse extends Course {
  teacherId: string
  teacherSlug: string
  amazonProducts?: AmazonProduct[]
}

export interface AmazonProduct {
  id: string
  asin: string // Amazon Standard Identification Number
  title: string
  titleBn: string
  description: string
  descriptionBn: string
  price: number
  originalPrice: number
  currency: "BDT" | "USD"
  images: string[]
  category: string
  subcategory: string
  rating: number
  totalReviews: number
  availability: "in_stock" | "out_of_stock" | "limited"
  affiliateUrl: string
  commission: number
  tags: string[]
  isRecommended: boolean
  addedAt: Date
}

// Generate URL slug from teacher name
export const generateTeacherSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .trim()
}

// Demo teacher data storage keys
const TEACHERS_KEY = "edulms_demo_teachers"
const TEACHER_PAGES_KEY = "edulms_demo_teacher_pages"
const AMAZON_PRODUCTS_KEY = "edulms_demo_amazon_products"

// Get all teachers from localStorage
const getStoredTeachers = (): TeacherProfile[] => {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem(TEACHERS_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

// Save teachers to localStorage
const saveTeachers = (teachers: TeacherProfile[]) => {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(TEACHERS_KEY, JSON.stringify(teachers))
  } catch (error) {
    console.error("Error saving teachers:", error)
  }
}

// Get teacher pages metadata
const getStoredTeacherPages = () => {
  if (typeof window === "undefined") return {}
  try {
    const stored = localStorage.getItem(TEACHER_PAGES_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

// Save teacher pages metadata
const saveTeacherPages = (pages: any) => {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(TEACHER_PAGES_KEY, JSON.stringify(pages))
  } catch (error) {
    console.error("Error saving teacher pages:", error)
  }
}

// Get Amazon products from localStorage
const getStoredAmazonProducts = (): AmazonProduct[] => {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem(AMAZON_PRODUCTS_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

// Save Amazon products to localStorage
const saveAmazonProducts = (products: AmazonProduct[]) => {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(AMAZON_PRODUCTS_KEY, JSON.stringify(products))
  } catch (error) {
    console.error("Error saving Amazon products:", error)
  }
}

// Create teacher profile with automatic page generation
export const createTeacherProfile = async (teacherData: {
  name: string
  email: string
  phone: string
  bio: string
  bioBn: string
  specialization: string[]
  experience: number
  education: string
  amazonAffiliateId?: string
}) => {
  try {
    console.log("🎓 Creating demo teacher profile...")

    const slug = generateTeacherSlug(teacherData.name)
    const shopUrl = `/shop/${slug}`
    const teacherId = `teacher_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Check if slug already exists
    const existingTeachers = getStoredTeachers()
    const slugExists = existingTeachers.some((t) => t.teacherData.slug === slug)

    if (slugExists) {
      throw new Error(`A teacher with similar name already exists. Please use a different name.`)
    }

    const teacher: TeacherProfile = {
      id: teacherId,
      name: teacherData.name,
      email: teacherData.email,
      phone: teacherData.phone,
      role: "teacher",
      avatar: "/placeholder.svg?height=150&width=150",
      enrolledCourses: [],
      completedCourses: [],
      preferences: {
        language: "bn",
        notifications: true,
        theme: "light",
      },
      profile: {
        education: teacherData.education,
        interests: teacherData.specialization,
        location: "Bangladesh",
      },
      teacherData: {
        slug,
        shopUrl,
        bio: teacherData.bio,
        bioBn: teacherData.bioBn,
        specialization: teacherData.specialization,
        experience: teacherData.experience,
        education: teacherData.education,
        achievements: ["Verified Teacher", `${teacherData.experience}+ Years Experience`, "Professional Educator"],
        socialLinks: {},
        amazonAffiliateId: teacherData.amazonAffiliateId,
        isVerified: true, // Auto-verify in demo
        isActive: true,
        joinedAt: new Date(),
        totalEarnings: Math.floor(Math.random() * 50000) + 10000, // Demo earnings
        commissionRate: 15, // 15% commission
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Save teacher to localStorage
    const teachers = getStoredTeachers()
    teachers.push(teacher)
    saveTeachers(teachers)

    // Create teacher page metadata
    const pages = getStoredTeacherPages()
    pages[slug] = {
      teacherId,
      slug,
      title: `${teacherData.name} - EduLMS Teacher`,
      titleBn: `${teacherData.name} - EduLMS শিক্ষক`,
      description: teacherData.bio,
      descriptionBn: teacherData.bioBn,
      keywords: teacherData.specialization.join(", "),
      ogImage: "/placeholder.svg?height=630&width=1200",
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    saveTeacherPages(pages)

    // Add some demo Amazon products for the teacher
    if (teacherData.amazonAffiliateId) {
      const demoProducts: AmazonProduct[] = [
        {
          id: `amazon-${teacherId}-1`,
          asin: "B08N5WRWNW",
          title: "Physics Textbook - HSC Level",
          titleBn: "পদার্থবিজ্ঞান পাঠ্যবই - এইচএসসি স্তর",
          description: "Comprehensive physics textbook for HSC students",
          descriptionBn: "এইচএসসি শিক্ষার্থীদের জন্য সম্পূর্ণ পদার্থবিজ্ঞান পাঠ্যবই",
          price: 850,
          originalPrice: 1200,
          currency: "BDT",
          images: ["/placeholder.svg?height=300&width=300"],
          category: "Books",
          subcategory: "Textbooks",
          rating: 4.5,
          totalReviews: 127,
          availability: "in_stock",
          affiliateUrl: `https://amazon.com/dp/B08N5WRWNW?tag=${teacherData.amazonAffiliateId}`,
          commission: 8.5,
          tags: ["physics", "hsc", "textbook", "education"],
          isRecommended: true,
          addedAt: new Date(),
        },
        {
          id: `amazon-${teacherId}-2`,
          asin: "B07XJ8C8F7",
          title: "Scientific Calculator",
          titleBn: "বৈজ্ঞানিক ক্যালকুলেটর",
          description: "Advanced scientific calculator for students",
          descriptionBn: "শিক্ষার্থীদের জন্য উন্নত বৈজ্ঞানিক ক্যালকুলেটর",
          price: 2500,
          originalPrice: 3200,
          currency: "BDT",
          images: ["/placeholder.svg?height=300&width=300"],
          category: "Electronics",
          subcategory: "Calculators",
          rating: 4.8,
          totalReviews: 89,
          availability: "in_stock",
          affiliateUrl: `https://amazon.com/dp/B07XJ8C8F7?tag=${teacherData.amazonAffiliateId}`,
          commission: 12.0,
          tags: ["calculator", "scientific", "math", "education"],
          isRecommended: false,
          addedAt: new Date(),
        },
      ]

      const existingProducts = getStoredAmazonProducts()
      const updatedProducts = [...existingProducts, ...demoProducts]
      saveAmazonProducts(updatedProducts)
    }

    console.log(`✅ Demo teacher profile created: ${teacherData.name} (${slug})`)
    console.log(`🌐 Shop URL: ${shopUrl}`)

    return {
      teacherId,
      slug,
      shopUrl,
      error: null,
    }
  } catch (error: any) {
    console.error("❌ Error creating demo teacher profile:", error)
    return {
      teacherId: null,
      slug: null,
      shopUrl: null,
      error: error.message,
    }
  }
}

// Get teacher by slug
export const getTeacherBySlug = async (slug: string) => {
  try {
    console.log(`🔍 Looking for teacher with slug: ${slug}`)

    const teachers = getStoredTeachers()
    const teacher = teachers.find((t) => t.teacherData.slug === slug)

    if (!teacher) {
      console.log(`❌ Teacher not found: ${slug}`)
      return { teacher: null, error: "Teacher not found" }
    }

    console.log(`✅ Teacher found: ${teacher.name}`)
    return { teacher, error: null }
  } catch (error: any) {
    console.error("❌ Error fetching teacher:", error)
    return { teacher: null, error: error.message }
  }
}

// Get teacher courses (demo data)
export const getTeacherCourses = async (teacherId: string) => {
  try {
    // Generate demo courses for the teacher
    const teacher = getStoredTeachers().find((t) => t.id === teacherId)
    if (!teacher) {
      return { courses: [], error: "Teacher not found" }
    }

    const demoCourses: TeacherCourse[] = [
      {
        id: `course_${teacherId}_1`,
        title: "HSC Physics Complete Course",
        titleBn: "এইচএসসি পদার্থবিজ্ঞান সম্পূর্ণ কোর্স",
        description: "Complete HSC Physics course with practical examples",
        descriptionBn: "ব্যবহারিক উদাহরণ সহ সম্পূর্ণ এইচএসসি পদার্থবিজ্ঞান কোর্স",
        thumbnail: "/placeholder.svg?height=200&width=300",
        instructor: {
          id: teacherId,
          name: teacher.name,
          avatar: teacher.avatar,
          bio: teacher.teacherData.bio,
        },
        price: 2500,
        originalPrice: 4000,
        currency: "BDT",
        duration: "6 months",
        level: "intermediate",
        language: "bn",
        category: "Science",
        subcategory: "Physics",
        tags: ["hsc", "physics", "science", "exam-prep"],
        rating: 4.7,
        totalRatings: 156,
        totalStudents: 1247,
        totalLessons: 45,
        totalDuration: "120 hours",
        status: "published",
        features: ["Live Classes", "Recorded Videos", "Practice Tests", "PDF Materials", "Certificate"],
        requirements: ["HSC Science Background", "Basic Math Knowledge"],
        outcomes: [
          "Master HSC Physics Concepts",
          "Solve Complex Problems",
          "Exam Preparation",
          "Practical Applications",
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
        teacherId,
        teacherSlug: teacher.teacherData.slug,
      },
      {
        id: `course_${teacherId}_2`,
        title: "Advanced Mathematics for HSC",
        titleBn: "এইচএসসির জন্য উন্নত গণিত",
        description: "Advanced mathematics course for HSC students",
        descriptionBn: "এইচএসসি শিক্ষার্থীদের জন্য উন্নত গণিত কোর্স",
        thumbnail: "/placeholder.svg?height=200&width=300",
        instructor: {
          id: teacherId,
          name: teacher.name,
          avatar: teacher.avatar,
          bio: teacher.teacherData.bio,
        },
        price: 2000,
        originalPrice: 3500,
        currency: "BDT",
        duration: "4 months",
        level: "advanced",
        language: "bn",
        category: "Mathematics",
        subcategory: "Advanced Math",
        tags: ["hsc", "mathematics", "advanced", "problem-solving"],
        rating: 4.8,
        totalRatings: 203,
        totalStudents: 892,
        totalLessons: 38,
        totalDuration: "95 hours",
        status: "published",
        features: ["Live Problem Solving", "Step-by-step Solutions", "Mock Tests", "Formula Sheets", "Certificate"],
        requirements: ["HSC Science/Commerce Background", "Basic Algebra"],
        outcomes: ["Master Advanced Math Concepts", "Solve Complex Equations", "Exam Excellence", "Logical Thinking"],
        createdAt: new Date(),
        updatedAt: new Date(),
        teacherId,
        teacherSlug: teacher.teacherData.slug,
      },
    ]

    return { courses: demoCourses, error: null }
  } catch (error: any) {
    console.error("❌ Error fetching teacher courses:", error)
    return { courses: [], error: error.message }
  }
}

// Get teacher's Amazon products
export const getTeacherAmazonProducts = async (teacherId: string) => {
  try {
    const allProducts = getStoredAmazonProducts()
    const teacherProducts = allProducts.filter((p) => p.id.includes(teacherId))

    return { products: teacherProducts, error: null }
  } catch (error: any) {
    console.error("❌ Error fetching Amazon products:", error)
    return { products: [], error: error.message }
  }
}

// Add Amazon product to teacher shop
export const addAmazonProduct = async (
  teacherId: string,
  productData: {
    asin: string
    title: string
    titleBn: string
    description: string
    descriptionBn: string
    price: number
    originalPrice: number
    category: string
    subcategory: string
    images: string[]
    affiliateUrl: string
    commission: number
    tags: string[]
  },
) => {
  try {
    const productId = `amazon-${teacherId}-${Date.now()}`

    const product: AmazonProduct = {
      ...productData,
      id: productId,
      currency: "BDT",
      rating: Math.random() * 2 + 3, // Random rating between 3-5
      totalReviews: Math.floor(Math.random() * 200) + 10,
      availability: "in_stock",
      isRecommended: false,
      addedAt: new Date(),
    }

    const existingProducts = getStoredAmazonProducts()
    existingProducts.push(product)
    saveAmazonProducts(existingProducts)

    return { productId, error: null }
  } catch (error: any) {
    console.error("❌ Error adding Amazon product:", error)
    return { productId: null, error: error.message }
  }
}

// Get all teachers for listing
export const getAllTeachers = async () => {
  try {
    const teachers = getStoredTeachers()
    const activeTeachers = teachers.filter((t) => t.teacherData.isActive)

    return { teachers: activeTeachers, error: null }
  } catch (error: any) {
    console.error("❌ Error fetching teachers:", error)
    return { teachers: [], error: error.message }
  }
}

// Initialize demo teachers if none exist
export const initializeDemoTeachers = () => {
  if (typeof window === "undefined") return

  const existingTeachers = getStoredTeachers()
  if (existingTeachers.length > 0) return

  console.log("🎓 Initializing demo teachers...")

  // Create some demo teachers
  const demoTeachers = [
    {
      name: "Dr. Rahman Ahmed",
      email: "rahman@edulms.com",
      phone: "+8801700000001",
      bio: "Experienced Physics teacher with 15+ years of teaching experience",
      bioBn: "১৫+ বছরের শিক্ষকতার অভিজ্ঞতা সহ অভিজ্ঞ পদার্থবিজ্ঞান শিক্ষক",
      specialization: ["HSC Physics", "HSC Mathematics"],
      experience: 15,
      education: "PhD in Physics, University of Dhaka",
      amazonAffiliateId: "rahman-20",
    },
    {
      name: "Fatima Khan",
      email: "fatima@edulms.com",
      phone: "+8801700000002",
      bio: "Expert English teacher specializing in IELTS preparation",
      bioBn: "IELTS প্রস্তুতিতে বিশেষজ্ঞ ইংরেজি শিক্ষক",
      specialization: ["IELTS", "English Language"],
      experience: 8,
      education: "MA in English Literature, Dhaka University",
      amazonAffiliateId: "fatima-20",
    },
  ]

  demoTeachers.forEach((teacherData) => {
    createTeacherProfile(teacherData)
  })

  console.log("✅ Demo teachers initialized")
}
