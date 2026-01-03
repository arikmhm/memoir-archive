export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      sessions: {
        // <-- Nama tabel diubah jadi 'sessions'
        Row: {
          id: string;
          transaction_id: string;
          result_image_url: string; // <-- Nama kolom URL
          deletion_scheduled_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          transaction_id: string;
          result_image_url: string;
          deletion_scheduled_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          transaction_id?: string;
          result_image_url?: string;
          deletion_scheduled_at?: string | null;
          created_at?: string;
        };
      };
    };
  };
}
