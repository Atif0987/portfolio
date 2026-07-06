"use client";

import Link from "next/link";

import { navigation } from "../../data/navigation";
import { siteConfig } from "../../data/site";

import Container from "../shared/container";

import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="text-sm font-medium text-gray-600 transition hover:text-black"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link href={siteConfig.github} target="_blank" aria-label="GitHub">
            <FaGithub className="h-5 w-5" />
          </Link>

          <Link
            href={siteConfig.linkedin}
            target="_blank"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="h-5 w-5" />
          </Link>
        </div>
      </Container>
    </header>
  );
}
