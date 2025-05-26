"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Loader2, CheckCircle, User, GraduationCap, BookOpen, Globe, DollarSign } from "lucide-react"
import { createTeacherProfile, generateTeacherSlug } from "@/lib/demo-teacher-management"

export function TeacherRegistrationForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<{ teacherId: string; slug: string; shopUrl: string } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [previewSlug, setPreviewSlug] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    bioBn: "",
    education: "",
    experience: 1,
    specialization: [] as string[],
    amazonAffiliateId: "",
    agreeToTerms: false,
  })

  const specializationOptions = [
    "HSC Physics",
    "HSC Chemistry",
    "HSC Mathematics",
    "HSC Biology",
    "IELTS",
    "Web Development",
    "Programming",
    "Digital Marketing",
    "Graphic Design",
    "English Language",
    "Bangla Literature",
    "Admission Test Prep",
    "Job Preparation",
  ]

  const handleNameChange = (name: string) => {
    setFormData({ ...formData, name })
    setPreviewSlug(generateTeacherSlug(name))
  }

  const handleSpecializationChange = (spec: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        specialization: [...formData.specialization, spec],
      })
    } else {
      setFormData({
        ...formData,
        specialization: formData.specialization.filter((s) => s !== spec),
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (!formData.agreeToTerms) {
        throw new Error("Please agree to the terms and conditions")
      }

      if (formData.specialization.length === 0) {
        throw new Error("Please select at least one specialization")
      }

      console.log("🎓 Creating demo teacher profile...")
      const result = await createTeacherProfile(formData)

      if (result.error) {
        throw new Error(result.error)
      }

      setSuccess({
        teacherId: result.teacherId!,
        slug: result.slug!,
        shopUrl: result.shopUrl!,
      })

      console.log("✅ Demo teacher profile created successfully!")
    } catch (error: any) {
      console.error("❌ Teacher registration error:", error)
      setError(error.message || "Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Card className="max-w-2xl mx-auto bg-gray-800 border-gray-700">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-green-400">শিক্ষক নিবন্ধন সফল!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-gray-300 mb-4">
              আপনার শিক্ষক প্রোফাইল সফলভাবে তৈরি হয়েছে এবং আপনার ব্যক্তিগত shop page তৈরি হয়েছে।
            </p>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Teacher ID:</span>
              <span className="font-mono text-sm">{success.teacherId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">URL Slug:</span>
              <span className="font-mono text-sm">{success.slug}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Shop URL:</span>
              <a
                href={success.shopUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-mono text-sm flex items-center"
              >
                {success.shopUrl}
                <Globe className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button
              onClick={() => window.open(success.shopUrl, "_blank")}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              <Globe className="w-4 h-4 mr-2" />
              Shop Page দেখুন
            </Button>
            <Button onClick={() => window.location.reload()} variant="outline" className="flex-1">
              নতুন নিবন্ধন
            </Button>
          </div>

          <div className="bg-blue-900/30 border border-blue-700 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-300 mb-2">পরবর্তী ধাপসমূহ:</h3>
            <ul className="text-sm text-blue-200 space-y-1">
              <li>• আপনার প্রোফাইল সম্পূর্ণ করুন</li>
              <li>• কোর্স যোগ করুন</li>
              <li>• Amazon products যোগ করুন</li>
              <li>• Bank details যোগ করুন</li>
              <li>• Verification এর জন্য অপেক্ষা করুন</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-4xl mx-auto bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <GraduationCap className="w-6 h-6" />
          <span>শিক্ষক নিবন্ধন</span>
        </CardTitle>
        <p className="text-gray-400">EduLMS এ শিক্ষক হিসেবে যোগ দিন এবং আপনার নিজস্ব shop page পান</p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>ব্যক্তিগত তথ্য</span>
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">পূর্ণ নাম *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="যেমন: Dr. Rahman Ahmed"
                  required
                  disabled={loading}
                />
                {previewSlug && (
                  <p className="text-xs text-gray-400">
                    Shop URL: <span className="text-blue-400">/shop/{previewSlug}</span>
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">ইমেইল *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="teacher@example.com"
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">ফোন নম্বর *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+8801700000000"
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">অভিজ্ঞতা (বছর) *</Label>
                <Select
                  value={formData.experience.toString()}
                  onValueChange={(value) => setFormData({ ...formData, experience: Number.parseInt(value) })}
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="অভিজ্ঞতা নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 30 }, (_, i) => i + 1).map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year} বছর
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="education">শিক্ষাগত যোগ্যতা *</Label>
              <Input
                id="education"
                value={formData.education}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                placeholder="যেমন: PhD in Physics, University of Dhaka"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>পেশাগত তথ্য</span>
            </h3>

            <div className="space-y-2">
              <Label htmlFor="bio">সংক্ষিপ্ত পরিচয় (ইংরেজি) *</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Brief introduction about yourself and your teaching experience..."
                rows={3}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bioBn">সংক্ষিপ্ত পরিচয় (বাংলা) *</Label>
              <Textarea
                id="bioBn"
                value={formData.bioBn}
                onChange={(e) => setFormData({ ...formData, bioBn: e.target.value })}
                placeholder="আপনার এবং আপনার শিক্ষকতার অভিজ্ঞতা সম্পর্কে সংক্ষিপ্ত পরিচয়..."
                rows={3}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-3">
              <Label>বিশেষত্ব * (কমপক্ষে ১টি নির্বাচন করুন)</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {specializationOptions.map((spec) => (
                  <div key={spec} className="flex items-center space-x-2">
                    <Checkbox
                      id={spec}
                      checked={formData.specialization.includes(spec)}
                      onCheckedChange={(checked) => handleSpecializationChange(spec, checked as boolean)}
                      disabled={loading}
                    />
                    <Label htmlFor={spec} className="text-sm">
                      {spec}
                    </Label>
                  </div>
                ))}
              </div>
              {formData.specialization.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.specialization.map((spec) => (
                    <Badge key={spec} variant="secondary">
                      {spec}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Amazon Integration */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <DollarSign className="w-5 h-5" />
              <span>Amazon Integration (ঐচ্ছিক)</span>
            </h3>

            <div className="space-y-2">
              <Label htmlFor="amazonAffiliateId">Amazon Affiliate ID</Label>
              <Input
                id="amazonAffiliateId"
                value={formData.amazonAffiliateId}
                onChange={(e) => setFormData({ ...formData, amazonAffiliateId: e.target.value })}
                placeholder="your-affiliate-id"
                disabled={loading}
              />
              <p className="text-xs text-gray-400">
                Amazon affiliate program এ যোগ দিয়ে products recommend করে commission earn করুন
              </p>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-900/30 border border-red-700 rounded-lg flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <span className="text-red-300">{error}</span>
            </div>
          )}

          {/* Terms and Conditions */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
              disabled={loading}
            />
            <Label htmlFor="terms" className="text-sm">
              আমি EduLMS এর{" "}
              <a href="/terms" className="text-blue-400 hover:text-blue-300">
                নিয়মাবলী
              </a>{" "}
              এবং{" "}
              <a href="/privacy" className="text-blue-400 hover:text-blue-300">
                গোপনীয়তা নীতি
              </a>{" "}
              এর সাথে একমত
            </Label>
          </div>

          <Button type="submit" className="w-full" disabled={loading || !formData.agreeToTerms}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                নিবন্ধন করা হচ্ছে...
              </>
            ) : (
              <>
                <GraduationCap className="w-4 h-4 mr-2" />
                শিক্ষক হিসেবে নিবন্ধন করুন
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
