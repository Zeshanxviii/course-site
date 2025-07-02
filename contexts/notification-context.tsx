"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface Notification {
  id: string
  type: "inquiry" | "enrollment" | "completion" | "payment" | "system" | "warning" | "error"
  title: string
  message: string
  timestamp: Date
  read: boolean
  priority: "low" | "medium" | "high" | "urgent"
  actionUrl?: string
  metadata?: {
    userId?: string
    courseId?: string
    amount?: number
    inquiryId?: string
    [key: string]: any
  }
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  clearAllNotifications: () => void
  getNotificationsByType: (type: Notification["type"]) => Notification[]
  getUnreadNotifications: () => Notification[]
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}

// Mock initial notifications
const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "inquiry",
    title: "New Inquiry Received",
    message: "Rajesh Kumar submitted an inquiry for Pro Track course",
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    read: false,
    priority: "high",
    actionUrl: "/admin/inquiries",
    metadata: {
      userId: "user-123",
      courseId: "pro-track",
      inquiryId: "INQ-123456",
    },
  },
  {
    id: "2",
    type: "enrollment",
    title: "New Enrollment",
    message: "Priya Sharma enrolled in Growth Track course",
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    read: false,
    priority: "high",
    actionUrl: "/admin/students",
    metadata: {
      userId: "user-124",
      courseId: "growth-track",
      amount: 9999,
    },
  },
  {
    id: "3",
    type: "payment",
    title: "Payment Received",
    message: "Payment of ₹15,999 received from Amit Patel",
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    read: true,
    priority: "medium",
    actionUrl: "/admin/payments",
    metadata: {
      userId: "user-125",
      amount: 15999,
    },
  },
  {
    id: "4",
    type: "completion",
    title: "Course Completed",
    message: "Sneha Gupta completed Starter Track course",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: true,
    priority: "low",
    actionUrl: "/admin/students",
    metadata: {
      userId: "user-126",
      courseId: "starter-track",
    },
  },
  {
    id: "5",
    type: "system",
    title: "System Update",
    message: "Course content has been updated successfully",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    read: false,
    priority: "medium",
    actionUrl: "/admin/courses",
  },
  {
    id: "6",
    type: "warning",
    title: "Low Conversion Rate",
    message: "Conversion rate dropped below 30% this week",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    read: false,
    priority: "urgent",
    actionUrl: "/admin/analytics",
  },
]

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add new notifications (simulate real-time events)
      if (Math.random() < 0.1) {
        // 10% chance every 30 seconds
        const mockNotifications = [
          {
            type: "inquiry" as const,
            title: "New Inquiry Received",
            message: `${["Vikram Singh", "Anita Sharma", "Rohit Kumar"][Math.floor(Math.random() * 3)]} submitted an inquiry`,
            priority: "high" as const,
            actionUrl: "/admin/inquiries",
          },
          {
            type: "enrollment" as const,
            title: "New Enrollment",
            message: `${["Kavya Patel", "Arjun Reddy", "Meera Joshi"][Math.floor(Math.random() * 3)]} enrolled in a course`,
            priority: "high" as const,
            actionUrl: "/admin/students",
            metadata: { amount: Math.floor(Math.random() * 20000) + 5000 },
          },
        ]

        const randomNotification = mockNotifications[Math.floor(Math.random() * mockNotifications.length)]
        addNotification(randomNotification)
      }
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false,
    }

    setNotifications((prev) => [newNotification, ...prev])

    // Show browser notification if permission is granted
    if (Notification.permission === "granted") {
      new Notification(notification.title, {
        body: notification.message,
        icon: "/favicon.ico",
        tag: newNotification.id,
      })
    }
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  const getNotificationsByType = (type: Notification["type"]) => {
    return notifications.filter((notification) => notification.type === type)
  }

  const getUnreadNotifications = () => {
    return notifications.filter((notification) => !notification.read)
  }

  const unreadCount = notifications.filter((notification) => !notification.read).length

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications,
    getNotificationsByType,
    getUnreadNotifications,
  }

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}
