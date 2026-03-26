'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from '../components/Navbar';

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const STATUSES = ['All', 'Available', 'Under Construction', 'Sold Out'] as const;
type Status = typeof STATUSES[number];
const TYPES = ['All', 'Residential', 'Commercial', 'Mixed-Use'] as const;
type TypeFilter = typeof TYPES[number];

type Project = {
    id: number; name: string; developer: string; location: string;
    type: 'Residential' | 'Commercial' | 'Mixed-Use';
    status: 'Available' | 'Under Construction' | 'Sold Out';
    priceFrom: string; completionYear: string; units: number; floors: number;
    coverImage: string; galleryImages: string[]; description: string;
    amenities: string[]; paymentPlan: string; roi: string;
    featured: boolean; tag?: string; area: string;
};

const PROJECTS: Project[] = [
    { id: 1, name: 'Emaar Beachfront Residences', developer: 'Emaar Properties', location: 'Dubai Harbour', type: 'Residential', status: 'Available', priceFrom: '2.4M AED', completionYear: '2026', units: 320, floors: 28, area: '1,450–3,200 sqft', coverImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=85', galleryImages: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=85', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=85', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=85'], description: 'A landmark waterfront address offering uninterrupted views of the Arabian Gulf. Each residence is finished to the highest specification with floor-to-ceiling glazing, private terraces, and direct beach access.', amenities: ['Private Beach', 'Infinity Pool', 'Concierge', 'Gym & Spa', 'Valet Parking', 'Kids Club'], paymentPlan: '30/70 Post-Handover', roi: '7.2%', featured: true, tag: 'Featured' },
    { id: 2, name: "One Za'abeel Tower", developer: 'Ithra Dubai', location: "Za'abeel, Dubai", type: 'Mixed-Use', status: 'Under Construction', priceFrom: '5.1M AED', completionYear: '2027', units: 180, floors: 64, area: '2,100–8,400 sqft', coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=85', galleryImages: ['https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800&q=85', 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=85', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=85'], description: "Two supertall towers connected by The Link — the world's highest occupied bridge. Ultra-luxury residences, five-star hospitality, and premium retail at the heart of Dubai.", amenities: ['Sky Lounge', 'Michelin Dining', 'Butler Service', 'Private Cinema', 'Wine Cellar', 'Helipad'], paymentPlan: '40/60 Flexible', roi: '6.8%', featured: true, tag: 'New Launch' },
    { id: 3, name: 'Sobha Hartland II', developer: 'Sobha Realty', location: 'Sobha Hartland, Dubai', type: 'Residential', status: 'Available', priceFrom: '1.8M AED', completionYear: '2026', units: 550, floors: 22, area: '900–2,800 sqft', coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85', galleryImages: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=85', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=85', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=85'], description: 'Nestled within an 8-million sq ft master community with a private lagoon, cycling tracks, and an international school campus — a rare combination of urban connectivity and lush greenery.', amenities: ['Crystal Lagoon', 'Cycling Tracks', 'Forest Park', 'Int\'l Schools', 'Retail Boulevard', 'Dog Park'], paymentPlan: '60/40 On Completion', roi: '8.1%', featured: false, tag: 'High ROI' },
    { id: 4, name: 'DIFC Living', developer: 'DIFC Authority', location: 'DIFC, Dubai', type: 'Mixed-Use', status: 'Under Construction', priceFrom: '3.2M AED', completionYear: '2025', units: 240, floors: 36, area: '1,200–4,500 sqft', coverImage: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200&q=85', galleryImages: ['https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=85', 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=85', 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=85'], description: 'The first residential development within DIFC — placing residents at the epicentre of the Middle East\'s leading financial hub. Steps from world-class dining, galleries, and corporate HQs.', amenities: ['Rooftop Pool', 'Co-Working', 'Art Gallery', 'Private Dining', 'Concierge', 'EV Charging'], paymentPlan: '20/80 Post-Handover', roi: '7.5%', featured: false },
    { id: 5, name: 'Palm Villas by Nakheel', developer: 'Nakheel', location: 'Palm Jumeirah, Dubai', type: 'Residential', status: 'Sold Out', priceFrom: '18M AED', completionYear: '2024', units: 60, floors: 3, area: '8,000–14,000 sqft', coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85', galleryImages: ['https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=85', 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=85', 'https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?w=800&q=85'], description: 'Limited-edition ultra-luxury villas on the iconic Palm Jumeirah, each with a private beach, infinity pool, and bespoke interior by a globally recognised design studio.', amenities: ['Private Beach', 'Pool & Jacuzzi', 'Home Cinema', 'Smart Home', 'Staff Quarters', 'Private Jetty'], paymentPlan: 'Cash Only', roi: '5.9%', featured: false },
    { id: 6, name: 'Creek Harbour Towers', developer: 'Emaar Properties', location: 'Dubai Creek Harbour', type: 'Residential', status: 'Available', priceFrom: '980K AED', completionYear: '2027', units: 820, floors: 30, area: '650–2,100 sqft', coverImage: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=85', galleryImages: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=85', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=85', 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=85'], description: 'An emerging waterfront district that will one day host the world\'s tallest tower. Invest early in a masterplanned community along the historic Dubai Creek with dramatic skyline views.', amenities: ['Boardwalk Access', 'Metro Link', 'Central Park', 'Yacht Club', 'Mall & Retail', 'School Campus'], paymentPlan: '50/50 Flexible', roi: '8.6%', featured: false, tag: 'Best Value' },
];

const STATUS_META: Record<string, { bg: string; text: string; dot: string; glow: string }> = {
    'Available': { bg: 'rgba(34,197,94,0.12)', text: '#16a34a', dot: '#22c55e', glow: 'rgba(34,197,94,0.3)' },
    'Under Construction': { bg: 'rgba(234,179,8,0.12)', text: '#ca8a04', dot: '#eab308', glow: 'rgba(234,179,8,0.3)' },
    'Sold Out': { bg: 'rgba(239,68,68,0.12)', text: '#dc2626', dot: '#ef4444', glow: 'rgba(239,68,68,0.3)' },
};

const TICKER_ITEMS = ['Emaar Beachfront', 'One Za\'abeel', 'Sobha Hartland II', 'DIFC Living', 'Palm Villas', 'Creek Harbour', 'Damac Lagoons', 'Nakheel Marinas', 'Meraas Bluewaters'];

/* ─────────────────────────────────────────────────────────────
   CSS
───────────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Outfit:wght@400;600;700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');

*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
html { scroll-behavior:smooth; }
body { font-family:'DM Sans',sans-serif; background:#0a0a0b; color:#fff; -webkit-font-smoothing:antialiased; overflow-x:hidden; }

:root {
  --gold:#c9a96e; --gold-light:#e8d5b0; --gold-dim:#7a6040;
  --ink:#0a0a0b; --ink-2:#111113; --ink-3:#1a1a1e;
  --zinc:#27272a; --zinc-2:#3f3f46; --zinc-3:#52525b;
  --smoke:#a1a1aa; --mist:#e4e4e7;
  --green:#22c55e; --amber:#eab308; --red:#ef4444;
}

/* ══════════════════════════════════════════
   KEYFRAMES
══════════════════════════════════════════ */
@keyframes fadeUp      { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
@keyframes fadeIn      { from{opacity:0} to{opacity:1} }
@keyframes slideRight  { from{transform:scaleX(0)} to{transform:scaleX(1)} }
@keyframes shimmerGold { 0%{background-position:-200% center} 100%{background-position:200% center} }
@keyframes pulse       { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.25;transform:scale(1.9)} }
@keyframes tickerMove  { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
@keyframes floatY      { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
@keyframes rotateSlow  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes countUp     { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
@keyframes lineGrow    { from{width:0} to{width:100%} }
@keyframes imgKenBurns { from{transform:scale(1.12) translate(1%,1%)} to{transform:scale(1.0) translate(-1%,-0.5%)} }
@keyframes scanline    { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
@keyframes glowPulse   { 0%,100%{box-shadow:0 0 20px var(--gold-dim)} 50%{box-shadow:0 0 60px var(--gold)} }
@keyframes revealClip  { from{clip-path:inset(0 100% 0 0)} to{clip-path:inset(0 0% 0 0)} }
@keyframes overlayIn   { from{opacity:0} to{opacity:1} }
@keyframes sheetUp     { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
@keyframes mobCardIn   { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }

/* ══════════════════════════════════════════
   DESKTOP HERO — CINEMATIC SPLIT
   Shown only ≥769px
══════════════════════════════════════════ */
.hero-desktop { display:block; }
.hero-mobile  { display:none; }

.dh-hero {
  position:relative; width:100%; height:100vh; min-height:700px;
  background:var(--ink); overflow:hidden;
}

/* large editorial number background */
.dh-bg-number {
  position:absolute; top:-10%; left:-2%;
  font-family:'Cormorant Garamond',serif; font-size:clamp(280px,35vw,520px);
  font-weight:700; line-height:1; letter-spacing:-0.08em;
  color:rgba(255,255,255,0.025); pointer-events:none; user-select:none; z-index:0;
  animation:fadeIn 1.5s ease .5s both;
}

/* dot grid texture */
.dh-dot-grid {
  position:absolute; inset:0; z-index:0; pointer-events:none;
  background-image:radial-gradient(circle, rgba(255,255,255,.03) 1px, transparent 1px);
  background-size:36px 36px;
}

/* diagonal accent line */
.dh-diagonal {
  position:absolute; top:0; right:38%; width:1px; height:100%;
  background:linear-gradient(to bottom, transparent 0%, rgba(201,169,110,0.2) 30%, rgba(201,169,110,0.4) 50%, rgba(201,169,110,0.2) 70%, transparent 100%);
  z-index:1; transform:skewX(-8deg);
}

/* scanline effect */
.dh-scanline {
  position:absolute; inset:0; z-index:0; pointer-events:none; overflow:hidden;
}
.dh-scanline::after {
  content:''; position:absolute; top:0; left:0; right:0; height:3px;
  background:linear-gradient(to bottom, transparent, rgba(201,169,110,0.06), transparent);
  animation:scanline 8s linear infinite;
}

/* ── LEFT PANEL ── */
.dh-left {
  position:absolute; left:0; top:0; bottom:0; width:62%;
  display:flex; flex-direction:column; justify-content:flex-end;
  padding:0 6% 8% 6%; z-index:2;
}

.dh-eyebrow {
  display:flex; align-items:center; gap:12px; margin-bottom:28px;
  opacity:0; animation:fadeUp .6s cubic-bezier(.16,1,.3,1) .3s forwards;
}
.dh-eyebrow-line {
  width:0; height:1px; background:var(--gold);
  animation:lineGrow .8s cubic-bezier(.16,1,.3,1) .7s forwards;
}
.dh-eyebrow-text {
  font-family:'DM Sans',sans-serif; font-size:.62rem; font-weight:700;
  letter-spacing:.2em; text-transform:uppercase; color:var(--gold);
}
.dh-eyebrow-dot {
  width:5px; height:5px; border-radius:50%; background:var(--green);
  animation:pulse 2s ease-in-out infinite;
}
.dh-eyebrow-live {
  font-size:.62rem; font-weight:600; letter-spacing:.1em; text-transform:uppercase;
  color:rgba(255,255,255,.35);
}

.dh-headline {
  font-family:'Cormorant Garamond',serif; font-weight:300; line-height:.95;
  letter-spacing:-.025em; margin-bottom:32px;
}
.dh-headline-l1 {
  display:block; font-size:clamp(56px,7.5vw,112px); color:#fff;
  opacity:0; animation:fadeUp .9s cubic-bezier(.16,1,.3,1) .5s forwards;
}
.dh-headline-l2 {
  display:block; font-size:clamp(56px,7.5vw,112px);
  font-style:italic;
  background:linear-gradient(90deg, var(--gold-dim), var(--gold), var(--gold-light), var(--gold));
  background-size:300% auto;
  -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;
  animation:fadeUp .9s cubic-bezier(.16,1,.3,1) .65s forwards, shimmerGold 5s linear 1.8s infinite;
  opacity:0;
}
.dh-headline-l3 {
  display:block; font-size:clamp(56px,7.5vw,112px); color:rgba(255,255,255,.9);
  opacity:0; animation:fadeUp .9s cubic-bezier(.16,1,.3,1) .8s forwards;
}

.dh-sub {
  font-size:1rem; color:rgba(255,255,255,.4); line-height:1.8; max-width:420px;
  font-weight:300; margin-bottom:40px;
  opacity:0; animation:fadeUp .7s ease .95s forwards;
}

.dh-cta-row {
  display:flex; align-items:center; gap:16px; margin-bottom:56px;
  opacity:0; animation:fadeUp .7s ease 1.1s forwards;
}

.btn-gold {
  display:inline-flex; align-items:center; gap:10px;
  background:linear-gradient(135deg, var(--gold-dim), var(--gold));
  color:var(--ink); padding:14px 32px; border-radius:2px;
  font-family:'DM Sans',sans-serif; font-size:.875rem; font-weight:700;
  letter-spacing:.04em; text-transform:uppercase;
  border:none; cursor:pointer; text-decoration:none;
  box-shadow:0 8px 32px rgba(201,169,110,0.35);
  transition:transform .25s cubic-bezier(.34,1.4,.64,1), box-shadow .25s, opacity .2s;
  animation:glowPulse 4s ease-in-out 2s infinite;
}
.btn-gold:hover { transform:translateY(-3px) scale(1.02); box-shadow:0 16px 48px rgba(201,169,110,0.5); }
.btn-gold svg { width:14px; height:14px; stroke:currentColor; stroke-width:2.5; fill:none; transition:transform .22s; }
.btn-gold:hover svg { transform:translateX(5px); }

.btn-ghost-gold {
  display:inline-flex; align-items:center; gap:8px;
  background:transparent; color:rgba(255,255,255,.6);
  padding:14px 24px; border-radius:2px;
  font-family:'DM Sans',sans-serif; font-size:.875rem; font-weight:500;
  letter-spacing:.04em; text-transform:uppercase;
  border:1px solid rgba(201,169,110,0.3); cursor:pointer;
  transition:all .25s cubic-bezier(.34,1.2,.64,1); text-decoration:none;
}
.btn-ghost-gold:hover { border-color:var(--gold); color:var(--gold); transform:translateY(-2px); }

/* ── HERO STATS ── */
.dh-stats {
  display:flex; gap:40px;
  opacity:0; animation:fadeUp .7s ease 1.25s forwards;
}
.dh-stat { display:flex; flex-direction:column; gap:4px; position:relative; padding-left:16px; }
.dh-stat::before {
  content:''; position:absolute; left:0; top:4px; bottom:4px; width:1px;
  background:linear-gradient(to bottom, transparent, var(--gold), transparent);
}
.dh-stat-num {
  font-family:'Cormorant Garamond',serif; font-size:2.4rem; font-weight:600;
  color:#fff; line-height:1; letter-spacing:-.02em;
}
.dh-stat-label {
  font-size:.6rem; font-weight:600; letter-spacing:.14em; text-transform:uppercase;
  color:rgba(255,255,255,.3);
}

/* ── RIGHT PANEL — image stack ── */
.dh-right {
  position:absolute; right:0; top:0; bottom:0; width:42%;
  z-index:2; overflow:hidden;
}

.dh-img-main {
  position:absolute; inset:0;
  opacity:0; animation:fadeIn .8s ease .4s forwards;
}
.dh-img-main img {
  width:100%; height:100%; object-fit:cover; display:block;
  animation:imgKenBurns 12s ease both;
}
.dh-img-main::after {
  content:''; position:absolute; inset:0;
  background:linear-gradient(to right, rgba(10,10,11,1) 0%, rgba(10,10,11,0) 20%),
             linear-gradient(to top, rgba(10,10,11,0.6) 0%, transparent 40%);
}

/* floating project info card */
.dh-float-card {
  position:absolute; bottom:12%; left:-60px; z-index:10;
  background:rgba(10,10,11,0.92); backdrop-filter:blur(20px);
  border:1px solid rgba(201,169,110,0.25); border-radius:4px;
  padding:20px 24px; min-width:260px;
  box-shadow:0 24px 64px rgba(0,0,0,0.6);
  opacity:0; transform:translateX(20px);
  animation:fadeUp .7s cubic-bezier(.16,1,.3,1) 1.4s forwards;
}
.dh-float-card-label {
  font-size:.56rem; font-weight:700; letter-spacing:.18em; text-transform:uppercase;
  color:var(--gold); margin-bottom:10px;
}
.dh-float-card-name {
  font-family:'Cormorant Garamond',serif; font-size:1.4rem; font-weight:600;
  color:#fff; line-height:1.2; margin-bottom:6px;
}
.dh-float-card-loc {
  display:flex; align-items:center; gap:5px;
  font-size:.75rem; color:rgba(255,255,255,.4); margin-bottom:16px;
}
.dh-float-card-loc svg { flex-shrink:0; stroke:var(--gold); }
.dh-float-card-price-row { display:flex; justify-content:space-between; align-items:flex-end; }
.dh-float-price {
  font-family:'Cormorant Garamond',serif; font-size:1.6rem; font-weight:700;
  color:var(--gold); line-height:1;
}
.dh-float-price-sub { font-size:.6rem; color:rgba(255,255,255,.35); font-weight:500; margin-top:2px; }
.dh-float-roi {
  font-size:.65rem; font-weight:700; letter-spacing:.06em;
  background:rgba(34,197,94,0.15); border:1px solid rgba(34,197,94,0.3);
  color:var(--green); padding:4px 10px; border-radius:2px;
}

/* progress dots for image cycling */
.dh-img-dots {
  position:absolute; top:50%; right:24px; transform:translateY(-50%);
  display:flex; flex-direction:column; gap:10px; z-index:10;
  opacity:0; animation:fadeIn .5s ease 1.6s forwards;
}
.dh-img-dot {
  width:6px; border-radius:3px; background:rgba(255,255,255,.2);
  border:none; padding:0; cursor:pointer; transition:all .3s;
}
.dh-img-dot.active { background:var(--gold); animation:none; }
.dh-img-dot:not(.active) { height:6px; }
.dh-img-dot.active { height:24px; }

/* ── TICKER ── */
.dh-ticker {
  position:absolute; bottom:0; left:0; right:0; height:48px;
  background:rgba(201,169,110,0.08); border-top:1px solid rgba(201,169,110,0.15);
  overflow:hidden; z-index:3; display:flex; align-items:center;
  opacity:0; animation:fadeIn .5s ease 1.8s forwards;
}
.dh-ticker-label {
  flex-shrink:0; padding:0 24px;
  font-size:.58rem; font-weight:700; letter-spacing:.18em; text-transform:uppercase;
  color:var(--gold); border-right:1px solid rgba(201,169,110,0.2);
  white-space:nowrap;
}
.dh-ticker-track {
  display:flex; gap:0; flex:1; overflow:hidden;
}
.dh-ticker-inner {
  display:flex; gap:0; white-space:nowrap;
  animation:tickerMove 28s linear infinite;
}
.dh-ticker-item {
  display:inline-flex; align-items:center; gap:28px; padding:0 32px;
  font-size:.72rem; font-weight:600; letter-spacing:.1em; text-transform:uppercase;
  color:rgba(255,255,255,.4);
}
.dh-ticker-item::after {
  content:''; width:4px; height:4px; border-radius:50%; background:var(--gold); flex-shrink:0;
}

/* scroll hint */
.dh-scroll-hint {
  position:absolute; bottom:60px; left:6%; z-index:3;
  display:flex; align-items:center; gap:10px;
  opacity:0; animation:fadeIn .5s ease 2s forwards;
}
.dh-scroll-track {
  width:1px; height:40px; background:rgba(255,255,255,.12); position:relative; overflow:hidden;
}
.dh-scroll-thumb {
  position:absolute; top:0; left:0; width:1px; height:12px;
  background:var(--gold); animation:scanline 2s ease-in-out infinite;
}
.dh-scroll-text {
  font-size:.56rem; font-weight:700; letter-spacing:.18em; text-transform:uppercase;
  color:rgba(255,255,255,.25); writing-mode:vertical-rl;
}

/* ══════════════════════════════════════════
   MOBILE HERO — completely different layout
   Shown only ≤768px
══════════════════════════════════════════ */
@media (max-width:768px) {
  .hero-desktop { display:none !important; }
  .hero-mobile  { display:block !important; }
}

.mh-hero {
  position:relative; width:100%; min-height:100svh;
  background:var(--ink); overflow:hidden;
  display:flex; flex-direction:column;
}

/* Full-bleed background image */
.mh-bg {
  position:absolute; inset:0; z-index:0;
}
.mh-bg img {
  width:100%; height:100%; object-fit:cover; display:block;
  animation:imgKenBurns 12s ease both;
}
.mh-bg::after {
  content:''; position:absolute; inset:0;
  background:linear-gradient(
    to bottom,
    rgba(10,10,11,0.75) 0%,
    rgba(10,10,11,0.3) 35%,
    rgba(10,10,11,0.55) 60%,
    rgba(10,10,11,0.95) 100%
  );
}

/* Mobile top bar status */
.mh-top-bar {
  position:relative; z-index:2; padding:80px 6% 0;
  display:flex; justify-content:space-between; align-items:flex-start;
  opacity:0; animation:fadeIn .6s ease .2s forwards;
}
.mh-live-badge {
  display:inline-flex; align-items:center; gap:7px;
  background:rgba(10,10,11,0.7); backdrop-filter:blur(12px);
  border:1px solid rgba(201,169,110,0.3);
  padding:6px 14px; border-radius:2px;
}
.mh-live-dot { width:6px; height:6px; border-radius:50%; background:var(--green); animation:pulse 2s infinite; }
.mh-live-text { font-size:.58rem; font-weight:700; letter-spacing:.15em; text-transform:uppercase; color:var(--gold); }
.mh-counter-badge {
  background:rgba(10,10,11,0.7); backdrop-filter:blur(12px);
  border:1px solid rgba(255,255,255,.1);
  padding:6px 14px; border-radius:2px;
  font-size:.65rem; font-weight:700; color:rgba(255,255,255,.5);
  letter-spacing:.06em;
}

/* Mobile main content */
.mh-content {
  position:relative; z-index:2; flex:1;
  display:flex; flex-direction:column; justify-content:flex-end;
  padding:0 6% 0;
}

.mh-label {
  font-size:.58rem; font-weight:700; letter-spacing:.2em; text-transform:uppercase;
  color:var(--gold); margin-bottom:16px;
  opacity:0; animation:fadeUp .6s ease .5s forwards;
}
.mh-label-line {
  display:inline-block; width:24px; height:1px; background:var(--gold);
  margin-right:10px; vertical-align:middle;
}

.mh-headline {
  font-family:'Cormorant Garamond',serif; font-weight:300; line-height:.92;
  letter-spacing:-.02em; margin-bottom:20px;
}
.mh-h1 {
  display:block; font-size:clamp(52px,14vw,80px); color:#fff;
  opacity:0; animation:fadeUp .9s cubic-bezier(.16,1,.3,1) .65s forwards;
}
.mh-h2 {
  display:block; font-size:clamp(52px,14vw,80px); font-style:italic;
  background:linear-gradient(90deg, var(--gold-dim), var(--gold), var(--gold-light), var(--gold));
  background-size:300% auto;
  -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;
  animation:fadeUp .9s cubic-bezier(.16,1,.3,1) .8s forwards, shimmerGold 5s linear 2s infinite;
  opacity:0;
}

.mh-sub {
  font-size:.88rem; color:rgba(255,255,255,.45); line-height:1.72;
  font-weight:300; margin-bottom:32px; max-width:320px;
  opacity:0; animation:fadeUp .7s ease 1s forwards;
}

/* Mobile CTA */
.mh-cta-row {
  display:flex; gap:10px; margin-bottom:36px;
  opacity:0; animation:fadeUp .7s ease 1.15s forwards;
}
.mh-btn-primary {
  flex:1; padding:15px 20px;
  background:linear-gradient(135deg, var(--gold-dim), var(--gold));
  color:var(--ink); border:none; border-radius:2px; cursor:pointer;
  font-family:'DM Sans',sans-serif; font-size:.82rem; font-weight:700;
  letter-spacing:.06em; text-transform:uppercase;
  display:flex; align-items:center; justify-content:center; gap:8px;
  box-shadow:0 8px 24px rgba(201,169,110,0.3); text-decoration:none;
}
.mh-btn-secondary {
  padding:15px 20px; background:rgba(255,255,255,.08);
  color:rgba(255,255,255,.7); border:1px solid rgba(255,255,255,.15);
  border-radius:2px; cursor:pointer;
  font-family:'DM Sans',sans-serif; font-size:.82rem; font-weight:600;
  letter-spacing:.06em; text-transform:uppercase;
}

/* Mobile stats strip */
.mh-stats-strip {
  display:grid; grid-template-columns:repeat(3,1fr);
  border-top:1px solid rgba(201,169,110,0.15);
  border-bottom:1px solid rgba(201,169,110,0.15);
  margin-bottom:0;
  opacity:0; animation:fadeUp .7s ease 1.3s forwards;
}
.mh-stat {
  padding:16px 0; text-align:center;
  border-right:1px solid rgba(201,169,110,0.12);
}
.mh-stat:last-child { border-right:none; }
.mh-stat-num {
  font-family:'Cormorant Garamond',serif; font-size:1.8rem; font-weight:600;
  color:#fff; line-height:1; letter-spacing:-.02em; margin-bottom:3px;
}
.mh-stat-label {
  font-size:.52rem; font-weight:700; letter-spacing:.14em; text-transform:uppercase;
  color:rgba(255,255,255,.28);
}

/* Mobile ticker */
.mh-ticker {
  background:rgba(201,169,110,0.07); border-top:1px solid rgba(201,169,110,0.12);
  height:40px; overflow:hidden; display:flex; align-items:center;
  opacity:0; animation:fadeIn .5s ease 1.6s forwards;
}
.mh-ticker-label {
  flex-shrink:0; padding:0 16px;
  font-size:.52rem; font-weight:700; letter-spacing:.16em; text-transform:uppercase;
  color:var(--gold); border-right:1px solid rgba(201,169,110,0.2);
}
.mh-ticker-inner {
  display:flex; gap:0; white-space:nowrap;
  animation:tickerMove 22s linear infinite;
}
.mh-ticker-item {
  display:inline-flex; align-items:center; gap:20px; padding:0 20px;
  font-size:.62rem; font-weight:600; letter-spacing:.08em; text-transform:uppercase;
  color:rgba(255,255,255,.38);
}
.mh-ticker-item::after { content:''; width:3px; height:3px; border-radius:50%; background:var(--gold); }

/* Swipe hint */
.mh-swipe-hint {
  position:absolute; bottom:120px; right:6%; z-index:2;
  display:flex; flex-direction:column; align-items:center; gap:6px;
  opacity:0; animation:fadeIn .5s ease 2s forwards;
}
.mh-swipe-icon {
  width:36px; height:36px; border-radius:50%;
  border:1px solid rgba(255,255,255,.15);
  display:flex; align-items:center; justify-content:center;
  animation:floatY 2.5s ease-in-out infinite;
}
.mh-swipe-icon svg { stroke:rgba(255,255,255,.4); }
.mh-swipe-text {
  font-size:.5rem; font-weight:700; letter-spacing:.15em; text-transform:uppercase;
  color:rgba(255,255,255,.2);
}

/* ══════════════════════════════════════════
   FILTER BAR
══════════════════════════════════════════ */
.filter-section {
  background:#111113; border-bottom:1px solid rgba(255,255,255,.06);
  position:sticky; top:60px; z-index:100;
}
.filter-inner {
  max-width:1280px; margin:0 auto; padding:16px 6%;
  display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap;
}
.filter-groups { display:flex; gap:24px; flex-wrap:wrap; flex:1; }
.filter-group { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
.filter-group-label {
  font-size:.54rem; font-weight:700; letter-spacing:.16em; text-transform:uppercase;
  color:rgba(255,255,255,.25); flex-shrink:0;
}
.filter-chip {
  padding:6px 16px; border-radius:1px;
  border:1px solid rgba(255,255,255,.1); background:transparent;
  color:rgba(255,255,255,.45); font-size:.75rem; font-weight:600;
  cursor:pointer; font-family:'DM Sans',sans-serif;
  transition:all .2s cubic-bezier(.34,1.2,.64,1); white-space:nowrap; letter-spacing:.03em;
}
.filter-chip:hover { border-color:rgba(201,169,110,.5); color:var(--gold); }
.filter-chip.active {
  background:var(--gold); border-color:var(--gold);
  color:var(--ink); font-weight:700;
  box-shadow:0 4px 16px rgba(201,169,110,.3);
}
.filter-count {
  font-size:.72rem; font-weight:600; color:rgba(255,255,255,.3);
  background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.08);
  padding:4px 14px; border-radius:1px; white-space:nowrap; flex-shrink:0;
  letter-spacing:.04em;
}

/* ══════════════════════════════════════════
   PROJECTS SECTION
══════════════════════════════════════════ */
.projects-section { padding:80px 6%; background:var(--ink); min-height:60vh; }
.projects-inner { max-width:1280px; margin:0 auto; }

.section-head { display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:56px; gap:20px; }
.section-title-block {}
.section-eyebrow {
  font-size:.6rem; font-weight:700; letter-spacing:.2em; text-transform:uppercase;
  color:var(--gold); margin-bottom:12px;
  display:flex; align-items:center; gap:10px;
}
.section-eyebrow::before {
  content:''; width:24px; height:1px; background:var(--gold);
}
.section-title {
  font-family:'Cormorant Garamond',serif; font-size:clamp(2rem,4vw,3.5rem);
  font-weight:300; color:#fff; letter-spacing:-.02em; line-height:1.1;
}
.section-title em { font-style:italic; color:rgba(255,255,255,.4); }
.section-meta { font-size:.8rem; color:rgba(255,255,255,.3); margin-top:8px; }
.section-view-all {
  display:inline-flex; align-items:center; gap:8px;
  font-size:.75rem; font-weight:700; letter-spacing:.1em; text-transform:uppercase;
  color:rgba(255,255,255,.3); border:none; background:none; cursor:pointer;
  padding:0; transition:color .2s; font-family:'DM Sans',sans-serif; flex-shrink:0;
}
.section-view-all:hover { color:var(--gold); }
.section-view-all svg { stroke:currentColor; transition:transform .2s; }
.section-view-all:hover svg { transform:translateX(4px); }

/* ── DESKTOP GRID ── */
.projects-grid {
  display:grid; grid-template-columns:repeat(3,1fr); gap:1px;
  background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.06);
}

.project-card {
  background:var(--ink-2); position:relative; cursor:pointer;
  overflow:hidden; display:flex; flex-direction:column;
  opacity:0; transform:translateY(28px);
  transition:opacity .65s cubic-bezier(.16,1,.3,1), transform .65s cubic-bezier(.16,1,.3,1),
             background .25s;
}
.project-card.in { opacity:1; transform:translateY(0); }
.project-card:hover { background:var(--ink-3); z-index:2; }

/* gold top bar on hover */
.project-card::before {
  content:''; position:absolute; top:0; left:0; right:0; height:2px;
  background:linear-gradient(90deg, transparent, var(--gold), transparent);
  transform:scaleX(0); transform-origin:left;
  transition:transform .4s cubic-bezier(.16,1,.3,1); z-index:2;
}
.project-card:hover::before { transform:scaleX(1); }

/* image */
.card-img-wrap { position:relative; height:240px; overflow:hidden; }
.card-img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .8s cubic-bezier(.4,0,.2,1); }
.project-card:hover .card-img { transform:scale(1.08); }
.card-img-overlay {
  position:absolute; inset:0;
  background:linear-gradient(to top, rgba(10,10,11,.85) 0%, rgba(10,10,11,.1) 50%, transparent 100%);
}

/* status pill */
.card-status {
  position:absolute; top:14px; left:14px; z-index:2;
  display:inline-flex; align-items:center; gap:5px;
  padding:4px 11px; font-size:.56rem; font-weight:700;
  letter-spacing:.1em; text-transform:uppercase;
  background:rgba(10,10,11,.8); backdrop-filter:blur(8px);
  border-radius:1px;
}
.card-status-dot { width:5px; height:5px; border-radius:50%; flex-shrink:0; }

/* tag */
.card-tag {
  position:absolute; top:14px; right:14px; z-index:2;
  font-size:.52rem; font-weight:700; letter-spacing:.12em; text-transform:uppercase;
  background:var(--gold); color:var(--ink);
  padding:4px 10px; border-radius:1px;
}

/* price overlay */
.card-price-overlay {
  position:absolute; bottom:14px; left:14px; right:14px; z-index:2;
  display:flex; justify-content:space-between; align-items:flex-end;
}
.card-price-main {
  font-family:'Cormorant Garamond',serif; font-size:1.4rem; font-weight:700;
  color:#fff; line-height:1; letter-spacing:-.01em;
}
.card-price-sub { font-size:.58rem; color:rgba(255,255,255,.38); font-weight:400; margin-top:2px; }
.card-roi-badge {
  font-size:.62rem; font-weight:700;
  background:rgba(34,197,94,.15); border:1px solid rgba(34,197,94,.3);
  color:var(--green); padding:3px 9px; border-radius:1px;
}

/* card body */
.card-body { padding:20px 22px 24px; display:flex; flex-direction:column; flex:1; }
.card-developer {
  font-size:.54rem; font-weight:700; letter-spacing:.15em; text-transform:uppercase;
  color:var(--gold-dim); margin-bottom:5px;
}
.card-name {
  font-family:'Cormorant Garamond',serif; font-size:1.35rem; font-weight:600;
  color:#fff; line-height:1.2; letter-spacing:-.01em; margin-bottom:6px;
}
.card-loc {
  display:flex; align-items:center; gap:5px;
  font-size:.75rem; color:rgba(255,255,255,.35); margin-bottom:18px;
}
.card-loc svg { stroke:var(--gold-dim); flex-shrink:0; }
.card-rule { height:1px; background:rgba(255,255,255,.07); margin-bottom:14px; }
.card-specs { display:flex; gap:0; margin-bottom:18px; }
.card-spec {
  flex:1; display:flex; flex-direction:column; gap:3px;
  padding-right:12px; border-right:1px solid rgba(255,255,255,.07);
  margin-right:12px;
}
.card-spec:last-child { border-right:none; margin-right:0; padding-right:0; }
.card-spec-val { font-size:.82rem; font-weight:700; color:#fff; }
.card-spec-key { font-size:.52rem; font-weight:600; letter-spacing:.1em; text-transform:uppercase; color:rgba(255,255,255,.28); }

.card-cta {
  width:100%; padding:11px 16px; margin-top:auto;
  background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.1);
  color:rgba(255,255,255,.6); font-family:'DM Sans',sans-serif;
  font-size:.75rem; font-weight:700; letter-spacing:.08em; text-transform:uppercase;
  cursor:pointer; border-radius:1px;
  display:flex; align-items:center; justify-content:center; gap:8px;
  transition:all .25s;
}
.card-cta:hover { background:var(--gold); border-color:var(--gold); color:var(--ink); }
.card-cta svg { stroke:currentColor; transition:transform .22s; }
.card-cta:hover svg { transform:translateX(4px); }

/* ── MOBILE CARDS LAYOUT ── */
@media (max-width:768px) {
  .projects-section { padding:48px 0 60px; }
  .section-head { padding:0 6%; flex-direction:column; align-items:flex-start; margin-bottom:28px; }
  .section-title { font-size:2rem; }
  .projects-grid { grid-template-columns:1fr; gap:0; border:none; background:transparent; }
  .project-card { margin:0 6% 16px; border-radius:2px; border:1px solid rgba(255,255,255,.08); }
  .card-img-wrap { height:200px; }
  .card-price-main { font-size:1.2rem; }
}

/* ══════════════════════════════════════════
   DETAIL OVERLAY
══════════════════════════════════════════ */
.overlay-backdrop {
  position:fixed; inset:0; z-index:2000;
  background:rgba(0,0,0,.85); backdrop-filter:blur(16px);
  overflow-y:auto; padding:40px 20px 72px;
  animation:overlayIn .25s ease both;
}
.overlay-backdrop::-webkit-scrollbar { width:3px; }
.overlay-backdrop::-webkit-scrollbar-thumb { background:var(--gold-dim); border-radius:1px; }

.overlay-sheet {
  max-width:940px; margin:0 auto;
  background:var(--ink-2); border:1px solid rgba(255,255,255,.08);
  border-top:2px solid var(--gold);
  box-shadow:0 60px 120px rgba(0,0,0,.7), 0 0 0 1px rgba(201,169,110,.1);
  animation:sheetUp .45s cubic-bezier(.16,1,.3,1) both;
}

/* sheet hero */
.sheet-hero { position:relative; height:440px; overflow:hidden; background:#000; }
.sheet-hero-img { width:100%; height:100%; object-fit:cover; display:block; opacity:.85; }
.sheet-hero-grad {
  position:absolute; inset:0;
  background:linear-gradient(to top, rgba(10,10,11,.95) 0%, rgba(10,10,11,.2) 55%, transparent 100%);
}
.sheet-close {
  position:absolute; top:18px; right:18px; z-index:10;
  width:40px; height:40px; background:rgba(10,10,11,.8); border:1px solid rgba(255,255,255,.12);
  border-radius:1px; display:flex; align-items:center; justify-content:center;
  cursor:pointer; color:#fff; transition:all .18s;
}
.sheet-close:hover { background:var(--gold); color:var(--ink); }
.sheet-hero-content { position:absolute; bottom:0; left:0; right:0; padding:28px 36px; }
.sheet-status {
  display:inline-flex; align-items:center; gap:6px;
  padding:4px 13px; border-radius:1px; font-size:.58rem; font-weight:700;
  letter-spacing:.12em; text-transform:uppercase; margin-bottom:10px;
  backdrop-filter:blur(8px);
}
.sheet-status-dot { width:6px; height:6px; border-radius:50%; flex-shrink:0; }
.sheet-name {
  font-family:'Cormorant Garamond',serif; font-size:2.4rem; font-weight:300;
  color:#fff; letter-spacing:-.03em; line-height:1.1; margin-bottom:6px;
}
.sheet-loc { display:flex; align-items:center; gap:5px; font-size:.8rem; color:rgba(255,255,255,.4); }

/* gallery */
.sheet-gallery {
  display:flex; gap:6px; padding:14px 24px;
  background:var(--ink-3); border-bottom:1px solid rgba(255,255,255,.07);
}
.gallery-thumb {
  width:80px; height:56px; border-radius:1px; overflow:hidden; cursor:pointer;
  border:1.5px solid transparent; flex-shrink:0; transition:border-color .18s, transform .2s;
}
.gallery-thumb.active { border-color:var(--gold); }
.gallery-thumb:hover { transform:scale(1.04); }
.gallery-thumb img { width:100%; height:100%; object-fit:cover; display:block; }

/* stats */
.sheet-stats { display:grid; grid-template-columns:repeat(4,1fr); }
.sheet-stat {
  padding:22px 24px; border-right:1px solid rgba(255,255,255,.07);
  border-bottom:1px solid rgba(255,255,255,.07);
}
.sheet-stat:last-child { border-right:none; }
.sheet-stat-icon {
  width:32px; height:32px; background:rgba(201,169,110,.1);
  border:1px solid rgba(201,169,110,.2);
  display:flex; align-items:center; justify-content:center;
  color:var(--gold); margin-bottom:10px;
}
.sheet-stat-icon svg { stroke:currentColor; width:14px; height:14px; fill:none; }
.sheet-stat-val {
  font-family:'Cormorant Garamond',serif; font-size:1.35rem; font-weight:600;
  color:#fff; letter-spacing:-.01em; line-height:1; margin-bottom:3px;
}
.sheet-stat-key {
  font-size:.56rem; font-weight:700; letter-spacing:.14em; text-transform:uppercase;
  color:rgba(255,255,255,.3);
}

/* body */
.sheet-body { padding:32px 36px 0; }
.sheet-desc { font-size:.95rem; color:rgba(255,255,255,.5); line-height:1.85; margin-bottom:28px; }
.sheet-sub {
  font-size:.56rem; font-weight:700; letter-spacing:.18em; text-transform:uppercase;
  color:var(--gold-dim); margin-bottom:12px;
  display:flex; align-items:center; gap:10px;
}
.sheet-sub::after { content:''; flex:1; height:1px; background:rgba(255,255,255,.07); }

.amenities-list { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:28px; }
.amenity-tag {
  padding:6px 14px; border:1px solid rgba(255,255,255,.1); background:transparent;
  font-size:.72rem; font-weight:600; color:rgba(255,255,255,.5);
  letter-spacing:.04em; border-radius:1px; cursor:default;
  transition:border-color .18s, color .18s, background .18s;
}
.amenity-tag:hover { border-color:var(--gold); color:var(--gold); background:rgba(201,169,110,.06); }

.sheet-details { display:flex; gap:32px; flex-wrap:wrap; margin-bottom:28px; }
.sheet-detail { display:flex; flex-direction:column; gap:3px; }
.sheet-detail-key { font-size:.54rem; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:rgba(255,255,255,.3); }
.sheet-detail-val { font-size:.9rem; font-weight:600; color:#fff; }

/* CTA strip */
.sheet-cta-strip {
  margin:0 36px 36px;
  background:linear-gradient(135deg, rgba(201,169,110,.08), rgba(201,169,110,.03));
  border:1px solid rgba(201,169,110,.2);
  padding:28px 28px;
  display:flex; align-items:center; justify-content:space-between; gap:20px; flex-wrap:wrap;
}
.sheet-cta-left {}
.sheet-cta-eyebrow { font-size:.54rem; font-weight:700; letter-spacing:.18em; text-transform:uppercase; color:var(--gold-dim); margin-bottom:6px; }
.sheet-cta-title { font-family:'Cormorant Garamond',serif; font-size:1.4rem; font-weight:600; color:#fff; margin-bottom:4px; }
.sheet-cta-sub { font-size:.78rem; color:rgba(255,255,255,.35); }
.sheet-cta-btns { display:flex; gap:10px; flex-shrink:0; flex-wrap:wrap; }
.sheet-btn-primary {
  padding:12px 26px; background:var(--gold); color:var(--ink);
  border:none; cursor:pointer; font-family:'DM Sans',sans-serif;
  font-size:.8rem; font-weight:700; letter-spacing:.06em; text-transform:uppercase;
  border-radius:1px; text-decoration:none; display:inline-block;
  transition:opacity .18s, transform .2s;
}
.sheet-btn-primary:hover { opacity:.88; transform:translateY(-2px); }
.sheet-btn-secondary {
  padding:12px 22px; background:transparent; color:rgba(255,255,255,.55);
  border:1px solid rgba(255,255,255,.15); cursor:pointer;
  font-family:'DM Sans',sans-serif; font-size:.8rem; font-weight:600;
  letter-spacing:.06em; text-transform:uppercase; border-radius:1px;
  transition:all .2s;
}
.sheet-btn-secondary:hover { border-color:rgba(255,255,255,.4); color:#fff; }

/* related */
.sheet-related { padding:24px 36px 36px; border-top:1px solid rgba(255,255,255,.07); }
.sheet-related-label { font-size:.56rem; font-weight:700; letter-spacing:.18em; text-transform:uppercase; color:rgba(255,255,255,.28); margin-bottom:14px; }
.related-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
.related-card {
  border:1px solid rgba(255,255,255,.08); cursor:pointer; overflow:hidden;
  transition:border-color .2s, transform .22s;
}
.related-card:hover { border-color:rgba(201,169,110,.3); transform:translateY(-4px); }
.related-img { width:100%; height:80px; object-fit:cover; display:block; }
.related-body { padding:10px 12px 12px; }
.related-name { font-family:'Cormorant Garamond',serif; font-size:.9rem; font-weight:600; color:#fff; line-height:1.3; }
.related-price { font-size:.68rem; color:var(--gold-dim); margin-top:3px; font-weight:600; }

/* mobile sheet overrides */
@media(max-width:768px) {
  .overlay-backdrop { padding:0; overflow-y:hidden; }
  .overlay-sheet { position:absolute; inset:0; overflow-y:auto; -webkit-overflow-scrolling:touch; border-radius:0; border:none; }
  .sheet-hero { height:55vw; min-height:220px; }
  .sheet-hero-content { padding:16px 20px; }
  .sheet-name { font-size:1.6rem; }
  .sheet-stats { grid-template-columns:repeat(2,1fr); }
  .sheet-body { padding:22px 20px 0; }
  .sheet-cta-strip { margin:0 20px 24px; flex-direction:column; gap:16px; }
  .sheet-related { padding:18px 20px 28px; }
  .related-grid { grid-template-columns:repeat(2,1fr); }
  .sheet-gallery { padding:10px 16px; }
}

/* ══════════════════════════════════════════
   TRUST / TESTIMONIALS
══════════════════════════════════════════ */
.trust-section { background:var(--ink-2); padding:80px 6%; border-top:1px solid rgba(255,255,255,.06); }
.trust-inner { max-width:1280px; margin:0 auto; display:grid; grid-template-columns:1fr 1.8fr; gap:80px; align-items:start; }
.trust-left {}
.trust-eyebrow { font-size:.6rem; font-weight:700; letter-spacing:.2em; text-transform:uppercase; color:var(--gold); margin-bottom:16px; display:flex; align-items:center; gap:10px; }
.trust-eyebrow::before { content:''; width:20px; height:1px; background:var(--gold); }
.trust-heading { font-family:'Cormorant Garamond',serif; font-size:clamp(2rem,3vw,3rem); font-weight:300; color:#fff; line-height:1.15; letter-spacing:-.025em; margin-bottom:24px; }
.trust-heading em { font-style:italic; color:rgba(255,255,255,.3); }
.trust-nums { display:flex; flex-direction:column; gap:20px; margin-top:32px; }
.trust-num { display:flex; align-items:baseline; gap:12px; padding-bottom:20px; border-bottom:1px solid rgba(255,255,255,.07); }
.trust-num:last-child { border-bottom:none; }
.trust-n { font-family:'Cormorant Garamond',serif; font-size:2.6rem; font-weight:600; color:#fff; letter-spacing:-.04em; line-height:1; }
.trust-k { font-size:.68rem; font-weight:600; letter-spacing:.12em; text-transform:uppercase; color:rgba(255,255,255,.3); }
.trust-cards { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
.trust-card { background:var(--ink-3); border:1px solid rgba(255,255,255,.07); padding:24px; border-top:2px solid transparent; transition:border-top-color .25s; }
.trust-card:hover { border-top-color:var(--gold); }
.trust-stars { display:flex; gap:3px; margin-bottom:14px; }
.trust-star { width:12px; height:12px; fill:var(--gold); }
.trust-quote { font-size:.85rem; color:rgba(255,255,255,.45); line-height:1.72; font-style:italic; margin-bottom:18px; }
.trust-author { display:flex; align-items:center; gap:10px; }
.trust-av { width:34px; height:34px; border-radius:50%; overflow:hidden; border:1px solid rgba(201,169,110,.2); }
.trust-av img { width:100%; height:100%; object-fit:cover; object-position:center top; }
.trust-av-name { font-size:.78rem; font-weight:700; color:rgba(255,255,255,.7); }
.trust-av-loc { font-size:.62rem; color:rgba(255,255,255,.3); }

@media(max-width:1024px) { .trust-inner { grid-template-columns:1fr; gap:40px; } .trust-nums { flex-direction:row; flex-wrap:wrap; } .trust-num { border-bottom:none; border-right:1px solid rgba(255,255,255,.07); padding-right:20px; } .trust-num:last-child { border-right:none; } }
@media(max-width:768px) { .trust-section { padding:56px 6%; } .trust-cards { grid-template-columns:1fr; } }

/* ══════════════════════════════════════════
   FOOTER
══════════════════════════════════════════ */
.site-footer { background:#080809; padding:72px 6% 36px; border-top:1px solid rgba(201,169,110,.15); }
.footer-top { display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:48px; margin-bottom:48px; }
.footer-brand-name { font-family:'Cormorant Garamond',serif; font-size:2rem; font-weight:300; color:#fff; letter-spacing:-.02em; margin-bottom:4px; }
.footer-brand-tag { font-size:.56rem; font-weight:700; letter-spacing:.2em; text-transform:uppercase; color:var(--gold-dim); margin-bottom:16px; }
.footer-brand-desc { font-size:.85rem; color:rgba(255,255,255,.35); line-height:1.7; max-width:280px; }
.footer-col-head { font-size:.56rem; font-weight:700; letter-spacing:.18em; text-transform:uppercase; color:var(--gold-dim); margin-bottom:18px; }
.footer-col ul { list-style:none; display:flex; flex-direction:column; gap:11px; }
.footer-col ul li a { font-size:.85rem; color:rgba(255,255,255,.38); text-decoration:none; transition:color .18s; }
.footer-col ul li a:hover { color:var(--gold); }
.footer-bottom { border-top:1px solid rgba(255,255,255,.07); padding-top:24px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; }
.footer-copy { font-size:.72rem; color:rgba(255,255,255,.22); }
.footer-legal { display:flex; gap:20px; }
.footer-legal a { font-size:.72rem; color:rgba(255,255,255,.22); text-decoration:none; transition:color .18s; }
.footer-legal a:hover { color:var(--gold); }
.footer-cta-bar { display:flex; justify-content:space-between; align-items:center; margin-bottom:48px; padding-bottom:48px; border-bottom:1px solid rgba(255,255,255,.07); flex-wrap:wrap; gap:20px; }
.footer-cta-text { font-family:'Cormorant Garamond',serif; font-size:clamp(1.4rem,3vw,2.2rem); font-weight:300; color:#fff; letter-spacing:-.02em; }
.footer-cta-text em { font-style:italic; color:rgba(255,255,255,.35); }
.footer-cta-btns { display:flex; gap:12px; flex-wrap:wrap; }

@media(max-width:1024px) { .footer-top { grid-template-columns:1fr 1fr; gap:32px; } }
@media(max-width:768px) { .site-footer { padding:48px 6% 28px; } .footer-top { grid-template-columns:1fr; gap:28px; text-align:center; } .footer-brand-desc { max-width:100%; margin:0 auto; } .footer-cta-bar { flex-direction:column; align-items:center; text-align:center; } .footer-bottom { flex-direction:column; align-items:center; } .footer-legal { justify-content:center; } }

/* ══════════════════════════════════════════
   RESPONSIVE — desktop filter / main
══════════════════════════════════════════ */
@media(max-width:1024px) { .projects-grid { grid-template-columns:repeat(2,1fr); } }
@media(max-width:640px)  { .filter-inner { flex-direction:column; align-items:flex-start; gap:12px; } .filter-groups { gap:12px; flex-direction:column; } }
@media(min-width:769px)  { .mh-hero { display:none !important; } }
`;

/* ─────────────────────────────────────────────────────────────
   SVG ICONS
───────────────────────────────────────────────────────────── */
const Ic = {
    Arrow: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>,
    Close: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>,
    Pin: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
    Down: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12l7 7 7-7" /></svg>,
};

/* ─────────────────────────────────────────────────────────────
   PROJECT DETAIL OVERLAY
───────────────────────────────────────────────────────────── */
function ProjectDetail({ project, onClose, onOpenRelated }: {
    project: Project; onClose: () => void; onOpenRelated: (p: Project) => void;
}) {
    const [activeImg, setActiveImg] = useState(0);
    const allImgs = [project.coverImage, ...project.galleryImages];
    const sm = STATUS_META[project.status] ?? STATUS_META['Available'];
    const related = PROJECTS.filter(p => p.id !== project.id && p.type === project.type).slice(0, 3);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);
    useEffect(() => {
        const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', h);
        return () => window.removeEventListener('keydown', h);
    }, [onClose]);

    return (
        <div className="overlay-backdrop" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
            <div className="overlay-sheet">
                {/* Hero */}
                <div className="sheet-hero">
                    <img src={allImgs[activeImg]} alt={project.name} className="sheet-hero-img" />
                    <div className="sheet-hero-grad" />
                    <button className="sheet-close" onClick={onClose}><Ic.Close /></button>
                    <div className="sheet-hero-content">
                        <div className="sheet-status" style={{ background: sm.bg, color: sm.text }}>
                            <div className="sheet-status-dot" style={{ background: sm.dot }} />
                            {project.status}
                        </div>
                        <div className="sheet-name">{project.name}</div>
                        <div className="sheet-loc"><Ic.Pin /> {project.location}</div>
                    </div>
                </div>

                {/* Gallery */}
                <div className="sheet-gallery">
                    {allImgs.map((img, i) => (
                        <div key={i} className={`gallery-thumb${activeImg === i ? ' active' : ''}`} onClick={() => setActiveImg(i)}>
                            <img src={img} alt="" />
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div className="sheet-stats">
                    {[
                        { icon: <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>, val: project.priceFrom, key: 'Price From' },
                        { icon: <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>, val: project.completionYear, key: 'Completion' },
                        { icon: <svg viewBox="0 0 24 24"><path d="M22 7l-8.5 8.5-5-5L2 17" /><path d="M16 7h6v6" /></svg>, val: project.roi, key: 'Est. Gross ROI' },
                        { icon: <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>, val: `${project.units} units`, key: 'Total Units' },
                    ].map((s, i) => (
                        <div key={i} className="sheet-stat">
                            <div className="sheet-stat-icon">{s.icon}</div>
                            <div className="sheet-stat-val">{s.val}</div>
                            <div className="sheet-stat-key">{s.key}</div>
                        </div>
                    ))}
                </div>

                {/* Body */}
                <div className="sheet-body">
                    <p className="sheet-desc">{project.description}</p>
                    <div className="sheet-sub">Amenities & Features</div>
                    <div className="amenities-list">
                        {project.amenities.map(a => <span key={a} className="amenity-tag">{a}</span>)}
                    </div>
                    <div className="sheet-sub">Project Details</div>
                    <div className="sheet-details">
                        {[['Developer', project.developer], ['Type', project.type], ['Floors', String(project.floors)], ['Area Range', project.area], ['Payment', project.paymentPlan]].map(([k, v]) => (
                            <div key={k} className="sheet-detail">
                                <span className="sheet-detail-key">{k}</span>
                                <span className="sheet-detail-val">{v}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="sheet-cta-strip">
                    <div className="sheet-cta-left">
                        <div className="sheet-cta-eyebrow">Payment Plan</div>
                        <div className="sheet-cta-title">{project.paymentPlan}</div>
                        <div className="sheet-cta-sub">Flexible financing available · Talk to our advisors</div>
                    </div>
                    <div className="sheet-cta-btns">
                        <a href="/contact" className="sheet-btn-primary">Request Brochure</a>
                        <button className="sheet-btn-secondary" onClick={onClose}>Back to Projects</button>
                    </div>
                </div>

                {/* Related */}
                {related.length > 0 && (
                    <div className="sheet-related">
                        <div className="sheet-related-label">Similar Projects</div>
                        <div className="related-grid">
                            {related.map(r => (
                                <div key={r.id} className="related-card" onClick={() => onOpenRelated(r)}>
                                    <img src={r.coverImage} alt={r.name} className="related-img" />
                                    <div className="related-body">
                                        <div className="related-name">{r.name}</div>
                                        <div className="related-price">From {r.priceFrom}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────── */
export default function ProjectsPage() {
    const [statusFilter, setStatusFilter] = useState<Status>('All');
    const [typeFilter, setTypeFilter] = useState<TypeFilter>('All');
    const [openProject, setOpenProject] = useState<Project | null>(null);
    const [heroImgIdx, setHeroImgIdx] = useState(0);
    const [statsCounted, setStatsCounted] = useState(false);
    const [counters, setCounters] = useState({ projects: 0, value: 0, roi: 0, exp: 0 });

    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const statsRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const imgInterval = useRef<ReturnType<typeof setInterval>>();

    const featuredProject = PROJECTS.find(p => p.featured) ?? PROJECTS[0];
    const heroImages = [featuredProject.coverImage, ...PROJECTS.filter(p => p.id !== featuredProject.id).slice(0, 2).map(p => p.coverImage)];

    const filtered = PROJECTS.filter(p => {
        const sOk = statusFilter === 'All' || p.status === statusFilter;
        const tOk = typeFilter === 'All' || p.type === typeFilter;
        return sOk && tOk;
    });

    // cycle hero images every 5s
    useEffect(() => {
        imgInterval.current = setInterval(() => setHeroImgIdx(i => (i + 1) % heroImages.length), 5000);
        return () => clearInterval(imgInterval.current);
    }, []);

    // card scroll reveal
    useEffect(() => {
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
        }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' });
        cardRefs.current.forEach(el => { if (el) obs.observe(el); });
        return () => obs.disconnect();
    }, [filtered]);

    // stats counter
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting && !statsCounted) {
                setStatsCounted(true);
                const targets = { projects: 6, value: 1, roi: 86, exp: 12 };
                let step = 0; const total = 60;
                const ease = (t: number) => 1 - Math.pow(1 - t, 3);
                const timer = setInterval(() => {
                    step++;
                    const p = ease(Math.min(step / total, 1));
                    setCounters({ projects: Math.round(targets.projects * p), value: +(targets.value * p).toFixed(1), roi: Math.round(targets.roi * p), exp: Math.round(targets.exp * p) });
                    if (step >= total) { setCounters(targets); clearInterval(timer); }
                }, 1800 / total);
            }
        }, { threshold: 0.3 });
        if (statsRef.current) obs.observe(statsRef.current);
        return () => obs.disconnect();
    }, [statsCounted]);

    const tickerContent = [...TICKER_ITEMS, ...TICKER_ITEMS];

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: CSS }} />
            <Navbar />

            {openProject && (
                <ProjectDetail project={openProject} onClose={() => setOpenProject(null)} onOpenRelated={p => setOpenProject(p)} />
            )}

            {/* ══════════════════════════════════════
          DESKTOP HERO
      ══════════════════════════════════════ */}
            <div className="hero-desktop">
                <div className="dh-hero">
                    <div className="dh-bg-number">01</div>
                    <div className="dh-dot-grid" />
                    <div className="dh-diagonal" />
                    <div className="dh-scanline" />

                    {/* LEFT */}
                    <div className="dh-left">
                        <div className="dh-eyebrow">
                            <div className="dh-eyebrow-line" />
                            <span className="dh-eyebrow-text">Al Areeq Projects</span>
                            <div className="dh-eyebrow-dot" />
                            <span className="dh-eyebrow-live">Live Portfolio · UAE</span>
                        </div>

                        <h1 className="dh-headline">
                            <span className="dh-headline-l1">Invest in</span>
                            <span className="dh-headline-l2">tomorrow's</span>
                            <span className="dh-headline-l3">landmarks.</span>
                        </h1>

                        <p className="dh-sub">
                            Hand-curated developments from Dubai's most trusted builders.
                            Every project vetted for architecture, location, and yield.
                        </p>

                        <div className="dh-cta-row">
                            <a href="#projects" className="btn-gold">
                                Explore Projects <Ic.Arrow />
                            </a>
                            <a href="/contact" className="btn-ghost-gold">
                                Talk to an Advisor
                            </a>
                        </div>

                        <div className="dh-stats" ref={statsRef}>
                            {[
                                { num: `${counters.projects}+`, label: 'Live Projects' },
                                { num: `AED ${counters.value}B+`, label: 'Portfolio Value' },
                                { num: `${counters.roi / 10}%`, label: 'Avg. Gross ROI' },
                                { num: `${counters.exp}yr`, label: 'Market Experience' },
                            ].map(s => (
                                <div key={s.label} className="dh-stat">
                                    <div className="dh-stat-num">{s.num}</div>
                                    <div className="dh-stat-label">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT — cycling images */}
                    <div className="dh-right">
                        {heroImages.map((img, i) => (
                            <div key={i} className="dh-img-main" style={{
                                opacity: heroImgIdx === i ? 1 : 0,
                                transition: 'opacity 1.2s ease',
                                zIndex: heroImgIdx === i ? 1 : 0,
                            }}>
                                <img src={img} alt="" />
                            </div>
                        ))}

                        {/* floating info card */}
                        <div className="dh-float-card">
                            <div className="dh-float-card-label">✦ Currently Featured</div>
                            <div className="dh-float-card-name">{featuredProject.name}</div>
                            <div className="dh-float-card-loc"><Ic.Pin /> {featuredProject.location}</div>
                            <div className="dh-float-card-price-row">
                                <div>
                                    <div className="dh-float-price">From {featuredProject.priceFrom}</div>
                                    <div className="dh-float-price-sub">{featuredProject.type} · {featuredProject.completionYear} delivery</div>
                                </div>
                                <div className="dh-float-roi">ROI {featuredProject.roi}</div>
                            </div>
                        </div>

                        {/* image dots */}
                        <div className="dh-img-dots">
                            {heroImages.map((_, i) => (
                                <button
                                    key={i}
                                    className={`dh-img-dot${heroImgIdx === i ? ' active' : ''}`}
                                    onClick={() => { setHeroImgIdx(i); clearInterval(imgInterval.current); }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* scroll hint */}
                    <div className="dh-scroll-hint">
                        <div className="dh-scroll-track"><div className="dh-scroll-thumb" /></div>
                        <span className="dh-scroll-text">Scroll</span>
                    </div>

                    {/* bottom ticker */}
                    <div className="dh-ticker">
                        <div className="dh-ticker-label">Projects</div>
                        <div className="dh-ticker-track">
                            <div className="dh-ticker-inner">
                                {tickerContent.map((item, i) => (
                                    <span key={i} className="dh-ticker-item">{item}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ══════════════════════════════════════
          MOBILE HERO — separate full layout
      ══════════════════════════════════════ */}
            <div className="hero-mobile">
                <div className="mh-hero">
                    {/* Background image */}
                    <div className="mh-bg">
                        <img src={featuredProject.coverImage} alt="" />
                    </div>

                    {/* Swipe hint */}
                    <div className="mh-swipe-hint">
                        <div className="mh-swipe-icon">
                            <Ic.Down />
                        </div>
                        <span className="mh-swipe-text">Scroll</span>
                    </div>

                    {/* Top bar */}
                    <div className="mh-top-bar">
                        <div className="mh-live-badge">
                            <div className="mh-live-dot" />
                            <span className="mh-live-text">Live Projects · UAE</span>
                        </div>
                        <div className="mh-counter-badge">{PROJECTS.length} developments</div>
                    </div>

                    {/* Main text content */}
                    <div className="mh-content">
                        <div className="mh-label">
                            <span className="mh-label-line" />
                            Al Areeq Real Estate
                        </div>
                        <h1 className="mh-headline">
                            <span className="mh-h1">Invest in</span>
                            <span className="mh-h2">tomorrow's</span>
                            <span className="mh-h1" style={{ animationDelay: '.95s', opacity: 0 }}>landmarks.</span>
                        </h1>
                        <p className="mh-sub">
                            Hand-curated Dubai developments — vetted for architecture, location, and yield.
                        </p>
                        <div className="mh-cta-row">
                            <a href="#projects" className="mh-btn-primary">
                                Explore Now <Ic.Arrow />
                            </a>
                            <a href="/contact" className="mh-btn-secondary">Advise Me</a>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="mh-stats-strip">
                        {[
                            { n: '6+', l: 'Projects' },
                            { n: '8.6%', l: 'Avg. ROI' },
                            { n: '12yr', l: 'Experience' },
                        ].map(s => (
                            <div key={s.l} className="mh-stat">
                                <div className="mh-stat-num">{s.n}</div>
                                <div className="mh-stat-label">{s.l}</div>
                            </div>
                        ))}
                    </div>

                    {/* Ticker */}
                    <div className="mh-ticker">
                        <div className="mh-ticker-label">Projects</div>
                        <div style={{ flex: 1, overflow: 'hidden' }}>
                            <div className="mh-ticker-inner">
                                {tickerContent.map((item, i) => (
                                    <span key={i} className="mh-ticker-item">{item}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ══════════════════════════════════════
          FILTER BAR
      ══════════════════════════════════════ */}
            <div className="filter-section">
                <div className="filter-inner">
                    <div className="filter-groups">
                        <div className="filter-group">
                            <span className="filter-group-label">Status</span>
                            {STATUSES.map(s => (
                                <button key={s} className={`filter-chip${statusFilter === s ? ' active' : ''}`} onClick={() => setStatusFilter(s)}>{s}</button>
                            ))}
                        </div>
                        <div className="filter-group">
                            <span className="filter-group-label">Type</span>
                            {TYPES.map(t => (
                                <button key={t} className={`filter-chip${typeFilter === t ? ' active' : ''}`} onClick={() => setTypeFilter(t)}>{t}</button>
                            ))}
                        </div>
                    </div>
                    <div className="filter-count">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</div>
                </div>
            </div>

            {/* ══════════════════════════════════════
          PROJECTS GRID
      ══════════════════════════════════════ */}
            <section className="projects-section" id="projects">
                <div className="projects-inner">
                    <div className="section-head">
                        <div className="section-title-block">
                            <div className="section-eyebrow">Current Portfolio</div>
                            <h2 className="section-title">
                                {statusFilter === 'All' && typeFilter === 'All' ? <>All <em>Developments</em></> : <>{statusFilter !== 'All' ? statusFilter : typeFilter} <em>Projects</em></>}
                            </h2>
                            <div className="section-meta">{filtered.length} development{filtered.length !== 1 ? 's' : ''} — click any card to explore full details</div>
                        </div>
                        <button className="section-view-all">
                            View All <Ic.Arrow />
                        </button>
                    </div>

                    <div className="projects-grid">
                        {filtered.length === 0 && (
                            <div style={{ gridColumn: '1/-1', padding: '80px', textAlign: 'center', color: 'rgba(255,255,255,.25)', fontFamily: "'DM Sans',sans-serif" }}>
                                No projects match your filters.
                            </div>
                        )}
                        {filtered.map((p, i) => {
                            const sm = STATUS_META[p.status] ?? STATUS_META['Available'];
                            return (
                                <div
                                    key={p.id}
                                    className="project-card"
                                    ref={el => { cardRefs.current[i] = el; }}
                                    style={{ transitionDelay: `${i * 0.08}s` }}
                                    onClick={() => setOpenProject(p)}
                                >
                                    {/* Image */}
                                    <div className="card-img-wrap">
                                        <img src={p.coverImage} alt={p.name} className="card-img" loading="lazy" />
                                        <div className="card-img-overlay" />
                                        <div className="card-status" style={{ color: sm.text }}>
                                            <div className="card-status-dot" style={{ background: sm.dot }} />
                                            {p.status}
                                        </div>
                                        {p.tag && <div className="card-tag">{p.tag}</div>}
                                        <div className="card-price-overlay">
                                            <div>
                                                <div className="card-price-main">From {p.priceFrom}</div>
                                                <div className="card-price-sub">{p.type} · {p.completionYear}</div>
                                            </div>
                                            <div className="card-roi-badge">{p.roi} ROI</div>
                                        </div>
                                    </div>

                                    {/* Body */}
                                    <div className="card-body">
                                        <div className="card-developer">{p.developer}</div>
                                        <div className="card-name">{p.name}</div>
                                        <div className="card-loc"><Ic.Pin /> {p.location}</div>
                                        <div className="card-rule" />
                                        <div className="card-specs">
                                            <div className="card-spec"><div className="card-spec-val">{p.units}</div><div className="card-spec-key">Units</div></div>
                                            <div className="card-spec"><div className="card-spec-val">{p.floors}</div><div className="card-spec-key">Floors</div></div>
                                            <div className="card-spec"><div className="card-spec-val">{p.completionYear}</div><div className="card-spec-key">Handover</div></div>
                                            <div className="card-spec"><div className="card-spec-val">{p.paymentPlan.split(' ')[0]}</div><div className="card-spec-key">Plan</div></div>
                                        </div>
                                        <button className="card-cta">
                                            Explore Project <Ic.Arrow />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════
          TRUST / TESTIMONIALS
      ══════════════════════════════════════ */}
            <section className="trust-section">
                <div className="trust-inner">
                    <div className="trust-left">
                        <div className="trust-eyebrow">Client Success</div>
                        <h2 className="trust-heading">
                            Trusted by investors<br /><em>across the globe.</em>
                        </h2>
                        <div className="trust-nums">
                            {[['AED 1B+', 'in deals closed'], ['98%', 'client satisfaction'], ['850+', 'happy clients'], ['12yr', 'RERA licensed']].map(([n, k]) => (
                                <div key={k} className="trust-num">
                                    <div className="trust-n">{n}</div>
                                    <div className="trust-k">{k}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="trust-cards">
                        {[
                            { q: '"Al Areeq found us our dream villa in under two weeks. Mohammed was honest, never pushy, and negotiated an incredible deal."', name: 'Sarah & James M.', loc: 'Investors, London', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=85' },
                            { q: '"Three projects in my portfolio now, all performing above projections. The team\'s off-plan expertise is genuinely unmatched in Dubai."', name: 'Khalid Al Rashidi', loc: 'Portfolio Investor, UAE', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=85' },
                            { q: '"Zero pressure, pure professionalism. They showed me exactly what matched my goals — and negotiated terms I couldn\'t have achieved alone."', name: 'Carlos Reyes', loc: 'First-time Buyer, UAE', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=85' },
                            { q: '"We relocated from London with two kids. Al Areeq handled everything — school districts, contracts, neighbourhood tours — far beyond any agency."', name: 'Priya & Arjun Shah', loc: 'Palm Jumeirah, UAE', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=85' },
                        ].map((t, i) => (
                            <div key={i} className="trust-card">
                                <div className="trust-stars">{[0, 1, 2, 3, 4].map(j => <svg key={j} className="trust-star" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>)}</div>
                                <p className="trust-quote">{t.q}</p>
                                <div className="trust-author">
                                    <div className="trust-av"><img src={t.img} alt={t.name} /></div>
                                    <div>
                                        <div className="trust-av-name">{t.name}</div>
                                        <div className="trust-av-loc">{t.loc}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}
            <footer className="site-footer">
                <div className="footer-cta-bar">
                    <div className="footer-cta-text">
                        Ready to invest in your <em>next landmark?</em>
                    </div>
                    <div className="footer-cta-btns">
                        <a href="/contact" className="btn-gold" style={{ fontSize: '.82rem', padding: '12px 24px' }}>
                            Talk to an Advisor <Ic.Arrow />
                        </a>
                        <a href="/listings" className="btn-ghost-gold" style={{ fontSize: '.82rem', padding: '12px 20px' }}>
                            View Listings
                        </a>
                    </div>
                </div>

                <div className="footer-top">
                    <div>
                        <div className="footer-brand-name">Al Areeq</div>
                        <div className="footer-brand-tag">Luxury Real Estate · Est. 2012</div>
                        <p className="footer-brand-desc">Trusted real estate partner helping families buy, rent, and invest in premium Dubai properties since 2012.</p>
                    </div>
                    {[
                        { h: 'Properties', links: [['Buy', '#'], ['Rent', '#'], ['Projects', '/projects'], ['Luxury', '#']] },
                        { h: 'Company', links: [['About', '/about'], ['Agents', '#'], ['Blog', '/blog'], ['Contact', '/contact']] },
                        { h: 'Resources', links: [['Mortgage Calculator', '#'], ['Market Reports', '#'], ['Investment Guide', '#'], ['Area Guides', '#']] },
                    ].map(col => (
                        <div key={col.h} className="footer-col">
                            <div className="footer-col-head">{col.h}</div>
                            <ul>{col.links.map(([l, h]) => <li key={l}><a href={h}>{l}</a></li>)}</ul>
                        </div>
                    ))}
                </div>

                <div className="footer-bottom">
                    <div className="footer-copy">© {new Date().getFullYear()} Al Areeq Real Estate. All rights reserved.</div>
                    <div className="footer-legal">
                        <a href="#">Privacy</a><a href="#">Terms</a><a href="#">RERA Licensed</a>
                    </div>
                </div>
            </footer>
        </>
    );
}