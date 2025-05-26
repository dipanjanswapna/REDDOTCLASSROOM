"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Mail, Lock, User, Phone, Eye, EyeOff, AlertCircle, Loader2, TestTube, Sparkles } from "lucide-react"
import { demoSignIn, demoSignUp, demoCredentials } from "@/lib/demo-auth"
import { useDemoAuth } from "@/components/demo-auth-provider"

interface DemoAuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DemoAuthModal({ isOpen, onClose }: DemoAuthModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const { refreshUser } = useDemoAuth()

  if (!isOpen) return null

  const handleDemoLogin = async () => {
    setLoading(true)
    setError(null)
    try {
      console.log("🎭 Demo Auth Modal: Starting demo login...")
      const result = await demoSignIn(demoCredentials.email, demoCredentials.password)
      if (result.user) {
        console.log("✅ Demo Auth Modal: Demo login successful")
        refreshUser()
        onClose()
      } else {
        setError(result.error || "Demo login failed")
      }
    } catch (error: any) {
      console.error("❌ Demo Auth Modal: Demo login error:", error)
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      console.log("📧 Demo Auth Modal: Starting email login...")
      const result = await demoSignIn(loginData.email, loginData.password)
      if (result.user) {
        console.log("✅ Demo Auth Modal: Email login successful")
        refreshUser()
        onClose()
      } else {
        setError(result.error || "Login failed")
      }
    } catch (error: any) {
      console.error("❌ Demo Auth Modal: Login error:", error)
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
      console.log("📝 Demo Auth Modal: Starting email signup...")
      const result = await demoSignUp(signupData.email, signupData.password, signupData.name, signupData.phone)
      if (result.user) {
        console.log("✅ Demo Auth Modal: Email signup successful")
        refreshUser()
        onClose()
      } else {
        setError(result.error || "Signup failed")
      }
    } catch (error: any) {
      console.error("❌ Demo Auth Modal: Signup error:", error)
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
          <CardTitle className="text-center flex items-center justify-center space-x-2">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <span>EduLMS Demo</span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          {/* Demo Login Section */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <TestTube className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-blue-800">ডেমো অ্যাকাউন্ট</h3>
            </div>
            <p className="text-sm text-blue-700 mb-3">Firebase ছাড়াই demo authentication system ব্যবহার করুন:</p>
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
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
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
            </TabsContent>
          </Tabs>

          {/* Demo Info */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 text-center">
              🎭 This is a demo authentication system using localStorage. No real Firebase connection required!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
