import Link from "next/link";
import { ReactNode } from "react";

interface SocialIconProps {
  href: string;
  children: ReactNode;
  label: string;
}

export default function SocialIcon({
  href,
  children,
  label,
}: SocialIconProps) {
  return (
    <Link
      href={href}
      target="_blank"
      aria-label={label}
      className="transition-transform duration-200 hover:scale-110"
    >
      {children}
    </Link>
  );
}