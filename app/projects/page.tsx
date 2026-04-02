'use client';
import { useEffect, useRef, useState } from "react";

// ─── All images ─────────────────────────────────────────────────────────────────
const allImages = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80",
  "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&q=80",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&q=80",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&q=80",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80",
  "https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?w=400&q=80",
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80",
];

// ─── Horizontal infinite scroll strip ─────────────────────────────────────────
const MobileImageStrip = ({ reverse = false }: { reverse?: boolean }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number>(0);
  const tripled = [...allImages, ...allImages, ...allImages];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const speed = reverse ? 0.5 : -0.5;
    const animate = () => {
      posRef.current += speed;
      const singleW = track.scrollWidth / 3;
      if (posRef.current <= -singleW) posRef.current = 0;
      if (posRef.current >= 0 && reverse) posRef.current = -singleW;
      track.style.transform = `translateX(${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };
    if (reverse) posRef.current = -(track.scrollWidth / 3);
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reverse]);

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <div ref={trackRef} style={{ display: "flex", gap: "10px", willChange: "transform", width: "max-content" }}>
        {tripled.map((src, i) => (
          <div key={i} style={{ width: "130px", height: "100px", borderRadius: "12px", overflow: "hidden", flexShrink: 0, border: "1px solid #e8e8e8" }}>
            <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "grayscale(100%) contrast(1.05)" }} />
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Mobile Search ─────────────────────────────────────────────────────────────
const MobileSearch = () => {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 280);
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          display: "flex", alignItems: "center", gap: "10px",
          width: "100%", padding: "14px 18px",
          background: "#f5f5f5", border: "1.5px solid #e8e8e8",
          borderRadius: "100px", cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif", fontSize: "14px",
          fontWeight: 400, color: "#a1a1aa",
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        City, neighbourhood, or ZIP...
      </button>

      {open && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 200,
            background: "rgba(255,255,255,0.88)",
            backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
            animation: "overlayIn 0.28s cubic-bezier(.16,1,.3,1) forwards",
            padding: "80px 24px 40px",
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <button
            onClick={() => setOpen(false)}
            style={{
              position: "absolute", top: "20px", right: "20px",
              width: "36px", height: "36px", borderRadius: "50%",
              background: "#f0f0f0", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "22px", fontWeight: 900, letterSpacing: "-0.03em", color: "#18181b", marginBottom: "20px", animation: "slideUp 0.32s cubic-bezier(.16,1,.3,1) 0.06s both" }}>
            Where are you looking?
          </p>

          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            background: "#fff", border: "2px solid #000", borderRadius: "100px",
            padding: "6px 6px 6px 20px",
            boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
            animation: "slideUp 0.36s cubic-bezier(.16,1,.3,1) 0.10s both",
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              placeholder="City, neighbourhood, or ZIP…"
              style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "#18181b" }}
            />
            <button
              onClick={() => setOpen(false)}
              style={{ background: "#000", color: "#fff", border: "none", padding: "12px 22px", borderRadius: "100px", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 700, cursor: "pointer", flexShrink: 0 }}
            >
              Search
            </button>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "20px", animation: "slideUp 0.40s cubic-bezier(.16,1,.3,1) 0.16s both" }}>
            {["Dubai Marina", "Downtown", "Palm Jumeirah", "Business Bay", "JBR"].map((loc) => (
              <button key={loc} style={{ background: "#f5f5f5", border: "1.5px solid #e8e8e8", borderRadius: "100px", padding: "8px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 500, color: "#52525b", cursor: "pointer" }}>
                {loc}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

// ─── Desktop: Property Card + Animated Column ──────────────────────────────────
interface CardProps { image: string; price: string; location: string; beds: number; sqft: string; tag?: string; }

const PropertyCard = ({ image, price, location, beds, sqft, tag }: CardProps) => (
  <div style={{ position: "relative", width: "100%", borderRadius: "16px", overflow: "hidden", flexShrink: 0, border: "1px solid #e8e8e8", background: "#fff", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
    <div style={{ width: "100%", height: "180px", background: `url(${image}) center/cover no-repeat`, filter: "contrast(1.1) saturate(1.2) brightness(0.97)" }} />
    {tag && <div style={{ position: "absolute", top: "12px", left: "12px", background: "#000", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", padding: "4px 12px", borderRadius: "100px" }}>{tag}</div>}
    <div style={{ padding: "14px 16px" }}>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "18px", fontWeight: 800, color: "#000", letterSpacing: "-0.02em" }}>{price}</div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#999", marginTop: "2px" }}>{location}</div>
      <div style={{ display: "flex", gap: "8px", marginTop: "10px", paddingTop: "10px", borderTop: "1px solid #f0f0f0" }}>
        {[`${beds} BED`, `${sqft} SQFT`].map((l) => <span key={l} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#aaa", letterSpacing: "1px", background: "#f7f7f7", padding: "3px 10px", borderRadius: "100px" }}>{l}</span>)}
      </div>
    </div>
  </div>
);

const AnimatedColumn = ({ cards, direction }: { cards: CardProps[]; direction: "up" | "down" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef(0);
  const raf = useRef<number>(0);
  const doubled = [...cards, ...cards];
  useEffect(() => {
    const speed = direction === "up" ? 0.5 : -0.5;
    const tick = () => {
      if (!ref.current) return;
      pos.current -= speed;
      const half = ref.current.scrollHeight / 2;
      if (direction === "up" && pos.current <= -half) pos.current = 0;
      if (direction === "down" && pos.current >= 0) pos.current = -half;
      ref.current.style.transform = `translateY(${pos.current}px)`;
      raf.current = requestAnimationFrame(tick);
    };
    if (direction === "down") pos.current = -(ref.current?.scrollHeight ?? 0) / 2;
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [direction]);
  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: "16px", willChange: "transform" }}>
      {doubled.map((c, i) => <PropertyCard key={i} {...c} />)}
    </div>
  );
};

// ─── Data ──────────────────────────────────────────────────────────────────────
const leftCards: CardProps[]  = [
  { image: allImages[0], price: "$2,400,000", location: "Beverly Hills, CA", beds: 5, sqft: "4,200", tag: "New" },
  { image: allImages[1], price: "$890,000",   location: "Austin, TX",        beds: 3, sqft: "2,100" },
  { image: allImages[2], price: "$1,150,000", location: "Miami, FL",         beds: 4, sqft: "3,050", tag: "Hot" },
  { image: allImages[3], price: "$3,200,000", location: "Malibu, CA",        beds: 6, sqft: "5,800" },
];
const rightCards: CardProps[] = [
  { image: allImages[4], price: "$740,000",   location: "Denver, CO",    beds: 3, sqft: "1,900", tag: "Sale" },
  { image: allImages[5], price: "$1,680,000", location: "Seattle, WA",   beds: 4, sqft: "3,400" },
  { image: allImages[6], price: "$520,000",   location: "Nashville, TN", beds: 3, sqft: "1,750", tag: "New" },
  { image: allImages[7], price: "$4,500,000", location: "New York, NY",  beds: 5, sqft: "6,100" },
];
const stats = [
  { value: "12K+", label: "Properties" },
  { value: "98%",  label: "Satisfaction" },
  { value: "40+",  label: "Cities" },
];

// ─── Navbar ────────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 32px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: scrolled ? "#fff" : "transparent", borderBottom: scrolled ? "1px solid #e8e8e8" : "1px solid transparent", transition: "background-color 0.4s, border-color 0.4s" }}>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "18px", fontWeight: 900, letterSpacing: "3px", color: "#000", cursor: "pointer" }}>ESTATE</div>
      <div className="nav-links">
        {(["Buy","Rent","Sell","Agents"] as const).map((l) => (
          <a key={l} href="#" className="nav-link" onMouseEnter={(e)=>(e.currentTarget.style.color="#000")} onMouseLeave={(e)=>(e.currentTarget.style.color="#888")}>{l}</a>
        ))}
      </div>
      <button className="nav-cta" onMouseEnter={(e)=>{e.currentTarget.style.background="#333";}} onMouseLeave={(e)=>{e.currentTarget.style.background="#000";}}>List Property</button>
    </nav>
  );
};

// ─── Hero ──────────────────────────────────────────────────────────────────────
export default function HeroPage() {
  const [entered, setEntered] = useState(false);
  useEffect(() => { const t = setTimeout(() => setEntered(true), 100); return () => clearTimeout(t); }, []);
  const fade = (d: string) => `hero-fade${entered ? " entered" : ""} d${d}`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html,body{background:#fff;color:#000;overflow-x:hidden;-webkit-font-smoothing:antialiased}

        .hero-fade{opacity:0;transform:translateY(18px);transition:opacity .75s ease,transform .75s ease}
        .hero-fade.entered{opacity:1;transform:translateY(0)}
        .d0{transition-delay:0ms}.d120{transition-delay:120ms}.d240{transition-delay:240ms}
        .d360{transition-delay:360ms}.d480{transition-delay:480ms}.d600{transition-delay:600ms}

        .nav-links{display:flex;gap:36px}
        .nav-link{color:#888;text-decoration:none;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;transition:color .2s}
        .nav-cta{background:#000;border:none;color:#fff;padding:10px 22px;border-radius:100px;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;transition:background .2s}

        .search-wrapper{display:flex;align-items:center;width:100%;background:#fff;border:1.5px solid #e0e0e0;border-radius:100px;padding:6px 6px 6px 22px;gap:8px;box-shadow:0 4px 24px rgba(0,0,0,.07);transition:border-color .2s,box-shadow .2s}
        .search-wrapper:focus-within{border-color:#000;box-shadow:0 4px 28px rgba(0,0,0,.12)}
        .search-input{flex:1;background:transparent;border:none;color:#18181b;font-family:'DM Sans',sans-serif;font-size:.9rem;outline:none}
        .search-input::placeholder{color:#a1a1aa}
        .search-btn{background:#18181b;color:#fff;border:none;padding:11px 22px;border-radius:100px;font-family:'DM Sans',sans-serif;font-size:.8rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;white-space:nowrap;flex-shrink:0;transition:background .2s}
        .search-btn:hover{background:#333}

        .cta-primary{background:#000;color:#fff;border:none;padding:13px 26px;border-radius:12px;font-family:'DM Sans',sans-serif;font-size:.875rem;font-weight:700;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.22);transition:transform .22s cubic-bezier(.34,1.4,.64,1),box-shadow .22s}
        .cta-primary:hover{transform:translateY(-3px);box-shadow:0 14px 32px rgba(0,0,0,.3)}
        .cta-secondary{background:transparent;color:#3f3f46;border:1.5px solid #d4d4d8;padding:13px 20px;border-radius:12px;font-family:'DM Sans',sans-serif;font-size:.875rem;font-weight:600;cursor:pointer;transition:all .22s cubic-bezier(.34,1.2,.64,1)}
        .cta-secondary:hover{border-color:#a1a1aa;color:#18181b;background:#f9f9f9;transform:translateY(-3px)}

        @keyframes overlayIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}

        /* ── Desktop ── */
        .desktop-hero{display:grid;grid-template-columns:240px 1fr 240px;min-height:100vh;overflow:hidden;padding-top:64px;background:#fff}
        .col-side{height:calc(100vh - 64px);overflow:hidden;mask-image:linear-gradient(to bottom,transparent,black 15%,black 85%,transparent);-webkit-mask-image:linear-gradient(to bottom,transparent,black 15%,black 85%,transparent)}
        .col-left{padding:20px 12px 20px 20px}
        .col-right{padding:20px 20px 20px 12px}
        .desktop-center{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 40px;text-align:center;position:relative}
        .accent-line{position:absolute;top:80px;left:50%;transform:translateX(-50%);width:1px;height:60px;background:linear-gradient(to bottom,transparent,#e0e0e0)}

        /* Mobile — hidden by default */
        .mobile-hero{display:none}

        /* ── Mobile ≤640px ── */
        @media(max-width:640px){
          .desktop-hero{display:none!important}
          .mobile-hero{
            display:flex;flex-direction:column;
            min-height:100svh;background:#fff;
            padding-top:64px; /* push below fixed nav */
          }

          .nav-links{display:none}
          .nav-cta{padding:9px 16px;font-size:11px}

          /* top strip */
          .mob-strip{overflow:hidden;padding:14px 0}

          /* content */
          .mob-content{
            flex:1;display:flex;flex-direction:column;
            padding:24px 24px 28px;
          }

          .mob-eyebrow{
            display:inline-flex;align-items:center;gap:7px;
            background:#f5f5f5;border:1px solid #e8e8e8;
            border-radius:100px;padding:5px 14px;
            font-family:'DM Sans',sans-serif;font-size:10px;
            font-weight:600;letter-spacing:2.5px;color:#888;
            text-transform:uppercase;margin-bottom:16px;align-self:flex-start;
          }

          .mob-h1{
            font-family:'Outfit',sans-serif;
            font-size:clamp(2.2rem,9vw,2.8rem);
            font-weight:900;line-height:1.05;
            letter-spacing:-0.04em;color:#18181b;
            margin-bottom:12px;
          }

          .mob-sub{
            font-family:'DM Sans',sans-serif;font-size:14px;
            color:#71717a;line-height:1.65;
            margin-bottom:24px;max-width:300px;
          }

          .mob-search{width:100%;margin-bottom:12px}

          .mob-cta-btn{
            width:100%;background:#000;color:#fff;border:none;
            padding:16px;border-radius:14px;
            font-family:'DM Sans',sans-serif;font-size:15px;font-weight:700;
            cursor:pointer;display:flex;align-items:center;justify-content:center;
            gap:10px;margin-bottom:24px;
            box-shadow:0 6px 24px rgba(0,0,0,.18);
          }

          .mob-stats{display:flex;gap:8px;margin-bottom:0}
          .mob-stat{flex:1;text-align:center;padding:12px 8px;border-radius:12px;background:#f7f7f7}
          .mob-stat:first-child{background:#000}
          .mob-stat-num{font-family:'Outfit',sans-serif;font-size:18px;font-weight:900;letter-spacing:-0.04em;color:#000;line-height:1}
          .mob-stat:first-child .mob-stat-num{color:#fff}
          .mob-stat-lbl{font-family:'DM Sans',sans-serif;font-size:9px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#bbb;margin-top:3px}
          .mob-stat:first-child .mob-stat-lbl{color:#888}

          /* bottom strip */
          .mob-strip-bottom{overflow:hidden;padding:14px 0}
        }

        /* Tablet */
        @media(min-width:641px) and (max-width:900px){
          .desktop-hero{grid-template-columns:160px 1fr 160px}
          .nav-links{gap:20px}
        }
      `}</style>

      <Navbar />

      {/* ══ DESKTOP ══ */}
      <div className="desktop-hero">
        <div className="col-side col-left"><AnimatedColumn cards={leftCards} direction="up" /></div>

        <div className="desktop-center">
          <div className="accent-line" />

          <div className={fade("0")} style={{ display:"inline-flex",alignItems:"center",gap:"8px",background:"#f4f4f4",border:"1px solid #e8e8e8",borderRadius:"100px",padding:"6px 18px",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",letterSpacing:"3px",color:"#888",textTransform:"uppercase",marginBottom:"28px",marginTop:"40px" }}>
            <span style={{ width:"6px",height:"6px",background:"#000",borderRadius:"50%",display:"inline-block" }} />
            Premium Real Estate
          </div>

          <h1 className={fade("120")} style={{ fontFamily:"'Outfit',sans-serif",fontSize:"clamp(1.8rem,3.2vw,2.6rem)",fontWeight:900,lineHeight:1.1,letterSpacing:"-.03em",color:"#18181b",marginBottom:"28px",whiteSpace:"nowrap",transform:"scaleX(1.18)",transformOrigin:"center",display:"inline-block" }}>
            FIND YOUR{" "}
            <span style={{ background:"linear-gradient(120deg,#18181b,#52525b)",WebkitBackgroundClip:"text",backgroundClip:"text",WebkitTextFillColor:"transparent" }}>PERFECT</span>{" "}
            SPACE
          </h1>

          <p className={fade("240")} style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"15px",color:"#71717a",lineHeight:1.72,maxWidth:"360px",marginBottom:"36px",fontWeight:400 }}>
            Discover curated properties across the country's most sought-after neighbourhoods — no noise, no compromise.
          </p>

          <div className={fade("360")} style={{ width:"100%",maxWidth:"480px",marginBottom:"24px" }}>
            <div className="search-wrapper">
              <input className="search-input" placeholder="City, neighbourhood, or ZIP…" type="text" />
              <button className="search-btn">Search</button>
            </div>
          </div>

          <div className={fade("480")} style={{ display:"flex",gap:"12px",marginBottom:"48px" }}>
            <button className="cta-primary">Browse Listings</button>
            <button className="cta-secondary">Book a Tour</button>
          </div>

          <div className={fade("600")} style={{ display:"flex",gap:"8px" }}>
            {stats.map((s,i) => (
              <div key={s.label} style={{ textAlign:"center",padding:"18px 28px",minWidth:"100px",background:i===0?"#000":"#f7f7f7",borderRadius:"16px" }}>
                <div style={{ fontFamily:"'Outfit',sans-serif",fontSize:"28px",fontWeight:900,letterSpacing:"-0.04em",color:i===0?"#fff":"#000" }}>{s.value}</div>
                <div style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:i===0?"#aaa":"#bbb",letterSpacing:"2px",textTransform:"uppercase",marginTop:"4px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-side col-right"><AnimatedColumn cards={rightCards} direction="down" /></div>
      </div>

      {/* ══ MOBILE ══ */}
      <div className="mobile-hero">

        {/* TOP — horizontal infinite image row */}
        <div className="mob-strip">
          <MobileImageStrip />
        </div>

        {/* MIDDLE — content */}
        <div className="mob-content">

          <div className={`mob-eyebrow ${fade("0")}`}>
            <span style={{ width:"5px",height:"5px",background:"#000",borderRadius:"50%",display:"inline-block" }} />
            Premium Real Estate
          </div>

          <h1 className={`mob-h1 ${fade("120")}`}>
            Find your{" "}
            <span style={{ background:"linear-gradient(120deg,#18181b,#52525b)",WebkitBackgroundClip:"text",backgroundClip:"text",WebkitTextFillColor:"transparent" }}>
              perfect
            </span>
            <br />space.
          </h1>

          <p className={`mob-sub ${fade("240")}`}>
            Curated properties, honest guidance — no noise, no compromise.
          </p>

          <div className={`mob-search ${fade("360")}`}>
            <MobileSearch />
          </div>

          <button className={`mob-cta-btn ${fade("480")}`}>
            Browse Listings
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>

          <div className={`mob-stats ${fade("600")}`}>
            {stats.map((s) => (
              <div key={s.label} className="mob-stat">
                <div className="mob-stat-num">{s.value}</div>
                <div className="mob-stat-lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM — second strip scrolling opposite direction */}
        <div className="mob-strip-bottom">
          <MobileImageStrip reverse />
        </div>

      </div>
    </>
  );
}