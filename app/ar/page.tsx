"use client"

import { useState } from "react"
import { Camera, AlertCircle, CheckCircle, Navigation, Home, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ARPlaceholder from "@/components/ARPlaceholder"
import { useRouter } from "next/navigation"

export default function ARNavigationPage() {
  const router = useRouter()
  const [arStatus, setARStatus] = useState<"idle" | "requesting" | "active" | "error">("idle")
  const [permissionGranted, setPermissionGranted] = useState(false)

  const handleStartAR = () => {
    setARStatus("requesting")

    // Simulate permission request
    setTimeout(() => {
      setPermissionGranted(true)
      setARStatus("active")
    }, 1500)
  }

  const handleStopAR = () => {
    setARStatus("idle")
    setPermissionGranted(false)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" onClick={() => router.push("/")} className="mb-4 gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
            <h1 className="mb-2 text-3xl font-bold text-foreground">AR Navigation</h1>
            <p className="text-muted-foreground">
              Use your camera to follow augmented reality directions to your destination
            </p>
          </div>

          {/* Status Banner */}
          {arStatus === "idle" && (
            <Card className="mb-6 border-primary/20 bg-primary/5">
              <CardContent className="flex items-center gap-3 py-4">
                <AlertCircle className="h-5 w-5 flex-shrink-0 text-primary" />
                <p className="text-sm text-foreground">
                  AR Mode is currently inactive. Click "Start AR Navigation" to begin.
                </p>
              </CardContent>
            </Card>
          )}

          {arStatus === "requesting" && (
            <Card className="mb-6 border-accent/20 bg-accent/5">
              <CardContent className="flex items-center gap-3 py-4">
                <div className="h-5 w-5 flex-shrink-0 animate-spin rounded-full border-2 border-accent border-t-transparent" />
                <p className="text-sm text-foreground">Requesting camera permission...</p>
              </CardContent>
            </Card>
          )}

          {arStatus === "active" && (
            <Card className="mb-6 border-accent/20 bg-accent/5">
              <CardContent className="flex items-center gap-3 py-4">
                <CheckCircle className="h-5 w-5 flex-shrink-0 text-accent" />
                <p className="text-sm text-foreground">
                  AR Mode is active. Point your camera at markers to see navigation guides.
                </p>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-6 lg:grid-cols-3">
            {/* AR Camera View */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                <div className="p-6">
                  <ARPlaceholder />

                  {/* AR Controls */}
                  <div className="mt-6 flex flex-wrap gap-3">
                    {arStatus === "idle" && (
                      <Button onClick={handleStartAR} size="lg" className="flex-1 gap-2">
                        <Camera className="h-5 w-5" />
                        Start AR Navigation
                      </Button>
                    )}

                    {arStatus === "active" && (
                      <>
                        <Button onClick={handleStopAR} variant="destructive" size="lg" className="flex-1">
                          Stop AR
                        </Button>
                        <Button variant="outline" size="lg" className="flex-1 gap-2 bg-transparent">
                          <Navigation className="h-4 w-4" />
                          Recalibrate
                        </Button>
                      </>
                    )}
                  </div>

                  {/* AR Instructions */}
                  <Card className="mt-6 bg-muted/50">
                    <CardContent className="p-4">
                      <h3 className="mb-3 font-semibold text-foreground">How to Use AR Navigation</h3>
                      <ol className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex gap-2">
                          <span className="font-medium text-primary">1.</span>
                          <span>Grant camera permission when prompted</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-medium text-primary">2.</span>
                          <span>Point your camera at AR markers placed throughout the building</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-medium text-primary">3.</span>
                          <span>Follow the AR arrows and labels that appear on your screen</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-medium text-primary">4.</span>
                          <span>Keep your camera steady for best tracking accuracy</span>
                        </li>
                      </ol>
                    </CardContent>
                  </Card>
                </div>
              </Card>

              {/* Technical Info */}
              <Card className="mt-6">
                <CardContent className="p-4">
                  <h3 className="mb-3 font-semibold text-foreground">AR Technology</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>This system uses marker-based AR tracking powered by MindAR/AR.js libraries.</p>
                    <p>
                      Physical markers are strategically placed at key decision points throughout the building to
                      provide accurate navigation guidance.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status Card */}
              <Card>
                <div className="p-6">
                  <h3 className="mb-4 text-lg font-bold text-foreground">System Status</h3>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Camera Access</span>
                      <Badge variant={permissionGranted ? "default" : "secondary"}>
                        {permissionGranted ? "Granted" : "Not Granted"}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">AR Engine</span>
                      <Badge variant="outline">Ready</Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Tracking</span>
                      <Badge variant={arStatus === "active" ? "default" : "secondary"}>
                        {arStatus === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card>
                <div className="p-6">
                  <h3 className="mb-4 text-lg font-bold text-foreground">Quick Actions</h3>

                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2 bg-transparent"
                      onClick={() => router.push("/map/ground-floor")}
                    >
                      <Home className="h-4 w-4" />
                      View Floor Maps
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2 bg-transparent"
                      onClick={() => router.push("/")}
                    >
                      <Navigation className="h-4 w-4" />
                      Search Rooms
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Browser Compatibility */}
              <Card>
                <div className="p-6">
                  <h3 className="mb-3 text-sm font-semibold text-foreground">Browser Compatibility</h3>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <p>AR features work best on:</p>
                    <ul className="ml-4 list-disc space-y-1">
                      <li>Chrome 90+ (Android/Desktop)</li>
                      <li>Safari 14.5+ (iOS)</li>
                      <li>Firefox 88+ (Android)</li>
                    </ul>
                  </div>
                </div>
              </Card>

              {/* Coming Soon */}
              <Card className="border-accent/20 bg-accent/5">
                <div className="p-6">
                  <h3 className="mb-2 text-sm font-semibold text-foreground">Coming Soon</h3>
                  <p className="text-xs text-muted-foreground">
                    Full AR tracking with real-time navigation paths and distance indicators
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
