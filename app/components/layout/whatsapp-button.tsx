"use client";

import { useEffect, useState } from "react";

import { getWhatsAppUrl } from "../../data/site";
import { WhatsAppIcon } from "../ui/icons";

const href = getWhatsAppUrl();

/**
 * Floating chat button. Sits below the mobile menu (z-40) so the open menu
 * covers it, and hides while #contact (which has its own WhatsApp button) is on screen.
 */
export default function WhatsAppButton() {
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;
    const observer = new IntersectionObserver(([entry]) =>
      setContactVisible(entry.isIntersecting)
    );
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      data-track="whatsapp"
      tabIndex={contactVisible ? -1 : undefined}
      aria-hidden={contactVisible || undefined}
      className={`fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition duration-300 hover:scale-105 sm:right-6 sm:bottom-6 ${
        contactVisible ? "pointer-events-none translate-y-4 opacity-0" : "opacity-100"
      }`}
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
