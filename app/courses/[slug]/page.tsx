import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle, Clock, Users, Globe, Star, Play, ArrowLeft, BookOpen, ArrowRight } from "lucide-react"

const courseData = {
  "starter-track": {
    id: "starter-track",
    name: "Starter Track",
    duration: "45 Days",
    marketplaces: ["Amazon.in"],
    idealFor: "New sellers setting up their first store",
    fee: "₹5,999",
    level: "Beginner",
    description:
      "Perfect for beginners who want to start their eCommerce journey on Amazon.in. Learn everything from account setup to your first sale.",
    modules: [
      {
        week: "Week 1-2",
        title: "Foundation & Setup",
        topics: [
          "Amazon seller account creation and verification",
          "Understanding Amazon's policies and guidelines",
          "GST registration and tax compliance",
          "Setting up your seller dashboard",
        ],
      },
      {
        week: "Week 3-4",
        title: "Product Research & Listing",
        topics: [
          "Product research techniques and tools",
          "Competitor analysis strategies",
          "Creating compelling product listings",
          "Product photography basics",
        ],
      },
      {
        week: "Week 5-6",
        title: "Inventory & Operations",
        topics: [
          "Inventory management fundamentals",
          "FBA vs FBM decision making",
          "Shipping and logistics setup",
          "Customer service best practices",
        ],
      },
    ],
    bonuses: [
      "Product research template",
      "Listing optimization checklist",
      "Customer service scripts",
      "30-day action plan",
    ],
    benefits: [
      "Learn from industry experts who have helped 300+ brands",
      "Live, practical training with real-time interaction",
      "Step-by-step learning with real implementation",
      "Save thousands in agency fees",
      "No more dependency on costly service providers",
      "Lifetime learning & community access",
    ],
    philosophy:
      "We believe that eCommerce success doesn't come from watching tutorials or outsourcing blindly. It comes from learning by doing. Our courses are 100% live & interactive, built around real seller accounts, designed to turn knowledge into action, and supported by a lifetime community of experts.",
  },
  "growth-track": {
    id: "growth-track",
    name: "Growth Track",
    duration: "60 Days",
    marketplaces: ["Amazon.in", "Flipkart"],
    idealFor: "Sellers scaling to multiple platforms",
    fee: "₹9,999",
    level: "Intermediate",
    description:
      "Scale your business across multiple platforms with advanced strategies for Amazon.in and Flipkart. Perfect for sellers ready to grow.",
    modules: [
      {
        week: "Week 1-2",
        title: "Multi-Platform Strategy",
        topics: [
          "Platform comparison and selection",
          "Account setup for multiple marketplaces",
          "Cross-platform inventory management",
          "Unified brand strategy",
        ],
      },
      {
        week: "Week 3-5",
        title: "Advanced Marketing",
        topics: [
          "Amazon PPC campaigns mastery",
          "Flipkart advertising strategies",
          "SEO optimization for marketplaces",
          "Brand building fundamentals",
        ],
      },
      {
        week: "Week 6-8",
        title: "Scaling & Optimization",
        topics: [
          "Analytics and performance tracking",
          "Inventory forecasting and planning",
          "Customer retention strategies",
          "Profit optimization techniques",
        ],
      },
    ],
    bonuses: [
      "Multi-platform management dashboard",
      "Advanced PPC templates",
      "Brand building toolkit",
      "Scaling roadmap",
    ],
    benefits: [
      "Learn from industry experts who have helped 300+ brands",
      "Live, practical training with real-time interaction",
      "Step-by-step learning with real implementation",
      "Save thousands in agency fees",
      "No more dependency on costly service providers",
      "Lifetime learning & community access",
    ],
    philosophy:
      "We believe that eCommerce success doesn't come from watching tutorials or outsourcing blindly. It comes from learning by doing. Our courses are 100% live & interactive, built around real seller accounts, designed to turn knowledge into action, and supported by a lifetime community of experts.",
  },
  "pro-track": {
    id: "pro-track",
    name: "Pro Track",
    duration: "90 Days",
    marketplaces: ["Amazon.in", "Flipkart", "Meesho", "Amazon Global"],
    idealFor: "Serious entrepreneurs building long-term brands",
    fee: "₹15,999",
    level: "Advanced",
    description:
      "Complete mastery of eCommerce across all major platforms including international expansion. Build a sustainable, scalable business.",
    modules: [
      {
        week: "Week 1-3",
        title: "Enterprise Foundation",
        topics: [
          "Business structure and legal setup",
          "Advanced account management",
          "Multi-platform integration strategies",
          "Team building and delegation",
        ],
      },
      {
        week: "Week 4-7",
        title: "Global Expansion",
        topics: [
          "Amazon Global marketplace setup",
          "International logistics and shipping",
          "Cross-border compliance and regulations",
          "Currency and payment management",
        ],
      },
      {
        week: "Week 8-12",
        title: "Brand Mastery & Automation",
        topics: [
          "Advanced brand building strategies",
          "Marketing automation and tools",
          "Data analytics and business intelligence",
          "Long-term business planning and exit strategies",
        ],
      },
    ],
    bonuses: [
      "International expansion toolkit",
      "Brand building masterclass",
      "Automation setup guide",
      "Business planning templates",
    ],
    benefits: [
      "Learn from industry experts who have helped 300+ brands",
      "Live, practical training with real-time interaction",
      "Step-by-step learning with real implementation",
      "Save thousands in agency fees",
      "No more dependency on costly service providers",
      "Lifetime learning & community access",
    ],
    philosophy:
      "We believe that eCommerce success doesn't come from watching tutorials or outsourcing blindly. It comes from learning by doing. Our courses are 100% live & interactive, built around real seller accounts, designed to turn knowledge into action, and supported by a lifetime community of experts.",
  },
}

export default async function CoursePage({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const course = courseData[slug as keyof typeof courseData]

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <Button asChild>
            <Link href="/courses">Back to Courses</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Button variant="ghost" asChild>
              <Link href="/courses">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Courses
              </Link>
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge variant="secondary">{course.level} Level</Badge>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">{course.name}</h1>
                <p className="text-xl text-gray-600">{course.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span>Live Training</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-blue-500" />
                  <span>{course.marketplaces.join(", ")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-blue-500" />
                  <span>Lifetime Support</span>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-3xl font-bold text-blue-600">{course.fee}</div>
                    <div className="text-sm text-gray-500">One-time payment</div>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Limited Time Offer
                  </Badge>
                </div>
                <Button size="lg" className="w-full mb-3" asChild>
                  <Link href={`/checkout?course=${course.id}`}>Enroll Now - {course.fee}</Link>
                </Button>
                {/* <Button size="lg" variant="outline" className="w-full">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Free Demo
                </Button> */}
              </div>
            </div>

            <div className="relative">
              <Image
                src="/landingPageImg.jpeg"
                alt={`${course.name} Course`}
                width={500}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Course Modules */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Course Curriculum</h2>
            <p className="text-xl text-gray-600">Structured learning path designed for maximum results</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {course.modules.map((module, index) => (
                <AccordionItem key={index} value={`module-${index}`} className="bg-gray-50 rounded-lg px-6">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 rounded-full p-2">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-lg">{module.title}</div>
                        <div className="text-sm text-gray-500">{module.week}</div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <ul className="space-y-2 ml-12">
                      {module.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Bonuses */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Exclusive Bonuses</h2>
            <p className="text-xl text-gray-600">Additional resources to accelerate your success</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {course.bonuses.map((bonus, index) => (
              <Card key={index} className="p-6">
                <CardContent className="flex items-center gap-4">
                  <div className="bg-yellow-100 rounded-full p-3">
                    <Star className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{bonus}</h3>
                    <p className="text-sm text-gray-600">Included with your enrollment</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Course Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Course Benefits</h2>
            <p className="text-xl text-gray-600">What makes our training different?</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {course.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="bg-blue-100 rounded-full p-2 mt-1">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-700">{benefit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Philosophy */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Training Philosophy</h2>
            <p className="text-xl text-gray-600">Learn, Apply, Profit</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <CardContent>
                <p className="text-lg text-gray-700 leading-relaxed">{course.philosophy}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                  <div className="text-center">
                    <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <p className="font-medium">100% Live & Interactive</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="font-medium">Real Seller Accounts</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <ArrowRight className="h-6 w-6 text-purple-600" />
                    </div>
                    <p className="font-medium">Knowledge to Action</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-6 w-6 text-orange-600" />
                    </div>
                    <p className="font-medium">Lifetime Community</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-gray-50 rounded-lg px-6">
                <AccordionTrigger className="text-left">Who can join these e-commerce courses?</AccordionTrigger>
                <AccordionContent>
                  These courses are designed for aspiring, new, and existing eCommerce sellers. Whether you're just
                  starting or already selling and want to grow, we have a course tailored for your level.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-gray-50 rounded-lg px-6">
                <AccordionTrigger className="text-left">What marketplaces are covered in the courses?</AccordionTrigger>
                <AccordionContent>
                  We cover {course.marketplaces.join(", ")} depending on the course level you choose.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-gray-50 rounded-lg px-6">
                <AccordionTrigger className="text-left">Are these live sessions or recorded videos?</AccordionTrigger>
                <AccordionContent>
                  All courses are conducted through live training sessions with industry experts. This allows for
                  real-time interaction, doubt solving, and practical learning.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-gray-50 rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Can I really manage my eCommerce business without any agency after this course?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, that's our goal! After completing the course, you'll have the skills and confidence to run your
                  eCommerce business independently, without relying on costly agencies.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-gray-50 rounded-lg px-6">
                <AccordionTrigger className="text-left">What if I miss a live session?</AccordionTrigger>
                <AccordionContent>
                  If you miss a session, you'll get limited-time access to the session recording, so you don't fall
                  behind. However, we encourage attending live sessions for best results and real-time interaction.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 opacity-90">Join hundreds of successful sellers who started with {course.name}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
              <Link href={`/checkout?course=${slug}`}>Enroll Now - {course.fee}</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 text-black border-white hover:bg-white hover:text-blue-600"
            >
               <Link href="/inquiry">Enquiry</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
