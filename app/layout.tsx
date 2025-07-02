import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { NotificationProvider } from "@/contexts/notification-context"
import LayoutClient from "@/components/LayoutClient"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ECommerce Course Site",
  description: "Learn and grow with our comprehensive courses",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NotificationProvider>
          <LayoutClient>
          {children}
          </LayoutClient >
        </NotificationProvider>
      </body>
    </html>
  )
}
