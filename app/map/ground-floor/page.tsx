"use client"

import { useState } from "react"
import { Camera, Info, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import FloorSelector from "@/components/FloorSelector"
import ScrollableMapContainer from "@/components/ScrollableMapContainer"
import { rooms, floors } from "@/lib/dummyData"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function GroundFloorPage() {
  const router = useRouter()
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
  const floorData = floors.find((f) => f.floorNumber === 0)
  const floorRooms = rooms.filter((r) => r.floor === "Ground Floor")

  const selectedRoomData = selectedRoom ? rooms.find((r) => r.id === selectedRoom) : null

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-foreground">{floorData?.floorName} Map</h1>
            <p className="text-muted-foreground">{floorData?.description}</p>
          </div>

          {/* Floor Selector */}
          <div className="mb-6 flex items-center justify-between">
            <FloorSelector />
            <Button onClick={() => router.push("/ar")} className="gap-2">
              <Camera className="h-4 w-4" />
              AR Navigation
            </Button>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Map Container */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                <ScrollableMapContainer>
                  <div className="relative min-h-[800px] bg-muted">
                    <Image
                      src="/map/ground-floor.jpg"
                      alt="Saint Benedict Hall Ground Floor - Evacuation Plan"
                      width={1200}
                      height={900}
                      className="h-auto w-full"
                    />

                    {/* Room Markers */}
                    {floorRooms.map((room) => (
                      <button
                        key={room.id}
                        onClick={() => setSelectedRoom(room.id)}
                        className="group absolute flex h-10 w-10 items-center justify-center rounded-full bg-primary shadow-lg transition-all hover:scale-110 hover:shadow-xl"
                        style={{
                          left: `${(room.coordinates.x / 1200) * 100}%`,
                          top: `${(room.coordinates.y / 900) * 100}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <div className="h-4 w-4 animate-pulse rounded-full bg-primary-foreground"></div>

                        {/* Tooltip on hover */}
                        <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-card px-3 py-2 text-sm font-medium text-card-foreground shadow-lg opacity-0 transition-opacity group-hover:opacity-100">
                          {room.roomName}
                          <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-card"></div>
                        </div>
                      </button>
                    ))}
                  </div>
                </ScrollableMapContainer>
              </Card>

              {/* Legend */}
              <Card className="mt-4">
                <div className="flex items-center gap-6 p-4">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-primary"></div>
                    <span className="text-sm text-muted-foreground">Room Location</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Hover or tap markers for details</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Room Info Sidebar */}
            <div>
              <Card className="sticky top-20">
                <div className="p-6">
                  <h3 className="mb-4 text-lg font-bold text-foreground">
                    {selectedRoomData ? "Room Details" : "Rooms on This Floor"}
                  </h3>

                  {selectedRoomData ? (
                    <div className="space-y-4">
                      <div>
                        <div className="mb-2 text-xl font-bold text-foreground">{selectedRoomData.roomName}</div>
                        <div className="mb-3 text-sm text-muted-foreground">{selectedRoomData.roomNumber}</div>
                        <p className="text-sm text-muted-foreground">{selectedRoomData.description}</p>
                      </div>

                      <div className="space-y-2">
                        <Badge variant="outline">{selectedRoomData.category}</Badge>
                        {selectedRoomData.capacity && (
                          <div className="text-sm text-muted-foreground">
                            Capacity: {selectedRoomData.capacity} people
                          </div>
                        )}
                      </div>

                      <div className="space-y-2 pt-4">
                        <Button onClick={() => router.push(`/room/${selectedRoomData.id}`)} className="w-full">
                          View Full Details
                        </Button>
                        <Button onClick={() => router.push("/ar")} variant="outline" className="w-full gap-2">
                          <Navigation className="h-4 w-4" />
                          Navigate with AR
                        </Button>
                        <Button onClick={() => setSelectedRoom(null)} variant="ghost" className="w-full">
                          Clear Selection
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="mb-4 text-sm text-muted-foreground">
                        {floorRooms.length} rooms available on this floor
                      </div>
                      {floorRooms.slice(0, 5).map((room) => (
                        <button
                          key={room.id}
                          onClick={() => setSelectedRoom(room.id)}
                          className="w-full rounded-lg border p-3 text-left transition-colors hover:bg-accent"
                        >
                          <div className="font-medium text-foreground">{room.roomName}</div>
                          <div className="text-xs text-muted-foreground">{room.roomNumber}</div>
                        </button>
                      ))}
                    </div>
                  )}
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
