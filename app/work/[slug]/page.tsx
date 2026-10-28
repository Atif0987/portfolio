import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Footer from "../../components/layout/footer";
import Navbar from "../../components/layout/navbar";
import ContactSection from "../../components/sections/contact";
import Container from "../../components/shared/container";
import Reveal from "../../components/shared/reveal";
import { ArrowRightIcon, ArrowUpRightIcon } from "../../components/ui/icons";
import StackChips from "../../components/ui/stack-chips";
import {
  getCaseStudyProject,
  getCaseStudyProjects,
  type Screenshot,
} from "../../data/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCaseStudyProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/work/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getCaseStudyProject(slug);
  if (!project?.caseStudy) return {};

  const cover = project.caseStudy.screenshots[0];
  return {
    title: `${project.title} case study`,
    description: project.caseStudy.overview,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title: `${project.title} — case study`,
      description: project.caseStudy.overview,
      images: cover ? [cover.src] : undefined,
    },
  };
}

function ScreenshotFrame({ shot }: { shot: Screenshot }) {
  const isMobile = shot.device === "mobile";
  return (
    <figure
      className={isMobile ? "w-[64%] max-w-[300px] lg:w-auto" : "w-full"}
    >
      <div
        className={
          isMobile
            ? "overflow-hidden rounded-[28px] border-[6px] border-ink/90 bg-ink/90 shadow-lg"
            : "overflow-hidden rounded-xl border border-line bg-surface shadow-lg"
        }
      >
        {!isMobile && (
          <div className="flex gap-1.5 border-b border-line bg-chip px-3 py-2" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-line-strong" />
            <span className="h-2 w-2 rounded-full bg-line-strong" />
            <span className="h-2 w-2 rounded-full bg-line-strong" />
          </div>
        )}
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          sizes={isMobile ? "(min-width: 1024px) 300px, 64vw" : "(min-width: 1024px) 760px, 100vw"}
          className={isMobile ? "block h-auto w-full rounded-[22px]" : "block h-auto w-full"}
        />
      </div>
      <figcaption className="mt-2 text-center font-mono text-[10px] tracking-wider text-dim uppercase">
        {shot.device}
      </figcaption>
    </figure>
  );
}

function StoryBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal className="flex flex-col gap-3 border-t border-line py-8 lg:flex-row lg:gap-12 lg:py-10">
      <h2 className="font-display text-[28px] leading-tight lg:w-[320px] lg:shrink-0 lg:text-4xl">
        {title}
      </h2>
      <div className="min-w-0 flex-1 text-base leading-[1.75] text-muted md:text-lg">
        {children}
      </div>
    </Reveal>
  );
}

export default async function CaseStudyPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = getCaseStudyProject(slug);
  if (!project?.caseStudy) notFound();

  const study = project.caseStudy;
  const all = getCaseStudyProjects();
  const next = all[(all.findIndex((p) => p.slug === slug) + 1) % all.length];
  const meta = [
    { label: "Client", value: study.client },
    { label: "Industry", value: study.industry },
    { label: "Year", value: study.year },
    { label: "Role", value: study.role },
  ].filter((item) => item.value);

  return (
    <>
      <Navbar />

      <main id="main">
        <article>
          <Container className="pt-6 pb-8 lg:pt-12">
            <Link
              href="/#work"
              className="inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-ink"
            >
              <ArrowRightIcon size={16} className="rotate-180" />
              All work
            </Link>

            <header className="mt-4 flex flex-col gap-5 lg:mt-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-[11px] tracking-[0.1em] text-accent uppercase sm:text-xs">
                  Case study · {project.label}
                </span>
                {!study.published && (
                  <span className="rounded-full border border-gold px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-gold uppercase">
                    Draft — not published
                  </span>
                )}
              </div>
              <h1 className="font-display text-[46px] leading-none tracking-[-0.01em] sm:text-6xl lg:text-[84px]">
                {project.title}
              </h1>
              <p className="max-w-[720px] text-[17px] leading-relaxed text-muted sm:text-xl">
                {study.overview}
              </p>

              <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-y border-line py-5 sm:grid-cols-4">
                {meta.map((item) => (
                  <div key={item.label} className="flex flex-col gap-1">
                    <dt className="font-mono text-[10px] tracking-[0.08em] text-dim uppercase sm:text-[11px]">
                      {item.label}
                    </dt>
                    <dd className="text-[15px] font-medium">{item.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <StackChips stack={project.stack} />
                {project.liveUrl && (
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track="live_store"
                    className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-btn px-6 font-medium text-btn-ink transition hover:opacity-90"
                  >
                    {project.liveLabel ?? "Visit live store"}
                    <ArrowUpRightIcon size={16} />
                  </Link>
                )}
              </div>
            </header>
          </Container>

          {study.screenshots.length > 0 && (
            <section aria-label="Screenshots" className="bg-portrait py-8 lg:py-14">
              <Container>
                <div className="flex flex-col items-center gap-8 lg:grid lg:grid-cols-[minmax(0,2.6fr)_minmax(0,1fr)] lg:items-center lg:gap-8">
                  {study.screenshots.map((shot) => (
                    <ScreenshotFrame key={shot.src} shot={shot} />
                  ))}
                </div>
              </Container>
            </section>
          )}

          <Container className="pt-6 lg:pt-10">
            <StoryBlock title="The challenge">
              <p>{study.challenge}</p>
            </StoryBlock>
            <StoryBlock title="What I built">
              <ul className="flex flex-col gap-3">
                {study.solution.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-solid" />
                    {item}
                  </li>
                ))}
              </ul>
            </StoryBlock>
            <StoryBlock title="Outcome">
              <p>{study.outcome}</p>
            </StoryBlock>

            {next && next.slug !== slug && (
              <Link
                href={`/work/${next.slug}`}
                className="group mt-4 flex items-center justify-between gap-4 rounded-3xl border border-line bg-surface p-6 transition-colors hover:border-line-strong sm:p-8"
              >
                <span className="flex flex-col gap-1">
                  <span className="font-mono text-[11px] tracking-[0.1em] text-dim uppercase">
                    Next case study
                  </span>
                  <span className="font-display text-[30px] leading-tight sm:text-4xl">
                    {next.title}
                  </span>
                </span>
                <ArrowRightIcon size={24} className="shrink-0 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </Container>
        </article>

        <div className="pt-10">
          <ContactSection />
        </div>
      </main>

      <Footer />
    </>
  );
}
