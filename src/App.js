import { useState, useEffect } from "react";

// ════════════════════════════════════════════════════════════════════════════
// DATA
// ════════════════════════════════════════════════════════════════════════════

const INITIAL_POSTS = [
  { id: 1, user: "solange.wav", avatar: "S", avatarColor: "#FF3CAC", bg: "linear-gradient(135deg,#FF3CAC 0%,#784BA0 50%,#2B86C5 100%)", caption: "golden hour never misses ✦", likes: 48200, liked: false, superLiked: false, trendRank: 1, timeLeft: "4h left", city: "Johannesburg" },
  { id: 2, user: "kai.renders", avatar: "K", avatarColor: "#00F5D4", bg: "linear-gradient(135deg,#0D0D0D 0%,#1a1a2e 50%,#16213e 100%)", caption: "3am creative mode 🌑", likes: 31500, liked: false, superLiked: false, trendRank: 2, timeLeft: "6h left", city: "Johannesburg" },
  { id: 3, user: "zuri.jpeg", avatar: "Z", avatarColor: "#FFD60A", bg: "linear-gradient(135deg,#FFD60A 0%,#FF6B35 100%)", caption: "summer energy only ☀️", likes: 22900, liked: false, superLiked: false, trendRank: 3, timeLeft: "11h left", city: "Cape Town" },
  { id: 4, user: "nova.clips", avatar: "N", avatarColor: "#7B2FBE", bg: "linear-gradient(135deg,#7B2FBE 0%,#CB49EC 50%,#FF9CEE 100%)", caption: "they said it couldn't be done 🫡", likes: 18700, liked: false, superLiked: false, trendRank: 4, timeLeft: "14h left", city: "Durban" },
  { id: 5, user: "drift.boy", avatar: "D", avatarColor: "#FF3CAC", bg: "linear-gradient(135deg,#1a1a2e 0%,#FF3CAC 100%)", caption: "vibes on vibes on vibes", likes: 9300, liked: false, superLiked: false, trendRank: 5, timeLeft: "20h left", city: "Johannesburg" },
];

const fmt = n => n >= 1000 ? (n/1000).toFixed(1) + "k" : n;

// ════════════════════════════════════════════════════════════════════════════
// ICONS
// ════════════════════════════════════════════════════════════════════════════

const HeartIcon = ({ filled, superLike, size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24"
    fill={filled ? (superLike ? "#FFD60A" : "#FF3CAC") : "none"}
    stroke={filled ? (superLike ? "#FFD60A" : "#FF3CAC") : "rgba(255,255,255,0.7)"}
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const FireIcon = ({ size = 13, color = "#FF3CAC" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
    <path d="M12 2s-4 6-4 11a4 4 0 0 0 8 0C16 8 12 2 12 2z" />
    <path d="M12 22c-3.31 0-6-2.69-6-6 0-3 2-6 4-8 0 2 2 4 2 6s2-2 2-4c2 2 4 5 4 8 0 3.31-2.69 6-6 6z" />
  </svg>
);

// ════════════════════════════════════════════════════════════════════════════
// DEMO BADGE
// ════════════════════════════════════════════════════════════════════════════

function DemoBadge({ onExit }) {
  return (
    <div style={{
      position: "fixed", top: 8, left: "50%", transform: "translateX(-50%)",
      zIndex: 500, display: "flex", alignItems: "center", gap: 8,
      background: "rgba(255,214,10,0.12)", border: "1px solid rgba(255,214,10,0.35)",
      borderRadius: 20, padding: "5px 12px",
      backdropFilter: "blur(10px)",
    }}>
      <span style={{ fontSize: 10, fontWeight: 800, color: "#FFD60A", letterSpacing: "0.04em" }}>
        ✦ PREVIEW — TAP AROUND
      </span>
      <button onClick={onExit} style={{
        background: "none", border: "none", cursor: "pointer",
        fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.4)",
        textDecoration: "underline",
      }}>exit</button>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// POST CARD
// ════════════════════════════════════════════════════════════════════════════

function PostCard({ post, onLike }) {
  const [animating, setAnimating] = useState(false);
  const [hearts, setHearts] = useState([]);

  const handleLike = () => {
    if (post.liked) return;
    setAnimating(true);
    const id = Date.now();
    setHearts(h => [...h, { id, x: Math.random() * 40 - 20 }]);
    setTimeout(() => setHearts(h => h.filter(f => f.id !== id)), 900);
    setTimeout(() => setAnimating(false), 300);
    onLike(post.id);
  };

  return (
    <div style={{
      background: "#111", borderRadius: 20, overflow: "hidden", marginBottom: 14,
      border: post.trendRank <= 2 ? "1.5px solid rgba(255,60,172,0.35)" : "1.5px solid rgba(255,255,255,0.06)",
      position: "relative",
    }}>
      {post.trendRank <= 3 && (
        <div style={{
          position: "absolute", top: 10, left: 10, zIndex: 10,
          background: post.trendRank === 1 ? "rgba(255,60,172,0.9)" : "rgba(0,0,0,0.72)",
          backdropFilter: "blur(8px)", borderRadius: 20, padding: "3px 9px",
          display: "flex", alignItems: "center", gap: 4,
          fontSize: 10, fontWeight: 700, color: post.trendRank === 1 ? "#fff" : "#FF3CAC",
          letterSpacing: "0.05em",
        }}><FireIcon size={11} /> #{post.trendRank} TRENDING</div>
      )}
      <div style={{
        position: "absolute", top: 10, right: 10, zIndex: 10,
        background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
        borderRadius: 20, padding: "3px 9px",
        fontSize: 9, color: "rgba(255,255,255,0.55)", fontWeight: 600,
      }}>{post.timeLeft}</div>

      <div style={{ height: 260, background: post.bg, position: "relative", overflow: "hidden" }}>
        {hearts.map(h => (
          <div key={h.id} style={{
            position: "absolute", bottom: 50, right: 36,
            transform: `translateX(${h.x}px)`,
            animation: "floatUp 0.9s ease-out forwards",
            fontSize: 22, pointerEvents: "none",
          }}>❤️</div>
        ))}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.48) 0%,transparent 55%)" }} />
      </div>

      <div style={{ padding: "13px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%", background: post.avatarColor,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 800, fontSize: 14, color: "#000", flexShrink: 0,
          }}>{post.avatar}</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>@{post.user}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>{post.caption}</div>
          </div>
        </div>
        <button onClick={handleLike} style={{
          background: "none", border: "none", cursor: post.liked ? "default" : "pointer",
          padding: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 1,
          transform: animating ? "scale(1.35)" : "scale(1)",
          transition: "transform 0.15s cubic-bezier(0.34,1.56,0.64,1)",
        }}>
          <HeartIcon filled={post.liked} size={26} />
          <div style={{ fontSize: 11, fontWeight: 800, color: post.liked ? "#FF3CAC" : "rgba(255,255,255,0.45)" }}>
            {fmt(post.likes)}
          </div>
        </button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// APP DEMO
// ════════════════════════════════════════════════════════════════════════════

function AppDemo({ onExit }) {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [tab, setTab] = useState("feed");

  const handleLike = (id) => {
    setPosts(prev => prev.map(p => p.id === id && !p.liked ? { ...p, liked: true, likes: p.likes + 1 } : p));
  };

  return (
    <div style={{
      background: "#0A0A0A", minHeight: "100vh", maxWidth: 430, margin: "0 auto",
      fontFamily: "'Inter',-apple-system,sans-serif", position: "relative",
    }}>
      <DemoBadge onExit={onExit} />

      <div style={{
        padding: "52px 18px 0", position: "sticky", top: 0,
        background: "rgba(10,10,10,0.96)", backdropFilter: "blur(20px)", zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{
            fontSize: 24, fontWeight: 900, letterSpacing: "-0.04em",
            background: "linear-gradient(135deg,#FF3CAC,#784BA0)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>LIKE</div>
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            background: "linear-gradient(135deg,#FF3CAC,#784BA0)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 800, fontSize: 13, color: "#fff",
          }}>Y</div>
        </div>
        <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          {[["feed","Feed"],["board","Board"],["profile","Profile"]].map(([id,label]) => (
            <button key={id} onClick={() => setTab(id)} style={{
              flex: 1, background: "none", border: "none", cursor: "pointer",
              padding: "9px 0", fontSize: 11, fontWeight: 700, letterSpacing: "0.04em",
              color: tab === id ? "#FF3CAC" : "rgba(255,255,255,0.3)",
              borderBottom: tab === id ? "2px solid #FF3CAC" : "2px solid transparent",
            }}>{label.toUpperCase()}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "16px 16px 40px" }}>
        {tab === "feed" && (
          <>
            <div style={{
              background: "rgba(255,60,172,0.06)", border: "1px solid rgba(255,60,172,0.14)",
              borderRadius: 14, padding: "11px 15px", marginBottom: 16,
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#FF3CAC", animation: "pulse 1.5s infinite" }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.6)" }}>RESETS IN</span>
              </div>
              <span style={{ fontSize: 14, fontWeight: 900, color: "#FF3CAC" }}>04:32:17</span>
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontWeight: 600, marginBottom: 14, textAlign: "center" }}>
              ❤️ Tap the heart on any post to try it
            </div>
            {posts.map(p => <PostCard key={p.id} post={p} onLike={handleLike} />)}
          </>
        )}

        {tab === "board" && (
          <div>
            <div style={{ fontSize: 20, fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", marginBottom: 4 }}>Today's Board</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontWeight: 600, marginBottom: 20 }}>Resets every 24h · Anyone can reach #1</div>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 6, marginBottom: 24, height: 130 }}>
              {[posts[1], posts[0], posts[2]].map((post, i) => {
                const heights = [96, 130, 76];
                const colors = ["rgba(255,255,255,0.07)", "rgba(255,60,172,0.25)", "rgba(255,255,255,0.04)"];
                const emojis = ["🥈", "🥇", "🥉"];
                return (
                  <div key={post.id} style={{
                    flex: 1, height: heights[i], background: colors[i],
                    borderRadius: "12px 12px 0 0", display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "flex-start", paddingTop: 10,
                  }}>
                    <div style={{ fontSize: i === 1 ? 20 : 16 }}>{emojis[i]}</div>
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%", background: post.avatarColor,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 800, fontSize: 11, color: "#000", marginTop: 4,
                    }}>{post.avatar}</div>
                    <div style={{ fontSize: 9, color: "#fff", fontWeight: 700, marginTop: 3 }}>{fmt(post.likes)}</div>
                  </div>
                );
              })}
            </div>
            {posts.map((post, i) => (
              <div key={post.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ fontSize: i < 3 ? 16 : 11, width: 24, textAlign: "center", color: i >= 3 ? "rgba(255,255,255,0.3)" : undefined, fontWeight: 700 }}>
                  {i < 3 ? ["🥇","🥈","🥉"][i] : `#${i+1}`}
                </div>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: post.avatarColor, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, color: "#000" }}>{post.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>@{post.user}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>{post.caption}</div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: i === 0 ? "#FF3CAC" : "#fff" }}>{fmt(post.likes)}</div>
              </div>
            ))}
          </div>
        )}

        {tab === "profile" && (
          <div>
            <div style={{
              background: "linear-gradient(135deg,rgba(255,60,172,0.12),rgba(120,75,160,0.08))",
              border: "1px solid rgba(255,60,172,0.18)", borderRadius: 20, padding: 20, marginBottom: 14, textAlign: "center",
            }}>
              <div style={{
                width: 72, height: 72, borderRadius: "50%",
                background: "linear-gradient(135deg,#FF3CAC,#784BA0)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 900, fontSize: 28, color: "#fff", margin: "0 auto 12px",
                boxShadow: "0 0 30px rgba(255,60,172,0.35)",
              }}>Y</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em" }}>@you</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 3 }}>This could be you, once LIKE launches</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              {[{l:"Posts",v:"0"},{l:"Likes Given",v:posts.filter(p=>p.liked).length},{l:"Trended",v:"0"}].map(s => (
                <div key={s.l} style={{ background: "#111", borderRadius: 14, padding: "13px 10px", textAlign: "center", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: "#fff" }}>{s.v}</div>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", fontWeight: 700, marginTop: 2 }}>{s.l.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes floatUp { 0%{transform:translateY(0) scale(1);opacity:1} 100%{transform:translateY(-80px) scale(0.5);opacity:0} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }
      `}</style>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// WAITLIST FORM
// ════════════════════════════════════════════════════════════════════════════

function WaitlistForm() {
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
      if (response.ok) setSubmitted(true);
      else setError("Something went wrong. Please try again.");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 32, marginBottom: 8 }}>❤️</div>
      <div style={{ fontSize: 16, fontWeight: 800, color: "lightgreen" }}>You're on the list!</div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 340, margin: "0 auto" }}>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="email" required value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          style={{
            flex: 1, background: "rgba(255,255,255,0.06)",
            border: "1.5px solid rgba(255,255,255,0.12)", borderRadius: 14,
            padding: "13px 14px", fontSize: 14, color: "#fff", outline: "none", fontFamily: "inherit",
          }}
        />
        <button type="submit" disabled={loading} style={{
          background: "linear-gradient(135deg,#FF3CAC,#784BA0)", border: "none",
          borderRadius: 14, padding: "13px 18px", fontSize: 13, fontWeight: 800,
          color: "#fff", cursor: "pointer", whiteSpace: "nowrap",
        }}>{loading ? "..." : "Join"}</button>
      </div>
      {error && <div style={{ fontSize: 11, color: "salmon", marginTop: 8, textAlign: "center" }}>{error}</div>}
    </form>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// LANDING SCREEN
// ════════════════════════════════════════════════════════════════════════════

function Landing({ onTryDemo }) {
  return (
    <div style={{
      background: "#0A0A0A", minHeight: "100vh", maxWidth: 430, margin: "0 auto",
      fontFamily: "'Inter',-apple-system,sans-serif",
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "70px 24px 50px", textAlign: "center", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle,rgba(255,60,172,0.14) 0%,transparent 65%)",
        top: "20%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none",
      }} />

      <div style={{
        fontSize: 56, fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1,
        marginBottom: 4, position: "relative",
      }}>
        <span style={{ color: "#fff" }}>LIKE</span> ❤️
      </div>
      <div style={{ fontSize: 16, color: "#fff", fontWeight: 700, marginBottom: 12 }}>No words. Just love.</div>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, maxWidth: 320, marginBottom: 32 }}>
        A social network where the only interaction is a like. No comments. No followers.
        No dislikes. Every post competes on a leaderboard that resets every 24 hours.
      </p>

      <button onClick={onTryDemo} style={{
        background: "linear-gradient(135deg,#FF3CAC,#784BA0)", border: "none",
        borderRadius: 50, padding: "16px 36px", fontSize: 15, fontWeight: 800,
        color: "#fff", cursor: "pointer", marginBottom: 14,
        boxShadow: "0 8px 28px rgba(255,60,172,0.4)",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        Try the app now ✦
      </button>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontWeight: 600, marginBottom: 36 }}>
        Real feed. Real leaderboard. Tap around for yourself.
      </div>

      <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 28 }} />

      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontWeight: 700, marginBottom: 16 }}>
        Want first access when 