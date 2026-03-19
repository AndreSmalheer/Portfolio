import { useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import Banner from "../sections/banner/banner";
import "./landingPage.css";

const SECTIONS = ["banner", "projects"];

function LandingPage() {
  const [currentSection, setCurrentSection] = useState(0);
  const containerRef = useRef(null);
  const isScrolling = useRef(false);
  const deltaAccumulator = useRef(0);

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
      <Header shrink={currentSection !== 0} />

      <div className="sections-container">
        {SECTIONS.map((name, i) => (
          <div
            key={name}
            className={`full-section
              ${i === currentSection ? "active" : ""}
              ${i < currentSection ? "above" : ""}
              ${i > currentSection ? "below" : ""}
            `}
          >
            {name === "banner" && <Banner onArrowClick={() => {
                if (isScrolling.current) return;
                isScrolling.current = true;
                setCurrentSection(1);
                setTimeout(() => {
                isScrolling.current = false;
                deltaAccumulator.current = 0;
                }, 1000);
            }} />}

            {name === "projects" && (
              <section className="projects-section">
                <h2 className="projects-title">Projects</h2>
                <div className="projects-grid">
                  <div className="project-card">Project One</div>
                  <div className="project-card">Project Two</div>
                  <div className="project-card">Project Three</div>
                </div>
              </section>
            )}
          </div>
        ))}
      </div>

      <div className="section-dots">
        {SECTIONS.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === currentSection ? "dot-active" : ""}`}
            onClick={() => {
              if (isScrolling.current) return;
              isScrolling.current = true;
              setCurrentSection(i);
              setTimeout(() => (isScrolling.current = false), 1000);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
