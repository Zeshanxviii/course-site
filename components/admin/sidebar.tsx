"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Users,
  FileText,
  BookOpen,
  CreditCard,
  Settings,
  Bell,
  BarChart3,
  MessageSquare,
  TrendingUp,
  Calendar,
  Mail,
} from "lucide-react"
import { useNotifications } from "@/contexts/notification-context"

const navigation = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Notifications",
    href: "/admin/notifications",
    icon: Bell,
    badge: true,
  },
  {
    name: "Students",
    href: "/admin/students",
    icon: Users,
  },
  {
    name: "Inquiries",
    href: "/admin/inquiries",
    icon: FileText,
  },
  {
    name: "Courses",
    href: "/admin/courses",
    icon: BookOpen,
  },
  {
    name: "Payments",
    href: "/admin/payments",
    icon: CreditCard,
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    name: "Reviews",
    href: "/admin/reviews",
    icon: MessageSquare,
  },
  {
    name: "Marketing",
    href: "/admin/marketing",
    icon: TrendingUp,
  },
  {
    name: "Calendar",
    href: "/admin/calendar",
    icon: Calendar,
  },
  {
    name: "Email",
    href: "/admin/email",
    icon: Mail,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const { unreadCount } = useNotifications()

  return (
    <div className="hidden border-r bg-white md:block md:w-64">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <BookOpen className="h-6 w-6" />
            <span>Course Admin</span>
          </Link>
        </div>
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-2 p-4 pt-0">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Button
                  key={item.name}
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn("w-full justify-start", isActive && "bg-gray-100")}
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                    {item.badge && item.name === "Notifications" && unreadCount > 0 && (
                      <Badge variant="destructive" className="ml-auto">
                        {unreadCount > 99 ? "99+" : unreadCount}
                      </Badge>
                    )}
                  </Link>
                </Button>
              )
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
