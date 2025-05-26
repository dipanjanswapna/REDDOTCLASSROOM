"use client"

import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  GraduationCap,
  Users,
  BookOpen,
  Star,
  TrendingUp,
  Calendar,
  MessageSquare,
  DollarSign,
  Clock,
  Award,
} from "lucide-react"
import { useDemoAuth } from "@/components/demo-auth-provider"

export default function TeacherDashboard() {
  const { user, loading } = useDemoAuth()

  useEffect(() => {
    if (!loading && (!user || user.role !== "teacher")) {
      window.location.href = "/"
    }
  }, [user, loading])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!user || user.role !== "teacher") {
    return null
  }

  const teacherStats = [
    { title: "মোট শিক্ষার্থী", value: "১২,৫০০+", icon: Users, color: "text-blue-400" },
    { title: "সক্রিয় কোর্স", value: "৮টি", icon: BookOpen, color: "text-green-400" },
    { title: "গড় রেটিং", value: "৪.৯/৫", icon: Star, color: "text-yellow-400" },
    { title: "মাসিক আয়", value: "৫০,০০০ টাকা", icon: DollarSign, color: "text-purple-400" },
  ]

  const recentActivities = [
    { type: "new_enrollment", message: "৫০ জন নতুন শিক্ষার্থী HSC Physics কোর্সে ভর্তি হয়েছে", time: "২ ঘন্টা আগে" },
    { type: "live_class", message: "আজ রাত ৮টায় Quantum Mechanics এর লাইভ ক্লাস", time: "৪ ঘন্টা আগে" },
    { type: "review", message: "নতুন ৫-স্টার রিভিউ পেয়েছেন", time: "৬ ঘন্টা আগে" },
    { type: "assignment", message: "২৫টি অ্যাসাইনমেন্ট চেক করার জন্য অপেক্ষমান", time: "১ দিন আগে" },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">স্বাগতম, {user.name}</h1>
              <p className="text-gray-300">শিক্ষক ড্যাশবোর্ড</p>
              <Badge className="bg-blue-600 text-white mt-1">{user.profile?.specialization || "Physics Expert"}</Badge>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {teacherStats.map((stat, index) => (
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>দ্রুত কাজ</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button className="bg-blue-600 hover:bg-blue-700 h-20 flex-col">
                    <BookOpen className="w-6 h-6 mb-2" />
                    <span className="text-sm">নতুন কোর্স</span>
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700 h-20 flex-col">
                    <Calendar className="w-6 h-6 mb-2" />
                    <span className="text-sm">লাইভ ক্লাস</span>
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700 h-20 flex-col">
                    <MessageSquare className="w-6 h-6 mb-2" />
                    <span className="text-sm">Q&A</span>
                  </Button>
                  <Button className="bg-orange-600 hover:bg-orange-700 h-20 flex-col">
                    <Award className="w-6 h-6 mb-2" />
                    <span className="text-sm">সার্টিফিকেট</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>সাম্প্রতিক কার্যক্রম</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-700 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-white text-sm">{activity.message}</p>
                        <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>প্রোফাইল সারসংক্ষেপ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <img
                    src={user.avatar || "/placeholder.svg"}
                    alt="Profile"
                    className="w-20 h-20 rounded-full mx-auto mb-3"
                  />
                  <h3 className="font-semibold">{user.name}</h3>
                  <p className="text-sm text-gray-400">{user.email}</p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">বিশেষত্ব:</span>
                    <span>{user.profile?.specialization || "Physics"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">অভিজ্ঞতা:</span>
                    <span>১৫+ বছর</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">রেটিং:</span>
                    <span className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      ৪.৯/৫
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Classes */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>আসন্ন ক্লাস</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-900/30 rounded-lg border border-blue-700">
                    <h4 className="font-medium text-blue-300">Quantum Mechanics</h4>
                    <p className="text-sm text-gray-400">আজ রাত ৮:০০ PM</p>
                    <p className="text-xs text-gray-500">২৫০+ শিক্ষার্থী যোগ দেবে</p>
                  </div>
                  <div className="p-3 bg-green-900/30 rounded-lg border border-green-700">
                    <h4 className="font-medium text-green-300">Wave Motion</h4>
                    <p className="text-sm text-gray-400">কাল সকাল ১০:০০ AM</p>
                    <p className="text-xs text-gray-500">১৮০+ শিক্ষার্থী যোগ দেবে</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
