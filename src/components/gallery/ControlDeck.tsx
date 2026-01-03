import { useState } from "react";
import { Share2, Download } from "lucide-react";
import GhostButton from "../ui/GhostButton";

interface ControlDeckProps {
  imageUrl: string;
}

export default function ControlDeck({ imageUrl }: ControlDeckProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  // LOGIC: Force Download Image
  const handleDownload = async () => {
    try {
      setIsDownloading(true);

      // 1. Fetch gambar sebagai Blob (Binary Large Object)
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // 2. Buat URL sementara
      const url = window.URL.createObjectURL(blob);

      // 3. Buat elemen anchor <a> palsu & klik otomatis
      const link = document.createElement("a");
      link.href = url;
      // Nama file saat didownload: MEMOIR-[TIMESTAMP].png
      link.download = `MEMOIR-${new Date().getTime()}.png`;
      document.body.appendChild(link);
      link.click();

      // 4. Bersihkan
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed", err);
      alert("Failed to download memory. Please try again.");
    } finally {
      setTimeout(() => setIsDownloading(false), 1000); // Reset state
    }
  };

  // LOGIC: Web Share API
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "MEMOIR Archive",
          text: "Paper fades, data remains.",
          url: window.location.href,
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        // User cancel share, ignore.
      }
    } else {
      // Fallback: Copy Link
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard");
    }
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-canvas via-canvas to-transparent pt-10 pb-8 px-6">
      <div className="flex flex-col gap-4 max-w-md mx-auto">
        {/* Tombol Utama */}
        <div className="flex gap-3">
          <GhostButton
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex-1"
          >
            <Download size={16} />
            {isDownloading ? "SAVING..." : "DOWNLOAD IMAGE"}
          </GhostButton>

          <GhostButton onClick={handleShare} className="w-16 px-0 flex-none">
            <Share2 size={16} />
          </GhostButton>
        </div>

        {/* Quotes Filosofis */}
        <div className="text-center mt-2">
          <p className="font-mono text-[10px] text-ink-light tracking-widest uppercase">
            "Paper fades, data remains."
          </p>
        </div>
      </div>
    </footer>
  );
}
