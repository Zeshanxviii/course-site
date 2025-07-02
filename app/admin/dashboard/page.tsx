"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Search,
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
  TrendingUp,
  DollarSign,
  UserPlus,
  BookOpen,
} from "lucide-react"
import AdminHeader from "@/components/admin/header"
import AdminSidebar from "@/components/admin/sidebar"
import { AreaChart, BarChart, PieChart, LineChart } from "@/components/admin/charts"

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
  activeStudents: 156,
  activeStudentsChange: 5.2,
  completionRate: 78.5,
  completionRateChange: 3.1,
}

// Mock data for recent activities
const recentActivities = [
  {
    id: 1,
    type: "enrollment",
    user: "Rajesh Kumar",
    course: "Pro Track",
    time: "2 minutes ago",
    amount: "₹15,999",
  },
  {
    id: 2,
    type: "inquiry",
    user: "Priya Sharma",
    course: "Starter Track",
    time: "15 minutes ago",
    amount: null,
  },
  {
    id: 3,
    type: "completion",
    user: "Amit Patel",
    course: "Growth Track",
    time: "1 hour ago",
    amount: null,
  },
  {
    id: 4,
    type: "enrollment",
    user: "Sneha Gupta",
    course: "Growth Track",
    time: "2 hours ago",
    amount: "₹9,999",
  },
  {
    id: 5,
    type: "inquiry",
    user: "Vikram Singh",
    course: "Pro Track",
    time: "3 hours ago",
    amount: null,
  },
]

// Mock data for top courses
const topCourses = [
  { name: "Starter Track", enrollments: 42, revenue: 209580, growth: 15.2 },
  { name: "Growth Track", revenue: 279720, enrollments: 28, growth: 8.7 },
  { name: "Pro Track", enrollments: 17, revenue: 271983, growth: 22.1 },
]

// Mock data for recent inquiries
const recentInquiries = [
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
]

// Status badge colors
const statusColors: Record<string, string> = {
  New: "bg-blue-100 text-blue-800",
  Contacted: "bg-yellow-100 text-yellow-800",
  Enrolled: "bg-green-100 text-green-800",
  "Not Interested": "bg-red-100 text-red-800",
}

const activityIcons = {
  enrollment: <UserPlus className="h-4 w-4 text-green-600" />,
  inquiry: <FileText className="h-4 w-4 text-blue-600" />,
  completion: <CheckCircle className="h-4 w-4 text-purple-600" />,
}

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter inquiries based on search query and status filter
  const filteredInquiries = recentInquiries.filter((inquiry) => {
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
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-gray-500">Welcome back! Here's what's happening with your courses.</p>
              </div>
              <div className="flex items-center gap-2">
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

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-gray-500" />
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
                  <CardTitle className="text-sm font-medium">Active Students</CardTitle>
                  <BookOpen className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.activeStudents}</div>
                  <div className="flex items-center pt-1 text-xs">
                    {analyticsData.activeStudentsChange > 0 ? (
                      <>
                        <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                        <span className="text-green-500">{analyticsData.activeStudentsChange}%</span>
                      </>
                    ) : (
                      <>
                        <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                        <span className="text-red-500">{Math.abs(analyticsData.activeStudentsChange)}%</span>
                      </>
                    )}
                    <span className="text-gray-500 ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-gray-500" />
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

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Monthly revenue for the last 6 months</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[300px] w-full">
                    <AreaChart />
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle>Course Performance</CardTitle>
                  <CardDescription>Enrollments by course type</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[300px] w-full">
                    <BarChart />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Additional Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle>Student Progress</CardTitle>
                  <CardDescription>Course completion rates</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[300px] w-full">
                    <PieChart />
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle>Inquiry Trends</CardTitle>
                  <CardDescription>Daily inquiries for the last 30 days</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[300px] w-full">
                    <LineChart />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Content Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="inquiries">Recent Inquiries</TabsTrigger>
                <TabsTrigger value="courses">Top Courses</TabsTrigger>
                <TabsTrigger value="activities">Activities</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Activity */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>Latest actions and events</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ScrollArea className="h-[400px]">
                        <div className="p-6">
                          {recentActivities.map((activity) => (
                            <div key={activity.id} className="flex items-start gap-4 py-4 border-b last:border-0">
                              <div className="bg-gray-100 rounded-full p-2">
                                {activityIcons[activity.type as keyof typeof activityIcons]}
                              </div>
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                  <p className="text-sm font-medium">{activity.user}</p>
                                  <span className="text-xs text-gray-500">{activity.time}</span>
                                </div>
                                <p className="text-sm text-gray-500">
                                  {activity.type === "enrollment"
                                    ? `Enrolled in ${activity.course}`
                                    : activity.type === "inquiry"
                                      ? `Submitted inquiry for ${activity.course}`
                                      : `Completed ${activity.course}`}
                                </p>
                                {activity.amount && (
                                  <Badge variant="outline" className="text-green-600">
                                    {activity.amount}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>

                  {/* Quick Stats */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Stats</CardTitle>
                      <CardDescription>Key performance indicators</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Course Completion Rate</span>
                          <span className="font-medium">{analyticsData.completionRate}%</span>
                        </div>
                        <Progress value={analyticsData.completionRate} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Student Satisfaction</span>
                          <span className="font-medium">92%</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Response Time</span>
                          <span className="font-medium">2.5 hrs</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">24</div>
                          <div className="text-xs text-gray-500">New This Week</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">156</div>
                          <div className="text-xs text-gray-500">Active Students</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Inquiries Tab */}
              <TabsContent value="inquiries" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle>Recent Inquiries</CardTitle>
                        <CardDescription>Latest form submissions and leads</CardDescription>
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
                              <tr className="border-b transition-colors hover:bg-muted/50">
                                <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
                                <th className="h-12 px-4 text-left align-middle font-medium">Contact</th>
                                <th className="h-12 px-4 text-left align-middle font-medium">Course</th>
                                <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                                <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                                <th className="h-12 px-4 text-left align-middle font-medium">Verified</th>
                                <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                              {filteredInquiries.map((inquiry) => (
                                <tr key={inquiry.id} className="border-b transition-colors hover:bg-muted/50">
                                  <td className="p-4 align-middle">
                                    <div className="flex items-center gap-2">
                                      <Avatar className="h-8 w-8">
                                        <AvatarFallback>{inquiry.name.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      <span className="font-medium">{inquiry.name}</span>
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
                </Card>
              </TabsContent>

              {/* Top Courses Tab */}
              <TabsContent value="courses" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {topCourses.map((course, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg">{course.name}</CardTitle>
                        <CardDescription>Course performance metrics</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Enrollments</span>
                          <span className="font-semibold">{course.enrollments}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Revenue</span>
                          <span className="font-semibold">₹{course.revenue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Growth</span>
                          <div className="flex items-center">
                            <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                            <span className="text-green-500 font-semibold">{course.growth}%</span>
                          </div>
                        </div>
                        <Progress value={(course.enrollments / 50) * 100} className="h-2" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Activities Tab */}
              <TabsContent value="activities" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>All Activities</CardTitle>
                    <CardDescription>Complete activity log</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[500px]">
                      <div className="p-6">
                        {recentActivities.concat(recentActivities).map((activity, index) => (
                          <div
                            key={`${activity.id}-${index}`}
                            className="flex items-start gap-4 py-4 border-b last:border-0"
                          >
                            <div className="bg-gray-100 rounded-full p-2">
                              {activityIcons[activity.type as keyof typeof activityIcons]}
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">{activity.user}</p>
                                <span className="text-xs text-gray-500">{activity.time}</span>
                              </div>
                              <p className="text-sm text-gray-500">
                                {activity.type === "enrollment"
                                  ? `Enrolled in ${activity.course}`
                                  : activity.type === "inquiry"
                                    ? `Submitted inquiry for ${activity.course}`
                                    : `Completed ${activity.course}`}
                              </p>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">{activity.course}</Badge>
                                {activity.amount && (
                                  <Badge variant="outline" className="text-green-600">
                                    {activity.amount}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
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
