import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

interface GhostButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function GhostButton({
  className,
  children,
  ...props
}: GhostButtonProps) {
  return (
    <button
      className={cn(
        // Base Layout
        "w-full py-4 px-6 flex items-center justify-center gap-2",
        // Typography
        "font-sans font-semibold text-sm tracking-wide",
        // Visual (Ghost Style)
        "border border-ink text-ink bg-transparent",
        // Interaction
        "transition-all duration-300 active:scale-[0.98]",
        "hover:bg-ink hover:text-canvas", // Invert colors
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
