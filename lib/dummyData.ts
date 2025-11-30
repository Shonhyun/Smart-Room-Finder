import type { Room, Floor, NavigationPath } from "@/types/room"

export const floors: Floor[] = [
  {
    id: "1",
    floorName: "Ground Floor",
    floorNumber: 0,
    description: "Saint Benedict Hall - Main entrance, Computer Laboratories, CCS offices, and facilities",
    mapImage: "/map/ground-floor.jpg",
    totalRooms: 8,
  },
]

export const rooms: Room[] = [
  {
    id: "1",
    roomName: "Computer Laboratory 1",
    roomNumber: "COMP-LAB-1",
    description: "Main computer laboratory with 40 workstations for programming courses",
    floor: "Ground Floor",
    floorNumber: 0,
    coordinates: { x: 180, y: 420 },
    category: "Laboratory",
    capacity: 40,
    amenities: ["Computers", "Projector", "Air Conditioning", "Whiteboard"],
    isAvailable: true,
  },
  {
    id: "2",
    roomName: "Computer Laboratory 2",
    roomNumber: "COMP-LAB-2",
    description: "Secondary computer laboratory for specialized software development",
    floor: "Ground Floor",
    floorNumber: 0,
    coordinates: { x: 380, y: 420 },
    category: "Laboratory",
    capacity: 35,
    amenities: ["Computers", "Development Tools", "Air Conditioning", "Whiteboard"],
    isAvailable: true,
  },
  {
    id: "3",
    roomName: "CCS Coordinator's Office",
    roomNumber: "CCS-COORDINATOR",
    description: "College of Computer Studies Coordinator's Office",
    floor: "Ground Floor",
    floorNumber: 0,
    coordinates: { x: 580, y: 360 },
    category: "Office",
    amenities: ["Reception", "Workstation", "Air Conditioning"],
    isAvailable: true,
  },
  {
    id: "4",
    roomName: "Tech Room / Server Room",
    roomNumber: "TECH-ROOM",
    description: "Computer equipment and server room with conference area",
    floor: "Ground Floor",
    floorNumber: 0,
    coordinates: { x: 680, y: 360 },
    category: "Storage",
    isAvailable: false,
  },
  {
    id: "5",
    roomName: "Conference Room",
    roomNumber: "CONF-ROOM",
    description: "Small conference/meeting room",
    floor: "Ground Floor",
    floorNumber: 0,
    coordinates: { x: 680, y: 280 },
    category: "Conference Room",
    capacity: 15,
    amenities: ["Conference Table", "Projector", "Whiteboard"],
    isAvailable: true,
  },
  {
    id: "6",
    roomName: "Restroom",
    roomNumber: "RESTROOM-1",
    description: "Main restroom facility",
    floor: "Ground Floor",
    floorNumber: 0,
    coordinates: { x: 150, y: 280 },
    category: "Facilities",
    isAvailable: true,
  },
  {
    id: "7",
    roomName: "Main Entrance Lobby",
    roomNumber: "LOBBY",
    description: "Main entrance and reception area",
    floor: "Ground Floor",
    floorNumber: 0,
    coordinates: { x: 400, y: 200 },
    category: "Common Area",
    isAvailable: true,
  },
  {
    id: "8",
    roomName: "Staircase Area",
    roomNumber: "STAIRS",
    description: "Staircase to upper floors",
    floor: "Ground Floor",
    floorNumber: 0,
    coordinates: { x: 200, y: 200 },
    category: "Navigation",
    isAvailable: true,
  },
]

export const navigationPaths: NavigationPath[] = [
  {
    id: "1",
    fromRoom: "7", // Lobby
    toRoom: "1", // Comp Lab 1
    pathCoordinates: [
      { x: 400, y: 200 },
      { x: 280, y: 320 },
      { x: 180, y: 420 },
    ],
    distance: 280,
    estimatedTime: "1 min",
  },
  {
    id: "2",
    fromRoom: "7", // Lobby
    toRoom: "2", // Comp Lab 2
    pathCoordinates: [
      { x: 400, y: 200 },
      { x: 380, y: 320 },
      { x: 380, y: 420 },
    ],
    distance: 250,
    estimatedTime: "50 sec",
  },
  {
    id: "3",
    fromRoom: "1", // Comp Lab 1
    toRoom: "2", // Comp Lab 2
    pathCoordinates: [
      { x: 180, y: 420 },
      { x: 280, y: 420 },
      { x: 380, y: 420 },
    ],
    distance: 200,
    estimatedTime: "45 sec",
  },
  {
    id: "4",
    fromRoom: "7", // Lobby
    toRoom: "3", // CCS Office
    pathCoordinates: [
      { x: 400, y: 200 },
      { x: 500, y: 280 },
      { x: 580, y: 360 },
    ],
    distance: 220,
    estimatedTime: "55 sec",
  },
  {
    id: "5",
    fromRoom: "3", // CCS Office
    toRoom: "5", // Conference Room
    pathCoordinates: [
      { x: 580, y: 360 },
      { x: 630, y: 320 },
      { x: 680, y: 280 },
    ],
    distance: 150,
    estimatedTime: "40 sec",
  },
]
