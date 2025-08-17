"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: number
  email: string
  role: "guest" | "user" | "admin"
  name: string
  phone?: string
  address?: string
  created_at: string
}

interface AuthGuardProps {
  children: React.ReactNode
  requiredRole?: "user" | "admin"
  redirectTo?: string
  allowedRoles?: ("guest" | "user" | "admin")[]
}

export function AuthGuard({ children, requiredRole, redirectTo = "/auth/login", allowedRoles }: AuthGuardProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")

    if (!userData) {
      router.push(redirectTo)
      return
    }

    const parsedUser = JSON.parse(userData)

    if (requiredRole) {
      const hasAccess =
        parsedUser.role === requiredRole ||
        (requiredRole === "user" && parsedUser.role === "admin") ||
        (requiredRole === "admin" && parsedUser.role === "admin")

      if (!hasAccess) {
        router.push("/")
        return
      }
    }

    if (allowedRoles && !allowedRoles.includes(parsedUser.role)) {
      router.push("/")
      return
    }

    setUser(parsedUser)
    setIsLoading(false)
  }, [requiredRole, redirectTo, router, allowedRoles])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Загрузка...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const login = (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
  }

  const updateUser = (updatedData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updatedData }
      localStorage.setItem("user", JSON.stringify(updatedUser))
      setUser(updatedUser)
    }
  }

  return { user, login, logout, updateUser }
}
