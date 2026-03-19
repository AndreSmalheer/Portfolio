import { useEffect, useState } from "react";
import "./LoadingScreen.css";

function LoadingScreen({ NextPage }) {
  const [fadingOut, setFadingOut] = useState(false);
  const [done, setDone] = useState(false);
  const [showNext, setShowNext] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadingOut(true), 2800);
    const doneTimer = setTimeout(() => setDone(true), 3700);
    const nextTimer = setTimeout(() => setShowNext(true), 3800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
      clearTimeout(nextTimer);
    };
  }, []);

  if (done && showNext) {
    return (
      <div className="next-page">
        <div className="next-page-inner">
          <NextPage />
        </div>
      </div>
    );
  }

  return (
    <div className={`loading-container${fadingOut ? " fade-out" : ""}`}>
      <div className="loading-text">
        <h1 className="typewriter" style={{ "--chars": 3 }}>
          Hoi<span className="dot-char">.</span>
        </h1>
      </div>
    </div>
  );
}

export default LoadingScreen;
