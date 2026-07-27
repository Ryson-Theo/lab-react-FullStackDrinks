// src/pages/AddBeerPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=200&q=80";

function AddBeerPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    description: "",
    first_brewed: "",
    brewers_tips: "",
    attenuation_level: 0,
    contributed_by: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Attach a default image_url for local storage
    const payload = {
      ...formData,
      image_url: PLACEHOLDER_IMAGE,
    };

    //  Tier 1: Try official remote POST endpoint
    axios
      .post("https://ih-beers-api2.fly.dev/beers/new", payload)
      .then(() => {
        console.log(" [Tier 1 Success] Beer created on remote API");
        navigate("/beers");
      })
      .catch((primaryError) => {
        console.warn("  Tier 1 POST failed. Attempting Tier 2 (json-server)...", primaryError);

        //  Tier 2: Try local json-server POST endpoint
        axios
          .post("http://localhost:5005/beers", payload)
          .then(() => {
            console.log("[Tier 2 Success] Beer created on local json-server");
            navigate("/beers");
          })
          .catch((secondaryError) => {
            console.warn(
              " Tier 2 POST failed. Navigating back gracefully.",
              secondaryError
            );
            
            navigate("/beers");
          });
      });
  };

  return (
    <div>
      <Header />
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          maxWidth: "400px",
          margin: "20px auto",
          padding: "0 15px",
          fontFamily: "sans-serif",
        }}
      >
        <label style={{ fontWeight: "bold", fontSize: "14px" }}>
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "4px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </label>

        <label style={{ fontWeight: "bold", fontSize: "14px" }}>
          Tagline
          <input
            type="text"
            name="tagline"
            value={formData.tagline}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "4px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </label>

        <label style={{ fontWeight: "bold", fontSize: "14px" }}>
          Description
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            style={{ width: "100%", padding: "8px", marginTop: "4px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </label>

        <label style={{ fontWeight: "bold", fontSize: "14px" }}>
          First Brewed
          <input
            type="text"
            name="first_brewed"
            value={formData.first_brewed}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "4px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </label>

        <label style={{ fontWeight: "bold", fontSize: "14px" }}>
          Brewers Tips
          <input
            type="text"
            name="brewers_tips"
            value={formData.brewers_tips}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "4px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </label>

        <label style={{ fontWeight: "bold", fontSize: "14px" }}>
          Attenuation Level
          <input
            type="number"
            name="attenuation_level"
            value={formData.attenuation_level}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "4px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </label>

        <label style={{ fontWeight: "bold", fontSize: "14px" }}>
          Contributed By
          <input
            type="text"
            name="contributed_by"
            value={formData.contributed_by}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "4px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </label>

        <button
          type="submit"
          style={{
            backgroundColor: "#3dc4fc",
            color: "white",
            padding: "12px",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
            marginTop: "10px",
            fontWeight: "bold",
          }}
        >
          ADD NEW
        </button>
      </form>
    </div>
  );
}

export default AddBeerPage;