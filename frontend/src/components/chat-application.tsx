import { useState } from "react"
import { ChatSidebar } from "./chat-sidebar"
import { ChatWindow } from "./chat-window"
import { ChatHeader } from "./chat-header"

export interface Contact {
  id: string
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  isOnline: boolean
}

export interface Message {
  id: string
  senderId: string
  content: string
  timestamp: string
  type: "text" | "image" | "file"
}

export function ChatApplication() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  // Mock data
  const contacts: Contact[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      avatar: "/professional-woman.png",
      lastMessage: "Hey! How are you doing?",
      timestamp: "2 min ago",
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: "2",
      name: "Team Alpha",
      avatar: "/team-group.png",
      lastMessage: "Meeting at 3 PM today",
      timestamp: "1 hour ago",
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: "3",
      name: "Mike Chen",
      avatar: "/man-developer.png",
      lastMessage: "Thanks for the help!",
      timestamp: "3 hours ago",
      unreadCount: 1,
      isOnline: true,
    },
  ]

  const messages: Message[] = selectedContact
    ? [
        {
          id: "1",
          senderId: selectedContact.id,
          content: "Hey! How are you doing?",
          timestamp: "10:30 AM",
          type: "text",
        },
        {
          id: "2",
          senderId: "me",
          content: "I'm doing great! Just working on some new features.",
          timestamp: "10:32 AM",
          type: "text",
        },
        {
          id: "3",
          senderId: selectedContact.id,
          content: "That sounds exciting! What kind of features?",
          timestamp: "10:35 AM",
          type: "text",
        },
      ]
    : []

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? "w-80" : "w-0"} transition-all duration-300 overflow-hidden border-r border-border`}
      >
        <ChatSidebar contacts={contacts} selectedContact={selectedContact} onSelectContact={setSelectedContact} />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <ChatHeader
          selectedContact={selectedContact}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <ChatWindow selectedContact={selectedContact} messages={messages} />
      </div>
    </div>
  )
}
