import { notFound } from "next/navigation"
import { MapPin, Users, Clock, Navigation, MapIcon, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { rooms } from "@/lib/dummyData"
import Link from "next/link"

export async function generateStaticParams() {
  return rooms.map((room) => ({
    id: room.id,
  }))
}

export default async function RoomDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const room = rooms.find((r) => r.id === id)

  if (!room) {
    notFound()
  }

  const getFloorPath = (floor: string) => {
    switch (floor) {
      case "Ground Floor":
        return "/map/ground-floor"
      case "2nd Floor":
        return "/map/second-floor"
      case "3rd Floor":
        return "/map/third-floor"
      default:
        return "/map/ground-floor"
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href="/">
            <Button variant="ghost" className="mb-6 gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="mb-2 text-4xl font-bold text-foreground">{room.roomName}</h1>
                <p className="text-xl text-muted-foreground">{room.roomNumber}</p>
              </div>
              <Badge variant={room.isAvailable ? "default" : "secondary"} className="text-base">
                {room.isAvailable ? "Available" : "Restricted"}
              </Badge>
            </div>
            <p className="text-lg text-muted-foreground">{room.description}</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Info Card */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Room Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="mb-1 font-semibold text-foreground">Location</div>
                    <div className="text-muted-foreground">{room.floor}</div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      Coordinates: X: {room.coordinates.x}, Y: {room.coordinates.y}
                    </div>
                  </div>
                </div>

                {/* Category */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <Clock className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <div className="mb-1 font-semibold text-foreground">Category</div>
                    <div className="text-muted-foreground">{room.category}</div>
                  </div>
                </div>

                {/* Capacity */}
                {room.capacity && (
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="mb-1 font-semibold text-foreground">Capacity</div>
                      <div className="text-muted-foreground">{room.capacity} people</div>
                    </div>
                  </div>
                )}

                {/* Amenities */}
                {room.amenities && room.amenities.length > 0 && (
                  <div>
                    <div className="mb-3 font-semibold text-foreground">Amenities</div>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.map((amenity, index) => (
                        <Badge key={index} variant="outline">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Navigation Card */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Navigate to Room</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href={getFloorPath(room.floor)}>
                    <Button className="w-full gap-2" size="lg">
                      <MapIcon className="h-5 w-5" />
                      View on Map
                    </Button>
                  </Link>
                  <Link href="/ar">
                    <Button variant="outline" className="w-full gap-2 bg-transparent" size="lg">
                      <Navigation className="h-5 w-5" />
                      AR Navigation
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Quick Info Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Floor:</span>
                    <span className="font-medium text-foreground">{room.floor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Room Number:</span>
                    <span className="font-medium text-foreground">{room.roomNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="font-medium text-foreground">{room.category}</span>
                  </div>
                  {room.capacity && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Capacity:</span>
                      <span className="font-medium text-foreground">{room.capacity}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Floor Map Preview */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Floor Layout Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-muted">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <MapIcon className="mx-auto mb-2 h-12 w-12 text-muted-foreground" />
                    <p className="text-muted-foreground">Click "View on Map" to see the exact location</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  )
}
