import { useEffect, useRef, useState } from "react";
import "./cursor.css";

function Cursor() {
  const dotRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const lastInputWasTouch = useRef(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onTouch = () => {
      lastInputWasTouch.current = true;
      setVisible(false);
    };

    const onMouseMove = (e) => {
      if (lastInputWasTouch.current) {
        lastInputWasTouch.current = false;
        return;
      }
      setVisible(true);
      pos.current = { x: e.clientX, y: e.clientY };
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (dotRef.current) {
          dotRef.current.style.translate = `${pos.current.x}px ${pos.current.y}px`;
        }
      });
    };

    const onMouseDown = () => { if (dotRef.current) dotRef.current.style.scale = "0.6"; };
    const onMouseUp = () => { if (dotRef.current) dotRef.current.style.scale = "1"; };

    window.addEventListener("touchstart", onTouch);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!visible) return null;

  return <div className="cursor-dot" ref={dotRef} />;
}

export default Cursor;
