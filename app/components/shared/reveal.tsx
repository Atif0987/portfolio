"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useScrollFadeIn } from "../../hooks/useScrollFadeIn";

export default function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { ref, isVisible } = useScrollFadeIn<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn("scroll-fade-in", isVisible && "visible", className)}
    >
      {children}
    </div>
  );
}
