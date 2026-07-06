import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://powgbthdngnlhzqmjcou.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvd2didGhkbmdubGh6cW1qY291Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxODExNjUsImV4cCI6MjA5ODc1NzE2NX0.jzb8LmOWoCIH9KUUuKDQ25m_AytmXN83w7CgsO0kWAk";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const CATEGORIES = ["All", "Music", "Fashion", "Travel", "Food", "Art", "Fitness", "Comedy", "Film", "Vibes"];

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
  return <Serif style={{ fontSize: size || 22, fontWeight: 400, color: t.ink, letterSpacing: "-0.01em" }}>LIKE</Serif>;
}

function AuthScreen(props) {
  const t = props.t;
  const onAuth = props.onAuth;
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      if (mode === "signup") {
        const { data, error: signUpError } = await supabase.auth.signUp({ email, password });
        if (signUpError) throw signUpError;
        if (data.user) {
          const { error: profileError } = await supabase.from("profiles").insert({
            id: data.user.id,
            username: username.toLowerCase().replace(/[^a-z0-9._]/g, "")
          });
          if (profileError && !profileError.message.includes("duplicate")) throw profileError;
          setMessage("Check your email to confirm your account!");
        }
      } else {
        const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
        if (loginError) throw loginError;
        onAuth();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ background: t.bg, minHeight: "100vh", width: "100%", fontFamily: "-apple-system, system-ui, sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 28px", boxSizing: "border-box" }}>
      <Serif style={{ fontSize: 48, color: t.ink, display: "block", marginBottom: 8, letterSpacing: "-0.02em" }}>LIKE</Serif>
      <div style={{ fontSize: 13, color: t.inkSoft, marginBottom: 40 }}>No words. Just love.</div>

      <div style={{ width: "100%", maxWidth: 340 }}>
        <div style={{ display: "flex", gap: 0, marginBottom: 28, borderBottom: "1px solid " + t.line }}>
          <button onClick={function () { setMode("login"); }} style={{ flex: 1, background: "none", border: "none", cursor: "pointer", padding: "10px 0", fontSize: 13, fontWeight: 600, color: mode === "login" ? t.ink : t.inkFaint, borderBottom: mode === "login" ? "2px solid " + t.ink : "2px solid transparent" }}>Sign In</button>
          <button onClick={function () { setMode("signup"); }} style={{ flex: 1, background: "none", border: "none", cursor: "pointer", padding: "10px 0", fontSize: 13, fontWeight: 600, color: mode === "signup" ? t.ink : t.inkFaint, borderBottom: mode === "signup" ? "2px solid " + t.ink : "2px solid transparent" }}>Create Account</button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === "signup" ? (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: t.inkFaint, marginBottom: 6, letterSpacing: "0.04em" }}>USERNAME</div>
              <input type="text" required value={username} onChange={function (e) { setUsername(e.target.value); }} placeholder="yourname" style={{ width: "100%", background: t.surface, border: "1px solid " + t.lineStrong, borderRadius: 12, padding: "12px 14px", fontSize: 14, color: t.ink, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
            </div>
          ) : null}

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: t.inkFaint, marginBottom: 6, letterSpacing: "0.04em" }}>EMAIL</div>
            <input type="email" required value={email} onChange={function (e) { setEmail(e.target.value); }} placeholder="your@email.com" style={{ width: "100%", background: t.surface, border: "1px solid " + t.lineStrong, borderRadius: 12, padding: "12px 14px", fontSize: 14, color: t.ink, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
          </div>

          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: t.inkFaint, marginBottom: 6, letterSpacing: "0.04em" }}>PASSWORD</div>
            <input type="password" required value={password} onChange={function (e) { setPassword(e.target.value); }} placeholder="••••••••" style={{ width: "100%", background: t.surface, border: "1px solid " + t.lineStrong, borderRadius: 12, padding: "12px 14px", fontSize: 14, color: t.ink, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
          </div>

          {error ? <div style={{ fontSize: 12, color: "salmon", marginBottom: 14, textAlign: "center" }}>{error}</div> : null}
          {message ? <div style={{ fontSize: 12, color: "lightgreen", marginBottom: 14, textAlign: "center" }}>{message}</div> : null}

          <button type="submit" disabled={loading} style={{ width: "100%", background: t.invert, color: t.invertText, border: "none", borderRadius: 100, padding: "14px 0", fontSize: 14, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", boxShadow: t.shadow }}>
            {loading ? "..." : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

function PostCard(props) {
  const post = props.post;
  const onLike = props.onLike;
  const t = props.t;
  const currentUserId = props.currentUserId;
  const [pulse, setPulse] = useState(false);
  const liked = post.liked_by_user;

  function tap() {
    if (liked || !currentUserId) return;
    setPulse(true);
    setTimeout(function () { setPulse(false); }, 260);
    onLike(post.id);
  }

  return (
    <div style={{ background: t.surface, borderRadius: 18, overflow: "hidden", marginBottom: 16, border: "1px solid " + t.line, boxShadow: t.shadowSoft }}>
      <div style={{
        height: 420, position: "relative", overflow: "hidden",
        backgroundImage: post.image_url ? "url(" + post.image_url + ")" : "none",
        backgroundColor: post.image_url ? "transparent" : t.surfaceRaised,
        backgroundSize: "cover", backgroundPosition: "center"
      }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.05) 40%,rgba(0,0,0,0.65) 100%)" }} />

        <div style={{ position: "absolute", top: 14, left: 14, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", borderRadius: 100, padding: "4px 11px", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: "0.06em" }}>
          {(post.category || "VIBES").toUpperCase()}
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 16px 18px", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)", border: "1.5px solid rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
              {(post.profiles && post.profiles.username ? post.profiles.username[0] : "?").toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>@{post.profiles ? post.profiles.username : "unknown"}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", marginTop: 1 }}>{post.caption}</div>
            </div>
          </div>
          <button onClick={tap} style={{ background: "none", border: "none", cursor: liked ? "default" : "pointer", padding: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, transform: pulse ? "scale(1.25)" : "scale(1)", transition: "transform 0.2s cubic-bezier(0.34,1.56,0.64,1)" }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill={liked ? "#fff" : "none"} stroke="#fff" strokeWidth="1.8">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>{fmt(post.like_count || 0)}</div>
          </button>
        </div>
      </div>
    </div>
  );
}

function CreatePost(props) {
  const t = props.t;
  const userId = props.userId;
  const onPost = props.onPost;
  const onCancel = props.onCancel;
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("Vibes");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    if (!caption.trim()) return;
    setLoading(true);
    setError("");
    try {
      const { error: postError } = await supabase.from("posts").insert({
        user_id: userId,
        caption: caption.trim(),
        category,
        image_url: imageUrl.trim() || null,
        like_count: 0
      });
      if (postError) throw postError;
      onPost();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ background: t.bg, minHeight: "100vh", width: "100%", fontFamily: "-apple-system, system-ui, sans-serif", padding: "60px 24px 40px", boxSizing: "border-box" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <Serif style={{ fontSize: 22, color: t.ink }}>New Post</Serif>
        <button onClick={onCancel} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: t.inkSoft }}>Cancel</button>
      </div>

      <form onSubmit={submit}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.inkFaint, marginBottom: 6, letterSpacing: "0.04em" }}>CAPTION</div>
          <textarea required value={caption} onChange={function (e) { setCaption(e.target.value); }} placeholder="Say something..." maxLength={200} style={{ width: "100%", background: t.surface, border: "1px solid " + t.lineStrong, borderRadius: 12, padding: "12px 14px", fontSize: 14, color: t.ink, outline: "none", fontFamily: "inherit", boxSizing: "border-box", resize: "none", height: 80 }} />
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.inkFaint, marginBottom: 6, letterSpacing: "0.04em" }}>IMAGE URL (optional)</div>
          <input type="url" value={imageUrl} onChange={function (e) { setImageUrl(e.target.value); }} placeholder="https://..." style={{ width: "100%", background: t.surface, border: "1px solid " + t.lineStrong, borderRadius: 12, padding: "12px 14px", fontSize: 14, color: t.ink, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
        </div>

        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.inkFaint, marginBottom: 10, letterSpacing: "0.04em" }}>CATEGORY</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {CATEGORIES.filter(function (c) { return c !== "All"; }).map(function (cat) {
              return (
                <button key={cat} type="button" onClick={function () { setCategory(cat); }} style={{
                  background: category === cat ? t.ink : "transparent",
                  border: "1px solid " + (category === cat ? t.ink : t.lineStrong),
                  borderRadius: 100, padding: "6px 14px",
                  fontSize: 11, fontWeight: 700, cursor: "pointer",
                  color: category === cat ? t.invertText : t.inkSoft
                }}>{cat}</button>
              );
            })}
          </div>
        </div>

        {error ? <div style={{ fontSize: 12, color: "salmon", marginBottom: 14 }}>{error}</div> : null}

        <button type="submit" disabled={loading || !caption.trim()} style={{ width: "100%", background: caption.trim() ? t.invert : t.line, color: caption.trim() ? t.invertText : t.inkFaint, border: "none", borderRadius: 100, padding: "14px 0", fontSize: 14, fontWeight: 700, cursor: caption.trim() ? "pointer" : "not-allowed" }}>
          {loading ? "Posting..." : "Post it"}
        </button>
      </form>
    </div>
  );
}

function MainApp(props) {
  const user = props.user;
  const profile = props.profile;
  const dark = props.dark;
  const toggle = props.toggle;
  const onSignOut = props.onSignOut;
  const t = theme(dark);
  const [posts, setPosts] = useState([]);
  const [tab, setTab] = useState("feed");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);

  useEffect(function () {
    fetchPosts();
  }, [activeCategory]);

  async function fetchPosts() {
    setLoading(true);
    try {
      let query = supabase
        .from("posts")
        .select("*, profiles(username)")
        .gt("expires_at", new Date().toISOString())
        .order("like_count", { ascending: false })
        .limit(20);

      if (activeCategory !== "All") {
        query = query.eq("category", activeCategory);
      }

      const { data, error } = await query;
      if (error) throw error;

      const { data: likedData } = await supabase
        .from("likes")
        .select("post_id")
        .eq("user_id", user.id);

      const likedIds = new Set((likedData || []).map(function (l) { return l.post_id; }));

      setPosts((data || []).map(function (p) {
        return Object.assign({}, p, { liked_by_user: likedIds.has(p.id) });
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleLike(postId) {
    try {
      await supabase.from("likes").insert({ user_id: user.id, post_id: postId });
      await supabase.rpc("increment_likes", { post_id: postId });
      setPosts(function (prev) {
        return prev.map(function (p) {
          return p.id === postId ? Object.assign({}, p, { liked_by_user: true, like_count: (p.like_count || 0) + 1 }) : p;
        });
      });
    } catch (err) {
      console.error(err);
    }
  }

  if (showCreate) {
    return <CreatePost t={t} userId={user.id} onPost={function () { setShowCreate(false); fetchPosts(); }} onCancel={function () { setShowCreate(false); }} />;
  }

  return (
    <div style={{ background: t.bg, minHeight: "100vh", width: "100%", fontFamily: "-apple-system, system-ui, sans-serif", boxSizing: "border-box" }}>
      <div style={{ padding: "52px 20px 0", position: "sticky", top: 0, background: t.bg, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <Wordmark t={t} />
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <ThemeToggle dark={dark} onToggle={toggle} t={t} />
            <button onClick={onSignOut} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, color: t.inkFaint, fontWeight: 600 }}>Out</button>
          </div>
        </div>

        <div style={{ display: "flex", gap: 20, borderBottom: "1px solid " + t.line }}>
          {[["feed","Feed"],["board","Board"],["profile","Profile"]].map(function (item) {
            return (
              <button key={item[0]} onClick={function () { setTab(item[0]); }} style={{ background: "none", border: "none", cursor: "pointer", padding: "9px 0", fontSize: 13, fontWeight: 600, color: tab === item[0] ? t.ink : t.inkFaint, borderBottom: tab === item[0] ? "2px solid " + t.ink : "2px solid transparent" }}>{item[1]}</button>
            );
          })}
        </div>

        {tab === "feed" ? (
          <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "12px 0 8px", scrollbarWidth: "none" }}>
            {CATEGORIES.map(function (cat) {
              return (
                <button key={cat} onClick={function () { setActiveCategory(cat); }} style={{ flexShrink: 0, background: activeCategory === cat ? t.ink : "transparent", border: "1px solid " + (activeCategory === cat ? t.ink : t.lineStrong), borderRadius: 100, padding: "6px 14px", fontSize: 11, fontWeight: 700, cursor: "pointer", color: activeCategory === cat ? t.invertText : t.inkSoft }}>{cat.toUpperCase()}</button>
              );
            })}
          </div>
        ) : null}
      </div>

      <div style={{ padding: "16px 20px 100px", maxWidth: 480, margin: "0 auto" }}>
        {tab === "feed" ? (
          <div>
            {loading ? (
              <div style={{ textAlign: "center", padding: "60px 0", color: t.inkFaint, fontSize: 13 }}>Loading...</div>
            ) : posts.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>🤍</div>
                <div style={{ fontSize: 14, color: t.inkSoft }}>No posts yet.</div>
                <div style={{ fontSize: 12, color: t.inkFaint, marginTop: 6 }}>Be the first to post.</div>
              </div>
            ) : (
              posts.map(function (p) { return <PostCard key={p.id} post={p} onLike={handleLike} t={t} currentUserId={user.id} />; })
            )}
          </div>
        ) : null}

        {tab === "board" ? (
          <div>
            <Serif style={{ fontSize: 26, color: t.ink, display: "block", marginBottom: 4 }}>Today's Board</Serif>
            <div style={{ fontSize: 12, color: t.inkSoft, margi