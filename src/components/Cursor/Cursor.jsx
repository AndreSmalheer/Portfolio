import { useEffect, useRef } from "react";
import "./cursor.css";

function Cursor() {
  const dotRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const onMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        dotRef.current.style.translate = `${pos.current.x}px ${pos.current.y}px`;
      });
    };

    const onMouseDown = () => { dotRef.current.style.scale = "0.6"; };
    const onMouseUp = () => { dotRef.current.style.scale = "1"; };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <div className="cursor-dot" ref={dotRef} />;
}

export default Cursor;
