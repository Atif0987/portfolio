import { experience } from "../../data/experience";
import Container from "../shared/container";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-section-padding-lg">
      <Container>
        <div className="grid gap-12 md:grid-cols-3">
          <div className="md:col-span-1">
            <h2 className="mb-4 font-display-lg text-4xl text-white">
              Journey
            </h2>
            <p className="font-body-md text-on-surface-variant">
              Continuous growth through technical leadership and complex
              problem-solving in top-tier agencies.
            </p>
          </div>

          <div className="space-y-12 md:col-span-2">
            {experience.map((item) => (
              <div
                key={`${item.company}-${item.period}`}
                className={`relative border-l-2 pl-8 ${
                  item.active ? "border-primary/30" : "border-primary/10"
                }`}
              >
                <div
                  className={`absolute top-0 -left-[9px] h-4 w-4 rounded-full ${
                    item.active
                      ? "bg-primary ring-4 ring-primary/10"
                      : "border-2 border-outline-variant bg-surface-container-high"
                  }`}
                />

                <div className="mb-2">
                  <span
                    className={`font-label-sm text-xs font-bold tracking-widest uppercase ${
                      item.active ? "text-primary" : "text-on-surface-variant"
                    }`}
                  >
                    {item.period}
                  </span>
                  <h3 className="mt-1 font-headline-sm text-xl text-white">
                    {item.title}
                  </h3>
                  <p className="font-medium text-on-surface-variant">
                    {item.company}
                  </p>
                </div>

                <p className="mb-4 text-on-surface-variant">
                  {item.description}
                </p>

                {item.tags && (
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-outline-variant/20 bg-surface-container px-2 py-1 text-[10px] font-medium text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
