"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, X, ExternalLink, Copy, Check } from "lucide-react"

export function DomainSetupNotice() {
  const [isVisible, setIsVisible] = useState(true)
  const [copied, setCopied] = useState(false)

  if (!isVisible) return null

  const currentDomain = typeof window !== "undefined" ? window.location.origin : "your-domain.com"

  const copyDomain = async () => {
    try {
      await navigator.clipboard.writeText(currentDomain)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy domain:", error)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <Card className="bg-yellow-50 border-yellow-200 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-yellow-800 mb-2">Firebase Domain Setup Required</h3>
              <p className="text-sm text-yellow-700 mb-3">
                Google sign-in requires domain authorization. Add this domain to your Firebase Console:
              </p>

              <div className="bg-white rounded border border-yellow-200 p-2 mb-3">
                <div className="flex items-center justify-between">
                  <code className="text-sm text-gray-800 break-all">{currentDomain}</code>
                  <Button size="sm" variant="ghost" onClick={copyDomain} className="ml-2 h-6 w-6 p-0">
                    {copied ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2 text-xs text-yellow-700">
                <p>
                  <strong>Steps to fix:</strong>
                </p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Go to Firebase Console</li>
                  <li>Select your project</li>
                  <li>Go to Authentication → Settings</li>
                  <li>Add the domain above to "Authorized domains"</li>
                </ol>
              </div>

              <div className="flex items-center justify-between mt-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open("https://console.firebase.google.com", "_blank")}
                  className="text-xs"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Firebase Console
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setIsVisible(false)} className="text-xs">
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
