import { useTime } from "../../hooks/useTime";

interface HeaderProps {
  sessionCode?: string | null;
}

export default function Header({ sessionCode }: HeaderProps) {
  const time = useTime();
  // Fallback jika sessionCode kosong, ambil 4 huruf random/dummy
  const displayCode = sessionCode || "GUEST";

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex justify-between items-start bg-canvas/80 backdrop-blur-sm">
      {/* Kiri: Metadata */}
      <div className="flex flex-col gap-1">
        <h1 className="font-serif text-2xl font-bold tracking-widest text-ink">
          MEMOIR
        </h1>
        <p className="font-mono text-[10px] text-ink-light tracking-wide uppercase">
          SESSION ID: [{displayCode}]
        </p>
      </div>

      {/* Kanan: Jam Real-time */}
      <div className="pt-1">
        <p className="font-mono text-[10px] text-ink-light tracking-widest">
          {time}
        </p>
      </div>
    </header>
  );
}
