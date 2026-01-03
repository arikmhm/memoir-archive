import { motion } from "framer-motion";

interface ArtifactProps {
  imageUrl: string;
}

export default function Artifact({ imageUrl }: ArtifactProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} // Cubic Bezier untuk "Weighty Feel"
      className="relative w-full max-w-[576px] mx-auto p-6 md:p-8"
    >
      {/* Container Putih "Paspartu" (Opsional, jika ingin frame putih extra) */}
      {/* Saat ini kita langsung render image dengan shadow sesuai brief */}

      <div className="relative group">
        <img
          src={imageUrl}
          alt="Archived Memory"
          className="w-full h-auto shadow-art select-none pointer-events-none"
          // Mencegah user drag gambar, memaksa pakai tombol download
        />

        {/* Shine effect tipis (Opsional untuk kesan glossy kertas thermal) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      </div>
    </motion.div>
  );
}
