"use client";

import type { ReactNode } from "react";

export function Surface({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <section
      style={{
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border)",
        background: "var(--glass-bg)",
        backdropFilter: `blur(var(--blur-sm))`,
        WebkitBackdropFilter: `blur(var(--blur-sm))`,
        boxShadow: "var(--shadow-1)",
        padding: "var(--space-6)",
        transition: "all var(--transition-fast)",
      }}
    >
      {title ? (
        <h2
          style={{
            margin: 0,
            marginBlockEnd: "var(--space-4)",
            fontSize: "var(--text-lg)",
            fontWeight: 600,
          }}
        >
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  );
}
