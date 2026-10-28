import { toolkit } from "../../data/skills";
import Container from "../shared/container";
import Reveal from "../shared/reveal";
import SectionHeader from "../ui/section-header";

export default function Toolkit() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="py-10 lg:py-16">
      <Container>
        <Reveal>
          <SectionHeader id="skills-heading" eyebrow="06 / Toolkit" title="Technical skills." />

          <dl className="border-t border-line">
            {toolkit.map((row) => (
              <div
                key={row.group}
                className="flex flex-col gap-3 border-b border-line py-5 lg:flex-row lg:gap-10"
              >
                <dt className="font-mono text-[11px] tracking-[0.08em] text-dim uppercase sm:text-xs lg:w-[200px] lg:shrink-0 lg:pt-1.5">
                  {row.group}
                </dt>
                <dd>
                  <ul className="flex flex-wrap gap-1.5">
                    {row.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-line bg-surface px-3 py-1.5 text-[13px] sm:text-sm"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
