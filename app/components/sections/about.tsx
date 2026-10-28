import { siteConfig } from "../../data/site";
import { stats } from "../../data/stats";
import Container from "../shared/container";
import Reveal from "../shared/reveal";

export default function About() {
  const facts = [stats.plusStores, stats.appStore, stats.wpPlugins, stats.years];

  return (
    <section id="about" aria-labelledby="about-heading" className="py-14 lg:py-20">
      <Container>
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:gap-12">
          <div className="flex flex-col gap-3 lg:basis-[420px] lg:shrink-0">
            <span className="font-mono text-[11px] tracking-[0.14em] text-dim uppercase md:text-xs">
              01 / About
            </span>
            <h2
              id="about-heading"
              className="font-display text-[34px] leading-[1.05] tracking-[-0.01em] text-balance md:text-5xl"
            >
              Engineer first, merchant&#8209;minded always.
            </h2>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-5 text-base leading-[1.75] text-muted md:text-lg">
            <p>
              I&apos;m a Shopify and full-stack web developer based in{" "}
              {siteConfig.location}, with 3+ years of experience delivering
              e-commerce and CMS solutions for international clients. I&apos;ve
              delivered 50+ Shopify stores — 30+ of them on Shopify Plus — and
              co-developed <span className="text-ink">Session Flow</span>, a paid
              public app on the Shopify App Store.
            </p>
            <p>
              I specialise in Shopify Plus, from Liquid theme development to
              custom apps, Checkout UI Extensions, Shopify Functions and headless
              storefronts, with strong WordPress/WooCommerce, React/Next.js and
              Node.js/PHP experience. Today I&apos;m a {siteConfig.currentTitle} at{" "}
              <span className="text-ink">{siteConfig.company}</span>, and I&apos;m
              comfortable working remotely across {siteConfig.timezonesCovered}.
            </p>

            <dl className="mt-2 grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-line [gap:1px] sm:grid-cols-4">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex flex-col-reverse justify-end gap-1.5 bg-surface px-4 py-4 sm:px-5 sm:py-5"
                >
                  <dt className="font-mono text-[10px] leading-snug tracking-[0.06em] text-muted uppercase sm:text-[11px]">
                    {fact.label}
                  </dt>
                  <dd className="font-display text-[32px] leading-none text-ink sm:text-4xl">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
