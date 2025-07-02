"use client"

import { Button } from "@/components/ui/button"

export default function ResetEntranceForm() {
  const handleReset = () => {
    localStorage.removeItem("entranceFormCompleted")
    window.location.reload()
  }

  return (
    <Button variant="outline" onClick={handleReset} size="sm">
      Reset Entrance Form
    </Button>
  )
}
