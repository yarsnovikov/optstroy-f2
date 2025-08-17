"use server"

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

export async function createOrder(formData: FormData) {
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

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const customerName = formData.get("customerName") as string
  const customerEmail = formData.get("customerEmail") as string
  const customerPhone = formData.get("customerPhone") as string
  const shippingAddress = formData.get("shippingAddress") as string
  const items = JSON.parse(formData.get("items") as string)
  const totalAmount = Number.parseFloat(formData.get("totalAmount") as string)
  const promoCode = (formData.get("promoCode") as string) || null

  // Start transaction
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user?.id || null,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      shipping_address: shippingAddress,
      total_amount: totalAmount,
      promo_code: promoCode,
      status: "pending",
      payment_status: "pending",
      items: items,
    })
    .select()
    .single()

  if (orderError) {
    console.error("Error creating order:", orderError)
    return { order: null, error: orderError.message }
  }

  // Update product stock quantities
  for (const item of items) {
    const { error: stockError } = await supabase.rpc("decrease_product_stock", {
      product_id: item.id,
      quantity: item.quantity,
    })

    if (stockError) {
      console.error("Error updating stock:", stockError)
      // Could implement rollback logic here
    }
  }

  // Update promo code usage if used
  if (promoCode) {
    await supabase.rpc("increment_promo_usage", {
      code: promoCode,
    })
  }

  revalidatePath("/admin/orders")
  return { order, error: null }
}

export async function getOrders(userId?: string) {
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

  let query = supabase.from("orders").select("*").order("created_at", { ascending: false })

  if (userId) {
    query = query.eq("user_id", userId)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching orders:", error)
    return { orders: [], error: error.message }
  }

  return { orders: data || [], error: null }
}

export async function getOrderById(id: string) {
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

  const { data, error } = await supabase.from("orders").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching order:", error)
    return { order: null, error: error.message }
  }

  return { order: data, error: null }
}

export async function updateOrderStatus(id: string, status: string, paymentStatus?: string) {
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

  const updateData: any = {
    status,
    updated_at: new Date().toISOString(),
  }

  if (paymentStatus) {
    updateData.payment_status = paymentStatus
  }

  const { data, error } = await supabase.from("orders").update(updateData).eq("id", id).select().single()

  if (error) {
    console.error("Error updating order:", error)
    return { order: null, error: error.message }
  }

  revalidatePath("/admin/orders")
  return { order: data, error: null }
}
