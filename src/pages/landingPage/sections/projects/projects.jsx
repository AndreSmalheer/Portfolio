import { useState, useEffect, useRef } from "react";
import "./projects.css";
import ProjectModal from "../../../../components/ProjectModel/ProjectModal";

const projects = [
  {
    id: 1,
    title: "Aurora Dashboard",
    description: "A real-time analytics platform with live data visualisation, customisable widgets, and role-based access control.",
    tags: ["React", "TypeScript", "D3.js", "Node.js"],
    color: "#dce8f5",
    live: "https://example.com",
    github: "https://github.com",
  },
  {
    id: 2,
    title: "Nomad",
    description: "A travel planning app that generates AI-powered itineraries, maps routes, and tracks your journeys.",
    tags: ["Next.js", "Tailwind", "OpenAI", "Mapbox"],
    color: "#d9eee4",
    live: "https://example.com",
    github: "https://github.com",
  },
  {
    id: 3,
    title: "Pulse",
    description: "A minimal habit tracker with streak visualisation, smart reminders, and weekly reflection prompts.",
    tags: ["React Native", "Expo", "SQLite", "Reanimated"],
    color: "#ede8f7",
    live: null,
    github: "https://github.com",
  },
  {
    id: 4,
    title: "Ledger",
    description: "A personal finance app with expense categorisation, budget forecasting, and CSV export.",
    tags: ["Vue 3", "Pinia", "Chart.js", "Supabase"],
    color: "#fdefd8",
    live: "https://example.com",
    github: "https://github.com",
  },
  {
    id: 5,
    title: "Spektr",
    description: "A generative art tool that turns audio input into dynamic, exportable visual compositions.",
    tags: ["Three.js", "Web Audio API", "GLSL", "Vite"],
    color: "#fde0e0",
    live: "https://example.com",
    github: "https://github.com",
  },
  {
    id: 6,
    title: "Relay",
    description: "A team communication tool with threaded messaging, file sharing, and smart notification grouping.",
    tags: ["React", "Socket.io", "Redis", "PostgreSQL"],
    color: "#e0eef8",
    live: null,
    github: "https://github.com",
  },
];

const ArrowLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);
const ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);
const ExternalLink = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);
const GithubIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const DRAG_THRESHOLD = 50;

function Projects() {
  const [active, setActive] = useState(0);
  const [contentVisible, setContentVisible] = useState(true);
  const [modalProject, setModalProject] = useState(null);
  const [modalOrigin, setModalOrigin] = useState(null);
  const animating = useRef(false);
  const animTimeout = useRef(null);
  const contentTimeout = useRef(null);

  const dragStart = useRef(null);
  const stageRef = useRef(null);

  const navigate = (dir) => {
    const next = active + dir;
    if (next < 0 || next >= projects.length || animating.current) return;
    animating.current = true;

    setContentVisible(false);
    contentTimeout.current = setTimeout(() => {
      setActive(next);
      animTimeout.current = setTimeout(() => {
        animating.current = false;
        setContentVisible(true);
      }, 380);
    }, 130);
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active]);

  useEffect(() => () => {
    clearTimeout(animTimeout.current);
    clearTimeout(contentTimeout.current);
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const onTouchStart = (e) => {
      dragStart.current = e.touches[0].clientX;
    };
    const onTouchEnd = (e) => {
      if (dragStart.current === null) return;
      const delta = dragStart.current - e.changedTouches[0].clientX;
      dragStart.current = null;
      if (Math.abs(delta) < DRAG_THRESHOLD) return;
      navigate(delta > 0 ? 1 : -1);
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [active]);

  const getStyle = (i) => {
    const offset = i - active;
    const abs = Math.abs(offset);
    if (abs > 2) return { display: "none" };

    const xSteps   = [0, 290, 520];
    const scales   = [1, 0.80, 0.64];
    const opacities = [1, 0.45, 0.2];

    const x = offset < 0 ? -xSteps[abs] : xSteps[abs];

    return {
      transform: `translateX(${x}px) scale(${scales[abs]})`,
      opacity: opacities[abs],
      zIndex: 10 - abs,
      pointerEvents: abs === 0 ? "all" : "none",
    };
  };

  const current = projects[active];

  return (
    <div className="projects-page">
      <div className="projects-section">

        <div className="carousel">
          <div
            className="carousel__stage"
            ref={stageRef}
            onMouseDown={(e) => { dragStart.current = e.clientX; }}
            onMouseUp={(e) => {
              if (dragStart.current === null) return;
              const delta = dragStart.current - e.clientX;
              dragStart.current = null;
              if (Math.abs(delta) < DRAG_THRESHOLD) return;
              navigate(delta > 0 ? 1 : -1);
            }}
          >
            {projects.map((p, i) => {
              const offset = i - active;
              if (Math.abs(offset) > 2) return null;
              return (
                <div
                  key={p.id}
                  className="carousel__card"
                  style={getStyle(i)}
                  onClick={(e) => {
                    if (offset !== 0) navigate(offset > 0 ? 1 : -1);
                    else {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setModalOrigin(rect);
                      setModalProject(projects[i]);
                    }
                  }}
                >
                  <div className="carousel__card-color" style={{ backgroundColor: p.color }} />
                </div>
              );
            })}
          </div>
        </div>

        <div className={`carousel__info${contentVisible ? " carousel__info--visible" : ""}`}>
          <h3 className="carousel__title">{current.title}</h3>
          <p className="carousel__desc">{current.description}</p>
          <div className="carousel__tags">
            {current.tags.map((tag) => (
              <span key={tag} className="carousel__tag">{tag}</span>
            ))}
          </div>
          <div className="carousel__links">
            {current.live && (
              <a href={current.live} target="_blank" rel="noopener noreferrer" className="carousel__link carousel__link--live">
                <ExternalLink /> Live
              </a>
            )}
            {current.github && (
              <a href={current.github} target="_blank" rel="noopener noreferrer" className="carousel__link carousel__link--github">
                <GithubIcon /> GitHub
              </a>
            )}
          </div>
        </div>


        <div className="carousel__dot-nav">
          <button
            className={`projects-arrow projects-arrow--left${active > 0 ? " projects-arrow--visible" : ""}`}
            onClick={() => navigate(-1)}
            aria-label="Previous project"
          >
            <ArrowLeft />
          </button>

          <div className="carousel__dots">
            {projects.map((_, i) => (
              <button
                key={i}
                className={`carousel__dot${i === active ? " carousel__dot--active" : ""}`}
                onClick={() => { const d = i - active; if (d !== 0) navigate(d > 0 ? 1 : -1); }}
                aria-label={`Project ${i + 1}`}
              />
            ))}
          </div>

          <button
            className={`projects-arrow projects-arrow--right${active < projects.length - 1 ? " projects-arrow--visible" : ""}`}
            onClick={() => navigate(1)}
            aria-label="Next project"
          >
            <ArrowRight />
          </button>
        </div>

      </div>

      <ProjectModal
        project={modalProject}
        originRect={modalOrigin}
        onClose={() => { setModalProject(null); setModalOrigin(null); }}
      />
    </div>
  );
}

export default Projects;
