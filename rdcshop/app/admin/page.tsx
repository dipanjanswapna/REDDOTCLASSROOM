"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, Users, BookOpen, ShoppingCart, Settings, BarChart3 } from "lucide-react"

export default function AdminPage() {
  const [seeding, setSeeding] = useState(false)
  const [seedResult, setSeedResult] = useState<string | null>(null)

  const handleSeedDatabase = async () => {
    setSeeding(true)
    setSeedResult(null)

    try {
      const response = await fetch("/api/seed", {
        method: "POST",
      })

      if (response.ok) {
        setSeedResult("Database seeded successfully! ✅")
      } else {
        setSeedResult("Failed to seed database ❌")
      }
    } catch (error) {
      setSeedResult("Error seeding database ❌")
    } finally {
      setSeeding(false)
    }
  }

  const adminStats = [
    { title: "মোট শিক্ষার্থী", value: "৫,০০,০০০+", icon: Users, color: "text-blue-400" },
    { title: "মোট কোর্স", value: "৫০০+", icon: BookOpen, color: "text-green-400" },
    { title: "মোট অর্ডার", value: "২৫,০০০+", icon: ShoppingCart, color: "text-purple-400" },
    { title: "মাসিক রেভিনিউ", value: "৫০ লক্ষ টাকা", icon: BarChart3, color: "text-yellow-400" },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">অ্যাডমিন ড্যাশবোর্ড</h1>
          <p className="text-gray-300">EduLMS প্ল্যাটফর্ম ম্যানেজমেন্ট</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {adminStats.map((stat, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Database Setup */}
        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="w-6 h-6" />
              <span>ডেটাবেস সেটআপ</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300">প্রাথমিক ডেটা (কোর্স, কুপন, অ্যাডমিন ইউজার) দিয়ে ডেটাবেস সেটআপ করুন</p>

            <div className="flex items-center space-x-4">
              <Button onClick={handleSeedDatabase} disabled={seeding} className="bg-blue-600 hover:bg-blue-700">
                {seeding ? "সেটআপ করা হচ্ছে..." : "ডেটাবেস সেটআপ করুন"}
              </Button>

              {seedResult && (
                <Badge variant={seedResult.includes("✅") ? "default" : "destructive"}>{seedResult}</Badge>
              )}
            </div>

            <div className="text-sm text-gray-400">
              <p>এই অপশনটি নিম্নলিখিত ডেটা যোগ করবে:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>৩টি নমুনা কোর্স (HSC Physics, IELTS Speaking, Web Development)</li>
                <li>২টি কুপন কোড (NEWUSER50, STUDENT30)</li>
                <li>১টি অ্যাডমিন ইউজার অ্যাকাউন্ট</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">ইউজার ম্যানেজমেন্ট</h3>
              <p className="text-gray-400 text-sm">শিক্ষার্থী ও শিক্ষক অ্যাকাউন্ট পরিচালনা</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <BookOpen className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">কোর্স ম্যানেজমেন্ট</h3>
              <p className="text-gray-400 text-sm">কোর্স যোগ, সম্পাদনা ও পরিচালনা</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <Settings className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">সিস্টেম সেটিংস</h3>
              <p className="text-gray-400 text-sm">প্ল্যাটফর্ম কনফিগারেশন ও সেটিংস</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
