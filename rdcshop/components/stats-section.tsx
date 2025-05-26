"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, BookOpen, Award, Star, TrendingUp, Globe } from "lucide-react"

const stats = [
  {
    icon: Users,
    label: "মোট শিক্ষার্থী",
    value: "৫,০০,০০০+",
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
  },
  {
    icon: BookOpen,
    label: "কোর্স সংখ্যা",
    value: "৫০০+",
    color: "text-green-400",
    bgColor: "bg-green-500/20",
  },
  {
    icon: Award,
    label: "সফল শিক্ষার্থী",
    value: "৪,৭৫,০০০+",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/20",
  },
  {
    icon: Star,
    label: "গড় রেটিং",
    value: "৪.৯/৫",
    color: "text-purple-400",
    bgColor: "bg-purple-500/20",
  },
  {
    icon: TrendingUp,
    label: "সফলতার হার",
    value: "৯৫%",
    color: "text-red-400",
    bgColor: "bg-red-500/20",
  },
  {
    icon: Globe,
    label: "দেশ ও বিদেশে",
    value: "৫০+ শহর",
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/20",
  },
]

export function StatsSection() {
  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">আমাদের সাফল্যের গল্প</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">বাংলাদেশের সবচেয়ে বড় অনলাইন শিক্ষা প্ল্যাটফর্মে আমাদের অর্জনসমূহ</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all group">
            <CardContent className="p-6 text-center">
              <div className="space-y-3">
                <div
                  className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform`}
                >
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Achievement Highlights */}
      <Card className="bg-gradient-to-r from-green-900 to-emerald-900 border-0 text-white">
        <CardContent className="p-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-yellow-400">#১</div>
              <div className="text-green-200">বাংলাদেশের শীর্ষ শিক্ষা প্ল্যাটফর্ম</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-yellow-400">৯৮%</div>
              <div className="text-green-200">শিক্ষার্থী সন্তুষ্টির হার</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-yellow-400">২৪/৭</div>
              <div className="text-green-200">সাপোর্ট সেবা</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
