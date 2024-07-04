export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      addresses: {
        Row: {
          city: string
          created_at: string
          fts: unknown | null
          house_number: string
          id: number
          secondary_address: string | null
          state: string
          street_name: string
          zip: string
          address_line1: string | null
        }
        Insert: {
          city: string
          created_at?: string
          fts?: unknown | null
          house_number: string
          id?: number
          secondary_address?: string | null
          state: string
          street_name: string
          zip: string
        }
        Update: {
          city?: string
          created_at?: string
          fts?: unknown | null
          house_number?: string
          id?: number
          secondary_address?: string | null
          state?: string
          street_name?: string
          zip?: string
        }
        Relationships: []
      }
      block_image: {
        Row: {
          block_id: number
          id: number
          image_id: number
        }
        Insert: {
          block_id: number
          id?: number
          image_id: number
        }
        Update: {
          block_id?: number
          id?: number
          image_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "block_image_block_id_fkey"
            columns: ["block_id"]
            isOneToOne: false
            referencedRelation: "blocks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "block_image_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "images"
            referencedColumns: ["id"]
          },
        ]
      }
      block_text: {
        Row: {
          block_id: number
          id: number
          text_id: number
        }
        Insert: {
          block_id: number
          id?: number
          text_id: number
        }
        Update: {
          block_id?: number
          id?: number
          text_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "block_text_block_id_fkey"
            columns: ["block_id"]
            isOneToOne: false
            referencedRelation: "blocks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "block_text_text_id_fkey"
            columns: ["text_id"]
            isOneToOne: false
            referencedRelation: "text"
            referencedColumns: ["id"]
          },
        ]
      }
      blocks: {
        Row: {
          created_at: string
          id: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      business: {
        Row: {
          created_at: string
          id: number
          mailing_address: number
          name: string
          primary_address: number
          primary_contact: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          mailing_address: number
          name: string
          primary_address: number
          primary_contact?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          mailing_address?: number
          name?: string
          primary_address?: number
          primary_contact?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_mailing_address_fkey"
            columns: ["mailing_address"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_primary_address_fkey"
            columns: ["primary_address"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_primary_contact_fkey"
            columns: ["primary_contact"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      business_address: {
        Row: {
          address_id: number
          business_id: number
          created_at: string
          id: number
          location: string
        }
        Insert: {
          address_id: number
          business_id: number
          created_at?: string
          id?: number
          location: string
        }
        Update: {
          address_id?: number
          business_id?: number
          created_at?: string
          id?: number
          location?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_address_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_address_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          business_id: number | null
          created_at: string
          email: string | null
          id: string
          name: string
          phone: string | null
        }
        Insert: {
          business_id?: number | null
          created_at?: string
          email?: string | null
          id?: string
          name: string
          phone?: string | null
        }
        Update: {
          business_id?: number | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contacts_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business"
            referencedColumns: ["id"]
          },
        ]
      }
      images: {
        Row: {
          created_at: string
          file_name: string
          file_path: string
          id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          file_name: string
          file_path: string
          id?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          file_name?: string
          file_path?: string
          id?: number
          updated_at?: string
        }
        Relationships: []
      }
      likes: {
        Row: {
          created_at: string
          id: number
          tweet_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          tweet_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          tweet_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_tweet_id_fkey"
            columns: ["tweet_id"]
            isOneToOne: false
            referencedRelation: "tweets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      page_section: {
        Row: {
          id: number
          page_id: number
          section_id: number
        }
        Insert: {
          id?: number
          page_id: number
          section_id: number
        }
        Update: {
          id?: number
          page_id?: number
          section_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "page_section_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "page_section_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
        ]
      }
      pages: {
        Row: {
          created_at: string
          id: number
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      product_variants: {
        Row: {
          created_at: string
          id: number
          image: string | null
          price: number
          product_id: string
          title: string
        }
        Insert: {
          created_at?: string
          id?: number
          image?: string | null
          price: number
          product_id: string
          title: string
        }
        Update: {
          created_at?: string
          id?: number
          image?: string | null
          price?: number
          product_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          created_at: string
          description: string | null
          featured_image: string | null
          id: string
          tagline: string | null
          title: string
          title_slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          featured_image?: string | null
          id?: string
          tagline?: string | null
          title: string
          title_slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          featured_image?: string | null
          id?: string
          tagline?: string | null
          title?: string
          title_slug?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string
          id: string
          username: string
          website: string | null
        }
        Insert: {
          avatar_url: string
          id: string
          username: string
          website?: string | null
        }
        Update: {
          avatar_url?: string
          id?: string
          username?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      section_block: {
        Row: {
          block_id: number
          id: number
          section_id: number
        }
        Insert: {
          block_id: number
          id?: number
          section_id: number
        }
        Update: {
          block_id?: number
          id?: number
          section_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "section_block_block_id_fkey"
            columns: ["block_id"]
            isOneToOne: false
            referencedRelation: "blocks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "section_block_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
        ]
      }
      sections: {
        Row: {
          created_at: string
          id: number
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      text: {
        Row: {
          created_at: string
          id: number
          type: string
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          id?: number
          type: string
          updated_at?: string
          value: string
        }
        Update: {
          created_at?: string
          id?: number
          type?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      tickets: {
        Row: {
          category: string
          created_at: string
          description: string
          id: number
          priority: number
          progress: number
          status: string
          title: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          id?: number
          priority: number
          progress: number
          status: string
          title: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          id?: number
          priority?: number
          progress?: number
          status?: string
          title?: string
        }
        Relationships: []
      }
      tweet_image: {
        Row: {
          created_at: string
          file_name: string
          height: number
          id: number
          url: string
          width: number
        }
        Insert: {
          created_at?: string
          file_name: string
          height: number
          id?: number
          url: string
          width: number
        }
        Update: {
          created_at?: string
          file_name?: string
          height?: number
          id?: number
          url?: string
          width?: number
        }
        Relationships: []
      }
      tweets: {
        Row: {
          created_at: string
          id: string
          image_id: number | null
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_id?: number | null
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          image_id?: number | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tweets_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "tweet_image"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tweets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      address_line1: {
        Args: {
          "": unknown
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
