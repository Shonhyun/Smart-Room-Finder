import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function searchRooms(query: string, rooms: any[]) {
  if (!query) return rooms

  const lowerQuery = query.toLowerCase()
  return rooms.filter(
    (room) =>
      room.roomName.toLowerCase().includes(lowerQuery) ||
      room.roomNumber.toLowerCase().includes(lowerQuery) ||
      room.description.toLowerCase().includes(lowerQuery) ||
      room.floor.toLowerCase().includes(lowerQuery),
  )
}

export function getRoomsByFloor(floor: string, rooms: any[]) {
  return rooms.filter((room) => room.floor === floor)
}
