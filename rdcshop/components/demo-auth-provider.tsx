"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "@/lib/types"
import { getCurrentDemoUser, demoSignOut, isDemoLoggedIn } from "@/lib/demo-auth"

interface DemoAuthContextType {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
  refreshUser: () => void
  error: string | null
}

const DemoAuthContext = createContext<DemoAuthContextType | undefined>(undefined)

export function DemoAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refreshUser = () => {
    try {
      const currentUser = getCurrentDemoUser()
      setUser(currentUser)
      console.log("🔄 Demo Auth Provider: User refreshed:", !!currentUser)
    } catch (error: any) {
      console.error("❌ Demo Auth Provider: Error refreshing user:", error)
      setError(error.message)
    }
  }

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") {
      setLoading(false)
      return
    }

    console.log("🎭 Demo Auth Provider: Initializing...")

    try {
      // Check if user is logged in
      const isLoggedIn = isDemoLoggedIn()
      console.log("🔍 Demo Auth Provider: Is logged in:", isLoggedIn)

      if (isLoggedIn) {
        const currentUser = getCurrentDemoUser()
        setUser(currentUser)
        console.log("✅ Demo Auth Provider: User loaded:", !!currentUser)
      } else {
        setUser(null)
        console.log("ℹ️ Demo Auth Provider: No user logged in")
      }

      setError(null)
    } catch (error: any) {
      console.error("❌ Demo Auth Provider: Initialization error:", error)
      setError(error.message || "Failed to initialize demo authentication")
      setUser(null)
    } finally {
      setLoading(false)
      console.log("🎉 Demo Auth Provider: Initialization completed")
    }

    // Listen for storage changes (for multi-tab support)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "edulms_demo_logged_in" || e.key === "edulms_demo_user") {
        console.log("🔄 Demo Auth Provider: Storage changed, refreshing user...")
        refreshUser()
      }
    }

    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  const signOut = async () => {
    try {
      console.log("🚪 Demo Auth Provider: Signing out...")
      await demoSignOut()
      setUser(null)
      setError(null)
      console.log("✅ Demo Auth Provider: Sign out successful")
    } catch (error: any) {
      console.error("❌ Demo Auth Provider: Sign out error:", error)
      setError(error.message || "Failed to sign out")
    }
  }

  return (
    <DemoAuthContext.Provider value={{ user, loading, signOut, refreshUser, error }}>
      {children}
    </DemoAuthContext.Provider>
  )
}

export function useDemoAuth() {
  const context = useContext(DemoAuthContext)
  if (context === undefined) {
    throw new Error("useDemoAuth must be used within a DemoAuthProvider")
  }
  return context
}
