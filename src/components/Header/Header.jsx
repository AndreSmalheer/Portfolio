import "./Header.css";
import { useEffect, useState } from "react";

function Header() {
  const [activeItem, setActiveItem] = useState("Home");
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
    setMounted(true);

    let timeout;
    const onScroll = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
        setScrolled(window.scrollY > 20);
        }, 50);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
        window.removeEventListener("scroll", onScroll);
        clearTimeout(timeout);
    };
    }, []);

  return (
    <div className={`header-wrapper ${scrolled ? "header-wrapper--scrolled" : ""}`}>
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
    </div>
  );
}

export default Header;
