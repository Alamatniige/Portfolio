import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/block/Header";
import Milestone from "./components/section/Milestone";
import Footer from "./components/block/Footer";
import Banner from "./components/section/Banner";
import Projects from "./components/section/Projects";
import Techstack from "./components/section/Techstack";
import Contact from "./components/section/Contact";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function App() {
  useEffect(() => {
    // Refresh ScrollTrigger on window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    // Refresh ScrollTrigger after initial render
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("resize", handleResize);
      // Cleanup all ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen w-full bg-black">
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16, 185, 129, 0.25), transparent 70%), #000000",
          }}
        />

        <Header />
        <main className="relative">
          <Banner />
          <Milestone />
          <Projects />
          <Techstack />
          <Contact />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}
