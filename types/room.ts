export interface Room {
  id: string
  roomName: string
  roomNumber: string
  description: string
  floor: "Ground Floor" | "2nd Floor" | "3rd Floor"
  floorNumber: number
  coordinates: {
    x: number
    y: number
  }
  category: "Classroom" | "Laboratory" | "Office" | "Conference Room" | "Faculty Room" | "Storage"
  capacity?: number
  amenities?: string[]
  isAvailable: boolean
}
