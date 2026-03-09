'use client';
import React, { useState, useEffect, useRef } from 'react';

const IcHouse = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>;
const IcBuilding = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="18" rx="2" /><line x1="8" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="16" y2="21" /><line x1="2" y1="9" x2="22" y2="9" /><line x1="2" y1="15" x2="22" y2="15" /></svg>;
const IcStar = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>;
const IcCrane = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20" /><path d="M6 20V8l10-4" /><path d="M16 4v16" /><rect x="9" y="14" width="6" height="6" /></svg>;
const IcCalendar = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>;
const IcCalc = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" /><line x1="8" y1="6" x2="16" y2="6" /><line x1="8" y1="11" x2="10" y2="11" /><line x1="12" y1="11" x2="14" y2="11" /><line x1="16" y1="11" x2="16" y2="11" /><line x1="8" y1="15" x2="10" y2="15" /><line x1="12" y1="15" x2="14" y2="15" /><line x1="8" y1="19" x2="14" y2="19" /></svg>;
const IcTrend = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>;
const IcMap = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" /><line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" /></svg>;
const IcSearch = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>;
const IcHeart = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>;
const IcChevron = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>;
const IcClose = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>;
const IcArrow = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>;
const IcPhone = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>;
const IcMail = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>;
const IcGlobe = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>;

const NAV_ITEMS = [
    { label: 'Home', href: '/' },
    {
        label: 'Buy', mega: true,
        groups: [
            {
                heading: 'Property Types', links: [
                    { label: 'Houses for Sale', href: '#', Icon: IcHouse },
                    { label: 'Apartments', href: '#', Icon: IcBuilding },
                    { label: 'Luxury Homes', href: '#', Icon: IcStar },
                    { label: 'New Projects', href: '#', Icon: IcCrane },
                    { label: 'Open Houses', href: '#', Icon: IcCalendar },
                ]
            },
            {
                heading: 'Tools', links: [
                    { label: 'Mortgage Calculator', href: '#', Icon: IcCalc },
                    { label: 'Price Trends', href: '#', Icon: IcTrend },
                    { label: 'Neighborhood Guide', href: '#', Icon: IcMap },
                ]
            },
        ],
        featured: { label: 'New Launches', sub: 'Discover premium projects before they sell out.', href: '#', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=360&q=80' },
    },
    { label: 'Rent', dropdown: [{ label: 'Houses for Rent', href: '#' }, { label: 'Apartments for Rent', href: '#' }, { label: 'Commercial Rentals', href: '#' }] },
    { label: 'Sell', dropdown: [{ label: 'Sell Your Property', href: '#' }, { label: 'Free Property Valuation', href: '#' }, { label: 'Seller Guide', href: '#' }] },
    { label: 'Projects', dropdown: [{ label: 'New Launches', href: '#' }, { label: 'Upcoming Projects', href: '#' }, { label: 'Investment Opportunities', href: '#' }] },
    { label: 'Agents', dropdown: [{ label: 'Meet the Team', href: '#' }, { label: 'Agent Profiles', href: '#' }, { label: 'Become an Agent', href: '#' }] },
    { label: 'About', href: '/about', dropdown: [{ label: 'Company Overview', href: '/about#au-intro' }, { label: 'Mission & Vision', href: '/about#au-values' }, { label: 'Meet the Team', href: '/about#au-team' }, { label: 'Testimonials', href: '/about#au-testimonials' }] },
    { label: 'Blog', href: '/Blog', dropdown: [{ label: 'Market Trends', href: '/Blog' }, { label: 'Investment Tips', href: '/Blog' }, { label: 'News & Updates', href: '/Blog' }] },
    { label: 'Contact', href: '/contact' },
];

export const NAVBAR_HEIGHT_DESKTOP = 102;
export const NAVBAR_HEIGHT_MOBILE = 64;

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
    const [searchOpen, setSearchOpen] = useState(false);
    const [savedCount] = useState(3);
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(e.target as Node)) setSearchOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
        :root {
          --g50:#fafafa; --g100:#f4f4f5; --g200:#e4e4e7; --g300:#d4d4d8; --g400:#a1a1aa;
          --g500:#71717a; --g600:#52525b; --g700:#3f3f46; --g800:#27272a; --g900:#18181b;
          --nv-utility-h: 32px;
          --nv-main-h: 70px;
          --nv-total-h: 102px;
          --nv-mobile-h: 64px;
        }
        .nv { position:fixed; top:0; left:0; right:0; z-index:1000; font-family:'Inter',sans-serif; }
        .nv.scrolled .nv-utility { display:none; }
        .nv.scrolled .nv-main { background:rgba(255,255,255,0.98); backdrop-filter:blur(16px); box-shadow:0 1px 0 var(--g200),0 4px 24px rgba(0,0,0,0.05); height:60px; }
        .nv-utility { display:flex; justify-content:flex-end; align-items:center; gap:1.25rem; padding:0.4rem 6%; background:var(--g900); height:var(--nv-utility-h); }
        .nv-util-link { display:inline-flex; align-items:center; gap:0.4rem; font-size:0.74rem; font-weight:500; color:rgba(255,255,255,0.55); text-decoration:none; transition:color 0.18s; }
        .nv-util-link:hover { color:#fff; }
        .nv-util-sep { width:1px; height:12px; background:rgba(255,255,255,0.14); }
        .nv-util-lang { display:inline-flex; align-items:center; gap:0.35rem; font-size:0.74rem; color:rgba(255,255,255,0.55); background:none; border:none; font-family:'Inter',sans-serif; cursor:pointer; transition:color 0.18s; padding:0; }
        .nv-util-lang:hover { color:#fff; }
        .nv-main { display:flex; align-items:center; justify-content:space-between; padding:0 6%; height:var(--nv-main-h); background:#fff; transition:height 0.3s,background 0.3s,box-shadow 0.3s; gap:1rem; }
        .nv-logo { display:flex; flex-direction:column; text-decoration:none; flex-shrink:0; gap:6px; }
        .nv-logo-name { font-family:'Outfit',sans-serif; font-size:1.3rem; font-weight:800; color:var(--g900); letter-spacing:-0.03em; line-height:1; transition:color 0.18s; }
        .nv-logo-tag { font-size:0.59rem; font-weight:600; letter-spacing:0.14em; color:var(--g400); text-transform:uppercase; line-height:1; }
        .nv-logo:hover .nv-logo-name { color:var(--g700); }
        .nv-links { display:flex; align-items:center; list-style:none; margin:0; padding:0; flex:1; justify-content:center; }
        .nv-item { position:relative; }
        .nv-item::after { content:''; position:absolute; bottom:-14px; left:-20px; right:-20px; height:14px; }
        .nv-btn { display:inline-flex; align-items:center; gap:0.25rem; padding:0.45rem 0.6rem; border:none; background:none; cursor:pointer; font-family:'Inter',sans-serif; font-size:0.8rem; font-weight:500; color:var(--g600); border-radius:8px; transition:color 0.15s,background 0.15s; white-space:nowrap; text-decoration:none; }
        .nv-btn:hover { color:var(--g900); background:var(--g100); }
        .nv-btn.active { color:var(--g900); font-weight:700; }
        .nv-chev { transition:transform 0.22s ease; flex-shrink:0; display:flex; align-items:center; }
        .nv-item:hover .nv-chev { transform:rotate(180deg); }
        .nv-dd { position:absolute; top:calc(100% + 14px); left:50%; transform:translateX(-50%) translateY(4px); background:#fff; border:1px solid var(--g200); border-radius:14px; padding:0.4rem; box-shadow:0 16px 48px rgba(0,0,0,0.09),0 4px 14px rgba(0,0,0,0.04); min-width:210px; z-index:200; opacity:0; pointer-events:none; transition:opacity 0.15s,transform 0.15s; }
        .nv-item:hover .nv-dd { opacity:1; pointer-events:auto; transform:translateX(-50%) translateY(0); }
        .nv-dd-link { display:block; padding:0.575rem 0.8rem; border-radius:8px; text-decoration:none; font-size:0.825rem; font-weight:500; color:var(--g700); transition:background 0.12s,color 0.12s; white-space:nowrap; }
        .nv-dd-link:hover { background:var(--g50); color:var(--g900); }
        .nv-mega { position:absolute; top:calc(100% + 14px); left:50%; transform:translateX(-50%) translateY(4px); background:#fff; border:1px solid var(--g200); border-radius:18px; padding:1.375rem; box-shadow:0 20px 64px rgba(0,0,0,0.09),0 4px 18px rgba(0,0,0,0.04); width:660px; display:grid; grid-template-columns:1fr 1fr 1.05fr; gap:1.375rem; z-index:200; opacity:0; pointer-events:none; transition:opacity 0.15s,transform 0.15s; }
        .nv-item:hover .nv-mega { opacity:1; pointer-events:auto; transform:translateX(-50%) translateY(0); }
        .mega-head { font-size:0.64rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:var(--g400); margin-bottom:0.5rem; padding:0 0.5rem; }
        .mega-link { display:flex; align-items:center; gap:0.6rem; padding:0.45rem 0.6rem; border-radius:8px; text-decoration:none; font-size:0.8125rem; font-weight:500; color:var(--g700); transition:background 0.12s,color 0.12s; }
        .mega-link:hover { background:var(--g50); color:var(--g900); }
        .mega-ic { width:28px; height:28px; border-radius:7px; background:var(--g100); display:flex; align-items:center; justify-content:center; color:var(--g600); flex-shrink:0; transition:background 0.18s,color 0.18s; }
        .mega-link:hover .mega-ic { background:var(--g900); color:#fff; }
        .mega-feat { border-radius:12px; overflow:hidden; border:1px solid var(--g100); display:flex; flex-direction:column; text-decoration:none; transition:box-shadow 0.18s,transform 0.18s; }
        .mega-feat:hover { box-shadow:0 8px 28px rgba(0,0,0,0.11); transform:translateY(-2px); }
        .mega-feat-img { width:100%; height:118px; object-fit:cover; }
        .mega-feat-body { padding:0.875rem; background:var(--g900); flex:1; }
        .mega-feat-eye { font-size:0.6rem; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:rgba(255,255,255,0.35); margin-bottom:0.2rem; }
        .mega-feat-title { font-family:'Outfit',sans-serif; font-size:0.9rem; font-weight:700; color:#fff; letter-spacing:-0.02em; margin-bottom:0.3rem; line-height:1.3; }
        .mega-feat-sub { font-size:0.72rem; color:rgba(255,255,255,0.46); line-height:1.45; }
        .mega-feat-cta { display:inline-flex; align-items:center; gap:0.35rem; margin-top:0.6rem; font-size:0.72rem; font-weight:700; color:rgba(255,255,255,0.6); transition:color 0.15s; }
        .mega-feat:hover .mega-feat-cta { color:#fff; }
        .nv-right { display:flex; align-items:center; gap:0.375rem; flex-shrink:0; }
        .nv-icon { position:relative; width:36px; height:36px; border:none; background:none; border-radius:9px; display:flex; align-items:center; justify-content:center; cursor:pointer; color:var(--g600); transition:background 0.15s,color 0.15s; }
        .nv-icon:hover { background:var(--g100); color:var(--g900); }
        .nv-badge { position:absolute; top:3px; right:3px; width:15px; height:15px; background:#ef4444; border-radius:50%; border:2px solid #fff; font-size:0.5rem; font-weight:800; color:#fff; display:flex; align-items:center; justify-content:center; }
        .nv-btn-out { padding:0.44rem 0.9rem; border:1.5px solid var(--g200); border-radius:9px; background:none; font-family:'Inter',sans-serif; font-size:0.8rem; font-weight:600; color:var(--g700); cursor:pointer; transition:all 0.15s; white-space:nowrap; }
        .nv-btn-out:hover { border-color:var(--g700); color:var(--g900); background:var(--g50); }
        .nv-btn-prim { padding:0.44rem 1rem; border:none; border-radius:9px; background:linear-gradient(135deg,#18181b,#27272a); font-family:'Inter',sans-serif; font-size:0.8rem; font-weight:700; color:#fff; cursor:pointer; white-space:nowrap; box-shadow:0 2px 8px rgba(0,0,0,0.18); transition:all 0.22s; position:relative; overflow:hidden; }
        .nv-btn-prim::before { content:''; position:absolute; inset:0; background:rgba(255,255,255,0); transition:background 0.18s; }
        .nv-btn-prim:hover::before { background:rgba(255,255,255,0.08); }
        .nv-btn-prim:hover { transform:translateY(-1px); box-shadow:0 5px 16px rgba(0,0,0,0.26); }
        .nv-sw { position:relative; }
        .nv-sp { position:absolute; top:calc(100% + 10px); right:0; background:#fff; border:1px solid var(--g200); border-radius:14px; padding:0.875rem; box-shadow:0 16px 48px rgba(0,0,0,0.1); width:500px; display:grid; grid-template-columns:1fr 1fr 1fr auto; gap:0.5rem; align-items:stretch; opacity:0; pointer-events:none; transform:translateY(6px); transition:opacity 0.15s,transform 0.15s; z-index:200; }
        .nv-sp.open { opacity:1; pointer-events:auto; transform:translateY(0); }
        .sf { display:flex; flex-direction:column; gap:2px; padding:0.45rem 0.7rem; background:var(--g50); border-radius:8px; border:1.5px solid transparent; transition:border-color 0.15s,background 0.15s; }
        .sf:focus-within { border-color:var(--g900); background:#fff; }
        .sf-label { font-size:0.59rem; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:var(--g400); }
        .sf select,.sf input { border:none; background:transparent; font-size:0.8rem; color:var(--g900); font-weight:500; font-family:'Inter',sans-serif; outline:none; width:100%; -webkit-appearance:none; appearance:none; }
        .sf input::placeholder { color:var(--g400); }
        .sg { padding:0 0.9rem; background:var(--g900); border:none; border-radius:8px; color:#fff; cursor:pointer; display:flex; align-items:center; gap:0.375rem; font-size:0.8rem; font-weight:700; font-family:'Inter',sans-serif; transition:background 0.15s; white-space:nowrap; }
        .sg:hover { background:var(--g700); }
        .sg svg { width:13px; height:13px; stroke:#fff; stroke-width:2.5; fill:none; }
        .nv-ham { display:none; flex-direction:column; justify-content:center; align-items:center; gap:5px; width:38px; height:38px; border:none; background:none; cursor:pointer; border-radius:9px; transition:background 0.15s; padding:0; flex-shrink:0; }
        .nv-ham:hover { background:var(--g100); }
        .ham-l { width:20px; height:2px; background:var(--g900); border-radius:2px; transition:transform 0.28s,opacity 0.28s,width 0.28s; transform-origin:center; }
        .nv-ham.open .ham-l:nth-child(1) { transform:translateY(7px) rotate(45deg); }
        .nv-ham.open .ham-l:nth-child(2) { opacity:0; width:0; }
        .nv-ham.open .ham-l:nth-child(3) { transform:translateY(-7px) rotate(-45deg); }
        .nv-ov { display:none; position:fixed; inset:0; background:rgba(0,0,0,0.42); backdrop-filter:blur(4px); z-index:998; opacity:0; pointer-events:none; transition:opacity 0.28s; }
        .nv-ov.open { opacity:1; pointer-events:auto; }
        .nv-dr { position:fixed; top:0; right:-100%; width:min(320px,88vw); height:100vh; background:#fff; z-index:999; overflow-y:auto; transition:right 0.32s cubic-bezier(0.4,0,0.2,1); display:flex; flex-direction:column; box-shadow:-16px 0 48px rgba(0,0,0,0.1); }
        .nv-dr.open { right:0; }
        .mob-hd { display:flex; align-items:center; justify-content:space-between; padding:1.125rem 1.25rem; border-bottom:1px solid var(--g100); position:sticky; top:0; background:#fff; z-index:1; }
        .mob-hd-tag { font-size:0.68rem; font-weight:700; letter-spacing:0.13em; text-transform:uppercase; color:var(--g400); }
        .mob-cl { width:34px; height:34px; border:none; background:var(--g100); border-radius:8px; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:background 0.15s; }
        .mob-cl:hover { background:var(--g200); }
        .mob-srch { margin:0.875rem 1.25rem; display:flex; align-items:center; gap:0.5rem; background:var(--g50); border:1.5px solid var(--g200); border-radius:9px; padding:0.6rem 0.875rem; }
        .mob-srch input { border:none; background:none; font-size:0.875rem; color:var(--g900); font-family:'Inter',sans-serif; outline:none; width:100%; }
        .mob-srch input::placeholder { color:var(--g400); }
        .mob-utils { display:flex; justify-content:center; gap:1.25rem; padding:0.625rem 1.25rem; border-bottom:1px solid var(--g100); }
        .mob-ua { font-size:0.8rem; font-weight:500; color:var(--g500); text-decoration:none; transition:color 0.15s; }
        .mob-ua:hover { color:var(--g900); }
        .mob-list { list-style:none; padding:0.375rem 0; flex:1; }
        .mob-li { border-bottom:1px solid var(--g50); }
        .mob-lbtn { width:100%; display:flex; align-items:center; justify-content:space-between; padding:0.8rem 1.25rem; border:none; background:none; cursor:pointer; font-family:'Inter',sans-serif; font-size:0.9rem; font-weight:600; color:var(--g800); text-align:left; text-decoration:none; transition:background 0.12s; }
        .mob-lbtn:hover { background:var(--g50); }
        .mob-lbtn .mc { transition:transform 0.22s; display:flex; }
        .mob-lbtn.exp .mc { transform:rotate(180deg); }
        .mob-sub { max-height:0; overflow:hidden; transition:max-height 0.32s cubic-bezier(0.4,0,0.2,1); background:var(--g50); }
        .mob-sub.open { max-height:480px; }
        .mob-sa { display:block; padding:0.625rem 1.25rem 0.625rem 1.875rem; text-decoration:none; font-size:0.85rem; font-weight:500; color:var(--g600); border-bottom:1px solid var(--g100); transition:color 0.12s,background 0.12s; }
        .mob-sa:last-child { border-bottom:none; }
        .mob-sa:hover { color:var(--g900); background:var(--g100); }
        .mob-ft { padding:1.125rem 1.25rem; border-top:1px solid var(--g100); display:flex; flex-direction:column; gap:0.5rem; position:sticky; bottom:0; background:#fff; }
        .mob-cp { width:100%; padding:0.8rem; background:var(--g900); border:none; border-radius:10px; font-family:'Inter',sans-serif; font-size:0.9rem; font-weight:700; color:#fff; cursor:pointer; transition:background 0.15s; }
        .mob-cp:hover { background:var(--g700); }
        .mob-cs { width:100%; padding:0.8rem; background:none; border:1.5px solid var(--g200); border-radius:10px; font-family:'Inter',sans-serif; font-size:0.9rem; font-weight:600; color:var(--g700); cursor:pointer; transition:all 0.15s; }
        .mob-cs:hover { border-color:var(--g900); color:var(--g900); }
        /* Blog active state */
        .nv-btn[href="/Blog"] { position:relative; }
        .nv-btn[href="/Blog"]::after { content:''; position:absolute; bottom:-2px; left:50%; transform:translateX(-50%); width:18px; height:2px; background:var(--g900); border-radius:2px; opacity:0; transition:opacity 0.2s; }
        .nv-btn[href="/Blog"]:hover::after { opacity:1; }
        @media (max-width:1120px) { .nv-btn-out { display:none; } }
        @media (max-width:980px) {
          .nv-links { display:none; }
          .nv-ham { display:flex; }
          .nv-ov { display:block; }
          .nv-sw { display:none; }
          .nv-btn-prim { display:none; }
          .nv-main { height:var(--nv-mobile-h); }
          .nv-utility { display:none !important; }
        }
        @media (max-width:480px) { .nv-main,.nv-utility { padding-left:4%; padding-right:4%; } }
      `}</style>

            <div className={`nv ${isScrolled ? 'scrolled' : ''}`} ref={navRef}>
                {!isScrolled && (
                    <div className="nv-utility">
                        <a href="tel:+97141234567" className="nv-util-link"><IcPhone /> +971 4 123 4567</a>
                        <div className="nv-util-sep" />
                        <a href="mailto:info@alareeq.com" className="nv-util-link"><IcMail /> info@alareeq.com</a>
                        <div className="nv-util-sep" />
                        <button className="nv-util-lang"><IcGlobe /> EN <IcChevron /></button>
                    </div>
                )}
                <div className="nv-main">
                    <a href="/" className="nv-logo">
                        <span className="nv-logo-name">Al Areeq</span>
                        <span className="nv-logo-tag">Luxury Real Estate</span>
                    </a>
                    <ul className="nv-links">
                        {NAV_ITEMS.map((item) => {
                            const hasChildren = item.dropdown || item.mega;
                            return (
                                <li key={item.label} className="nv-item">
                                    {item.href ? (
                                        <a href={item.href} className="nv-btn">
                                            {item.label}
                                            {hasChildren && <span className="nv-chev"><IcChevron /></span>}
                                        </a>
                                    ) : (
                                        <button className="nv-btn">
                                            {item.label}
                                            {hasChildren && <span className="nv-chev"><IcChevron /></span>}
                                        </button>
                                    )}
                                    {item.dropdown && (
                                        <div className="nv-dd">
                                            {item.dropdown.map(link => (
                                                <a key={link.label} href={link.href} className="nv-dd-link">{link.label}</a>
                                            ))}
                                        </div>
                                    )}
                                    {item.mega && (
                                        <div className="nv-mega">
                                            {item.groups.map(group => (
                                                <div key={group.heading}>
                                                    <div className="mega-head">{group.heading}</div>
                                                    {group.links.map(({ label, href, Icon }) => (
                                                        <a key={label} href={href} className="mega-link">
                                                            <span className="mega-ic"><Icon /></span>
                                                            {label}
                                                        </a>
                                                    ))}
                                                </div>
                                            ))}
                                            {item.featured && (
                                                <a href={item.featured.href} className="mega-feat">
                                                    <img src={item.featured.img} alt={item.featured.label} className="mega-feat-img" />
                                                    <div className="mega-feat-body">
                                                        <div className="mega-feat-eye">Featured</div>
                                                        <div className="mega-feat-title">{item.featured.label}</div>
                                                        <div className="mega-feat-sub">{item.featured.sub}</div>
                                                        <div className="mega-feat-cta">View All <IcArrow /></div>
                                                    </div>
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                    <div className="nv-right">
                        <div className="nv-sw">
                            <button className="nv-icon" onClick={() => setSearchOpen(o => !o)} aria-label="Search"><IcSearch /></button>
                            <div className={`nv-sp ${searchOpen ? 'open' : ''}`}>
                                <div className="sf"><span className="sf-label">Location</span><input placeholder="City or area..." /></div>
                                <div className="sf"><span className="sf-label">Type</span><select><option>Any Type</option><option>Apartment</option><option>Villa</option><option>Penthouse</option></select></div>
                                <div className="sf"><span className="sf-label">Price</span><select><option>Any Price</option><option>Under $500K</option><option>$500K-$1M</option><option>$1M-$3M</option><option>$3M+</option></select></div>
                                <button className="sg"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>Go</button>
                            </div>
                        </div>
                        <button className="nv-icon" aria-label="Saved">
                            <IcHeart />
                            {savedCount > 0 && <span className="nv-badge">{savedCount}</span>}
                        </button>
                        <button className="nv-btn-out">Log In</button>
                        <button className="nv-btn-prim">List Property</button>
                        <button className={`nv-ham ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(o => !o)} aria-label="Menu">
                            <span className="ham-l" /><span className="ham-l" /><span className="ham-l" />
                        </button>
                    </div>
                </div>
            </div>

            <div className={`nv-ov ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(false)} />

            <div className={`nv-dr ${mobileOpen ? 'open' : ''}`}>
                <div className="mob-hd">
                    <span className="mob-hd-tag">Luxury Real Estate</span>
                    <button className="mob-cl" onClick={() => setMobileOpen(false)} aria-label="Close"><IcClose /></button>
                </div>
                <div className="mob-srch"><IcSearch /><input placeholder="Search properties..." /></div>
                <div className="mob-utils">
                    <a href="#" className="mob-ua">Log In</a>
                    <a href="#" className="mob-ua">Sign Up</a>
                    <a href="#" className="mob-ua">EN / AR</a>
                </div>
                <ul className="mob-list">
                    {NAV_ITEMS.map((item) => {
                        const allLinks = item.mega ? item.groups.flatMap(g => g.links) : (item.dropdown || []);
                        const hasSub = allLinks.length > 0;
                        const isExp = mobileExpanded === item.label;
                        return (
                            <li key={item.label} className="mob-li">
                                {hasSub ? (
                                    <>
                                        <button className={`mob-lbtn ${isExp ? 'exp' : ''}`} onClick={() => setMobileExpanded(isExp ? null : item.label)}>
                                            {item.label}
                                            <span className="mc"><IcChevron /></span>
                                        </button>
                                        <div className={`mob-sub ${isExp ? 'open' : ''}`}>
                                            {allLinks.map(link => <a key={link.label} href={link.href} className="mob-sa">{link.label}</a>)}
                                        </div>
                                    </>
                                ) : (
                                    <a href={item.href} className="mob-lbtn">{item.label}</a>
                                )}
                            </li>
                        );
                    })}
                </ul>
                <div className="mob-ft">
                    <button className="mob-cp">List Your Property</button>
                    <button className="mob-cs">Book a Viewing</button>
                </div>
            </div>
        </>
    );
};

export default Navbar;