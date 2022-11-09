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
        }
        Insert: {
          id?: number
          url?: string
          created_at?: string
          read_at?: string | null
        }
        Update: {
          id?: number
          url?: string
          created_at?: string
          read_at?: string | null
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
