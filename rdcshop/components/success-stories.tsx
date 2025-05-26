"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Award, Star, TrendingUp, BookOpen } from "lucide-react"

const successStories = [
  {
    id: 1,
    name: "Md. Rafiq Ahmed",
    achievement: "Dhaka Medical College",
    course: "Medical Admission Complete",
    rank: "Merit Position 15",
    image: "/placeholder.svg?height=120&width=120",
    story:
      "From struggling with biology to securing a top rank in medical entrance. EduLMS made the impossible possible!",
    year: "2024",
    category: "Medical",
  },
  {
    id: 2,
    name: "Fatima Khatun",
    achievement: "BUET CSE Department",
    course: "Engineering Admission Prep",
    rank: "Merit Position 42",
    image: "/placeholder.svg?height=120&width=120",
    story: "The structured math and physics courses helped me crack BUET entrance with confidence.",
    year: "2024",
    category: "Engineering",
  },
  {
    id: 3,
    name: "Ariful Islam",
    achievement: "Software Engineer at Google",
    course: "Full Stack Development",
    rank: "6-Figure Salary",
    image: "/placeholder.svg?height=120&width=120",
    story:
      "Started as a complete beginner, now working at my dream company. The practical projects were game-changers!",
    year: "2024",
    category: "Programming",
  },
  {
    id: 4,
    name: "Rashida Begum",
    achievement: "IELTS Band 8.5",
    course: "IELTS Complete Course",
    rank: "Top 1% Globally",
    image: "/placeholder.svg?height=120&width=120",
    story: "Improved from Band 5.5 to 8.5 in just 3 months. Now studying in Canada!",
    year: "2024",
    category: "IELTS",
  },
]

const achievements = [
  { icon: Trophy, label: "Top Rankers", value: "2,500+", color: "text-yellow-600" },
  { icon: Award, label: "Success Rate", value: "95%", color: "text-green-600" },
  { icon: Star, label: "Average Rating", value: "4.9/5", color: "text-blue-600" },
  { icon: TrendingUp, label: "Score Improvement", value: "40%", color: "text-purple-600" },
]

export function SuccessStories() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Success Stories That Inspire</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real students, real achievements. See how EduLMS helped them reach their dreams
          </p>
        </div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {achievements.map((achievement, index) => (
            <Card key={index} className="text-center bg-white/80 backdrop-blur-sm border-0 shadow-md">
              <CardContent className="p-6">
                <achievement.icon className={`w-8 h-8 mx-auto mb-3 ${achievement.color}`} />
                <div className="text-2xl font-bold text-gray-900 mb-1">{achievement.value}</div>
                <div className="text-sm text-gray-600">{achievement.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Success Stories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {successStories.map((story) => (
            <Card
              key={story.id}
              className="bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300 group"
            >
              <CardContent className="p-6 text-center">
                <div className="space-y-4">
                  {/* Student Image */}
                  <div className="relative mx-auto w-24 h-24">
                    <img
                      src={story.image || "/placeholder.svg"}
                      alt={story.name}
                      className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-1">
                      <Trophy className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Category Badge */}
                  <Badge
                    variant="outline"
                    className={`
                      ${story.category === "Medical" ? "border-red-200 text-red-700 bg-red-50" : ""}
                      ${story.category === "Engineering" ? "border-blue-200 text-blue-700 bg-blue-50" : ""}
                      ${story.category === "Programming" ? "border-purple-200 text-purple-700 bg-purple-50" : ""}
                      ${story.category === "IELTS" ? "border-green-200 text-green-700 bg-green-50" : ""}
                    `}
                  >
                    {story.category}
                  </Badge>

                  {/* Student Info */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{story.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{story.course}</p>
                  </div>

                  {/* Achievement */}
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-3">
                    <p className="font-semibold text-gray-900 text-sm mb-1">{story.achievement}</p>
                    <p className="text-xs text-orange-600 font-medium">{story.rank}</p>
                  </div>

                  {/* Story */}
                  <p className="text-sm text-gray-600 line-clamp-3 group-hover:line-clamp-none transition-all">
                    "{story.story}"
                  </p>

                  {/* Year */}
                  <div className="text-xs text-gray-500">Class of {story.year}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Student Spotlight Carousel */}
        <Card className="bg-white shadow-lg border-0 mb-8">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Student Spotlight</h3>
              <p className="text-gray-600">This month's featured success story</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-4 mb-4">
                  <img
                    src="/placeholder.svg?height=80&width=80"
                    alt="Featured Student"
                    className="w-20 h-20 rounded-full object-cover border-4 border-yellow-400"
                  />
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">Nusrat Jahan</h4>
                    <p className="text-gray-600">HSC Science Student</p>
                    <Badge className="bg-yellow-500 text-white mt-1">Featured Student</Badge>
                  </div>
                </div>

                <blockquote className="text-lg text-gray-700 italic mb-4">
                  "EduLMS transformed my approach to studying. The personalized learning path and AI-powered practice
                  tests helped me achieve a GPA of 5.00 in HSC. I'm now pursuing my dream of becoming a doctor!"
                </blockquote>

                <div className="flex items-center justify-center lg:justify-start space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <BookOpen className="w-4 h-4" />
                    <span>15 Courses Completed</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Trophy className="w-4 h-4" />
                    <span>GPA 5.00</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                <h5 className="font-semibold text-gray-900 mb-4">Achievement Highlights</h5>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">HSC Result</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      GPA 5.00
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Physics Score</span>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      A+
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Chemistry Score</span>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700">
                      A+
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Biology Score</span>
                    <Badge variant="outline" className="bg-red-50 text-red-700">
                      A+
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Write Your Success Story?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of successful students who achieved their dreams with EduLMS. Your success story could be
            next!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8">
              Start Your Journey
            </Button>
            <Button size="lg" variant="outline" className="px-8">
              View All Success Stories
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
