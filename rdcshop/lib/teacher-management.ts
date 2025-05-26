// Teacher management utilities with automatic page generation
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
    const { getFirestore } = await import("./firebase")
    const { collection, addDoc, doc, setDoc } = await import("firebase/firestore")

    const db = await getFirestore()
    if (!db) {
      throw new Error("Database not available")
    }

    const slug = generateTeacherSlug(teacherData.name)
    const shopUrl = `/shop/${slug}`

    const teacher: Partial<TeacherProfile> = {
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
        achievements: [],
        socialLinks: {},
        amazonAffiliateId: teacherData.amazonAffiliateId,
        isVerified: false,
        isActive: true,
        joinedAt: new Date(),
        totalEarnings: 0,
        commissionRate: 15, // 15% commission
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Create teacher document
    const teacherRef = await addDoc(collection(db, "teachers"), teacher)

    // Create teacher page metadata
    const pageMetadata = {
      teacherId: teacherRef.id,
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

    await setDoc(doc(db, "teacher-pages", slug), pageMetadata)

    console.log(`✅ Teacher profile created: ${teacherData.name} (${slug})`)
    console.log(`🌐 Shop URL: ${shopUrl}`)

    return {
      teacherId: teacherRef.id,
      slug,
      shopUrl,
      error: null,
    }
  } catch (error: any) {
    console.error("❌ Error creating teacher profile:", error)
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
    const { getFirestore } = await import("./firebase")
    const { collection, query, where, getDocs } = await import("firebase/firestore")

    const db = await getFirestore()
    if (!db) {
      throw new Error("Database not available")
    }

    const q = query(collection(db, "teachers"), where("teacherData.slug", "==", slug))
    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      return { teacher: null, error: "Teacher not found" }
    }

    const teacherDoc = snapshot.docs[0]
    const teacher = {
      id: teacherDoc.id,
      ...teacherDoc.data(),
    } as TeacherProfile

    return { teacher, error: null }
  } catch (error: any) {
    console.error("❌ Error fetching teacher:", error)
    return { teacher: null, error: error.message }
  }
}

// Get teacher courses
export const getTeacherCourses = async (teacherId: string) => {
  try {
    const { getFirestore } = await import("./firebase")
    const { collection, query, where, getDocs } = await import("firebase/firestore")

    const db = await getFirestore()
    if (!db) {
      throw new Error("Database not available")
    }

    const q = query(
      collection(db, "courses"),
      where("instructor.id", "==", teacherId),
      where("status", "==", "published"),
    )
    const snapshot = await getDocs(q)

    const courses = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as TeacherCourse[]

    return { courses, error: null }
  } catch (error: any) {
    console.error("❌ Error fetching teacher courses:", error)
    return { courses: [], error: error.message }
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
    const { getFirestore } = await import("./firebase")
    const { collection, addDoc } = await import("firebase/firestore")

    const db = await getFirestore()
    if (!db) {
      throw new Error("Database not available")
    }

    const product: Partial<AmazonProduct> = {
      ...productData,
      id: `amazon-${productData.asin}`,
      currency: "BDT",
      rating: 0,
      totalReviews: 0,
      availability: "in_stock",
      isRecommended: false,
      addedAt: new Date(),
    }

    const productRef = await addDoc(collection(db, "amazon-products"), {
      ...product,
      teacherId,
    })

    return { productId: productRef.id, error: null }
  } catch (error: any) {
    console.error("❌ Error adding Amazon product:", error)
    return { productId: null, error: error.message }
  }
}

// Get teacher's Amazon products
export const getTeacherAmazonProducts = async (teacherId: string) => {
  try {
    const { getFirestore } = await import("./firebase")
    const { collection, query, where, getDocs } = await import("firebase/firestore")

    const db = await getFirestore()
    if (!db) {
      throw new Error("Database not available")
    }

    const q = query(collection(db, "amazon-products"), where("teacherId", "==", teacherId))
    const snapshot = await getDocs(q)

    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as AmazonProduct[]

    return { products, error: null }
  } catch (error: any) {
    console.error("❌ Error fetching Amazon products:", error)
    return { products: [], error: error.message }
  }
}

// Get all teachers for listing
export const getAllTeachers = async () => {
  try {
    const { getFirestore } = await import("./firebase")
    const { collection, query, where, orderBy, getDocs } = await import("firebase/firestore")

    const db = await getFirestore()
    if (!db) {
      throw new Error("Database not available")
    }

    const q = query(
      collection(db, "teachers"),
      where("teacherData.isActive", "==", true),
      orderBy("teacherData.joinedAt", "desc"),
    )
    const snapshot = await getDocs(q)

    const teachers = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as TeacherProfile[]

    return { teachers, error: null }
  } catch (error: any) {
    console.error("❌ Error fetching teachers:", error)
    return { teachers: [], error: error.message }
  }
}
