import { processSteps } from "../../data/process";
import Container from "../shared/container";
import Reveal from "../shared/reveal";
import SectionHeader from "../ui/section-header";

export default function ProcessSection() {
  return (
    <section aria-labelledby="process-heading" className="py-10 lg:py-16">
      <Container>
        <Reveal>
          <SectionHeader
            id="process-heading"
            eyebrow="03 / How I work"
            title="From discovery to launch — and beyond."
          />

          {/* Swipeable row on phones, six-column grid on desktop */}
          <ol className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 sm:scroll-px-6 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-6 lg:gap-4 lg:overflow-visible lg:px-0">
            {processSteps.map((step, index) => (
              <li
                key={step.title}
                className="flex w-[42%] shrink-0 snap-start flex-col gap-2 border-t-2 border-line-strong pt-4 first:border-accent-solid sm:w-[30%] lg:w-auto"
              >
                <span className="font-mono text-xs text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-lg font-semibold">{step.title}</span>
                <span className="text-sm leading-relaxed text-muted">{step.description}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
