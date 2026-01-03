import { useParams } from "react-router-dom";
import { useArchive } from "../hooks/useArchive";
import LoadingScreen from "../components/gallery/LoadingScreen";
import Header from "../components/layout/Header";
import Artifact from "../components/gallery/Artifact";
import ControlDeck from "../components/gallery/ControlDeck";

export default function ArchivePage() {
  const { id } = useParams<{ id: string }>();

  // Ubah nama variabel 'memory' jadi 'session' biar sesuai konteks
  const { data: session, isLoading, error } = useArchive(id);

  if (isLoading) return <LoadingScreen />;

  if (error || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas p-6">
        <div className="text-center space-y-4">
          <h1 className="font-serif text-4xl text-ink">404</h1>
          <p className="font-mono text-xs text-ink-light tracking-widest">
            SESSION DATA NOT FOUND.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas flex flex-col relative overflow-hidden">
      {/* Gunakan display_code hasil generate tadi */}
      <Header sessionCode={session.display_code} />

      <main className="flex-1 flex items-center justify-center py-32 px-4 relative z-0">
        {/* Gunakan final_image_url yang sudah pasti valid */}
        <Artifact imageUrl={session.final_image_url} />
      </main>

      <ControlDeck imageUrl={session.final_image_url} />
    </div>
  );
}
