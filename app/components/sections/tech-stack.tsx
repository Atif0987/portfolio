import { skills } from "../../data/skills";
import Container from "../shared/container";
import MaterialIcon from "../ui/material-icon";

export default function TechStack() {
  return (
    <section id="skills" className="py-section-padding-lg">
      <Container>
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-display-lg text-4xl text-white">
            Core Engineering Stack
          </h2>
          <p className="font-body-md text-on-surface-variant">
            Leveraging the best of modern commerce and frontend engineering.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="premium-shadow flex flex-col items-center gap-4 rounded-xl border border-outline-variant/20 bg-surface-container-low p-6 text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <MaterialIcon name={skill.icon} className="text-3xl" />
              </div>
              <div className="font-headline-md text-lg text-white">
                {skill.name}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
