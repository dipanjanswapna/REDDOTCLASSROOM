// Authentication utilities with enhanced Firebase initialization
import type { User as FirebaseUser } from "firebase/auth"
import type { User } from "./types"

// Helper function to ensure auth is ready with comprehensive verification
const ensureAuthReady = async (retries = 5): Promise<any> => {
  if (typeof window === "undefined") {
    throw new Error("Authentication is only available on the client side")
  }

  console.log("🔐 Auth Utils: Ensuring auth is ready...")

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`🔄 Auth Utils: Attempt ${attempt}/${retries}`)

      // Check Firebase status first
      const { getInitializationStatus } = await import("./firebase")
      const status = getInitializationStatus()
      console.log("📊 Auth Utils: Firebase status:", status)

      const { getAuth } = await import("./firebase")

      // Get auth instance with retry
      console.log("🔑 Auth Utils: Getting auth instance...")
      const auth = await getAuth(3) // 3 retries for auth specifically

      if (!auth) {
        throw new Error("Auth service not available")
      }

      // Verify auth is actually working with comprehensive test
      console.log("🔍 Auth Utils: Verifying auth service...")
      const { onAuthStateChanged } = await import("firebase/auth")

      // Test auth state listener with timeout
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error("Auth verification timeout after 8 seconds"))
        }, 8000)

        try {
          const unsubscribe = onAuthStateChanged(
            auth,
            () => {
              clearTimeout(timeout)
              unsubscribe()
              resolve(void 0)
            },
            (error) => {
              clearTimeout(timeout)
              unsubscribe()
              reject(error)
            },
          )
        } catch (error) {
          clearTimeout(timeout)
          reject(error)
        }
      })

      console.log("✅ Auth Utils: Auth service ready and verified!")
      return auth
    } catch (error) {
      console.error(`❌ Auth Utils: Attempt ${attempt} failed:`, error)

      if (attempt < retries) {
        const delay = attempt * 3000
        console.log(`⏳ Auth Utils: Retrying in ${delay}ms...`)
        await new Promise((resolve) => setTimeout(resolve, delay))

        // Try to reinitialize Firebase on later attempts
        if (attempt >= 3) {
          console.log("🔄 Auth Utils: Attempting Firebase reinitialization...")
          try {
            const { reinitializeFirebase } = await import("./firebase")
            await reinitializeFirebase()
          } catch (reinitError) {
            console.error("❌ Auth Utils: Reinitialization failed:", reinitError)
          }
        }
      }
    }
  }

  throw new Error(
    "Authentication service is not available after multiple attempts. Please refresh the page and try again.",
  )
}

export const signInWithEmail = async (email: string, password: string) => {
  try {
    console.log("📧 Auth Utils: Starting email sign in...")
    const auth = await ensureAuthReady()

    const { signInWithEmailAndPassword } = await import("firebase/auth")
    const result = await signInWithEmailAndPassword(auth, email, password)

    console.log("✅ Auth Utils: Email sign in successful")
    return { user: result.user, error: null }
  } catch (error: any) {
    console.error("❌ Auth Utils: Sign in error:", error)

    // Handle specific Firebase auth errors
    let errorMessage = "Failed to sign in"
    if (error.code === "auth/user-not-found") {
      errorMessage = "No account found with this email"
    } else if (error.code === "auth/wrong-password") {
      errorMessage = "Incorrect password"
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "Invalid email address"
    } else if (error.code === "auth/too-many-requests") {
      errorMessage = "Too many failed attempts. Please try again later"
    } else if (error.message.includes("not available")) {
      errorMessage = "Authentication service is temporarily unavailable. Please try again."
    } else if (error.message) {
      errorMessage = error.message
    }

    return { user: null, error: errorMessage }
  }
}

export const signUpWithEmail = async (email: string, password: string, name: string, phone?: string) => {
  try {
    console.log("📝 Auth Utils: Starting email sign up...")
    const auth = await ensureAuthReady()

    const { createUserWithEmailAndPassword } = await import("firebase/auth")
    const result = await createUserWithEmailAndPassword(auth, email, password)

    console.log("✅ Auth Utils: Email sign up successful")

    // Create user document in Firestore if available
    try {
      const { getFirestore } = await import("./firebase")
      const db = await getFirestore()

      if (db) {
        const { doc, setDoc } = await import("firebase/firestore")

        const userData: Partial<User> = {
          id: result.user.uid,
          name,
          email,
          phone,
          role: "student",
          enrolledCourses: [],
          completedCourses: [],
          preferences: {
            language: "bn",
            notifications: true,
            theme: "light",
          },
          profile: {
            interests: [],
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        await setDoc(doc(db, "users", result.user.uid), userData)
        console.log("✅ Auth Utils: User document created in Firestore")
      }
    } catch (firestoreError) {
      console.error("❌ Auth Utils: Error creating user document:", firestoreError)
      // Don't fail the signup if Firestore fails
    }

    return { user: result.user, error: null }
  } catch (error: any) {
    console.error("❌ Auth Utils: Sign up error:", error)

    let errorMessage = "Failed to create account"
    if (error.code === "auth/email-already-in-use") {
      errorMessage = "An account with this email already exists"
    } else if (error.code === "auth/weak-password") {
      errorMessage = "Password should be at least 6 characters"
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "Invalid email address"
    } else if (error.message.includes("not available")) {
      errorMessage = "Authentication service is temporarily unavailable. Please try again."
    } else if (error.message) {
      errorMessage = error.message
    }

    return { user: null, error: errorMessage }
  }
}

export const signInWithGoogle = async () => {
  try {
    console.log("🔍 Auth Utils: Starting Google sign in...")
    const auth = await ensureAuthReady()

    console.log("📦 Auth Utils: Importing Google Auth provider...")
    const { signInWithPopup, GoogleAuthProvider } = await import("firebase/auth")

    console.log("🔧 Auth Utils: Creating Google provider...")
    const googleProvider = new GoogleAuthProvider()

    // Add additional scopes if needed
    googleProvider.addScope("email")
    googleProvider.addScope("profile")

    console.log("🪟 Auth Utils: Opening Google sign in popup...")
    const result = await signInWithPopup(auth, googleProvider)
    console.log("✅ Auth Utils: Google sign in successful")

    // Check if user document exists, if not create one
    try {
      const { getFirestore } = await import("./firebase")
      const db = await getFirestore()

      if (db) {
        const { doc, setDoc, getDoc } = await import("firebase/firestore")
        const userDoc = await getDoc(doc(db, "users", result.user.uid))

        if (!userDoc.exists()) {
          const userData: Partial<User> = {
            id: result.user.uid,
            name: result.user.displayName || "",
            email: result.user.email || "",
            avatar: result.user.photoURL || "",
            role: "student",
            enrolledCourses: [],
            completedCourses: [],
            preferences: {
              language: "bn",
              notifications: true,
              theme: "light",
            },
            profile: {
              interests: [],
            },
            createdAt: new Date(),
            updatedAt: new Date(),
          }

          await setDoc(doc(db, "users", result.user.uid), userData)
          console.log("✅ Auth Utils: New user document created for Google user")
        }
      }
    } catch (firestoreError) {
      console.error("❌ Auth Utils: Error creating user document:", firestoreError)
      // Don't fail the signin if Firestore fails
    }

    return { user: result.user, error: null }
  } catch (error: any) {
    console.error("❌ Auth Utils: Google sign in error:", error)

    // Handle specific Google auth errors
    let errorMessage = "Failed to sign in with Google"
    if (error.code === "auth/unauthorized-domain") {
      errorMessage =
        "Google sign-in is not configured for this domain. Please use email/password login or contact support."
    } else if (error.code === "auth/popup-closed-by-user") {
      errorMessage = "Sign in was cancelled"
    } else if (error.code === "auth/popup-blocked") {
      errorMessage = "Popup was blocked. Please allow popups and try again."
    } else if (error.code === "auth/cancelled-popup-request") {
      errorMessage = "Sign in was cancelled"
    } else if (error.code === "auth/network-request-failed") {
      errorMessage = "Network error. Please check your connection and try again."
    } else if (error.message.includes("not available")) {
      errorMessage = "Authentication service is temporarily unavailable. Please try again."
    } else if (error.message) {
      errorMessage = error.message
    }

    return { user: null, error: errorMessage }
  }
}

export const signOut = async () => {
  try {
    const auth = await ensureAuthReady()
    const { signOut: firebaseSignOut } = await import("firebase/auth")
    await firebaseSignOut(auth)
    console.log("✅ Auth Utils: Sign out successful")
    return { error: null }
  } catch (error: any) {
    console.error("❌ Auth Utils: Sign out error:", error)
    return { error: error.message || "Failed to sign out" }
  }
}

export const getCurrentUser = (): Promise<FirebaseUser | null> => {
  return new Promise(async (resolve) => {
    try {
      if (typeof window === "undefined") {
        resolve(null)
        return
      }

      const auth = await ensureAuthReady()
      const { onAuthStateChanged } = await import("firebase/auth")

      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe()
        resolve(user)
      })
    } catch (error) {
      console.error("❌ Auth Utils: Error getting current user:", error)
      resolve(null)
    }
  })
}
