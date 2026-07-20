import type { ReactNode } from "react";

export default function PlaceholderNote({ children }: { children: ReactNode }) {
  return (
    <div className="mb-8 rounded-2xl border-2 border-dashed border-orange/40 bg-white/60 px-5 py-4 text-sm text-brown-soft">
      <span className="font-heading font-bold text-orange">
        📝 Placeholder content —{" "}
      </span>
      {children}
    </div>
  );
}
