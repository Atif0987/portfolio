import { testimonials } from "../../data/testimonials";
import Container from "../shared/container";
import Reveal from "../shared/reveal";
import SectionHeader from "../ui/section-header";

export default function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section aria-labelledby="testimonials-heading" className="py-10 lg:py-16">
      <Container>
        <Reveal>
          <SectionHeader
            id="testimonials-heading"
            eyebrow="07 / Kind words"
            title="What clients and teams say."
          />

          <div className="grid gap-3 md:grid-cols-2 lg:gap-4">
            {testimonials.map((item) => (
              <figure
                key={item.name}
                className="flex flex-col gap-5 rounded-3xl border border-line bg-surface p-6 sm:p-8"
              >
                <blockquote className="font-display text-[22px] leading-snug sm:text-[26px]">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="flex flex-col text-sm">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-muted">{item.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
