import { useState } from "react";

const POSTS = [
  { id: 1, user: "solange.wav", initial: "S", caption: "golden hour never misses", likes: 48200, liked: false, rank: 1, timeLeft: "4h left", shade: "#1a1a1a" },
  { id: 2, user: "kai.renders", initial: "K", caption: "3am creative mode", likes: 31500, liked: false, rank: 2, timeLeft: "6h left", shade: "#262626" },
  { id: 3, user: "zuri.jpeg", initial: "Z", caption: "summer energy only", likes: 22900, liked: false, rank: 3, timeLeft: "11h left", shade: "#0d0d0d" },
  { id: 4, user: "nova.clips", initial: "N", caption: "they said it couldn't be done", likes: 18700, liked: false, rank: 4, timeLeft: "14h left", shade: "#2e2e2e" },
  { id: 5, user: "drift.boy", initial: "D", caption: "vibes on vibes on vibes", likes: 9300, liked: false, rank: 5, timeLeft: "20h left", shade: "#161616" }
];

function fmt(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return n;
}

function theme(dark) {
  return {
    bg: dark ? "#0A0A0A" : "#FAFAF8",
    surface: dark ? "#141414" : "#FFFFFF",
    surfaceRaised: dark ? "#1A1A1A" : "#FFFFFF",
    ink: dark ? "#F5F5F0" : "#0A0A0A",
    inkSoft: dark ? "rgba(245,245,240,0.55)" : "rgba(10,10,10,0.55)",
    inkFaint: dark ? "rgba(245,245,240,0.28)" : "rgba(10,10,10,0.32)",
    line: dark ? "rgba(255,255,255,0.08)" : "rgba(10,10,10,0.08)",
    lineStrong: dark ? "rgba(255,255,255,0.16)" : "rgba(10,10,10,0.14)",
    invert: dark ? "#F5F5F0" : "#0A0A0A",
    invertText: dark ? "#0A0A0A" : "#FAFAF8",
    shadow: dark ? "0 8px 24px rgba(0,0,0,0.4)" : "0 8px 24px rgba(0,0,0,0.08)",
    shadowSoft: dark ? "0 2px 8px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.05)"
  };
}

function Serif(props) {
  const style = Object.assign({ fontFamily: "Georgia, 'Times New Roman', serif" }, props.style || {});
  return <span style={style}>{props.children}</span>;
}

function ThemeToggle(props) {
  const dark = props.dark;
  const onToggle = props.onToggle;
  const t = props.t;
  return (
    <button onClick={onToggle} style={{
      background: "transparent", border: "1px solid " + t.lineStrong, borderRadius: 100,
      width: 44, height: 26, position: "relative", cursor: "pointer", padding: 0, flexShrink: 0
    }}>
      <div style={{
        position: "absolute", top: 2, left: dark ? 2 : 20, width: 18, height: 18,
        borderRadius: "50%", background: t.ink, transition: "left 0.25s cubic-bezier(0.4,0,0.2,1)"
      }} />
    </button>
  );
}

function Wordmark(props) {
  const t = props.t;
  const size = props.size;
  return (
    <Serif style={{ fontSize: size || 22, fontWeight: 400, color: t.ink, letterSpacing: "-0.01em" }}>
      LIKE
    </Serif>
  );
}

function PostCard(props) {
  const post = props.post;
  const onLike = props.onLike;
  const t = props.t;
  const [pulse, setPulse] = useState(false);

  function tap() {
    if (post.liked) return;
    setPulse(true);
    setTimeout(function () { setPulse(false); }, 260);
    onLike(post.id);
  }

  return (
    <div style={{
      background: t.surface, borderRadius: 18, overflow: "hidden", marginBottom: 16,
      border: "1px solid " + t.line, boxShadow: t.shadowSoft
    }}>
      <div style={{
        height: 230, background: post.shade, position: "relative",
        display: "flex", alignItems: "flex-end", padding: 14
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(165deg, transparent 40%, rgba(0,0,0,0.35) 100%)"
        }} />
        {post.rank <= 3 ? (
          <div style={{
            position: "absolute", top: 14, left: 14,
            background: "rgba(250,250,248,0.92)", color: "#0A0A0A",
            borderRadius: 100, padding: "4px 11px",
            fontSize: 10, fontWeight: 700, letterSpacing: "0.06em"
          }}>
            No. {post.rank} TRENDING
          </div>
        ) : null}
        <div style={{
          position: "absolute", top: 14, right: 14,
          fontSize: 10, fontWeight: 600, color: "rgba(250,250,248,0.7)",
          letterSpacing: "0.04em"
        }}>{post.timeLeft}</div>
      </div>

      <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: "50%", background: t.ink, color: t.invertText,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 700, flexShrink: 0
          }}>{post.initial}</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: t.ink }}>@{post.user}</div>
            <div style={{ fontSize: 11, color: t.inkSoft, marginTop: 1 }}>{post.caption}</div>
          </div>
        </div>
        <button onClick={tap} style={{
          background: "none", border: "none", cursor: post.liked ? "default" : "pointer", padding: 0,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
          transform: pulse ? "scale(1.25)" : "scale(1)", transition: "transform 0.2s cubic-bezier(0.34,1.56,0.64,1)"
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill={post.liked ? t.ink : "none"} stroke={post.liked ? t.ink : t.inkFaint} strokeWidth="1.8">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <div style={{ fontSize: 11, fontWeight: 700, color: post.liked ? t.ink : t.inkFaint }}>{fmt(post.likes)}</div>
        </button>
      </div>
    </div>
  );
}

function Podium(props) {
  const posts = props.posts;
  const t = props.t;
  const order = [posts[1], posts[0], posts[2]];
  const heights = [78, 108, 60];
  const labels = ["II", "I", "III"];
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 28, paddingTop: 20 }}>
      {order.map(function (p, i) {
        return (
          <div key={p.id} style={{ flex: 1, textAlign: "center" }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%", background: t.ink, color: t.invertText,
              display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14,
              margin: "0 auto 8px", border: i === 1 ? "2px solid " + t.ink : "none",
              boxShadow: i === 1 ? t.shadow : "none"
            }}>{p.initial}</div>
            <div style={{
              height: heights[i], background: t.surfaceRaised, border: "1px solid " + t.line,
              borderRadius: "10px 10px 0 0", display: "flex", alignItems: "flex-start",
              justifyContent: "center", paddingTop: 10
            }}>
              <Serif style={{ fontSize: 22, color: t.ink, fontWeight: 400 }}>{labels[i]}</Serif>
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: t.ink, marginTop: 8 }}>{fmt(p.likes)}</div>
          </div>
        );
      })}
    </div>
  );
}

function AppDemo(props) {
  const dark = props.dark;
  const toggle = props.toggle;
  const onExit = props.onExit;
  const t = theme(dark);
  const [posts, setPosts] = useState(POSTS);
  const [tab, setTab] = useState("feed");

  function like(id) {
    setPosts(function (prev) {
      return prev.map(function (p) {
        return p.id === id && !p.liked ? Object.assign({}, p, { liked: true, likes: p.likes + 1 }) : p;
      });
    });
  }

  return (
    <div style={{ background: t.bg, minHeight: "100vh", width: "100%", fontFamily: "-apple-system, system-ui, sans-serif", boxSizing: "border-box" }}>
      <div style={{
        position: "fixed", top: 10, left: "50%", transform: "translateX(-50%)", zIndex: 500,
        background: t.surfaceRaised, border: "1px solid " + t.lineStrong, borderRadius: 100,
        padding: "6px 14px", display: "flex", gap: 10, alignItems: "center", boxShadow: t.shadow
      }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: t.ink, letterSpacing: "0.06em" }}>PREVIEW</span>
        <div style={{ width: 1, height: 10, background: t.line }} />
        <button onClick={onExit} style={{ background: "none", border: "none", color: t.inkSoft, fontSize: 10, fontWeight: 600, cursor: "pointer" }}>Exit</button>
      </div>

      <div style={{ padding: "56px 20px 0", position: "sticky", top: 0, background: t.bg, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
          <Wordmark t={t} />
          <ThemeToggle dark={dark} onToggle={toggle} t={t} />
        </div>
        <div style={{ display: "flex", gap: 24, borderBottom: "1px solid " + t.line }}>
          <button onClick={function () { setTab("feed"); }} style={{ background: "none", border: "none", cursor: "pointer", padding: "10px 0", fontSize: 13, fontWeight: 600, color: tab === "feed" ? t.ink : t.inkFaint, borderBottom: tab === "feed" ? "2px solid " + t.ink : "2px solid transparent" }}>Feed</button>
          <button onClick={function () { setTab("board"); }} style={{ background: "none", border: "none", cursor: "pointer", padding: "10px 0", fontSize: 13, fontWeight: 600, color: tab === "board" ? t.ink : t.inkFaint, borderBottom: tab === "board" ? "2px solid " + t.ink : "2px solid transparent" }}>Board</button>
          <button onClick={function () { setTab("profile"); }} style={{ background: "none", border: "none", cursor: "pointer", padding: "10px 0", fontSize: 13, fontWeight: 600, color: tab === "profile" ? t.ink : t.inkFaint, borderBottom: tab === "profile" ? "2px solid " + t.ink : "2px solid transparent" }}>Profile</button>
        </div>
      </div>

      <div style={{ padding: "20px 20px 50px", maxWidth: 480, margin: "0 auto" }}>
        {tab === "feed" ? (
          <div>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              marginBottom: 18, paddingBottom: 14, borderBottom: "1px solid " + t.line
            }}>
              <span style={{ fontSize: 11, color: t.inkSoft, fontWeight: 600, letterSpacing: "0.03em" }}>TODAY'S BOARD RESETS IN</span>
              <Serif style={{ fontSize: 15, color: t.ink, fontWeight: 400 }}>04:32:17</Serif>
            </div>
            {posts.map(function (p) { return <PostCard key={p.id} post={p} onLike={like} t={t} />; })}
          </div>
        ) : null}

        {tab === "board" ? (
          <div>
            <Serif style={{ fontSize: 26, color: t.ink, display: "block", marginBottom: 4 }}>Today's Board</Serif>
            <div style={{ fontSize: 12, color: t.inkSoft, marginBottom: 8 }}>Resets at midnight, anyone can reach the top</div>
            <Podium posts={posts} t={t} />
            {posts.map(function (p, i) {
              return (
                <div key={p.id} style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "13px 0",
                  borderBottom: "1px solid " + t.line
                }}>
                  <Serif style={{ width: 22, fontSize: 14, color: t.inkFaint }}>{i + 1}</Serif>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%", background: t.ink, color: t.invertText,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700
                  }}>{p.initial}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: t.ink }}>@{p.user}</div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: t.ink }}>{fmt(p.likes)}</div>
                </div>
              );
            })}
          </div>
        ) : null}

        {tab === "profile" ? (
          <div style={{ textAlign: "center", paddingTop: 20 }}>
            <div style={{
              width: 76, height: 76, borderRadius: "50%", background: t.ink, color: t.invertText,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700,
              margin: "0 auto 16px", boxShadow: t.shadow
            }}>Y</div>
            <Serif style={{ fontSize: 20, color: t.ink, display: "block", marginBottom: 6 }}>@you</Serif>
            <div style={{ fontSize: 12, color: t.inkSoft, maxWidth: 240, margin: "0 auto", lineHeight: 1.5 }}>
              This is what your profile looks like, once LIKE launches.
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 28 }}>
              <div>
                <Serif style={{ fontSize: 20, color: t.ink, display: "block" }}>0</Serif>
                <div style={{ fontSize: 10, color: t.inkFaint, marginTop: 2 }}>Posts</div>
              </div>
              <div>
                <Serif style={{ fontSize: 20, color: t.ink, display: "block" }}>{posts.filter(function (p) { return p.liked; }).length}</Serif>
                <div style={{ fontSize: 10, color: t.inkFaint, marginTop: 2 }}>Likes given</div>
              </div>
              <div>
                <Serif style={{ fontSize: 20, color: t.ink, display: "block" }}>0</Serif>
                <div style={{ fontSize: 10, color: t.inkFaint, marginTop: 2 }}>Trended</div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function WaitlistForm(props) {
  const t = props.t;
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  function submit(e) {
    e.preventDefault();
    setLoading(true);
    setErr("");
    fetch("https://formspree.io/f/mpqgawpa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email })
    }).then(function (r) {
      if (r.ok) { setDone(true); } else { setErr("Something went wrong, try again."); }
    }).catch(function () {
      setErr("Something went wrong, try again.");
    }).finally(function () {
      setLoading(false);
    });
  }

  if (done) {
    return (
      <div style={{ textAlign: "center", padding: "8px 0" }}>
        <Serif style={{ fontSize: 16, color: t.ink, display: "block" }}>You're on the list.</Serif>
        <div style={{ fontSize: 11, color: t.inkSoft, marginTop: 4 }}>We'll be in touch.</div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{ width: "100%", maxWidth: 360, margin: "0 auto" }}>
      <div style={{ display: "flex", gap: 0, borderBottom: "1.5px solid " + t.lineStrong, paddingBottom: 10 }}>
        <input
          type="email" required value={email}
          onChange={function (e) { setEmail(e.target.value); }}
          placeholder="your@email.com"
          style={{
            flex: 1, background: "transparent", border: "none", outline: "none",
            fontSize: 14, color: t.ink, fontFamily: "inherit", padding: "4px 0"
          }}
        />
        <button type="submit" disabled={loading} style={{
          background: "none", border: "none", cursor: "pointer",
          fontSize: 12, fontWeight: 700, color: t.ink, letterSpacing: "0.04em"
        }}>{loading ? "..." : "JOIN"}</button>
      </div>
      {err ? <div style={{ fontSize: 11, color: t.inkSoft, marginTop: 8 }}>{err}</div> : null}
    </form>
  );
}

function Landing(props) {
  const dark = props.dark;
  const toggle = props.toggle;
  const onTryDemo = props.onTryDemo;
  const t = theme(dark);
  return (
    <div style={{ background: t.bg, minHeight: "100vh", width: "100%", fontFamily: "-apple-system, system-ui, sans-serif", boxSizing: "border-box" }}>
      <div style={{ padding: "24px 24px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Wordmark t={t} size={18} />
        <ThemeToggle dark={dark} onToggle={toggle} t={t} />
      </div>

      <div style={{ padding: "60px 28px 60px", textAlign: "center", maxWidth: 480, margin: "0 auto" }}>
        <Serif style={{ fontSize: 52, color: t.ink, lineHeight: 1.02, display: "block", marginBottom: 18 }}>
          No words.<br />Just love.
        </Serif>
        <p style={{ fontSize: 14, color: t.inkSoft, lineHeight: 1.7, maxWidth: 320, margin: "0 auto 36px" }}>
          A social network where the only interaction is a like.
          No comments. No followers. No dislikes. Every post competes
          on a leaderboard that resets every 24 hours.
        </p>

        <button onClick={onTryDemo} style={{
          background: t.invert, color: t.invertText, border: "none", borderRadius: 100,
          padding: "15px 34px", fontSize: 14, fontWeight: 700, cursor: "pointer",
          boxShadow: t.shadow, marginBottom: 10
        }}>Try the app</button>
        <div style={{ fontSize: 11, color: t.inkFaint, marginBottom: 56 }}>A real feed. A real leaderboard. Tap around.</div>

        <div style={{ width: 32, height: 1, background: t.lineStrong, margin: "0 auto 28px" }} />

        <div style={{ fontSize: 12, color: t.inkSoft, fontWeight: 600, marginBottom: 18, letterSpacing: "0.02em" }}>
          Get first access when LIKE fully launches
        </div>
        <WaitlistForm t={t} />
      </div>
    </div>
  );
}

export default function App() {
  const [dark, setDark] = useState(true);
  const [view, setView] = useState("landing");
  function toggle() { setDark(function (d) { return !d; }); }

  if (view === "demo") {
    return <AppDemo dark={dark} toggle={toggle} onExit={function () { setView("landing"); }} />;
  }
  return <Landing dark={dark} toggle={toggle} onTryDemo={function () { setView("demo"); }} />;
}
