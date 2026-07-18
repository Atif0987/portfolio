import { processSteps } from "../../data/process";
import Container from "../shared/container";
import MaterialIcon from "../ui/material-icon";

export default function ProcessSection() {
  return (
    <section className="relative overflow-hidden bg-black py-section-padding-lg">
      <Container className="relative z-10">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-display-lg text-4xl text-white">
            The Process
          </h2>
          <p className="font-body-md text-on-surface-variant">
            A structured approach to building scalable products.
          </p>
        </div>

        <div className="relative grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {processSteps.map((step) => (
            <div
              key={step.step}
              className="group relative overflow-hidden rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-6 transition-all duration-300 hover:border-primary/50"
            >
              <div className="pointer-events-none absolute -top-4 -right-4 font-display-lg text-6xl text-white/5 transition-colors group-hover:text-primary/10">
                {step.step}
              </div>

              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <MaterialIcon name={step.icon} className="text-xl" />
              </div>

              <h4 className="mb-2 font-bold text-white">{step.title}</h4>
              <p className="text-xs leading-relaxed text-on-surface-variant">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
