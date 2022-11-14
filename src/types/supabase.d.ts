export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      page: {
        Row: {
          id: number
          url: string
          created_at: string
          read_at: string | null
          image_id: string
        }
        Insert: {
          id?: number
          url?: string
          created_at?: string
          read_at?: string | null
          image_id?: string
        }
        Update: {
          id?: number
          url?: string
          created_at?: string
          read_at?: string | null
          image_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
