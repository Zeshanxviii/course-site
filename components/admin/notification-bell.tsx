"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Bell,
  FileText,
  Users,
  CheckCircle,
  DollarSign,
  Settings,
  AlertTriangle,
  X,
  Eye,
  EyeOff,
  Trash2,
  ExternalLink,
} from "lucide-react"
import { useNotifications } from "@/contexts/notification-context"
import type { Notification } from "@/contexts/notification-context"
import { cn } from "@/lib/utils"
import Link from "next/link"

const notificationIcons = {
  inquiry: <FileText className="h-4 w-4 text-blue-500" />,
  enrollment: <Users className="h-4 w-4 text-green-500" />,
  completion: <CheckCircle className="h-4 w-4 text-purple-500" />,
  payment: <DollarSign className="h-4 w-4 text-emerald-500" />,
  system: <Settings className="h-4 w-4 text-gray-500" />,
  warning: <AlertTriangle className="h-4 w-4 text-orange-500" />,
  error: <AlertTriangle className="h-4 w-4 text-red-500" />,
}

const priorityColors = {
  low: "border-l-gray-300",
  medium: "border-l-blue-400",
  high: "border-l-orange-400",
  urgent: "border-l-red-500",
}

function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return "Just now"
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  return `${Math.floor(diffInSeconds / 86400)}d ago`
}

function NotificationItem({
  notification,
  onMarkAsRead,
  onRemove,
}: {
  notification: Notification
  onMarkAsRead: (id: string) => void
  onRemove: (id: string) => void
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 p-3 border-l-4 hover:bg-gray-50 transition-colors",
        priorityColors[notification.priority],
        !notification.read && "bg-blue-50/50",
      )}
    >
      <div className="flex-shrink-0 mt-0.5">{notificationIcons[notification.type]}</div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <p className={cn("text-sm font-medium text-gray-900", !notification.read && "font-semibold")}>
              {notification.title}
            </p>
            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-gray-500">{formatTimeAgo(notification.timestamp)}</span>
              {notification.metadata?.amount && (
                <Badge variant="outline" className="text-xs">
                  ₹{notification.metadata.amount.toLocaleString()}
                </Badge>
              )}
              <Badge
                variant="outline"
                className={cn(
                  "text-xs",
                  notification.priority === "urgent" && "border-red-200 text-red-700",
                  notification.priority === "high" && "border-orange-200 text-orange-700",
                  notification.priority === "medium" && "border-blue-200 text-blue-700",
                  notification.priority === "low" && "border-gray-200 text-gray-700",
                )}
              >
                {notification.priority}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {!notification.read && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={(e) => {
                  e.preventDefault()
                  onMarkAsRead(notification.id)
                }}
              >
                <Eye className="h-3 w-3" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={(e) => {
                e.preventDefault()
                onRemove(notification.id)
              }}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {notification.actionUrl && (
          <Link
            href={notification.actionUrl}
            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 mt-2"
          >
            View Details
            <ExternalLink className="h-3 w-3" />
          </Link>
        )}
      </div>
    </div>
  )
}

export default function NotificationBell() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification, clearAllNotifications } =
    useNotifications()

  const [isOpen, setIsOpen] = useState(false)
  const [filter, setFilter] = useState<"all" | "unread">("all")

  // Request notification permission on mount
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "default") {
        Notification.requestPermission()
      }
    }
  }, [])
  

  const filteredNotifications = filter === "unread" ? notifications.filter((n) => !n.read) : notifications

  const recentNotifications = filteredNotifications.slice(0, 10)

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
          <span className="sr-only">{unreadCount > 0 ? `${unreadCount} unread notifications` : "Notifications"}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-96 p-0">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
          <div className="flex items-center gap-2">
            <div className="flex rounded-md border">
              <Button
                variant={filter === "all" ? "default" : "ghost"}
                size="sm"
                className="rounded-r-none text-xs h-7"
                onClick={() => setFilter("all")}
              >
                All ({notifications.length})
              </Button>
              <Button
                variant={filter === "unread" ? "default" : "ghost"}
                size="sm"
                className="rounded-l-none text-xs h-7"
                onClick={() => setFilter("unread")}
              >
                Unread ({unreadCount})
              </Button>
            </div>
          </div>
        </div>

        {recentNotifications.length > 0 ? (
          <>
            <ScrollArea className="max-h-96">
              <div className="divide-y">
                {recentNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={markAsRead}
                    onRemove={removeNotification}
                  />
                ))}
              </div>
            </ScrollArea>

            <Separator />

            <div className="p-3 flex items-center justify-between">
              <div className="flex gap-2">
                {unreadCount > 0 && (
                  <Button variant="outline" size="sm" onClick={markAllAsRead} className="text-xs bg-transparent">
                    <EyeOff className="h-3 w-3 mr-1" />
                    Mark all read
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={clearAllNotifications} className="text-xs bg-transparent">
                  <Trash2 className="h-3 w-3 mr-1" />
                  Clear all
                </Button>
              </div>

              <Link href="/admin/notifications">
                <Button variant="ghost" size="sm" className="text-xs">
                  View all
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="p-8 text-center">
            <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-sm text-gray-500">
              {filter === "unread" ? "No unread notifications" : "No notifications yet"}
            </p>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
