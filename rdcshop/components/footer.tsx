"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  GraduationCap,
  Shield,
  Users,
} from "lucide-react"
import { FooterLoginModal } from "@/components/footer-login-modal"

export function Footer() {
  const [isTeacherLoginOpen, setIsTeacherLoginOpen] = useState(false)
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false)
  const [isAffiliateLoginOpen, setIsAffiliateLoginOpen] = useState(false)

  const currentYear = new Date().getFullYear()

  const footerLinks = {
    courses: [
      { name: "HSC Preparation", href: "/courses/hsc" },
      { name: "Medical Admission", href: "/courses/medical" },
      { name: "Engineering Admission", href: "/courses/engineering" },
      { name: "IELTS Preparation", href: "/courses/ielts" },
      { name: "Skill Development", href: "/courses/skills" },
    ],
    resources: [
      { name: "Study Materials", href: "/resources/materials" },
      { name: "Practice Tests", href: "/resources/tests" },
      { name: "Live Classes", href: "/live" },
      { name: "Blog", href: "/blog" },
      { name: "Success Stories", href: "/success-stories" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Us", href: "/contact" },
      { name: "FAQ", href: "/faq" },
      { name: "Technical Support", href: "/support" },
      { name: "Refund Policy", href: "/refund" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Become an Instructor", href: "/teach" },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ]

  return (
    <>
      <footer className="bg-gray-900 text-white">
        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Stay Updated with Latest Courses & Tips</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Subscribe to our newsletter and get exclusive study materials, course updates, and exam tips delivered
                to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="bg-white/90 text-gray-900 border-0"
                />
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
              {/* Brand Section */}
              <div className="lg:col-span-2">
                <Link href="/" className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold">EduLMS</span>
                </Link>

                <p className="text-gray-300 mb-6 max-w-sm">
                  Bangladesh's leading online learning platform helping students achieve their academic and career goals
                  with expert guidance and AI-powered learning.
                </p>

                {/* Contact Info */}
                <div className="space-y-3 text-sm text-gray-300">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>+880 1700-000000</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>support@edulms.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>Dhaka, Bangladesh</span>
                  </div>
                </div>
              </div>

              {/* Courses */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Courses</h4>
                <ul className="space-y-2">
                  {footerLinks.courses.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-gray-300 hover:text-white transition-colors text-sm">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Resources</h4>
                <ul className="space-y-2">
                  {footerLinks.resources.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-gray-300 hover:text-white transition-colors text-sm">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Support</h4>
                <ul className="space-y-2">
                  {footerLinks.support.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-gray-300 hover:text-white transition-colors text-sm">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company & Professional Login */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Company</h4>
                <ul className="space-y-2 mb-6">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-gray-300 hover:text-white transition-colors text-sm">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Professional Login Section */}
                <div className="border-t border-gray-700 pt-4">
                  <h5 className="text-sm font-semibold mb-3 text-gray-300">Professional Login</h5>
                  <div className="space-y-2">
                    <button
                      onClick={() => setIsTeacherLoginOpen(true)}
                      className="flex items-center space-x-2 text-xs text-gray-400 hover:text-blue-400 transition-colors w-full text-left"
                    >
                      <GraduationCap className="w-3 h-3" />
                      <span>Teacher Login</span>
                    </button>
                    <button
                      onClick={() => setIsAdminLoginOpen(true)}
                      className="flex items-center space-x-2 text-xs text-gray-400 hover:text-red-400 transition-colors w-full text-left"
                    >
                      <Shield className="w-3 h-3" />
                      <span>Admin Login</span>
                    </button>
                    <button
                      onClick={() => setIsAffiliateLoginOpen(true)}
                      className="flex items-center space-x-2 text-xs text-gray-400 hover:text-green-400 transition-colors w-full text-left"
                    >
                      <Users className="w-3 h-3" />
                      <span>Affiliate Login</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Copyright */}
              <div className="text-sm text-gray-400">© {currentYear} EduLMS. All rights reserved.</div>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-400">Follow us:</span>
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </Link>
                ))}
              </div>

              {/* Language/Region */}
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>🇧🇩 Bangladesh</span>
                <span>বাংলা</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Professional Login Modals */}
      <FooterLoginModal
        isOpen={isTeacherLoginOpen}
        onClose={() => setIsTeacherLoginOpen(false)}
        defaultRole="teacher"
      />
      <FooterLoginModal isOpen={isAdminLoginOpen} onClose={() => setIsAdminLoginOpen(false)} defaultRole="admin" />
      <FooterLoginModal
        isOpen={isAffiliateLoginOpen}
        onClose={() => setIsAffiliateLoginOpen(false)}
        defaultRole="affiliate"
      />
    </>
  )
}
