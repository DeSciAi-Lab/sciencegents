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
          additional_files: Json | null
          created_at: string
          creator: string
          description: string
          detailed_description: string | null
          developer_profile_pic: string | null
          developer_social_links: Json | null
          display_image: string | null
          docs: string | null
          domain: string
          features: string[] | null
          id: string
          last_synced_at: string
          name: string
          price: number
          rating: number | null
          revenue: number | null
          social_links: Json | null
          usage_count: number | null
        }
        Insert: {
          additional_files?: Json | null
          created_at?: string
          creator: string
          description: string
          detailed_description?: string | null
          developer_profile_pic?: string | null
          developer_social_links?: Json | null
          display_image?: string | null
          docs?: string | null
          domain: string
          features?: string[] | null
          id: string
          last_synced_at?: string
          name: string
          price: number
          rating?: number | null
          revenue?: number | null
          social_links?: Json | null
          usage_count?: number | null
        }
        Update: {
          additional_files?: Json | null
          created_at?: string
          creator?: string
          description?: string
          detailed_description?: string | null
          developer_profile_pic?: string | null
          developer_social_links?: Json | null
          display_image?: string | null
          docs?: string | null
          domain?: string
          features?: string[] | null
          id?: string
          last_synced_at?: string
          name?: string
          price?: number
          rating?: number | null
          revenue?: number | null
          social_links?: Json | null
          usage_count?: number | null
        }
        Relationships: []
      }
      developer_profiles: {
        Row: {
          additional_social_links: Json | null
          bio: string | null
          created_at: string | null
          developer_github: string | null
          developer_name: string | null
          developer_telegram: string | null
          developer_twitter: string | null
          developer_website: string | null
          profile_pic: string | null
          updated_at: string | null
          wallet_address: string
        }
        Insert: {
          additional_social_links?: Json | null
          bio?: string | null
          created_at?: string | null
          developer_github?: string | null
          developer_name?: string | null
          developer_telegram?: string | null
          developer_twitter?: string | null
          developer_website?: string | null
          profile_pic?: string | null
          updated_at?: string | null
          wallet_address: string
        }
        Update: {
          additional_social_links?: Json | null
          bio?: string | null
          created_at?: string | null
          developer_github?: string | null
          developer_name?: string | null
          developer_telegram?: string | null
          developer_twitter?: string | null
          developer_website?: string | null
          profile_pic?: string | null
          updated_at?: string | null
          wallet_address?: string
        }
        Relationships: []
      }
      sciencegent_assistants: {
        Row: {
          assistant_id: string
          created_at: string | null
          id: string
          last_used_at: string | null
          sciencegent_address: string
        }
        Insert: {
          assistant_id: string
          created_at?: string | null
          id?: string
          last_used_at?: string | null
          sciencegent_address: string
        }
        Update: {
          assistant_id?: string
          created_at?: string | null
          id?: string
          last_used_at?: string | null
          sciencegent_address?: string
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
          chat_count: number | null
          holders: number | null
          id: string
          price_history: Json | null
          sciencegent_address: string
          trade_volume_eth: number | null
          transactions: number | null
          updated_at: string | null
          volume_24h: number | null
        }
        Insert: {
          chat_count?: number | null
          holders?: number | null
          id?: string
          price_history?: Json | null
          sciencegent_address: string
          trade_volume_eth?: number | null
          transactions?: number | null
          updated_at?: string | null
          volume_24h?: number | null
        }
        Update: {
          chat_count?: number | null
          holders?: number | null
          id?: string
          price_history?: Json | null
          sciencegent_address?: string
          trade_volume_eth?: number | null
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
          age: number | null
          agent_fee: number | null
          bio: string | null
          capability_fees: number | null
          collected_fees: number | null
          created_at: string | null
          created_on_chain_at: string | null
          creator_address: string | null
          description: string | null
          developer_email: string | null
          developer_github: string | null
          developer_name: string | null
          developer_telegram: string | null
          developer_twitter: string | null
          developer_website: string | null
          domain: string | null
          eth_reserves: number | null
          id: string
          is_curated: boolean | null
          is_migrated: boolean | null
          last_price_update: string | null
          last_synced_at: string | null
          market_cap: number | null
          market_cap_usd: number | null
          maturity_deadline: number | null
          maturity_progress: number | null
          migration_condition: number | null
          migration_eligible: boolean | null
          name: string
          number_of_ratings: number | null
          persona: string | null
          price_change_24h: number | null
          profile_pic: string | null
          rating: number | null
          remaining_maturity_days: number | null
          remaining_maturity_time: number | null
          socials: Json | null
          symbol: string
          token_price: number | null
          token_price_usd: number | null
          token_reserves: number | null
          total_liquidity: number | null
          total_liquidity_usd: number | null
          total_supply: number | null
          trading_enabled: boolean | null
          updated_at: string | null
          virtual_eth: number | null
          website: string | null
        }
        Insert: {
          address: string
          age?: number | null
          agent_fee?: number | null
          bio?: string | null
          capability_fees?: number | null
          collected_fees?: number | null
          created_at?: string | null
          created_on_chain_at?: string | null
          creator_address?: string | null
          description?: string | null
          developer_email?: string | null
          developer_github?: string | null
          developer_name?: string | null
          developer_telegram?: string | null
          developer_twitter?: string | null
          developer_website?: string | null
          domain?: string | null
          eth_reserves?: number | null
          id?: string
          is_curated?: boolean | null
          is_migrated?: boolean | null
          last_price_update?: string | null
          last_synced_at?: string | null
          market_cap?: number | null
          market_cap_usd?: number | null
          maturity_deadline?: number | null
          maturity_progress?: number | null
          migration_condition?: number | null
          migration_eligible?: boolean | null
          name: string
          number_of_ratings?: number | null
          persona?: string | null
          price_change_24h?: number | null
          profile_pic?: string | null
          rating?: number | null
          remaining_maturity_days?: number | null
          remaining_maturity_time?: number | null
          socials?: Json | null
          symbol: string
          token_price?: number | null
          token_price_usd?: number | null
          token_reserves?: number | null
          total_liquidity?: number | null
          total_liquidity_usd?: number | null
          total_supply?: number | null
          trading_enabled?: boolean | null
          updated_at?: string | null
          virtual_eth?: number | null
          website?: string | null
        }
        Update: {
          address?: string
          age?: number | null
          agent_fee?: number | null
          bio?: string | null
          capability_fees?: number | null
          collected_fees?: number | null
          created_at?: string | null
          created_on_chain_at?: string | null
          creator_address?: string | null
          description?: string | null
          developer_email?: string | null
          developer_github?: string | null
          developer_name?: string | null
          developer_telegram?: string | null
          developer_twitter?: string | null
          developer_website?: string | null
          domain?: string | null
          eth_reserves?: number | null
          id?: string
          is_curated?: boolean | null
          is_migrated?: boolean | null
          last_price_update?: string | null
          last_synced_at?: string | null
          market_cap?: number | null
          market_cap_usd?: number | null
          maturity_deadline?: number | null
          maturity_progress?: number | null
          migration_condition?: number | null
          migration_eligible?: boolean | null
          name?: string
          number_of_ratings?: number | null
          persona?: string | null
          price_change_24h?: number | null
          profile_pic?: string | null
          rating?: number | null
          remaining_maturity_days?: number | null
          remaining_maturity_time?: number | null
          socials?: Json | null
          symbol?: string
          token_price?: number | null
          token_price_usd?: number | null
          token_reserves?: number | null
          total_liquidity?: number | null
          total_liquidity_usd?: number | null
          total_supply?: number | null
          trading_enabled?: boolean | null
          updated_at?: string | null
          virtual_eth?: number | null
          website?: string | null
        }
        Relationships: []
      }
      user_interactions: {
        Row: {
          created_at: string | null
          id: string
          interaction_data: Json | null
          interaction_type: string
          sciencegent_address: string
          user_address: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          interaction_data?: Json | null
          interaction_type: string
          sciencegent_address: string
          user_address: string
        }
        Update: {
          created_at?: string | null
          id?: string
          interaction_data?: Json | null
          interaction_type?: string
          sciencegent_address?: string
          user_address?: string
        }
        Relationships: []
      }
      trades: {
        Row: {
          id: string
          token_id: string
          price_in_usd: number
          volume: number
          time: string
        }
        Insert: {
          id?: string
          token_id: string
          price_in_usd: number
          volume: number
          time?: string
        }
        Update: {
          id?: string
          token_id?: string
          price_in_usd?: number
          volume?: number
          time?: string
        }
        Relationships: []
      }
      domains: {
        Row: {
          id: string
          name: string
          created_at: string | null
          creator_address: string | null
          custom: boolean | null
        }
        Insert: {
          id: string
          name: string
          created_at?: string | null
          creator_address?: string | null
          custom?: boolean | null
        }
        Update: {
          id?: string
          name?: string
          created_at?: string | null
          creator_address?: string | null
          custom?: boolean | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_price_point: {
        Args: {
          token_address: string
          price: number
          record_timestamp?: string
        }
        Returns: undefined
      }
      record_trade: {
        Args: {
          token_address: string
          price: number
          volume: number
          record_timestamp?: string
        }
        Returns: undefined
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
