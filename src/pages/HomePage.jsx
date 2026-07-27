// src/pages/HomePage.jsx
import { Link } from "react-router-dom";
import beersImg from "../assets/beers.png";
import randomBeerImg from "../assets/random-beer.png";
import newBeerImg from "../assets/new-beer.png";

function HomePage() {
  const cardStyle = {
    textDecoration: "none",
    color: "#333",
    display: "block",
    marginBottom: "20px",
  };

  const textContainerStyle = {
    padding: "0 15px",
  };

  const paragraphStyle = {
    color: "#999",
    fontSize: "14px",
    lineHeight: "1.4",
    marginTop: "5px",
  };

  return (
    <div style={{ maxWidth: "450px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <Link to="/beers" style={cardStyle}>
        <img src={beersImg} alt="All Beers" style={{ width: "100%", display: "block" }} />
        <div style={textContainerStyle}>
          <h2 style={{ fontSize: "24px", margin: "10px 0 0", fontWeight: "normal" }}>All Beers</h2>
          <p style={paragraphStyle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pharetra egestas lectus, sit amet eleifend ex tincidunt in. Nam dictum arcu ut dignissim varius.
          </p>
        </div>
      </Link>

      <Link to="/random-beer" style={cardStyle}>
        <img src={randomBeerImg} alt="Random Beer" style={{ width: "100%", display: "block" }} />
        <div style={textContainerStyle}>
          <h2 style={{ fontSize: "24px", margin: "10px 0 0", fontWeight: "normal" }}>Random Beer</h2>
          <p style={paragraphStyle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pharetra egestas lectus, sit amet eleifend ex tincidunt in. Nam dictum arcu ut dignissim varius.
          </p>
        </div>
      </Link>

      <Link to="/new-beer" style={cardStyle}>
        <img src={newBeerImg} alt="New Beer" style={{ width: "100%", display: "block" }} />
        <div style={textContainerStyle}>
          <h2 style={{ fontSize: "24px", margin: "10px 0 0", fontWeight: "normal" }}>New Beer</h2>
          <p style={paragraphStyle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pharetra egestas lectus, sit amet eleifend ex tincidunt in. Nam dictum arcu ut dignissim varius.
          </p>
        </div>
      </Link>
    </div>
  );
}

export default HomePage;