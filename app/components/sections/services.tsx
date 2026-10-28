import { services } from "../../data/services";
import Container from "../shared/container";
import Reveal from "../shared/reveal";
import SectionHeader from "../ui/section-header";

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="py-10 lg:py-16">
      <Container>
        <Reveal>
          <SectionHeader
            id="services-heading"
            eyebrow="02 / What I do"
            title="How I can help your store."
          />

          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {services.map((service, index) => (
              <li
                key={service.title}
                className="flex gap-4 rounded-[20px] border border-line bg-surface p-5 transition-colors hover:border-line-strong lg:min-h-[230px] lg:flex-col lg:rounded-[22px] lg:p-6"
              >
                <span className="pt-1 font-mono text-xs text-accent lg:pt-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-1 flex-col gap-2 lg:gap-3">
                  <h3 className="text-lg leading-snug font-semibold lg:text-[21px]">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted lg:flex-1 lg:text-[15px]">
                    {service.description}
                  </p>
                  <p className="font-mono text-[10px] tracking-[0.06em] text-dim uppercase lg:border-t lg:border-line lg:pt-3.5 lg:text-[11px]">
                    {service.tech}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
