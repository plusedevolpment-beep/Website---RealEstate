'use client';
import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Navbar from '../components/Navbar';

// ─── hero image data ──────────────────────────────────────────────────────────
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

// ─── MobileImageStrip ─────────────────────────────────────────────────────────
const MobileImageStrip = ({ reverse = false }: { reverse?: boolean }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef   = useRef(0);
  const rafRef   = useRef<number>(0);
  const tripled  = [...allImages, ...allImages, ...allImages];
  useEffect(() => {
    const track = trackRef.current; if (!track) return;
    const speed = reverse ? 0.5 : -0.5;
    const animate = () => {
      posRef.current += speed;
      const sw = track.scrollWidth / 3;
      if (posRef.current <= -sw) posRef.current = 0;
      if (posRef.current >= 0 && reverse) posRef.current = -sw;
      track.style.transform = `translateX(${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };
    if (reverse) posRef.current = -(track.scrollWidth / 3);
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reverse]);
  return (
    <div style={{ width:"100%", overflow:"hidden" }}>
      <div ref={trackRef} style={{ display:"flex", gap:"10px", willChange:"transform", width:"max-content" }}>
        {tripled.map((src,i) => (
          <div key={i} style={{ width:"130px", height:"100px", borderRadius:"14px", overflow:"hidden", flexShrink:0, border:"1px solid #e8e8e8", boxShadow:"0 4px 16px rgba(0,0,0,0.10)" }}>
            <img src={src} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", filter:"contrast(1.15) saturate(1.25) brightness(0.95)" }} />
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── MobileSearch ─────────────────────────────────────────────────────────────
const MobileSearch = () => {
  const [open,setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 320); }, [open]);
  return (
    <div style={{ width:"100%" }}>
      <button onClick={() => setOpen(true)} style={{ display:open?"none":"flex", alignItems:"center", gap:"10px", width:"100%", padding:"14px 18px", background:"#f5f5f5", border:"1.5px solid #e8e8e8", borderRadius:"100px", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:"14px", fontWeight:400, color:"#a1a1aa" }}>
        City, neighbourhood, or ZIP...
      </button>
      <div style={{ overflow:"hidden", maxHeight:open?"320px":"0px", opacity:open?1:0, transition:"max-height 0.6s cubic-bezier(.22,1,.36,1),opacity 0.5s" }}>
        <div style={{ paddingTop:"4px", paddingBottom:"4px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"10px", background:"#fff", border:"2px solid #000", borderRadius:"100px", padding:"6px 6px 6px 20px", marginBottom:"14px" }}>
            <input ref={inputRef} type="text" placeholder="City, neighbourhood, or ZIP…" style={{ flex:1, border:"none", outline:"none", background:"transparent", fontFamily:"'DM Sans',sans-serif", fontSize:"15px", color:"#18181b" }} />
            <button onClick={() => setOpen(false)} style={{ background:"#000", color:"#fff", border:"none", padding:"12px 20px", borderRadius:"100px", fontFamily:"'DM Sans',sans-serif", fontSize:"13px", fontWeight:700, cursor:"pointer", flexShrink:0 }}>Search</button>
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"8px", justifyContent:"center", marginBottom:"6px" }}>
            {["Dubai Marina","Downtown","Palm Jumeirah","Business Bay","JBR"].map(loc => (
              <button key={loc} onClick={() => setOpen(false)} style={{ background:"#f5f5f5", border:"1.5px solid #e8e8e8", borderRadius:"100px", padding:"8px 16px", fontFamily:"'DM Sans',sans-serif", fontSize:"13px", fontWeight:500, color:"#52525b", cursor:"pointer" }}>{loc}</button>
            ))}
          </div>
          <button onClick={() => setOpen(false)} style={{ display:"block", margin:"10px auto 0", background:"none", border:"none", fontFamily:"'DM Sans',sans-serif", fontSize:"12px", color:"#aaa", cursor:"pointer" }}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

// ─── AnimatedColumn ───────────────────────────────────────────────────────────
interface PropCard { image:string; price:string; location:string; beds:number; sqft:string; tag?:string; }
const PropCardCmp = ({ image, price, location, beds, sqft, tag }:PropCard) => (
  <div style={{ position:"relative", width:"100%", borderRadius:"16px", overflow:"hidden", flexShrink:0, border:"1px solid #e8e8e8", background:"#fff", boxShadow:"0 2px 16px rgba(0,0,0,0.06)" }}>
    <div style={{ width:"100%", height:"180px", background:`url(${image}) center/cover no-repeat`, filter:"contrast(1.15) saturate(1.25) brightness(0.95)" }} />
    {tag && <div style={{ position:"absolute", top:"12px", left:"12px", background:"#000", color:"#fff", fontFamily:"'DM Sans',sans-serif", fontSize:"10px", letterSpacing:"2px", textTransform:"uppercase", padding:"4px 12px", borderRadius:"100px" }}>{tag}</div>}
    <div style={{ padding:"14px 16px" }}>
      <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:"18px", fontWeight:800, color:"#000", letterSpacing:"-0.02em" }}>{price}</div>
      <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"12px", color:"#999", marginTop:"2px" }}>{location}</div>
      <div style={{ display:"flex", gap:"8px", marginTop:"10px", paddingTop:"10px", borderTop:"1px solid #f0f0f0" }}>
        {[`${beds} BED`,`${sqft} SQFT`].map(l => <span key={l} style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"11px", color:"#aaa", letterSpacing:"1px", background:"#f7f7f7", padding:"3px 10px", borderRadius:"100px" }}>{l}</span>)}
      </div>
    </div>
  </div>
);
const AnimatedColumn = ({ cards, direction }:{ cards:PropCard[]; direction:"up"|"down" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef(0);
  const raf = useRef<number>(0);
  const doubled = [...cards,...cards];
  useEffect(() => {
    const speed = direction==="up"?0.5:-0.5;
    const tick = () => {
      if (!ref.current) return;
      pos.current -= speed;
      const half = ref.current.scrollHeight/2;
      if (direction==="up" && pos.current<=-half) pos.current=0;
      if (direction==="down" && pos.current>=0) pos.current=-half;
      ref.current.style.transform=`translateY(${pos.current}px)`;
      raf.current=requestAnimationFrame(tick);
    };
    if (direction==="down") pos.current=-(ref.current?.scrollHeight??0)/2;
    raf.current=requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  },[direction]);
  return (
    <div ref={ref} style={{ display:"flex", flexDirection:"column", gap:"16px", willChange:"transform" }}>
      {doubled.map((c,i) => <PropCardCmp key={i} {...c} />)}
    </div>
  );
};

const leftCards:PropCard[] = [
  {image:allImages[0],price:"$2,400,000",location:"Beverly Hills, CA",beds:5,sqft:"4,200",tag:"New"},
  {image:allImages[1],price:"$890,000",  location:"Austin, TX",       beds:3,sqft:"2,100"},
  {image:allImages[2],price:"$1,150,000",location:"Miami, FL",        beds:4,sqft:"3,050",tag:"Hot"},
  {image:allImages[3],price:"$3,200,000",location:"Malibu, CA",       beds:6,sqft:"5,800"},
];
const rightCards:PropCard[] = [
  {image:allImages[4],price:"$740,000",  location:"Denver, CO",   beds:3,sqft:"1,900",tag:"Sale"},
  {image:allImages[5],price:"$1,680,000",location:"Seattle, WA",  beds:4,sqft:"3,400"},
  {image:allImages[6],price:"$520,000",  location:"Nashville, TN",beds:3,sqft:"1,750",tag:"New"},
  {image:allImages[7],price:"$4,500,000",location:"New York, NY", beds:5,sqft:"6,100"},
];
const stats = [{value:"12K+",label:"Properties"},{value:"98%",label:"Satisfaction"},{value:"40+",label:"Cities"}];

// ─── Pathway card data ────────────────────────────────────────────────────────
const wlfCards = [
  {id:"buy",     label:"Buy",      tagline:"Find your dream home",     desc:"Browse thousands of verified listings across sought-after neighbourhoods.", tags:["Homes","Condos","Verified"], image:"https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=90",      imgFilter:"contrast(1.4) saturate(1.6) brightness(0.88)",                         badge:"Most popular"},
  {id:"sell",    label:"Sell",     tagline:"Get the best price, fast", desc:"Expert valuations, professional photography, and maximum market exposure.",  tags:["Valuation","Photography"],   image:"https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=90", imgFilter:"contrast(1.4) saturate(1.55) brightness(0.9) hue-rotate(8deg)",        badge:null},
  {id:"invest",  label:"Invest",   tagline:"Strong ROI, smart markets",desc:"High-yield investment properties with exceptional return potential.",          tags:["ROI","Rentals","Markets"],  image:"https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=90", imgFilter:"contrast(1.45) saturate(1.7) brightness(0.88) hue-rotate(-12deg)",     badge:null},
  {id:"services",label:"Services", tagline:"End-to-end support",       desc:"Legal, mortgage, staging, and relocation — every expert in one place.",       tags:["Legal","Mortgage","Staging"],image:"https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=90", imgFilter:"contrast(1.4) saturate(1.5) brightness(0.9) hue-rotate(4deg)",         badge:null},
];

const CardIconLarge = ({id}:{id:string}) => {
  const labels: Record<string,string> = { buy:"Buy", sell:"Sell", invest:"$", services:"Svc" };
  return (
    <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"11px", fontWeight:900, letterSpacing:"0.5px", color:"inherit", userSelect:"none" }}>
      {labels[id] ?? id.slice(0,3).toUpperCase()}
    </span>
  );
};

// ─── Listing data ─────────────────────────────────────────────────────────────
const listingImgs = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=85",
  "https://images.unsplash.com/photo-1598228723793-52759bba239c?w=600&q=85",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=85",
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=85",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=85",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=85",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=85",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=85",
  "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=85",
  "https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?w=600&q=85",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=85",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=85",
];

interface Listing {
  id: number;
  type: string;
  address: string;
  city: string;
  price: number;
  priceDisplay: string;
  beds: number;
  baths: number;
  sqft: number;
  img: string;
  listingType: "By Agent" | "By Owner or other";
  propType: string;
}

const allListings: Listing[] = [
  {id:1, type:"House for sale",address:"221B Baker Street, Marylebone, London NW1 6XE",       city:"London",      price:1250000, priceDisplay:"$1,250,000", beds:2,baths:2,sqft:1440, img:listingImgs[0],  listingType:"By Agent",           propType:"Houses"},
  {id:2, type:"House for sale",address:"45 Camden High Street, Camden Town, London NW1 7JH",  city:"Camden",      price:980000,  priceDisplay:"$980,000",   beds:3,baths:1,sqft:1228, img:listingImgs[1],  listingType:"By Owner or other",  propType:"Houses"},
  {id:3, type:"House for sale",address:"12 Notting Hill Gate, Notting Hill, London W11 3JE",   city:"Notting Hill",price:2100000, priceDisplay:"$2,100,000", beds:5,baths:3,sqft:1660, img:listingImgs[2],  listingType:"By Agent",           propType:"Houses"},
  {id:4, type:"House for sale",address:"7 Kensington Palace Gardens, London W8 4QP",           city:"Kensington",  price:3450000, priceDisplay:"$3,450,000", beds:4,baths:2,sqft:2100, img:listingImgs[3],  listingType:"By Owner or other",  propType:"Houses"},
  {id:5, type:"House for sale",address:"88 Portobello Road, Notting Hill, London W11 2QB",     city:"Notting Hill",price:875000,  priceDisplay:"$875,000",   beds:2,baths:2,sqft:1050, img:listingImgs[4],  listingType:"By Agent",           propType:"Condos"},
  {id:6, type:"House for sale",address:"15 Sloane Square, Chelsea, London SW1W 8ER",           city:"Chelsea",     price:4200000, priceDisplay:"$4,200,000", beds:6,baths:4,sqft:3200, img:listingImgs[5],  listingType:"By Owner or other",  propType:"Houses"},
  {id:7, type:"Condo for sale",address:"32 Greenwich Park, London SE10 8QY",                   city:"Greenwich",   price:620000,  priceDisplay:"$620,000",   beds:1,baths:1,sqft:780,  img:listingImgs[6],  listingType:"By Agent",           propType:"Condos"},
  {id:8, type:"House for sale",address:"99 Primrose Hill Road, London NW3 3AD",                city:"Primrose Hill",price:1890000,priceDisplay:"$1,890,000", beds:4,baths:3,sqft:2400, img:listingImgs[7],  listingType:"By Agent",           propType:"Town House"},
  {id:9, type:"House for sale",address:"5 Mayfair Lane, Mayfair, London W1K 2NR",              city:"Mayfair",     price:5500000, priceDisplay:"$5,500,000", beds:6,baths:5,sqft:4100, img:listingImgs[8],  listingType:"By Owner or other",  propType:"Houses"},
  {id:10,type:"Multi Family",  address:"18 Brixton Road, Brixton, London SW9 6BU",             city:"Brixton",     price:740000,  priceDisplay:"$740,000",   beds:3,baths:2,sqft:1560, img:listingImgs[9],  listingType:"By Agent",           propType:"Multi Family"},
  {id:11,type:"House for sale",address:"27 Hampstead Heath, London NW3 1QG",                   city:"Hampstead",   price:3100000, priceDisplay:"$3,100,000", beds:5,baths:4,sqft:3600, img:listingImgs[10], listingType:"By Owner or other",  propType:"Houses"},
  {id:12,type:"Condo for sale",address:"4 Canary Wharf Plaza, London E14 5AB",                 city:"Canary Wharf",price:890000,  priceDisplay:"$890,000",   beds:2,baths:2,sqft:1100, img:listingImgs[11], listingType:"By Agent",           propType:"Condos"},
];

const PRICE_OPTIONS = [100000,250000,500000,750000,1000000,2000000,5000000];
const PRICE_LABELS  = ["$100K","$250K","$500K","$750K","$1M","$2M","$5M+"];
const PAGE_SIZE = 6;

// ─── Tour Scheduler Modal ─────────────────────────────────────────────────────
const OWNER_EMAIL  = "owner@yourdomain.com"; // ← change to real owner email
const EMAILJS_SVC  = "your_service_id";      // ← EmailJS service ID
const EMAILJS_TPL  = "your_template_id";     // ← EmailJS template ID
const EMAILJS_KEY  = "your_public_key";      // ← EmailJS public key

const TOUR_SLOTS: Record<string, string[]> = {
  Monday:    ["09:00 AM","10:00 AM","11:00 AM","02:00 PM","03:00 PM","04:00 PM"],
  Tuesday:   ["09:00 AM","10:00 AM","11:00 AM","02:00 PM","03:00 PM","04:00 PM"],
  Wednesday: ["10:00 AM","11:00 AM","01:00 PM","02:00 PM","03:00 PM"],
  Thursday:  ["09:00 AM","10:00 AM","11:00 AM","02:00 PM","03:00 PM","04:00 PM"],
  Friday:    ["09:00 AM","10:00 AM","11:00 AM","01:00 PM","02:00 PM"],
  Saturday:  ["10:00 AM","11:00 AM","12:00 PM","01:00 PM"],
  Sunday:    [],
};

type AvailDay = { date: Date; label: string; day: string };

const TourScheduler = ({ listing, onClose, onBack }: { listing: Listing; onClose: () => void; onBack: () => void }) => {
  const [mounted, setMounted]     = useState(false);
  const [step, setStep]           = useState<"pick"|"details"|"sending"|"done"|"error">("pick");
  const [selectedDay, setSelectedDay] = useState<AvailDay | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [name, setName]           = useState("");
  const [email, setEmail]         = useState("");
  const [phone, setPhone]         = useState("");
  const [note, setNote]           = useState("");

  // Only runs on client — avoids SSR/hydration mismatch
  useEffect(() => { setMounted(true); }, []);

  // Compute available days client-side only (avoids SSR crash)
  const [availDays, setAvailDays] = useState<AvailDay[]>([]);
  useEffect(() => {
    const days: AvailDay[] = [];
    const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const d = new Date();
    d.setDate(d.getDate() + 1);
    while (days.length < 12) {
      const dayName = dayNames[d.getDay()];
      if (TOUR_SLOTS[dayName]?.length > 0) {
        days.push({
          date: new Date(d),
          day: dayName,
          label: d.toLocaleDateString("en-US", { weekday:"short", month:"short", day:"numeric" }),
        });
      }
      d.setDate(d.getDate() + 1);
    }
    setAvailDays(days);
  }, []);

  // Load EmailJS once on client
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ((window as any).emailjs) return;
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
    script.onload = () => { (window as any).emailjs.init(EMAILJS_KEY); };
    document.head.appendChild(script);
  }, []);

  const sendEmail = async () => {
    setStep("sending");
    try {
      const ejs = (window as any).emailjs;
      if (!ejs) throw new Error("EmailJS not loaded");
      await ejs.send(EMAILJS_SVC, EMAILJS_TPL, {
        to_email:   OWNER_EMAIL,
        from_name:  name,
        from_email: email,
        phone:      phone || "Not provided",
        note:       note  || "None",
        property:   listing.address,
        price:      listing.priceDisplay,
        tour_date:  selectedDay!.label,
        tour_time:  selectedTime,
      });
      setStep("done");
    } catch {
      setStep("error");
    }
  };

  const canSubmit = name.trim().length > 0 && email.trim().length > 0 && email.includes("@");

  // Don't render anything until we're on the client
  if (!mounted) return null;

  return createPortal(
    <>
      <style>{`
        @keyframes tsIn{from{opacity:0;transform:translateY(28px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}
        .ts-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:99998;display:flex;align-items:center;justify-content:center;padding:16px}
        .ts-modal{background:#fff;border-radius:22px;width:100%;max-width:560px;max-height:92vh;overflow-y:auto;box-shadow:0 40px 100px rgba(0,0,0,0.28);animation:tsIn 0.32s cubic-bezier(0.22,1,0.36,1)}
        .ts-day-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
        @media(max-width:480px){.ts-day-grid{grid-template-columns:repeat(2,1fr)}}
        .ts-day-btn{padding:10px 8px;border-radius:10px;border:1.5px solid #e8e8e8;background:#fff;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;color:#444;cursor:pointer;text-align:center;transition:all 0.18s;line-height:1.4}
        .ts-day-btn:hover{border-color:#111;background:#f9f9f9}
        .ts-day-btn.sel{border-color:#111!important;background:#111!important;color:#fff!important;font-weight:700}
        .ts-time-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
        @media(max-width:400px){.ts-time-grid{grid-template-columns:repeat(2,1fr)}}
        .ts-time-btn{padding:10px 6px;border-radius:10px;border:1.5px solid #e8e8e8;background:#fff;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;color:#444;cursor:pointer;text-align:center;transition:all 0.18s}
        .ts-time-btn:hover{border-color:#111;background:#f9f9f9}
        .ts-time-btn.sel{border-color:#111!important;background:#111!important;color:#fff!important;font-weight:700}
        .ts-input{width:100%;padding:12px 14px;border:1.5px solid #e8e8e8;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:14px;color:#111;background:#fff;outline:none;transition:border-color 0.2s;box-sizing:border-box}
        .ts-input:focus{border-color:#111}
        .ts-input::placeholder{color:#bbb}
        .ts-submit{width:100%;padding:15px 0;background:#111;color:#fff;border:none;border-radius:12px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:700;cursor:pointer;transition:background 0.2s;letter-spacing:0.3px}
        .ts-submit:hover{background:#333}
        .ts-submit:disabled{background:#ccc;cursor:not-allowed}
      `}</style>
      <div className="ts-overlay" onClick={onClose}>
        <div className="ts-modal" onClick={e => e.stopPropagation()}>

          {/* Header */}
          <div style={{ position:"relative", padding:"22px 24px 18px", borderBottom:"1px solid #f0f0f0" }}>
            <button onClick={step === "details" ? () => setStep("pick") : onBack} style={{ position:"absolute", left:"20px", top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:"13px", color:"#999", padding:0 }}>
              ‹ Back
            </button>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:"17px", fontWeight:800, color:"#111", letterSpacing:"-0.02em" }}>Schedule a Tour</div>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"12px", color:"#aaa", marginTop:"3px" }}>{listing.address.split(",").slice(0,2).join(",")}</div>
            </div>
            <button onClick={onClose} style={{ position:"absolute", right:"20px", top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", fontSize:"22px", fontWeight:300, color:"#999", lineHeight:1, padding:0 }}>×</button>
          </div>

          <div style={{ padding:"24px" }}>

            {/* Step 1 — Pick date & time */}
            {step === "pick" && (
              <>
                {/* Progress */}
                <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"24px" }}>
                  <div style={{ flex:1, height:"3px", borderRadius:"2px", background:"#111" }} />
                  <div style={{ flex:1, height:"3px", borderRadius:"2px", background:"#ebebeb" }} />
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"11px", color:"#aaa", marginLeft:"4px" }}>Step 1 of 2</span>
                </div>

                {/* Date picker */}
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"12px", fontWeight:700, color:"#aaa", letterSpacing:"2px", textTransform:"uppercase", marginBottom:"12px" }}>Choose a Date</div>
                <div className="ts-day-grid" style={{ marginBottom:"24px" }}>
                  {availDays.map(d => (
                    <button key={d.label} className={`ts-day-btn${selectedDay?.label === d.label ? " sel" : ""}`} onClick={() => { setSelectedDay(d); setSelectedTime(""); }}>
                      {d.label}
                    </button>
                  ))}
                </div>

                {/* Time picker */}
                {selectedDay && (
                  <>
                    <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"12px", fontWeight:700, color:"#aaa", letterSpacing:"2px", textTransform:"uppercase", marginBottom:"12px" }}>
                      Available Times — {selectedDay.day}
                    </div>
                    <div className="ts-time-grid" style={{ marginBottom:"28px" }}>
                      {TOUR_SLOTS[selectedDay.day].map(t => (
                        <button key={t} className={`ts-time-btn${selectedTime === t ? " sel" : ""}`} onClick={() => setSelectedTime(t)}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                <button
                  className="ts-submit"
                  disabled={!selectedDay || !selectedTime}
                  onClick={() => setStep("details")}
                  style={{ background:(!selectedDay || !selectedTime) ? "#e0e0e0" : "#111", color:(!selectedDay || !selectedTime) ? "#aaa" : "#fff", cursor:(!selectedDay || !selectedTime) ? "not-allowed" : "pointer" }}
                >
                  Continue — {selectedDay && selectedTime ? `${selectedDay.label} at ${selectedTime}` : "Select a date & time"}
                </button>
              </>
            )}

            {/* Step 2 — Contact details */}
            {step === "details" && (
              <>
                {/* Progress */}
                <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"24px" }}>
                  <div style={{ flex:1, height:"3px", borderRadius:"2px", background:"#111" }} />
                  <div style={{ flex:1, height:"3px", borderRadius:"2px", background:"#111" }} />
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"11px", color:"#aaa", marginLeft:"4px" }}>Step 2 of 2</span>
                </div>

                {/* Booking summary */}
                <div style={{ background:"#f7f7f7", borderRadius:"12px", padding:"14px 16px", marginBottom:"22px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div>
                    <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"13px", fontWeight:700, color:"#111" }}>{selectedDay!.label}</div>
                    <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"12px", color:"#888", marginTop:"2px" }}>{selectedTime}</div>
                  </div>
                  <button onClick={() => setStep("pick")} style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"12px", color:"#888", background:"none", border:"1px solid #e0e0e0", borderRadius:"8px", padding:"6px 12px", cursor:"pointer" }}>Change</button>
                </div>

                <div style={{ display:"flex", flexDirection:"column", gap:"12px", marginBottom:"22px" }}>
                  <input className="ts-input" placeholder="Your full name *" value={name} onChange={e => setName(e.target.value)} />
                  <input className="ts-input" placeholder="Email address *" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                  <input className="ts-input" placeholder="Phone number (optional)" type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
                  <textarea className="ts-input" placeholder="Any notes for the agent? (optional)" value={note} onChange={e => setNote(e.target.value)} rows={3} style={{ resize:"none" }} />
                </div>

                <button className="ts-submit" disabled={!canSubmit} onClick={sendEmail} style={{ background:canSubmit ? "#111" : "#e0e0e0", color:canSubmit ? "#fff" : "#aaa", cursor:canSubmit ? "pointer" : "not-allowed" }}>
                  Confirm Booking
                </button>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"11px", color:"#bbb", textAlign:"center", marginTop:"12px" }}>
                  A confirmation will be sent to your email.
                </div>
              </>
            )}

            {/* Sending */}
            {step === "sending" && (
              <div style={{ textAlign:"center", padding:"40px 0" }}>
                <div style={{ width:"44px", height:"44px", border:"3px solid #e8e8e8", borderTop:"3px solid #111", borderRadius:"50%", margin:"0 auto 20px", animation:"spin 0.8s linear infinite" }} />
                <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:"18px", fontWeight:800, color:"#111", marginBottom:"8px" }}>Sending your booking...</div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"13px", color:"#aaa" }}>This will just take a moment.</div>
              </div>
            )}

            {/* Success */}
            {step === "done" && (
              <div style={{ textAlign:"center", padding:"40px 0" }}>
                <div style={{ width:"56px", height:"56px", borderRadius:"50%", background:"#111", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", fontSize:"24px", color:"#fff" }}>✓</div>
                <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:"20px", fontWeight:900, color:"#111", marginBottom:"8px", letterSpacing:"-0.03em" }}>Tour Booked!</div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"14px", color:"#888", lineHeight:1.6, marginBottom:"8px" }}>
                  <strong style={{ color:"#111" }}>{selectedDay!.label}</strong> at <strong style={{ color:"#111" }}>{selectedTime}</strong>
                </div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"13px", color:"#aaa", marginBottom:"28px" }}>
                  A confirmation has been sent to <strong style={{ color:"#555" }}>{email}</strong>
                </div>
                <button onClick={onClose} style={{ padding:"13px 36px", background:"#111", color:"#fff", border:"none", borderRadius:"12px", fontFamily:"'DM Sans',sans-serif", fontSize:"14px", fontWeight:700, cursor:"pointer" }}>Done</button>
              </div>
            )}

            {/* Error */}
            {step === "error" && (
              <div style={{ textAlign:"center", padding:"40px 0" }}>
                <div style={{ width:"56px", height:"56px", borderRadius:"50%", background:"#f5f5f5", border:"2px solid #e0e0e0", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", fontSize:"24px", color:"#999" }}>!</div>
                <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:"20px", fontWeight:900, color:"#111", marginBottom:"8px" }}>Something went wrong</div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"13px", color:"#aaa", marginBottom:"28px" }}>Could not send your booking. Please try again or call us directly.</div>
                <div style={{ display:"flex", gap:"10px", justifyContent:"center" }}>
                  <button onClick={() => setStep("details")} style={{ padding:"12px 24px", background:"#111", color:"#fff", border:"none", borderRadius:"12px", fontFamily:"'DM Sans',sans-serif", fontSize:"13px", fontWeight:700, cursor:"pointer" }}>Try Again</button>
                  <button onClick={onClose} style={{ padding:"12px 24px", background:"#fff", color:"#555", border:"1.5px solid #e0e0e0", borderRadius:"12px", fontFamily:"'DM Sans',sans-serif", fontSize:"13px", fontWeight:600, cursor:"pointer" }}>Close</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

// ─── Detail Modal ─────────────────────────────────────────────────────────────
const DetailModal = ({ listing, onClose }: { listing: Listing; onClose: () => void }) => {
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  if (showTour) {
    return <TourScheduler listing={listing} onClose={onClose} onBack={() => setShowTour(false)} />;
  }

  return (
    <div
      onClick={onClose}
      style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.55)", zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center", padding:"20px" }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ background:"#fff", borderRadius:"20px", width:"100%", maxWidth:"560px", overflow:"hidden", boxShadow:"0 32px 80px rgba(0,0,0,0.22)", animation:"modalIn 0.3s cubic-bezier(0.22,1,0.36,1)" }}
      >
        <style>{`@keyframes modalIn{from{opacity:0;transform:translateY(24px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}`}</style>
        <div style={{ position:"relative", height:"260px" }}>
          <img src={listing.img} alt={listing.address} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
          <button onClick={onClose} style={{ position:"absolute", top:"14px", right:"14px", width:"36px", height:"36px", borderRadius:"50%", background:"rgba(255,255,255,0.92)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 2px 10px rgba(0,0,0,0.18)", fontSize:"20px", fontWeight:300, color:"#111", lineHeight:1 }}>
            ×
          </button>
        </div>
        <div style={{ padding:"24px 28px 28px" }}>
          <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"11px", color:"#aaa", marginBottom:"6px", letterSpacing:"1px", textTransform:"uppercase" }}>{listing.type}</div>
          <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:"22px", fontWeight:900, color:"#111", letterSpacing:"-0.03em", marginBottom:"4px" }}>{listing.priceDisplay}</div>
          <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"14px", color:"#555", marginBottom:"22px", lineHeight:1.5 }}>{listing.address}</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"12px", marginBottom:"24px" }}>
            {[
              {label:"Bedrooms", value:`${listing.beds}`},
              {label:"Bathrooms", value:`${listing.baths}`},
              {label:"Square Feet", value:`${listing.sqft.toLocaleString()}`},
            ].map(item => (
              <div key={item.label} style={{ background:"#f7f7f7", borderRadius:"12px", padding:"14px 12px", textAlign:"center" }}>
                <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:"20px", fontWeight:800, color:"#111" }}>{item.value}</div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"11px", color:"#999", marginTop:"3px", letterSpacing:"0.5px" }}>{item.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"14px" }}>
            <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"12px", color:"#aaa" }}>Listed by: <strong style={{ color:"#555" }}>{listing.listingType}</strong></span>
            <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"12px", background:"#f0f0f0", padding:"4px 12px", borderRadius:"100px", color:"#555" }}>{listing.propType}</span>
          </div>
          <div style={{ display:"flex", gap:"10px" }}>
            <button
              onClick={() => setShowTour(true)}
              style={{ flex:1, padding:"13px 0", background:"#111", color:"#fff", border:"none", borderRadius:"10px", fontFamily:"'DM Sans',sans-serif", fontSize:"13px", fontWeight:700, cursor:"pointer", letterSpacing:"0.5px", transition:"background 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.background="#333")}
              onMouseLeave={e => (e.currentTarget.style.background="#111")}
            >
              Schedule Tour
            </button>
            <a
              href="/contact"
              style={{ flex:1, padding:"13px 0", background:"#fff", color:"#111", border:"1.5px solid #e0e0e0", borderRadius:"10px", fontFamily:"'DM Sans',sans-serif", fontSize:"13px", fontWeight:700, cursor:"pointer", letterSpacing:"0.5px", textDecoration:"none", display:"flex", alignItems:"center", justifyContent:"center", transition:"border-color 0.2s,background 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor="#111"; (e.currentTarget as HTMLAnchorElement).style.background="#f7f7f7"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor="#e0e0e0"; (e.currentTarget as HTMLAnchorElement).style.background="#fff"; }}
            >
              Contact Agent
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Mobile Filter Drawer ─────────────────────────────────────────────────────
interface FilterState {
  propTypes: string[];
  listingType: string;
  priceMin: number;
  priceMax: number;
  beds: string;
  baths: string;
}

const MobileFilterDrawer = ({
  open, onClose, filters, onApply
}: {
  open: boolean;
  onClose: () => void;
  filters: FilterState;
  onApply: (f: FilterState) => void;
}) => {
  const [local, setLocal]     = useState<FilterState>(filters);
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (open) {
      // Snapshot scroll position so body-lock restores it correctly
      const scrollY = window.scrollY;
      setLocal(filters);
      setVisible(true);
      // Lock body in-place at current scroll — this makes position:fixed = current viewport
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top      = `-${scrollY}px`;
      document.body.style.width    = "100%";
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    } else {
      setAnimate(false);
      const t = setTimeout(() => {
        // Read back the scroll offset from the body top offset, then restore
        const scrollY = Math.abs(parseFloat(document.body.style.top || "0"));
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top      = "";
        document.body.style.width    = "";
        window.scrollTo(0, scrollY);
        setVisible(false);
      }, 380);
      return () => clearTimeout(t);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const togglePropType = (t: string) =>
    setLocal(p => ({ ...p, propTypes: p.propTypes.includes(t) ? p.propTypes.filter(x=>x!==t) : [...p.propTypes, t] }));

  const Chk = ({ lbl, checked, onChange }: { lbl:string; checked:boolean; onChange:()=>void }) => (
    <label style={{ display:"flex", alignItems:"center", gap:"14px", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:"15px", color:"#222", padding:"8px 0", borderBottom:"1px solid #f5f5f5" }}>
      <span
        onClick={e => { e.preventDefault(); onChange(); }}
        style={{ width:"22px", height:"22px", borderRadius:"6px", border:`2px solid ${checked?"#111":"#d0d0d0"}`, background:checked?"#111":"#fff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, cursor:"pointer", transition:"all 0.18s" }}
      >
        {checked && <span style={{ color:"#fff", fontSize:"13px", lineHeight:1, fontWeight:700, marginTop:"-1px" }}>✓</span>}
      </span>
      {lbl}
    </label>
  );

  if (!visible) return null;

  return createPortal(
    <>
      <style>{`
        .drawer-overlay{
          position:fixed;
          top:0; left:0; right:0; bottom:0;
          z-index:99999;
          background:rgba(0,0,0,0.52);
          display:flex;
          flex-direction:column;
          justify-content:flex-end;
          opacity:0;
          transition:opacity 0.28s ease;
          pointer-events:none;
        }
        .drawer-overlay.visible{opacity:1;pointer-events:all;}
        .drawer-sheet{
          background:#fff;
          border-radius:22px 22px 0 0;
          width:100%;
          max-height:88vh;
          display:flex;
          flex-direction:column;
          transform:translateY(100%);
          transition:transform 0.38s cubic-bezier(0.32,1,0.38,1);
          overflow:hidden;
        }
        .drawer-sheet.open{transform:translateY(0);}
        .drawer-body{
          flex:1;
          overflow-y:auto;
          overscroll-behavior:contain;
          -webkit-overflow-scrolling:touch;
          padding:20px 22px 16px;
        }
        .drawer-footer{
          flex-shrink:0;
          padding:14px 22px 28px;
          background:#fff;
          border-top:1px solid #f0f0f0;
        }
      `}</style>
      {/* Rendered into document.body via portal — escapes ALL overflow:hidden ancestors */}
      <div className={`drawer-overlay${animate ? " visible" : ""}`}>
        <div className={`drawer-sheet${animate ? " open" : ""}`}>
          {/* Handle bar */}
          <div style={{ display:"flex", justifyContent:"center", padding:"14px 0 6px", flexShrink:0 }}>
            <div style={{ width:"40px", height:"4px", borderRadius:"2px", background:"#e0e0e0" }} />
          </div>

          {/* Header */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"6px 22px 14px", borderBottom:"1px solid #f0f0f0", flexShrink:0 }}>
            <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"20px", fontWeight:800, color:"#111", letterSpacing:"-0.03em" }}>Filters</span>
            <button
              onClick={() => setLocal({ propTypes:[], listingType:"", priceMin:100000, priceMax:5000000, beds:"Any", baths:"Any" })}
              style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"13px", color:"#999", background:"none", border:"none", cursor:"pointer", textDecoration:"underline", padding:"4px 0" }}
            >
              Clear all
            </button>
          </div>

          {/* Scrollable body */}
          <div className="drawer-body">
            {/* Property Type */}
            <div style={{ marginBottom:"26px" }}>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"11px", fontWeight:700, color:"#aaa", marginBottom:"10px", letterSpacing:"2px", textTransform:"uppercase" }}>Property Type</div>
              {["Town House","Houses","Multi Family","Condos","Land","Apartments","Warehouse"].map(t =>
                <Chk key={t} lbl={t} checked={local.propTypes.includes(t)} onChange={() => togglePropType(t)} />
              )}
            </div>

            {/* Listing Type */}
            <div style={{ marginBottom:"26px" }}>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"11px", fontWeight:700, color:"#aaa", marginBottom:"10px", letterSpacing:"2px", textTransform:"uppercase" }}>Listing Type</div>
              {["By Agent","By Owner or other"].map(t =>
                <Chk key={t} lbl={t} checked={local.listingType===t} onChange={() => setLocal(p => ({ ...p, listingType: p.listingType===t ? "" : t }))} />
              )}
            </div>

            {/* Price Range */}
            <div style={{ marginBottom:"26px" }}>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"11px", fontWeight:700, color:"#aaa", marginBottom:"10px", letterSpacing:"2px", textTransform:"uppercase" }}>Price Range</div>
              <div style={{ display:"flex", gap:"12px" }}>
                {([["Min", local.priceMin, (v:number) => setLocal(p=>({...p,priceMin:v}))], ["Max", local.priceMax, (v:number) => setLocal(p=>({...p,priceMax:v}))]] as [string,number,(v:number)=>void][]).map(([lbl,val,setter]) => (
                  <div key={lbl} style={{ flex:1 }}>
                    <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"12px", color:"#aaa", marginBottom:"8px" }}>{lbl}</div>
                    <select value={val} onChange={e=>setter(Number(e.target.value))} style={{ width:"100%", padding:"12px 10px", borderRadius:"10px", border:"1.5px solid #e0e0e0", fontFamily:"'DM Sans',sans-serif", fontSize:"14px", color:"#111", background:"#fff", cursor:"pointer", outline:"none" }}>
                      {PRICE_OPTIONS.map((v,i)=><option key={v} value={v}>{PRICE_LABELS[i]}</option>)}
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {/* Beds */}
            <div style={{ marginBottom:"26px" }}>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"11px", fontWeight:700, color:"#aaa", marginBottom:"10px", letterSpacing:"2px", textTransform:"uppercase" }}>Bedrooms</div>
              <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
                {["Any","1","2","3","4+"].map(v => (
                  <button key={v} onClick={()=>setLocal(p=>({...p,beds:v}))} style={{ padding:"10px 18px", borderRadius:"9px", border:`1.5px solid ${local.beds===v?"#111":"#e0e0e0"}`, background:local.beds===v?"#111":"#fff", color:local.beds===v?"#fff":"#555", fontFamily:"'DM Sans',sans-serif", fontSize:"14px", fontWeight:local.beds===v?700:400, cursor:"pointer", transition:"all 0.18s" }}>
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Baths */}
            <div style={{ marginBottom:"12px" }}>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"11px", fontWeight:700, color:"#aaa", marginBottom:"10px", letterSpacing:"2px", textTransform:"uppercase" }}>Bathrooms</div>
              <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
                {["Any","1","2","3","4+"].map(v => (
                  <button key={v} onClick={()=>setLocal(p=>({...p,baths:v}))} style={{ padding:"10px 18px", borderRadius:"9px", border:`1.5px solid ${local.baths===v?"#111":"#e0e0e0"}`, background:local.baths===v?"#111":"#fff", color:local.baths===v?"#fff":"#555", fontFamily:"'DM Sans',sans-serif", fontSize:"14px", fontWeight:local.baths===v?700:400, cursor:"pointer", transition:"all 0.18s" }}>
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky footer — Apply + Close */}
          <div className="drawer-footer">
            <button
              onClick={() => { onApply(local); onClose(); }}
              style={{ width:"100%", padding:"16px 0", background:"#111", color:"#fff", border:"none", borderRadius:"12px", fontFamily:"'DM Sans',sans-serif", fontSize:"15px", fontWeight:700, cursor:"pointer", letterSpacing:"0.5px", marginBottom:"10px", transition:"background 0.2s" }}
              onTouchStart={e=>{ (e.currentTarget as HTMLButtonElement).style.background="#333"; }}
              onTouchEnd={e=>{ (e.currentTarget as HTMLButtonElement).style.background="#111"; }}
            >
              Apply Filters
            </button>
            <button
              onClick={onClose}
              style={{ width:"100%", padding:"14px 0", background:"#fff", color:"#555", border:"1.5px solid #e0e0e0", borderRadius:"12px", fontFamily:"'DM Sans',sans-serif", fontSize:"15px", fontWeight:600, cursor:"pointer", letterSpacing:"0.3px", transition:"background 0.2s" }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

// ─── Listings section ─────────────────────────────────────────────────────────
const ListingsSection = ({ visible }: { visible:boolean }) => {
  const [search, setSearch]         = useState("");
  const [filters, setFilters]       = useState<FilterState>({
    propTypes: [],
    listingType: "By Owner or other",
    priceMin: 100000,
    priceMax: 5000000,
    beds: "Any",
    baths: "Any",
  });
  const [favorites, setFavorites]   = useState<Set<number>>(new Set());
  const [page, setPage]             = useState(1);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [entered, setEntered]       = useState<boolean[]>(Array(PAGE_SIZE).fill(false));

  // Sidebar state (desktop) — all blank/unfiltered by default
  const [sideSearch, setSideSearch]             = useState("");
  const [sidePriceMin, setSidePriceMin]         = useState(100000);
  const [sidePriceMax, setSidePriceMax]         = useState(5000000);
  const [sideBeds, setSideBeds]                 = useState("Any");
  const [sideBaths, setSideBaths]               = useState("Any");
  const [sidePropTypes, setSidePropTypes]       = useState<string[]>([]);
  const [sideListingType, setSideListingType]   = useState("");

  // Build active filter object from sidebar (desktop) values
  const desktopFilters: FilterState = {
    propTypes: sidePropTypes,
    listingType: sideListingType,
    priceMin: sidePriceMin,
    priceMax: sidePriceMax,
    beds: sideBeds,
    baths: sideBaths,
  };

  // Apply filtering logic
  const applyFilters = useCallback((f: FilterState, searchVal: string, list: Listing[]) => {
    return list.filter(l => {
      const q = searchVal.toLowerCase().trim();
      if (q && !l.address.toLowerCase().includes(q) && !l.city.toLowerCase().includes(q)) return false;
      if (f.propTypes.length > 0 && !f.propTypes.includes(l.propType)) return false;
      if (l.price < f.priceMin || l.price > f.priceMax) return false;
      if (f.listingType && !["", "Any"].includes(f.listingType) && l.listingType !== f.listingType) return false;
      if (f.beds !== "Any") {
        const n = f.beds === "4+" ? 4 : parseInt(f.beds);
        if (f.beds === "4+" ? l.beds < 4 : l.beds !== n) return false;
      }
      if (f.baths !== "Any") {
        const n = f.baths === "4+" ? 4 : parseInt(f.baths);
        if (f.baths === "4+" ? l.baths < 4 : l.baths !== n) return false;
      }
      return true;
    });
  }, []);

  // Desktop: filter uses sidebar state; mobile: filter uses drawer state
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const activeFilters = isMobile ? filters : desktopFilters;
  const activeSearch  = isMobile ? search : sideSearch;
  const filtered      = applyFilters(activeFilters, activeSearch, allListings);
  const totalPages    = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage      = Math.min(page, totalPages);
  const paginated     = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  // Reset to page 1 when filters change
  useEffect(() => { setPage(1); }, [search, filters, sidePropTypes, sideListingType, sidePriceMin, sidePriceMax, sideBeds, sideBaths, sideSearch]);

  // Entrance animation
  useEffect(() => {
    if (!visible) { setEntered(Array(PAGE_SIZE).fill(false)); return; }
    paginated.forEach((_,i) => setTimeout(() => setEntered(p => { const n=[...p]; n[i]=true; return n; }), 60+i*90));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[visible, safePage]);

  useEffect(() => {
    setEntered(Array(PAGE_SIZE).fill(false));
    paginated.forEach((_,i) => setTimeout(() => setEntered(p => { const n=[...p]; n[i]=true; return n; }), 60+i*90));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[safePage]);

  const toggleFav = (id: number) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleDesktopPropType = (t:string) =>
    setSidePropTypes(p => p.includes(t)?p.filter(x=>x!==t):[...p,t]);

  const SideChk = ({lbl,checked,onChange}:{lbl:string;checked:boolean;onChange:()=>void}) => (
    <label style={{ display:"flex",alignItems:"center",gap:"10px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"13.5px",color:"#333",padding:"3px 0" }}>
      <span onClick={onChange} style={{ width:"18px",height:"18px",borderRadius:"4px",border:`2px solid ${checked?"#111":"#ccc"}`,background:checked?"#111":"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,cursor:"pointer",transition:"all 0.2s" }}>
        {checked && <span style={{ color:"#fff", fontSize:"12px", lineHeight:1, fontWeight:700, marginTop:"-1px" }}>✓</span>}
      </span>
      {lbl}
    </label>
  );

  return (
    <div style={{
      overflow:"hidden",
      maxHeight: visible?"4000px":"0",
      opacity: visible?1:0,
      transform: visible?"translateY(0)":"translateY(32px)",
      transition:"max-height 0.85s cubic-bezier(0.22,1,0.36,1),opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1)",
    }}>
      {selectedListing && <DetailModal listing={selectedListing} onClose={() => setSelectedListing(null)} />}
      <MobileFilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        onApply={f => { setFilters(f); setPage(1); }}
      />

      <div style={{ background:"#f9f9f9", borderTop:"1px solid #ebebeb" }}>
        <div style={{ maxWidth:"1200px",margin:"0 auto",padding:"48px 32px 72px" }}>

          {/* ── Desktop search bar ── */}
          <div className="ls-desktop-bar" style={{ display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px",flexWrap:"wrap" }}>
            <div style={{ flex:1,minWidth:"200px",display:"flex",alignItems:"center",background:"#fff",border:"1.5px solid #e0e0e0",borderRadius:"10px",padding:"10px 16px",gap:"10px",boxShadow:"0 2px 12px rgba(0,0,0,0.05)" }}>
              <input value={sideSearch} onChange={e=>setSideSearch(e.target.value)} placeholder="Search by city or address…" style={{ flex:1,border:"none",outline:"none",fontFamily:"'DM Sans',sans-serif",fontSize:"14px",color:"#111",background:"transparent" }} />
              {sideSearch && <button onClick={()=>setSideSearch("")} style={{ background:"none",border:"none",cursor:"pointer",color:"#bbb",lineHeight:1,padding:0,fontSize:"18px",fontWeight:300 }}>×</button>}
            </div>
            <button style={{ padding:"11px 28px",background:"#111",color:"#fff",border:"none",borderRadius:"10px",fontFamily:"'DM Sans',sans-serif",fontSize:"13px",fontWeight:700,letterSpacing:"1px",cursor:"pointer",transition:"background 0.2s" }}
              onMouseEnter={e=>(e.currentTarget.style.background="#333")} onMouseLeave={e=>(e.currentTarget.style.background="#111")}>
              Search
            </button>
            <div style={{ display:"flex",alignItems:"center",gap:"12px",marginLeft:"auto" }}>
              <span style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"13px",color:"#aaa" }}>View By:</span>
              <span style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"13px",fontWeight:700,color:"#111",borderBottom:"2px solid #111",paddingBottom:"2px",cursor:"pointer" }}>Card</span>
            </div>
          </div>

          {/* ── Mobile top bar ── */}
          <div className="ls-mobile-bar" style={{ display:"none",gap:"10px",marginBottom:"16px" }}>
            <div style={{ flex:1,display:"flex",alignItems:"center",background:"#fff",border:"1.5px solid #e0e0e0",borderRadius:"10px",padding:"10px 14px",gap:"8px",boxShadow:"0 2px 10px rgba(0,0,0,0.04)" }}>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="City or address…" style={{ flex:1,border:"none",outline:"none",fontFamily:"'DM Sans',sans-serif",fontSize:"14px",color:"#111",background:"transparent" }} />
              {search && <button onClick={()=>setSearch("")} style={{ background:"none",border:"none",cursor:"pointer",color:"#bbb",lineHeight:1,padding:0,fontSize:"18px",fontWeight:300 }}>×</button>}
            </div>
            <button onClick={()=>setDrawerOpen(true)} style={{ display:"flex",alignItems:"center",gap:"6px",padding:"10px 16px",background:"#fff",border:"1.5px solid #e0e0e0",borderRadius:"10px",fontFamily:"'DM Sans',sans-serif",fontSize:"13px",fontWeight:600,color:"#111",cursor:"pointer",whiteSpace:"nowrap",flexShrink:0 }}>
              Filter
              {(filters.propTypes.length > 0 || filters.beds !== "Any" || filters.baths !== "Any") &&
                <span style={{ background:"#111",color:"#fff",borderRadius:"50%",width:"16px",height:"16px",fontSize:"10px",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                  {[filters.propTypes.length > 0 ? 1 : 0, filters.beds !== "Any" ? 1 : 0, filters.baths !== "Any" ? 1 : 0].reduce((a,b)=>a+b,0)}
                </span>
              }
            </button>
          </div>

          {/* Breadcrumb */}
          <div style={{ marginBottom:"28px" }}>
            <div style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"13px",color:"#aaa" }}>All Cities &nbsp;| &nbsp;Real estate</div>
            <div style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"13px",color:"#888",marginTop:"2px" }}>{filtered.length} propert{filtered.length===1?"y":"ies"} found</div>
          </div>

          {/* Layout */}
          <div style={{ display:"flex",gap:"28px",alignItems:"flex-start" }}>

            {/* Desktop Sidebar */}
            <div className="ls-sidebar" style={{ width:"252px",flexShrink:0,background:"#fff",borderRadius:"16px",border:"1px solid #ebebeb",padding:"22px",boxShadow:"0 2px 16px rgba(0,0,0,0.05)" }}>
              <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"22px" }}>
                <span style={{ fontFamily:"'Outfit',sans-serif",fontSize:"17px",fontWeight:800,color:"#111",letterSpacing:"-0.02em" }}>Filters</span>
                <button onClick={() => { setSidePropTypes([]); setSideListingType(""); setSidePriceMin(100000); setSidePriceMax(5000000); setSideBeds("Any"); setSideBaths("Any"); }} style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:"#888",background:"none",border:"none",cursor:"pointer",textDecoration:"underline" }}>Clear Filters</button>
              </div>

              {/* Property Type */}
              <div style={{ marginBottom:"22px" }}>
                <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"12px" }}>
                  <span style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"13px",fontWeight:700,color:"#111" }}>Property Type</span>
                </div>
                {["Town House","Houses","Multi Family","Condos","Land","Apartments","Warehouse"].map(t => <SideChk key={t} lbl={t} checked={sidePropTypes.includes(t)} onChange={()=>toggleDesktopPropType(t)} />)}
              </div>
              <div style={{ height:"1px",background:"#f0f0f0",margin:"0 0 22px" }} />

              {/* Listing Types */}
              <div style={{ marginBottom:"22px" }}>
                <div style={{ marginBottom:"12px" }}><span style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"13px",fontWeight:700,color:"#111" }}>Listing Types</span></div>
                {["By Agent","By Owner or other"].map(t => <SideChk key={t} lbl={t} checked={sideListingType===t} onChange={()=>setSideListingType(prev => prev===t ? "" : t)} />)}
              </div>
              <div style={{ height:"1px",background:"#f0f0f0",margin:"0 0 22px" }} />

              {/* Price Range */}
              <div style={{ marginBottom:"22px" }}>
                <div style={{ marginBottom:"12px" }}><span style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"13px",fontWeight:700,color:"#111" }}>Price Range</span></div>
                <div style={{ display:"flex",gap:"6px",marginBottom:"6px" }}>
                  <span style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"11px",color:"#aaa",flex:1 }}>Minimum</span>
                  <span style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"11px",color:"#aaa",flex:1 }}>Maximum</span>
                </div>
                <div style={{ display:"flex",gap:"8px" }}>
                  {([[sidePriceMin,setSidePriceMin],[sidePriceMax,setSidePriceMax]] as [number,(v:number)=>void][]).map(([val,setter],idx) => (
                    <select key={idx} value={val} onChange={e=>setter(Number(e.target.value))} style={{ flex:1,padding:"8px 8px",borderRadius:"8px",border:"1.5px solid #e0e0e0",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:"#111",background:"#fff",cursor:"pointer",outline:"none" }}>
                      {PRICE_OPTIONS.map((v,i)=><option key={v} value={v}>{PRICE_LABELS[i]}</option>)}
                    </select>
                  ))}
                </div>
              </div>
              <div style={{ height:"1px",background:"#f0f0f0",margin:"0 0 22px" }} />

              {/* Beds & Baths */}
              <div>
                <span style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"13px",fontWeight:700,color:"#111",display:"block",marginBottom:"14px" }}>Beds & Baths</span>
                {([["Beds",sideBeds,setSideBeds],["Baths",sideBaths,setSideBaths]] as [string,string,(v:string)=>void][]).map(([lbl,val,setter]) => (
                  <div key={lbl} style={{ marginBottom:"14px" }}>
                    <span style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:"#888",display:"block",marginBottom:"8px" }}>{lbl}</span>
                    <div style={{ display:"flex",gap:"5px",flexWrap:"wrap" }}>
                      {["Any","1","2","3","4+"].map(v => (
                        <button key={v} onClick={()=>setter(v)} style={{ padding:"5px 9px",borderRadius:"7px",border:`1.5px solid ${val===v?"#111":"#e0e0e0"}`,background:val===v?"#111":"#fff",color:val===v?"#fff":"#555",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",fontWeight:val===v?700:400,cursor:"pointer",transition:"all 0.18s" }}>
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Grid + Pagination */}
            <div style={{ flex:1, minWidth:0 }}>
              {paginated.length === 0 ? (
                <div style={{ textAlign:"center", padding:"60px 20px", fontFamily:"'DM Sans',sans-serif", color:"#aaa" }}>
                  <div style={{ fontSize:"16px", fontWeight:600, color:"#555", marginBottom:"6px" }}>No listings match your filters</div>
                  <div style={{ fontSize:"13px" }}>Try adjusting your search or clearing some filters.</div>
                </div>
              ) : (
                <div className="listing-grid" style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"18px" }}>
                  {paginated.map((listing,idx) => {
                    const isFav = favorites.has(listing.id);
                    return (
                      <div key={listing.id}
                        className="l-card"
                        style={{ background:"#fff",borderRadius:"16px",overflow:"hidden",border:"1px solid #ebebeb",boxShadow:"0 2px 20px rgba(0,0,0,0.06)",opacity:entered[idx]?1:0,transform:entered[idx]?"translateY(0) scale(1)":"translateY(28px) scale(0.97)",transition:"opacity 0.52s cubic-bezier(0.22,1,0.36,1),transform 0.52s cubic-bezier(0.22,1,0.36,1),box-shadow 0.3s" }}>
                        <div style={{ position:"relative",height:"184px",overflow:"hidden" }}>
                          <img src={listing.img} alt={listing.address} className="l-img"
                            style={{ width:"100%",height:"100%",objectFit:"cover",display:"block",filter:"contrast(1.15) saturate(1.2) brightness(0.97)",transition:"transform 0.5s ease" }} />
                          {/* Favorite button on image */}
                          <button
                            onClick={() => toggleFav(listing.id)}
                            style={{ position:"absolute",top:"10px",right:"10px",width:"32px",height:"32px",borderRadius:"50%",background:"rgba(255,255,255,0.92)",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"transform 0.2s cubic-bezier(0.22,1,0.36,1)",fontSize:"15px",lineHeight:1 }}
                          >
                            {isFav ? "♥" : "♡"}
                          </button>
                        </div>
                        <div style={{ padding:"14px 15px 16px" }}>
                          <div style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"11px",color:"#aaa",marginBottom:"5px" }}>{listing.type}</div>
                          <div style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"13px",fontWeight:600,color:"#111",lineHeight:1.45,marginBottom:"4px" }}>{listing.priceDisplay}</div>
                          <div style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:"#888",marginBottom:"10px",lineHeight:1.4 }}>{listing.address}</div>
                          <div style={{ display:"flex",alignItems:"center",gap:"8px",marginBottom:"13px",flexWrap:"wrap" }}>
                            {[
                              `${listing.beds} bed`,
                              `${listing.baths} bath`,
                              `${listing.sqft.toLocaleString()} sqft`,
                            ].map((label,i) => (
                              <span key={i} style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"11px",color:"#777",background:"#f5f5f5",padding:"3px 9px",borderRadius:"100px",letterSpacing:"0.2px" }}>
                                {label}
                              </span>
                            ))}
                          </div>
                          <button
                            className="more-btn"
                            onClick={() => setSelectedListing(listing)}
                            style={{ width:"100%",padding:"10px 0",background:"#111",color:"#fff",border:"none",borderRadius:"9px",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",fontWeight:700,cursor:"pointer",letterSpacing:"0.5px",transition:"background 0.2s,transform 0.2s" }}>
                            More details
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",marginTop:"36px",flexWrap:"wrap" }}>
                  <button
                    onClick={() => setPage(p=>Math.max(1,p-1))}
                    disabled={safePage===1}
                    style={{ display:"flex",alignItems:"center",gap:"6px",padding:"9px 18px",background:safePage===1?"#f5f5f5":"#fff",color:safePage===1?"#ccc":"#111",border:"1.5px solid #e0e0e0",borderRadius:"9px",fontFamily:"'DM Sans',sans-serif",fontSize:"13px",fontWeight:600,cursor:safePage===1?"not-allowed":"pointer",transition:"all 0.18s" }}
                  >
                    &lsaquo; Prev
                  </button>

                  {Array.from({length:totalPages},(_,i)=>i+1).map(n => (
                    <button key={n} onClick={()=>setPage(n)} style={{ width:"36px",height:"36px",borderRadius:"9px",border:`1.5px solid ${n===safePage?"#111":"#e0e0e0"}`,background:n===safePage?"#111":"#fff",color:n===safePage?"#fff":"#555",fontFamily:"'DM Sans',sans-serif",fontSize:"13px",fontWeight:n===safePage?700:400,cursor:"pointer",transition:"all 0.18s",display:"flex",alignItems:"center",justifyContent:"center" }}>
                      {n}
                    </button>
                  ))}

                  <button
                    onClick={() => setPage(p=>Math.min(totalPages,p+1))}
                    disabled={safePage===totalPages}
                    style={{ display:"flex",alignItems:"center",gap:"6px",padding:"9px 18px",background:safePage===totalPages?"#f5f5f5":"#fff",color:safePage===totalPages?"#ccc":"#111",border:"1.5px solid #e0e0e0",borderRadius:"9px",fontFamily:"'DM Sans',sans-serif",fontSize:"13px",fontWeight:600,cursor:safePage===totalPages?"not-allowed":"pointer",transition:"all 0.18s" }}
                  >
                    Next &rsaquo;
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      <style>{`
        .l-card:hover{box-shadow:0 10px 40px rgba(0,0,0,0.12)!important;transform:translateY(-4px) scale(1)!important}
        .l-card:hover .l-img{transform:scale(1.07)!important}
        .more-btn:hover{background:#333!important;transform:translateY(-1px)!important}

        /* Mobile: hide desktop bar, show mobile bar, hide sidebar, 2-col grid */
        @media(max-width:768px){
          .ls-desktop-bar{display:none!important}
          .ls-mobile-bar{display:flex!important}
          .ls-sidebar{display:none!important}
          .listing-grid{grid-template-columns:repeat(2,1fr)!important;gap:12px!important}
        }
        @media(max-width:400px){
          .listing-grid{grid-template-columns:1fr!important}
        }
        @media(min-width:769px) and (max-width:960px){
          .listing-grid{grid-template-columns:repeat(2,1fr)!important}
        }
      `}</style>
    </div>
  );
};

// ─── Featured listing data (module-level — no hooks in arrays) ────────────────
const FL_PROPS = [
  { id:1, tag:"Featured", image:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=85", location:"Greenville, Jersey City", mediaCount:7, title:"Luxury House in GreenVille", price:"$ 250,000", desc:"This property is mostly wooded and sits high on a hit plot overlooking the Mohawk river.", beds:2, baths:6, sqft:1440, agent:"Jhons colair", avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80" },
  { id:2, tag:"Featured", image:"https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=85", location:"Greenville, Jersey City", mediaCount:7, title:"Luxury House in GreenVille", price:"$ 250,000", desc:"This property is mostly wooded and sits high on a hit plot overlooking the Mohawk river.", beds:2, baths:6, sqft:1440, agent:"Jhons colair", avatar:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80" },
  { id:3, tag:"Featured", image:"https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=85", location:"Greenville, Jersey City", mediaCount:7, title:"Luxury House in GreenVille", price:"$ 258,000", desc:"This property is mostly wooded and sits high on a hit plot overlooking the Mohawk river.", beds:2, baths:6, sqft:1440, agent:"Jhons colair", avatar:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80" },
  { id:4, tag:"Featured", image:"https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=85", location:"Greenville, Jersey City", mediaCount:5, title:"Luxury House in GreenVille", price:"$ 310,000", desc:"This property is mostly wooded and sits high on a hit plot overlooking the Mohawk river.", beds:3, baths:4, sqft:1820, agent:"Jhons colair", avatar:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80" },
  { id:5, tag:"Featured", image:"https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=85", location:"Greenville, Jersey City", mediaCount:6, title:"Luxury House in GreenVille", price:"$ 420,000", desc:"This property is mostly wooded and sits high on a hit plot overlooking the Mohawk river.", beds:4, baths:3, sqft:2200, agent:"Jhons colair", avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80" },
];

// One card — needs its own hook for liked state, so it's a tiny component
const FLCard = ({ p, imgHeight = 220 }: { p: typeof FL_PROPS[0]; imgHeight?: number }) => {
  const [liked, setLiked] = useState(false);
  return (
    <div className="fl-card">
      <div className="fl-img-wrap" style={{ height:`${imgHeight}px` }}>
        <img src={p.image} alt={p.title} className="fl-img" />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,rgba(0,0,0,0) 45%,rgba(0,0,0,0.55) 100%)", pointerEvents:"none" }} />
        <div className="fl-tag">{p.tag}</div>
        <div className="fl-loc">
          <span style={{ width:"8px", height:"8px", borderRadius:"50%", background:"#fff", display:"inline-block", flexShrink:0 }} />
          {p.location}
        </div>
        <div className="fl-media">
          <span style={{ fontSize:"11px", marginRight:"2px" }}>&#9654;</span>
          <span style={{ fontSize:"13px", fontWeight:700 }}>{p.mediaCount}</span>
        </div>
      </div>
      <div className="fl-body">
        <div className="fl-title">{p.title}</div>
        <div className="fl-price">{p.price}</div>
        <div className="fl-desc">{p.desc}</div>
        <div className="fl-specs">
          <span className="fl-spec"><span style={{ fontWeight:700, color:"#111", marginRight:"2px" }}>{p.beds}</span> bd</span>
          <span style={{ width:"3px", height:"3px", borderRadius:"50%", background:"#ddd", display:"inline-block" }} />
          <span className="fl-spec"><span style={{ fontWeight:700, color:"#111", marginRight:"2px" }}>{p.baths}</span> ba</span>
          <span style={{ width:"3px", height:"3px", borderRadius:"50%", background:"#ddd", display:"inline-block" }} />
          <span className="fl-spec"><span style={{ fontWeight:700, color:"#111", marginRight:"2px" }}>{p.sqft.toLocaleString()}</span> sqft</span>
        </div>
        <div className="fl-footer">
          <div className="fl-agent">
            <img src={p.avatar} alt={p.agent} className="fl-avatar" />
            <span className="fl-agent-name">{p.agent}</span>
          </div>
          <div className="fl-actions">
            <button className="fl-action-btn">&#8599;</button>
            <button className={`fl-action-btn${liked ? " liked" : ""}`} onClick={() => setLiked(l => !l)}>{liked ? "♥" : "♡"}</button>
            <button className="fl-action-btn">+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Featured section — desktop 3-col grid + mobile swipe carousel
const FeaturedSection = () => {
  const [slide, setSlide] = useState(0);
  return (
    <div style={{ background:"#fff", padding:"80px 0" }}>
      <style>{`
        .fl-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;max-width:1200px;margin:0 auto;padding:0 48px}
        @media(max-width:900px){.fl-grid{grid-template-columns:repeat(2,1fr)}}
        .fl-card{background:#fff;border-radius:20px;border:1px solid #ebebeb;overflow:hidden;box-shadow:0 2px 20px rgba(0,0,0,0.06);transition:box-shadow 0.3s,transform 0.3s;cursor:pointer}
        .fl-card:hover{box-shadow:0 12px 48px rgba(0,0,0,0.13);transform:translateY(-6px)}
        .fl-img-wrap{position:relative;overflow:hidden;background:#eee}
        .fl-img{width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.55s ease}
        .fl-card:hover .fl-img{transform:scale(1.06)}
        .fl-tag{position:absolute;top:14px;left:14px;background:#fff;color:#111;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:700;padding:5px 14px;border-radius:100px;letter-spacing:0.5px}
        .fl-loc{position:absolute;bottom:12px;left:12px;display:flex;align-items:center;gap:5px;font-family:'DM Sans',sans-serif;font-size:11px;color:#fff;font-weight:500;text-shadow:0 1px 4px rgba(0,0,0,0.5)}
        .fl-media{position:absolute;bottom:12px;right:12px;display:flex;align-items:center;gap:6px;font-family:'DM Sans',sans-serif;font-size:11px;color:#fff;font-weight:500;text-shadow:0 1px 4px rgba(0,0,0,0.5)}
        .fl-body{padding:18px 18px 16px}
        .fl-title{font-family:'Outfit',sans-serif;font-size:17px;font-weight:800;color:#111;letter-spacing:-0.02em;margin-bottom:4px}
        .fl-price{font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;color:#111;margin-bottom:8px}
        .fl-desc{font-family:'DM Sans',sans-serif;font-size:12.5px;color:#999;line-height:1.6;margin-bottom:14px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
        .fl-specs{display:flex;align-items:center;gap:14px;margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid #f0f0f0}
        .fl-spec{font-family:'DM Sans',sans-serif;font-size:12px;color:#888}
        .fl-footer{display:flex;align-items:center;justify-content:space-between}
        .fl-agent{display:flex;align-items:center;gap:10px}
        .fl-avatar{width:34px;height:34px;border-radius:50%;object-fit:cover;border:2px solid #f0f0f0}
        .fl-agent-name{font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;color:#333}
        .fl-actions{display:flex;align-items:center;gap:6px}
        .fl-action-btn{width:32px;height:32px;border-radius:8px;border:1.5px solid #e8e8e8;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:14px;color:#888;transition:all 0.18s;font-family:'DM Sans',sans-serif;padding:0}
        .fl-action-btn:hover{border-color:#111;color:#111;background:#f7f7f7}
        .fl-action-btn.liked{color:#111;border-color:#111}
        .fl-desktop-grid{display:grid}
        .fl-mob-carousel{display:none}
        .fl-mob-nav{display:none}
        @media(max-width:640px){
          .fl-desktop-grid{display:none!important}
          .fl-mob-carousel{display:block!important}
          .fl-mob-nav{display:flex!important}
          .fl-section-head{padding:0 20px!important;margin-bottom:28px!important}
        }
        .fl-mob-vp{overflow:hidden;padding:0 20px 28px}
        .fl-mob-track{display:flex;transition:transform 0.42s cubic-bezier(0.32,1,0.38,1)}
        .fl-mob-slide{flex:0 0 calc(100vw - 40px);margin-right:16px;flex-shrink:0}
        .fl-mob-nav{align-items:center;justify-content:center;gap:20px;padding:8px 20px 4px}
        .fl-mob-arrow{width:48px;height:48px;border-radius:50%;border:1.5px solid #e0e0e0;background:#fff;font-size:20px;font-weight:300;color:#111;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.18s;padding:0}
        .fl-mob-arrow:disabled{opacity:0.2;pointer-events:none}
        .fl-mob-arrow:active{background:#111;color:#fff;border-color:#111}
        .fl-mob-dots{display:flex;gap:6px;align-items:center}
        .fl-mob-dot{width:7px;height:7px;border-radius:50%;background:#ddd;border:none;padding:0;cursor:pointer;transition:all 0.3s}
        .fl-mob-dot.on{background:#111;width:22px;border-radius:100px}
      `}</style>

      {/* Header */}
      <div className="fl-section-head" style={{ textAlign:"center", marginBottom:"52px", padding:"0 48px" }}>
        <h2 style={{ fontFamily:"'Outfit',sans-serif", fontSize:"clamp(1.8rem,3.5vw,2.6rem)", fontWeight:900, color:"#111", letterSpacing:"-0.04em", marginBottom:"10px" }}>Featured Listing</h2>
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"15px", color:"#aaa", margin:0 }}>Discover the Best Handpicked Properties</p>
      </div>

      {/* Desktop 3-col grid — first 3 cards */}
      <div className="fl-grid fl-desktop-grid">
        {FL_PROPS.slice(0, 3).map(p => <FLCard key={p.id} p={p} imgHeight={220} />)}
      </div>

      {/* Mobile swipe carousel — all 5 cards */}
      <div className="fl-mob-carousel">
        <div className="fl-mob-vp">
          <div className="fl-mob-track" style={{ transform:`translateX(calc(-${slide} * (100vw - 24px)))` }}>
            {FL_PROPS.map(p => (
              <div key={p.id} className="fl-mob-slide">
                <FLCard p={p} imgHeight={240} />
              </div>
            ))}
          </div>
        </div>
        <div className="fl-mob-nav">
          <button className="fl-mob-arrow" onClick={() => setSlide(s => Math.max(0, s - 1))} disabled={slide === 0}>‹</button>
          <div className="fl-mob-dots">
            {FL_PROPS.map((_, i) => (
              <button key={i} className={`fl-mob-dot${i === slide ? " on" : ""}`} onClick={() => setSlide(i)} />
            ))}
          </div>
          <button className="fl-mob-arrow" onClick={() => setSlide(s => Math.min(FL_PROPS.length - 1, s + 1))} disabled={slide === FL_PROPS.length - 1}>›</button>
        </div>
      </div>
    </div>
  );
};

// CTA section
const CTASection = () => (
  <div style={{ background:"#111" }}>
    <style>{`
      .cta-outer{padding:80px 48px;max-width:1200px;margin:0 auto}
      .cta-wrap{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
      .cta-stat-cards{display:flex;flex-direction:column;gap:14px}
      .cta-stat-card{border-radius:14px;padding:20px 22px;display:flex;align-items:center;gap:18px}
      .cta-btns-row{display:flex;gap:12px;flex-wrap:wrap}
      .cta-btn-w{background:#fff;color:#111;border:none;padding:14px 28px;border-radius:12px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:700;cursor:pointer;transition:all 0.22s;white-space:nowrap}
      .cta-btn-w:hover{background:#f0f0f0;transform:translateY(-2px)}
      .cta-btn-o{background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,0.28);padding:14px 28px;border-radius:12px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.22s;white-space:nowrap}
      .cta-btn-o:hover{border-color:#fff;background:rgba(255,255,255,0.06);transform:translateY(-2px)}

      @media(max-width:768px){
        .cta-outer{padding:52px 20px}
        .cta-wrap{grid-template-columns:1fr!important;gap:32px!important}
        .cta-btn-w,.cta-btn-o{width:100%;text-align:center;padding:14px 0}
        .cta-btns-row{flex-direction:column;gap:10px}
        /* Stat cards go horizontal 3-col on mobile to save vertical space */
        .cta-stat-cards{flex-direction:row!important;gap:10px}
        .cta-stat-card{flex:1;flex-direction:column!important;align-items:flex-start!important;gap:6px!important;padding:14px 14px!important;border-radius:12px!important}
        .cta-stat-val{font-size:20px!important;min-width:unset!important}
        .cta-stat-lbl{font-size:11px!important;line-height:1.4!important}
      }
      @media(max-width:380px){
        .cta-stat-cards{flex-direction:column!important}
      }
    `}</style>
    <div className="cta-outer">
      <div className="cta-wrap">
        {/* Left — copy */}
        <div>
          <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:"100px", padding:"5px 16px", fontFamily:"'DM Sans',sans-serif", fontSize:"10px", letterSpacing:"3px", color:"rgba(255,255,255,0.55)", textTransform:"uppercase", marginBottom:"20px" }}>
            <span style={{ width:"5px", height:"5px", borderRadius:"50%", background:"#fff", display:"inline-block" }} />
            Ready to move?
          </div>
          <h2 style={{ fontFamily:"'Outfit',sans-serif", fontSize:"clamp(1.9rem,4vw,3.2rem)", fontWeight:900, color:"#fff", letterSpacing:"-0.04em", lineHeight:1.08, marginBottom:"16px" }}>
            Find your next<br />
            <span style={{ color:"rgba(255,255,255,0.35)" }}>home today.</span>
          </h2>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"14px", color:"rgba(255,255,255,0.48)", lineHeight:1.72, marginBottom:"28px", maxWidth:"400px" }}>
            Browse over 12,000 verified listings across 40+ cities. Get matched with a local expert who knows your market.
          </p>
          <div className="cta-btns-row">
            <button className="cta-btn-w">Browse All Listings</button>
            <button className="cta-btn-o">Talk to an Agent</button>
          </div>
        </div>

        {/* Right — stat cards */}
        <div className="cta-stat-cards">
          {[
            { value:"12,000+", label:"Verified properties across all major cities", accent:false },
            { value:"98%",     label:"Client satisfaction from 4,000+ closed deals", accent:true  },
            { value:"40+",     label:"Cities with dedicated local agents", accent:false },
          ].map((s, i) => (
            <div key={i} className="cta-stat-card" style={{ background:s.accent?"#fff":"rgba(255,255,255,0.06)", border:`1px solid ${s.accent?"#fff":"rgba(255,255,255,0.1)"}` }}>
              <div className="cta-stat-val" style={{ fontFamily:"'Outfit',sans-serif", fontSize:"26px", fontWeight:900, color:s.accent?"#111":"#fff", letterSpacing:"-0.04em", flexShrink:0, minWidth:"86px" }}>{s.value}</div>
              <div className="cta-stat-lbl" style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"13px", color:s.accent?"#555":"rgba(255,255,255,0.48)", lineHeight:1.55 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ─── WhatLookingFor ────────────────────────────────────────────────────────────
const WhatLookingFor = () => {
  const [active,setActive]           = useState(0);
  const [openId,setOpenId]           = useState<string|null>(null);
  const [pressedArrow,setPressedArrow] = useState<"prev"|"next"|null>(null);
  const listingAnchor                = useRef<HTMLDivElement>(null);
  const touchX = useRef(0);
  const touchY = useRef(0);

  const fireArrow = useCallback((dir:"prev"|"next") => {
    setPressedArrow(dir);
    setTimeout(() => setPressedArrow(null), 280);
    setActive(p => dir==="prev"?Math.max(0,p-1):Math.min(wlfCards.length-1,p+1));
  },[]);

  const handleExplore = useCallback((id:string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (id !== "buy") return;
    const opening = openId !== id;
    setOpenId(opening ? id : null);
    if (opening) {
      setTimeout(() => listingAnchor.current?.scrollIntoView({ behavior:"smooth", block:"start" }), 80);
    }
  },[openId]);

  const handleCardClick = useCallback((id:string, index:number) => {
    setActive(index);
    if (id !== "buy") return;
    const opening = openId !== id;
    setOpenId(opening ? id : null);
    if (opening) {
      setTimeout(() => listingAnchor.current?.scrollIntoView({ behavior:"smooth", block:"start" }), 80);
    }
  },[openId]);

  const handleMobileExplore = useCallback((id:string) => {
    if (id !== "buy") return;
    const opening = openId !== id;
    setOpenId(opening ? id : null);
    if (opening) {
      setTimeout(() => listingAnchor.current?.scrollIntoView({ behavior:"smooth", block:"start" }), 80);
    }
  },[openId]);

  const onTouchStart = (e:React.TouchEvent) => { touchX.current=e.touches[0].clientX; touchY.current=e.touches[0].clientY; };
  const onTouchEnd   = (e:React.TouchEvent) => {
    const dx=touchX.current-e.changedTouches[0].clientX;
    const dy=Math.abs(touchY.current-e.changedTouches[0].clientY);
    if(Math.abs(dx)>50&&Math.abs(dx)>dy) dx>0?fireArrow("next"):fireArrow("prev");
  };

  return (
    <>
      <section className="wlf-section">
        <style>{`
          @keyframes floatUp{0%{transform:translateY(0) scale(1)}50%{transform:translateY(-50px) scale(1.07)}100%{transform:translateY(0) scale(1)}}
          .wlf-bubble{position:absolute;border-radius:50%;background:#000;opacity:0.035;pointer-events:none;animation:floatUp ease-in-out infinite}
          @media(max-width:767px){.wlf-bubble{display:none!important}}
          .wlf-section{background:#fff;padding:100px 0 0;position:relative;overflow:hidden}
          .wlf-head{text-align:center;margin-bottom:64px;padding:0 52px;position:relative;z-index:2}
          @media(max-width:767px){.wlf-head{padding:0 20px;margin-bottom:32px}}
          .wlf-eyebrow{display:inline-flex;align-items:center;gap:8px;background:#f4f4f4;border:1px solid #e8e8e8;border-radius:100px;padding:6px 18px;font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:3px;color:#888;text-transform:uppercase;margin-bottom:20px}
          .wlf-title{font-family:'Outfit',sans-serif;font-size:clamp(2rem,5vw,3.6rem);font-weight:900;color:#111;letter-spacing:-0.04em;line-height:1.06;margin-bottom:14px}
          @media(max-width:767px){.wlf-title{font-size:1.85rem}}
          .wlf-subtitle{font-family:'DM Sans',sans-serif;font-size:15px;color:#aaa;line-height:1.7;max-width:480px;margin:0 auto}
          @media(max-width:767px){.wlf-subtitle{font-size:13px}}

          .wlf-desktop{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;padding:0 52px;max-width:1200px;margin:0 auto;position:relative;z-index:2}
          @media(max-width:767px){.wlf-desktop{display:none}}
          @media(min-width:768px) and (max-width:1024px){.wlf-desktop{grid-template-columns:repeat(2,1fr)}}

          .wlf-card{position:relative;border-radius:24px;overflow:hidden;cursor:pointer;background:#fff;border:2px solid #ebebeb;box-shadow:0 4px 28px rgba(0,0,0,0.07);transition:transform 0.45s cubic-bezier(0.22,1,0.36,1),box-shadow 0.45s cubic-bezier(0.22,1,0.36,1),border-color 0.3s;will-change:transform;display:flex;flex-direction:column;}
          .wlf-card:hover{transform:translateY(-12px) scale(1.018);box-shadow:0 32px 72px rgba(0,0,0,0.16);border-color:#ccc}
          .wlf-card.wlf-active{transform:translateY(-14px) scale(1.022);box-shadow:0 36px 80px rgba(0,0,0,0.20);border-color:#111}
          .wlf-card.wlf-open{border-color:#111;box-shadow:0 24px 60px rgba(0,0,0,0.18)}
          .wlf-card.wlf-no-nav{cursor:default}
          .wlf-card.wlf-no-nav .wlf-explore{cursor:default;opacity:0.55;pointer-events:none}
          .wlf-img-zone{position:relative;height:240px;overflow:hidden;background:#eee;flex-shrink:0}
          .wlf-img{width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.65s cubic-bezier(0.22,1,0.36,1)}
          .wlf-card:hover .wlf-img,.wlf-card.wlf-active .wlf-img,.wlf-card.wlf-open .wlf-img{transform:scale(1.09)}
          .wlf-glass{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 30%,rgba(0,0,0,0.72) 100%);opacity:0;transition:opacity 0.4s;pointer-events:none}
          .wlf-card:hover .wlf-glass,.wlf-card.wlf-active .wlf-glass,.wlf-card.wlf-open .wlf-glass{opacity:1}
          .wlf-top{position:absolute;top:14px;left:14px;right:14px;display:flex;align-items:center;justify-content:space-between;z-index:4}
          .wlf-icon-ring{width:42px;height:42px;border-radius:14px;background:rgba(255,255,255,0.92);color:#111;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 12px rgba(0,0,0,0.14);transition:background 0.3s,color 0.3s,transform 0.45s cubic-bezier(0.22,1,0.36,1)}
          .wlf-card.wlf-active .wlf-icon-ring,.wlf-card.wlf-open .wlf-icon-ring{background:#111;color:#fff;transform:rotate(10deg) scale(1.12)}
          .wlf-badge{background:#111;color:#fff;font-family:'DM Sans',sans-serif;font-size:9px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;padding:5px 13px;border-radius:100px}
          .wlf-img-cta{position:absolute;bottom:16px;left:16px;right:16px;display:flex;align-items:center;justify-content:space-between;z-index:4;opacity:0;transform:translateY(8px);transition:opacity 0.32s,transform 0.32s}
          .wlf-card:hover .wlf-img-cta,.wlf-card.wlf-active .wlf-img-cta,.wlf-card.wlf-open .wlf-img-cta{opacity:1;transform:translateY(0)}
          .wlf-img-cta-lbl{font-family:'DM Sans',sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#fff}
          .wlf-img-cta-circ{width:30px;height:30px;border-radius:50%;background:#fff;color:#111;display:flex;align-items:center;justify-content:center;transition:transform 0.3s cubic-bezier(0.22,1,0.36,1)}
          .wlf-card:hover .wlf-img-cta-circ,.wlf-card.wlf-open .wlf-img-cta-circ{transform:translateX(3px)}
          .wlf-body{padding:20px 20px 0;background:#fff;flex:1;display:flex;flex-direction:column}
          .wlf-label{font-family:'Outfit',sans-serif;font-size:22px;font-weight:900;color:#111;letter-spacing:-0.03em;margin-bottom:4px;transition:letter-spacing 0.3s}
          .wlf-card.wlf-active .wlf-label{letter-spacing:-0.05em}
          .wlf-tagline{font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;color:#555;margin-bottom:10px}
          .wlf-desc{font-family:'DM Sans',sans-serif;font-size:12.5px;color:#999;line-height:1.65;margin-bottom:14px}
          .wlf-chips{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:18px;margin-top:auto}
          .wlf-chip{background:#f4f4f4;border:1px solid #e8e8e8;border-radius:100px;padding:4px 12px;font-family:'DM Sans',sans-serif;font-size:11px;color:#888;transition:background 0.28s,border-color 0.28s,color 0.28s}
          .wlf-card:hover .wlf-chip,.wlf-card.wlf-active .wlf-chip,.wlf-card.wlf-open .wlf-chip{background:#111;border-color:#111;color:#fff}
          .wlf-card.wlf-active .wlf-chip:nth-child(1),.wlf-card.wlf-open .wlf-chip:nth-child(1){transition-delay:0ms}
          .wlf-card.wlf-active .wlf-chip:nth-child(2),.wlf-card.wlf-open .wlf-chip:nth-child(2){transition-delay:55ms}
          .wlf-card.wlf-active .wlf-chip:nth-child(3),.wlf-card.wlf-open .wlf-chip:nth-child(3){transition-delay:110ms}
          .wlf-explore{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:13px 0 14px;background:#111;color:#fff;border:none;border-radius:0 0 22px 22px;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;cursor:pointer;transition:background 0.22s;flex-shrink:0}
          .wlf-explore:hover{background:#333}
          .wlf-explore:active{transform:scale(0.99)}
          .wlf-explore.wlf-open-btn{background:#333}
          .wlf-bar{position:absolute;bottom:0;left:0;right:0;height:3px;background:#111;border-radius:0 0 3px 3px;transform:scaleX(0);transform-origin:left;transition:transform 0.5s cubic-bezier(0.22,1,0.36,1)}
          .wlf-card:hover .wlf-bar{transform:scaleX(0.4)}
          .wlf-card.wlf-active .wlf-bar,.wlf-card.wlf-open .wlf-bar{transform:scaleX(1)}
          .wlf-dots{display:flex;justify-content:center;gap:8px;margin-top:28px;padding:0 52px 48px}
          @media(max-width:767px){.wlf-dots{display:none}}
          .wlf-dot{height:7px;border-radius:100px;background:#ddd;border:none;cursor:pointer;padding:0;transition:width 0.4s cubic-bezier(0.22,1,0.36,1),background 0.3s;width:7px}
          .wlf-dot.on{background:#111;width:26px}

          .wlf-mob{display:none;flex-direction:column;align-items:center}
          @media(max-width:767px){.wlf-mob{display:flex}}
          .mob-vp{width:100%;overflow:hidden;padding:12px 0 28px}
          .mob-track{display:flex;transition:transform 0.44s cubic-bezier(0.32,1,0.38,1);will-change:transform}
          .mob-slide{flex:0 0 100vw;padding:0 20px;box-sizing:border-box}
          .mob-card{width:100%;background:#fff;border-radius:26px;overflow:hidden;border:2px solid #ebebeb;box-shadow:0 8px 36px rgba(0,0,0,0.09);transition:border-color 0.3s,box-shadow 0.4s,transform 0.38s cubic-bezier(0.22,1,0.36,1)}
          .mob-card.mob-active{border-color:#111;box-shadow:0 18px 56px rgba(0,0,0,0.16);transform:translateY(-4px)}
          .mob-img-zone{position:relative;height:230px;overflow:hidden}
          .mob-img{width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.55s ease}
          .mob-card.mob-active .mob-img{transform:scale(1.05)}
          .mob-glass{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 30%,rgba(0,0,0,0.7) 100%);opacity:0;transition:opacity 0.4s;pointer-events:none}
          .mob-card.mob-active .mob-glass{opacity:1}
          .mob-top{position:absolute;top:14px;left:16px;right:16px;display:flex;align-items:center;justify-content:space-between;z-index:3}
          .mob-icon{width:44px;height:44px;border-radius:14px;background:rgba(255,255,255,0.93);color:#111;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 12px rgba(0,0,0,0.12);transition:background 0.3s,color 0.3s,transform 0.42s cubic-bezier(0.22,1,0.36,1)}
          .mob-card.mob-active .mob-icon{background:#111;color:#fff;transform:rotate(6deg) scale(1.08)}
          .mob-badge{background:#111;color:#fff;font-family:'DM Sans',sans-serif;font-size:9px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;padding:5px 13px;border-radius:100px}
          .mob-body{padding:24px 22px 0;display:flex;flex-direction:column;align-items:center;text-align:center}
          .mob-label{font-family:'Outfit',sans-serif;font-size:30px;font-weight:900;color:#111;letter-spacing:-0.04em;line-height:1.1;margin-bottom:6px}
          .mob-tagline{font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;color:#555;margin-bottom:10px}
          .mob-desc{font-family:'DM Sans',sans-serif;font-size:14px;color:#888;line-height:1.65;margin-bottom:18px;max-width:290px}
          .mob-chips{display:flex;flex-wrap:wrap;gap:7px;justify-content:center;margin-bottom:22px}
          .mob-chip{background:#f4f4f4;border:1px solid #e8e8e8;border-radius:100px;padding:5px 14px;font-family:'DM Sans',sans-serif;font-size:12px;color:#888;transition:background 0.3s,color 0.3s,border-color 0.3s}
          .mob-card.mob-active .mob-chip{background:#111;color:#fff;border-color:#111}
          .mob-explore{display:flex;align-items:center;justify-content:center;gap:10px;width:calc(100% + 44px);margin-left:-22px;margin-right:-22px;padding:17px 0;background:#111;color:#fff;border:none;border-radius:0 0 24px 24px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;cursor:pointer;-webkit-tap-highlight-color:transparent;transition:background 0.22s,transform 0.28s cubic-bezier(0.22,1,0.36,1)}
          .mob-explore:active{background:#333;transform:scale(0.97)}
          .mob-explore.mob-no-nav{opacity:0.45;cursor:default;pointer-events:none}
          .mob-nav{display:flex;align-items:center;justify-content:space-between;width:100%;padding:0 20px;margin-top:6px}
          .mob-arrow{width:54px;height:54px;border-radius:50%;background:#fff;border:2px solid #e0e0e0;box-shadow:0 4px 18px rgba(0,0,0,0.08);display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0;-webkit-tap-highlight-color:transparent;transition:background 0.18s,border-color 0.18s,transform 0.2s cubic-bezier(0.22,1,0.36,1),box-shadow 0.18s}
          .mob-arrow:disabled{opacity:0.18;pointer-events:none}
          .mob-arrow:active,.mob-arrow.pressed{background:#111;border-color:#111;transform:scale(0.85);box-shadow:0 2px 8px rgba(0,0,0,0.18);color:#fff!important}
          .mob-dots{display:flex;align-items:center;gap:9px}
          .mob-dot{height:7px;border-radius:100px;background:#ddd;border:none;cursor:pointer;padding:0;transition:width 0.38s cubic-bezier(0.22,1,0.36,1),background 0.3s;width:7px}
          .mob-dot.on{background:#111;width:24px}
          .mob-counter{font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;color:#bbb;min-width:36px;text-align:center}
          .mob-counter strong{color:#111;font-weight:800}
        `}</style>

        {[{w:360,h:360,t:3,l:0,d:10,dl:0},{w:210,h:210,t:60,l:82,d:13,dl:2},{w:270,h:270,t:20,l:54,d:15,dl:5},{w:155,h:155,t:70,l:20,d:8,dl:1},{w:230,h:230,t:40,l:88,d:12,dl:3},{w:115,h:115,t:14,l:66,d:7,dl:4},{w:300,h:300,t:74,l:45,d:16,dl:6},{w:135,h:135,t:5,l:37,d:11,dl:2}].map((b,i)=>(
          <div key={i} className="wlf-bubble" style={{width:b.w,height:b.h,top:`${b.t}%`,left:`${b.l}%`,animationDuration:`${b.d}s`,animationDelay:`${b.dl}s`}} />
        ))}

        <div className="wlf-head">
          <div className="wlf-eyebrow"><span style={{width:"5px",height:"5px",background:"#000",borderRadius:"50%",display:"inline-block"}} />Your journey starts here</div>
          <h2 className="wlf-title">What are you <em style={{fontStyle:"italic",color:"#ccc"}}>looking for?</em></h2>
          <p className="wlf-subtitle">Choose your path — we&apos;ll guide you every step of the way.</p>
        </div>

        <div className="wlf-desktop">
          {wlfCards.map((card,i) => {
            const isOpen = openId===card.id;
            const isBuy  = card.id === "buy";
            return (
              <div key={card.id} className={`wlf-card${i===active?" wlf-active":""}${isOpen?" wlf-open":""}${!isBuy?" wlf-no-nav":""}`} onClick={() => handleCardClick(card.id, i)}>
                <div className="wlf-img-zone">
                  <img src={card.image} alt={card.label} className="wlf-img" style={{filter:card.imgFilter}} />
                  <div className="wlf-glass" />
                  <div className="wlf-top">
                    <div className="wlf-icon-ring"><CardIconLarge id={card.id} /></div>
                    {card.badge && <div className="wlf-badge">{card.badge}</div>}
                  </div>
                  <div className="wlf-img-cta">
                    <span className="wlf-img-cta-lbl">{card.label}</span>
                    <span className="wlf-img-cta-circ" style={{fontSize:"14px",fontWeight:700}}>›</span>
                  </div>
                </div>
                <div className="wlf-body">
                  <div className="wlf-label">{card.label}</div>
                  <div className="wlf-tagline">{card.tagline}</div>
                  <div className="wlf-desc">{card.desc}</div>
                  <div className="wlf-chips">{card.tags.map(t=><span key={t} className="wlf-chip">{t}</span>)}</div>
                </div>
                <button className={`wlf-explore${isOpen?" wlf-open-btn":""}`} onClick={(e) => handleExplore(card.id, e)} title={!isBuy ? "Coming soon" : undefined}>
                  {isOpen ? "▲  Close" : isBuy ? "Explore  ›" : "Coming Soon"}
                </button>
                <div className="wlf-bar" />
              </div>
            );
          })}
        </div>
        <div className="wlf-dots">
          {wlfCards.map((_,i)=><button key={i} className={`wlf-dot${i===active?" on":""}`} onClick={()=>setActive(i)} aria-label={wlfCards[i].label} />)}
        </div>

        <div className="wlf-mob">
          <div className="mob-vp">
            <div className="mob-track" style={{transform:`translateX(calc(-${active} * 100vw))`}} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
              {wlfCards.map((card,i)=>{
                const isBuy = card.id === "buy";
                return (
                  <div key={card.id} className="mob-slide">
                    <div className={`mob-card${i===active?" mob-active":""}`}>
                      <div className="mob-img-zone">
                        <img src={card.image} alt={card.label} className="mob-img" style={{filter:card.imgFilter}} />
                        <div className="mob-glass" />
                        <div className="mob-top">
                          <div className="mob-icon"><CardIconLarge id={card.id} /></div>
                          {card.badge && <div className="mob-badge">{card.badge}</div>}
                        </div>
                      </div>
                      <div className="mob-body">
                        <div className="mob-label">{card.label}</div>
                        <div className="mob-tagline">{card.tagline}</div>
                        <div className="mob-desc">{card.desc}</div>
                        <div className="mob-chips">{card.tags.map(t=><span key={t} className="mob-chip">{t}</span>)}</div>
                        <button className={`mob-explore${!isBuy?" mob-no-nav":""}`} onClick={() => handleMobileExplore(card.id)}>
                          {openId===card.id ? "▲  Close" : isBuy ? "Explore  ›" : "Coming Soon"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mob-nav">
            <button className={`mob-arrow${pressedArrow==="prev"?" pressed":""}`} onClick={()=>fireArrow("prev")} disabled={active===0} aria-label="Previous" style={{fontSize:"22px",fontWeight:300,color:"#111",lineHeight:1}}>‹</button>
            <div className="mob-dots">{wlfCards.map((_,i)=><button key={i} className={`mob-dot${i===active?" on":""}`} onClick={()=>setActive(i)} aria-label={`Card ${i+1}`} />)}</div>
            <div className="mob-counter"><strong>{active+1}</strong> / {wlfCards.length}</div>
            <button className={`mob-arrow${pressedArrow==="next"?" pressed":""}`} onClick={()=>fireArrow("next")} disabled={active===wlfCards.length-1} aria-label="Next" style={{fontSize:"22px",fontWeight:300,color:"#111",lineHeight:1}}>›</button>
          </div>
        </div>
      </section>

      <div ref={listingAnchor}>
        {wlfCards.map(card => (
          <ListingsSection key={card.id} visible={openId===card.id} />
        ))}

        {openId === "buy" && <FeaturedSection />}
        {openId === "buy" && <CTASection />}
      </div>
    </>
  );
};

// ─── HeroPage ──────────────────────────────────────────────────────────────────
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
        .desktop-hero{display:grid;grid-template-columns:240px 1fr 240px;min-height:100vh;overflow:hidden;padding-top:64px;background:#fff}
        .col-side{height:calc(100vh - 64px);overflow:hidden;mask-image:linear-gradient(to bottom,transparent,black 15%,black 85%,transparent);-webkit-mask-image:linear-gradient(to bottom,transparent,black 15%,black 85%,transparent)}
        .col-left{padding:20px 12px 20px 20px}
        .col-right{padding:20px 20px 20px 12px}
        .desktop-center{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 40px;text-align:center;position:relative}
        .accent-line{position:absolute;top:80px;left:50%;transform:translateX(-50%);width:1px;height:60px;background:linear-gradient(to bottom,transparent,#e0e0e0)}
        .mobile-hero{display:none}
        @media(max-width:640px){
          .desktop-hero{display:none!important}
          .mobile-hero{display:flex;flex-direction:column;align-items:center;min-height:100svh;background:#fff;padding-top:64px}
          .mob-strip,.mob-strip-bottom{width:100%;overflow:hidden;padding:14px 0}
          .mob-content{flex:1;display:flex;flex-direction:column;align-items:center;text-align:center;width:100%;padding:48px 24px 32px;max-width:420px}
          .mob-eyebrow{display:inline-flex;align-items:center;gap:7px;background:#f5f5f5;border:1px solid #e8e8e8;border-radius:100px;padding:5px 16px;font-family:'DM Sans',sans-serif;font-size:10px;font-weight:600;letter-spacing:2.5px;color:#888;text-transform:uppercase;margin-bottom:20px}
          .mob-h1{font-family:'Outfit',sans-serif;font-size:clamp(2.4rem,10vw,3rem);font-weight:900;line-height:1.05;letter-spacing:-0.04em;color:#18181b;margin-bottom:14px}
          .mob-sub{font-family:'DM Sans',sans-serif;font-size:14px;color:#71717a;line-height:1.7;margin-bottom:28px;max-width:300px}
          .mob-search{width:100%;margin-bottom:14px}
          .mob-cta-btn{width:100%;background:#000;color:#fff;border:none;padding:16px;border-radius:14px;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:28px;box-shadow:0 6px 24px rgba(0,0,0,.18)}
          .mob-stats{display:flex;gap:10px;width:100%;justify-content:center}
          .mob-stat{flex:1;text-align:center;padding:14px 8px;border-radius:14px;background:#f7f7f7}
          .mob-stat:first-child{background:#000}
          .mob-stat-num{font-family:'Outfit',sans-serif;font-size:20px;font-weight:900;letter-spacing:-0.04em;color:#000;line-height:1}
          .mob-stat:first-child .mob-stat-num{color:#fff}
          .mob-stat-lbl{font-family:'DM Sans',sans-serif;font-size:9px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#bbb;margin-top:4px}
          .mob-stat:first-child .mob-stat-lbl{color:#888}
        }
        @media(min-width:641px) and (max-width:900px){.desktop-hero{grid-template-columns:160px 1fr 160px}}
      `}</style>

      <Navbar />

      <div className="desktop-hero">
        <div className="col-side col-left"><AnimatedColumn cards={leftCards} direction="up" /></div>
        <div className="desktop-center">
          <div className="accent-line" />
          <div className={fade("0")} style={{display:"inline-flex",alignItems:"center",gap:"8px",background:"#f4f4f4",border:"1px solid #e8e8e8",borderRadius:"100px",padding:"6px 18px",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",letterSpacing:"3px",color:"#888",textTransform:"uppercase",marginBottom:"28px",marginTop:"40px"}}>
            <span style={{width:"6px",height:"6px",background:"#000",borderRadius:"50%",display:"inline-block"}} />Premium Real Estate
          </div>
          <h1 className={fade("120")} style={{fontFamily:"'Outfit',sans-serif",fontSize:"clamp(1.8rem,3.2vw,2.6rem)",fontWeight:900,lineHeight:1.1,letterSpacing:"-.03em",color:"#18181b",marginBottom:"28px",whiteSpace:"nowrap",transform:"scaleX(1.18)",transformOrigin:"center",display:"inline-block"}}>
            FIND YOUR{" "}<span style={{background:"linear-gradient(120deg,#18181b,#52525b)",WebkitBackgroundClip:"text",backgroundClip:"text",WebkitTextFillColor:"transparent"}}>PERFECT</span>{" "}SPACE
          </h1>
          <p className={fade("240")} style={{fontFamily:"'DM Sans',sans-serif",fontSize:"15px",color:"#71717a",lineHeight:1.72,maxWidth:"360px",marginBottom:"36px",fontWeight:400}}>
            Discover curated properties across the country&apos;s most sought-after neighbourhoods — no noise, no compromise.
          </p>
          <div className={fade("360")} style={{width:"100%",maxWidth:"480px",marginBottom:"24px"}}>
            <div className="search-wrapper">
              <input className="search-input" placeholder="City, neighbourhood, or ZIP…" type="text" />
              <button className="search-btn">Search</button>
            </div>
          </div>
          <div className={fade("480")} style={{display:"flex",gap:"12px",marginBottom:"48px"}}>
            <button className="cta-primary">Browse Listings</button>
            <button className="cta-secondary">Book a Tour</button>
          </div>
          <div className={fade("600")} style={{display:"flex",gap:"8px"}}>
            {stats.map((s,i) => (
              <div key={s.label} style={{textAlign:"center",padding:"18px 28px",minWidth:"100px",background:i===0?"#000":"#f7f7f7",borderRadius:"16px"}}>
                <div style={{fontFamily:"'Outfit',sans-serif",fontSize:"28px",fontWeight:900,letterSpacing:"-0.04em",color:i===0?"#fff":"#000"}}>{s.value}</div>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",color:i===0?"#aaa":"#bbb",letterSpacing:"2px",textTransform:"uppercase",marginTop:"4px"}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-side col-right"><AnimatedColumn cards={rightCards} direction="down" /></div>
      </div>

      <div className="mobile-hero">
        <div className="mob-strip"><MobileImageStrip /></div>
        <div className="mob-content">
          <div className={`mob-eyebrow ${fade("0")}`}><span style={{width:"5px",height:"5px",background:"#000",borderRadius:"50%",display:"inline-block"}} />Premium Real Estate</div>
          <h1 className={`mob-h1 ${fade("120")}`}>Find your <span style={{background:"linear-gradient(120deg,#18181b,#52525b)",WebkitBackgroundClip:"text",backgroundClip:"text",WebkitTextFillColor:"transparent"}}>perfect</span><br />space.</h1>
          <p className={`mob-sub ${fade("240")}`}>Curated properties, honest guidance — no noise, no compromise.</p>
          <div className={`mob-search ${fade("360")}`}><MobileSearch /></div>
          <button className={`mob-cta-btn ${fade("480")}`}>Browse Listings</button>
          <div className={`mob-stats ${fade("600")}`}>
            {stats.map(s => (
              <div key={s.label} className="mob-stat">
                <div className="mob-stat-num">{s.value}</div>
                <div className="mob-stat-lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mob-strip-bottom"><MobileImageStrip reverse /></div>
      </div>

      <WhatLookingFor />
    </>
  );
}