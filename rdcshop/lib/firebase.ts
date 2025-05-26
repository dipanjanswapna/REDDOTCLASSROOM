// Firebase configuration with proper component registration sequence
import { initializeApp, getApps, type FirebaseApp } from "firebase/app"

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAntk2yVUghwJzR_DmSEHmGqrY5qrUfEpo",
  authDomain: "rdcshop-53819.firebaseapp.com",
  databaseURL: "https://rdcshop-53819-default-rtdb.firebaseio.com",
  projectId: "rdcshop-53819",
  storageBucket: "rdcshop-53819.firebasestorage.app",
  messagingSenderId: "497795678957",
  appId: "1:497795678957:web:10f8842d18f171573402e4",
  measurementId: "G-HL320LVFPT",
}

// Global state with better tracking
let app: FirebaseApp | null = null
let authInstance: any = null
let firestoreInstance: any = null
let storageInstance: any = null
let isInitializing = false
let isInitialized = false
let initializationError: string | null = null

// Initialize Firebase with proper component registration
const initializeFirebase = async (): Promise<{ success: boolean; error?: string }> => {
  if (typeof window === "undefined") {
    console.log("Server side - Firebase not available")
    return { success: false, error: "Server side environment" }
  }

  // Prevent multiple simultaneous initializations
  if (isInitializing) {
    console.log("Firebase initialization already in progress...")
    // Wait for current initialization to complete
    while (isInitializing) {
      await new Promise((resolve) => setTimeout(resolve, 100))
    }
    return { success: isInitialized, error: initializationError || undefined }
  }

  if (isInitialized && app && authInstance && firestoreInstance) {
    console.log("Firebase already initialized successfully")
    return { success: true }
  }

  isInitializing = true
  initializationError = null

  try {
    console.log("🔥 Starting Firebase initialization...")

    // Step 1: Initialize Firebase App
    console.log("📱 Initializing Firebase App...")
    const existingApps = getApps()
    if (existingApps.length > 0) {
      app = existingApps[0]
      console.log("✅ Using existing Firebase app")
    } else {
      app = initializeApp(firebaseConfig)
      console.log("✅ New Firebase app created")
    }

    // Step 2: Wait for app to be fully ready
    console.log("⏳ Waiting for app to be ready...")
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Step 3: Initialize Auth service with proper error handling
    console.log("🔐 Initializing Auth service...")
    try {
      // Import auth module first
      const authModule = await import("firebase/auth")
      console.log("📦 Auth module imported successfully")

      // Initialize auth with the app
      authInstance = authModule.getAuth(app)
      console.log("🔑 Auth instance created")

      // Wait for auth to be ready with a promise
      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error("Auth initialization timeout"))
        }, 10000)

        try {
          const unsubscribe = authInstance.onAuthStateChanged(
            () => {
              clearTimeout(timeout)
              unsubscribe()
              console.log("✅ Auth service ready")
              resolve()
            },
            (error: any) => {
              clearTimeout(timeout)
              unsubscribe()
              console.error("❌ Auth state error:", error)
              reject(error)
            },
          )
        } catch (error) {
          clearTimeout(timeout)
          reject(error)
        }
      })
    } catch (authError) {
      console.error("❌ Auth initialization failed:", authError)
      throw new Error(`Auth initialization failed: ${authError}`)
    }

    // Step 4: Initialize Firestore service
    console.log("🗄️ Initializing Firestore service...")
    try {
      const firestoreModule = await import("firebase/firestore")
      console.log("📦 Firestore module imported successfully")

      firestoreInstance = firestoreModule.getFirestore(app)
      console.log("🗃️ Firestore instance created")

      // Test Firestore connection
      await firestoreModule.enableNetwork(firestoreInstance)
      console.log("✅ Firestore service ready")
    } catch (firestoreError) {
      console.error("❌ Firestore initialization failed:", firestoreError)
      throw new Error(`Firestore initialization failed: ${firestoreError}`)
    }

    // Step 5: Initialize Storage service (optional)
    console.log("📁 Initializing Storage service...")
    try {
      const storageModule = await import("firebase/storage")
      storageInstance = storageModule.getStorage(app)
      console.log("✅ Storage service ready")
    } catch (storageError) {
      console.warn("⚠️ Storage service not available:", storageError)
      // Storage is optional, don't fail initialization
    }

    // Step 6: Final verification
    console.log("🔍 Final verification...")
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (!authInstance || !firestoreInstance) {
      throw new Error("Required Firebase services not properly initialized")
    }

    isInitialized = true
    console.log("🎉 Firebase initialization completed successfully!")
    return { success: true }
  } catch (error: any) {
    console.error("💥 Firebase initialization error:", error)
    initializationError = error.message || "Unknown initialization error"

    // Reset everything on error
    app = null
    authInstance = null
    firestoreInstance = null
    storageInstance = null
    isInitialized = false

    return { success: false, error: initializationError }
  } finally {
    isInitializing = false
  }
}

// Get Auth service with comprehensive error handling
export const getAuth = async (retries = 3): Promise<any> => {
  if (typeof window === "undefined") {
    console.log("Server side - Auth not available")
    return null
  }

  // Return cached instance if available and verified
  if (authInstance && isInitialized) {
    console.log("🔑 Returning cached Auth instance")
    return authInstance
  }

  console.log("🔐 Getting Auth service...")

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`🔄 Auth attempt ${attempt}/${retries}`)

      const result = await initializeFirebase()

      if (result.success && authInstance) {
        console.log("✅ Auth service ready")
        return authInstance
      }

      if (attempt < retries) {
        const delay = attempt * 2000
        console.log(`⏳ Auth retry in ${delay}ms...`)
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    } catch (error) {
      console.error(`❌ Auth attempt ${attempt} failed:`, error)
      if (attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 2000))
      }
    }
  }

  console.error("💥 Firebase Auth not available after all retries")
  return null
}

// Get Firestore service with comprehensive error handling
export const getFirestore = async (retries = 3): Promise<any> => {
  if (typeof window === "undefined") {
    console.log("Server side - Firestore not available")
    return null
  }

  if (firestoreInstance && isInitialized) {
    console.log("🗃️ Returning cached Firestore instance")
    return firestoreInstance
  }

  console.log("🗄️ Getting Firestore service...")

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`🔄 Firestore attempt ${attempt}/${retries}`)

      const result = await initializeFirebase()

      if (result.success && firestoreInstance) {
        console.log("✅ Firestore service ready")
        return firestoreInstance
      }

      if (attempt < retries) {
        const delay = attempt * 2000
        console.log(`⏳ Firestore retry in ${delay}ms...`)
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    } catch (error) {
      console.error(`❌ Firestore attempt ${attempt} failed:`, error)
      if (attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 2000))
      }
    }
  }

  console.error("💥 Firestore not available after all retries")
  return null
}

// Get Storage service
export const getStorage = async (): Promise<any> => {
  if (typeof window === "undefined") {
    return null
  }

  if (storageInstance && isInitialized) {
    return storageInstance
  }

  const result = await initializeFirebase()

  if (result.success && storageInstance) {
    return storageInstance
  }

  console.warn("⚠️ Storage not available")
  return null
}

// Check if Firebase is ready
export const isFirebaseReady = async (): Promise<boolean> => {
  if (typeof window === "undefined") {
    return false
  }

  try {
    console.log("🔍 Checking Firebase readiness...")

    if (isInitialized && authInstance && firestoreInstance) {
      console.log("✅ Firebase is ready (cached)")
      return true
    }

    const result = await initializeFirebase()

    if (result.success && authInstance && firestoreInstance) {
      console.log("✅ Firebase is ready (newly initialized)")
      return true
    }

    console.log("❌ Firebase is not ready")
    return false
  } catch (error) {
    console.error("💥 Error checking Firebase readiness:", error)
    return false
  }
}

// Force re-initialization
export const reinitializeFirebase = async (): Promise<boolean> => {
  console.log("🔄 Force reinitializing Firebase...")

  // Reset everything
  app = null
  authInstance = null
  firestoreInstance = null
  storageInstance = null
  isInitializing = false
  isInitialized = false
  initializationError = null

  // Wait before reinitializing
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const result = await initializeFirebase()
  return result.success
}

// Get initialization status
export const getInitializationStatus = () => {
  return {
    isInitializing,
    isInitialized,
    hasAuth: !!authInstance,
    hasFirestore: !!firestoreInstance,
    hasStorage: !!storageInstance,
    error: initializationError,
  }
}

// Reset function for testing
export const resetFirebase = () => {
  app = null
  authInstance = null
  firestoreInstance = null
  storageInstance = null
  isInitializing = false
  isInitialized = false
  initializationError = null
  console.log("🔄 Firebase instances reset")
}

export default app
