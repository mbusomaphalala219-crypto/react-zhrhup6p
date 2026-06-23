import { useState } from "react";

const INITIAL_POSTS = [
  { id: 1, user: "solange.wav", avatar: "S", avatarColor: "#FF3CAC", bg: "linear-gradient(135deg,#FF3CAC 0%,#784BA0 50%,#2B86C5 100%)", caption: "golden hour never misses", likes: 48200, liked: false, trendRank: 1, timeLeft: "4h left" },
  { id: 2, user: "kai.renders", avatar: "K", avatarColor: "#00F5D4", bg: "linear-gradient(135deg,#0D0D0D 0%,#1a1a2e 50%,#16213e 100%)", caption: "3am creative mode", likes: 31500, liked: false, trendRank: 2, timeLeft: "6h left" },
  { id: 3, user: "zuri.jpeg", avatar: "Z", avatarColor: "#FFD60A", bg: "linear-gradient(135deg,#FFD60A 0%,#FF6B35 100%)", caption: "summer energy only", likes: 22900, liked: false, trendRank: 3, timeLeft: "11h left" },
  { id: 4, user: "nova.clips", avatar: "N", avatarColor: "#7B2FBE", bg: "linear-gradient(135deg,#7B2FBE 0%,#CB49EC 50%,#FF9CEE 100%)", caption: "they said it couldn't be done", likes: 18700, liked: false, trendRank: 4, timeLeft: "14h left" },
  { id: 5, user: "drift.boy", avatar: "D", avatarColor: "#FF3CAC", bg: "linear-gradient(135deg,#1a1a2e 0%,#FF3CAC 100%)", caption: "vibes on vibes on vibes", likes: 9300, liked: false, trendRank: 5, timeLeft: "20h left" }
];

function fmt(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return n;
}

function PostCard(props) {
  const post = props.post;
  const onLike = props.onLike;
  const [animating, setAnimating] = useState(false);

  function handleLike() {
    if (post.liked) return;
    setAnimating(true);
    setTimeout(function () { setAnimating(false); }, 300);
    onLike(post.id);
  }

  return (
    <div style={{ background: "#111", borderRadius: 20, overflow: "hidden", marginBottom: 14, border: "1.5px solid rgba(255,255,255,0.08)", position: "relative" }}>
      {post.trendRank <= 3 ? (
        <div style={{ position: "absolute", top: 10, left: 10, zIndex: 10, background: "rgba(255,60,172,0.9)", borderRadius: 20, padding: "3px 9px", fontSize: 10, fontWeight: 700, color: "#fff" }}>
            #{post.trendRank} TRENDING
        </div>
      ) : null}

      <div style={{ height: 240, background: post.bg }}></div>

      <div style={{ padding: "13px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: post.avatarColor, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: "#000" }}>
            {post.avatar}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>@{post.user}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>{post.caption}</div>
          </div>
        </div>
        <button onClick={handleLike} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, transform: animating ? "scale(1.3)" : "scale(1)" }}>
          <div style={{ fontSize: 24 }}>{post.liked ? "❤️" : "🤍"}</div>
          <div style={{ fontSize: 11, fontWeight: 800, color: post.liked ? "#FF3CAC" : "rgba(255,255,255,0.45)" }}>
            {fmt(post.likes)}
          </div>
        </button>
      </div>
    </div>
  );
}

function AppDemo(props) {
  const onExit = props.onExit;
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [tab, setTab] = useState("feed");

  function handleLike(id) {
    setPosts(function (prev) {
      return prev.map(function (p) {
        if (p.id === id && !p.liked) {
          return Object.assign({}, p, { liked: true, likes: p.likes + 1 });
        }
        return p;
      });
    });
  }

  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh", width: "100%", fontFamily: "sans-serif", position: "relative", boxSizing: "border-box" }}>
      <div style={{ position: "fixed", top: 8, left: "50%", transform: "translateX(-50%)", zIndex: 500, background: "rgba(255,214,10,0.15)", border: "1px solid rgba(255,214,10,0.4)", borderRadius: 20, padding: "5px 12px", display: "flex", gap: 8, alignItems: "center" }}>
        <span style={{ fontSize: 10, fontWeight: 800, color: "#FFD60A" }}>PREVIEW - TAP AROUND</span>
        <button onClick={onExit} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 10, textDecoration: "underline" }}>exit</button>
      </div>

      <div style={{ padding: "52px 18px 0", position: "sticky", top: 0, background: "rgba(10,10,10,0.96)", zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ fontSize: 24, fontWeight: 900, color: "#FF3CAC" }}>LIKE</div>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#FF3CAC", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#fff" }}>Y</div>
        </div>
        <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <button onClick={function () { setTab("feed"); }} style={{ flex: 1, background: "none", border: "none", padding: "9px 0", fontSize: 11, fontWeight: 700, color: tab === "feed" ? "#FF3CAC" : "rgba(255,255,255,0.3)" }}>FEED</button>
          <button onClick={function () { setTab("board"); }} style={{ flex: 1, background: "none", border: "none", padding: "9px 0", fontSize: 11, fontWeight: 700, color: tab === "board" ? "#FF3CAC" : "rgba(255,255,255,0.3)" }}>BOARD</button>
          <button onClick={function () { setTab("profile"); }} style={{ flex: 1, background: "none", border: "none", padding: "9px 0", fontSize: 11, fontWeight: 700, color: tab === "profile" ? "#FF3CAC" : "rgba(255,255,255,0.3)" }}>PROFILE</button>
        </div>
      </div>

      <div style={{ padding: "16px 16px 40px" }}>
        {tab === "feed" ? (
          <div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textAlign: "center", marginBottom: 14 }}>Tap the heart on any post to try it</div>
            {posts.map(function (p) {
              return <PostCard key={p.id} post={p} onLike={handleLike} />;
            })}
          </div>
        ) : null}

        {tab === "board" ? (
          <div>
            <div style={{ fontSize: 20, fontWeight: 900, color: "#fff", marginBottom: 16 }}>Today's Board</div>
            {posts.map(function (post, i) {
              return (
                <div key={post.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontSize: 13, width: 24, color: "rgba(255,255,255,0.4)", fontWeight: 700 }}>#{i + 1}</div>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: post.avatarColor, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#000" }}>{post.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>@{post.user}</div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: i === 0 ? "#FF3CAC" : "#fff" }}>{fmt(post.likes)}</div>
                </div>
              );
            })}
          </div>
        ) : null}

        {tab === "profile" ? (
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#FF3CAC", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 28, color: "#fff", margin: "0 auto 12px" }}>Y</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: "#fff" }}>@you</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 6 }}>This could be you, once LIKE launches</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    fetch("https://formspree.io/f/mpqgawpa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email })
    })
      .then(function (response) {
        if (response.ok) {
          setSubmitted(true);
        } else {
          setError("Something went wrong. Please try again.");
        }
      })
      .catch(function () {
        setError("Something went wrong. Please try again.");
      })
      .finally(function () {
        setLoading(false);
      });
  }

  if (submitted) {
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>❤️</div>
        <div style={{ fontSize: 16, fontWeight: 800, color: "lightgreen" }}>You're on the list!</div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 340, margin: "0 auto" }}>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="email"
          required
          value={email}
          onChange={function (e) { setEmail(e.target.value); }}
          placeholder="your@email.com"
          style={{ flex: 1, background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(255,255,255,0.15)", borderRadius: 14, padding: "13px 14px", fontSize: 14, color: "#fff" }}
        />
        <button type="submit" disabled={loading} style={{ background: "#FF3CAC", border: "none", borderRadius: 14, padding: "13px 18px", fontSize: 13, fontWeight: 800, color: "#fff" }}>
          {loading ? "..." : "Join"}
        </button>
      </div>
      {error ? <div style={{ fontSize: 11, color: "salmon", marginTop: 8, textAlign: "center" }}>{error}</div> : null}
    </form>
  );
}

function Landing(props) {
  const onTryDemo = props.onTryDemo;
  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh", width: "100%", fontFamily: "sans-serif", padding: "70px 24px 50px", textAlign: "center", boxSizing: "border-box" }}>
      <div style={{ fontSize: 56, fontWeight: 900, color: "#fff", marginBottom: 4 }}>LIKE ❤️</div>
      <div style={{ fontSize: 16, color: "#fff", fontWeight: 700, marginBottom: 12 }}>No words. Just love.</div>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, maxWidth: 320, margin: "0 auto 32px" }}>
        A social network where the only interaction is a like. No comments. No followers. No dislikes. Every post competes on a leaderboard that resets every 24 hours.
      </p>

      <button onClick={onTryDemo} style={{ background: "#FF3CAC", border: "none", borderRadius: 50, padding: "16px 36px", fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 14 }}>
        Try the app now
      </button>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 36 }}>Real feed. Real leaderboard. Tap around for yourself.</div>

      <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.1)", marginBottom: 28 }}></div>

      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontWeight: 700, marginBottom: 16 }}>Want first access when it fully launches?</div>
      <WaitlistForm />
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("landing");

  if (view === "demo") {
    return <AppDemo onExit={function () { setView("landing"); }} />;
  }
  return <Landing onTryDemo={function () { setView("demo"); }} />;
}