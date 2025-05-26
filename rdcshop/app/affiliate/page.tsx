"use client"

import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, DollarSign, TrendingUp, Share2, Gift, Target, Award, Copy, ExternalLink } from "lucide-react"
import { useDemoAuth } from "@/components/demo-auth-provider"

export default function AffiliateDashboard() {
  const { user, loading } = useDemoAuth()

  useEffect(() => {
    if (!loading && (!user || user.role !== "affiliate")) {
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

  if (!user || user.role !== "affiliate") {
    return null
  }

  const affiliateStats = [
    { title: "মোট রেফারেল", value: "১২৫", icon: Users, color: "text-blue-400" },
    { title: "মোট আয়", value: "৫০,০০০ টাকা", icon: DollarSign, color: "text-green-400" },
    { title: "এই মাসের আয়", value: "১২,৫০০ টাকা", icon: TrendingUp, color: "text-purple-400" },
    { title: "কমিশন রেট", value: "১৫%", icon: Target, color: "text-orange-400" },
  ]

  const recentReferrals = [
    { name: "আহমেদ হাসান", course: "HSC Physics", commission: "৩৭৫ টাকা", date: "২ দিন আগে" },
    { name: "ফাতিমা খান", course: "IELTS Course", commission: "০ টাকা (ফ্রি)", date: "৩ দিন আগে" },
    { name: "করিম উদ্দিন", course: "Web Development", commission: "৪৫০ টাকা", date: "৫ দিন আগে" },
    { name: "রাশিদা বেগম", course: "HSC Math", commission: "৩০০ টাকা", date: "১ সপ্তাহ আগে" },
  ]

  const referralCode = user.profile?.referralCode || "AFF001"
  const referralLink = `https://edulms.com/ref/${referralCode}`

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink)
    alert("Referral link copied!")
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">স্বাগতম, {user.name}</h1>
              <p className="text-gray-300">অ্যাফিলিয়েট ড্যাশবোর্ড</p>
              <Badge className="bg-green-600 text-white mt-1">Referral Code: {referralCode}</Badge>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {affiliateStats.map((stat, index) => (
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
            {/* Referral Tools */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Share2 className="w-5 h-5" />
                  <span>রেফারেল টুলস</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">আপনার রেফারেল লিংক:</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={referralLink}
                      readOnly
                      className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    />
                    <Button onClick={copyReferralLink} size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button className="bg-blue-600 hover:bg-blue-700 h-16 flex-col">
                    <Share2 className="w-5 h-5 mb-1" />
                    <span className="text-xs">শেয়ার করুন</span>
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700 h-16 flex-col">
                    <Gift className="w-5 h-5 mb-1" />
                    <span className="text-xs">প্রমো কোড</span>
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700 h-16 flex-col">
                    <ExternalLink className="w-5 h-5 mb-1" />
                    <span className="text-xs">ব্যানার</span>
                  </Button>
                  <Button className="bg-orange-600 hover:bg-orange-700 h-16 flex-col">
                    <Award className="w-5 h-5 mb-1" />
                    <span className="text-xs">বোনাস</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Referrals */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>সাম্প্রতিক রেফারেল</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReferrals.map((referral, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-white">{referral.name}</h4>
                        <p className="text-sm text-gray-400">{referral.course}</p>
                        <p className="text-xs text-gray-500">{referral.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-400">{referral.commission}</p>
                        <Badge variant="outline" className="text-xs">
                          {referral.commission.includes("০") ? "ফ্রি কোর্স" : "পেইড"}
                        </Badge>
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
                    <span className="text-gray-400">রেফারেল কোড:</span>
                    <span className="font-mono">{referralCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">কমিশন রেট:</span>
                    <span>{user.profile?.commissionRate || 15}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">যোগদানের তারিখ:</span>
                    <span>জুন ২০২৩</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Commission Structure */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>কমিশন স্ট্রাকচার</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-green-900/30 rounded-lg border border-green-700">
                    <h4 className="font-medium text-green-300">পেইড কোর্স</h4>
                    <p className="text-sm text-gray-400">১৫% কমিশন</p>
                  </div>
                  <div className="p-3 bg-blue-900/30 rounded-lg border border-blue-700">
                    <h4 className="font-medium text-blue-300">ফ্রি কোর্স</h4>
                    <p className="text-sm text-gray-400">৫০ টাকা বোনাস</p>
                  </div>
                  <div className="p-3 bg-purple-900/30 rounded-lg border border-purple-700">
                    <h4 className="font-medium text-purple-300">প্রিমিয়াম কোর্স</h4>
                    <p className="text-sm text-gray-400">২০% কমিশন</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Info */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>পেমেন্ট তথ্য</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">পরবর্তী পেমেন্ট:</span>
                    <span>৫ ডিসেম্বর</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">মিনিমাম পেআউট:</span>
                    <span>১,০০০ টাকা</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">পেমেন্ট মেথড:</span>
                    <span>bKash</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">পেআউট রিকোয়েস্ট</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
