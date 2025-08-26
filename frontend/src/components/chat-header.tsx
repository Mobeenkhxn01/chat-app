import { Menu, Phone, Video, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Contact } from "./chat-application"

interface ChatHeaderProps {
  selectedContact: Contact | null
  isSidebarOpen: boolean
  onToggleSidebar: () => void
}

export function ChatHeader({ selectedContact, isSidebarOpen, onToggleSidebar }: ChatHeaderProps) {
  if (!selectedContact) {
    return (
      <div className="h-16 border-b border-border flex items-center px-4">
        <Button variant="ghost" size="sm" onClick={onToggleSidebar} className="mr-2">
          <Menu className="h-4 w-4" />
        </Button>
        <span className="text-muted-foreground">Select a conversation to start messaging</span>
      </div>
    )
  }

  return (
    <div className="h-16 border-b border-border flex items-center justify-between px-4 bg-card">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onToggleSidebar} className="mr-2">
          <Menu className="h-4 w-4" />
        </Button>

        <div className="relative">
          <Avatar className="h-10 w-10">
            <AvatarImage src={selectedContact.avatar || "/placeholder.svg"} alt={selectedContact.name} />
            <AvatarFallback>
              {selectedContact.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          {selectedContact.isOnline && (
            <div className="absolute bottom-0 right-0 h-3 w-3 bg-primary rounded-full border-2 border-card" />
          )}
        </div>

        <div>
          <h2 className="font-semibold text-card-foreground">{selectedContact.name}</h2>
          <p className="text-sm text-muted-foreground">{selectedContact.isOnline ? "Online" : "Last seen recently"}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
          <Phone className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
          <Video className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
