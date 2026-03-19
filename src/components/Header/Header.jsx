import "./Header.css";
import { useEffect, useState } from "react";

function Header() {
  const [activeItem, setActiveItem] = useState("Home");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
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
            onClick={() => setActiveItem(item)}
          >
            <span className="nav-label">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Header;
