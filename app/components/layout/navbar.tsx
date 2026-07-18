"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { navigation } from "../../data/navigation";
import { siteConfig } from "../../data/site";
import Container from "../shared/container";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`glass-nav fixed top-0 z-50 w-full border-b border-outline-variant/20 shadow-sm transition-shadow ${
        scrolled ? "border-primary/10 shadow-xl" : ""
      }`}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={siteConfig.avatar}
            alt={siteConfig.name}
            width={32}
            height={32}
            className="h-8 w-8 rounded-lg object-cover"
          />
          <span className="font-display-lg text-xl font-bold tracking-tight text-white">
            {siteConfig.name}
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="font-label-sm text-sm text-on-surface-variant transition-colors hover:text-primary"
            >
              {item.title}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href={siteConfig.resume}
            className="rounded-full bg-primary px-6 py-2 font-label-sm text-sm text-white transition-all hover:brightness-110 active:scale-95"
          >
            Resume
          </Link>
        </div>
      </Container>
    </nav>
  );
}
