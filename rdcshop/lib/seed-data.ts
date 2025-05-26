// Seed data with proper Firebase service initialization
import type { Course, User, Coupon } from "./types"

// Sample courses data (keeping the same data structure)
const sampleCourses: Partial<Course>[] = [
  {
    title: "HSC Physics Complete Course",
    titleBn: "HSC পদার্থবিজ্ঞান সম্পূর্ণ কোর্স",
    description: "Complete HSC Physics preparation with expert guidance",
    descriptionBn: "বিশেষজ্ঞ গাইডেন্স সহ সম্পূর্ণ HSC পদার্থবিজ্ঞান প্রস্তুতি",
    instructor: {
      id: "instructor1",
      name: "Dr. Rahman Ahmed",
      nameBn: "ড. রহমান আহমেদ",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Physics expert with 15+ years experience",
      bioBn: "১৫+ বছরের অভিজ্ঞতা সহ পদার্থবিজ্ঞান বিশেষজ্ঞ",
      rating: 4.9,
      totalStudents: 12500,
    },
    category: "academic",
    subcategory: "hsc",
    level: "intermediate",
    price: 2500,
    originalPrice: 3500,
    currency: "BDT",
    duration: {
      total: "120 hours",
      totalBn: "১২০ ঘন্টা",
      weeks: 16,
      hoursPerWeek: 8,
    },
    content: {
      totalLessons: 45,
      totalQuizzes: 15,
      totalAssignments: 8,
      downloadableResources: 25,
    },
    media: {
      thumbnail: "/placeholder.svg?height=200&width=300",
      images: [],
    },
    stats: {
      rating: 4.9,
      totalRatings: 2500,
      totalStudents: 12500,
      completionRate: 85,
    },
    features: {
      isLive: true,
      isFree: false,
      hasLiveSupport: true,
      hasCertificate: true,
      hasDownloads: true,
      hasQuizzes: true,
      hasAssignments: true,
    },
    syllabus: {
      modules: [],
    },
    requirements: ["HSC Science Background", "Basic Math Knowledge"],
    targetAudience: ["HSC Students", "University Aspirants"],
    learningOutcomes: ["Master Physics Concepts", "Solve Complex Problems"],
    tags: ["HSC", "Physics", "Science", "Academic"],
    status: "published",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "IELTS Speaking Masterclass",
    titleBn: "IELTS স্পিকিং মাস্টারক্লাস",
    description: "Master IELTS Speaking with expert guidance",
    descriptionBn: "বিশেষজ্ঞ গাইডেন্স সহ IELTS স্পিকিং মাস্টার করুন",
    instructor: {
      id: "instructor2",
      name: "Sarah Johnson",
      nameBn: "সারাহ জনসন",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "IELTS expert with Band 9 achievement",
      bioBn: "ব্যান্ড ৯ অর্জনকারী IELTS বিশেষজ্ঞ",
      rating: 4.8,
      totalStudents: 8900,
    },
    category: "language",
    subcategory: "ielts",
    level: "intermediate",
    price: 0,
    originalPrice: 0,
    currency: "BDT",
    duration: {
      total: "40 hours",
      totalBn: "৪০ ঘন্টা",
      weeks: 8,
      hoursPerWeek: 5,
    },
    content: {
      totalLessons: 20,
      totalQuizzes: 8,
      totalAssignments: 5,
      downloadableResources: 15,
    },
    media: {
      thumbnail: "/placeholder.svg?height=200&width=300",
      images: [],
    },
    stats: {
      rating: 4.8,
      totalRatings: 1800,
      totalStudents: 8900,
      completionRate: 92,
    },
    features: {
      isLive: false,
      isFree: true,
      hasLiveSupport: false,
      hasCertificate: true,
      hasDownloads: true,
      hasQuizzes: true,
      hasAssignments: true,
    },
    syllabus: {
      modules: [],
    },
    requirements: ["Basic English Knowledge"],
    targetAudience: ["IELTS Candidates", "English Learners"],
    learningOutcomes: ["Improve Speaking Skills", "Achieve Target Band"],
    tags: ["IELTS", "English", "Speaking", "Language"],
    status: "published",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Web Development Bootcamp",
    titleBn: "ওয়েব ডেভেলপমেন্ট বুটক্যাম্প",
    description: "Complete web development course from beginner to advanced",
    descriptionBn: "শুরু থেকে উন্নত পর্যায় পর্যন্ত সম্পূর্ণ ওয়েব ডেভেলপমেন্ট কোর্স",
    instructor: {
      id: "instructor3",
      name: "Md. Karim Hassan",
      nameBn: "মো. করিম হাসান",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Full-stack developer with 10+ years experience",
      bioBn: "১০+ বছরের অভিজ্ঞতা সহ ফুল-স্ট্যাক ডেভেলপার",
      rating: 4.9,
      totalStudents: 3400,
    },
    category: "skills",
    subcategory: "programming",
    level: "beginner",
    price: 3000,
    originalPrice: 4000,
    currency: "BDT",
    duration: {
      total: "80 hours",
      totalBn: "৮০ ঘন্টা",
      weeks: 12,
      hoursPerWeek: 7,
    },
    content: {
      totalLessons: 35,
      totalQuizzes: 12,
      totalAssignments: 10,
      downloadableResources: 30,
    },
    media: {
      thumbnail: "/placeholder.svg?height=200&width=300",
      images: [],
    },
    stats: {
      rating: 4.9,
      totalRatings: 850,
      totalStudents: 3400,
      completionRate: 78,
    },
    features: {
      isLive: true,
      isFree: false,
      hasLiveSupport: true,
      hasCertificate: true,
      hasDownloads: true,
      hasQuizzes: true,
      hasAssignments: true,
    },
    syllabus: {
      modules: [],
    },
    requirements: ["Basic Computer Knowledge"],
    targetAudience: ["Beginners", "Career Changers"],
    learningOutcomes: ["Build Web Applications", "Get Job Ready"],
    tags: ["Programming", "Web Development", "JavaScript", "React"],
    status: "published",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// Sample coupons
const sampleCoupons: Partial<Coupon>[] = [
  {
    code: "NEWUSER50",
    title: "New User Discount",
    description: "50% off for new users",
    type: "percentage",
    value: 50,
    minOrderAmount: 1000,
    maxDiscountAmount: 2000,
    usageLimit: 1000,
    usedCount: 0,
    validFrom: new Date(),
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    isActive: true,
    createdAt: new Date(),
  },
  {
    code: "STUDENT30",
    title: "Student Discount",
    description: "30% off for students",
    type: "percentage",
    value: 30,
    minOrderAmount: 500,
    usageLimit: 5000,
    usedCount: 0,
    validFrom: new Date(),
    validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days
    isActive: true,
    createdAt: new Date(),
  },
]

// Function to seed the database
export const seedDatabase = async () => {
  try {
    console.log("Starting database seeding...")

    const { getFirestore } = await import("./firebase")
    const { collection, addDoc, doc, setDoc } = await import("firebase/firestore")

    const db = await getFirestore()
    if (!db) {
      throw new Error("Firestore not available")
    }

    // Seed courses
    for (const course of sampleCourses) {
      await addDoc(collection(db, "courses"), course)
    }
    console.log("Courses seeded successfully")

    // Seed coupons
    for (const coupon of sampleCoupons) {
      await addDoc(collection(db, "coupons"), coupon)
    }
    console.log("Coupons seeded successfully")

    // Create admin user
    const adminUser: Partial<User> = {
      id: "admin",
      name: "Admin User",
      email: "admin@edulms.com",
      role: "admin",
      enrolledCourses: [],
      completedCourses: [],
      preferences: {
        language: "bn",
        notifications: true,
        theme: "dark",
      },
      profile: {
        interests: [],
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await setDoc(doc(db, "users", "admin"), adminUser)
    console.log("Admin user created successfully")

    console.log("Database seeding completed!")
  } catch (error) {
    console.error("Error seeding database:", error)
    throw error
  }
}
