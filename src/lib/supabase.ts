import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase Environment Variables");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// --- TAMBAHAN BARU ---
// Fungsi helper untuk merakit URL gambar dari Bucket
export const getStorageUrl = (filename: string) => {
  // 1. Cek defensive: Kalau di DB ternyata sudah full URL (http...), kembalikan langsung
  if (filename.startsWith("http")) return filename;

  // 2. Cek apakah filename sudah mengandung folder "results/" atau belum
  // Jika di DB isinya "foto1.png", kita tambah "results/".
  // Jika di DB isinya "results/foto1.png", kita biarkan.
  const path = filename.includes("results/") ? filename : `results/${filename}`;

  // 3. Generate Public URL dari bucket 'assets'
  const { data } = supabase.storage
    .from("assets") // Nama Bucket
    .getPublicUrl(path);

  return data.publicUrl;
};
