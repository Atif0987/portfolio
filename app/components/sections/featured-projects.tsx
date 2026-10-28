import Image from "next/image";
import Link from "next/link";

import { clients } from "../../data/clients";
import { getCaseStudyProjects, projects, type Project } from "../../data/projects";
import Container from "../shared/container";
import Reveal from "../shared/reveal";
import { ArrowRightIcon, ArrowUpRightIcon } from "../ui/icons";
import SectionHeader from "../ui/section-header";
import StackChips from "../ui/stack-chips";

const caseStudySlugs = new Set(getCaseStudyProjects().map((p) => p.slug));
const clientWork = clients.filter((client) => client.work);

function ProjectLinks({ project }: { project: Project }) {
  const hasCaseStudy = caseStudySlugs.has(project.slug);
  if (!hasCaseStudy && !project.liveUrl) return null;

  return (
    <div className="flex flex-wrap gap-x-6">
      {hasCaseStudy && (
        <Link
          href={`/work/${project.slug}`}
          className="inline-flex min-h-11 items-center gap-2 font-medium text-accent hover:underline"
        >
          Read case study
          <ArrowRightIcon size={16} />
        </Link>
      )}
      {project.liveUrl && (
        <Link
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-track="live_store"
          className="inline-flex min-h-11 items-center gap-2 font-medium text-accent hover:underline"
        >
          {project.liveLabel ?? "Visit live store"}
          <ArrowUpRightIcon size={16} />
        </Link>
      )}
    </div>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <article className="grid items-center gap-6 rounded-3xl border border-line bg-surface p-5 sm:p-8 md:col-span-2 lg:col-span-3 lg:grid-cols-2 lg:gap-10">
      {project.image && (
        <div className="overflow-hidden rounded-2xl border border-line lg:order-2">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            sizes="(min-width: 1024px) 540px, 100vw"
            className="aspect-[16/9] h-auto w-full object-cover"
          />
        </div>
      )}
      <div className="flex flex-col gap-3.5 lg:gap-4">
        <span className="font-mono text-[11px] tracking-[0.06em] text-accent uppercase sm:text-xs">
          Featured · {project.label}
        </span>
        <h3 className="font-display text-[32px] leading-[1.05] sm:text-[40px]">
          {project.title}
        </h3>
        <p className="max-w-md text-[15px] text-muted sm:text-[17px]">
          {project.description}
        </p>
        <StackChips stack={project.stack} />
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col gap-3.5 rounded-3xl border border-line bg-surface p-5 sm:p-8">
      <span className="font-mono text-[11px] tracking-[0.06em] text-dim uppercase sm:text-xs">
        {project.label}
      </span>
      <h3 className="font-display text-[28px] leading-[1.05] sm:text-[32px]">
        {project.title}
      </h3>
      <p className="flex-1 text-[15px] text-muted">{project.description}</p>
      <StackChips stack={project.stack} />
      <ProjectLinks project={project} />
    </article>
  );
}

export default function FeaturedProjects() {
  return (
    <section id="work" aria-labelledby="work-heading" className="py-10 lg:py-16">
      <Container>
        <Reveal>
          <SectionHeader
            id="work-heading"
            eyebrow="04 / Selected work"
            title="Things I've built."
          />

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {projects.map((project) =>
              project.featured ? (
                <FeaturedCard key={project.slug} project={project} />
              ) : (
                <ProjectCard key={project.slug} project={project} />
              )
            )}
          </div>

          {clientWork.length > 0 && (
            <div className="mt-8 rounded-3xl border border-line p-5 sm:p-8">
              <h3 className="font-mono text-[11px] tracking-[0.12em] text-dim uppercase sm:text-xs">
                More client work
              </h3>
              <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
                {clientWork.map((client) => (
                  <li key={client.url} className="border-b border-line py-3 last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0">
                    <a
                      href={client.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-track="client_store"
                      className="group flex items-start justify-between gap-3"
                    >
                      <span className="flex flex-col">
                        <span className="font-medium group-hover:text-accent">{client.name}</span>
                        <span className="text-sm text-muted">{client.work}</span>
                      </span>
                      <ArrowUpRightIcon size={16} className="mt-1 shrink-0 text-dim group-hover:text-accent" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
