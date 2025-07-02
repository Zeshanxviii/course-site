"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import OtpInput from "@/components/otp-input"
import { CheckCircle, Phone, AlertCircle, Lock, ArrowRight } from "lucide-react"

// Form steps
enum FormStep {
  INQUIRY = 0,
  PHONE_VERIFICATION = 1,
}

// Form data interface
interface EntranceFormData {
  name: string
  email: string
  phone: string
  interestedIn: string
  experience: string
}

// Form errors interface
interface FormErrors {
  [key: string]: string
}

interface EntranceFormProps {
  onComplete: () => void
}

export default function EntranceForm({ onComplete }: EntranceFormProps) {
  const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.INQUIRY)
  const [formData, setFormData] = useState<EntranceFormData>({
    name: "",
    email: "",
    phone: "",
    interestedIn: "starter-track",
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

      // Store in localStorage that the user has completed the entrance form
      localStorage.setItem("entranceFormCompleted", "true")

      // Call the onComplete callback
      onComplete()

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
          <form onSubmit={handleSubmit} className="space-y-6">
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
                We'll send a verification code to this number before granting access.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="interestedIn">I'm interested in</Label>
              <RadioGroup
                defaultValue={formData.interestedIn}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, interestedIn: value }))}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2"
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

            <Button type="submit" className="w-full" size="lg">
              Continue to Phone Verification
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        )

      case FormStep.PHONE_VERIFICATION:
        return (
          <div className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-blue-50 rounded-full p-4">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-center">Verify Your Phone Number</h3>
              <p className="text-center">
                We've sent a 6-digit verification code to <span className="font-semibold">{formData.phone}</span>
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

            <Button
              type="button"
              onClick={verifyOtp}
              className="w-full"
              size="lg"
              disabled={otp.length !== 6 || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Verifying...
                </>
              ) : (
                <>
                  Verify & Access Site
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        )
    }
  }

  return (
    <div className="max-w-md w-full mx-auto bg-white/95 backdrop-filter p-8 rounded-lg shadow-xl border border-gray-100">
      <div className="mb-6 text-center">
        <div className="bg-blue-600 text-white px-3 py-1 rounded font-bold text-lg inline-block mb-4">Path2Ecom</div>
        <h2 className="text-2xl font-bold">Welcome to Path2Ecom</h2>
        <p className="text-gray-600 mt-2">Please complete this quick form to access our site</p>
      </div>

      {renderForm()}
    </div>
  )
}
