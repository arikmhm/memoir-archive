import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ArchivePage from "./pages/ArchivePage";

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        {/* Route Utama: /view/:id */}
        <Route path="/view/:id" element={<ArchivePage />} />

        {/* Jika user iseng buka root, redirect ke 404 atau demo (opsional) */}
        <Route
          path="/"
          element={
            <div className="p-10 font-mono text-xs">
              ACCESS DENIED. ID REQUIRED.
            </div>
          }
        />

        {/* Catch all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
