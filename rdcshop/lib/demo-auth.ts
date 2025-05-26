// Demo authentication system without Firebase
import type { User } from "./types"

// Demo user data for different roles
const demoUsers = {
  student: {
    id: "demo-student-001",
    name: "Demo Student",
    email: "demo@edulms.com",
    phone: "+8801700000000",
    avatar: "/placeholder.svg?height=80&width=80",
    role: "student" as const,
    enrolledCourses: ["course-1", "course-2"],
    completedCourses: ["course-1"],
    preferences: {
      language: "bn" as const,
      notifications: true,
      theme: "light" as const,
    },
    profile: {
      dateOfBirth: "1995-01-01",
      education: "HSC",
      interests: ["Physics", "Mathematics", "Programming"],
      location: "Dhaka, Bangladesh",
    },
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date(),
  },
  teacher: {
    id: "demo-teacher-001",
    name: "Dr. Rahman Ahmed",
    email: "teacher@edulms.com",
    phone: "+8801700000001",
    avatar: "/placeholder.svg?height=80&width=80",
    role: "teacher" as const,
    enrolledCourses: [],
    completedCourses: [],
    preferences: {
      language: "bn" as const,
      notifications: true,
      theme: "light" as const,
    },
    profile: {
      dateOfBirth: "1980-01-01",
      education: "PhD in Physics",
      interests: ["Physics", "Teaching", "Research"],
      location: "Dhaka, Bangladesh",
      bio: "Physics expert with 15+ years experience",
      specialization: "HSC Physics, Quantum Mechanics",
      totalStudents: 12500,
      rating: 4.9,
    },
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date(),
  },
  admin: {
    id: "demo-admin-001",
    name: "Admin User",
    email: "admin@edulms.com",
    phone: "+8801700000002",
    avatar: "/placeholder.svg?height=80&width=80",
    role: "admin" as const,
    enrolledCourses: [],
    completedCourses: [],
    preferences: {
      language: "bn" as const,
      notifications: true,
      theme: "dark" as const,
    },
    profile: {
      dateOfBirth: "1985-01-01",
      education: "MBA",
      interests: ["Management", "Education Technology", "Analytics"],
      location: "Dhaka, Bangladesh",
      department: "Platform Management",
      permissions: ["all"],
    },
    createdAt: new Date("2022-01-01"),
    updatedAt: new Date(),
  },
  affiliate: {
    id: "demo-affiliate-001",
    name: "Affiliate Partner",
    email: "affiliate@edulms.com",
    phone: "+8801700000003",
    avatar: "/placeholder.svg?height=80&width=80",
    role: "affiliate" as const,
    enrolledCourses: [],
    completedCourses: [],
    preferences: {
      language: "bn" as const,
      notifications: true,
      theme: "light" as const,
    },
    profile: {
      dateOfBirth: "1990-01-01",
      education: "BBA",
      interests: ["Marketing", "Sales", "Business Development"],
      location: "Dhaka, Bangladesh",
      commissionRate: 15,
      totalEarnings: 50000,
      referralCode: "AFF001",
    },
    createdAt: new Date("2023-06-01"),
    updatedAt: new Date(),
  },
}

// Demo credentials for different roles
export const demoCredentials = {
  student: {
    email: "demo@edulms.com",
    password: "demo123456",
  },
  teacher: {
    email: "teacher@edulms.com",
    password: "teacher123456",
  },
  admin: {
    email: "admin@edulms.com",
    password: "admin123456",
  },
  affiliate: {
    email: "affiliate@edulms.com",
    password: "affiliate123456",
  },
}

// Local storage keys
const STORAGE_KEYS = {
  USER: "edulms_demo_user",
  IS_LOGGED_IN: "edulms_demo_logged_in",
  USER_ROLE: "edulms_demo_user_role",
}

// Demo authentication functions
export const demoSignIn = async (email: string, password: string) => {
  console.log("🎭 Demo Auth: Attempting sign in...")

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Check credentials for all roles
  for (const [role, credentials] of Object.entries(demoCredentials)) {
    if (email === credentials.email && password === credentials.password) {
      const user = demoUsers[role as keyof typeof demoUsers]

      // Store user data in localStorage
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
      localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, "true")
      localStorage.setItem(STORAGE_KEYS.USER_ROLE, role)

      console.log(`✅ Demo Auth: ${role} sign in successful`)
      return { user, error: null }
    }
  }

  console.log("❌ Demo Auth: Invalid credentials")
  return { user: null, error: "Invalid email or password" }
}

export const demoSignUp = async (email: string, password: string, name: string, phone?: string, role = "student") => {
  console.log("🎭 Demo Auth: Attempting sign up...")

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // For demo, we'll just create a user with the provided data
  const baseUser = demoUsers[role as keyof typeof demoUsers] || demoUsers.student
  const newUser = {
    ...baseUser,
    id: `demo-${role}-${Date.now()}`,
    name,
    email,
    phone: phone || baseUser.phone,
    role: role as any,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  // Store user data in localStorage
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser))
  localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, "true")
  localStorage.setItem(STORAGE_KEYS.USER_ROLE, role)

  console.log(`✅ Demo Auth: ${role} sign up successful`)
  return { user: newUser, error: null }
}

export const demoSignOut = async () => {
  console.log("🎭 Demo Auth: Signing out...")

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Clear localStorage
  localStorage.removeItem(STORAGE_KEYS.USER)
  localStorage.removeItem(STORAGE_KEYS.IS_LOGGED_IN)
  localStorage.removeItem(STORAGE_KEYS.USER_ROLE)

  console.log("✅ Demo Auth: Sign out successful")
  return { error: null }
}

export const getCurrentDemoUser = (): User | null => {
  if (typeof window === "undefined") return null

  try {
    const isLoggedIn = localStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN)
    const userData = localStorage.getItem(STORAGE_KEYS.USER)

    if (isLoggedIn === "true" && userData) {
      return JSON.parse(userData) as User
    }
  } catch (error) {
    console.error("❌ Demo Auth: Error getting current user:", error)
  }

  return null
}

export const getCurrentUserRole = (): string | null => {
  if (typeof window === "undefined") return null

  try {
    return localStorage.getItem(STORAGE_KEYS.USER_ROLE)
  } catch (error) {
    console.error("❌ Demo Auth: Error getting user role:", error)
    return null
  }
}

export const isDemoLoggedIn = (): boolean => {
  if (typeof window === "undefined") return false

  try {
    return localStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN) === "true"
  } catch (error) {
    console.error("❌ Demo Auth: Error checking login status:", error)
    return false
  }
}

// Auto-login with demo credentials for specific role
export const autoLoginDemo = async (role: keyof typeof demoCredentials = "student") => {
  console.log(`🎭 Demo Auth: Auto-login with ${role} credentials...`)
  const credentials = demoCredentials[role]
  return await demoSignIn(credentials.email, credentials.password)
}

// Get demo user by role
export const getDemoUserByRole = (role: keyof typeof demoUsers) => {
  return demoUsers[role]
}

// Get all demo credentials (for display purposes)
export const getAllDemoCredentials = () => {
  return demoCredentials
}
