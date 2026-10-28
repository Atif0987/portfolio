"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { navigation } from "../../data/navigation";
import { getWhatsAppUrl, siteConfig } from "../../data/site";
import { useActiveSection } from "../../hooks/useActiveSection";
import Container from "../shared/container";
import {
  ArrowUpRightIcon,
  CalendarIcon,
  CloseIcon,
  DownloadIcon,
  MenuIcon,
  WhatsAppIcon,
} from "../ui/icons";
import ThemeToggle from "./theme-toggle";

const sectionIds = navigation.map((item) => item.href.split("#")[1]);
const whatsappUrl = getWhatsAppUrl();

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection(sectionIds);
  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMobileMenuOpen(false);

  // Escape key + viewport resize: close menu
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) closeMenu();
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
      <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between gap-4 lg:h-[72px]">
          <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
            <Image
              src={siteConfig.portrait}
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 rounded-full border border-line object-cover"
            />
            <span className="text-[17px] font-semibold">{siteConfig.name}</span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {navigation.map((item) => {
              const isActive = activeSection === item.href.split("#")[1];
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative py-1 text-sm transition-colors hover:text-ink after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-accent-solid after:transition-transform ${
                    isActive ? "text-ink after:scale-x-100" : "text-muted after:scale-x-0"
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href={siteConfig.calendly}
              target="_blank"
              rel="noopener noreferrer"
              data-track="book_call"
              className="hidden h-11 items-center rounded-full bg-btn px-5 text-sm font-medium text-btn-ink transition hover:opacity-90 sm:inline-flex"
            >
              Book a call
            </Link>
            <button
              type="button"
              onClick={toggleMenu}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-chip lg:hidden"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Menu Panel */}
      <nav
        id="mobile-menu"
        aria-label="Mobile navigation"
        inert={!isMobileMenuOpen}
        className={`fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col bg-bg transition-all duration-300 ease-out lg:hidden ${
          isMobileMenuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <Container className="flex flex-1 flex-col overflow-y-auto py-4">
          {navigation.map((item, index) => (
            <Link
              key={item.title}
              href={item.href}
              onClick={closeMenu}
              className="flex items-center justify-between border-b border-line py-4"
            >
              <span className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-dim">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-[34px] leading-none">
                  {item.title}
                </span>
              </span>
              <ArrowUpRightIcon size={20} className="text-dim" />
            </Link>
          ))}
        </Container>

        <div className="border-t border-line bg-surface pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <Container className="flex flex-col gap-3 pt-5">
            <span className="flex items-center gap-2 font-mono text-[11px] tracking-wider text-ok-ink">
              <span className="h-2 w-2 rounded-full bg-ok" />
              AVAILABLE · {siteConfig.timezone}
            </span>
            <Link
              href={siteConfig.calendly}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              data-track="book_call"
              className="flex h-[52px] items-center justify-center gap-2.5 rounded-full bg-btn font-medium text-btn-ink"
            >
              <CalendarIcon />
              Book a 30-min call
            </Link>
            <div className="flex gap-3">
              {whatsappUrl && (
                <Link
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  data-track="whatsapp"
                  className="flex h-[52px] flex-1 items-center justify-center gap-2.5 rounded-full border border-line-strong font-medium"
                >
                  <WhatsAppIcon />
                  WhatsApp
                </Link>
              )}
              <Link
                href={siteConfig.resume}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                data-track="resume"
                className="flex h-[52px] flex-1 items-center justify-center gap-2.5 rounded-full border border-line-strong font-medium"
              >
                <DownloadIcon />
                Resume
              </Link>
            </div>
          </Container>
        </div>
      </nav>
    </>
  );
}
