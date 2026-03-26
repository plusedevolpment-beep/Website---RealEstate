'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import Navbar from '../components/Navbar';

/* ─────────────────────────────────────────────────────────────
   INTENT CONFIG
───────────────────────────────────────────────────────────── */
const INTENTS = {
    Buy: {
        label: 'Buy',
        headline: 'Find your perfect home.',
        sub: "Tell us what you're looking for and we'll match you with the right properties.",
        budgetLabel: 'Budget',
        budgets: ['Under 1M AED', '1M – 3M AED', '3M – 5M AED', '5M – 10M AED', '10M+ AED'],
        extraLabel: 'Preferred area',
        extraOptions: ['Downtown Dubai', 'Palm Jumeirah', 'Dubai Hills', 'Business Bay', 'JVC', 'Marina', 'Flexible'],
        messagePlaceholder: 'Describe your dream home — bedrooms, must-haves, neighbourhood preferences…',
        ctaLabel: 'Find My Home',
    },
    Sell: {
        label: 'Sell',
        headline: 'Get the best price for your property.',
        sub: "We'll run a free valuation and advise on the optimal time and strategy to sell.",
        budgetLabel: 'Expected asking price',
        budgets: ['Under 1M AED', '1M – 3M AED', '3M – 7M AED', '7M – 15M AED', '15M+ AED'],
        extraLabel: 'Property type',
        extraOptions: ['Apartment', 'Villa', 'Townhouse', 'Penthouse', 'Commercial', 'Land'],
        messagePlaceholder: 'Tell us about your property — location, size, condition, timeline to sell…',
        ctaLabel: 'Request Free Valuation',
    },
    Rent: {
        label: 'Rent',
        headline: 'Move in on your terms.',
        sub: "Share your requirements and we'll find rental options that fit your lifestyle and budget.",
        budgetLabel: 'Monthly rent budget',
        budgets: ['Under 5K AED/mo', '5K – 10K AED/mo', '10K – 20K AED/mo', '20K – 40K AED/mo', '40K+ AED/mo'],
        extraLabel: 'Move-in timeline',
        extraOptions: ['ASAP', 'Within 1 month', '1–3 months', '3–6 months', 'Just exploring'],
        messagePlaceholder: 'What are your must-haves? Parking, pet-friendly, school district, metro access…',
        ctaLabel: 'Find Rentals',
    },
    Invest: {
        label: 'Invest',
        headline: 'Build your Dubai portfolio.',
        sub: 'Our investment specialists will identify high-yield opportunities aligned with your goals.',
        budgetLabel: 'Investment capital',
        budgets: ['500K – 1M AED', '1M – 3M AED', '3M – 7M AED', '7M – 15M AED', '15M+ AED'],
        extraLabel: 'Investment goal',
        extraOptions: ['Rental yield', 'Capital appreciation', 'Both', 'Off-plan flip', 'Long-term hold'],
        messagePlaceholder: 'Tell us about your investment experience, risk appetite, and target returns…',
        ctaLabel: 'Talk to an Advisor',
    },
    Renovate: {
        label: 'Renovate',
        headline: 'Transform your space.',
        sub: 'From a single room to a full fit-out — on budget, on schedule, beautifully finished.',
        budgetLabel: 'Renovation budget',
        budgets: ['Under 50K AED', '50K – 150K AED', '150K – 400K AED', '400K – 1M AED', '1M+ AED'],
        extraLabel: 'Scope of work',
        extraOptions: ['Kitchen & bathrooms', 'Full interior fit-out', 'Flooring & painting', 'Structural changes', 'Landscaping', 'Full villa renovation'],
        messagePlaceholder: "Describe what you'd like to change, your style preferences, and any must-haves…",
        ctaLabel: 'Start My Renovation',
    },
} as const;

type IntentKey = keyof typeof INTENTS;
const INTENT_KEYS = Object.keys(INTENTS) as IntentKey[];

const CHANNELS = [
    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.4 12 19.79 19.79 0 0 1 1.21 3.18 2 2 0 0 1 3.22 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.09a16 16 0 0 0 6 6l.62-.62a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 16l.92.92z" /></svg>, label: 'Phone', value: '+971 4 123 4567', href: 'tel:+97141234567' },
    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>, label: 'Email', value: 'hello@alareeq.ae', href: 'mailto:hello@alareeq.ae' },
    { icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413zM12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413A11.815 11.815 0 0012.05 0z" /></svg>, label: 'WhatsApp', value: '+971 50 987 6543', href: 'https://wa.me/971509876543' },
    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>, label: 'Office', value: 'Emaar Square, Downtown Dubai', href: 'https://maps.google.com' },
];

const HOURS = [
    { day: 'Monday – Friday', time: '9:00 – 18:00' },
    { day: 'Saturday', time: '10:00 – 16:00' },
    { day: 'Sunday', time: 'By appointment' },
];

const AGENTS = [
    { name: 'Mohammed Al Areeq', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=85' },
    { name: 'Sara Al Mansouri', role: 'Senior Advisor', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=85' },
    { name: 'James Harrington', role: 'Head of Leasing', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=85' },
    { name: 'Priya Sharma', role: 'Client Relations', img: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=200&q=85' },
];

/* ─────────────────────────────────────────────────────────────
   CSS
───────────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');

*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{font-family:'DM Sans',sans-serif;background:#18181b;-webkit-font-smoothing:antialiased;overflow-x:hidden}

/* ══ KEYFRAMES ══ */
@keyframes fadeUp        {from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeDown      {from{opacity:0;transform:translateY(-14px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeLeft      {from{opacity:0;transform:translateX(22px)}to{opacity:1;transform:translateX(0)}}
@keyframes fadeRight     {from{opacity:0;transform:translateX(-22px)}to{opacity:1;transform:translateX(0)}}
@keyframes scaleIn       {from{opacity:0;transform:scale(.88)}to{opacity:1;transform:scale(1)}}
@keyframes pulse         {0%,100%{opacity:1;transform:scale(1)}50%{opacity:.18;transform:scale(1.9)}}
@keyframes spin          {to{transform:rotate(360deg)}}
@keyframes popIn         {from{opacity:0;transform:scale(.6)}to{opacity:1;transform:scale(1)}}
@keyframes popInBounce   {0%{opacity:0;transform:scale(.5)}70%{transform:scale(1.06)}100%{opacity:1;transform:scale(1)}}
@keyframes intSwitch     {from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes shimmer       {0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes lineGrow      {from{width:0}to{width:18px}}
@keyframes barGrow       {from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes floatA        {0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-12px) rotate(2deg)}}
@keyframes floatB        {0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-8px) rotate(-2deg)}}
@keyframes dotPop        {0%{transform:scale(0)}60%{transform:scale(1.3)}100%{transform:scale(1)}}
@keyframes successRing   {0%{box-shadow:0 0 0 0 rgba(34,197,94,.5)}100%{box-shadow:0 0 0 18px rgba(34,197,94,0)}}
@keyframes gradShift     {0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
@keyframes mobPanelUp    {from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
@keyframes orb1          {0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(30px,-20px) scale(1.05)}66%{transform:translate(-20px,15px) scale(.97)}}
@keyframes orb2          {0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(-25px,20px) scale(.95)}66%{transform:translate(20px,-15px) scale(1.04)}}
@keyframes checkDraw     {from{stroke-dashoffset:30}to{stroke-dashoffset:0}}

/* ════════════════════════════════════════════
   FOOTER  — verbatim from home page
════════════════════════════════════════════ */
.footer-clean{background:#111;color:#fff;padding:4rem 6% 2rem;}
.footer-cta{display:flex;justify-content:space-between;align-items:center;margin-bottom:3rem;padding-bottom:2rem;border-bottom:1px solid rgba(255,255,255,0.08);flex-wrap:wrap;gap:1.5rem;}
.footer-cta h2{font-family:'Outfit',sans-serif;font-size:1.6rem;font-weight:700;}
.footer-cta-buttons{display:flex;gap:1rem;}
.btn-footer-primary{background:#fff;color:#111;padding:0.7rem 1.4rem;border-radius:8px;font-weight:600;text-decoration:none;font-size:0.9rem;transition:opacity .2s,transform .2s;}
.btn-footer-primary:hover{opacity:.85;transform:translateY(-1px);}
.btn-outline{border:1px solid rgba(255,255,255,0.3);padding:0.7rem 1.4rem;border-radius:8px;color:#fff;text-decoration:none;font-size:0.9rem;transition:border-color .2s,transform .2s;}
.btn-outline:hover{border-color:rgba(255,255,255,0.7);transform:translateY(-1px);}
.footer-main{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:3rem;margin-bottom:2.5rem;}
.footer-brand h3{font-family:'Outfit',sans-serif;font-size:1.3rem;margin-bottom:1rem;}
.footer-brand p{color:rgba(255,255,255,0.5);font-size:0.9rem;line-height:1.6;max-width:300px;}
.footer-main h4{font-size:0.85rem;margin-bottom:1rem;color:rgba(255,255,255,0.6);text-transform:uppercase;letter-spacing:0.08em;}
.footer-main ul{list-style:none;padding:0;}
.footer-main ul li{margin-bottom:0.6rem;}
.footer-main ul li a{color:rgba(255,255,255,0.5);text-decoration:none;font-size:0.9rem;transition:color .2s,transform .2s;display:inline-block;}
.footer-main ul li a:hover{color:#fff;transform:translateX(3px);}
.footer-bottom{border-top:1px solid rgba(255,255,255,0.08);padding-top:1.5rem;display:flex;justify-content:space-between;flex-wrap:wrap;gap:1rem;}
.footer-bottom p,.footer-legal a{font-size:0.8rem;color:rgba(255,255,255,0.4);text-decoration:none;}
.footer-legal{display:flex;gap:1.5rem;}
.footer-legal a:hover{color:#fff;}
@media(max-width:1024px){.footer-main{grid-template-columns:1fr 1fr;}}
@media(max-width:768px){
  .footer-clean{padding:3rem 5% 2rem;text-align:center;}
  .footer-cta{flex-direction:column;align-items:center;}
  .footer-main{grid-template-columns:1fr;gap:2rem;text-align:center;}
  .footer-bottom{flex-direction:column;align-items:center;}
  .footer-legal{justify-content:center;}
}

/* ════════════════════════════════════════════
   DESKTOP (>768px)
════════════════════════════════════════════ */

.ct{min-height:100vh;background:#18181b;}

/* ── HERO ── */
.ct-hero{
  position:relative;overflow:hidden;
  padding:150px 6% 96px;
  display:flex;align-items:center;justify-content:center;
}

/* animated dot grid */
.ct-hero::before{
  content:'';position:absolute;inset:0;
  background-image:radial-gradient(circle,rgba(255,255,255,.028) 1px,transparent 1px);
  background-size:30px 30px;pointer-events:none;
  animation:fadeUp 1.2s ease .1s both;
}

/* floating orbs */
.ct-orb{
  position:absolute;border-radius:50%;pointer-events:none;filter:blur(60px);
}
.ct-orb-1{
  width:420px;height:420px;
  background:radial-gradient(circle,rgba(255,255,255,.04) 0%,transparent 70%);
  top:-80px;right:10%;
  animation:orb1 12s ease-in-out infinite;
}
.ct-orb-2{
  width:300px;height:300px;
  background:radial-gradient(circle,rgba(255,255,255,.03) 0%,transparent 70%);
  bottom:0;left:5%;
  animation:orb2 15s ease-in-out infinite;
}

.ct-hero-inner{
  position:relative;z-index:1;
  width:100%;max-width:1080px;margin:0 auto;
  display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:80px;
}

/* hero left staggered entrance */
.ct-hero-left>*{opacity:0;}
.ct-hero.go .ct-live    {animation:fadeDown .55s cubic-bezier(.34,1.2,.64,1) .06s forwards;}
.ct-hero.go .ct-h1      {animation:fadeUp .8s cubic-bezier(.16,1,.3,1) .2s forwards;}
.ct-hero.go .ct-sub     {animation:fadeUp .65s ease .38s forwards;}

.ct-live{
  display:inline-flex;align-items:center;gap:8px;
  font-size:.6rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;
  color:rgba(255,255,255,.32);margin-bottom:22px;
}
.ct-live-dot{
  width:6px;height:6px;border-radius:50%;background:#22c55e;
  animation:pulse 2s ease-in-out infinite,dotPop .5s cubic-bezier(.34,1.5,.64,1) .5s both;
}
.ct-h1{
  font-family:'Outfit',sans-serif;
  font-size:clamp(3rem,5vw,5rem);
  font-weight:900;line-height:1.02;letter-spacing:-.045em;color:#fff;margin-bottom:18px;
}
.ct-h1 em{
  font-style:normal;
  background:linear-gradient(90deg,rgba(255,255,255,.22),rgba(255,255,255,.35),rgba(255,255,255,.22));
  background-size:200% auto;
  -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;
  animation:shimmer 4s linear 1.2s infinite;
}
.ct-sub{font-size:.93rem;color:rgba(255,255,255,.36);line-height:1.85;max-width:340px;}

/* hero right channels */
.ct-hero-channels{display:flex;flex-direction:column;gap:11px;opacity:0;}
.ct-hero.go .ct-hero-channels{animation:fadeLeft .7s cubic-bezier(.16,1,.3,1) .45s forwards;}

.ct-channel-pill{
  display:flex;align-items:center;gap:14px;
  background:rgba(255,255,255,.055);border:1.5px solid rgba(255,255,255,.09);
  padding:14px 18px;border-radius:14px;text-decoration:none;
  transition:background .25s,border-color .25s,transform .3s cubic-bezier(.34,1.4,.64,1),box-shadow .25s;
  will-change:transform;
}
.ct-channel-pill:hover{
  background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.2);
  transform:translateX(6px) scale(1.01);
  box-shadow:0 8px 28px rgba(0,0,0,.25);
}
.ct-channel-ico{
  width:36px;height:36px;border-radius:9px;background:rgba(255,255,255,.1);
  display:flex;align-items:center;justify-content:center;color:#fff;flex-shrink:0;
  transition:background .25s,transform .3s cubic-bezier(.34,1.4,.64,1);
}
.ct-channel-ico svg{width:15px;height:15px;}
.ct-channel-pill:hover .ct-channel-ico{background:rgba(255,255,255,.2);transform:scale(1.1) rotate(-5deg);}
.ct-channel-copy{flex:1;}
.ct-channel-lbl{font-size:.58rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.3);margin-bottom:2px;}
.ct-channel-val{font-size:.88rem;font-weight:700;color:rgba(255,255,255,.8);}
.ct-channel-arr{
  color:rgba(255,255,255,.2);flex-shrink:0;
  transition:transform .25s cubic-bezier(.34,1.4,.64,1),color .2s;
}
.ct-channel-pill:hover .ct-channel-arr{color:rgba(255,255,255,.6);transform:translateX(4px);}

/* stagger each pill */
.ct-hero.go .ct-channel-pill:nth-child(1){animation:fadeLeft .55s cubic-bezier(.16,1,.3,1) .5s both;}
.ct-hero.go .ct-channel-pill:nth-child(2){animation:fadeLeft .55s cubic-bezier(.16,1,.3,1) .62s both;}
.ct-hero.go .ct-channel-pill:nth-child(3){animation:fadeLeft .55s cubic-bezier(.16,1,.3,1) .74s both;}
.ct-hero.go .ct-channel-pill:nth-child(4){animation:fadeLeft .55s cubic-bezier(.16,1,.3,1) .86s both;}
.ct-hero.go .ct-channel-pill{opacity:0;}

/* ── WHITE CARD ── */
.ct-card{
  background:#fff;border-radius:32px 32px 0 0;
  padding:88px 6% 96px;position:relative;overflow:hidden;
}
.ct-card::before{
  content:'';position:absolute;inset:0;
  background-image:radial-gradient(circle,rgba(0,0,0,.022) 1px,transparent 1px);
  background-size:30px 30px;pointer-events:none;z-index:0;
}
/* animated top-edge reveal */
.ct-card::after{
  content:'';position:absolute;top:0;left:0;right:0;height:3px;z-index:2;
  background:linear-gradient(90deg,#18181b,#3f3f46,#18181b);
  background-size:200% auto;
  transform:scaleX(0);transform-origin:left;
  transition:transform 1s cubic-bezier(.16,1,.3,1) .3s;
}
.ct-card.go::after{transform:scaleX(1);}

.ct-card-inner{
  position:relative;z-index:1;
  max-width:1080px;margin:0 auto;
  display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start;
}

/* ── LEFT INFO ── */
.ct-info{display:flex;flex-direction:column;gap:48px;}

.ct-info-top{
  opacity:0;transform:translateY(20px);
  transition:opacity .75s cubic-bezier(.16,1,.3,1) .12s,transform .75s cubic-bezier(.16,1,.3,1) .12s;
}
.ct-card.go .ct-info-top{opacity:1;transform:translateY(0);}

.ct-eyebrow{
  display:flex;align-items:center;gap:8px;
  font-size:.59rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#a1a1aa;
  margin-bottom:14px;
}
.ct-eyebrow-line{
  width:0;height:1.5px;background:#d4d4d8;
  transition:width .7s cubic-bezier(.16,1,.3,1) .6s;
}
.ct-card.go .ct-eyebrow-line{width:18px;}

.ct-info-h2{
  font-family:'Outfit',sans-serif;font-size:clamp(1.9rem,2.8vw,2.6rem);
  font-weight:900;line-height:1.1;letter-spacing:-.04em;color:#18181b;margin-bottom:12px;
}
.ct-info-body{font-size:.9rem;color:#71717a;line-height:1.85;}

/* channel rows */
.ct-rows{display:flex;flex-direction:column;}
.ct-row{
  display:flex;align-items:center;gap:16px;
  padding:16px 0;border-bottom:1px solid #f2f2f2;
  text-decoration:none;color:inherit;
  opacity:0;transform:translateX(-16px);
  transition:opacity .55s cubic-bezier(.16,1,.3,1),transform .55s cubic-bezier(.16,1,.3,1),background .18s;
}
.ct-row:first-child{padding-top:0;}
.ct-row:last-child{border-bottom:none;}
.ct-row.in{opacity:1;transform:translateX(0);}

.ct-row-ico{
  width:40px;height:40px;border-radius:10px;background:#f4f4f5;flex-shrink:0;
  display:flex;align-items:center;justify-content:center;color:#52525b;
  transition:background .22s,color .22s,transform .3s cubic-bezier(.34,1.4,.64,1);
}
.ct-row-ico svg{width:15px;height:15px;}
.ct-row:hover .ct-row-ico{background:#18181b;color:#fff;transform:scale(1.1) rotate(-6deg);}

.ct-row-copy{flex:1;}
.ct-row-lbl{font-size:.58rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#a1a1aa;margin-bottom:3px;}
.ct-row-val{
  font-size:.9rem;font-weight:700;color:#18181b;
  transition:color .2s;
}
.ct-row:hover .ct-row-val{color:#18181b;}

.ct-row-arr{
  color:#d4d4d8;opacity:0;transform:translateX(-8px);
  transition:opacity .22s,transform .25s cubic-bezier(.34,1.4,.64,1);flex-shrink:0;
}
.ct-row:hover .ct-row-arr{opacity:1;transform:translateX(0);}

/* border shimmer on hover */
.ct-row{position:relative;}
.ct-row::after{
  content:'';position:absolute;bottom:0;left:0;width:0;height:1px;
  background:linear-gradient(90deg,#18181b,transparent);
  transition:width .4s cubic-bezier(.16,1,.3,1);
}
.ct-row:hover::after{width:100%;}

/* hours */
.ct-hours{
  opacity:0;transform:translateY(14px);
  transition:opacity .65s cubic-bezier(.16,1,.3,1) .35s,transform .65s cubic-bezier(.16,1,.3,1) .35s;
}
.ct-card.go .ct-hours{opacity:1;transform:translateY(0);}
.ct-hours-ttl{font-size:.58rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#a1a1aa;margin-bottom:12px;}
.ct-hours-row{
  display:flex;justify-content:space-between;align-items:center;
  padding:10px 0;border-bottom:1px solid #f4f4f4;font-size:.87rem;
  transition:background .18s,padding-left .2s;border-radius:6px;
}
.ct-hours-row:last-child{border-bottom:none;}
.ct-hours-row:hover{padding-left:6px;background:#fafafa;}
.ct-hours-day{color:#71717a;font-weight:500;}
.ct-hours-time{color:#18181b;font-weight:700;}

/* ── FORM COLUMN ── */
.ct-form-col{
  opacity:0;transform:translateY(20px);
  transition:opacity .75s cubic-bezier(.16,1,.3,1) .24s,transform .75s cubic-bezier(.16,1,.3,1) .24s;
}
.ct-card.go .ct-form-col{opacity:1;transform:translateY(0);}

.ct-form-box{
  background:#fafafa;border:1.5px solid #e8e8e8;border-radius:24px;
  padding:38px 34px 34px;position:relative;overflow:hidden;
}

/* intent switcher */
.ct-intent-row{
  display:flex;gap:5px;
  padding:5px;background:#f0f0f0;border-radius:14px;
  margin-bottom:24px;
}
.ct-intent-btn{
  flex:1;padding:9px 4px;border:none;border-radius:10px;cursor:pointer;
  font-family:'DM Sans',sans-serif;font-size:.8rem;font-weight:700;
  color:#71717a;background:transparent;
  transition:background .25s,color .25s,box-shadow .25s,transform .2s cubic-bezier(.34,1.4,.64,1);
  white-space:nowrap;text-align:center;position:relative;overflow:hidden;
}
.ct-intent-btn::after{
  content:'';position:absolute;inset:0;
  background:radial-gradient(circle at center,rgba(255,255,255,.4) 0%,transparent 70%);
  opacity:0;transition:opacity .3s;pointer-events:none;
}
.ct-intent-btn:hover:not(.active){color:#3f3f46;background:rgba(255,255,255,.5);}
.ct-intent-btn.active{
  background:#fff;color:#18181b;
  box-shadow:0 2px 12px rgba(0,0,0,.12);
  transform:translateY(-1px);
}
.ct-intent-btn.active::after{opacity:1;}

/* intent headline animate on switch */
.ct-intent-head{margin-bottom:22px;animation:intSwitch .38s cubic-bezier(.16,1,.3,1) both;}
.ct-intent-h{
  font-family:'Outfit',sans-serif;font-size:1.22rem;font-weight:900;
  letter-spacing:-.03em;color:#18181b;margin-bottom:5px;
}
.ct-intent-sub{font-size:.83rem;color:#71717a;line-height:1.62;}

/* fields */
.ct-fields{display:flex;flex-direction:column;gap:14px;}
.ct-row2{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.ct-field{display:flex;flex-direction:column;gap:5px;}
.ct-flbl{
  font-size:.59rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#71717a;
  transition:color .2s;
}
.ct-field:focus-within .ct-flbl{color:#18181b;}

.ct-inp,.ct-sel,.ct-tex{
  padding:12px 14px;border:1.5px solid #e4e4e7;border-radius:11px;
  font-family:'DM Sans',sans-serif;font-size:.9rem;color:#18181b;
  background:#fff;outline:none;width:100%;
  transition:border-color .22s,box-shadow .22s,transform .2s cubic-bezier(.34,1.4,.64,1),background .2s;
  -webkit-appearance:none;
}
.ct-inp::placeholder,.ct-tex::placeholder{color:#c0c0c4;}
.ct-inp:hover,.ct-sel:hover{border-color:#c4c4c7;}
.ct-inp:focus,.ct-sel:focus,.ct-tex:focus{
  border-color:#18181b;
  box-shadow:0 0 0 3px rgba(24,24,27,.07);
  transform:translateY(-1px);
}
.ct-tex{resize:none;height:96px;line-height:1.65;}
.ct-sel{
  cursor:pointer;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%23a1a1aa' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat:no-repeat;background-position:right 13px center;padding-right:36px;
}

/* submit btn */
.ct-btn{
  width:100%;padding:14px;border-radius:12px;
  background:#18181b;color:#fff;border:none;cursor:pointer;
  font-family:'Outfit',sans-serif;font-size:.97rem;font-weight:800;letter-spacing:-.01em;
  display:flex;align-items:center;justify-content:center;gap:9px;
  box-shadow:0 4px 20px rgba(0,0,0,.18);margin-top:4px;
  position:relative;overflow:hidden;
  transition:transform .25s cubic-bezier(.34,1.4,.64,1),box-shadow .25s,opacity .2s;
  animation:intSwitch .3s ease both;
}
/* shimmer sweep */
.ct-btn::before{
  content:'';position:absolute;inset:0;
  background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,.12) 50%,transparent 65%);
  transform:translateX(-100%);transition:transform .55s ease;pointer-events:none;
}
.ct-btn:hover::before{transform:translateX(100%);}
.ct-btn:hover{transform:translateY(-2px) scale(1.01);box-shadow:0 12px 32px rgba(0,0,0,.26);}
.ct-btn:active{transform:scale(.98);}
.ct-btn:disabled{opacity:.4;cursor:not-allowed;transform:none;}
.ct-btn svg{transition:transform .22s cubic-bezier(.34,1.4,.64,1);}
.ct-btn:not(:disabled):hover svg{transform:translateX(5px);}
.spin{animation:spin .8s linear infinite;}

/* success */
.ct-ok{display:flex;flex-direction:column;align-items:center;text-align:center;gap:12px;padding:10px 0;}
.ct-ok-ico{
  width:60px;height:60px;border-radius:50%;background:#f0fdf4;border:1.5px solid #bbf7d0;
  display:flex;align-items:center;justify-content:center;
  animation:popInBounce .55s cubic-bezier(.34,1.5,.64,1) both,successRing 1.2s ease .55s;
}
.ct-ok-ico svg{overflow:visible;}
.ct-ok-ico .check{stroke-dasharray:30;stroke-dashoffset:30;animation:checkDraw .4s ease .45s forwards;}
.ct-ok-h{font-family:'Outfit',sans-serif;font-size:1.25rem;font-weight:900;color:#18181b;}
.ct-ok-p{font-size:.84rem;color:#71717a;line-height:1.7;max-width:260px;}

/* ── AGENTS ── */
.ct-agents{
  max-width:1080px;margin:72px auto 0;padding-top:56px;
  border-top:1px solid #ebebeb;position:relative;z-index:1;
  opacity:0;transform:translateY(20px);
  transition:opacity .75s cubic-bezier(.16,1,.3,1),transform .75s cubic-bezier(.16,1,.3,1);
}
.ct-agents.go{opacity:1;transform:translateY(0);}
.ct-agents-h{
  font-family:'Outfit',sans-serif;font-size:1.45rem;font-weight:900;
  letter-spacing:-.035em;color:#18181b;margin-bottom:24px;
  opacity:0;transform:translateY(12px);
  transition:opacity .6s cubic-bezier(.16,1,.3,1) .1s,transform .6s cubic-bezier(.16,1,.3,1) .1s;
}
.ct-agents.go .ct-agents-h{opacity:1;transform:translateY(0);}
.ct-agents-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}

.ct-agent{
  padding:22px 18px 18px;border:1.5px solid #ebebeb;border-radius:18px;background:#fff;
  position:relative;overflow:hidden;
  opacity:0;transform:translateY(24px) scale(.97);
  transition:opacity .55s cubic-bezier(.16,1,.3,1),transform .55s cubic-bezier(.16,1,.3,1),border-color .22s,box-shadow .22s;
  will-change:transform;
}
.ct-agent::before{
  content:'';position:absolute;top:0;left:0;right:0;height:3px;
  background:#18181b;transform:scaleX(0);transform-origin:left;
  transition:transform .38s cubic-bezier(.16,1,.3,1);
}
.ct-agent:hover::before{transform:scaleX(1);}
.ct-agent.in{opacity:1;transform:translateY(0) scale(1);}
.ct-agent:hover{
  border-color:#d4d4d8;box-shadow:0 14px 40px rgba(0,0,0,.1);
  transform:translateY(-6px) scale(1.01) !important;
}

.ct-agent-img{
  width:52px;height:52px;border-radius:50%;overflow:hidden;margin-bottom:12px;
  border:1.5px solid #e8e8e8;
  transition:transform .35s cubic-bezier(.34,1.4,.64,1),border-color .22s;
}
.ct-agent:hover .ct-agent-img{transform:scale(1.08);border-color:#d4d4d8;}
.ct-agent-img img{width:100%;height:100%;object-fit:cover;object-position:center top;}
.ct-agent-name{font-family:'Outfit',sans-serif;font-size:.88rem;font-weight:800;color:#18181b;margin-bottom:2px;}
.ct-agent-role{font-size:.72rem;color:#a1a1aa;font-weight:600;margin-bottom:14px;}
.ct-agent-cta{
  display:inline-flex;align-items:center;gap:6px;
  font-size:.73rem;font-weight:700;color:#52525b;
  padding-top:12px;border-top:1px solid #f0f0f0;
  text-decoration:none;width:100%;
  transition:color .2s,gap .2s cubic-bezier(.34,1.4,.64,1);
}
.ct-agent-cta svg{transition:transform .22s cubic-bezier(.34,1.4,.64,1);}
.ct-agent-cta:hover{color:#18181b;gap:10px;}
.ct-agent-cta:hover svg{transform:translateX(3px);}


/* ════════════════════════════════════════════
   MOBILE (≤768px) — dedicated UI
════════════════════════════════════════════ */
@media (max-width:768px){
  .ct,.ct + .footer-clean{display:none!important;}

  .mob{min-height:100vh;background:#18181b;display:flex;flex-direction:column;}

  /* orbs on mobile too */
  .mob-orb{
    position:fixed;border-radius:50%;pointer-events:none;filter:blur(50px);z-index:0;
  }
  .mob-orb-1{
    width:280px;height:280px;top:-60px;right:-40px;
    background:radial-gradient(circle,rgba(255,255,255,.04) 0%,transparent 70%);
    animation:orb1 14s ease-in-out infinite;
  }
  .mob-orb-2{
    width:200px;height:200px;bottom:30%;left:-30px;
    background:radial-gradient(circle,rgba(255,255,255,.03) 0%,transparent 70%);
    animation:orb2 18s ease-in-out infinite;
  }

  /* top bar */
  .mob-top{
    position:relative;z-index:1;
    padding:80px 6% 0;
    display:flex;align-items:flex-end;justify-content:space-between;
    opacity:0;transform:translateY(-10px);
    transition:opacity .55s cubic-bezier(.16,1,.3,1) .06s,transform .55s cubic-bezier(.16,1,.3,1) .06s;
  }
  .mob-top.go{opacity:1;transform:translateY(0);}
  .mob-brand{font-size:.58rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.26);margin-bottom:6px;}
  .mob-h1{font-family:'Outfit',sans-serif;font-size:2.1rem;font-weight:900;letter-spacing:-.04em;color:#fff;line-height:1.06;}
  .mob-h1 em{font-style:normal;color:rgba(255,255,255,.28);}
  .mob-online{display:flex;align-items:center;gap:6px;padding-bottom:5px;}
  .mob-dot{width:7px;height:7px;border-radius:50%;background:#22c55e;animation:pulse 2s ease-in-out infinite;}
  .mob-online-txt{font-size:.6rem;font-weight:700;letter-spacing:.07em;color:rgba(255,255,255,.32);}

  /* quick actions */
  .mob-acts{
    position:relative;z-index:1;
    display:flex;gap:10px;padding:26px 6% 0;
    opacity:0;transform:translateY(12px);
    transition:opacity .55s cubic-bezier(.16,1,.3,1) .18s,transform .55s cubic-bezier(.16,1,.3,1) .18s;
  }
  .mob-acts.go{opacity:1;transform:translateY(0);}
  .mob-act{
    flex:1;display:flex;flex-direction:column;align-items:center;gap:7px;
    padding:15px 8px;
    background:rgba(255,255,255,.055);border:1.5px solid rgba(255,255,255,.08);
    border-radius:15px;text-decoration:none;
    transition:background .22s,border-color .22s,transform .22s cubic-bezier(.34,1.4,.64,1),box-shadow .22s;
  }
  .mob-act:hover{background:rgba(255,255,255,.09);border-color:rgba(255,255,255,.15);transform:translateY(-3px);box-shadow:0 8px 20px rgba(0,0,0,.25);}
  .mob-act:active{transform:scale(.95);}
  .mob-act-ico{
    width:36px;height:36px;border-radius:9px;background:rgba(255,255,255,.09);
    display:flex;align-items:center;justify-content:center;color:#fff;
    transition:background .22s,transform .25s cubic-bezier(.34,1.4,.64,1);
  }
  .mob-act-ico svg{width:15px;height:15px;}
  .mob-act:hover .mob-act-ico{background:rgba(255,255,255,.18);transform:scale(1.08) rotate(-5deg);}
  .mob-act-lbl{font-size:.58rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:rgba(255,255,255,.35);}

  /* white panel */
  .mob-panel{
    position:relative;z-index:1;
    flex:1;background:#fff;border-radius:26px 26px 0 0;margin-top:26px;
    padding:36px 6% 52px;
    opacity:0;transform:translateY(20px);
    transition:opacity .65s cubic-bezier(.16,1,.3,1) .28s,transform .65s cubic-bezier(.16,1,.3,1) .28s;
  }
  .mob-panel.go{opacity:1;transform:translateY(0);}
  /* panel top shimmer bar */
  .mob-panel::before{
    content:'';position:absolute;top:0;left:6%;right:6%;height:3px;border-radius:99px;
    background:linear-gradient(90deg,#18181b,#3f3f46,#18181b);
    background-size:200% auto;transform:scaleX(0);transform-origin:center;
    transition:transform .8s cubic-bezier(.16,1,.3,1) .5s;
  }
  .mob-panel.go::before{transform:scaleX(1);}

  /* intent tabs */
  .mob-intent-row{
    display:flex;gap:4px;
    padding:4px;background:#f0f0f0;border-radius:13px;
    margin-bottom:22px;overflow:hidden;
  }
  .mob-intent-btn{
    flex:1;padding:8px 2px;border:none;border-radius:9px;cursor:pointer;
    font-family:'DM Sans',sans-serif;font-size:.72rem;font-weight:700;
    color:#71717a;background:transparent;
    transition:background .22s,color .22s,box-shadow .22s,transform .2s cubic-bezier(.34,1.4,.64,1);
    text-align:center;white-space:nowrap;
  }
  .mob-intent-btn.active{
    background:#fff;color:#18181b;
    box-shadow:0 2px 8px rgba(0,0,0,.1);
    transform:translateY(-1px);
  }

  /* intent headline */
  .mob-int-head{margin-bottom:18px;animation:intSwitch .35s cubic-bezier(.16,1,.3,1) both;}
  .mob-int-h{font-family:'Outfit',sans-serif;font-size:1.15rem;font-weight:900;color:#18181b;letter-spacing:-.03em;margin-bottom:3px;}
  .mob-int-sub{font-size:.79rem;color:#a1a1aa;line-height:1.55;}

  /* fields */
  .mob-form{display:flex;flex-direction:column;gap:13px;}
  .mob-field{display:flex;flex-direction:column;gap:5px;}
  .mob-lbl{font-size:.57rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#a1a1aa;transition:color .18s;}
  .mob-field:focus-within .mob-lbl{color:#18181b;}
  .mob-inp,.mob-sel,.mob-tex{
    padding:14px;border:1.5px solid #e4e4e7;border-radius:12px;
    font-family:'DM Sans',sans-serif;font-size:1rem;color:#18181b;
    background:#fafafa;outline:none;width:100%;
    transition:border-color .2s,background .2s,box-shadow .2s,transform .18s;
    -webkit-appearance:none;
  }
  .mob-inp::placeholder,.mob-tex::placeholder{color:#c0c0c4;}
  .mob-inp:focus,.mob-sel:focus,.mob-tex:focus{
    border-color:#18181b;background:#fff;
    box-shadow:0 0 0 3px rgba(24,24,27,.07);
    transform:translateY(-1px);
  }
  .mob-tex{resize:none;height:88px;line-height:1.6;}
  .mob-sel{
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%23a1a1aa' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat:no-repeat;background-position:right 13px center;padding-right:36px;
  }
  .mob-btn{
    width:100%;padding:15px;margin-top:4px;border-radius:13px;
    background:#18181b;color:#fff;border:none;cursor:pointer;
    font-family:'Outfit',sans-serif;font-size:.97rem;font-weight:800;
    display:flex;align-items:center;justify-content:center;gap:9px;
    box-shadow:0 5px 20px rgba(0,0,0,.18);position:relative;overflow:hidden;
    transition:transform .22s cubic-bezier(.34,1.4,.64,1),box-shadow .22s,opacity .18s;
    animation:intSwitch .3s ease both;
  }
  .mob-btn::before{
    content:'';position:absolute;inset:0;
    background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,.1) 50%,transparent 65%);
    transform:translateX(-100%);transition:transform .5s ease;pointer-events:none;
  }
  .mob-btn:hover::before{transform:translateX(100%);}
  .mob-btn:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(0,0,0,.24);}
  .mob-btn:active{transform:scale(.96);}
  .mob-btn:disabled{opacity:.38;}

  /* success */
  .mob-ok{display:flex;flex-direction:column;align-items:center;text-align:center;gap:11px;padding:14px 0;}
  .mob-ok-ico{
    width:58px;height:58px;border-radius:50%;background:#f0fdf4;border:1.5px solid #bbf7d0;
    display:flex;align-items:center;justify-content:center;
    animation:popInBounce .5s cubic-bezier(.34,1.5,.64,1) both,successRing 1.2s ease .5s;
  }
  .mob-ok-ico .check{stroke-dasharray:30;stroke-dashoffset:30;animation:checkDraw .4s ease .4s forwards;}
  .mob-ok-h{font-family:'Outfit',sans-serif;font-size:1.2rem;font-weight:900;color:#18181b;}
  .mob-ok-p{font-size:.82rem;color:#71717a;line-height:1.7;}

  /* divider */
  .mob-hr{height:1px;background:#f0f0f0;margin:28px 0;}

  /* info rows */
  .mob-info-h{font-family:'Outfit',sans-serif;font-size:.95rem;font-weight:800;color:#18181b;margin-bottom:14px;}
  .mob-info-list{display:flex;flex-direction:column;}
  .mob-info-row{
    display:flex;align-items:center;gap:13px;
    padding:13px 0;border-bottom:1px solid #f4f4f5;
    text-decoration:none;color:inherit;
    transition:background .15s,padding-left .2s;border-radius:8px;
  }
  .mob-info-row:last-child{border-bottom:none;}
  .mob-info-row:active{background:#f4f4f5;padding-left:6px;}
  .mob-info-ico{
    width:36px;height:36px;border-radius:9px;background:#f4f4f5;
    display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#52525b;
    transition:background .2s,color .2s,transform .25s cubic-bezier(.34,1.4,.64,1);
  }
  .mob-info-ico svg{width:14px;height:14px;}
  .mob-info-row:active .mob-info-ico{background:#18181b;color:#fff;transform:scale(1.08);}
  .mob-info-copy{flex:1;min-width:0;}
  .mob-info-lbl{font-size:.56rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#a1a1aa;margin-bottom:2px;}
  .mob-info-val{font-size:.86rem;font-weight:700;color:#18181b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .mob-chev{color:#d4d4d8;flex-shrink:0;transition:transform .22s cubic-bezier(.34,1.4,.64,1);}
  .mob-info-row:active .mob-chev{transform:translateX(4px);}

  /* hours */
  .mob-hours{margin-top:20px;padding:18px;background:#18181b;border-radius:15px;}
  .mob-hours-lbl{font-size:.56rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.27);margin-bottom:11px;}
  .mob-hours-row{
    display:flex;justify-content:space-between;padding:9px 0;
    border-bottom:1px solid rgba(255,255,255,.07);
    transition:padding-left .2s;
  }
  .mob-hours-row:last-child{border-bottom:none;padding-bottom:0;}
  .mob-hours-day{font-size:.82rem;color:rgba(255,255,255,.44);font-weight:500;}
  .mob-hours-time{font-size:.82rem;color:rgba(255,255,255,.82);font-weight:700;}
}

/* ════════════════════════════════════════════
   Hide mobile on desktop
════════════════════════════════════════════ */
@media (min-width:769px){.mob{display:none!important;}}

/* Desktop responsive */
@media (max-width:1100px){
  .ct-card-inner,.ct-agents,.ct-hero-inner{padding-left:5%;padding-right:5%;}
  .ct-card{padding:72px 5% 88px;}
  .ct-card-inner{gap:60px;}
}
@media (max-width:960px){
  .ct-hero-inner{grid-template-columns:1fr;}
  .ct-hero-channels{display:none;}
  .ct-hero-left .ct-sub{max-width:480px;}
  .ct-agents-grid{grid-template-columns:repeat(2,1fr);}
}
`;

/* ─────────────────────────────────────────────────────────────
   ICONS
───────────────────────────────────────────────────────────── */
const ArrowRight = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
);
const ChevRight = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18l6-6-6-6" />
    </svg>
);
const CheckIcon = () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round">
        <polyline className="check" points="20 6 9 17 4 12" />
    </svg>
);

/* ─────────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────────── */
const SiteFooter = () => (
    <footer className="footer-clean">
        <div className="footer-cta">
            <h2>Find your dream home today.</h2>
            <div className="footer-cta-buttons">
                <a href="/listings" className="btn-footer-primary">Browse Listings</a>
                <a href="/contact" className="btn-outline">Contact Agent</a>
            </div>
        </div>
        <div className="footer-main">
            <div className="footer-brand">
                <h3>Al Areeq</h3>
                <p>Trusted real estate partner helping families buy, rent and invest in premium Dubai properties since 2012.</p>
            </div>
            <div>
                <h4>Properties</h4>
                <ul>
                    <li><a href="#">Buy</a></li>
                    <li><a href="#">Rent</a></li>
                    <li><a href="#">Luxury</a></li>
                </ul>
            </div>
            <div>
                <h4>Company</h4>
                <ul>
                    <li><a href="/about">About</a></li>
                    <li><a href="#">Agents</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </div>
            <div>
                <h4>Resources</h4>
                <ul>
                    <li><a href="#">Mortgage Calculator</a></li>
                    <li><a href="#">Market Reports</a></li>
                </ul>
            </div>
        </div>
        <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Al Areeq Real Estate. All rights reserved.</p>
            <div className="footer-legal">
                <a href="#">Privacy</a>
                <a href="#">Terms</a>
            </div>
        </div>
    </footer>
);

/* ─────────────────────────────────────────────────────────────
   SMART FORM
───────────────────────────────────────────────────────────── */
interface FormProps { intent: IntentKey; mobile?: boolean; onSuccess: () => void; }

function SmartForm({ intent, mobile, onSuccess }: FormProps) {
    const cfg = INTENTS[intent];
    const [sending, setSending] = useState(false);
    const c = mobile
        ? { wrap: 'mob-form', field: 'mob-field', lbl: 'mob-lbl', inp: 'mob-inp', sel: 'mob-sel', tex: 'mob-tex', row2: '', btn: 'mob-btn' }
        : { wrap: 'ct-fields', field: 'ct-field', lbl: 'ct-flbl', inp: 'ct-inp', sel: 'ct-sel', tex: 'ct-tex', row2: 'ct-row2', btn: 'ct-btn' };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        setTimeout(() => { setSending(false); onSuccess(); }, 1400);
    };

    return (
        <form className={c.wrap} onSubmit={submit} key={intent}>
            {mobile ? (
                <>
                    <div className={c.field}><label className={c.lbl}>Name</label><input className={c.inp} type="text" placeholder="Mohammed Al Rashidi" required /></div>
                    <div className={c.field}><label className={c.lbl}>Email</label><input className={c.inp} type="email" placeholder="you@example.com" required /></div>
                    <div className={c.field}><label className={c.lbl}>Phone</label><input className={c.inp} type="tel" placeholder="+971 50 000 0000" /></div>
                </>
            ) : (
                <div className={c.row2}>
                    <div className={c.field}><label className={c.lbl}>Name</label><input className={c.inp} type="text" placeholder="Mohammed" required /></div>
                    <div className={c.field}><label className={c.lbl}>Phone</label><input className={c.inp} type="tel" placeholder="+971 50 …" /></div>
                </div>
            )}
            {!mobile && <div className={c.field}><label className={c.lbl}>Email</label><input className={c.inp} type="email" placeholder="you@example.com" required /></div>}

            {mobile ? (
                <>
                    <div className={c.field}><label className={c.lbl}>{cfg.budgetLabel}</label><select className={c.sel}>{cfg.budgets.map(b => <option key={b}>{b}</option>)}</select></div>
                    <div className={c.field}><label className={c.lbl}>{cfg.extraLabel}</label><select className={c.sel}>{cfg.extraOptions.map(o => <option key={o}>{o}</option>)}</select></div>
                </>
            ) : (
                <div className={c.row2}>
                    <div className={c.field}><label className={c.lbl}>{cfg.budgetLabel}</label><select className={c.sel}>{cfg.budgets.map(b => <option key={b}>{b}</option>)}</select></div>
                    <div className={c.field}><label className={c.lbl}>{cfg.extraLabel}</label><select className={c.sel}>{cfg.extraOptions.map(o => <option key={o}>{o}</option>)}</select></div>
                </div>
            )}

            <div className={c.field}><label className={c.lbl}>Message</label><textarea className={c.tex} placeholder={cfg.messagePlaceholder} required /></div>

            <button className={c.btn} type="submit" disabled={sending}>
                {sending
                    ? <svg className="spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 12a9 9 0 1 1-9-9" /></svg>
                    : <><span>{cfg.ctaLabel}</span><ArrowRight /></>}
            </button>
        </form>
    );
}

function SuccessState({ mobile, intent }: { mobile?: boolean; intent: IntentKey }) {
    const cfg = INTENTS[intent];
    const p = mobile ? { ok: 'mob-ok', ico: 'mob-ok-ico', h: 'mob-ok-h', p: 'mob-ok-p' }
        : { ok: 'ct-ok', ico: 'ct-ok-ico', h: 'ct-ok-h', p: 'ct-ok-p' };
    return (
        <div className={p.ok}>
            <div className={p.ico}><CheckIcon /></div>
            <div className={p.h}>Request received!</div>
            <p className={p.p}>One of our agents will follow up on your <strong>{cfg.label.toLowerCase()}</strong> enquiry within 2 business hours.</p>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */
export default function ContactPage() {
    const heroRef = useRef<HTMLElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const agentsRef = useRef<HTMLDivElement>(null);
    const mobTopRef = useRef<HTMLDivElement>(null);
    const mobActRef = useRef<HTMLDivElement>(null);
    const mobPanRef = useRef<HTMLDivElement>(null);
    const rowRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const agentRefs = useRef<(HTMLDivElement | null)[]>([]);
    const progressRef = useRef<HTMLDivElement>(null);
    const heroTextRef = useRef<HTMLDivElement>(null);
    const heroPillsRef = useRef<HTMLDivElement>(null);
    const cardTitleRef = useRef<HTMLHeadingElement>(null);
    const formBoxRef = useRef<HTMLDivElement>(null);
    const agentsHRef = useRef<HTMLDivElement>(null);
    const hoursRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number>(0);
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorDotRef = useRef<HTMLDivElement>(null);

    const [dIntent, setDIntent] = useState<IntentKey>('Buy');
    const [dDone, setDDone] = useState(false);
    const [mIntent, setMIntent] = useState<IntentKey>('Buy');
    const [mDone, setMDone] = useState(false);

    useEffect(() => { setDDone(false); }, [dIntent]);
    useEffect(() => { setMDone(false); }, [mIntent]);

    useEffect(() => {
        /* ── 1. Initial entrance ── */
        const t0 = setTimeout(() => heroRef.current?.classList.add('go'), 80);
        const t1 = setTimeout(() => mobTopRef.current?.classList.add('go'), 90);
        const t2 = setTimeout(() => { mobActRef.current?.classList.add('go'); mobPanRef.current?.classList.add('go'); }, 220);

        /* ── 2. IntersectionObserver reveals ── */
        const obs = (el: Element | null, fn: () => void, thr = 0.08) => {
            if (!el) return null;
            const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { fn(); o.disconnect(); } }, { threshold: thr });
            o.observe(el); return o;
        };

        const o1 = obs(cardRef.current, () => {
            cardRef.current?.classList.add('go');
            rowRefs.current.forEach((el, i) => el && setTimeout(() => el.classList.add('in'), 120 + i * 80));
        });
        const o2 = obs(agentsRef.current, () => {
            agentsRef.current?.classList.add('go');
            agentRefs.current.forEach((el, i) => el && setTimeout(() => el.classList.add('in'), 80 + i * 90));
        });

        /* ── 3. Generic [data-reveal] elements ── */
        const revealEls = document.querySelectorAll<HTMLElement>('[data-reveal]');
        const revealObs = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    const el = e.target as HTMLElement;
                    const delay = parseFloat(el.dataset.delay ?? '0') * 1000;
                    setTimeout(() => el.classList.add('revealed'), delay);
                    revealObs.unobserve(el);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
        revealEls.forEach(el => revealObs.observe(el));

        /* ── 4. rAF scroll-driven transforms ── */
        let lastScroll = -1;
        const tick = () => {
            const sy = window.scrollY;
            if (sy !== lastScroll) {
                lastScroll = sy;
                const dh = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

                /* Scroll progress bar */
                if (progressRef.current) {
                    progressRef.current.style.transform = `scaleX(${Math.min(sy / dh, 1)})`;
                }

                /* Hero text parallax — drifts up & fades as you scroll away */
                if (heroTextRef.current) {
                    const p = Math.min(sy / window.innerHeight, 1);
                    const e = 1 - Math.pow(1 - p, 2);
                    heroTextRef.current.style.transform = `translateY(${e * 60}px)`;
                    heroTextRef.current.style.opacity = String(Math.max(1 - e * 1.5, 0));
                }
                /* Hero pills drift up faster */
                if (heroPillsRef.current) {
                    const p = Math.min(sy / window.innerHeight, 1);
                    heroPillsRef.current.style.transform = `translateY(${p * 36}px)`;
                    heroPillsRef.current.style.opacity = String(Math.max(1 - p * 1.8, 0));
                }

                /* Card title counter-parallax */
                if (cardTitleRef.current) {
                    const rect = cardTitleRef.current.getBoundingClientRect();
                    const raw = (rect.top + rect.height / 2 - window.innerHeight / 2) / (window.innerHeight / 2);
                    const clamped = Math.max(-1, Math.min(1, raw));
                    cardTitleRef.current.style.transform = `translateY(${clamped * 16}px)`;
                }

                /* Form box upward drift on entry */
                if (formBoxRef.current) {
                    const rect = formBoxRef.current.getBoundingClientRect();
                    const p = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight * 0.55)));
                    const e = 1 - Math.pow(1 - p, 3);
                    formBoxRef.current.style.transform = `translateY(${(1 - e) * 22}px)`;
                }

                /* Agents heading — slides in from left */
                if (agentsHRef.current) {
                    const rect = agentsHRef.current.getBoundingClientRect();
                    const p = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));
                    const e = 1 - Math.pow(1 - p, 2.5);
                    agentsHRef.current.style.transform = `translateX(${(1 - e) * -32}px)`;
                    agentsHRef.current.style.opacity = String(Math.min(e * 2, 1));
                }

                /* Hours — slides in from right */
                if (hoursRef.current) {
                    const rect = hoursRef.current.getBoundingClientRect();
                    const p = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight * 0.5)));
                    const e = 1 - Math.pow(1 - p, 2.5);
                    hoursRef.current.style.transform = `translateX(${(1 - e) * 28}px)`;
                    hoursRef.current.style.opacity = String(e);
                }
            }
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);

        /* ── 5. Magnetic cursor (desktop only) ── */
        let cx = window.innerWidth / 2, cy = window.innerHeight / 2;
        let rx = cx, ry = cy;
        let curAnimId: number;

        const onMove = (e: MouseEvent) => { cx = e.clientX; cy = e.clientY; };
        const lerpCursor = () => {
            rx += (cx - rx) * 0.11;
            ry += (cy - ry) * 0.11;
            if (cursorRef.current) cursorRef.current.style.transform = `translate(${rx - 16}px,${ry - 16}px)`;
            if (cursorDotRef.current) cursorDotRef.current.style.transform = `translate(${cx - 3}px,${cy - 3}px)`;
            curAnimId = requestAnimationFrame(lerpCursor);
        };
        curAnimId = requestAnimationFrame(lerpCursor);

        const onEnterMag = (e: Event) => {
            const el = e.currentTarget as HTMLElement;
            const rect = el.getBoundingClientRect();
            const elCx = rect.left + rect.width / 2;
            const elCy = rect.top + rect.height / 2;
            const dx = (cx - elCx) * 0.25;
            const dy = (cy - elCy) * 0.25;
            el.style.transform = `translate(${dx}px,${dy}px)`;
            cursorRef.current?.classList.add('hovered');
        };
        const onLeaveMag = (e: Event) => {
            (e.currentTarget as HTMLElement).style.transform = '';
            cursorRef.current?.classList.remove('hovered');
        };

        const magEls = document.querySelectorAll<HTMLElement>('a,button');
        magEls.forEach(el => {
            el.addEventListener('mouseenter', onEnterMag);
            el.addEventListener('mouseleave', onLeaveMag);
        });

        window.addEventListener('mousemove', onMove, { passive: true });

        return () => {
            clearTimeout(t0); clearTimeout(t1); clearTimeout(t2);
            o1?.disconnect(); o2?.disconnect();
            revealObs.disconnect();
            cancelAnimationFrame(rafRef.current);
            cancelAnimationFrame(curAnimId);
            window.removeEventListener('mousemove', onMove);
            magEls.forEach(el => {
                el.removeEventListener('mouseenter', onEnterMag);
                el.removeEventListener('mouseleave', onLeaveMag);
            });
        };
    }, []);

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: CSS }} />
            <Navbar />

            {/* Scroll progress bar */}
            <div ref={progressRef} className="scroll-bar" />

            {/* Magnetic cursor */}
            <div ref={cursorRef} className="mag-cursor" />
            <div ref={cursorDotRef} className="mag-dot" />

            {/* ══════════ DESKTOP ══════════ */}
            <div className="ct">
                <section className="ct-hero" ref={heroRef}>
                    <div className="ct-orb ct-orb-1" />
                    <div className="ct-orb ct-orb-2" />
                    <div className="ct-hero-inner">
                        <div className="ct-hero-left" ref={heroTextRef}>
                            <div className="ct-live"><div className="ct-live-dot" />Available now · Replies within 2 hours</div>
                            <h1 className="ct-h1">Let's talk<br /><em>property.</em></h1>
                            <p className="ct-sub">Licensed agents, no call centres. Every enquiry is handled personally from our Downtown Dubai office.</p>
                        </div>
                        <div className="ct-hero-channels" ref={heroPillsRef}>
                            {CHANNELS.map((c, i) => (
                                <a key={i} href={c.href} className="ct-channel-pill"
                                    target={c.href.startsWith('http') ? '_blank' : undefined}
                                    rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                >
                                    <div className="ct-channel-ico">{c.icon}</div>
                                    <div className="ct-channel-copy">
                                        <div className="ct-channel-lbl">{c.label}</div>
                                        <div className="ct-channel-val">{c.value}</div>
                                    </div>
                                    <div className="ct-channel-arr"><ChevRight /></div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="ct-card" ref={cardRef}>
                    <div className="ct-card-inner">
                        {/* Left */}
                        <div className="ct-info">
                            <div className="ct-info-top">
                                <div className="ct-eyebrow"><div className="ct-eyebrow-line" />Contact us</div>
                                <h2 className="ct-info-h2" ref={cardTitleRef}>We're here<br />for you.</h2>
                                <p className="ct-info-body">Every enquiry is handled personally by one of our licensed agents. No bots, no waiting — just real experts who know Dubai real estate.</p>
                            </div>

                            <div className="ct-rows">
                                {CHANNELS.map((c, i) => (
                                    <a key={i} href={c.href} className="ct-row"
                                        ref={el => { rowRefs.current[i] = el; }}
                                        target={c.href.startsWith('http') ? '_blank' : undefined}
                                        rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        style={{ transitionDelay: `${i * 0.07}s` }}
                                    >
                                        <div className="ct-row-ico">{c.icon}</div>
                                        <div className="ct-row-copy">
                                            <div className="ct-row-lbl">{c.label}</div>
                                            <div className="ct-row-val">{c.value}</div>
                                        </div>
                                        <div className="ct-row-arr"><ArrowRight /></div>
                                    </a>
                                ))}
                            </div>

                            <div className="ct-hours" ref={hoursRef} style={{ opacity: 0 }}>
                                <div className="ct-hours-ttl">Office Hours</div>
                                {HOURS.map((h, i) => (
                                    <div key={i} className="ct-hours-row" data-reveal data-delay={String(i * 0.09)}>
                                        <span className="ct-hours-day">{h.day}</span>
                                        <span className="ct-hours-time">{h.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right */}
                        <div className="ct-form-col">
                            <div className="ct-form-box" ref={formBoxRef}>
                                <div className="ct-intent-row">
                                    {INTENT_KEYS.map(k => (
                                        <button key={k} type="button"
                                            className={`ct-intent-btn${dIntent === k ? ' active' : ''}`}
                                            onClick={() => setDIntent(k)}
                                        >{k}</button>
                                    ))}
                                </div>
                                {dDone ? (
                                    <SuccessState intent={dIntent} />
                                ) : (
                                    <>
                                        <div className="ct-intent-head" key={dIntent + '-head'}>
                                            <div className="ct-intent-h">{INTENTS[dIntent].headline}</div>
                                            <div className="ct-intent-sub">{INTENTS[dIntent].sub}</div>
                                        </div>
                                        <SmartForm intent={dIntent} onSuccess={() => setDDone(true)} />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Agents */}
                    <div className="ct-agents" ref={agentsRef}>
                        <div className="ct-agents-h" ref={agentsHRef} style={{ opacity: 0 }}>Talk to the right person.</div>
                        <div className="ct-agents-grid">
                            {AGENTS.map((a, i) => (
                                <div key={i} className="ct-agent" ref={el => { agentRefs.current[i] = el; }} style={{ transitionDelay: `${i * 0.09}s` }}>
                                    <div className="ct-agent-img"><img src={a.img} alt={a.name} /></div>
                                    <div className="ct-agent-name">{a.name}</div>
                                    <div className="ct-agent-role">{a.role}</div>
                                    <a href="tel:+97141234567" className="ct-agent-cta">Call directly <ArrowRight /></a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <SiteFooter />
            </div>

            {/* ══════════ MOBILE ══════════ */}
            <div className="mob">
                <div className="mob-orb mob-orb-1" />
                <div className="mob-orb mob-orb-2" />

                <div className="mob-top" ref={mobTopRef}>
                    <div>
                        <div className="mob-brand">Al Areeq Real Estate</div>
                        <div className="mob-h1">Get in<br /><em>touch.</em></div>
                    </div>
                    <div className="mob-online">
                        <div className="mob-dot" />
                        <span className="mob-online-txt">Online now</span>
                    </div>
                </div>

                <div className="mob-acts" ref={mobActRef}>
                    {[
                        { l: 'Call', h: 'tel:+97141234567', i: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.4 12 19.79 19.79 0 0 1 1.21 3.18 2 2 0 0 1 3.22 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.09a16 16 0 0 0 6 6l.62-.62a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 16l.92.92z" /></svg> },
                        { l: 'WhatsApp', h: 'https://wa.me/971509876543', i: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413zM12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413A11.815 11.815 0 0012.05 0z" /></svg> },
                        { l: 'Email', h: 'mailto:hello@alareeq.ae', i: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg> },
                    ].map(({ l, h, i }) => (
                        <a key={l} href={h} className="mob-act"
                            target={h.startsWith('http') ? '_blank' : undefined}
                            rel={h.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                            <div className="mob-act-ico">{i}</div>
                            <span className="mob-act-lbl">{l}</span>
                        </a>
                    ))}
                </div>

                <div className="mob-panel" ref={mobPanRef}>
                    <div className="mob-intent-row">
                        {INTENT_KEYS.map(k => (
                            <button key={k} type="button"
                                className={`mob-intent-btn${mIntent === k ? ' active' : ''}`}
                                onClick={() => setMIntent(k)}
                            >{k}</button>
                        ))}
                    </div>

                    {mDone ? (
                        <SuccessState mobile intent={mIntent} />
                    ) : (
                        <>
                            <div className="mob-int-head" key={mIntent + '-mob-head'}>
                                <div className="mob-int-h">{INTENTS[mIntent].headline}</div>
                                <div className="mob-int-sub">{INTENTS[mIntent].sub}</div>
                            </div>
                            <SmartForm intent={mIntent} mobile onSuccess={() => setMDone(true)} />
                        </>
                    )}

                    <div className="mob-hr" />

                    <div className="mob-info-h">Other ways to reach us</div>
                    <div className="mob-info-list">
                        {CHANNELS.map((c, i) => (
                            <a key={i} href={c.href} className="mob-info-row"
                                target={c.href.startsWith('http') ? '_blank' : undefined}
                                rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            >
                                <div className="mob-info-ico">{c.icon}</div>
                                <div className="mob-info-copy">
                                    <div className="mob-info-lbl">{c.label}</div>
                                    <div className="mob-info-val">{c.value}</div>
                                </div>
                                <div className="mob-chev"><ChevRight /></div>
                            </a>
                        ))}
                    </div>

                    <div className="mob-hours">
                        <div className="mob-hours-lbl">Office hours</div>
                        {HOURS.map((h, i) => (
                            <div key={i} className="mob-hours-row">
                                <span className="mob-hours-day">{h.day}</span>
                                <span className="mob-hours-time">{h.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <SiteFooter />
            </div>
        </>
    );
}