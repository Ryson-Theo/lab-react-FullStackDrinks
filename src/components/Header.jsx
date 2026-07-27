// src/components/Header.jsx
import { Link } from "react-router-dom";

function Header() {
  return (
    <header
      style={{
        backgroundColor: "#3dc4fc",
        height: "60px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      </Link>
    </header>
  );
}

export default Header;