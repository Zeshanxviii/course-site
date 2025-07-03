"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  TrendingUp,
  DollarSign,
  CheckCircle,
  XCircle,
  MessageSquare,
  Globe,
  Smartphone,
  Monitor,
} from "lucide-react"

// Mock data for students
const mockStudents = [
  {
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    phone: "+91 9876543210",
    course: "Pro Track",
    enrollmentDate: "2025-01-15",
    status: "enrolled",
    paymentAmount: 15999,
    city: "Delhi",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "+91 9876543211",
    course: "Growth Track",
    enrollmentDate: "2025-01-14",
    status: "enrolled",
    paymentAmount: 9999,
    city: "Mumbai",
  },
  {
    id: 3,
    name: "Amit Patel",
    email: "amit@example.com",
    phone: "+91 9876543212",
    course: "Starter Track",
    enrollmentDate: "2025-01-13",
    status: "not_enrolled",
    paymentAmount: 0,
    city: "Ahmedabad",
  },
  {
    id: 4,
    name: "Sneha Reddy",
    email: "sneha@example.com",
    phone: "+91 9876543213",
    course: "Pro Track",
    enrollmentDate: "2025-01-12",
    status: "enrolled",
    paymentAmount: 15999,
    city: "Bangalore",
  },
  {
    id: 5,
    name: "Vikram Singh",
    email: "vikram@example.com",
    phone: "+91 9876543214",
    course: "Growth Track",
    enrollmentDate: "2025-01-11",
    status: "not_enrolled",
    paymentAmount: 0,
    city: "Jaipur",
  },
]

// Mock data for enquiries
const mockEnquiries = [
  {
    id: 1,
    name: "Rohit Gupta",
    email: "rohit@example.com",
    phone: "+91 9876543215",
    course: "Pro Track",
    message: "I want to know more about international marketplace training",
    date: "2025-01-16",
    status: "pending",
    priority: "high",
  },
  {
    id: 2,
    name: "Kavya Nair",
    email: "kavya@example.com",
    phone: "+91 9876543216",
    course: "Starter Track",
    message: "Is this suitable for complete beginners?",
    date: "2025-01-15",
    status: "in_progress",
    priority: "medium",
  },
  {
    id: 3,
    name: "Arjun Mehta",
    email: "arjun@example.com",
    phone: "+91 9876543217",
    course: "Growth Track",
    message: "Can I get a demo session before enrolling?",
    date: "2025-01-14",
    status: "completed",
    priority: "low",
  },
]

// Mock Google Analytics data
const mockAnalyticsData = {
  overview: {
    totalUsers: 12547,
    newUsers: 8934,
    sessions: 15632,
    pageviews: 45891,
    avgSessionDuration: "3m 24s",
    bounceRate: "42.3%",
  },
  traffic: {
    organic: 45.2,
    direct: 28.7,
    social: 15.8,
    referral: 6.9,
    email: 3.4,
  },
  devices: {
    mobile: 68.4,
    desktop: 28.1,
    tablet: 3.5,
  },
  topPages: [
    { page: "/", views: 12547, title: "Home" },
    { page: "/courses", views: 8934, title: "Courses" },
    { page: "/courses/pro-track", views: 5621, title: "Pro Track" },
    { page: "/about", views: 3456, title: "About Us" },
    { page: "/contact", views: 2890, title: "Contact" },
  ],
}

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuth")
    if (!adminAuth) {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    localStorage.removeItem("adminUser")
    router.push("/admin/login")
  }

  if (!isAuthenticated) {
    return <div>Loading...</div>
  }

  const enrolledStudents = mockStudents.filter((s) => s.status === "enrolled")
  const totalRevenue = enrolledStudents.reduce((sum, student) => sum + student.paymentAmount, 0)
  const pendingEnquiries = mockEnquiries.filter((e) => e.status === "pending")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Management Panel</p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStudents.length}</div>
              <p className="text-xs text-muted-foreground">{enrolledStudents.length} enrolled</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">From {enrolledStudents.length} enrollments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Enquiries</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingEnquiries.length}</div>
              <p className="text-xs text-muted-foreground">Need immediate attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Website Visitors</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAnalyticsData.overview.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="enquiries">Enquiries</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
          </TabsList>

          {/* Students Tab */}
          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>Student Management</CardTitle>
                <CardDescription>Manage enrolled and prospective students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-medium">Name</th>
                        <th className="text-left p-4 font-medium">Contact</th>
                        <th className="text-left p-4 font-medium">Course</th>
                        <th className="text-left p-4 font-medium">Status</th>
                        <th className="text-left p-4 font-medium">Amount</th>
                        <th className="text-left p-4 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockStudents.map((student) => (
                        <tr key={student.id} className="border-b hover:bg-gray-50">
                          <td className="p-4">
                            <div>
                              <div className="font-medium">{student.name}</div>
                              <div className="text-sm text-gray-500">{student.city}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="text-sm">
                              <div>{student.email}</div>
                              <div className="text-gray-500">{student.phone}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant="outline">{student.course}</Badge>
                          </td>
                          <td className="p-4">
                            {student.status === "enrolled" ? (
                              <Badge className="bg-green-100 text-green-800">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Enrolled
                              </Badge>
                            ) : (
                              <Badge variant="secondary">
                                <XCircle className="w-3 h-3 mr-1" />
                                Not Enrolled
                              </Badge>
                            )}
                          </td>
                          <td className="p-4">
                            {student.paymentAmount > 0 ? (
                              <span className="font-medium">₹{student.paymentAmount.toLocaleString()}</span>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="p-4 text-sm text-gray-500">
                            {new Date(student.enrollmentDate).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enquiries Tab */}
          <TabsContent value="enquiries">
            <Card>
              <CardHeader>
                <CardTitle>Enquiry Management</CardTitle>
                <CardDescription>Track and manage customer enquiries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockEnquiries.map((enquiry) => (
                    <div key={enquiry.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium">{enquiry.name}</h3>
                          <p className="text-sm text-gray-600">
                            {enquiry.email} • {enquiry.phone}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Badge
                            variant={
                              enquiry.priority === "high"
                                ? "destructive"
                                : enquiry.priority === "medium"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {enquiry.priority} priority
                          </Badge>
                          <Badge variant={enquiry.status === "completed" ? "default" : "outline"}>
                            {enquiry.status.replace("_", " ")}
                          </Badge>
                        </div>
                      </div>
                      <div className="mb-3">
                        <p className="text-sm">
                          <strong>Course Interest:</strong> {enquiry.course}
                        </p>
                        <p className="text-sm mt-1">
                          <strong>Message:</strong> {enquiry.message}
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">{new Date(enquiry.date).toLocaleDateString()}</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Reply
                          </Button>
                          <Button size="sm">Mark Complete</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid gap-6">
              {/* Analytics Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockAnalyticsData.overview.totalUsers.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      {mockAnalyticsData.overview.newUsers.toLocaleString()} new users
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Sessions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockAnalyticsData.overview.sessions.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      Avg: {mockAnalyticsData.overview.avgSessionDuration}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Page Views</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockAnalyticsData.overview.pageviews.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      Bounce Rate: {mockAnalyticsData.overview.bounceRate}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Traffic Sources & Device Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Traffic Sources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(mockAnalyticsData.traffic).map(([source, percentage]) => (
                        <div key={source} className="flex justify-between items-center">
                          <span className="capitalize">{source}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                            </div>
                            <span className="text-sm font-medium">{percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Device Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-4 w-4" />
                          <span>Mobile</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${mockAnalyticsData.devices.mobile}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{mockAnalyticsData.devices.mobile}%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Monitor className="h-4 w-4" />
                          <span>Desktop</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${mockAnalyticsData.devices.desktop}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{mockAnalyticsData.devices.desktop}%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          <span>Tablet</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-purple-600 h-2 rounded-full"
                              style={{ width: `${mockAnalyticsData.devices.tablet}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{mockAnalyticsData.devices.tablet}%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Top Pages */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Pages</CardTitle>
                  <CardDescription>Most visited pages on your website</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Page</th>
                          <th className="text-left p-2">Title</th>
                          <th className="text-right p-2">Views</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockAnalyticsData.topPages.map((page, index) => (
                          <tr key={index} className="border-b">
                            <td className="p-2 font-mono text-sm">{page.page}</td>
                            <td className="p-2">{page.title}</td>
                            <td className="p-2 text-right font-medium">{page.views.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid gap-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm">New enrollment: Rajesh Kumar</p>
                          <p className="text-xs text-gray-500">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm">New enquiry from Rohit Gupta</p>
                          <p className="text-xs text-gray-500">4 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm">Payment received: ₹15,999</p>
                          <p className="text-xs text-gray-500">6 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Conversion Rate</span>
                        <span className="font-medium">12.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Avg. Order Value</span>
                        <span className="font-medium">₹12,499</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Customer Satisfaction</span>
                        <span className="font-medium">4.8/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Course Completion Rate</span>
                        <span className="font-medium">89%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
