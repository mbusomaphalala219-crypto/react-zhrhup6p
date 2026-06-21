     import React, { useState } from "react";

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://formspree.io/f/mpqgawpa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0A0A0A",
        color: "white",
        fontFamily: "sans-serif",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "48px", marginBottom: "10px" }}>LIKE ❤️</h1>
      <p style={{ fontSize: "18px", marginBottom: "10px" }}>No words. Just love.</p>
      <p style={{ maxWidth: "500px", margin: "0 auto 30px", opacity: 0.7 }}>
        A social network where the only interaction is a like. No comments. No followers. No dislikes. Every post competes on a leaderboard that resets every 24 hours.
      </p>

      {!submitted ? (
        !showForm ? (
          <button
            onClick={() => setShowForm(true)}
            style={{
              background: "white",
              color: "black",
              border: "none",
              borderRadius: "30px",
              padding: "14px 32px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Join Waitlist
          </button>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "inline-block" }}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{
                padding: "12px 16px",
                borderRadius: "20px",
                border: "1px solid #555",
                marginRight: "8px",
                background: "#111",
                color: "white",
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                background: "white",
                color: "black",
                border: "none",
                borderRadius: "20px",
                padding: "12px 24px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {loading ? "..." : "Submit"}
            </button>
            {error && <p style={{ color: "salmon", marginTop: "10px" }}>{error}</p>}
          </form>
        )
      ) : (
        <p style={{ color: "lightgreen", fontWeight: "bold", fontSize: "18px" }}>
          You're on the list!
        </p>
      )}
    </div>
  );
}                                                                                                                                                                                                                                                                                                                                                 