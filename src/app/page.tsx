import Header from "@/components/Header";
import World from "@/components/World";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import ImpactMetrics from "@/components/ImpactMetrics";
import Footer from "@/components/Footer";
import ScrollCraft from "@/components/ScrollCraft";

// The owner's journey (BRIEF.md): entrance, the engine, the proof, the record,
// the metric, the departure. One world behind all of it.
export default function Home() {
  return (
    <>
      <World />
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <ImpactMetrics />
      </main>
      <Footer />
      <div className="sc-grain" aria-hidden />
      <ScrollCraft />
    </>
  );
}
