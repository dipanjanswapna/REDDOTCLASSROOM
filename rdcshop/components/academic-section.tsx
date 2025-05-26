"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, GraduationCap, Award, Target } from "lucide-react"

const academicClasses = [
  {
    id: 1,
    title: "ক্লাস ৩,৭",
    subtitle: "ক্লাস ৯, ১০",
    icon: BookOpen,
    color: "bg-blue-500",
    students: "৫০,০০০+",
  },
  {
    id: 2,
    title: "ক্লাস ৯, ১০",
    subtitle: "",
    icon: GraduationCap,
    color: "bg-orange-500",
    students: "৭৫,০০০+",
  },
  {
    id: 3,
    title: "HSC ২৫, ২৬",
    subtitle: "",
    icon: Award,
    color: "bg-green-500",
    students: "১,২০,০০০+",
  },
  {
    id: 4,
    title: "HSC ২৭",
    subtitle: "",
    icon: Target,
    color: "bg-purple-500",
    students: "৮৫,০০০+",
  },
]

export function AcademicSection() {
  return (
    <Card className="bg-gradient-to-br from-blue-900 to-blue-800 border-0 text-white overflow-hidden">
      <CardContent className="p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">অনলাইন ব্যাচ ২০২৫ এর সকল</h2>
            <h3 className="text-xl">কোর্স ভর্তি চলছে!</h3>
          </div>

          {/* Class Grid */}
          <div className="grid grid-cols-2 gap-4">
            {academicClasses.map((classItem) => (
              <div
                key={classItem.id}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all cursor-pointer group"
              >
                <div className="flex flex-col items-center space-y-3">
                  <div
                    className={`w-12 h-12 ${classItem.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <classItem.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-lg">{classItem.title}</h4>
                    {classItem.subtitle && <p className="text-sm text-blue-200">{classItem.subtitle}</p>}
                    <p className="text-xs text-blue-300 mt-1">{classItem.students} শিক্ষার্থী</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center">
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-900 rounded-full px-6"
            >
              একাডেমিক ক্লাস ৬-১২ কি কোর্স →
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
