import Link from "next/link";

import { isContactFormEnabled } from "../../data/contact";
import { getWhatsAppUrl, siteConfig } from "../../data/site";
import Container from "../shared/container";
import Reveal from "../shared/reveal";
import { CalendarIcon, MailIcon, WhatsAppIcon } from "../ui/icons";
import ContactForm from "./contact-form";

const secondaryBtn =
  "flex h-[54px] items-center justify-center gap-2.5 rounded-full border border-cta-line px-7 font-medium transition hover:bg-white/10";

export default function ContactSection() {
  const whatsappUrl = getWhatsAppUrl();
  const showForm = isContactFormEnabled();

  return (
    <section id="contact" aria-labelledby="contact-heading" className="pt-6 pb-14 lg:pt-10 lg:pb-20">
      <Container className="flex flex-col gap-4">
        <Reveal className="flex flex-col gap-8 rounded-3xl bg-cta px-6 py-10 text-cta-ink sm:px-10 sm:py-14 lg:flex-row lg:items-center lg:justify-between lg:rounded-[32px] lg:px-16 lg:py-[72px]">
          <div className="flex flex-col gap-3.5 lg:max-w-[560px]">
            <h2
              id="contact-heading"
              className="font-display text-[40px] leading-[1.02] text-balance sm:text-5xl lg:text-[64px]"
            >
              Let&apos;s build something extraordinary.
            </h2>
            <p className="text-base opacity-85 sm:text-[17px]">
              Open to remote engineering roles and high-impact Shopify
              consulting.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:max-w-[440px] lg:flex-col">
            <Link
              href={siteConfig.calendly}
              target="_blank"
              rel="noopener noreferrer"
              data-track="book_call"
              className="flex h-[54px] items-center justify-center gap-2.5 rounded-full bg-cta-btn px-7 font-medium text-cta-btn-ink transition hover:opacity-90"
            >
              <CalendarIcon />
              Book a 30-min call
            </Link>
            {whatsappUrl && (
              <Link
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-track="whatsapp"
                className={secondaryBtn}
              >
                <WhatsAppIcon />
                Chat on WhatsApp
              </Link>
            )}
            <Link href={`mailto:${siteConfig.email}`} data-track="email" className={secondaryBtn}>
              <MailIcon />
              {siteConfig.email}
            </Link>
          </div>
        </Reveal>

        {showForm && (
          <Reveal className="grid gap-6 pt-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12 lg:pt-10">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[11px] tracking-[0.14em] text-dim uppercase md:text-xs">
                Prefer writing?
              </span>
              <h3 className="font-display text-[30px] leading-tight md:text-4xl">
                Tell me about your project.
              </h3>
              <p className="text-muted">
                Share a few details and I&apos;ll reply by email with next steps.
              </p>
            </div>
            <ContactForm />
          </Reveal>
        )}
      </Container>
    </section>
  );
}
