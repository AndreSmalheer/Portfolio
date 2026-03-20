import { useEffect, useRef, useState } from "react";
import "./ProjectModal.css";

const ExternalLink = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const GithubIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

function ProjectModal({ project, originRect, onClose }) {
  const modalRef = useRef(null);
  const [phase, setPhase] = useState("from");

  useEffect(() => {
    if (!project) return;
    setPhase("from");
    const t = requestAnimationFrame(() => {
      requestAnimationFrame(() => setPhase("to"));
    });
    return () => cancelAnimationFrame(t);
  }, [project]);

  useEffect(() => {
    const handler = (e) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleClose = () => {
    setPhase("from");
    setTimeout(onClose, 420);
  };

  const onBackdropClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  if (!project) return null;

  const getModalStyle = () => {
    if (!originRect || phase === "to") return {};

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const cardCenterX = originRect.left + originRect.width / 2;
    const cardCenterY = originRect.top + originRect.height / 2;

    const screenCenterX = vw / 2;
    const screenCenterY = vh / 2;

    const dx = cardCenterX - screenCenterX;
    const dy = cardCenterY - screenCenterY;

    const scaleX = originRect.width / Math.min(vw * 0.48, 620);
    const scaleY = originRect.height / (vh * 0.88);
    const scale = Math.min(scaleX, scaleY);

    return {
      transform: `translate(${dx}px, ${dy}px) scale(${scale}) rotate(-4deg)`,
      opacity: 0,
    };
  };

  return (
    <div
      className={`modal-backdrop modal-backdrop--${phase}`}
      onClick={onBackdropClick}
    >
      <div
        className={`modal modal--${phase}`}
        ref={modalRef}
        style={getModalStyle()}
        role="dialog"
        aria-modal="true"
      >
        <button className="modal__close" onClick={handleClose} aria-label="Close modal">
          <CloseIcon />
        </button>

        <div className="modal__color-block" style={{ backgroundColor: project.color }} />

        <div className="modal__body">
          <h2 className="modal__title">{project.title}</h2>
          <p className="modal__desc">{project.description}</p>

          <div className="modal__tags">
            {project.tags.map((tag) => (
              <span key={tag} className="modal__tag">{tag}</span>
            ))}
          </div>

          <div className="modal__links">
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="modal__link modal__link--live">
                <ExternalLink /> Live site
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="modal__link modal__link--github">
                <GithubIcon /> View code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;
