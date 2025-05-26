// Course-related utilities with enhanced error handling and null checks
import type { Course, Enrollment, Review } from "./types"
import type { DocumentSnapshot } from "firebase/firestore"

export const getCourses = async (
  category?: string,
  subcategory?: string,
  level?: string,
  isFree?: boolean,
  limitCount = 20,
  lastDoc?: DocumentSnapshot,
) => {
  try {
    const { getFirestore } = await import("./firebase")
    const { collection, query, where, orderBy, limit, startAfter, getDocs } = await import("firebase/firestore")

    const db = await getFirestore()
    if (!db) {
      console.warn("Firestore not available, returning empty results")
      return { courses: [], lastDoc: null, error: "Database not available" }
    }

    let q = query(collection(db, "courses"), where("status", "==", "published"))

    // Add filters
    if (category) {
      q = query(q, where("category", "==", category))
    }
    if (subcategory) {
      q = query(q, where("subcategory", "==", subcategory))
    }
    if (level) {
      q = query(q, where("level", "==", level))
    }
    if (isFree !== undefined) {
      q = query(q, where("features.isFree", "==", isFree))
    }

    // Add ordering and pagination
    q = query(q, orderBy("stats.totalStudents", "desc"), limit(limitCount))

    if (lastDoc) {
      q = query(q, startAfter(lastDoc))
    }

    const snapshot = await getDocs(q)
    const courses = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Course[]

    return {
      courses,
      lastDoc: snapshot.docs[snapshot.docs.length - 1],
      error: null,
    }
  } catch (error: any) {
    console.error("Error fetching courses:", error)
    return { courses: [], lastDoc: null, error: error.message }
  }
}

export const getCourseById = async (courseId: string) => {
  try {
    const { getFirestore } = await import("./firebase")
    const { doc, getDoc } = await import("firebase/firestore")

    const db = await getFirestore()
    if (!db) {
      throw new Error("Database not available")
    }

    const docRef = doc(db, "courses", courseId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const courseData = docSnap.data()
      return {
        course: {
          id: docSnap.id,
          ...courseData,
          // Ensure required fields have fallbacks
          title: courseData.title || "Untitled Course",
          titleBn: courseData.titleBn || courseData.title || "শিরোনামহীন কোর্স",
          instructor: courseData.instructor || {
            id: "unknown",
            name: "Unknown Instructor",
            nameBn: "অজানা শিক্ষক",
            avatar: "/placeholder.svg?height=80&width=80",
            bio: "",
            bioBn: "",
            rating: 0,
            totalStudents: 0,
          },
          stats: courseData.stats || {
            rating: 0,
            totalRatings: 0,
            totalStudents: 0,
            completionRate: 0,
          },
          features: courseData.features || {
            isLive: false,
            isFree: false,
            hasLiveSupport: false,
            hasCertificate: false,
            hasDownloads: false,
            hasQuizzes: false,
            hasAssignments: false,
          },
          media: courseData.media || {
            thumbnail: "/placeholder.svg?height=200&width=300",
            images: [],
          },
          content: courseData.content || {
            totalLessons: 0,
            totalQuizzes: 0,
            totalAssignments: 0,
            downloadableResources: 0,
          },
          duration: courseData.duration || {
            total: "0 hours",
            totalBn: "০ ঘন্টা",
            weeks: 0,
            hoursPerWeek: 0,
          },
        } as Course,
        error: null,
      }
    } else {
      return { course: null, error: "Course not found" }
    }
  } catch (error: any) {
    console.error("Error fetching course:", error)
    return { course: null, error: error.message }
  }
}

export const enrollInCourse = async (userId: string, courseId: string) => {
  try {
    const { getFirestore } = await import("./firebase")
    const { collection, addDoc, doc, getDoc } = await import("firebase/firestore")

    const db = await getFirestore()
    if (!db) {
      throw new Error("Database not available")
    }

    // Check if course exists
    const courseDoc = await getDoc(doc(db, "courses", courseId))
    if (!courseDoc.exists()) {
      throw new Error("Course not found")
    }

    const enrollment: Partial<Enrollment> = {
      userId,
      courseId,
      enrolledAt: new Date(),
      progress: {
        completedLessons: [],
        completedQuizzes: [],
        completedAssignments: [],
        overallProgress: 0,
      },
      status: "active",
    }

    const docRef = await addDoc(collection(db, "enrollments"), enrollment)
    return { enrollmentId: docRef.id, error: null }
  } catch (error: any) {
    console.error("Error enrolling in course:", error)
    return { enrollmentId: null, error: error.message }
  }
}

export const getCourseReviews = async (courseId: string) => {
  try {
    const { getFirestore } = await import("./firebase")
    const { collection, query, where, orderBy, getDocs } = await import("firebase/firestore")

    const db = await getFirestore()
    if (!db) {
      console.warn("Firestore not available, returning empty reviews")
      return { reviews: [], error: "Database not available" }
    }

    const q = query(collection(db, "reviews"), where("courseId", "==", courseId), orderBy("createdAt", "desc"))

    const snapshot = await getDocs(q)
    const reviews = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Review[]

    return { reviews, error: null }
  } catch (error: any) {
    console.error("Error fetching reviews:", error)
    return { reviews: [], error: error.message }
  }
}
