// src/pages/AllBeersPage.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=200&q=80";

const FALLBACK_BEERS = [
  {
    _id: "5d79207b86f38c35b0028b7a",
    name: "Buzz",
    tagline: "A Real Bitter Experience.",
    contributed_by: "Sam Mason",
    image_url: PLACEHOLDER_IMAGE,
  },
  {
    _id: "5d79207b86f38c35b0028b7b",
    name: "Trashy Blonde",
    tagline: "You Know You Shouldn't",
    contributed_by: "Trashy Blonde",
    image_url: PLACEHOLDER_IMAGE,
  },
  {
    _id: "5d79207b86f38c35b0028b7c",
    name: "Pilsen Lager",
    tagline: "Unleash the Yeast Series.",
    contributed_by: "Pilsen Lager",
    image_url: PLACEHOLDER_IMAGE,
  },
];

function AllBeersPage() {
  const [beers, setBeers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Load ALL beers once when component mounts
  useEffect(() => {
    axios
      .get("https://ih-beers-api2.fly.dev/beers")
      .then((res) => {
        console.log(" [Tier 1 Success] Master list loaded:", res.data);
        setBeers(res.data);
        setLoading(false);
      })
      .catch((err1) => {
        console.warn(" Tier 1 failed. Loading from Tier 2 (json-server)...", err1);
        axios
          .get("http://localhost:5005/beers")
          .then((res) => {
            console.log(" [Tier 2 Success] Master list loaded locally:", res.data);
            setBeers(res.data);
            setLoading(false);
          })
          .catch((err2) => {
            console.warn(" Tier 2 failed. Loading Tier 3 fallback dataset.", err2);
            setBeers(FALLBACK_BEERS);
            setLoading(false);
          });
      });
  }, []); // Runs ONCE on mount

  // Filter in memory from the loaded master list
  const filteredBeers = beers.filter((beer) => {
    const q = searchQuery.toLowerCase();
    const nameMatch = beer.name ? beer.name.toLowerCase().includes(q) : false;
    const taglineMatch = beer.tagline ? beer.tagline.toLowerCase().includes(q) : false;
    return nameMatch || taglineMatch;
  });

  if (loading) {
    return (
      <div>
        <Header />
        <p style={{ textAlign: "center", marginTop: "40px", color: "#666" }}>
          Loading beers...
        </p>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "sans-serif", backgroundColor: "#fff", minHeight: "100vh" }}>
      <Header />

      <div style={{ maxWidth: "500px", margin: "0 auto", padding: "15px 15px 0" }}>
        {/* Search Input Bar */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: "bold", fontSize: "14px", display: "block", marginBottom: "5px" }}>
            Search Beers
          </label>
          <input
            type="text"
            placeholder="Type a beer name or tagline..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              boxSizing: "border-box",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          />
        </div>

        {/* No Matches Found */}
        {filteredBeers.length === 0 && (
          <p style={{ textAlign: "center", marginTop: "20px", color: "#888" }}>
            No beers match "{searchQuery}"
          </p>
        )}

        {/* Render Filtered List */}
        {filteredBeers.map((beer, index) => (
          <div
            key={beer._id || beer.id || index}
            style={{
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid #e0e0e0",
              padding: "20px 0",
            }}
          >
            {/* Beer Image */}
            <div
              style={{
                width: "100px",
                display: "flex",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <img
                src={beer.image_url || PLACEHOLDER_IMAGE}
                alt={beer.name}
                style={{
                  height: "120px",
                  maxHeight: "120px",
                  maxWidth: "80px",
                  objectFit: "contain",
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = PLACEHOLDER_IMAGE;
                }}
              />
            </div>

            {/* Beer Details */}
            <div style={{ marginLeft: "20px", flexGrow: 1 }}>
              <h2 style={{ margin: "0 0 8px 0", fontSize: "22px", fontWeight: "400" }}>
                <Link
                  to={`/beers/${beer._id || beer.id}`}
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  {beer.name}
                </Link>
              </h2>

              <p
                style={{
                  margin: "0 0 10px 0",
                  color: "#999",
                  fontSize: "15px",
                  fontWeight: "400",
                }}
              >
                {beer.tagline}
              </p>

              <p style={{ margin: 0, fontSize: "12px", color: "#000" }}>
                <span style={{ fontWeight: "bold" }}>Created by:</span>{" "}
                {beer.contributed_by
                  ? beer.contributed_by.split("<")[0].trim()
                  : beer.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllBeersPage;