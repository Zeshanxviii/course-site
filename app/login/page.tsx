"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useActionState } from "react"

// Mock login function (replace with actual implementation or import)

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [signupState, signupAction] = useActionState(signup, { message: "", success: false })
  const [loginState, loginAction] = useActionState(login, { message: "", success: false })

  function login(state: { message: string; success: boolean }): { message: string; success: boolean } | Promise<{ message: string; success: boolean }> {
    throw new Error("Function not implemented.")
  }
  function signup(state: { message: string; success: boolean }): { message: string; success: boolean } | Promise<{ message: string; success: boolean }> {
    throw new Error("Function not implemented.")
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              {isLogin ? "Sign in to your account" : "Create your account"}
            </CardTitle>
            <CardDescription className="text-center">
              {isLogin ? "Enter your email and password to sign in" : "Enter your information to create an account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLogin ? (
              <form action={loginAction} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input id="login-email" name="email" type="email" placeholder="john@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input id="login-password" name="password" type="password" required />
                </div>
                {loginState.message && (
                  <Alert variant={loginState.success ? "default" : "destructive"}>
                    <AlertDescription>{loginState.message}</AlertDescription>
                  </Alert>
                )}
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </form>
            ) : (
              <form action={signupAction} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input id="signup-name" name="name" type="text" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input id="signup-email" name="email" type="email" placeholder="john@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    name="password"
                    type="password"
                    placeholder="Minimum 6 characters"
                    required
                  />
                </div>
                {signupState.message && (
                  <Alert variant={signupState.success ? "default" : "destructive"}>
                    <AlertDescription>{signupState.message}</AlertDescription>
                  </Alert>
                )}
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </form>
            )}

            <div className="mt-6 text-center">
              <Button variant="link" onClick={() => setIsLogin(!isLogin)} className="text-sm">
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


