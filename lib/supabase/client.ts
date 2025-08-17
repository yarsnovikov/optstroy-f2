import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

// Check if Supabase environment variables are available
export const isSupabaseConfigured =
  typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_URL.length > 0 &&
  typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 0

export const createClient = () => {
  if (!isSupabaseConfigured) {
    console.warn("Supabase environment variables are not set. Using dummy client.")
    return {
      auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: () =>
          Promise.resolve({ data: { user: null }, error: { message: "Supabase not configured" } }),
        signUp: () => Promise.resolve({ data: { user: null }, error: { message: "Supabase not configured" } }),
        signOut: () => Promise.resolve({ error: null }),
      },
      from: () => ({
        select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null, error: null }) }) }),
        insert: () => Promise.resolve({ data: null, error: null }),
        update: () => ({ eq: () => Promise.resolve({ data: null, error: null }) }),
        delete: () => ({ eq: () => Promise.resolve({ data: null, error: null }) }),
      }),
    } as any
  }

  return createClientComponentClient<Database>()
}

// Create a singleton instance of the Supabase client for Client Components
export const supabase = createClient()

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: "guest" | "user" | "admin"
          phone: string | null
          address: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: "guest" | "user" | "admin"
          phone?: string | null
          address?: string | null
        }
        Update: {
          full_name?: string | null
          role?: "guest" | "user" | "admin"
          phone?: string | null
          address?: string | null
        }
      }
      categories: {
        Row: {
          id: number
          name: string
          slug: string
          description: string | null
          image_url: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          name: string
          slug: string
          description?: string | null
          image_url?: string | null
          is_active?: boolean
        }
        Update: {
          name?: string
          slug?: string
          description?: string | null
          image_url?: string | null
          is_active?: boolean
        }
      }
      products: {
        Row: {
          id: number
          name: string
          slug: string
          description: string | null
          price: number
          old_price: number | null
          category_id: number | null
          images: string[]
          stock_quantity: number
          specifications: Record<string, any>
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          name: string
          slug: string
          description?: string | null
          price: number
          old_price?: number | null
          category_id?: number | null
          images?: string[]
          stock_quantity?: number
          specifications?: Record<string, any>
          is_active?: boolean
        }
        Update: {
          name?: string
          slug?: string
          description?: string | null
          price?: number
          old_price?: number | null
          category_id?: number | null
          images?: string[]
          stock_quantity?: number
          specifications?: Record<string, any>
          is_active?: boolean
        }
      }
      orders: {
        Row: {
          id: number
          user_id: string | null
          total_amount: number
          status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
          payment_status: "pending" | "paid" | "failed" | "refunded"
          shipping_address: Record<string, any>
          items: Record<string, any>
          promocode_id: number | null
          discount_amount: number
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id?: string | null
          total_amount: number
          status?: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
          payment_status?: "pending" | "paid" | "failed" | "refunded"
          shipping_address: Record<string, any>
          items: Record<string, any>
          promocode_id?: number | null
          discount_amount?: number
        }
        Update: {
          status?: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
          payment_status?: "pending" | "paid" | "failed" | "refunded"
          shipping_address?: Record<string, any>
          items?: Record<string, any>
          promocode_id?: number | null
          discount_amount?: number
        }
      }
      promocodes: {
        Row: {
          id: number
          code: string
          discount_type: "percentage" | "fixed"
          discount_value: number
          min_order_amount: number
          max_uses: number | null
          current_uses: number
          is_active: boolean
          expires_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          code: string
          discount_type: "percentage" | "fixed"
          discount_value: number
          min_order_amount?: number
          max_uses?: number | null
          current_uses?: number
          is_active?: boolean
          expires_at?: string | null
        }
        Update: {
          code?: string
          discount_type?: "percentage" | "fixed"
          discount_value?: number
          min_order_amount?: number
          max_uses?: number | null
          current_uses?: number
          is_active?: boolean
          expires_at?: string | null
        }
      }
      managers: {
        Row: {
          id: number
          full_name: string
          position: string
          phone: string
          whatsapp: string | null
          telegram: string | null
          email: string | null
          avatar_url: string | null
          specialization: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          full_name: string
          position: string
          phone: string
          whatsapp?: string | null
          telegram?: string | null
          email?: string | null
          avatar_url?: string | null
          specialization?: string | null
          is_active?: boolean
        }
        Update: {
          full_name?: string
          position?: string
          phone?: string
          whatsapp?: string | null
          telegram?: string | null
          email?: string | null
          avatar_url?: string | null
          specialization?: string | null
          is_active?: boolean
        }
      }
      reviews: {
        Row: {
          id: number
          product_id: number | null
          user_id: string | null
          rating: number | null
          comment: string | null
          created_at: string
        }
        Insert: {
          product_id?: number | null
          user_id?: string | null
          rating?: number | null
          comment?: string | null
        }
        Update: {
          product_id?: number | null
          user_id?: string | null
          rating?: number | null
          comment?: string | null
        }
      }
    }
  }
}
