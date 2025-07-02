"use client"

import { useState } from "react"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import ResetEntranceForm from "@/components/reset-entrance-form"
import {
  Search,
  Bell,
  BarChart3,
  Users,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Download,
  Filter,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react"
import AdminHeader from "@/components/admin/header"
import AdminSidebar from "@/components/admin/sidebar"
import { AreaChart, BarChart } from "@/components/admin/charts"

// Mock data for inquiries
const inquiries = [
  {
    id: "INQ-123456",
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    phone: "9876543210",
    course: "Pro Track",
    status: "New",
    date: "2023-06-12T10:30:00",
    verified: true,
  },
  {
    id: "INQ-123457",
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "9876543211",
    course: "Starter Track",
    status: "Contacted",
    date: "2023-06-11T14:45:00",
    verified: true,
  },
  {
    id: "INQ-123458",
    name: "Amit Patel",
    email: "amit@example.com",
    phone: "9876543212",
    course: "Growth Track",
    status: "Enrolled",
    date: "2023-06-10T09:15:00",
    verified: true,
  },
  {
    id: "INQ-123459",
    name: "Sneha Gupta",
    email: "sneha@example.com",
    phone: "9876543213",
    course: "Pro Track",
    status: "New",
    date: "2023-06-09T16:20:00",
    verified: false,
  },
  {
    id: "INQ-123460",
    name: "Vikram Singh",
    email: "vikram@example.com",
    phone: "9876543214",
    course: "Growth Track",
    status: "Contacted",
    date: "2023-06-08T11:10:00",
    verified: true,
  },
  {
    id: "INQ-123461",
    name: "Neha Verma",
    email: "neha@example.com",
    phone: "9876543215",
    course: "Starter Track",
    status: "Not Interested",
    date: "2023-06-07T13:25:00",
    verified: true,
  },
  {
    id: "INQ-123462",
    name: "Rahul Mehta",
    email: "rahul@example.com",
    phone: "9876543216",
    course: "Pro Track",
    status: "Enrolled",
    date: "2023-06-06T15:40:00",
    verified: true,
  },
  {
    id: "INQ-123463",
    name: "Ananya Desai",
    email: "ananya@example.com",
    phone: "9876543217",
    course: "Starter Track",
    status: "New",
    date: "2023-06-05T10:05:00",
    verified: false,
  },
  {
    id: "INQ-123464",
    name: "Karan Malhotra",
    email: "karan@example.com",
    phone: "9876543218",
    course: "Growth Track",
    status: "Contacted",
    date: "2023-06-04T09:30:00",
    verified: true,
  },
  {
    id: "INQ-123465",
    name: "Divya Joshi",
    email: "divya@example.com",
    phone: "9876543219",
    course: "Pro Track",
    status: "Not Interested",
    date: "2023-06-03T14:15:00",
    verified: true,
  },
]

// Mock data for students
const students = [
  {
    id: "STU-123456",
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    phone: "9876543210",
    course: "Pro Track",
    progress: 75,
    enrollmentDate: "2023-05-15T10:30:00",
    lastActive: "2023-06-12T10:30:00",
  },
  {
    id: "STU-123457",
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "9876543211",
    course: "Starter Track",
    progress: 40,
    enrollmentDate: "2023-05-20T14:45:00",
    lastActive: "2023-06-11T14:45:00",
  },
  {
    id: "STU-123458",
    name: "Amit Patel",
    email: "amit@example.com",
    phone: "9876543212",
    course: "Growth Track",
    progress: 60,
    enrollmentDate: "2023-05-10T09:15:00",
    lastActive: "2023-06-10T09:15:00",
  },
  {
    id: "STU-123459",
    name: "Sneha Gupta",
    email: "sneha@example.com",
    phone: "9876543213",
    course: "Pro Track",
    progress: 90,
    enrollmentDate: "2023-04-25T16:20:00",
    lastActive: "2023-06-12T16:20:00",
  },
  {
    id: "STU-123460",
    name: "Vikram Singh",
    email: "vikram@example.com",
    phone: "9876543214",
    course: "Growth Track",
    progress: 30,
    enrollmentDate: "2023-05-28T11:10:00",
    lastActive: "2023-06-08T11:10:00",
  },
]

// Mock data for analytics
const analyticsData = {
  totalInquiries: 245,
  inquiriesChange: 12.5,
  totalEnrollments: 87,
  enrollmentsChange: 8.3,
  totalRevenue: 875000,
  revenueChange: 15.2,
  conversionRate: 35.5,
  conversionChange: 2.8,
}

// Status badge colors
const statusColors: Record<string, string> = {
  New: "bg-blue-100 text-blue-800",
  Contacted: "bg-yellow-100 text-yellow-800",
  Enrolled: "bg-green-100 text-green-800",
  "Not Interested": "bg-red-100 text-red-800",
}

export default function AdminPage() {
  redirect("/admin/dashboard")
}

export function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter inquiries based on search query and status filter
  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      searchQuery === "" ||
      inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || inquiry.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminHeader />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-gray-500">Welcome back, Admin!</p>
              </div>
              <div className="flex items-center gap-2">
                <ResetEntranceForm />
                <Button>
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </Button>
              </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
                  <TabsTrigger value="students">Students</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <div className="hidden md:flex items-center gap-2">
                  <Select defaultValue="today">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="yesterday">Yesterday</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="year">This Year</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                {/* Analytics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
                      <FileText className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{analyticsData.totalInquiries}</div>
                      <div className="flex items-center pt-1 text-xs">
                        {analyticsData.inquiriesChange > 0 ? (
                          <>
                            <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                            <span className="text-green-500">{analyticsData.inquiriesChange}%</span>
                          </>
                        ) : (
                          <>
                            <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                            <span className="text-red-500">{Math.abs(analyticsData.inquiriesChange)}%</span>
                          </>
                        )}
                        <span className="text-gray-500 ml-1">from last month</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
                      <Users className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{analyticsData.totalEnrollments}</div>
                      <div className="flex items-center pt-1 text-xs">
                        {analyticsData.enrollmentsChange > 0 ? (
                          <>
                            <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                            <span className="text-green-500">{analyticsData.enrollmentsChange}%</span>
                          </>
                        ) : (
                          <>
                            <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                            <span className="text-red-500">{Math.abs(analyticsData.enrollmentsChange)}%</span>
                          </>
                        )}
                        <span className="text-gray-500 ml-1">from last month</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                      <BarChart3 className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">₹{(analyticsData.totalRevenue / 1000).toFixed(0)}K</div>
                      <div className="flex items-center pt-1 text-xs">
                        {analyticsData.revenueChange > 0 ? (
                          <>
                            <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                            <span className="text-green-500">{analyticsData.revenueChange}%</span>
                          </>
                        ) : (
                          <>
                            <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                            <span className="text-red-500">{Math.abs(analyticsData.revenueChange)}%</span>
                          </>
                        )}
                        <span className="text-gray-500 ml-1">from last month</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                      <ArrowUpRight className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{analyticsData.conversionRate}%</div>
                      <div className="flex items-center pt-1 text-xs">
                        {analyticsData.conversionChange > 0 ? (
                          <>
                            <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                            <span className="text-green-500">{analyticsData.conversionChange}%</span>
                          </>
                        ) : (
                          <>
                            <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                            <span className="text-red-500">{Math.abs(analyticsData.conversionChange)}%</span>
                          </>
                        )}
                        <span className="text-gray-500 ml-1">from last month</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="overflow-hidden">
                    <CardHeader>
                      <CardTitle>Inquiries Overview</CardTitle>
                      <CardDescription>Daily inquiries for the last 30 days</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="h-[300px] w-full">
                        <AreaChart />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="overflow-hidden">
                    <CardHeader>
                      <CardTitle>Enrollments by Course</CardTitle>
                      <CardDescription>Distribution of enrollments across courses</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="h-[300px] w-full">
                        <BarChart />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest actions and events</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[300px]">
                      <div className="p-6">
                        {inquiries.slice(0, 5).map((inquiry, index) => (
                          <div key={inquiry.id} className="flex items-start gap-4 py-4">
                            <Avatar>
                              <AvatarFallback>{inquiry.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">{inquiry.name}</p>
                                <span className="text-xs text-gray-500">
                                  {new Date(inquiry.date).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                              </div>
                              <p className="text-sm text-gray-500">
                                {inquiry.status === "New"
                                  ? "Submitted a new inquiry"
                                  : inquiry.status === "Contacted"
                                    ? "Was contacted by the team"
                                    : inquiry.status === "Enrolled"
                                      ? "Enrolled in a course"
                                      : "Marked as not interested"}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className={statusColors[inquiry.status]}>
                                  {inquiry.status}
                                </Badge>
                                <Badge variant="outline">{inquiry.course}</Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                  <CardFooter className="border-t bg-gray-50 px-6 py-3">
                    <Button variant="ghost" className="w-full justify-center">
                      View All Activity
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Inquiries Tab */}
              <TabsContent value="inquiries" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle>All Inquiries</CardTitle>
                        <CardDescription>Manage and track all form submissions</CardDescription>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <div className="relative">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                          <Input
                            type="search"
                            placeholder="Search inquiries..."
                            className="pl-8 w-full sm:w-[250px]"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                          <SelectTrigger className="w-full sm:w-[150px]">
                            <div className="flex items-center gap-2">
                              <Filter className="h-4 w-4" />
                              <SelectValue placeholder="Filter by status" />
                            </div>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="New">New</SelectItem>
                            <SelectItem value="Contacted">Contacted</SelectItem>
                            <SelectItem value="Enrolled">Enrolled</SelectItem>
                            <SelectItem value="Not Interested">Not Interested</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[500px]">
                      <div className="rounded-md border">
                        <div className="relative w-full overflow-auto">
                          <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b">
                              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                  ID
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                  Name
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                  Contact
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                  Course
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                  Status
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                  Date
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                  Verified
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                              {filteredInquiries.map((inquiry) => (
                                <tr
                                  key={inquiry.id}
                                  className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                >
                                  <td className="p-4 align-middle">{inquiry.id}</td>
                                  <td className="p-4 align-middle">
                                    <div className="flex items-center gap-2">
                                      <Avatar className="h-8 w-8">
                                        <AvatarFallback>{inquiry.name.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      <span>{inquiry.name}</span>
                                    </div>
                                  </td>
                                  <td className="p-4 align-middle">
                                    <div className="space-y-1">
                                      <div className="flex items-center text-xs">
                                        <Mail className="h-3 w-3 mr-1" />
                                        {inquiry.email}
                                      </div>
                                      <div className="flex items-center text-xs">
                                        <Phone className="h-3 w-3 mr-1" />
                                        {inquiry.phone}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-4 align-middle">
                                    <Badge variant="outline">{inquiry.course}</Badge>
                                  </td>
                                  <td className="p-4 align-middle">
                                    <Badge className={statusColors[inquiry.status]}>{inquiry.status}</Badge>
                                  </td>
                                  <td className="p-4 align-middle">
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      <span>
                                        {new Date(inquiry.date).toLocaleDateString([], {
                                          day: "numeric",
                                          month: "short",
                                        })}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="p-4 align-middle">
                                    {inquiry.verified ? (
                                      <CheckCircle className="h-5 w-5 text-green-500" />
                                    ) : (
                                      <XCircle className="h-5 w-5 text-red-500" />
                                    )}
                                  </td>
                                  <td className="p-4 align-middle">
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </ScrollArea>
                  </CardContent>
                  <CardFooter className="border-t bg-gray-50 px-6 py-3 flex justify-between">
                    <div className="text-sm text-gray-500">
                      Showing <strong>{filteredInquiries.length}</strong> of <strong>{inquiries.length}</strong>{" "}
                      inquiries
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" disabled>
                        Previous
                      </Button>
                      <Button variant="outline" size="sm">
                        Next
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Students Tab */}
              <TabsContent value="students" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{students.length}</div>
                      <div className="text-xs text-gray-500">Across all courses</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {Math.round(students.reduce((acc, student) => acc + student.progress, 0) / students.length)}%
                      </div>
                      <Progress
                        value={Math.round(
                          students.reduce((acc, student) => acc + student.progress, 0) / students.length,
                        )}
                        className="h-2 mt-2"
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Active Today</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {
                          students.filter((student) => {
                            const lastActive = new Date(student.lastActive)
                            const today = new Date()
                            return (
                              lastActive.getDate() === today.getDate() &&
                              lastActive.getMonth() === today.getMonth() &&
                              lastActive.getFullYear() === today.getFullYear()
                            )
                          }).length
                        }
                      </div>
                      <div className="text-xs text-gray-500">Students active in the last 24 hours</div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle>All Students</CardTitle>
                        <CardDescription>Manage enrolled students and track their progress</CardDescription>
                      </div>
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input type="search" placeholder="Search students..." className="pl-8 w-full sm:w-[250px]" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[400px]">
                      <div className="rounded-md border">
                        <div className="relative w-full overflow-auto">
                          <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b">
                              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                  Student
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                  Course
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                  Progress
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                  Enrollment Date
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                  Last Active
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                              {students.map((student) => (
                                <tr
                                  key={student.id}
                                  className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                >
                                  <td className="p-4 align-middle">
                                    <div className="flex items-center gap-2">
                                      <Avatar className="h-8 w-8">
                                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <div className="font-medium">{student.name}</div>
                                        <div className="text-xs text-gray-500">{student.email}</div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-4 align-middle">
                                    <Badge variant="outline">{student.course}</Badge>
                                  </td>
                                  <td className="p-4 align-middle">
                                    <div className="flex items-center gap-2">
                                      <Progress value={student.progress} className="h-2 w-[100px]" />
                                      <span className="text-xs font-medium">{student.progress}%</span>
                                    </div>
                                  </td>
                                  <td className="p-4 align-middle">
                                    {new Date(student.enrollmentDate).toLocaleDateString()}
                                  </td>
                                  <td className="p-4 align-middle">
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      <span>
                                        {new Date(student.lastActive).toLocaleDateString([], {
                                          day: "numeric",
                                          month: "short",
                                        })}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="p-4 align-middle">
                                    <Button variant="ghost" size="sm">
                                      View Details
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </ScrollArea>
                  </CardContent>
                  <CardFooter className="border-t bg-gray-50 px-6 py-3 flex justify-between">
                    <div className="text-sm text-gray-500">
                      Showing <strong>{students.length}</strong> students
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" disabled>
                        Previous
                      </Button>
                      <Button variant="outline" size="sm">
                        Next
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <Card>
                      <CardHeader>
                        <CardTitle>Entrance Form Settings</CardTitle>
                        <CardDescription>Configure the entrance form behavior</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="entrance-form-enabled">Enable Entrance Form</Label>
                            <Switch id="entrance-form-enabled" defaultChecked />
                          </div>
                          <p className="text-xs text-gray-500">
                            When enabled, visitors must complete the form before accessing the site
                          </p>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="phone-verification">Require Phone Verification</Label>
                            <Switch id="phone-verification" defaultChecked />
                          </div>
                          <p className="text-xs text-gray-500">
                            When enabled, visitors must verify their phone number with OTP
                          </p>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="remember-visitors">Remember Visitors</Label>
                            <Switch id="remember-visitors" defaultChecked />
                          </div>
                          <p className="text-xs text-gray-500">
                            When enabled, returning visitors won't see the form again
                          </p>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <Label>Reset Entrance Form</Label>
                          <div className="flex items-center gap-2">
                            <ResetEntranceForm />
                          </div>
                          <p className="text-xs text-gray-500">
                            This will reset the entrance form for your current browser session
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="md:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Form Fields Configuration</CardTitle>
                        <CardDescription>Customize the fields shown on the entrance form</CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <ScrollArea className="h-[400px]">
                          <div className="p-6 space-y-6">
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="font-medium">Full Name</h3>
                                  <p className="text-sm text-gray-500">Collect visitor's full name</p>
                                </div>
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-2">
                                    <Label htmlFor="name-required" className="text-sm">
                                      Required
                                    </Label>
                                    <Switch id="name-required" defaultChecked />
                                  </div>
                                  <Button variant="ghost" size="sm">
                                    Edit
                                  </Button>
                                </div>
                              </div>
                              <Separator />
                            </div>

                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="font-medium">Email Address</h3>
                                  <p className="text-sm text-gray-500">Collect visitor's email address</p>
                                </div>
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-2">
                                    <Label htmlFor="email-required" className="text-sm">
                                      Required
                                    </Label>
                                    <Switch id="email-required" defaultChecked />
                                  </div>
                                  <Button variant="ghost" size="sm">
                                    Edit
                                  </Button>
                                </div>
                              </div>
                              <Separator />
                            </div>

                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="font-medium">Phone Number</h3>
                                  <p className="text-sm text-gray-500">Collect visitor's phone number</p>
                                </div>
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-2">
                                    <Label htmlFor="phone-required" className="text-sm">
                                      Required
                                    </Label>
                                    <Switch id="phone-required" defaultChecked />
                                  </div>
                                  <Button variant="ghost" size="sm">
                                    Edit
                                  </Button>
                                </div>
                              </div>
                              <Separator />
                            </div>

                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="font-medium">Course Interest</h3>
                                  <p className="text-sm text-gray-500">Ask which course they're interested in</p>
                                </div>
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-2">
                                    <Label htmlFor="course-required" className="text-sm">
                                      Required
                                    </Label>
                                    <Switch id="course-required" defaultChecked />
                                  </div>
                                  <Button variant="ghost" size="sm">
                                    Edit
                                  </Button>
                                </div>
                              </div>
                              <Separator />
                            </div>

                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="font-medium">Experience Level</h3>
                                  <p className="text-sm text-gray-500">Ask about their eCommerce experience</p>
                                </div>
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-2">
                                    <Label htmlFor="experience-required" className="text-sm">
                                      Required
                                    </Label>
                                    <Switch id="experience-required" />
                                  </div>
                                  <Button variant="ghost" size="sm">
                                    Edit
                                  </Button>
                                </div>
                              </div>
                              <Separator />
                            </div>

                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="font-medium">Add Custom Field</h3>
                                  <p className="text-sm text-gray-500">Create a new custom field</p>
                                </div>
                                <Button variant="outline" size="sm">
                                  Add Field
                                </Button>
                              </div>
                            </div>
                          </div>
                        </ScrollArea>
                      </CardContent>
                      <CardFooter className="border-t bg-gray-50 px-6 py-3 flex justify-between">
                        <Button variant="outline">Reset to Default</Button>
                        <Button>Save Changes</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
