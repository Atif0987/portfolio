"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { navigation } from "../../data/navigation";
import { siteConfig } from "../../data/site";
import Container from "../shared/container";
import MaterialIcon from "../ui/material-icon";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape key + viewport resize: close menu
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    const onResize = () => {
      if (window.innerWidth >= 768) closeMenu();
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [isMobileMenuOpen]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
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
            <button
              type="button"
              onClick={toggleMenu}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-surface-container md:hidden"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-controls="mobile-menu"
            >
              <MaterialIcon name={isMobileMenuOpen ? "close" : "menu"} />
            </button>
            <Link
              href={siteConfig.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-primary px-6 py-2 font-label-sm text-sm text-white transition-all hover:brightness-110 active:scale-95"
            >
              Resume
            </Link>
          </div>
        </Container>
      </nav>

      {/* Mobile Menu Panel */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!isMobileMenuOpen}
        className={`glass-nav fixed top-16 left-0 right-0 z-40 overflow-hidden border-b border-outline-variant/20 transition-all duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <Container className="flex flex-col gap-1 py-4 pb-6">
          {navigation.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 font-label-sm text-sm text-on-surface-variant transition-colors hover:bg-surface-container hover:text-white"
            >
              {item.title}
            </Link>
          ))}
          <div className="mt-2 border-t border-outline-variant/20 pt-4">
            <Link
              href={siteConfig.resume}
              onClick={closeMenu}
              className="block rounded-full bg-primary px-6 py-3 text-center font-label-sm text-sm text-white transition-all hover:brightness-110"
            >
              Download Resume
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
}
