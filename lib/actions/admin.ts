"use server"

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

export async function getAdminStats() {
  const cookieStore = await cookies()
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        cookieStore.set({ name, value, ...options })
      },
      remove(name: string, options: any) {
        cookieStore.set({ name, value: "", ...options })
      },
    },
  })

  // Get total products
  const { count: totalProducts } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })
    .eq("is_active", true)

  // Get total orders
  const { count: totalOrders } = await supabase.from("orders").select("*", { count: "exact", head: true })

  // Get total users
  const { count: totalUsers } = await supabase.from("profiles").select("*", { count: "exact", head: true })

  // Get total revenue
  const { data: revenueData } = await supabase.from("orders").select("total_amount").eq("payment_status", "completed")

  const totalRevenue = revenueData?.reduce((sum, order) => sum + order.total_amount, 0) || 0

  // Get recent orders
  const { data: recentOrders } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5)

  // Get low stock products
  const { data: lowStockProducts } = await supabase
    .from("products")
    .select("*")
    .lt("stock_quantity", 10)
    .eq("is_active", true)
    .limit(5)

  return {
    totalProducts: totalProducts || 0,
    totalOrders: totalOrders || 0,
    totalUsers: totalUsers || 0,
    totalRevenue,
    recentOrders: recentOrders || [],
    lowStockProducts: lowStockProducts || [],
  }
}

export async function getCategories() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: "", ...options })
        },
      },
    },
  )

  const { data, error } = await supabase.from("categories").select("*").eq("is_active", true).order("name")

  if (error) {
    console.error("Error fetching categories:", error)
    return { categories: [], error: error.message }
  }

  return { categories: data || [], error: null }
}

export async function createCategory(formData: FormData) {
  const cookieStore = await cookies()
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        cookieStore.set({ name, value, ...options })
      },
      remove(name: string, options: any) {
        cookieStore.set({ name, value: "", ...options })
      },
    },
  })

  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const image = formData.get("image") as string

  // Generate slug from name
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

  const { data, error } = await supabase
    .from("categories")
    .insert({
      name,
      slug,
      description,
      image,
      is_active: true,
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating category:", error)
    return { category: null, error: error.message }
  }

  revalidatePath("/admin/categories")
  return { category: data, error: null }
}

export async function getPromocodes() {
  const cookieStore = await cookies()
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        cookieStore.set({ name, value, ...options })
      },
      remove(name: string, options: any) {
        cookieStore.set({ name, value: "", ...options })
      },
    },
  })

  const { data, error } = await supabase.from("promocodes").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching promocodes:", error)
    return { promocodes: [], error: error.message }
  }

  return { promocodes: data || [], error: null }
}

export async function validatePromocode(code: string, orderAmount: number) {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: "", ...options })
        },
      },
    },
  )

  const { data, error } = await supabase
    .from("promocodes")
    .select("*")
    .eq("code", code.toUpperCase())
    .eq("is_active", true)
    .single()

  if (error || !data) {
    return { valid: false, error: "Промокод не найден" }
  }

  const now = new Date()
  const validFrom = new Date(data.valid_from)
  const validUntil = new Date(data.valid_until)

  if (now < validFrom || now > validUntil) {
    return { valid: false, error: "Промокод истек" }
  }

  if (data.usage_limit && data.usage_count >= data.usage_limit) {
    return { valid: false, error: "Промокод исчерпан" }
  }

  if (data.min_order_amount && orderAmount < data.min_order_amount) {
    return { valid: false, error: `Минимальная сумма заказа: ${data.min_order_amount} руб.` }
  }

  return { valid: true, promocode: data, error: null }
}
