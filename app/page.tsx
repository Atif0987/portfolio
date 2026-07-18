import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";

import Hero from "./components/sections/hero";
import ClientsMarquee from "./components/sections/clients-marquee";
import ImpactStats from "./components/sections/impact-stats";
import TechStack from "./components/sections/tech-stack";
import FeaturedProjects from "./components/sections/featured-projects";
import ExperienceSection from "./components/sections/experience";
import ProcessSection from "./components/sections/process";
import ContactSection from "./components/sections/contact";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="relative">
        <Hero />
        <ClientsMarquee />
        <ImpactStats />
        <TechStack />
        <FeaturedProjects />
        <ExperienceSection />
        <ProcessSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
