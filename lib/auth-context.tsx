"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import { signIn, signUp, signOut, updateUserProfile } from "@/lib/actions/auth"
import type { User } from "@supabase/supabase-js"

interface Profile {
  id: string
  email: string
  full_name: string
  role: "guest" | "user" | "admin"
  phone?: string
  address?: string
}

interface AuthContextType {
  user: User | null
  profile: Profile | null
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => Promise<void>
  updateProfile: (data: Partial<Profile>) => Promise<boolean>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setUser(user)

        if (user) {
          // Получение профиля пользователя
          const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

          if (profile) {
            setProfile(profile)
          }
        }
      } catch (error) {
        console.error("Error getting user:", error)
      } finally {
        setIsLoading(false)
      }
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)

      if (session?.user) {
        const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

        if (profile) {
          setProfile(profile)
        }
      } else {
        setProfile(null)
      }

      setIsLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append("email", email)
      formData.append("password", password)

      const result = await signIn(formData)

      if (!result?.error) {
        toast({
          title: "Успешный вход",
          description: `Добро пожаловать!`,
        })
        return true
      } else {
        toast({
          title: "Ошибка входа",
          description: result.error || "Неверные учетные данные",
          variant: "destructive",
        })
        return false
      }
    } catch (error) {
      toast({
        title: "Ошибка сети",
        description: error instanceof Error ? error.message : "Не удалось подключиться к серверу",
        variant: "destructive",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append("email", email)
      formData.append("password", password)
      formData.append("fullName", name)

      const result = await signUp(formData)

      if (result.success) {
        toast({
          title: "Регистрация успешна",
          description: result.message || "Проверьте email для подтверждения аккаунта",
        })
        return true
      } else {
        toast({
          title: "Ошибка регистрации",
          description: result.error || "Не удалось создать аккаунт",
          variant: "destructive",
        })
        return false
      }
    } catch (error) {
      toast({
        title: "Ошибка сети",
        description: error instanceof Error ? error.message : "Не удалось подключиться к серверу",
        variant: "destructive",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await signOut()
      toast({
        title: "Выход выполнен",
        description: "До свидания!",
      })
    } catch (error) {
      toast({
        title: "Ошибка выхода",
        description: "Не удалось выйти из системы",
        variant: "destructive",
      })
    }
  }

  const updateProfile = async (data: Partial<Profile>): Promise<boolean> => {
    if (!user || !profile) return false

    setIsLoading(true)
    try {
      const result = await updateUserProfile(profile.id, data)

      if (result.success && result.profile) {
        setProfile(result.profile)
        toast({
          title: "Профиль обновлен",
          description: "Изменения сохранены успешно",
        })
        return true
      } else {
        toast({
          title: "Ошибка обновления",
          description: result.error || "Не удалось обновить профиль",
          variant: "destructive",
        })
        return false
      }
    } catch (error) {
      toast({
        title: "Ошибка сети",
        description: error instanceof Error ? error.message : "Не удалось подключиться к серверу",
        variant: "destructive",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        login,
        register,
        logout,
        updateProfile,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
