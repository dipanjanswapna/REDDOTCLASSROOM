// Firebase Admin SDK for server-side operations
import { initializeApp, getApps, cert } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import { getAuth } from "firebase-admin/auth"
import { getStorage } from "firebase-admin/storage"

// Firebase Admin configuration using environment variables
const firebaseAdminConfig = {
  credential: cert({
    projectId: "rdcshop-53819",
    clientEmail: "firebase-adminsdk-fbsvc@rdcshop-53819.iam.gserviceaccount.com",
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n") || "",
  }),
  databaseURL: "https://rdcshop-53819-default-rtdb.firebaseio.com",
  storageBucket: "rdcshop-53819.firebasestorage.app",
}

// Initialize admin app if not already initialized
let adminApp: any = null

try {
  adminApp = getApps().find((app) => app.name === "admin") || initializeApp(firebaseAdminConfig, "admin")
} catch (error) {
  console.error("Firebase Admin initialization error:", error)
  // Try to initialize without the admin name if there's a conflict
  try {
    adminApp = getApps()[0] || initializeApp(firebaseAdminConfig)
  } catch (retryError) {
    console.error("Firebase Admin retry initialization error:", retryError)
  }
}

// Export services with error handling
export const adminDb = adminApp ? getFirestore(adminApp) : null
export const adminAuth = adminApp ? getAuth(adminApp) : null
export const adminStorage = adminApp ? getStorage(adminApp) : null

export default adminApp
