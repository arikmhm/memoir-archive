import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-canvas">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-center"
      >
        <p className="font-mono text-xs tracking-widest text-ink animate-blink">
          RETRIEVING MEMORY...
        </p>
      </motion.div>
    </div>
  );
}
