"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Mail, Lock, User, Phone, Eye, EyeOff, Chrome, AlertCircle, Loader2, TestTube } from "lucide-react"
import { signInWithEmail, signUpWithEmail, signInWithGoogle } from "@/lib/auth"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [googleDisabled, setGoogleDisabled] = useState(false)
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  if (!isOpen) return null

  // Demo credentials
  const demoCredentials = {
    email: "demo@edulms.com",
    password: "demo123456",
  }

  const handleDemoLogin = async () => {
    setLoading(true)
    setError(null)
    try {
      console.log("Auth Modal: Starting demo login...")
      const result = await signInWithEmail(demoCredentials.email, demoCredentials.password)
      if (result.user) {
        console.log("Auth Modal: Demo login successful, closing modal")
        onClose()
      } else {
        // If demo user doesn't exist, create it
        console.log("Auth Modal: Demo user not found, creating demo account...")
        const signupResult = await signUpWithEmail(
          demoCredentials.email,
          demoCredentials.password,
          "Demo User",
          "+8801700000000",
        )
        if (signupResult.user) {
          console.log("Auth Modal: Demo account created and logged in successfully")
          onClose()
        } else {
          setError(signupResult.error || "Failed to create demo account")
        }
      }
    } catch (error: any) {
      console.error("Auth Modal: Demo login error:", error)
      setError(error.message || "Demo login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const fillDemoCredentials = () => {
    setLoginData({
      email: demoCredentials.email,
      password: demoCredentials.password,
    })
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError(null)
    try {
      console.log("Auth Modal: Starting Google login...")

      // Add a delay to ensure Firebase is ready
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const result = await signInWithGoogle()
      if (result.user) {
        console.log("Auth Modal: Google login successful, closing modal")
        onClose()
      } else {
        setError(result.error || "Google login failed")

        // If it's an unauthorized domain error, disable Google login
        if (result.error?.includes("not configured for this domain")) {
          setGoogleDisabled(true)
        }
      }
    } catch (error: any) {
      console.error("Auth Modal: Google login error:", error)
      const errorMessage = error.message || "Google login failed. Please try again."
      setError(errorMessage)

      // If it's an unauthorized domain error, disable Google login
      if (errorMessage.includes("not configured for this domain")) {
        setGoogleDisabled(true)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      console.log("Auth Modal: Starting email login...")
      const result = await signInWithEmail(loginData.email, loginData.password)
      if (result.user) {
        console.log("Auth Modal: Email login successful, closing modal")
        onClose()
      } else {
        setError(result.error || "Login failed")
      }
    } catch (error: any) {
      console.error("Auth Modal: Login error:", error)
      setError(error.message || "Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (signupData.password !== signupData.confirmPassword) {
      setError("Passwords don't match")
      return
    }

    setLoading(true)
    setError(null)
    try {
      console.log("Auth Modal: Starting email signup...")
      const result = await signUpWithEmail(signupData.email, signupData.password, signupData.name, signupData.phone)
      if (result.user) {
        console.log("Auth Modal: Email signup successful, closing modal")
        onClose()
      } else {
        setError(result.error || "Signup failed")
      }
    } catch (error: any) {
      console.error("Auth Modal: Signup error:", error)
      setError(error.message || "Signup failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
          <CardTitle className="text-center">Welcome to EduLMS</CardTitle>
        </CardHeader>

        <CardContent>
          {/* Demo Login Section */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <TestTube className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-blue-800">ডেমো অ্যাকাউন্ট</h3>
            </div>
            <p className="text-sm text-blue-700 mb-3">দ্রুত টেস্ট করার জন্য ডেমো অ্যাকাউন্ট ব্যবহার করুন:</p>
            <div className="bg-white rounded border border-blue-200 p-3 mb-3">
              <div className="text-sm space-y-1">
                <div>
                  <strong>ইমেইল:</strong> {demoCredentials.email}
                </div>
                <div>
                  <strong>পাসওয়ার্ড:</strong> {demoCredentials.password}
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={handleDemoLogin}
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                size="sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    লগইন হচ্ছে...
                  </>
                ) : (
                  <>
                    <TestTube className="w-4 h-4 mr-2" />
                    ডেমো লগইন
                  </>
                )}
              </Button>
              <Button onClick={fillDemoCredentials} variant="outline" size="sm" disabled={loading}>
                ফিল করুন
              </Button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          )}

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10 pr-10"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      disabled={loading}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" disabled={loading} />
                    <span>Remember me</span>
                  </label>
                  <button type="button" className="text-blue-600 hover:underline" disabled={loading}>
                    Forgot password?
                  </button>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleLogin}
                disabled={loading || googleDisabled}
              >
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Chrome className="w-4 h-4 mr-2" />}
                {googleDisabled ? "Google Sign-in Unavailable" : "Continue with Google"}
              </Button>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      className="pl-10"
                      value={signupData.name}
                      onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      className="pl-10"
                      value={signupData.phone}
                      onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="pl-10 pr-10"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      required
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      disabled={loading}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      className="pl-10"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" className="rounded" required disabled={loading} />
                  <span>I agree to the Terms of Service and Privacy Policy</span>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleLogin}
                disabled={loading || googleDisabled}
              >
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Chrome className="w-4 h-4 mr-2" />}
                {googleDisabled ? "Google Sign-in Unavailable" : "Continue with Google"}
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
        {googleDisabled && (
          <div className="text-center pb-4">
            <p className="text-sm text-gray-600">
              Google sign-in is temporarily unavailable. Please use email/password to continue.
            </p>
          </div>
        )}
      </Card>
    </div>
  )
}
