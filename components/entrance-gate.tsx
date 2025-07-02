"use client"

import type React from "react"

import { useState, useEffect } from "react"
import EntranceForm from "@/components/entrance-form"

interface EntranceGateProps {
  children: React.ReactNode
}

export default function EntranceGate({ children }: EntranceGateProps) {
  const [isFormCompleted, setIsFormCompleted] = useState<boolean>(true) // Default to true to prevent flash
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [showForm, setShowForm] = useState<boolean>(false) // New state to control form display after delay

  useEffect(() => {
    // Check if the user has already completed the entrance form
    const hasCompletedForm = localStorage.getItem("entranceFormCompleted") === "true"
    setIsFormCompleted(hasCompletedForm)
    setIsLoading(false)

    // Set a timeout to show the form after 5 seconds if not completed
    if (!hasCompletedForm) {
      const timer = setTimeout(() => {
        setShowForm(true)
      }, 5000) // 5 seconds delay

      // Clean up the timeout if the component unmounts
      return () => clearTimeout(timer)
    }
  }, [])

  const handleFormComplete = () => {
    setIsFormCompleted(true)
  }

  if (isLoading) {
    // Show a loading state while checking localStorage
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Only show the form if it's not completed AND the delay has passed
  if (!isFormCompleted && showForm) {
    return (
      <div className="fixed inset-0 bg-black/10 backdrop-blur-xl flex items-center justify-center z-50 p-4">
        <div className="w-full max-w-md max-h-full overflow-y-auto">
          <EntranceForm onComplete={handleFormComplete} />
        </div>
      </div>
    )
  }

  return <>{children}</>
}
