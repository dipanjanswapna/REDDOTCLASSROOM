"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Play, Quote, ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Rashida Akter",
    role: "HSC Student",
    course: "Physics Complete Course",
    rating: 5,
    text: "EduLMS helped me understand complex physics concepts easily. The interactive lessons and practice tests boosted my confidence significantly.",
    image: "/placeholder.svg?height=80&width=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    hasVideo: true,
    result: "Got A+ in Physics",
  },
  {
    id: 2,
    name: "Md. Karim Rahman",
    role: "Medical Aspirant",
    course: "Medical Admission Prep",
    rating: 5,
    text: "The structured approach and expert guidance helped me crack the medical entrance exam. Highly recommend to all medical aspirants!",
    image: "/placeholder.svg?height=80&width=80",
    videoUrl: "",
    hasVideo: false,
    result: "Admitted to Dhaka Medical",
  },
  {
    id: 3,
    name: "Fatima Khan",
    role: "IELTS Candidate",
    course: "IELTS Speaking Course",
    rating: 5,
    text: "The speaking practice sessions were incredibly helpful. I improved my band score from 6.0 to 8.0 in just 2 months!",
    image: "/placeholder.svg?height=80&width=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    hasVideo: true,
    result: "IELTS Band 8.0",
  },
  {
    id: 4,
    name: "Arif Hassan",
    role: "Engineering Student",
    course: "Web Development Bootcamp",
    rating: 5,
    text: "From zero coding knowledge to building full-stack applications. The practical approach and mentor support made all the difference.",
    image: "/placeholder.svg?height=80&width=80",
    videoUrl: "",
    hasVideo: false,
    result: "Got Job at Tech Company",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonials = [testimonials[currentIndex], testimonials[(currentIndex + 1) % testimonials.length]]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What Our Students Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real success stories from students who achieved their goals with EduLMS
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {currentTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Quote Icon */}
                    <Quote className="w-8 h-8 text-blue-600 opacity-50" />

                    {/* Rating */}
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-gray-700 text-lg leading-relaxed">"{testimonial.text}"</p>

                    {/* Student Info */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-3">
                        <img
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600">{testimonial.role}</p>
                          <p className="text-xs text-blue-600">{testimonial.course}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          {testimonial.result}
                        </div>
                        {testimonial.hasVideo && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setSelectedVideo(testimonial.videoUrl)}
                            className="mt-2 text-blue-600 hover:text-blue-800"
                          >
                            <Play className="w-4 h-4 mr-1" />
                            Watch Video
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center space-x-4">
            <Button variant="outline" size="sm" onClick={prevTestimonial} className="rounded-full">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={nextTestimonial} className="rounded-full">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-4 max-w-4xl w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Student Success Story</h3>
                <Button variant="ghost" size="sm" onClick={() => setSelectedVideo(null)}>
                  ✕
                </Button>
              </div>
              <div className="aspect-video">
                <iframe src={selectedVideo} className="w-full h-full rounded" allowFullScreen />
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg" className="px-8">
            Join Our Success Stories
          </Button>
        </div>
      </div>
    </section>
  )
}
