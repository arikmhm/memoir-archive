import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

// Helper lokal untuk memastikan URL valid
const getFullImageUrl = (pathOrUrl: string) => {
  // 1. Jika di database sudah tersimpan full link (https://...), langsung pakai
  if (pathOrUrl.startsWith("http")) {
    return pathOrUrl;
  }

  // 2. Jika cuma path/nama file, kita rakit URL-nya
  // Logic: Kalau stringnya belum ada 'results/', kita tambahkan.
  const cleanPath = pathOrUrl.includes("results/")
    ? pathOrUrl
    : `results/${pathOrUrl}`;

  // Generate URL dari bucket 'assets'
  const { data } = supabase.storage.from("assets").getPublicUrl(cleanPath);

  return data.publicUrl;
};

export function useArchive(id: string | undefined) {
  return useQuery({
    queryKey: ["session", id], // Key cache diganti jadi 'session'
    queryFn: async () => {
      if (!id) throw new Error("No ID provided");

      // 1. Fetch ke tabel 'sessions'
      const { data, error } = await supabase
        .from("sessions")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      // 2. Data Processing
      return {
        ...data,
        // Pastikan URL gambar bisa dibuka browser
        final_image_url: getFullImageUrl(data.result_image_url),

        // Generate Session Code Estetik dari 8 karakter pertama ID
        // Contoh: ID "a0eebc99-9c0b..." -> Display "A0EE-BC99"
        display_code: data.id
          .slice(0, 8)
          .toUpperCase()
          .match(/.{1,4}/g)
          ?.join("-"),
      };
    },
    enabled: !!id,
    retry: 1,
  });
}
