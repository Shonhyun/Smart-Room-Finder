"use client"

import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import DataTable from "@/components/DataTable"
import { rooms } from "@/lib/dummyData"
import type { Room } from "@/types/room"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function AdminRoomsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)

  const filteredRooms = rooms.filter(
    (room) =>
      room.roomName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleEdit = (room: Room) => {
    setSelectedRoom(room)
    setIsEditModalOpen(true)
  }

  const handleDelete = (room: Room) => {
    setSelectedRoom(room)
    setIsDeleteModalOpen(true)
  }

  const columns = [
    {
      header: "Room Name",
      accessor: "roomName",
    },
    {
      header: "Room Number",
      accessor: "roomNumber",
    },
    {
      header: "Floor",
      accessor: "floor",
    },
    {
      header: "Category",
      accessor: "category",
      render: (value: string) => <Badge variant="outline">{value}</Badge>,
    },
    {
      header: "Status",
      accessor: "isAvailable",
      render: (value: boolean) => (
        <Badge variant={value ? "default" : "secondary"}>{value ? "Available" : "Restricted"}</Badge>
      ),
    },
  ]

  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-foreground">Rooms Management</h1>
          <p className="text-muted-foreground">Manage all rooms in the Tamaraw Building</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Room
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search rooms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Data Table */}
      <DataTable data={filteredRooms} columns={columns} onEdit={handleEdit} onDelete={handleDelete} />

      {/* Add Room Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Room</DialogTitle>
            <DialogDescription>Enter the details of the new room below.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="roomName">Room Name</Label>
              <Input id="roomName" placeholder="Computer Laboratory 1" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="roomNumber">Room Number</Label>
              <Input id="roomNumber" placeholder="COMP-LAB-101" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder="Main computer laboratory..." />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="floor">Floor</Label>
              <Input id="floor" placeholder="Ground Floor" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="coordinates">Coordinates (x, y)</Label>
              <Input id="coordinates" placeholder="120, 200" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddModalOpen(false)}>Add Room</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Room Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Room</DialogTitle>
            <DialogDescription>Update the room details below.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="editRoomName">Room Name</Label>
              <Input id="editRoomName" defaultValue={selectedRoom?.roomName} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="editRoomNumber">Room Number</Label>
              <Input id="editRoomNumber" defaultValue={selectedRoom?.roomNumber} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="editDescription">Description</Label>
              <Input id="editDescription" defaultValue={selectedRoom?.description} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="editFloor">Floor</Label>
              <Input id="editFloor" defaultValue={selectedRoom?.floor} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsEditModalOpen(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Room</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedRoom?.roomName}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setIsDeleteModalOpen(false)}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
