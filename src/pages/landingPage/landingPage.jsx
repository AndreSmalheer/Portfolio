import { useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import Banner from "./sections/banner/banner.jsx";
import Projects from "./sections/projects/projects.jsx";
import "./landingPage.css";

const SECTIONS = ["banner", "projects"];
const NAV_TO_SECTION = {
  Home: 0,
  Work: 1,
  About: 2,
  Contact: 3,
};

function LandingPage() {
  const [currentSection, setCurrentSection] = useState(0);
  const [fading, setFading] = useState(false);
  const containerRef = useRef(null);
  const isScrolling = useRef(false);
  const deltaAccumulator = useRef(0);
  const isFading = useRef(false);

  const goToSection = (index) => {
    if (isFading.current || index === currentSection) return;
    if (index < 0 || index >= SECTIONS.length) return;

    isFading.current = true;
    setFading(true);

    setTimeout(() => {
      setCurrentSection(index);
      setFading(false);
      isFading.current = false;
    }, 200);

    isScrolling.current = true;
    setTimeout(() => {
      isScrolling.current = false;
      deltaAccumulator.current = 0;
    }, 1000);
  };

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (isScrolling.current) {
        deltaAccumulator.current = 0;
        return;
      }
      deltaAccumulator.current += e.deltaY;
      if (Math.abs(deltaAccumulator.current) < 150) return;

      const direction = deltaAccumulator.current > 0 ? 1 : -1;
      deltaAccumulator.current = 0;

      setCurrentSection((prev) => {
        const next = prev + direction;
        if (next < 0 || next >= SECTIONS.length) return prev;

        isScrolling.current = true;
        setTimeout(() => {
          isScrolling.current = false;
          deltaAccumulator.current = 0;
        }, 1000);

        return next;
      });
    };

    const el = containerRef.current;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="landing-wrapper" ref={containerRef}>
      <Header
        shrink={currentSection !== 0}
        onNavClick={(item) => goToSection(NAV_TO_SECTION[item])}
        currentSection={currentSection}
      />
      <div className={`sections-container ${fading ? "fading" : ""}`}>
        {SECTIONS.map((name, i) => (
          <div
            key={name}
            className={`full-section
              ${i === currentSection ? "active" : ""}
              ${i < currentSection ? "above" : ""}
              ${i > currentSection ? "below" : ""}
            `}
          >
            {name === "banner" && (
              <Banner onArrowClick={() => goToSection(1)} />
            )}
            {name === "projects" && <Projects />}
          </div>
        ))}
      </div>

      <div className="section-dots">
        {SECTIONS.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === currentSection ? "dot-active" : ""}`}
            onClick={() => goToSection(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
