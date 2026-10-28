import Link from "next/link";

import { experience } from "../../data/experience";
import { siteConfig } from "../../data/site";
import Container from "../shared/container";
import Reveal from "../shared/reveal";
import { DownloadIcon } from "../ui/icons";
import SectionHeader from "../ui/section-header";

export default function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="py-10 lg:py-16">
      <Container>
        <Reveal>
          <SectionHeader
            id="experience-heading"
            eyebrow="05 / Experience"
            title="Where I've worked."
          >
            <Link
              href={siteConfig.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden min-h-11 items-center gap-2 font-medium text-accent hover:underline sm:inline-flex"
            >
              <DownloadIcon size={16} />
              Full resume (PDF)
            </Link>
          </SectionHeader>

          <ol className="border-t border-line">
            {experience.map((item) => (
              <li
                key={`${item.company}-${item.period}`}
                className="flex flex-col gap-2 border-b border-line py-6 lg:flex-row lg:gap-10 lg:py-8"
              >
                <div className="flex items-center justify-between gap-3 lg:w-[200px] lg:shrink-0 lg:flex-col lg:items-start lg:justify-start">
                  <span
                    className={`font-mono text-[11px] tracking-[0.06em] uppercase sm:text-xs ${
                      item.active ? "text-accent" : "text-dim"
                    }`}
                  >
                    {item.period}
                  </span>
                  {item.active && (
                    <span className="rounded-full border border-ok-line bg-ok-bg px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-ok-ink">
                      CURRENT
                    </span>
                  )}
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-2.5">
                  <h3 className="text-lg leading-snug font-semibold sm:text-[22px]">
                    {item.title}
                    <span className="block font-medium text-muted sm:inline">
                      <span className="hidden sm:inline"> · </span>
                      {item.company}
                    </span>
                  </h3>
                  <ul className="flex flex-col gap-2 text-[15px] leading-relaxed text-muted sm:text-base">
                    {item.highlights.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-dim" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  {item.tags && (
                    <ul className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full bg-chip px-2.5 py-1 text-xs text-muted"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>

          <div className="flex flex-col gap-2 border-b border-line py-6 lg:flex-row lg:gap-10 lg:py-8">
            <span className="font-mono text-[11px] tracking-[0.06em] text-dim uppercase sm:text-xs lg:w-[200px] lg:shrink-0">
              Education · {siteConfig.education.period}
            </span>
            <h3 className="text-lg leading-snug font-semibold sm:text-[22px]">
              {siteConfig.education.degree}
              <span className="block font-medium text-muted sm:inline">
                <span className="hidden sm:inline"> · </span>
                {siteConfig.education.school}
              </span>
            </h3>
          </div>

          <Link
            href={siteConfig.resume}
            target="_blank"
            rel="noopener noreferrer"
            data-track="resume"
            className="mt-6 flex h-12 items-center justify-center gap-2 rounded-full border border-line-strong font-medium sm:hidden"
          >
            <DownloadIcon size={16} />
            Download resume (PDF)
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
