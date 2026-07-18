import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "../../data/site";
import Container from "../shared/container";
import MaterialIcon from "../ui/material-icon";

export default function Hero() {
  return (
    <section
      id="home"
      className="flex min-h-[85vh] items-center overflow-hidden pt-16"
    >
      <Container className="grid items-center gap-12 md:grid-cols-2">
        <div className="fade-in">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="font-label-sm text-xs uppercase tracking-wider">
              Available for Remote Opportunities
            </span>
          </div>

          <h1 className="mb-6 font-display-lg text-5xl leading-[1.1] tracking-tight text-white md:text-6xl">
            Shopify Plus Engineer. Building Scalable eCommerce Experiences.
          </h1>

          <p className="mb-10 max-w-xl font-body-lg text-lg text-on-surface-variant">
            Experienced software engineer specializing in Shopify Plus, custom
            Shopify apps, WordPress, WooCommerce, React.js and modern frontend
            technologies. Passionate about building high-performance eCommerce
            experiences.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="#projects"
              className="flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-label-sm text-sm text-white shadow-lg shadow-primary/20 transition-all hover:brightness-110"
            >
              View Projects
              <MaterialIcon name="arrow_forward" />
            </Link>

            <Link
              href={siteConfig.resume}
              className="rounded-full border border-outline-variant px-8 py-4 font-label-sm text-sm text-white transition-all hover:bg-surface-container"
            >
              Download Resume
            </Link>
          </div>
        </div>

        <div className="fade-in delay-2 relative flex justify-center">
          <div className="absolute -z-10 h-[140%] w-[140%] rounded-full bg-gradient-to-br from-primary/10 to-transparent opacity-30 blur-3xl" />
          <Image
            src={siteConfig.heroImage}
            alt="Atif Raza - Shopify Plus Engineer"
            width={512}
            height={512}
            priority
            className="w-full max-w-lg object-contain drop-shadow-[0_0_50px_rgba(37,99,235,0.2)]"
          />
        </div>
      </Container>
    </section>
  );
}
