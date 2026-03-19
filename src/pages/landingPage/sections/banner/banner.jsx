import "./banner.css";

function Banner({ onArrowClick }) {
  return (
    <div className="banner-wrapper">
      <div className="banner"></div>
      <div className="down-arrow" onClick={onArrowClick}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 5v14M5 12l7 7 7-7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

export default Banner;
