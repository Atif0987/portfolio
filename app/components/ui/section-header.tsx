import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  id?: string;
  className?: string;
  children?: ReactNode;
}

export default function SectionHeader({
  eyebrow,
  title,
  id,
  className,
  children,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10",
        className
      )}
    >
      <div className="flex flex-col gap-3">
        <span className="font-mono text-[11px] tracking-[0.14em] text-dim uppercase md:text-xs">
          {eyebrow}
        </span>
        <h2
          id={id}
          className="font-display text-[34px] leading-[1.05] tracking-[-0.01em] text-balance md:text-5xl"
        >
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}
