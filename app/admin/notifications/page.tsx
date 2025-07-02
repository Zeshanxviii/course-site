"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Search,
  Bell,
  FileText,
  Users,
  CheckCircle,
  DollarSign,
  Settings,
  AlertTriangle,
  Eye,
  EyeOff,
  Trash2,
  Download,
  Clock,
  ExternalLink,
} from "lucide-react"
import { useNotifications, type Notification } from "@/contexts/notification-context"
import { cn } from "@/lib/utils"
import Link from "next/link"
import AdminHeader from "@/components/admin/header"
import AdminSidebar from "@/components/admin/sidebar"

const notificationIcons = {
  inquiry: <FileText className="h-5 w-5 text-blue-500" />,
  enrollment: <Users className="h-5 w-5 text-green-500" />,
  completion: <CheckCircle className="h-5 w-5 text-purple-500" />,
  payment: <DollarSign className="h-5 w-5 text-emerald-500" />,
  system: <Settings className="h-5 w-5 text-gray-500" />,
  warning: <AlertTriangle className="h-5 w-5 text-orange-500" />,
  error: <AlertTriangle className="h-5 w-5 text-red-500" />,
}

const priorityColors = {
  low: "border-l-gray-300 bg-gray-50/50",
  medium: "border-l-blue-400 bg-blue-50/50",
  high: "border-l-orange-400 bg-orange-50/50",
  urgent: "border-l-red-500 bg-red-50/50",
}

function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return "Just now"
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  return `${Math.floor(diffInSeconds / 86400)} days ago`
}

function NotificationCard({
  notification,
  onMarkAsRead,
  onRemove,
}: {
  notification: Notification
  onMarkAsRead: (id: string) => void
  onRemove: (id: string) => void
}) {
  return (
    <Card
      className={cn(
        "border-l-4 transition-all hover:shadow-md",
        priorityColors[notification.priority],
        !notification.read && "shadow-sm",
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">{notificationIcons[notification.type]}</div>
            <div className="flex-1">
              <CardTitle className={cn("text-base", !notification.read && "font-bold")}>{notification.title}</CardTitle>
              <CardDescription className="mt-1">{notification.message}</CardDescription>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!notification.read && (
              <Button variant="ghost" size="sm" onClick={() => onMarkAsRead(notification.id)}>
                <Eye className="h-4 w-4 mr-1" />
                Mark read
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={() => onRemove(notification.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              {formatTimeAgo(notification.timestamp)}
            </div>

            <Badge
              variant="outline"
              className={cn(
                notification.priority === "urgent" && "border-red-200 text-red-700",
                notification.priority === "high" && "border-orange-200 text-orange-700",
                notification.priority === "medium" && "border-blue-200 text-blue-700",
                notification.priority === "low" && "border-gray-200 text-gray-700",
              )}
            >
              {notification.priority} priority
            </Badge>

            <Badge variant="secondary">{notification.type}</Badge>

            {notification.metadata?.amount && (
              <Badge variant="outline" className="text-green-700 border-green-200">
                ₹{notification.metadata.amount.toLocaleString()}
              </Badge>
            )}
          </div>

          {notification.actionUrl && (
            <Link href={notification.actionUrl}>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-1" />
                View Details
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default function NotificationsPage() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications,
    getNotificationsByType,
  } = useNotifications()

  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(false)

  // Filter notifications
  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      searchQuery === "" ||
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = typeFilter === "all" || notification.type === typeFilter
    const matchesPriority = priorityFilter === "all" || notification.priority === priorityFilter
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "read" && notification.read) ||
      (statusFilter === "unread" && !notification.read)

    return matchesSearch && matchesType && matchesPriority && matchesStatus
  })

  // Get notification counts by type
  const notificationCounts = {
    all: notifications.length,
    inquiry: getNotificationsByType("inquiry").length,
    enrollment: getNotificationsByType("enrollment").length,
    payment: getNotificationsByType("payment").length,
    completion: getNotificationsByType("completion").length,
    system: getNotificationsByType("system").length,
    warning: getNotificationsByType("warning").length,
    error: getNotificationsByType("error").length,
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminHeader />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
                <p className="text-gray-500">Manage your notifications and preferences</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
                  <EyeOff className="h-4 w-4 mr-2" />
                  Mark all read ({unreadCount})
                </Button>
                <Button variant="outline" onClick={clearAllNotifications}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear all
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{notifications.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Unread</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{unreadCount}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">High Priority</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">
                    {notifications.filter((n) => n.priority === "high" || n.priority === "urgent").length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Today</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {
                      notifications.filter((n) => {
                        const today = new Date()
                        const notificationDate = new Date(n.timestamp)
                        return notificationDate.toDateString() === today.toDateString()
                      }).length
                    }
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="notifications" className="space-y-6">
              <TabsList>
                <TabsTrigger value="notifications">All Notifications</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="notifications" className="space-y-6">
                {/* Filters */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Filters</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          type="search"
                          placeholder="Search notifications..."
                          className="pl-8"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>

                      <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger className="w-full md:w-[180px]">
                          <SelectValue placeholder="Filter by type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types ({notificationCounts.all})</SelectItem>
                          <SelectItem value="inquiry">Inquiries ({notificationCounts.inquiry})</SelectItem>
                          <SelectItem value="enrollment">Enrollments ({notificationCounts.enrollment})</SelectItem>
                          <SelectItem value="payment">Payments ({notificationCounts.payment})</SelectItem>
                          <SelectItem value="completion">Completions ({notificationCounts.completion})</SelectItem>
                          <SelectItem value="system">System ({notificationCounts.system})</SelectItem>
                          <SelectItem value="warning">Warnings ({notificationCounts.warning})</SelectItem>
                          <SelectItem value="error">Errors ({notificationCounts.error})</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                        <SelectTrigger className="w-full md:w-[150px]">
                          <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Priorities</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full md:w-[150px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="unread">Unread</SelectItem>
                          <SelectItem value="read">Read</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Notifications List */}
                <div className="space-y-4">
                  {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notification) => (
                      <NotificationCard
                        key={notification.id}
                        notification={notification}
                        onMarkAsRead={markAsRead}
                        onRemove={removeNotification}
                      />
                    ))
                  ) : (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">No notifications match your filters</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Configure how you want to receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-notifications">Email Notifications</Label>
                          <p className="text-sm text-gray-500">Receive notifications via email</p>
                        </div>
                        <Switch
                          id="email-notifications"
                          checked={emailNotifications}
                          onCheckedChange={setEmailNotifications}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="push-notifications">Push Notifications</Label>
                          <p className="text-sm text-gray-500">Receive browser push notifications</p>
                        </div>
                        <Switch
                          id="push-notifications"
                          checked={pushNotifications}
                          onCheckedChange={setPushNotifications}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="sound-enabled">Sound Alerts</Label>
                          <p className="text-sm text-gray-500">Play sound for new notifications</p>
                        </div>
                        <Switch id="sound-enabled" checked={soundEnabled} onCheckedChange={setSoundEnabled} />
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button>Save Preferences</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Notification Types</CardTitle>
                    <CardDescription>Choose which types of notifications you want to receive</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(notificationIcons).map(([type, icon]) => (
                        <div key={type} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {icon}
                            <div>
                              <Label className="capitalize">{type} Notifications</Label>
                              <p className="text-sm text-gray-500">
                                {type === "inquiry" && "New inquiry form submissions"}
                                {type === "enrollment" && "New course enrollments"}
                                {type === "completion" && "Course completions"}
                                {type === "payment" && "Payment confirmations"}
                                {type === "system" && "System updates and maintenance"}
                                {type === "warning" && "Important warnings"}
                                {type === "error" && "Critical errors"}
                              </p>
                            </div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
