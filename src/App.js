import { useState } from "react";

const CATEGORIES = ["All", "Music", "Fashion", "Travel", "Food", "Art", "Fitness", "Comedy", "Film", "Vibes"];

const POSTS = [
  { id: 1, user: "solange.wav", initial: "S", caption: "golden hour never misses", likes: 48200, liked: false, rank: 1, timeLeft: "4h left", img: "https://i.postimg.cc/sXbRWwr7/sebastien-gabriel-IMlv9Jlb24-unsplash.jpg", category: "Vibes" },
  { id: 2, user: "kai.renders", initial: "K", caption: "3am creative mode", likes: 31500, liked: false, rank: 2, timeLeft: "6h left", img: "https://i.postimg.cc/Y0Sm42tj/van-mendoza-r7YZXv5f5cc-unsplash.jpg", category: "Art" },
  { id: 3, user: "zuri.jpeg", initial: "Z", caption: "summer energy only", likes: 22900, liked: false, rank: 3, timeLeft: "11h left", img: "https://i.postimg.cc/SNygrcxP/angelo-pantazis-h0An-GGgseio-unsplash.jpg", category: "Travel" },
  { id: 4, user: "nova.clips", initial: "N", caption: "they said it couldn't be done", likes: 18700, liked: false, rank: 4, timeLeft: "14h left", img: "https://i.postimg.cc/wjwZJ05q/pulkit-pithva-h2WT62cz-Fe-A-unsplash.jpg", category: "Fitness" },
  { id: 5, user: "drift.boy", initial: "D", caption: "vibes on vibes on vibes", likes: 9300, liked: false, rank: 5, timeLeft: "20h left", img: "https://i.postimg.cc/xjm5Ytc7/jules-pt-CT-8q-Ze-Xx78-unsplash.jpg", category: "Music" }
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

function CategoryPills(props) {
  const active = props.active;
  const onSelect = props.onSelect;
  const t = props.t;
  return (
    <div style={{
      display: "flex", gap: 8, overflowX: "auto", paddingBottom: 12,
      scrollbarWidth: "none", msOverflowStyle: "none"
    }}>
      {CATEGORIES.map(function (cat) {
        const isActive = active === cat;
        return (
          <button key={cat} onClick={function () { onSelect(cat); }} style={{
            flexShrink: 0, background: isActive ? t.ink : "transparent",
            border: "1px solid " + (isActive ? t.ink : t.lineStrong),
            borderRadius: 100, padding: "6px 14px",
            fontSize: 11, fontWeight: 700, cursor: "pointer",
            color: isActive ? t.invertText : t.inkSoft,
            letterSpacing: "0.03em", transition: "all 0.18s ease"
          }}>{cat.toUpperCase()}</button>
        );
      })}
    </div>
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
        height: 420, position: "relative", overflow: "hidden",
        backgroundImage: "url(" + post.img + ")",
        backgroundSize: "cover", backgroundPosition: "center"
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.65) 100%)"
        }} />

        {/* Category tag */}
        <div style={{
          position: "absolute", top: 14, left: 14,
          background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)",
          borderRadius: 100, padding: "4px 11px",
          fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: "0.06em"
        }}>{post.category.toUpperCase()}</div>

        {post.rank <= 3 ? (
          <div style={{
            position: "absolute", top: 14, left: 14, marginTop: 28,
            background: "rgba(250,250,248,0.95)", color: "#0A0A0A",
            borderRadius: 100, padding: "4px 11px", marginLeft: 0,
            fontSize: 10, fontWeight: 700, letterSpacing: "0.06em"
          }}>
            No. {post.rank} TRENDING
          </div>
        ) : null}

        <div style={{
          position: "absolute", top: 14, right: 14,
          fontSize: 10, fontWeight: 600, color: "rgba(250,250,248,0.85)",
          letterSpacing: "0.04em", textShadow: "0 1px 4px rgba(0,0,0,0.4)"
        }}>{post.timeLeft}</div>

        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "16px 16px 18px",
          display: "flex", alignItems: "flex-end", justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(8px)", border: "1.5px solid rgba(255,255,255,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0
            }}>{post.initial}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>@{post.user}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", marginTop: 1 }}>{post.caption}</div>
            </div>
          </div>
          <button onClick={tap} style={{
            background: "none", border: "none", cursor: post.liked ? "default" : "pointer", padding: 0,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
            transform: pulse ? "scale(1.25)" : "scale(1)", transition: "transform 0.2s cubic-bezier(0.34,1.56,0.64,1)"
          }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill={post.liked ? "#fff" : "none"} stroke="#fff" strokeWidth="1.8">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>{fmt(post.likes)}</div>
          </button>
        </div>
      </div>
    </div>
  );
}

function ReelCard(props) {
  const post = props.post;
  const onLike = props.onLike;
  const [pulse, setPulse] = useState(false);

  function tap() {
    if (post.liked) return;
    setPulse(true);
    setTimeout(function () { setPulse(false); }, 260);
    onLike(post.id);
  }

  return (
    <div style={{
      height: "100vh", width: "100%", position: "relative", overflow: "hidden",
      backgroundImage: "url(" + post.img + ")",
      backgroundSize: "cover", backgroundPosition: "center",
      flexShrink: 0, scrollSnapAlign: "start"
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 30%, transparent 50%, rgba(0,0,0,0.7) 100%)"
      }} />

      <div style={{
        position: "absolute", top: 52, left: 16,
        background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
        borderRadius: 100, padding: "4px 11px",
        fontSize: 10, fontWeight: 700, color: "#fff", letterSpacing: "0.06em"
      }}>{post.category.toUpperCase()}</div>

      {post.rank <= 3 ? (
        <div style={{
          position: "absolute", top: 82, left: 16,
          background: "rgba(250,250,248,0.95)", color: "#0A0A0A",
          borderRadius: 100, padding: "4px 11px",
          fontSize: 10, fontWeight: 700, letterSpacing: "0.06em"
        }}>
          No. {post.rank} TRENDING
        </div>
      ) : null}

      <div style={{ position: "absolute", bottom: 80, left: 16, right: 70 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <div style={{
            width: 38, height: 38, borderRadius: "50%",
            background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)",
            border: "1.5px solid rgba(255,255,255,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: 700, color: "#fff"
          }}>{post.initial}</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>@{post.user}</div>
        </div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.4 }}>{post.caption}</div>
      </div>

      <div style={{
        position: "absolute", bottom: 80, right: 16,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 20
      }}>
        <button onClick={tap} style={{
          background: "none", border: "none", cursor: "pointer", padding: 0,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
          transform: pulse ? "scale(1.25)" : "scale(1)", transition: "transform 0.2s cubic-bezier(0.34,1.56,0.64,1)"
        }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill={post.liked ? "#fff" : "none"} stroke="#fff" strokeWidth="1.8">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{fmt(post.likes)}</div>
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
  if (!order[0] || !order[1] || !order[2]) return null;
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 28, paddingTop: 20 }}>
      {order.map(function (p, i) {
        return (
          <div key={p.id} style={{ flex: 1, textAlign: "center" }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%", backgroundImage: "url(" + p.img + ")",
              backgroundSize: "cover", backgroundPosition: "center",
              margin: "0 auto 8px", border: i === 1 ? "2px solid " + t.ink : "1px solid " + t.line,
              boxShadow: i === 1 ? t.shadow : "none"
            }}></div>
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

function CategoryLeaderboard(props) {
  const posts = props.posts;
  const t = props.t;
  const cats = CATEGORIES.filter(function (c) { return c !== "All"; });
  return (
    <div>
      {cats.map(function (cat) {
        const catPosts = posts.filter(function (p) { return p.category === cat; });
        if (catPosts.length === 0) return null;
        const top = catPosts[0];
        return (
          <div key={cat} style={{
            background: t.surface, borderRadius: 16, marginBottom: 12,
            border: "1px solid " + t.line, overflow: "hidden"
          }}>
            <div style={{
              height: 90, backgroundImage: "url(" + top.img + ")",
              backgroundSize: "cover", backgroundPosition: "center", position: "relative"
            }}>
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)" }} />
              <div style={{
                position: "absolute", bottom: 10, left: 12,
                fontSize: 13, fontWeight: 800, color: "#fff", letterSpacing: "0.04em"
              }}>{cat.toUpperCase()}</div>
              <div style={{
                position: "absolute", bottom: 10, right: 12,
                fontSize: 10, color: "rgba(255,255,255,0.7)", fontWeight: 600
              }}>{catPosts.length} post{catPosts.length > 1 ? "s" : ""}</div>
            </div>
            <div style={{ padding: "10px 12px" }}>
              <div style={{ fontSize: 10, color: t.inkFaint, fontWeight: 700, marginBottom: 6, letterSpacing: "0.05em" }}>No. 1 IN {cat.toUpperCase()}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", backgroundImage: "url(" + top.img + ")",
                  backgroundSize: "cover", backgroundPosition: "center", flexShrink: 0
                }}></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: t.ink }}>@{top.user}</div>
                  <div style={{ fontSize: 10, color: t.inkSoft }}>{top.caption}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 800, color: t.ink }}>{fmt(top.likes)}</div>
              </div>
            </div>
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
  const [activeCategory, setActiveCategory] = useState("All");
  const [boardView, setBoardView] = useState("global");

  function like(id) {
    setPosts(function (prev) {
      return prev.map(function (p) {
        return p.id === id && !p.liked ? Object.assign({}, p, { liked: true, likes: p.likes + 1 }) : p;
      });
    });
  }

  const filteredPosts = activeCategory === "All"
    ? posts
    : posts.filter(function (p) { return p.category === activeCategory; });

  return (
    <div style={{ background: t.bg, minHeight: "100vh", width: "100%", fontFamily: "-apple-system, system-ui, sans-serif", boxSizing: "border-box" }}>

      {tab !== "reels" ? (
        <div>
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
            <div style={{ display: "flex", gap: 20, borderBottom: "1px solid " + t.line, marginBottom: 0 }}>
              {[["feed", "Feed"], ["reels", "Reels"], ["board", "Board"], ["profile", "Profile"]].map(function (item) {
                return (
                  <button key={item[0]} onClick={function () { setTab(item[0]); }} style={{
                    background: "none", border: "none", cursor: "pointer", padding: "10px 0",
                    fontSize: 13, fontWeight: 600, whiteSpace: "nowrap",
                    color: tab === item[0] ? t.ink : t.inkFaint,
                    borderBottom: tab === item[0] ? "2px solid " + t.ink : "2px solid transparent"
                  }}>{item[1]}</button>
                );
              })}
            </div>

            {tab === "feed" ? (
              <div style={{ paddingTop: 14 }}>
                <CategoryPills active={activeCategory} onSelect={setActiveCategory} t={t} />
              </div>
            ) : null}
          </div>

          <div style={{ padding: "12px 20px 50px", maxWidth: 480, margin: "0 auto" }}>
            {tab === "feed" ? (
              <div>
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  marginBottom: 16, paddingBottom: 14, borderBottom: "1px solid " + t.line
                }}>
                  <span style={{ fontSize: 11, color: t.inkSoft, fontWeight: 600, letterSpacing: "0.03em" }}>
                    {activeCategory === "All" ? "TODAY'S BOARD RESETS IN" : activeCategory.toUpperCase() + " · RESETS IN"}
                  </span>
                  <Serif style={{ fontSize: 15, color: t.ink, fontWeight: 400 }}>04:32:17</Serif>
                </div>
                {filteredPosts.length > 0 ? (
                  filteredPosts.map(function (p) { return <PostCard key={p.id} post={p} onLike={like} t={t} />; })
                ) : (
                  <div style={{ textAlign: "center", padding: "60px 0" }}>
                    <div style={{ fontSize: 32, marginBottom: 12 }}>🤍</div>
                    <div style={{ fontSize: 14, color: t.inkSoft }}>No posts in {activeCategory} yet.</div>
                    <div style={{ fontSize: 12, color: t.inkFaint, marginTop: 6 }}>Be the first to trend here.</div>
                  </div>
                )}
              </div>
            ) : null}

            {tab === "board" ? (
              <div>
                <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                  <button onClick={function () { setBoardView("global"); }} style={{
                    flex: 1, background: boardView === "global" ? t.ink : "transparent",
                    border: "1px solid " + t.lineStrong, borderRadius: 100, padding: "8px 0",
                    fontSize: 11, fontWeight: 700, cursor: "pointer",
                    color: boardView === "global" ? t.invertText : t.inkSoft
                  }}>GLOBAL</button>
                  <button onClick={function () { setBoardView("category"); }} style={{
                    flex: 1, background: boardView === "category" ? t.ink : "transparent",
                    border: "1px solid " + t.lineStrong, borderRadius: 100, padding: "8px 0",
                    fontSiz