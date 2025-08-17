"use server"

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

export async function getProducts(params?: {
  category?: string
  search?: string
  limit?: number
  offset?: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
}) {
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

  let query = supabase
    .from("products")
    .select(`
      *,
      categories (
        id,
        name,
        slug
      )
    `)
    .eq("is_active", true)

  if (params?.category) {
    query = query.eq("category_id", params.category)
  }

  if (params?.search) {
    query = query.or(`name.ilike.%${params.search}%,description.ilike.%${params.search}%`)
  }

  if (params?.sortBy) {
    query = query.order(params.sortBy, { ascending: params.sortOrder === "asc" })
  } else {
    query = query.order("created_at", { ascending: false })
  }

  if (params?.limit) {
    query = query.limit(params.limit)
  }

  if (params?.offset) {
    query = query.range(params.offset, params.offset + (params.limit || 10) - 1)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching products:", error)
    return { products: [], error: error.message }
  }

  return { products: data || [], error: null }
}

export async function getProductBySlug(slug: string) {
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
    .from("products")
    .select(`
      *,
      categories (
        id,
        name,
        slug
      ),
      reviews (
        id,
        rating,
        comment,
        created_at,
        profiles (
          full_name
        )
      )
    `)
    .eq("slug", slug)
    .eq("is_active", true)
    .single()

  if (error) {
    console.error("Error fetching product:", error)
    return { product: null, error: error.message }
  }

  return { product: data, error: null }
}

export async function createProduct(formData: FormData) {
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
  const price = Number.parseFloat(formData.get("price") as string)
  const oldPrice = formData.get("oldPrice") ? Number.parseFloat(formData.get("oldPrice") as string) : null
  const categoryId = formData.get("categoryId") as string
  const stockQuantity = Number.parseInt(formData.get("stockQuantity") as string)
  const specifications = JSON.parse((formData.get("specifications") as string) || "{}")
  const images = JSON.parse((formData.get("images") as string) || "[]")

  // Generate slug from name
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

  const { data, error } = await supabase
    .from("products")
    .insert({
      name,
      slug,
      description,
      price,
      old_price: oldPrice,
      category_id: categoryId,
      stock_quantity: stockQuantity,
      specifications,
      images,
      is_active: true,
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating product:", error)
    return { product: null, error: error.message }
  }

  revalidatePath("/admin/products")
  revalidatePath("/catalog")
  return { product: data, error: null }
}

export async function updateProduct(id: string, formData: FormData) {
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
  const price = Number.parseFloat(formData.get("price") as string)
  const oldPrice = formData.get("oldPrice") ? Number.parseFloat(formData.get("oldPrice") as string) : null
  const categoryId = formData.get("categoryId") as string
  const stockQuantity = Number.parseInt(formData.get("stockQuantity") as string)
  const specifications = JSON.parse((formData.get("specifications") as string) || "{}")
  const images = JSON.parse((formData.get("images") as string) || "[]")

  // Generate slug from name
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

  const { data, error } = await supabase
    .from("products")
    .update({
      name,
      slug,
      description,
      price,
      old_price: oldPrice,
      category_id: categoryId,
      stock_quantity: stockQuantity,
      specifications,
      images,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating product:", error)
    return { product: null, error: error.message }
  }

  revalidatePath("/admin/products")
  revalidatePath("/catalog")
  return { product: data, error: null }
}

export async function deleteProduct(id: string) {
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

  const { error } = await supabase.from("products").delete().eq("id", id)

  if (error) {
    console.error("Error deleting product:", error)
    return { error: error.message }
  }

  revalidatePath("/admin/products")
  revalidatePath("/catalog")
  return { error: null }
}
