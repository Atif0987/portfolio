import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "../../data/site";
import { skills, type SkillGroup } from "../../data/skills";
import { stats } from "../../data/stats";
import Container from "../shared/container";
import { ArrowRightIcon, ArrowUpRightIcon, MailIcon } from "../ui/icons";

const groupDot: Record<SkillGroup, string> = {
  commerce: "bg-accent-solid",
  frontend: "bg-ink",
  backend: "bg-gold",
};

const tile = "rounded-[20px] border border-line bg-surface p-4 sm:p-5 lg:rounded-3xl lg:p-6";
const tileLabel = "font-mono text-[10px] tracking-[0.08em] text-dim uppercase sm:text-xs";
const statValue = "font-display text-[40px] leading-none lg:text-5xl";

function Portrait({ size, className }: { size: number; className?: string }) {
  return (
    <div className={`portrait-ring shrink-0 rounded-full p-1 lg:p-1.5 ${className ?? ""}`}>
      <Image
        src={siteConfig.portrait}
        alt={`Portrait of ${siteConfig.name}`}
        width={size}
        height={size}
        priority
        sizes={`${size}px`}
        className="block rounded-full border-[5px] border-surface object-cover lg:border-[6px]"
        style={{ width: size, height: size }}
      />
    </div>
  );
}

export default function Hero() {
  const { stores, apps } = stats;

  return (
    <section id="top" className="pt-4 pb-8 sm:pt-8 lg:pt-12">
      <Container>
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-12 lg:gap-4">
          {/* Intro */}
          <div className="order-1 col-span-2 flex flex-col justify-between gap-7 rounded-3xl border border-line bg-surface px-5 pt-7 pb-5 sm:p-8 lg:order-none lg:col-span-8 lg:rounded-[28px] lg:p-12">
            <div className="flex flex-col gap-5 text-center lg:text-left">
              <Portrait size={152} className="self-center lg:hidden" />
              <span className="font-mono text-[11px] tracking-[0.1em] text-balance text-dim uppercase sm:text-xs">
                {siteConfig.title}
              </span>
              <h1 className="font-display text-[42px] leading-[1.02] tracking-[-0.01em] text-balance sm:text-6xl lg:text-[76px] lg:leading-none">
                Hi, I&apos;m {siteConfig.firstName}. I build Shopify stores and
                apps that <em className="text-accent">actually sell.</em>
              </h1>
              <p className="mx-auto max-w-[540px] text-[15px] leading-relaxed text-muted sm:text-lg lg:mx-0">
                {siteConfig.description}
              </p>
            </div>
            <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3 lg:justify-start">
              <Link
                href="#work"
                className="flex h-[52px] items-center justify-center gap-2.5 rounded-full bg-btn px-7 font-medium text-btn-ink transition hover:opacity-90"
              >
                See my work
                <ArrowRightIcon />
              </Link>
              <Link
                href={`mailto:${siteConfig.email}`}
                data-track="email"
                className="flex h-[52px] items-center justify-center gap-2.5 rounded-full border border-line-strong px-7 font-medium transition-colors hover:bg-chip"
              >
                <MailIcon />
                {siteConfig.email}
              </Link>
            </div>
          </div>

          {/* Portrait (desktop) */}
          <div className="hidden flex-col items-center justify-between gap-6 rounded-[28px] border border-line bg-portrait px-7 pt-9 pb-7 lg:col-span-4 lg:flex">
            <Portrait size={260} />
            <div className="flex flex-col gap-1 text-center">
              <span className="text-[22px] font-semibold">{siteConfig.name}</span>
              <span className="text-sm text-muted">
                {siteConfig.currentTitle} @ {siteConfig.company}
              </span>
            </div>
          </div>

          {/* Availability */}
          <div className="order-2 col-span-2 flex items-center gap-3 rounded-[20px] border border-ok-line bg-ok-bg p-4 sm:p-5 lg:order-none lg:col-span-3 lg:flex-col lg:items-start lg:justify-between lg:gap-7 lg:rounded-3xl lg:p-6">
            <span className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ok" />
              </span>
              <span className="font-mono text-[11px] tracking-[0.08em] whitespace-nowrap text-ok-ink sm:text-xs">
                OPEN TO WORK
              </span>
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="text-[15px] leading-snug font-medium sm:text-lg">
                Remote roles &amp; Shopify consulting
              </span>
              <span className="text-[13px] leading-snug text-ok-ink">
                {siteConfig.timezonesCovered}
              </span>
            </span>
          </div>

          {/* Location */}
          <div className={`order-5 flex flex-col justify-between gap-5 lg:order-none lg:col-span-3 lg:gap-7 ${tile}`}>
            <span className={tileLabel}>Based in</span>
            <span className="flex flex-col">
              <span className="font-display text-[26px] leading-tight lg:text-3xl">
                {siteConfig.city}
              </span>
              <span className="text-[13px] text-muted lg:text-sm">
                Pakistan · {siteConfig.timezone}
              </span>
            </span>
          </div>

          {/* Stats */}
          <div className={`order-3 flex flex-col justify-between gap-5 lg:order-none lg:col-span-3 lg:gap-7 ${tile}`}>
            <span className={tileLabel}>Shipped</span>
            <span className="flex flex-col gap-1">
              <span className={statValue}>{stores.value}</span>
              <span className="text-[13px] text-muted lg:text-sm">{stores.label}</span>
            </span>
          </div>
          <div className={`order-4 flex flex-col justify-between gap-5 lg:order-none lg:col-span-3 lg:gap-7 ${tile}`}>
            <span className={tileLabel}>Built</span>
            <span className="flex flex-col gap-1">
              <span className={statValue}>{apps.value}</span>
              <span className="text-[13px] text-muted lg:text-sm">{apps.label}</span>
            </span>
          </div>

          {/* Stack */}
          <div className={`order-7 col-span-2 flex flex-col gap-3.5 lg:order-none lg:col-span-8 lg:gap-4 ${tile}`}>
            <span className={tileLabel}>Daily stack</span>
            <ul className="flex flex-wrap gap-1.5 sm:gap-2">
              {skills.map((skill) => (
                <li
                  key={skill.name}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-chip px-3 py-1.5 text-[13px] sm:px-3.5 sm:py-2 sm:text-sm"
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${groupDot[skill.group]}`} />
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <Link
            href={siteConfig.calendly}
            target="_blank"
            rel="noopener noreferrer"
            data-track="book_call"
            className="order-6 flex flex-col justify-between gap-5 rounded-[20px] bg-cta p-4 text-cta-ink transition hover:opacity-95 sm:p-5 lg:order-none lg:col-span-4 lg:rounded-3xl lg:p-6"
          >
            <span className="flex items-start justify-between">
              <span className="font-mono text-[10px] tracking-[0.08em] opacity-85 sm:text-xs">
                HAVE A PROJECT?
              </span>
              <ArrowUpRightIcon size={20} />
            </span>
            <span className="font-display text-[24px] leading-[1.1] lg:text-3xl">
              Book a free 30&#8209;min call
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
