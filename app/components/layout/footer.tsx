import Link from "next/link";

import { siteConfig } from "../../data/site";
import Container from "../shared/container";

const links = [
  { label: "GitHub", href: siteConfig.github },
  { label: "LinkedIn", href: siteConfig.linkedin },
  { label: "Resume", href: siteConfig.resume },
];

export default function Footer() {
  return (
    <footer className="border-t border-line pb-[env(safe-area-inset-bottom)]">
      <Container className="flex flex-col gap-3 py-6 text-[13px] text-dim sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {new Date().getFullYear()} {siteConfig.name} · {siteConfig.timezone}
        </span>
        <div className="flex gap-6">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              data-track={`footer_${link.label.toLowerCase()}`}
              className="inline-flex min-h-11 items-center text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  );
}
