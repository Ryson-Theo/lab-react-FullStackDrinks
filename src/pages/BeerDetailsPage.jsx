// src/pages/BeerDetailsPage.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=200&q=80";

const FALLBACK_BEERS = [
  {
    _id: "5d79207b86f38c35b0028b7a",
    name: "Buzz",
    tagline: "A Real Bitter Experience.",
    first_brewed: "09/2007",
    description: "A light, crisp and bitter IPA brewed with German hops.",
    attenuation_level: 75,
    brewers_tips: "Be careful not to over extract the tea leaves.",
    contributed_by: "Sam Mason",
    image_url: PLACEHOLDER_IMAGE,
  },
  {
    _id: "5d79207b86f38c35b0028b7b",
    name: "Trashy Blonde",
    tagline: "You Know You Shouldn't",
    first_brewed: "04/2008",
    description: "A titillating, neurotic, malt forward pale ale.",
    attenuation_level: 76,
    brewers_tips: "Be careful not to over extract the tea leaves.",
    contributed_by: "Trashy Blonde",
    image_url: PLACEHOLDER_IMAGE,
  },
  {
    _id: "5d79207b86f38c35b0028b7c",
    name: "Pilsen Lager",
    tagline: "Unleash the Yeast Series.",
    first_brewed: "09/2013",
    description: "Our Pilsen Lager is a classic crisp craft lager.",
    attenuation_level: 72,
    brewers_tips: "Keep fermentation temperatures cold.",
    contributed_by: "Pilsen Lager",
    image_url: PLACEHOLDER_IMAGE,
  },
];

function BeerDetailsPage() {
  const { beerId } = useParams();
  const [beer, setBeer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //  Tier 1: Attempt the official remote API endpoint
    axios
      .get(`https://ih-beers-api2.fly.dev/beers/${beerId}`)
      .then((res) => {
        console.log("[Tier 1 Success] Beer Details:", res.data);
        setBeer(res.data);
        setLoading(false);
      })
      .catch((primaryError) => {
        console.warn(" Tier 1 failed. Trying Tier 2 (json-server)...", primaryError);

        //  Tier 2: Attempt local json-server
        axios
          .get(`http://localhost:5005/beers/${beerId}`)
          .then((res) => {
            console.log("[Tier 2 Success] Beer Details:", res.data);
            setBeer(res.data);
            setLoading(false);
          })
          .catch((secondaryError) => {
            console.warn(" Tier 2 failed. Falling back to local static dataset.", secondaryError);

            //  Tier 3: Hardcoded static dataset match
            const matchedBeer =
              FALLBACK_BEERS.find((b) => b._id === beerId) || FALLBACK_BEERS[0];
            setBeer(matchedBeer);
            setLoading(false);
          });
      });
  }, [beerId]);

  if (loading) {
    return (
      <div>
        <Header />
        <p style={{ textAlign: "center", marginTop: "40px", color: "#666" }}>
          Loading...
        </p>
      </div>
    );
  }

  if (!beer) {
    return (
      <div>
        <Header />
        <p style={{ textAlign: "center", marginTop: "40px", color: "#666" }}>
          Beer not found.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
        <img
          src={beer.image_url || PLACEHOLDER_IMAGE}
          alt={beer.name}
          style={{ height: "200px", display: "block", margin: "0 auto 20px", objectFit: "contain" }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = PLACEHOLDER_IMAGE;
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <h2 style={{ margin: 0 }}>{beer.name}</h2>
          <span style={{ fontSize: "20px", color: "#888", fontWeight: "bold" }}>
            {beer.attenuation_level}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            color: "#888",
            margin: "10px 0",
          }}
        >
          <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "400" }}>{beer.tagline}</h3>
          <strong>{beer.first_brewed}</strong>
        </div>
        <p style={{ lineHeight: "1.5", color: "#333" }}>{beer.description}</p>
        <p style={{ color: "#888", fontSize: "14px" }}>
          <strong>
            {beer.contributed_by ? beer.contributed_by.split("<")[0].trim() : beer.name}
          </strong>
        </p>
      </div>
    </div>
  );
}

export default BeerDetailsPage;