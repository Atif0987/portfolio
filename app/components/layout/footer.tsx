import Link from "next/link";

import { siteConfig } from "../../data/site";
import Container from "../shared/container";

export default function Footer() {
  return (
    <footer className="w-full border-t border-outline-variant/10 bg-background py-12">
      <Container className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <span className="font-label-sm text-xs text-on-surface-variant">
          © {new Date().getFullYear()} {siteConfig.name}. Built with React &
          Tailwind CSS.
        </span>

        <div className="flex gap-8">
          <Link
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-label-sm text-xs text-on-surface-variant transition-colors hover:text-primary"
          >
            GitHub
          </Link>
          <Link
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-label-sm text-xs text-on-surface-variant transition-colors hover:text-primary"
          >
            LinkedIn
          </Link>
        </div>
      </Container>
    </footer>
  );
}
