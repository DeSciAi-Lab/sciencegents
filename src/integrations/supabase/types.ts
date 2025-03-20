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
      capabilities: {
        Row: {
          created_at: string
          creator: string
          description: string
          docs: string | null
          domain: string
          features: string[] | null
          id: string
          last_synced_at: string
          name: string
          price: number
          rating: number | null
          revenue: number | null
          usage_count: number | null
        }
        Insert: {
          created_at?: string
          creator: string
          description: string
          docs?: string | null
          domain: string
          features?: string[] | null
          id: string
          last_synced_at?: string
          name: string
          price: number
          rating?: number | null
          revenue?: number | null
          usage_count?: number | null
        }
        Update: {
          created_at?: string
          creator?: string
          description?: string
          docs?: string | null
          domain?: string
          features?: string[] | null
          id?: string
          last_synced_at?: string
          name?: string
          price?: number
          rating?: number | null
          revenue?: number | null
          usage_count?: number | null
        }
        Relationships: []
      }
      sciencegent_capabilities: {
        Row: {
          added_at: string | null
          capability_id: string
          id: string
          sciencegent_address: string
        }
        Insert: {
          added_at?: string | null
          capability_id: string
          id?: string
          sciencegent_address: string
        }
        Update: {
          added_at?: string | null
          capability_id?: string
          id?: string
          sciencegent_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "sciencegent_capabilities_capability_id_fkey"
            columns: ["capability_id"]
            isOneToOne: false
            referencedRelation: "capabilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sciencegent_capabilities_sciencegent_address_fkey"
            columns: ["sciencegent_address"]
            isOneToOne: false
            referencedRelation: "sciencegents"
            referencedColumns: ["address"]
          },
        ]
      }
      sciencegent_stats: {
        Row: {
          holders: number | null
          id: string
          sciencegent_address: string
          transactions: number | null
          updated_at: string | null
          volume_24h: number | null
        }
        Insert: {
          holders?: number | null
          id?: string
          sciencegent_address: string
          transactions?: number | null
          updated_at?: string | null
          volume_24h?: number | null
        }
        Update: {
          holders?: number | null
          id?: string
          sciencegent_address?: string
          transactions?: number | null
          updated_at?: string | null
          volume_24h?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sciencegent_stats_sciencegent_address_fkey"
            columns: ["sciencegent_address"]
            isOneToOne: false
            referencedRelation: "sciencegents"
            referencedColumns: ["address"]
          },
        ]
      }
      sciencegents: {
        Row: {
          address: string
          created_at: string | null
          created_on_chain_at: string | null
          creator_address: string | null
          description: string | null
          domain: string | null
          id: string
          is_migrated: boolean | null
          last_synced_at: string | null
          market_cap: number | null
          maturity_progress: number | null
          name: string
          price_change_24h: number | null
          profile_pic: string | null
          socials: Json | null
          symbol: string
          token_price: number | null
          total_liquidity: number | null
          total_supply: number | null
          updated_at: string | null
          virtual_eth: number | null
          website: string | null
        }
        Insert: {
          address: string
          created_at?: string | null
          created_on_chain_at?: string | null
          creator_address?: string | null
          description?: string | null
          domain?: string | null
          id?: string
          is_migrated?: boolean | null
          last_synced_at?: string | null
          market_cap?: number | null
          maturity_progress?: number | null
          name: string
          price_change_24h?: number | null
          profile_pic?: string | null
          socials?: Json | null
          symbol: string
          token_price?: number | null
          total_liquidity?: number | null
          total_supply?: number | null
          updated_at?: string | null
          virtual_eth?: number | null
          website?: string | null
        }
        Update: {
          address?: string
          created_at?: string | null
          created_on_chain_at?: string | null
          creator_address?: string | null
          description?: string | null
          domain?: string | null
          id?: string
          is_migrated?: boolean | null
          last_synced_at?: string | null
          market_cap?: number | null
          maturity_progress?: number | null
          name?: string
          price_change_24h?: number | null
          profile_pic?: string | null
          socials?: Json | null
          symbol?: string
          token_price?: number | null
          total_liquidity?: number | null
          total_supply?: number | null
          updated_at?: string | null
          virtual_eth?: number | null
          website?: string | null
        }
        Relationships: []
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
