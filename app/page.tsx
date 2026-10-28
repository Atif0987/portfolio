import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";

import Hero from "./components/sections/hero";
import Clients from "./components/sections/clients";
import About from "./components/sections/about";
import Services from "./components/sections/services";
import ProcessSection from "./components/sections/process";
import FeaturedProjects from "./components/sections/featured-projects";
import ExperienceSection from "./components/sections/experience";
import Toolkit from "./components/sections/toolkit";
import Testimonials from "./components/sections/testimonials";
import ContactSection from "./components/sections/contact";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main id="main" className="relative">
        <Hero />
        <Clients />
        <About />
        <Services />
        <ProcessSection />
        <FeaturedProjects />
        <ExperienceSection />
        <Toolkit />
        <Testimonials />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
