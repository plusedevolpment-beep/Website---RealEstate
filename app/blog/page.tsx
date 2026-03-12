'use client';
// ─────────────────────────────────────────────────────────────────────────────
//  app/blog/page.tsx  —  Blog Listing Page
//
//  FILE LOCATION:  app/blog/page.tsx
//  NAVBAR IMPORT:  adjust path to wherever your Navbar lives
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import {
    getAllPosts, getPostBySlug, getRelatedPosts,
    formatDate, CAT_COLORS, type Post,
} from './blogData';

const categories = ['All', 'Buying Guide', 'Market Insights', 'Investment', 'Renting', 'Neighbourhood', 'Legal & Finance'];

// ─── Shared CSS ───────────────────────────────────────────────────────────────
const SHARED_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap');
  :root {
    --g50:#fafafa;--g100:#f4f4f5;--g200:#e4e4e7;--g300:#d4d4d8;
    --g400:#a1a1aa;--g500:#71717a;--g600:#52525b;--g700:#3f3f46;
    --g800:#27272a;--g900:#18181b;
  }
  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior:smooth; }
  body {
    font-family:'Inter',-apple-system,sans-serif;
    background:#fff; color:var(--g900);
    -webkit-font-smoothing:antialiased; overflow-x:hidden;
  }
  /* ── Footer ── */
  .footer-clean { background:#111; color:#fff; padding:4rem 6% 2rem; }
  .footer-cta {
    display:flex; justify-content:space-between; align-items:center;
    margin-bottom:3rem; padding-bottom:2rem;
    border-bottom:1px solid rgba(255,255,255,.08);
    flex-wrap:wrap; gap:1.5rem;
  }
  .footer-cta h2 {
    font-family:'Outfit',sans-serif; font-size:1.6rem; font-weight:700; letter-spacing:-.02em;
  }
  .footer-cta-buttons { display:flex; gap:1rem; }
  .btn-footer-primary {
    background:#fff; color:#111; padding:.7rem 1.4rem; border-radius:8px;
    font-weight:700; text-decoration:none; font-size:.9rem;
    font-family:'Inter',sans-serif; transition:opacity .2s;
  }
  .btn-footer-primary:hover { opacity:.88; }
  .btn-outline {
    border:1px solid rgba(255,255,255,.3); padding:.7rem 1.4rem; border-radius:8px;
    color:#fff; text-decoration:none; font-size:.9rem;
    font-family:'Inter',sans-serif; transition:border-color .2s;
  }
  .btn-outline:hover { border-color:rgba(255,255,255,.65); }
  .footer-main {
    display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:3rem; margin-bottom:2.5rem;
  }
  .footer-brand h3 {
    font-family:'Outfit',sans-serif; font-size:1.3rem;
    font-weight:800; margin-bottom:1rem; letter-spacing:-.02em;
  }
  .footer-brand p { color:rgba(255,255,255,.45); font-size:.9rem; line-height:1.65; max-width:300px; }
  .footer-main h4 {
    font-size:.82rem; margin-bottom:1rem; color:rgba(255,255,255,.55);
    text-transform:uppercase; letter-spacing:.1em; font-weight:700;
  }
  .footer-main ul { list-style:none; padding:0; }
  .footer-main ul li { margin-bottom:.6rem; }
  .footer-main ul li a { color:rgba(255,255,255,.45); text-decoration:none; font-size:.9rem; transition:color .18s; }
  .footer-main ul li a:hover { color:#fff; }
  .footer-bottom {
    border-top:1px solid rgba(255,255,255,.08); padding-top:1.5rem;
    display:flex; justify-content:space-between; flex-wrap:wrap; gap:1rem;
  }
  .footer-bottom p, .footer-legal a { font-size:.8rem; color:rgba(255,255,255,.35); text-decoration:none; }
  .footer-legal a:hover { color:rgba(255,255,255,.65); }
  .footer-legal { display:flex; gap:1.5rem; }
  @media(max-width:768px) {
    .footer-clean { padding:3rem 5% 2rem; text-align:center; }
    .footer-cta { flex-direction:column; align-items:center; }
    .footer-main { grid-template-columns:1fr; gap:2rem; text-align:center; }
    .footer-bottom { flex-direction:column; align-items:center; }
    .footer-legal { justify-content:center; }
    .footer-brand p { margin:0 auto; }
  }
`;

// ─── InView hook ──────────────────────────────────────────────────────────────
function useInView(ref: React.RefObject<Element>, threshold = 0.12) {
    const [v, setV] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return v;
}

// ─── Animated post card ───────────────────────────────────────────────────────
function PostCard({ p, delay, onOpen }: { p: Post; delay: number; onOpen: (p: Post) => void }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref as React.RefObject<Element>);
    return (
        <div
            ref={ref}
            className="bp-card"
            onClick={() => onOpen(p)}
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(28px)',
                transition: `opacity .6s cubic-bezier(.16,1,.3,1) ${delay}s,
                     transform .6s cubic-bezier(.16,1,.3,1) ${delay}s`,
            }}
        >
            <div className="bp-card-img-wrap">
                <img src={p.coverImage} alt={p.title} className="bp-card-img" loading="lazy" />
            </div>
            <div className="bp-card-body">
                <div className="bp-card-cat" style={{ color: CAT_COLORS[p.category] }}>{p.category}</div>
                <div className="bp-card-title">{p.title}</div>
                <div className="bp-card-excerpt">{p.excerpt}</div>
                <div className="bp-card-meta">
                    <img src={p.author.avatar} alt={p.author.name} className="bp-card-av" />
                    <span className="bp-card-meta-txt">
                        <strong>{p.author.name}</strong> · {p.readTime} read
                    </span>
                </div>
            </div>
        </div>
    );
}

// SVG icons for stat cards — no emojis
const StatIcons: Record<string, JSX.Element> = {
    clock: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>,
    list: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M9 6h10M9 12h10M9 18h10M5 6h.01M5 12h.01M5 18h.01" /></svg>,
    percent: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M19 5L5 19" /><circle cx="6.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" /></svg>,
    trending: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M22 7l-8.5 8.5-5-5L2 17" /><path d="M16 7h6v6" /></svg>,
    building: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 9h6M9 13h6M9 17h6" /></svg>,
    globe: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>,
    chart: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M18 20V10M12 20V4M6 20v-6" /></svg>,
    key: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="7.5" cy="15.5" r="5.5" /><path d="M21 2l-9.6 9.6M15.5 7.5l3 3" /></svg>,
    flash: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>,
    home: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
    school: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 2 6 3 6 3s6-1 6-3v-5" /></svg>,
    leaf: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M17 8C8 10 5.9 16.17 3.82 19.34c.93.24 1.94.42 3 .5C10 20 13 19 14 16c0 0 2 5 6 5-1-5 1-10-3-13z" /></svg>,
    car: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M5 17H3a2 2 0 0 1-2-2V9l3-4h12l3 4v6a2 2 0 0 1-2 2h-2" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /></svg>,
    doc: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="15" y2="17" /></svg>,
    bank: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 10v11M12 10v11M16 10v11" /></svg>,
};

const POST_STATS: Record<string, { iconKey: string; label: string; value: string }[]> = {
    'Buying Guide': [{ iconKey: 'clock', label: 'Avg. Time to Buy', value: '60–90 days' }, { iconKey: 'list', label: 'Key Steps', value: '5 stages' }, { iconKey: 'percent', label: 'Extra Budget', value: '6–8% on top' }],
    'Market Insights': [{ iconKey: 'trending', label: 'YoY Price Growth', value: '+8.4%' }, { iconKey: 'building', label: 'Q1 Transactions', value: '12,400+' }, { iconKey: 'globe', label: 'Foreign Buyers', value: '42% share' }],
    'Investment': [{ iconKey: 'chart', label: 'Avg. Gross Yield', value: '6–8%' }, { iconKey: 'clock', label: 'Typical Horizon', value: '5–10 yrs' }, { iconKey: 'bank', label: 'Min. Deposit', value: '20–25%' }],
    'Renting': [{ iconKey: 'chart', label: 'Price-Rent Ratio', value: '~18x' }, { iconKey: 'key', label: 'Avg. Tenancy', value: '1–2 years' }, { iconKey: 'flash', label: 'Flexibility', value: 'High' }],
    'Neighbourhood': [{ iconKey: 'school', label: 'Nearby Schools', value: '12 rated' }, { iconKey: 'leaf', label: 'Green Space', value: 'Abundant' }, { iconKey: 'car', label: 'Avg. Commute', value: '18 min' }],
    'Legal & Finance': [{ iconKey: 'doc', label: 'Registration Fee', value: '2–4%' }, { iconKey: 'percent', label: 'Agent Commission', value: '2%' }, { iconKey: 'bank', label: 'Mortgage Fee', value: '~1%' }],
};

// ─────────────────────────────────────────────────────────────────────────────
//  POST DETAIL OVERLAY
// ─────────────────────────────────────────────────────────────────────────────
function PostDetail({ post, onClose, onOpenRelated }: { post: Post; onClose: () => void; onOpenRelated: (p: Post) => void }) {
    const related = getRelatedPosts(post.slug, post.category);
    const stats = POST_STATS[post.category] ?? [];
    const catColor = CAT_COLORS[post.category] ?? '#0369a1';

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
        <>
            <style>{`
        @keyframes pd-in   { from{opacity:0} to{opacity:1} }
        @keyframes pd-rise { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }

        /* Backdrop */
        .pd-backdrop {
          position:fixed; inset:0; z-index:2000;
          background:rgba(9,9,11,.65); backdrop-filter:blur(10px);
          animation:pd-in .25s ease both;
          overflow-y:auto; padding:40px 20px 72px;
        }
        .pd-backdrop::-webkit-scrollbar { width:4px; }
        .pd-backdrop::-webkit-scrollbar-thumb { background:rgba(255,255,255,.12); border-radius:2px; }

        /* Sheet */
        .pd-sheet {
          max-width:800px; margin:0 auto;
          background:#fff; border-radius:24px; overflow:hidden;
          box-shadow:0 40px 100px rgba(0,0,0,.45);
          animation:pd-rise .4s cubic-bezier(.16,1,.3,1) both;
        }

        /* ── Cover ── */
        .pd-cover {
          position:relative; width:100%; height:400px;
          overflow:hidden; background:var(--g200);
          flex-shrink:0;
        }
        .pd-cover-img {
          width:100%; height:100%; object-fit:cover; display:block;
        }
        .pd-cover-gradient {
          position:absolute; inset:0;
          background:linear-gradient(
            to top,
            rgba(0,0,0,.85) 0%,
            rgba(0,0,0,.3)  50%,
            transparent     100%
          );
        }
        .pd-close {
          position:absolute; top:16px; right:16px; z-index:10;
          width:36px; height:36px; border-radius:50%;
          background:rgba(255,255,255,.92); border:none; cursor:pointer;
          display:flex; align-items:center; justify-content:center;
          box-shadow:0 2px 16px rgba(0,0,0,.22);
          transition:transform .18s, background .18s;
        }
        .pd-close:hover { transform:scale(1.1); background:#fff; }
        .pd-cover-content {
          position:absolute; bottom:0; left:0; right:0;
          padding:24px 28px 28px;
        }
        .pd-cat-pill {
          display:inline-block; padding:4px 12px; border-radius:999px;
          font-size:.6rem; font-weight:700; letter-spacing:.1em;
          text-transform:uppercase; color:#fff;
          border:1px solid rgba(255,255,255,.3);
          margin-bottom:10px;
        }
        .pd-cover-title {
          font-family:'Outfit',sans-serif;
          font-size:clamp(1.45rem,3vw,2.1rem);
          font-weight:900; line-height:1.18; letter-spacing:-.035em;
          color:#fff; margin-bottom:16px;
        }
        .pd-byline {
          display:flex; align-items:center; gap:10px;
        }
        .pd-byline-av {
          width:30px; height:30px; border-radius:50%; object-fit:cover;
          border:1.5px solid rgba(255,255,255,.3); flex-shrink:0;
        }
        .pd-byline-txt {
          font-size:.73rem; color:rgba(255,255,255,.6); line-height:1.45;
        }
        .pd-byline-txt strong { color:rgba(255,255,255,.9); font-weight:600; }

        /* ── Stats strip ── */
        .pd-stats {
          display:grid; grid-template-columns:repeat(3,1fr);
          border-bottom:1px solid var(--g100);
          background:#fafafa;
        }
        .pd-stat {
          padding:20px 22px 18px;
          border-right:1px solid var(--g100);
          display:flex; flex-direction:column; gap:6px;
        }
        .pd-stat:last-child { border-right:none; }
        .pd-stat-icon {
          width:28px; height:28px; border-radius:7px;
          display:flex; align-items:center; justify-content:center;
          flex-shrink:0; margin-bottom:2px;
          color:#fff;
        }
        .pd-stat-value {
          font-family:'Outfit',sans-serif; font-size:1.15rem;
          font-weight:800; color:var(--g900); letter-spacing:-.02em;
          line-height:1;
        }
        .pd-stat-label {
          font-size:.68rem; color:var(--g400); font-weight:500;
          line-height:1.3;
        }

        /* ── Tags ── */
        .pd-tags {
          display:flex; gap:7px; flex-wrap:wrap;
          padding:16px 28px; border-bottom:1px solid var(--g100);
        }
        .pd-tag {
          padding:5px 13px; border-radius:999px;
          border:1.5px solid var(--g200); background:#fff;
          font-size:.68rem; font-weight:600; color:var(--g600);
        }

        /* ── Article body ── */
        .pd-article { padding:36px 28px 0; }

        .pd-article p:first-of-type {
          font-size:1.02rem; color:var(--g800); line-height:1.8;
          font-weight:400; margin-bottom:22px;
        }
        .pd-article p {
          font-size:.94rem; color:var(--g600); line-height:1.85;
          margin-bottom:16px;
        }
        .pd-article h2 {
          font-family:'Outfit',sans-serif; font-size:1.15rem;
          font-weight:800; color:var(--g900); letter-spacing:-.025em;
          margin:36px 0 12px;
          display:flex; align-items:center; gap:10px;
        }
        .pd-article h2::before {
          content:''; display:inline-block; flex-shrink:0;
          width:4px; height:20px; border-radius:2px;
          background:${catColor};
        }
        .pd-article ul {
          list-style:none; padding:0; margin:0 0 20px;
          border:1.5px solid var(--g100); border-radius:14px;
          overflow:hidden;
        }
        .pd-article ul li {
          font-size:.94rem; color:var(--g600); line-height:1.7;
          padding:12px 18px 12px 42px; position:relative;
          border-bottom:1px solid var(--g100);
        }
        .pd-article ul li:last-child { border-bottom:none; }
        .pd-article ul li::before {
          content:''; position:absolute; left:18px; top:19px;
          width:7px; height:7px; border-radius:50%;
          background:${catColor};
        }

        /* ── Divider with label ── */
        .pd-divider {
          display:flex; align-items:center; gap:14px;
          margin:36px 28px 0;
          color:var(--g300); font-size:.7rem; font-weight:600;
          letter-spacing:.1em; text-transform:uppercase;
        }
        .pd-divider::before, .pd-divider::after {
          content:''; flex:1; height:1px; background:var(--g100);
        }

        /* ── Pull quote ── */
        .pd-pullquote {
          margin:20px 28px 32px;
          padding:24px 26px 24px 28px;
          background:var(--g50); border-radius:16px;
          border-left:4px solid ${catColor};
        }
        .pd-pullquote-text {
          font-family:'Outfit',sans-serif; font-size:1.05rem;
          font-weight:700; color:var(--g800); line-height:1.6;
        }
        .pd-pullquote-source {
          margin-top:10px; font-size:.72rem;
          color:var(--g400); font-weight:600;
        }

        /* ── CTA band ── */
        .pd-cta {
          margin:0 28px 28px;
          border-radius:16px; padding:28px;
          background:var(--g900);
          display:flex; align-items:center; justify-content:space-between;
          gap:20px; flex-wrap:wrap;
        }
        .pd-cta-left { flex:1; min-width:160px; }
        .pd-cta-label {
          font-size:.62rem; font-weight:700; letter-spacing:.12em;
          text-transform:uppercase; color:rgba(255,255,255,.4);
          margin-bottom:6px;
        }
        .pd-cta-title {
          font-family:'Outfit',sans-serif; font-size:1.1rem;
          font-weight:800; color:#fff; letter-spacing:-.025em; line-height:1.3;
          margin-bottom:4px;
        }
        .pd-cta-sub { font-size:.78rem; color:rgba(255,255,255,.45); }
        .pd-cta-btn {
          padding:11px 24px; border-radius:10px;
          background:#fff; color:var(--g900);
          font-family:'Inter',sans-serif; font-size:.82rem; font-weight:700;
          border:none; cursor:pointer; white-space:nowrap; flex-shrink:0;
          text-decoration:none; display:inline-block;
          transition:opacity .18s;
        }
        .pd-cta-btn:hover { opacity:.88; }

        /* ── Related ── */
        .pd-related {
          padding:24px 28px 36px;
          border-top:1px solid var(--g100);
        }
        .pd-related-label {
          font-size:.62rem; font-weight:700; letter-spacing:.12em;
          text-transform:uppercase; color:var(--g400); margin-bottom:16px;
        }
        .pd-related-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
        .pd-related-card {
          border:1.5px solid var(--g200); border-radius:16px;
          overflow:hidden; cursor:pointer;
          transition:transform .22s, box-shadow .22s, border-color .22s;
          background:#fff;
        }
        .pd-related-card:hover {
          transform:translateY(-5px); box-shadow:0 16px 40px rgba(0,0,0,.1);
          border-color:var(--g300);
        }
        .pd-related-img { width:100%; height:90px; object-fit:cover; display:block; }
        .pd-related-body { padding:12px 13px 14px; }
        .pd-related-cat {
          font-size:.57rem; font-weight:700; text-transform:uppercase;
          letter-spacing:.09em; margin-bottom:5px;
        }
        .pd-related-title {
          font-family:'Outfit',sans-serif; font-size:.82rem;
          font-weight:700; line-height:1.3; color:var(--g900);
        }

        /* ══ MOBILE ══ */
        @media(max-width:600px) {
          .pd-backdrop { padding:0; overflow-y:hidden; }
          .pd-sheet {
            position:absolute; inset:0; border-radius:0;
            overflow-y:auto; -webkit-overflow-scrolling:touch;
            box-shadow:none;
          }
          .pd-cover { height:52vw; min-height:200px; }
          .pd-cover-content { padding:16px 18px 20px; }
          .pd-cover-title { font-size:1.05rem; margin-bottom:12px; }
          .pd-cat-pill { font-size:.56rem; margin-bottom:8px; }
          .pd-close { top:12px; right:12px; width:32px; height:32px; }

          .pd-stats { grid-template-columns:repeat(3,1fr); background:#fafafa; }
          .pd-stat { padding:14px 12px; gap:4px; }
          .pd-stat-icon { width:22px; height:22px; border-radius:5px; }
          .pd-stat-icon svg { width:12px; height:12px; }
          .pd-stat-value { font-size:.92rem; }
          .pd-stat-label { font-size:.6rem; }

          .pd-tags { padding:12px 18px; gap:6px; }
          .pd-tag { font-size:.62rem; padding:4px 10px; }

          .pd-article { padding:22px 18px 0; }
          .pd-article p:first-of-type { font-size:.92rem; margin-bottom:16px; }
          .pd-article p { font-size:.86rem; line-height:1.78; margin-bottom:13px; }
          .pd-article h2 { font-size:.96rem; margin:26px 0 10px; gap:8px; }
          .pd-article h2::before { width:3px; height:16px; }
          .pd-article ul { border-radius:12px; }
          .pd-article ul li { font-size:.86rem; padding:10px 14px 10px 34px; }
          .pd-article ul li::before { left:14px; top:16px; width:6px; height:6px; }

          .pd-divider { margin:26px 18px 0; font-size:.62rem; }

          .pd-pullquote { margin:16px 18px 24px; padding:18px 18px 18px 20px; border-radius:12px; }
          .pd-pullquote-text { font-size:.92rem; }

          .pd-cta { margin:0 18px 22px; padding:20px; border-radius:14px; flex-direction:column; align-items:flex-start; gap:14px; }
          .pd-cta-title { font-size:.96rem; }
          .pd-cta-btn { width:100%; text-align:center; padding:12px; }

          .pd-related { padding:18px 18px 28px; }
          .pd-related-grid {
            display:flex; gap:12px; overflow-x:auto; scrollbar-width:none;
          }
          .pd-related-grid::-webkit-scrollbar { display:none; }
          .pd-related-card { flex-shrink:0; width:148px; border-radius:14px; }
          .pd-related-img { height:82px; }
          .pd-related-body { padding:10px 11px 12px; }
          .pd-related-title { font-size:.78rem; }
        }
      `}</style>

            <div className="pd-backdrop" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
                <div className="pd-sheet">

                    {/* COVER */}
                    <div className="pd-cover">
                        <img src={post.coverImage} alt={post.title} className="pd-cover-img" />
                        <div className="pd-cover-gradient" />
                        <button className="pd-close" onClick={onClose} aria-label="Close">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="pd-cover-content">
                            <div className="pd-cat-pill" style={{ background: `${catColor}44`, borderColor: `${catColor}88` }}>
                                {post.category}
                            </div>
                            <div className="pd-cover-title">{post.title}</div>
                            <div className="pd-byline">
                                <img src={post.author.avatar} alt={post.author.name} className="pd-byline-av" />
                                <div className="pd-byline-txt">
                                    <strong>{post.author.name}</strong><br />
                                    {formatDate(post.date)} &nbsp;·&nbsp; {post.readTime} read
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* STATS */}
                    {stats.length > 0 && (
                        <div className="pd-stats">
                            {stats.map(s => (
                                <div key={s.label} className="pd-stat">
                                    <div className="pd-stat-icon" style={{ background: catColor }}>
                                        {StatIcons[s.iconKey]}
                                    </div>
                                    <div className="pd-stat-value">{s.value}</div>
                                    <div className="pd-stat-label">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* TAGS */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="pd-tags">
                            {post.tags.map(t => <span key={t} className="pd-tag">{t}</span>)}
                        </div>
                    )}

                    {/* ARTICLE */}
                    <div className="pd-article" dangerouslySetInnerHTML={{ __html: post.content }} />

                    {/* DIVIDER */}
                    <div className="pd-divider">Key Insight</div>

                    {/* PULL QUOTE */}
                    <div className="pd-pullquote">
                        <div className="pd-pullquote-text">{post.excerpt}</div>
                        <div className="pd-pullquote-source">{post.author.name} · Al Areeq Real Estate</div>
                    </div>

                    {/* CTA */}
                    <div className="pd-cta">
                        <div className="pd-cta-left">
                            <div className="pd-cta-label">Free Consultation</div>
                            <div className="pd-cta-title">Looking for the right property?</div>
                            <div className="pd-cta-sub">Our agents are available to guide you every step of the way.</div>
                        </div>
                        <a href="/contact" className="pd-cta-btn">Speak to an Agent</a>
                    </div>

                    {/* RELATED */}
                    {related.length > 0 && (
                        <div className="pd-related">
                            <div className="pd-related-label">More in {post.category}</div>
                            <div className="pd-related-grid">
                                {related.map(r => (
                                    <div key={r.id} className="pd-related-card" onClick={() => onOpenRelated(r)}>
                                        <img src={r.coverImage} alt={r.title} className="pd-related-img" />
                                        <div className="pd-related-body">
                                            <div className="pd-related-cat" style={{ color: CAT_COLORS[r.category] }}>{r.category}</div>
                                            <div className="pd-related-title">{r.title}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
//  MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function BlogPage() {
    const [activeTab, setActiveTab] = useState('All');
    const [openPost, setOpenPost] = useState<Post | null>(null);

    const heroRef = useRef<HTMLDivElement>(null);
    const sbRef = useRef<HTMLElement>(null);
    const secRef = useRef<HTMLDivElement>(null);

    const heroIn = useInView(heroRef as React.RefObject<Element>, 0.05);
    const sbIn = useInView(sbRef as React.RefObject<Element>, 0.05);
    const secIn = useInView(secRef as React.RefObject<Element>, 0.08);

    const allPosts = getAllPosts();
    const featured = allPosts.find(p => p.featured)!;
    const rest = allPosts.filter(p => !p.featured);
    const grid = activeTab === 'All' ? rest : rest.filter(p => p.category === activeTab);

    return (
        <>
            <style>{`
        ${SHARED_CSS}

        @keyframes fadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }

        .bp { padding-top:102px; min-height:100vh; background:#fff; }

        /* ── Hero grid ── */
        .bp-hero {
          max-width:1200px; margin:0 auto;
          padding:48px 6% 0;
          display:grid; grid-template-columns:1fr 340px; gap:36px; align-items:start;
        }
        .bp-feat {
          position:relative; border-radius:20px; overflow:hidden;
          aspect-ratio:16/9; cursor:pointer; background:var(--g100);
          box-shadow:0 2px 24px rgba(0,0,0,.07);
        }
        .bp-feat-img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .7s cubic-bezier(.16,1,.3,1); }
        .bp-feat:hover .bp-feat-img { transform:scale(1.04); }
        .bp-feat-overlay {
          position:absolute; inset:0;
          background:linear-gradient(to top, rgba(0,0,0,.82) 0%, transparent 55%);
          padding:28px; display:flex; flex-direction:column; justify-content:flex-end;
        }
        .bp-badge {
          display:inline-block; padding:4px 13px; border-radius:999px;
          font-size:.63rem; font-weight:700; letter-spacing:.09em;
          text-transform:uppercase; color:#fff; margin-bottom:12px; width:fit-content;
        }
        .bp-feat-title {
          font-family:'Outfit',sans-serif; font-size:clamp(1.4rem,2.3vw,2rem);
          font-weight:900; line-height:1.15; letter-spacing:-.03em; color:#fff; margin-bottom:14px;
        }
        .bp-feat-meta { display:flex; align-items:center; gap:9px; }
        .bp-feat-av { width:30px; height:30px; border-radius:50%; object-fit:cover; border:2px solid rgba(255,255,255,.22); }
        .bp-feat-meta-txt { font-size:.75rem; color:rgba(255,255,255,.58); }
        .bp-feat-meta-txt strong { color:rgba(255,255,255,.9); font-weight:600; }
        /* read more hint */
        .bp-feat-hint {
          display:inline-flex; align-items:center; gap:6px;
          font-size:.72rem; font-weight:700; color:rgba(255,255,255,.7);
          padding:6px 14px; border-radius:999px;
          border:1px solid rgba(255,255,255,.25);
          margin-top:14px; transition:all .2s; width:fit-content;
        }
        .bp-feat:hover .bp-feat-hint { background:rgba(255,255,255,.15); color:#fff; }

        /* Sidebar */
        .bp-sidebar { display:flex; flex-direction:column; }
        .bp-sb-heading {
          font-size:.61rem; font-weight:700; letter-spacing:.14em;
          text-transform:uppercase; color:var(--g400);
          padding-bottom:12px; margin-bottom:2px; border-bottom:1.5px solid var(--g100);
        }
        .bp-sb-item {
          display:flex; gap:13px; padding:13px 0; border-bottom:1px solid var(--g100);
          cursor:pointer; align-items:center;
          transition:transform .2s cubic-bezier(.34,1.2,.64,1);
        }
        .bp-sb-item:last-child { border-bottom:none; }
        .bp-sb-item:hover { transform:translateX(5px); }
        .bp-sb-thumb { width:70px; height:56px; border-radius:11px; object-fit:cover; flex-shrink:0; background:var(--g100); }
        .bp-sb-cat { font-size:.57rem; font-weight:700; text-transform:uppercase; letter-spacing:.09em; margin-bottom:5px; }
        .bp-sb-title { font-size:.82rem; font-weight:600; line-height:1.35; color:var(--g800); }

        /* Section header */
        .bp-section-head {
          max-width:1200px; margin:52px auto 0; padding:0 6%;
          display:flex; align-items:center; justify-content:space-between; gap:20px; flex-wrap:wrap;
        }
        .bp-section-left { display:flex; flex-direction:column; gap:2px; }
        .bp-section-title {
          font-family:'Outfit',sans-serif; font-size:1.65rem;
          font-weight:900; letter-spacing:-.04em; color:var(--g900);
          position:relative; display:inline-block;
        }
        .bp-section-title::after {
          content:''; position:absolute; bottom:-6px; left:0;
          width:100%; height:2.5px; background:var(--g900);
          transform-origin:left; transform:scaleX(0);
          transition:transform .65s cubic-bezier(.16,1,.3,1);
        }
        .bp-section-title.line-in::after { transform:scaleX(1); }
        .bp-section-sub { font-size:.8rem; color:var(--g400); margin-top:10px; }

        /* Tabs */
        .bp-tabs { display:flex; gap:7px; flex-wrap:wrap; }
        .bp-tab {
          padding:8px 18px; border-radius:999px; border:1.5px solid var(--g200);
          background:#fff; color:var(--g600); font-family:'Inter',sans-serif;
          font-size:.8rem; font-weight:600; cursor:pointer;
          transition:all .22s cubic-bezier(.34,1.2,.64,1);
        }
        .bp-tab:hover { border-color:var(--g500); color:var(--g900); transform:translateY(-2px); }
        .bp-tab.active {
          background:var(--g900); color:#fff; border-color:var(--g900);
          transform:translateY(-2px); box-shadow:0 4px 14px rgba(0,0,0,.18);
        }

        /* Grid */
        .bp-grid {
          max-width:1200px; margin:28px auto 0; padding:0 6% 80px;
          display:grid; grid-template-columns:repeat(3,1fr); gap:22px;
        }
        .bp-card {
          background:#fff; border:1.5px solid var(--g200);
          border-radius:18px; overflow:hidden; cursor:pointer;
          transition:transform .28s cubic-bezier(.16,1,.3,1), box-shadow .28s, border-color .28s;
        }
        .bp-card:hover {
          transform:translateY(-8px) !important;
          box-shadow:0 22px 48px rgba(0,0,0,.1); border-color:var(--g300);
        }
        .bp-card-img-wrap { overflow:hidden; }
        .bp-card-img { width:100%; height:192px; object-fit:cover; display:block; transition:transform .5s cubic-bezier(.16,1,.3,1); }
        .bp-card:hover .bp-card-img { transform:scale(1.06); }
        .bp-card-body { padding:20px 20px 18px; }
        .bp-card-cat { font-size:.6rem; font-weight:700; text-transform:uppercase; letter-spacing:.1em; margin-bottom:7px; }
        .bp-card-title {
          font-family:'Outfit',sans-serif; font-size:1.02rem;
          font-weight:800; line-height:1.3; letter-spacing:-.025em; color:var(--g900); margin-bottom:8px;
        }
        .bp-card-excerpt {
          font-size:.8rem; color:var(--g500); line-height:1.62;
          display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;
        }
        .bp-card-meta {
          display:flex; align-items:center; gap:8px;
          margin-top:16px; padding-top:14px; border-top:1px solid var(--g100);
        }
        .bp-card-av { width:26px; height:26px; border-radius:50%; object-fit:cover; }
        .bp-card-meta-txt { font-size:.73rem; color:var(--g400); }
        .bp-card-meta-txt strong { color:var(--g600); font-weight:600; }

        /* Read more pill on card */
        .bp-card-read {
          display:inline-flex; align-items:center; gap:5px; margin-top:10px;
          font-size:.72rem; font-weight:700; color:var(--g500);
          padding:5px 12px; border-radius:999px; border:1px solid var(--g200);
          transition:all .2s;
        }
        .bp-card:hover .bp-card-read { background:var(--g900); color:#fff; border-color:var(--g900); }

        .bp-empty { grid-column:1/-1; text-align:center; padding:64px 0; font-size:.88rem; color:var(--g300); }

        /* ══════════ MOBILE ══════════ */
        @media(max-width:768px) {
          .bp { padding-top:64px; }

          /* ── Featured hero: taller, edge-to-edge ── */
          .bp-hero {
            grid-template-columns:1fr;
            padding:16px 4% 0; gap:0;
          }
          .bp-feat {
            aspect-ratio:unset; height:58vw; min-height:220px;
            border-radius:18px;
          }
          .bp-feat-overlay { padding:20px; }
          .bp-badge { font-size:.6rem; padding:3px 10px; margin-bottom:8px; }
          .bp-feat-title { font-size:1.1rem; margin-bottom:8px; line-height:1.2; }
          .bp-feat-av { width:26px; height:26px; }
          .bp-feat-meta-txt { font-size:.7rem; }
          .bp-feat-hint { font-size:.68rem; padding:5px 11px; margin-top:10px; }
          .bp-sidebar { display:none; }

          /* ── Mobile horizontal strip ── */
          .bp-mob-strip {
            display:flex; gap:10px; overflow-x:auto;
            padding:16px 4% 4px; scrollbar-width:none;
          }
          .bp-mob-strip::-webkit-scrollbar { display:none; }
          .bp-mob-card {
            flex-shrink:0; width:160px; background:#fff;
            border:1.5px solid var(--g200); border-radius:14px; overflow:hidden;
            cursor:pointer; active:scale(.97);
          }
          .bp-mob-card-img { width:100%; height:95px; object-fit:cover; display:block; }
          .bp-mob-card-body { padding:9px 11px 11px; }
          .bp-mob-cat {
            font-size:.54rem; font-weight:700; text-transform:uppercase;
            letter-spacing:.09em; margin-bottom:3px;
          }
          .bp-mob-title { font-size:.78rem; font-weight:700; color:var(--g900); line-height:1.3; }

          /* ── Section header: stacked, tabs scroll horizontally ── */
          .bp-section-head {
            flex-direction:column; align-items:flex-start;
            gap:12px; padding:24px 4% 0; margin-top:0;
          }
          .bp-section-title { font-size:1.25rem; }
          .bp-section-sub { font-size:.75rem; margin-top:6px; }

          /* Tabs: single horizontal scrollable row, no wrap */
          .bp-tabs {
            display:flex; flex-wrap:nowrap; gap:6px;
            overflow-x:auto; width:100%;
            padding-bottom:4px; scrollbar-width:none;
          }
          .bp-tabs::-webkit-scrollbar { display:none; }
          .bp-tab {
            flex-shrink:0; padding:7px 14px; font-size:.75rem;
            /* bigger touch target */
            min-height:36px;
          }

          /* ── Grid: 2-col on phones ≥ 400px, 1-col below ── */
          .bp-grid {
            grid-template-columns:repeat(2,1fr);
            gap:12px; padding:16px 4% 48px; margin-top:14px;
          }
          .bp-card-img { height:130px; }
          .bp-card-body { padding:12px 12px 10px; }
          .bp-card-cat { font-size:.56rem; margin-bottom:5px; }
          .bp-card-title { font-size:.88rem; margin-bottom:5px; }
          .bp-card-excerpt { display:none; } /* hide on mobile to keep cards compact */
          .bp-card-meta { margin-top:10px; padding-top:10px; gap:6px; }
          .bp-card-av { width:22px; height:22px; }
          .bp-card-meta-txt { font-size:.67rem; }
          .bp-card-read { display:none; }
        }

        /* Very small phones: single column */
        @media(max-width:400px) {
          .bp-grid { grid-template-columns:1fr; }
          .bp-card-img { height:160px; }
          .bp-card-excerpt { display:-webkit-box; }
        }

        /* ══════════ TABLET ══════════ */
        @media(min-width:769px) and (max-width:1060px) {
          .bp-hero { grid-template-columns:1fr 260px; padding:36px 6% 0; }
          .bp-grid { grid-template-columns:repeat(2,1fr); }
        }
        @media(min-width:769px) { .bp-mob-strip { display:none !important; } }
      `}</style>

            <Navbar />

            {/* Render post detail overlay when a post is open */}
            {openPost && <PostDetail post={openPost} onClose={() => setOpenPost(null)} onOpenRelated={(p) => setOpenPost(p)} />}

            <div className="bp">

                {/* ── HERO ── */}
                <div className="bp-hero">
                    <div
                        ref={heroRef}
                        className="bp-feat"
                        onClick={() => setOpenPost(featured)}
                        style={{
                            opacity: heroIn ? 1 : 0,
                            transform: heroIn ? 'scale(1) translateY(0)' : 'scale(.97) translateY(18px)',
                            transition: 'opacity .75s cubic-bezier(.16,1,.3,1), transform .75s cubic-bezier(.16,1,.3,1)',
                        }}
                    >
                        <img src={featured.coverImage} alt={featured.title} className="bp-feat-img" />
                        <div className="bp-feat-overlay">
                            <span className="bp-badge" style={{ background: CAT_COLORS[featured.category] }}>
                                {featured.category}
                            </span>
                            <h1 className="bp-feat-title">{featured.title}</h1>
                            <div className="bp-feat-meta">
                                <img src={featured.author.avatar} alt={featured.author.name} className="bp-feat-av" />
                                <span className="bp-feat-meta-txt">
                                    <strong>{featured.author.name}</strong> · {featured.readTime} read · {formatDate(featured.date)}
                                </span>
                            </div>
                            <div className="bp-feat-hint">
                                Read article
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </div>
                        </div>
                    </div>

                    <aside
                        ref={sbRef}
                        className="bp-sidebar"
                        style={{
                            opacity: sbIn ? 1 : 0,
                            transform: sbIn ? 'translateX(0)' : 'translateX(22px)',
                            transition: 'opacity .7s cubic-bezier(.16,1,.3,1) .12s, transform .7s cubic-bezier(.16,1,.3,1) .12s',
                        }}
                    >
                        <div className="bp-sb-heading">Other featured posts</div>
                        {rest.slice(0, 5).map((p, i) => (
                            <div
                                key={p.id}
                                className="bp-sb-item"
                                onClick={() => setOpenPost(p)}
                                style={{
                                    opacity: sbIn ? 1 : 0,
                                    transform: sbIn ? 'translateX(0)' : 'translateX(14px)',
                                    transition: `opacity .5s ease ${0.18 + i * 0.07}s, transform .5s cubic-bezier(.16,1,.3,1) ${0.18 + i * 0.07}s`,
                                }}
                            >
                                <img src={p.coverImage} alt={p.title} className="bp-sb-thumb" />
                                <div>
                                    <div className="bp-sb-cat" style={{ color: CAT_COLORS[p.category] }}>{p.category}</div>
                                    <div className="bp-sb-title">{p.title}</div>
                                </div>
                            </div>
                        ))}
                    </aside>
                </div>

                {/* ── MOBILE STRIP ── */}
                <div className="bp-mob-strip">
                    {rest.map(p => (
                        <div className="bp-mob-card" key={p.id} onClick={() => setOpenPost(p)}>
                            <img src={p.coverImage} alt={p.title} className="bp-mob-card-img" />
                            <div className="bp-mob-card-body">
                                <div className="bp-mob-cat" style={{ color: CAT_COLORS[p.category] }}>{p.category}</div>
                                <div className="bp-mob-title">{p.title}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── SECTION HEADER ── */}
                <div
                    ref={secRef}
                    className="bp-section-head"
                    style={{
                        opacity: secIn ? 1 : 0,
                        transform: secIn ? 'translateY(0)' : 'translateY(18px)',
                        transition: 'opacity .6s ease, transform .6s cubic-bezier(.16,1,.3,1)',
                    }}
                >
                    <div className="bp-section-left">
                        <div className={`bp-section-title${secIn ? ' line-in' : ''}`}>Recent Posts</div>
                        <div className="bp-section-sub">{rest.length} articles published</div>
                    </div>
                    <div className="bp-tabs">
                        {categories.map(c => (
                            <button
                                key={c}
                                className={`bp-tab${activeTab === c ? ' active' : ''}`}
                                onClick={() => setActiveTab(c)}
                            >{c}</button>
                        ))}
                    </div>
                </div>

                {/* ── POSTS GRID ── */}
                <div className="bp-grid">
                    {grid.length === 0 && <div className="bp-empty">No posts in this category yet.</div>}
                    {grid.map((p, i) => (
                        <PostCard key={p.id} p={p} delay={i * 0.09} onOpen={setOpenPost} />
                    ))}
                </div>

                {/* ── FOOTER ── */}
                <footer className="footer-clean">
                    <div className="footer-cta">
                        <h2>Stay ahead with our latest insights.</h2>
                        <div className="footer-cta-buttons">
                            <a href="/blog" className="btn-footer-primary">All Articles</a>
                            <a href="/contact" className="btn-outline">Contact Us</a>
                        </div>
                    </div>
                    <div className="footer-main">
                        <div className="footer-brand">
                            <h3>Al Areeq</h3>
                            <p>Trusted real estate partner helping families buy, rent and invest in premium properties since 2012.</p>
                        </div>
                        <div>
                            <h4>Properties</h4>
                            <ul>
                                <li><a href="#">Buy</a></li>
                                <li><a href="#">Rent</a></li>
                                <li><a href="#">Luxury</a></li>
                                <li><a href="#">New Projects</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4>Company</h4>
                            <ul>
                                <li><a href="/about">About</a></li>
                                <li><a href="#">Agents</a></li>
                                <li><a href="/blog">Blog</a></li>
                                <li><a href="/contact">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4>Resources</h4>
                            <ul>
                                <li><a href="#">Mortgage Calculator</a></li>
                                <li><a href="#">Market Reports</a></li>
                                <li><a href="#">Investment Guide</a></li>
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

            </div>
        </>
    );
}