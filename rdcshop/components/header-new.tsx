"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Menu, X, Phone, ShoppingCart, Globe, ChevronDown, User, LogOut } from "lucide-react"
import { DemoAuthModal } from "@/components/demo-auth-modal"
import { useDemoAuth } from "@/components/demo-auth-provider"

export function HeaderNew() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("BN")
  const { user, loading, signOut, error } = useDemoAuth()

  const navigation = [
    { name: "ক্লাস ৬-১২", href: "/academic", hasDropdown: true },
    { name: "স্কিলস", href: "/skills", hasDropdown: true },
    { name: "ভর্তি পরীক্ষা", href: "/admission", hasDropdown: false },
    { name: "অনলাইন ব্যাচ", href: "/batches", hasDropdown: false },
    { name: "ইউনিভার্সিটি কোর্স", href: "/university", hasDropdown: true },
    { name: "আরো", href: "/more", hasDropdown: true },
  ]

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  return (
    <>
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10">
                <img src="/placeholder.svg?height=40&width=120" alt="EduLMS" className="h-full w-auto" />
              </div>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="কোর্স, বই বা টিউটর খুঁজে নিন..."
                  className="pl-10 pr-4 py-2 w-full border-gray-300 rounded-lg"
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors py-2"
                  >
                    <span className="text-sm font-medium">{item.name}</span>
                    {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="hidden sm:flex items-center space-x-1 text-sm">
                <Globe className="w-4 h-4 text-gray-600" />
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="border-0 bg-transparent text-gray-700 font-medium"
                >
                  <option value="BN">BN</option>
                  <option value="EN">EN</option>
                </select>
              </div>

              {/* Phone */}
              <div className="hidden sm:flex items-center space-x-1 text-green-600">
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">16910</span>
              </div>

              {/* Cart */}
              <Link href="/cart" className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-green-600" />
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center p-0">
                  3
                </Badge>
              </Link>

              {/* Auth Section */}
              {loading ? (
                <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
              ) : user ? (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2">
                    {user.avatar ? (
                      <img src={user.avatar || "/placeholder.svg"} alt="Profile" className="w-8 h-8 rounded-full" />
                    ) : (
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <span className="text-sm font-medium text-gray-700 hidden sm:block">
                      {user.name || user.email?.split("@")[0]}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    className="text-gray-600 hover:text-red-600"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
                >
                  লগ-ইন
                </Button>
              )}

              {/* Mobile menu button */}
              <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="px-4 py-3 space-y-3">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input placeholder="কোর্স, বই বা টিউটর খুঁজে নিন..." className="pl-10 pr-4 py-2 w-full" />
              </div>

              {/* Mobile Menu Items */}
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Auth */}
              {!user && (
                <Button
                  onClick={() => {
                    setIsAuthModalOpen(true)
                    setIsMenuOpen(false)
                  }}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  লগ-ইন
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Demo Notice */}
        {!error && (
          <div className="bg-blue-50 border-b border-blue-200 px-4 py-2">
            <p className="text-sm text-blue-800 text-center">
              🎭 Demo Mode: Firebase ছাড়াই authentication system চালু আছে। "ডেমো লগইন" ব্যবহার করুন!
            </p>
          </div>
        )}
      </header>

      <DemoAuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  )
}
