"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Gift, Copy } from "lucide-react"

export function CouponBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState("")

  const availableCoupons = [
    { code: "NEWUSER50", discount: "50% OFF", description: "For new users" },
    { code: "STUDENT30", discount: "30% OFF", description: "Student discount" },
    { code: "SKILL25", discount: "25% OFF", description: "Skill courses" },
  ]

  const applyCoupon = () => {
    const validCoupon = availableCoupons.find((c) => c.code === couponCode.toUpperCase())
    if (validCoupon) {
      setAppliedCoupon(validCoupon.code)
      alert(`Coupon ${validCoupon.code} applied! You get ${validCoupon.discount}`)
    } else {
      alert("Invalid coupon code")
    }
  }

  const copyCoupon = (code: string) => {
    navigator.clipboard.writeText(code)
    setCouponCode(code)
    alert(`Coupon ${code} copied!`)
  }

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Gift className="w-5 h-5" />
            <span className="font-semibold">Special Offer!</span>
            <span>Get up to 50% OFF on all courses</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Available Coupons */}
            <div className="flex flex-wrap gap-2">
              {availableCoupons.map((coupon) => (
                <button
                  key={coupon.code}
                  onClick={() => copyCoupon(coupon.code)}
                  className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-sm flex items-center space-x-1 transition-colors"
                >
                  <span>{coupon.code}</span>
                  <Copy className="w-3 h-3" />
                </button>
              ))}
            </div>

            {/* Coupon Input */}
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="w-40 h-8 text-sm bg-white/90 text-gray-900 border-0"
              />
              <Button size="sm" onClick={applyCoupon} className="bg-white text-orange-600 hover:bg-gray-100 h-8">
                Apply
              </Button>
            </div>
          </div>

          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 lg:relative lg:top-0 lg:right-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {appliedCoupon && (
          <div className="mt-2 text-center text-sm">✅ Coupon {appliedCoupon} applied successfully!</div>
        )}
      </div>
    </div>
  )
}
