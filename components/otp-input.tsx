"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"

interface OtpInputProps {
  length: number
  value: string
  onChange: (value: string) => void
}

const OtpInput: React.FC<OtpInputProps> = ({ length, value, onChange }) => {
  const [otp, setOtp] = useState<string[]>(value.split("").concat(Array(length - value.length).fill("")))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    // Initialize refs array
    inputRefs.current = inputRefs.current.slice(0, length)
  }, [length])

  useEffect(() => {
    // Update OTP state when value prop changes
    if (value !== otp.join("")) {
      setOtp(value.split("").concat(Array(length - value.length).fill("")))
    }
  }, [value, length, otp])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = e.target.value

    // Only allow one digit
    if (newValue.length > 1) {
      return
    }

    // Only allow numbers
    if (newValue && !/^\d+$/.test(newValue)) {
      return
    }

    // Update the OTP array
    const newOtp = [...otp]
    newOtp[index] = newValue
    setOtp(newOtp)

    // Call the onChange callback
    onChange(newOtp.join(""))

    // Move to next input if current input is filled
    if (newValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }

    // Handle arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault()
      inputRefs.current[index - 1]?.focus()
    }

    if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault()
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    // Only allow pasting numbers
    if (!/^\d+$/.test(pastedData)) {
      return
    }

    // Take only the required number of digits
    const digits = pastedData.slice(0, length).split("")
    const newOtp = [...Array(length).fill("")]

    digits.forEach((digit, index) => {
      newOtp[index] = digit
    })

    setOtp(newOtp)
    onChange(newOtp.join(""))

    // Focus the next empty input or the last input
    const nextEmptyIndex = newOtp.findIndex((val) => !val)
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus()
    } else {
      inputRefs.current[length - 1]?.focus()
    }
  }

  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length }, (_, index) => (
        <Input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={otp[index] || ""}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={index === 0 ? handlePaste : undefined}
          className="w-12 h-12 text-center text-xl font-semibold"
          autoComplete="one-time-code"
        />
      ))}
    </div>
  )
}

export default OtpInput
