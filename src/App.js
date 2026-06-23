import { useState } from "react";

const INITIAL_POSTS = [
  { id: 1, user: "solange.wav", avatar: "S", caption: "golden hour never misses", likes: 48200, liked: false, trendRank: 1, timeLeft: "4h left" },
  { id: 2, user: "kai.renders", avatar: "K", caption: "3am creative mode", likes: 31500, liked: false, trendRank: 2, timeLeft: "6h left" },
  { id: 3, user: "zuri.jpeg", avatar: "Z", caption: "summer energy only", likes: 22900, liked: false, trendRank: 3, timeLeft: "11h left" },
  { id: 4, user: "nova.clips", avatar: "N", caption: "they said it couldn't be done", likes: 18700, liked: false, trendRank: 4, timeLeft: "14h left" },
  { id: 5, user: "drift.boy", avatar: "D", caption: "vibes on vibes on vibes", likes: 9300, liked: false, trendRank: 5, timeLeft: "20h left" }
];

function fmt(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return n;
}

function getTheme(isDark) {
  return {
    bg: isDark ? "#000000" : "#FFFFFF",
    cardBg: isDark ? "#111111" : "#F5F5F5",
    text: isDark ? "#FFFFFF" : "#000000",
    textMuted: isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)",
    textFaint: isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)",
    border: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
    avatarBg: isDark ? "#FFFFFF" : "#000000",
    avatarText: isDark ? "#000000" : "#FFFFFF",
    accent: isDark ? "#FFFFFF" : "#000000",
    accentText: isDark ? "#000000" : "#FFFFFF",
    inputBg: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"
  };
}

function ThemeToggle(props) {
  const isDark = props.isDark;
  const onToggle = props.onToggle;
  const t = getTheme(isDark);
  return (
    <button onClick={onToggle} style={{ background: t.cardBg, border: "1px solid " + t.border, borderRadius: 20, padding: "6px 12px", display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 12, fontWeight: 700, color: t.text }}>
      {isDark ? "Light" : "Dark"}
    </button>
  );
}

function PostCard(props) {
  const post = props.post;
  const onLike = props.onLike;
  const t = props.theme;
  const [animating, setAnimating] = useState(false);

  function handleLike() {
    if (post.liked) return;
    setAnimating(true);
    setTimeout(function () { setAnimating(false); }, 300);
    onLike(post.id);
  }

  return (
    <div style={{ background: t.cardBg, borderRadius: 20, overflow: "hidden", marginBottom: 14, border: "1.5px solid " + t.border, position: "relative" }}>
      {post.trendRank <= 3 ? (
        <div style={{ position: "absolute", top: 10, left: 10, zIndex: 10, background: t.accent, borderRadius: 20, padding: "3px 9px", fontSize: 10, fontWeight: 700, color: t.accentText }}>
          #{post.trendRank} TRENDING
        </div>
      ) : null}

      <div style={{ height: 220, background: t.border, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: 13, color: t.textFaint, fontWeight: 600 }}>{post.timeLeft}</div>
      </div>

      <div style={{ padding: "13px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: t.avatarBg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: t.avatarText }}>
            {post.avatar}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>@{post.user}</div>
            <div style={{ fontSize: 10, color: t.textMuted }}>{post.caption}</div>
          </div>
        </div>
        <button onClick={handleLike} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, transform: animating ? "scale(1.3)" : "scale(1)" }}>
          <div style={{ fontSize: 24 }}>{post.liked ? "🖤" : "🤍"}</div>
          <div style={{ fontSize: 11, fontWeight: 800, color: post.liked ? t.text : t.textMuted }}>
            {fmt(post.likes)}
          </div>
        </button>
      </div>
    </div>
  );
}

function AppDemo(props) {
  const onExit = props.onExit;
  const isDark = props.isDark;
  const onToggleTheme = props.onToggleTheme;
  const t = getTheme(isDark);
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
    <div style={{ background: t.bg, minHeight: "100vh", width: "100%", fontFamily: "sans-serif", position: "relative", boxSizing: "border-box" }}>
      <div style={{ position: "fixed", top: 8, left: "50%", transform: "translateX(-50%)", zIndex: 500, background: t.cardBg, border: "1px solid " + t.border, borderRadius: 20, padding: "5px 12px", display: "flex", gap: 8, alignItems: "center" }}>
        <span style={{ fontSize: 10, fontWeight: 800, color: t.text }}>PREVIEW - TAP AROUND</span>
        <button onClick={onExit} style={{ background: "none", border: "none", color: t.textMuted, fontSize: 10, textDecoration: "underline" }}>exit</button>
      </div>

      <div style={{ padding: "52px 18px 0", position: "sticky", top: 0, background: t.bg, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ fontSize: 24, fontWeight: 900, color: t.text }}>LIKE</div>
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
        </div>
        <div style={{ display: "flex", borderBottom: "1px solid " + t.border }}>
          <button onClick={function () { setTab("feed"); }} style={{ flex: 1, background: "none", border: "none", padding: "9px 0", fontSize: 11, fontWeight: 700, color: tab === "feed" ? t.text : t.textFaint, borderBottom: tab === "feed" ? "2px solid " + t.text : "2px solid transparent" }}>FEED</button>
          <button onClick={function () { setTab("board"); }} style={{ flex: 1, background: "none", border: "none", padding: "9px 0", fontSize: 11, fontWeight: 700, color: tab === "board" ? t.text : t.textFaint, borderBottom: tab === "board" ? "2px solid " + t.text : "2px solid transparent" }}>BOARD</button>
          <button onClick={function () { setTab("profile"); }} style={{ flex: 1, background: "none", border: "none", padding: "9px 0", fontSize: 11, fontWeight: 700, color: tab === "profile" ? t.text : t.textFaint, borderBottom: tab === "profile" ? "2px solid " + t.text : "2px solid transparent" }}>PROFILE</button>
        </div>
      </div>

      <div style={{ padding: "16px 16px 40px" }}>
        {tab === "feed" ? (
          <div>
            <div style={{ fontSize: 11, color: t.textFaint, textAlign: "center", marginBottom: 14 }}>Tap the heart on any post to try it</div>
            {posts.map(function (p) {
              return <PostCard key={p.id} post={p} onLike={handleLike} theme={t} />;
            })}
          </div>
        ) : null}

        {tab === "board" ? (
          <div>
            <div style={{ fontSize: 20, fontWeight: 900, color: t.text, marginBottom: 16 }}>Today's Board</div>
            {posts.map(function (post, i) {
              return (
                <div key={post.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 0", borderBottom: "1px solid " + t.border }}>
                  <div style={{ fontSize: 13, width: 24, color: t.textFaint, fontWeight: 700 }}>#{i + 1}</div>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: t.avatarBg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: t.avatarText }}>{post.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>@{post.user}</div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: t.text }}>{fmt(post.likes)}</div>
                </div>
              );
            })}
          </div>
        ) : null}

        {tab === "profile" ? (
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: t.avatarBg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 28, color: t.avatarText, margin: "0 auto 12px" }}>Y</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: t.text }}>@you</div>
            <div style={{ fontSize: 11, color: t.textMuted, marginTop: 6 }}>This could be you, once LIKE launches</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function WaitlistForm(props) {
  const t = props.theme;
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
        <div style={{ fontSize: 32, marginBottom: 8 }}>🤍</div>
        <div style={{ fontSize: 16, fontWeight: 800, color: t.text }}>You're on the list!</div>
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
          style={{ flex: 1, background: t.inputBg, border: "1.5px solid " + t.border, borderRadius: 14, padding: "13px 14px", fontSize: 14, color: t.text }}
        />
        <button type="submit" disabled={loading} style={{ background: t.accent, border: "none", borderRadius: 14, padding: "13px 18px", fontSize: 13, fontWeight: 800, color: t.accentText }}>
          {loading ? "..." : "Join"}
        </button>
      </div>
      {error ? <div style={{ fontSize: 11, color: t.textMuted, marginTop: 8, textAlign: "center" }}>{error}</div> : null}
    </form>
  );
}

function Landing(props) {
  const onTryDemo = props.onTryDemo;
  const isDark = props.isDark;
  const onToggleTheme = props.onToggleTheme;
  const t = getTheme(isDark);

  return (
    <div style={{ background: t.bg, minHeight: "100vh", width: "100%", fontFamily: "sans-serif", padding: "24px 24px 50px", textAlign: "center", boxSizing: "border-box" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 30 }}>
        <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
      </div>

      <div style={{ fontSize: 56, fontWeight: 900, color: t.text, marginBottom: 4 }}>LIKE</div>
      <div style={{ fontSize: 16, color: t.text, fontWeight: 700, marginBottom: 12 }}>No words. Just love.</div>
      <p style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.6, maxWidth: 320, margin: "0 auto 32px" }}>
        A social network where the only interaction is a like. No comments. No followers. No dislikes. Every post competes on a leaderboard that resets every 24 hours.
      </p>

      <button onClick={onTryDemo} style={{ background: t.accent, border: "none", borderRadius: 50, padding: "16px 36px", fontSize: 15, fontWeight: 800, color: t.accentText, marginBottom: 14 }}>
        Try the app now
      </button>
      <div style={{ fontSize: 11, color: t.textFaint, marginBottom: 36 }}>Real feed. Real leaderboard. Tap around for yourself.</div>

      <div style={{ width: "100%", height: 1, background: t.border, marginBottom: 28 }}></div>

      <div style={{ fontSize: 13, color: t.textMuted, fontWeight: 700, marginBottom: 16 }}>Want first access when it fully launches?</div>
      <WaitlistForm theme={t} />
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("landing");
  const [isDark, setIsDark] = useState(true);

  function toggleTheme() {
    setIsDark(function (prev) { return !prev; });
  }

  if (view === "demo") {
    return <AppDemo onExit={function () { setView("landing"); }} isDark={isDark} onToggleTheme={toggleTheme} />;
  }
  return <Landing onTryDemo={function () { setView("demo"); }} isDark={isDark} onToggleTheme={toggleTheme} />;
}