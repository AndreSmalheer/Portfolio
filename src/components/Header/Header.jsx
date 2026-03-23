import "./Header.css";
import { useEffect, useState } from "react";
import { useRef } from "react";
import CvModal from "../Models/CvModel/CvModel";

const SECTION_TO_NAV = ["Home", "Work", "About", "Contact"];

function Header({ shrink, onNavClick, currentSection }) {
  const [activeItem, setActiveItem] = useState("Home");
  const [mounted, setMounted] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  const cvRef = useRef(null);
  const [originRect, setOriginRect] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 750);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
        setIsMobile(window.innerWidth < 750);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
   }, []);

  const handleCvClick = () => {
        if (cvRef.current) {
            const rect = cvRef.current.getBoundingClientRect();
            setOriginRect(rect);
        }
        setCvOpen(true);
    };

  useEffect(() => {
    if (SECTION_TO_NAV[currentSection]) {
      setActiveItem(SECTION_TO_NAV[currentSection]);
    }
  }, [currentSection]);

  const handleNav = (item) => {
    setActiveItem(item);
    if (onNavClick) onNavClick(item);
  };

  return (
    <>
      <div
        className={`header-wrapper ${shrink ? "header-wrapper--scrolled" : ""}`}
      >
        <div className={`header ${mounted ? "header--mounted" : ""}`}>
          <div className="header-left">
            <div className="header-logo-wrapper">
              <img
                className="header-logo"
                src="/icons/header-icon.png"
                alt="Logo"
              />
            </div>
            <h1 className="header-title">{`André ${isMobile ? "" : "Smalheer"}`}</h1>
          </div>
          <ul className="header-nav">
            {["Home", "Work", "About", "Contact"].map((item, i) => (
              <li
                key={item}
                className={`header-nav-item ${activeItem === item ? "active" : ""}`}
                style={{ "--i": i }}
                onClick={() => handleNav(item)}
              >
                <span className="nav-label">{item}</span>
              </li>
            ))}
          </ul>

          <div
            className="header-cv-container"
            ref={cvRef}
            onClick={handleCvClick}
          >
            <img
              className="header-cv-logo"
              src="/icons/cv-icon.svg"
              alt="CV logo"
            />

            <h1 className="header-cv-title">CV</h1>
          </div>
        </div>
      </div>

      <CvModal
        open={cvOpen}
        onClose={() => setCvOpen(false)}
        originRect={originRect}
      />
    </>
  );
}

export default Header;
