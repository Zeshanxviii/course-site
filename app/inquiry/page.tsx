"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, ArrowRight, CheckCircle, Phone, Mail, MessageSquare, AlertCircle, Lock } from "lucide-react"
import OtpInput from "@/components/otp-input"

// Form steps
enum FormStep {
  INQUIRY = 0,
  PHONE_VERIFICATION = 1,
  SUCCESS = 2,
}

// Form data interface
interface InquiryFormData {
  name: string
  email: string
  phone: string
  interestedIn: string
  message: string
  experience: string
}

// Form errors interface
interface FormErrors {
  [key: string]: string
}

export default function InquiryPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.INQUIRY)
  const [formData, setFormData] = useState<InquiryFormData>({
    name: "",
    email: "",
    phone: "",
    interestedIn: "starter-track",
    message: "",
    experience: "beginner",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [otp, setOtp] = useState<string>("")
  const [otpSent, setOtpSent] = useState<boolean>(false)
  const [otpError, setOtpError] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [resendDisabled, setResendDisabled] = useState<boolean>(false)
  const [resendCountdown, setResendCountdown] = useState<number>(0)

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Required field validation
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formData.message.trim()) newErrors.message = "Message is required"

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Phone validation
    const phoneRegex = /^[6-9]\d{9}$/
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Move to phone verification step
    setCurrentStep(FormStep.PHONE_VERIFICATION)
    sendOtp()
  }

  // Send OTP
  const sendOtp = () => {
    setIsSubmitting(true)
    setOtpError("")

    // Simulate OTP sending
    setTimeout(() => {
      setOtpSent(true)
      setIsSubmitting(false)
      // For demo purposes, we'll use a fixed OTP
      console.log("OTP sent: 123456")

      // Start resend countdown
      setResendDisabled(true)
      setResendCountdown(30)
      const countdownInterval = setInterval(() => {
        setResendCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval)
            setResendDisabled(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }, 1500)
  }

  // Verify OTP
  const verifyOtp = () => {
    setIsSubmitting(true)
    setOtpError("")

    // Simulate OTP verification
    setTimeout(() => {
      // For demo purposes, we'll accept "123456" as the correct OTP
      if (otp === "123456") {
        // OTP is correct, submit the form
        submitForm()
      } else {
        // OTP is incorrect
        setOtpError("Invalid OTP. Please try again.")
        setIsSubmitting(false)
      }
    }, 1500)
  }

  // Submit form after OTP verification
  const submitForm = () => {
    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData)
      setCurrentStep(FormStep.SUCCESS)
      setIsSubmitting(false)
    }, 1000)
  }

  // Handle OTP change
  const handleOtpChange = (value: string) => {
    setOtp(value)
    if (otpError) {
      setOtpError("")
    }
  }

  // Render form based on current step
  const renderForm = () => {
    switch (currentStep) {
      case FormStep.INQUIRY:
        return (
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-2xl">Inquiry Form</CardTitle>
              <CardDescription>
                Fill out this form to get more information about our courses. We'll get back to you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Personal Information</h3>

                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="10-digit mobile number"
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                  <p className="text-xs text-gray-500">
                    We'll send a verification code to this number before submitting your inquiry.
                  </p>
                </div>
              </div>

              <Separator />

              {/* Course Interest */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Course Interest</h3>

                <div className="space-y-2">
                  <Label htmlFor="interestedIn">I'm interested in *</Label>
                  <RadioGroup
                    defaultValue={formData.interestedIn}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, interestedIn: value }))}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="starter-track" id="starter-track" />
                      <Label htmlFor="starter-track" className="cursor-pointer">
                        Starter Track (₹5,999)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="growth-track" id="growth-track" />
                      <Label htmlFor="growth-track" className="cursor-pointer">
                        Growth Track (₹9,999)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pro-track" id="pro-track" />
                      <Label htmlFor="pro-track" className="cursor-pointer">
                        Pro Track (₹15,999)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="not-sure" id="not-sure" />
                      <Label htmlFor="not-sure" className="cursor-pointer">
                        Not sure yet
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Your eCommerce Experience</Label>
                  <RadioGroup
                    defaultValue={formData.experience}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, experience: value }))}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="beginner" id="beginner" />
                      <Label htmlFor="beginner" className="cursor-pointer">
                        Complete Beginner
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="some-knowledge" id="some-knowledge" />
                      <Label htmlFor="some-knowledge" className="cursor-pointer">
                        Some Knowledge
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="currently-selling" id="currently-selling" />
                      <Label htmlFor="currently-selling" className="cursor-pointer">
                        Currently Selling
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="experienced" id="experienced" />
                      <Label htmlFor="experienced" className="cursor-pointer">
                        Experienced Seller
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Your Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your eCommerce goals and any specific questions you have"
                    rows={4}
                    className={errors.message ? "border-red-500" : ""}
                  />
                  {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" size="lg">
                <MessageSquare className="mr-2 h-4 w-4" />
                Continue to Phone Verification
              </Button>
              <p className="text-xs text-center text-gray-500">
                By submitting this form, you agree to our{" "}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </CardFooter>
          </form>
        )

      case FormStep.PHONE_VERIFICATION:
        return (
          <>
            <CardHeader>
              <CardTitle className="text-2xl">Verify Your Phone Number</CardTitle>
              <CardDescription>
                We've sent a 6-digit verification code to {formData.phone}. Please enter it below.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-blue-50 rounded-full p-4">
                  <Phone className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-center">
                  Enter the 6-digit code sent to <span className="font-semibold">{formData.phone}</span>
                </p>

                <OtpInput length={6} value={otp} onChange={handleOtpChange} />

                {otpError && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{otpError}</AlertDescription>
                  </Alert>
                )}

                {otpSent && (
                  <div className="text-sm text-gray-600 flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    OTP sent successfully
                  </div>
                )}

                <div className="text-sm text-gray-600">
                  {resendDisabled ? (
                    <p>Resend code in {resendCountdown} seconds</p>
                  ) : (
                    <button
                      type="button"
                      onClick={sendOtp}
                      className="text-blue-600 hover:underline"
                      disabled={isSubmitting}
                    >
                      Resend verification code
                    </button>
                  )}
                </div>
              </div>

              <Alert>
                <Lock className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  For demo purposes, use <span className="font-semibold">123456</span> as the OTP.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="flex flex-col sm:flex-row w-full gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(FormStep.INQUIRY)}
                  className="sm:w-1/2"
                  disabled={isSubmitting}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={verifyOtp}
                  className="sm:w-1/2"
                  disabled={otp.length !== 6 || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify & Submit
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </CardFooter>
          </>
        )

      case FormStep.SUCCESS:
        return (
          <>
            <CardHeader>
              <div className="flex flex-col items-center">
                <div className="bg-green-100 rounded-full p-4 mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-center">Inquiry Submitted Successfully!</CardTitle>
                <CardDescription className="text-center mt-2">
                  Thank you for your interest in our courses. Our team will contact you shortly.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold">What happens next?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-100 rounded-full p-1 mt-0.5">
                      <Phone className="h-4 w-4 text-blue-600" />
                    </div>
                    <p className="text-sm">
                      Our course advisor will call you within 24 hours to discuss your requirements.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-100 rounded-full p-1 mt-0.5">
                      <Mail className="h-4 w-4 text-blue-600" />
                    </div>
                    <p className="text-sm">
                      You'll receive an email with course details and a free demo session invitation.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-100 rounded-full p-1 mt-0.5">
                      <MessageSquare className="h-4 w-4 text-blue-600" />
                    </div>
                    <p className="text-sm">We'll add you to our WhatsApp group for quick updates and support.</p>
                  </li>
                </ul>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Inquiry Reference ID</p>
                <Badge variant="outline" className="text-lg px-4 py-2">
                  INQ-{Math.floor(100000 + Math.random() * 900000)}
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="flex flex-col sm:flex-row w-full gap-4">
                <Button type="button" onClick={() => router.push("/")} className="sm:w-1/2">
                  Back to Home
                </Button>
                <Button type="button" variant="outline" onClick={() => router.push("/courses")} className="sm:w-1/2">
                  Explore Courses
                </Button>
              </div>
            </CardFooter>
          </>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <Link href="/" className="text-blue-600 hover:underline flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <Card className="shadow-lg">{renderForm()}</Card>

          {currentStep === FormStep.INQUIRY && (
            <div className="mt-8 bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <Phone className="mr-2 h-5 w-5 text-blue-600" />
                Need immediate assistance?
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Call us directly</p>
                  <p className="text-sm text-gray-600">+91 90123456789</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Email us</p>
                  <p className="text-sm text-gray-600">support@path2ecom.com</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
