import { useEffect, useState } from "react";
import "./baseModel.css"

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

function Modal({ open, onClose, originRect, setCanScroll, children }) {
  const [phase, setPhase] = useState("from");

  useEffect(() => {
    if (!open) return;
    setCanScroll?.(false);
    setPhase("from");
    const t = requestAnimationFrame(() => {
      requestAnimationFrame(() => setPhase("to"));
    });
    return () => cancelAnimationFrame(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleClose = () => {
    setPhase("from");
    setCanScroll?.(true);
    setTimeout(onClose, 420);
  };

  const getModalStyle = () => {
    if (!originRect || phase === "to") return {};
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const dx = (originRect.left + originRect.width / 2) - vw / 2;
    const dy = (originRect.top + originRect.height / 2) - vh / 2;
    const scaleX = originRect.width / Math.min(vw * 0.48, 620);
    const scaleY = originRect.height / (vh * 0.88);
    const scale = Math.min(scaleX, scaleY);
    return {
      transform: `translate(${dx}px, ${dy}px) scale(${scale}) rotate(-4deg)`,
      opacity: 0,
    };
  };

  if (!open) return null;

  return (
    <div
      className={`modal-backdrop modal-backdrop--${phase}`}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div
        className={`modal modal--${phase}`}
        style={getModalStyle()}
        role="dialog"
        aria-modal="true"
      >
        <button className="modal__close" onClick={handleClose} aria-label="Close">
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
