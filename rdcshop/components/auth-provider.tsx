"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User as FirebaseUser } from "firebase/auth"
import type { User } from "@/lib/types"

interface AuthContextType {
  user: FirebaseUser | null
  userData: User | null
  loading: boolean
  signOut: () => Promise<void>
  initialized: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [userData, setUserData] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [initialized, setInitialized] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") {
      setLoading(false)
      setInitialized(true)
      return
    }

    let unsubscribe: (() => void) | undefined
    let mounted = true

    const initAuth = async () => {
      try {
        console.log("🔐 Auth Provider: Starting initialization...")

        // Wait for page to be fully loaded
        if (document.readyState !== "complete") {
          console.log("⏳ Auth Provider: Waiting for page load...")
          await new Promise((resolve) => {
            if (document.readyState === "complete") {
              resolve(void 0)
            } else {
              window.addEventListener("load", () => resolve(void 0), { once: true })
            }
          })
        }

        // Wait for Firebase to be ready
        console.log("🔥 Auth Provider: Waiting for Firebase...")
        await new Promise((resolve) => setTimeout(resolve, 2000))

        if (!mounted) return

        // Check Firebase status first
        const { getInitializationStatus } = await import("@/lib/firebase")
        const status = getInitializationStatus()
        console.log("📊 Firebase status:", status)

        // Get Firebase services with enhanced error handling
        console.log("🔧 Auth Provider: Getting Firebase services...")
        const { getAuth, getFirestore } = await import("@/lib/firebase")

        // Get auth instance with multiple attempts
        let auth = null
        let attempts = 0
        const maxAttempts = 5

        while (!auth && attempts < maxAttempts && mounted) {
          attempts++
          console.log(`🔄 Auth Provider: Getting auth instance, attempt ${attempts}/${maxAttempts}`)

          try {
            auth = await getAuth(2)
            if (auth) {
              console.log("✅ Auth Provider: Auth instance obtained successfully")
              break
            }
          } catch (error) {
            console.error(`❌ Auth Provider: Auth attempt ${attempts} failed:`, error)
          }

          if (!auth && attempts < maxAttempts) {
            const delay = attempts * 3000
            console.log(`⏳ Auth Provider: Retrying auth in ${delay}ms...`)
            await new Promise((resolve) => setTimeout(resolve, delay))
          }
        }

        if (!auth) {
          throw new Error("Failed to get Firebase Auth instance after multiple attempts")
        }

        // Get Firestore instance
        const db = await getFirestore()
        console.log("🗄️ Auth Provider: Firestore status:", !!db)

        if (mounted) {
          setInitialized(true)
          setError(null)
        }

        // Set up auth state listener
        console.log("👂 Auth Provider: Setting up auth state listener...")
        const { onAuthStateChanged } = await import("firebase/auth")

        unsubscribe = onAuthStateChanged(
          auth,
          async (firebaseUser) => {
            if (!mounted) return

            console.log("🔄 Auth Provider: Auth state changed:", !!firebaseUser)

            try {
              setUser(firebaseUser)

              if (firebaseUser && db) {
                // Fetch user data from Firestore
                const { doc, getDoc } = await import("firebase/firestore")
                const userDoc = await getDoc(doc(db, "users", firebaseUser.uid))

                if (userDoc.exists()) {
                  setUserData({ id: userDoc.id, ...userDoc.data() } as User)
                  console.log("✅ Auth Provider: User data loaded from Firestore")
                } else {
                  setUserData(null)
                  console.log("ℹ️ Auth Provider: No user document found in Firestore")
                }
              } else {
                setUserData(null)
              }
            } catch (error) {
              console.error("❌ Auth Provider: Error fetching user data:", error)
              setUserData(null)
            } finally {
              if (mounted) {
                setLoading(false)
              }
            }
          },
          (authError) => {
            console.error("❌ Auth Provider: Auth state change error:", authError)
            if (mounted) {
              setError("Authentication error occurred")
              setLoading(false)
            }
          },
        )

        console.log("🎉 Auth Provider: Initialization completed successfully")
      } catch (error: any) {
        console.error("💥 Auth Provider: Initialization error:", error)
        if (mounted) {
          setError(error.message || "Failed to initialize authentication")
          setLoading(false)
          setInitialized(true)
        }
      }
    }

    // Start initialization with a longer delay to ensure Firebase is ready
    const timeoutId = setTimeout(initAuth, 3000)

    return () => {
      clearTimeout(timeoutId)
      mounted = false
      if (unsubscribe) {
        try {
          unsubscribe()
        } catch (error) {
          console.error("❌ Auth Provider: Error unsubscribing from auth:", error)
        }
      }
    }
  }, [])

  const signOut = async () => {
    try {
      const { getAuth } = await import("@/lib/firebase")
      const auth = await getAuth()

      if (auth) {
        const { signOut: firebaseSignOut } = await import("firebase/auth")
        await firebaseSignOut(auth)
        setUser(null)
        setUserData(null)
        console.log("✅ Auth Provider: User signed out successfully")
      }
    } catch (error) {
      console.error("❌ Auth Provider: Error signing out:", error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, userData, loading, signOut, initialized, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
