"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  X,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  GraduationCap,
  Shield,
  Users,
  Crown,
  TestTube,
} from "lucide-react"
import { demoSignIn, getAllDemoCredentials } from "@/lib/demo-auth"
import { useDemoAuth } from "@/components/demo-auth-provider"

interface FooterLoginModalProps {
  isOpen: boolean
  onClose: () => void
  defaultRole?: "teacher" | "admin" | "affiliate"
}

export function FooterLoginModal({ isOpen, onClose, defaultRole = "teacher" }: FooterLoginModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeRole, setActiveRole] = useState(defaultRole)
  const [loginData, setLoginData] = useState({ email: "", password: "" })

  const { refreshUser } = useDemoAuth()

  if (!isOpen) return null

  const allCredentials = getAllDemoCredentials()

  const roleConfig = {
    teacher: {
      title: "শিক্ষক লগইন",
      icon: GraduationCap,
      color: "from-blue-600 to-blue-700",
      bgColor: "bg-blue-50",
      textColor: "text-blue-800",
      borderColor: "border-blue-200",
      description: "শিক্ষক হিসেবে লগইন করুন এবং আপনার কোর্স ও শিক্ষার্থীদের পরিচালনা করুন",
    },
    admin: {
      title: "অ্যাডমিন লগইন",
      icon: Shield,
      color: "from-red-600 to-red-700",
      bgColor: "bg-red-50",
      textColor: "text-red-800",
      borderColor: "border-red-200",
      description: "অ্যাডমিন হিসেবে লগইন করুন এবং সম্পূর্ণ প্ল্যাটফর্ম পরিচালনা করুন",
    },
    affiliate: {
      title: "অ্যাফিলিয়েট লগইন",
      icon: Users,
      color: "from-green-600 to-green-700",
      bgColor: "bg-green-50",
      textColor: "text-green-800",
      borderColor: "border-green-200",
      description: "অ্যাফিলিয়েট পার্টনার হিসেবে লগইন করুন এবং আপনার কমিশন ট্র্যাক করুন",
    },
  }

  const currentConfig = roleConfig[activeRole]
  const CurrentIcon = currentConfig.icon

  const handleQuickLogin = async (role: keyof typeof allCredentials) => {
    setLoading(true)
    setError(null)
    try {
      console.log(`🎭 Footer Login: Quick ${role} login...`)
      const credentials = allCredentials[role]
      const result = await demoSignIn(credentials.email, credentials.password)
      if (result.user) {
        console.log(`✅ Footer Login: ${role} login successful`)
        refreshUser()
        onClose()

        // Redirect based on role
        if (role === "admin") {
          window.location.href = "/admin"
        } else if (role === "teacher") {
          window.location.href = "/teacher"
        } else if (role === "affiliate") {
          window.location.href = "/affiliate"
        }
      } else {
        setError(result.error || `${role} login failed`)
      }
    } catch (error: any) {
      console.error(`❌ Footer Login: ${role} login error:`, error)
      setError(error.message || `${role} login failed. Please try again.`)
    } finally {
      setLoading(false)
    }
  }

  const fillCredentials = (role: keyof typeof allCredentials) => {
    const credentials = allCredentials[role]
    setLoginData({
      email: credentials.email,
      password: credentials.password,
    })
    setActiveRole(role as any)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      console.log("📧 Footer Login: Manual login...")
      const result = await demoSignIn(loginData.email, loginData.password)
      if (result.user) {
        console.log("✅ Footer Login: Manual login successful")
        refreshUser()
        onClose()

        // Redirect based on user role
        if (result.user.role === "admin") {
          window.location.href = "/admin"
        } else if (result.user.role === "teacher") {
          window.location.href = "/teacher"
        } else if (result.user.role === "affiliate") {
          window.location.href = "/affiliate"
        }
      } else {
        setError(result.error || "Login failed")
      }
    } catch (error: any) {
      console.error("❌ Footer Login: Login error:", error)
      setError(error.message || "Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg bg-white">
        <CardHeader className="relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
          <CardTitle className="text-center flex items-center justify-center space-x-2">
            <Crown className="w-6 h-6 text-purple-600" />
            <span>Professional Login</span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          {/* Role Selector */}
          <Tabs value={activeRole} onValueChange={(value) => setActiveRole(value as any)} className="w-full mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="teacher" className="text-xs">
                <GraduationCap className="w-4 h-4 mr-1" />
                শিক্ষক
              </TabsTrigger>
              <TabsTrigger value="admin" className="text-xs">
                <Shield className="w-4 h-4 mr-1" />
                অ্যাডমিন
              </TabsTrigger>
              <TabsTrigger value="affiliate" className="text-xs">
                <Users className="w-4 h-4 mr-1" />
                অ্যাফিলিয়েট
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Current Role Info */}
          <div className={`mb-6 p-4 ${currentConfig.bgColor} ${currentConfig.borderColor} border rounded-lg`}>
            <div className="flex items-center space-x-2 mb-2">
              <CurrentIcon className={`w-5 h-5 ${currentConfig.textColor}`} />
              <h3 className={`font-semibold ${currentConfig.textColor}`}>{currentConfig.title}</h3>
            </div>
            <p className={`text-sm ${currentConfig.textColor}`}>{currentConfig.description}</p>
          </div>

          {/* Quick Login Buttons */}
          <div className="mb-6 space-y-3">
            <h4 className="text-sm font-medium text-gray-700 mb-3">দ্রুত ডেমো লগইন:</h4>

            <div className="grid gap-2">
              {Object.entries(roleConfig).map(([role, config]) => {
                const Icon = config.icon
                const credentials = allCredentials[role as keyof typeof allCredentials]
                return (
                  <div key={role} className="flex items-center space-x-2">
                    <Button
                      onClick={() => handleQuickLogin(role as keyof typeof allCredentials)}
                      disabled={loading}
                      className={`flex-1 bg-gradient-to-r ${config.color} hover:opacity-90 text-white`}
                      size="sm"
                    >
                      {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Icon className="w-4 h-4 mr-2" />}
                      {role === "teacher" && "শিক্ষক লগইন"}
                      {role === "admin" && "অ্যাডমিন লগইন"}
                      {role === "affiliate" && "অ্যাফিলিয়েট লগইন"}
                    </Button>
                    <Button
                      onClick={() => fillCredentials(role as keyof typeof allCredentials)}
                      variant="outline"
                      size="sm"
                      disabled={loading}
                      className="px-3"
                    >
                      Fill
                    </Button>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Demo Credentials Display */}
          <div className="mb-6 p-3 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">ডেমো Credentials:</h4>
            <div className="space-y-2 text-xs">
              {Object.entries(allCredentials).map(([role, creds]) => (
                <div key={role} className="flex justify-between items-center">
                  <span className="font-medium capitalize">{role}:</span>
                  <span className="text-gray-600">
                    {creds.email} / {creds.password}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          )}

          {/* Manual Login Form */}
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

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  <CurrentIcon className="w-4 h-4 mr-2" />
                  {currentConfig.title}
                </>
              )}
            </Button>
          </form>

          {/* Demo Info */}
          <div className="mt-4 p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <TestTube className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">Demo Mode</span>
            </div>
            <p className="text-xs text-purple-700">
              এটি একটি demo authentication system। Firebase integration পরে যোগ করা হবে।
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
