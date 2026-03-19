import "./Header.css";
import { useEffect, useState } from "react";

function Header({ shrink, onNavClick }) {
  const [activeItem, setActiveItem] = useState("Home");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNav = (item) => {
    setActiveItem(item);
    if (onNavClick) onNavClick(item);
  };

  return (
    <div className={`header-wrapper ${shrink ? "header-wrapper--scrolled" : ""}`}>
      <div className={`header ${mounted ? "header--mounted" : ""}`}>
        <div className="header-left">
          <div className="header-logo-wrapper">
            <img className="header-logo" alt="Logo" />
          </div>
          <h1 className="header-title">Andre Smalheer</h1>
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
      </div>
    </div>
  );
}

export default Header;
    