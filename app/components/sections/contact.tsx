import Link from "next/link";

import { siteConfig } from "../../data/site";
import Container from "../shared/container";
import MaterialIcon from "../ui/material-icon";

export default function ContactSection() {
  return (
    <section id="contact" className="py-section-padding-lg">
      <Container>
        <div className="premium-shadow flex flex-col items-center gap-12 rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-12 text-center md:flex-row md:text-left">
          <div className="flex-1">
            <h2 className="mb-4 font-display-lg text-4xl text-white">
              Let&apos;s build something extraordinary.
            </h2>
            <p className="mb-8 font-body-lg text-on-surface-variant">
              Currently based in Pakistan and open to remote engineering roles
              or high-impact consulting.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
              <Link
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-label-sm text-sm text-white transition-all hover:brightness-110"
              >
                <MaterialIcon name="mail" />
                Send Email
              </Link>
              <Link
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-outline-variant px-8 py-4 font-label-sm text-sm text-white transition-all hover:bg-surface-container"
              >
                <MaterialIcon name="calendar_month" />
                Book a Call
              </Link>
            </div>
          </div>

          <div className="w-full max-w-xs shrink-0 space-y-4">
            <div className="flex items-center gap-4 rounded-lg border border-outline-variant/10 bg-surface-container/50 p-4">
              <MaterialIcon name="location_on" className="text-primary" />
              <div className="text-left">
                <div className="text-[10px] font-bold tracking-wider text-on-surface-variant uppercase">
                  Location
                </div>
                <div className="font-body-md text-sm text-white">
                  {siteConfig.location}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-lg border border-outline-variant/10 bg-surface-container/50 p-4">
              <MaterialIcon name="language" className="text-primary" />
              <div className="text-left">
                <div className="text-[10px] font-bold tracking-wider text-on-surface-variant uppercase">
                  Timezone
                </div>
                <div className="font-body-md text-sm text-white">
                  {siteConfig.timezone}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
