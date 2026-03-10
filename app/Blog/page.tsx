'use client';
import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BLOG_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=DM+Sans:wght@400;500;600&display=swap');
html,body{margin:0;padding:0;overflow-x:hidden;}
*,*::before,*::after{box-sizing:border-box;}
.bl-pg{padding-top:102px;min-height:100vh;background:#f3f3f0;font-family:'DM Sans',sans-serif;color:#18181b;-webkit-font-smoothing:antialiased;margin:0;}
.rv{opacity:0;transform:translateY(20px);transition:opacity .5s cubic-bezier(.16,1,.3,1),transform .5s cubic-bezier(.16,1,.3,1);}
.rv.vis{opacity:1;transform:none;}
.bl-hdr{background:#18181b;padding:48px 6% 44px;position:relative;overflow:hidden;}
.bl-hdr::after{content:'FIELD NOTES';position:absolute;right:-1%;bottom:-16px;font-family:'Outfit',sans-serif;font-size:clamp(4rem,9vw,8rem);font-weight:900;letter-spacing:-.04em;color:rgba(255,255,255,.04);pointer-events:none;white-space:nowrap;line-height:1;}
.bl-hdr-in{max-width:1120px;margin:0 auto;display:flex;align-items:flex-end;justify-content:space-between;gap:32px;flex-wrap:wrap;position:relative;z-index:1;}
.bl-hdr-eye{font-size:.6rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.3);margin-bottom:12px;}
.bl-hdr-title{font-family:'Outfit',sans-serif;font-size:clamp(1.8rem,3.5vw,3rem);font-weight:900;letter-spacing:-.04em;line-height:1.08;color:#fff;}
.bl-hdr-title em{font-style:normal;color:rgba(255,255,255,.25);}
.bl-hdr-search{display:flex;align-items:center;background:rgba(255,255,255,.08);border:1.5px solid rgba(255,255,255,.13);border-radius:10px;overflow:hidden;width:260px;transition:border-color .2s,background .2s;}
.bl-hdr-search:focus-within{border-color:rgba(255,255,255,.35);background:rgba(255,255,255,.11);}
.bl-hdr-search svg{margin:0 12px;opacity:.35;flex-shrink:0;}
.bl-hdr-search input{flex:1;padding:11px 14px 11px 0;background:transparent;border:none;outline:none;color:#fff;font-size:.82rem;font-family:'DM Sans',sans-serif;}
.bl-hdr-search input::placeholder{color:rgba(255,255,255,.25);}
.bl-hero-wrap{max-width:1120px;margin:0 auto;padding:36px 6% 0;}
.bl-hero{width:100%;border:none;padding:0;cursor:pointer;background:#111;border-radius:18px;overflow:hidden;position:relative;display:block;text-decoration:none;outline:none;}
.bl-hero img{display:block;width:100%;height:auto;max-height:480px;object-fit:cover;transition:transform .7s cubic-bezier(.4,0,.2,1);}
.bl-hero:hover img{transform:scale(1.03);}
.bl-hero-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.88) 0%,rgba(0,0,0,.1) 50%,transparent 100%);z-index:1;}
.bl-hero-body{position:absolute;bottom:0;left:0;right:0;z-index:2;padding:28px 32px;display:flex;align-items:flex-end;justify-content:space-between;gap:20px;}
.bl-hero-left{flex:1;min-width:0;}
.bl-hero-badge{display:inline-flex;align-items:center;gap:6px;padding:4px 12px;border-radius:99px;border:1px solid rgba(255,255,255,.22);background:rgba(255,255,255,.09);backdrop-filter:blur(8px);font-size:.6rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.8);margin-bottom:10px;}
.bl-hero-badge-dot{width:4px;height:4px;border-radius:50%;background:rgba(255,255,255,.6);}
.bl-hero-title{font-family:'Outfit',sans-serif;font-size:clamp(1.25rem,2.2vw,1.75rem);font-weight:900;color:#fff;line-height:1.2;letter-spacing:-.03em;margin-bottom:14px;max-width:500px;}
.bl-hero-meta{display:flex;align-items:center;gap:10px;}
.bl-hero-av{width:28px;height:28px;border-radius:50%;overflow:hidden;border:1.5px solid rgba(255,255,255,.3);flex-shrink:0;}
.bl-hero-av img{width:100%;height:100%;object-fit:cover;}
.bl-hero-info{font-size:.73rem;color:rgba(255,255,255,.5);font-weight:500;}
.bl-hero-info strong{color:rgba(255,255,255,.8);font-weight:700;}
.bl-hero-info span{margin:0 5px;opacity:.4;}
.bl-hero-cta{display:inline-flex;align-items:center;gap:8px;background:#fff;color:#18181b;padding:10px 20px;border-radius:99px;font-family:'Outfit',sans-serif;font-size:.78rem;font-weight:800;flex-shrink:0;align-self:flex-end;transition:transform .2s cubic-bezier(.34,1.4,.64,1),box-shadow .2s;white-space:nowrap;border:none;cursor:pointer;}
.bl-hero:hover .bl-hero-cta{transform:scale(1.05) translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.22);}
.bl-hero-time{padding:3px 9px;border-radius:99px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.13);font-size:.6rem;font-weight:700;color:rgba(255,255,255,.4);letter-spacing:.04em;}
.bl-bar{max-width:1120px;margin:0 auto;padding:28px 6% 0;display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;}
.bl-bar-label{font-family:'Outfit',sans-serif;font-size:1rem;font-weight:900;letter-spacing:-.02em;}
.bl-bar-label span{color:#a1a1aa;font-size:.88rem;font-weight:600;margin-left:6px;}
.bl-bar-cats{display:flex;gap:6px;flex-wrap:wrap;}
.bl-bcat{padding:5px 13px;border-radius:99px;border:1.5px solid #e4e4e7;background:#fff;color:#71717a;font-size:.72rem;font-weight:700;cursor:pointer;font-family:'Outfit',sans-serif;transition:all .15s;white-space:nowrap;}
.bl-bcat:hover{border-color:#a1a1aa;color:#18181b;}
.bl-bcat.on{background:#18181b;border-color:#18181b;color:#fff;}
.bl-grid-wrap{max-width:1120px;margin:0 auto;padding:18px 6% 60px;}
.bl-desk-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
.bl-desk-grid .bl-card:nth-child(1){transition-delay:0s;}
.bl-desk-grid .bl-card:nth-child(2){transition-delay:.05s;}
.bl-desk-grid .bl-card:nth-child(3){transition-delay:.1s;}
.bl-desk-grid .bl-card:nth-child(4){transition-delay:.15s;}
.bl-desk-grid .bl-card:nth-child(5){transition-delay:.2s;}
.bl-desk-grid .bl-card:nth-child(6){transition-delay:.25s;}
.bl-card{background:#fff;border-radius:16px;overflow:hidden;display:flex;flex-direction:column;border:1.5px solid #eaeaea;cursor:pointer;outline:none;transition:transform .25s cubic-bezier(.34,1.4,.64,1),box-shadow .25s,border-color .2s;}
.bl-card:hover{transform:translateY(-6px);box-shadow:0 20px 48px rgba(0,0,0,.09);border-color:#d4d4d8;}
.bl-card-img{height:176px;overflow:hidden;background:#eee;position:relative;flex-shrink:0;}
.bl-card-img img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s cubic-bezier(.4,0,.2,1);}
.bl-card:hover .bl-card-img img{transform:scale(1.06);}
.bl-card-pill{position:absolute;top:10px;left:10px;z-index:2;padding:3px 9px;border-radius:99px;background:rgba(24,24,27,.72);backdrop-filter:blur(6px);font-size:.56rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.88);}
.bl-card-body{padding:18px 18px 16px;display:flex;flex-direction:column;flex:1;gap:7px;}
.bl-card-title{font-family:'Outfit',sans-serif;font-size:.92rem;font-weight:800;color:#18181b;line-height:1.38;letter-spacing:-.02em;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
.bl-card-exc{font-size:.78rem;color:#71717a;line-height:1.65;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;flex:1;}
.bl-card-foot{display:flex;align-items:center;gap:8px;border-top:1px solid #f4f4f5;padding-top:11px;margin-top:2px;}
.bl-card-av{width:24px;height:24px;border-radius:50%;overflow:hidden;border:1.5px solid #e4e4e7;flex-shrink:0;}
.bl-card-av img{width:100%;height:100%;object-fit:cover;object-position:center top;}
.bl-card-name{font-size:.7rem;font-weight:700;color:#3f3f46;}
.bl-card-when{margin-left:auto;font-size:.66rem;color:#a1a1aa;white-space:nowrap;}
.bl-empty{padding:56px 0;text-align:center;color:#a1a1aa;font-size:.88rem;}
.bl-cta-wrap{max-width:1120px;margin:0 auto;padding:0 6% 64px;}
.bl-cta{background:#18181b;border-radius:18px;padding:48px 52px;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:space-between;gap:32px;}
.bl-cta::before{content:'';position:absolute;inset:0;background-image:radial-gradient(circle,rgba(255,255,255,.04) 1px,transparent 1px);background-size:20px 20px;pointer-events:none;}
.bl-cta-l{position:relative;z-index:1;}
.bl-cta-eye{font-size:.58rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,.28);margin-bottom:8px;}
.bl-cta-h{font-family:'Outfit',sans-serif;font-size:clamp(1.3rem,2.2vw,1.8rem);font-weight:900;color:#fff;letter-spacing:-.04em;line-height:1.12;}
.bl-cta-sub{font-size:.8rem;color:rgba(255,255,255,.35);line-height:1.65;margin-top:7px;max-width:340px;}
.bl-cta-r{position:relative;z-index:1;display:flex;gap:10px;flex-shrink:0;flex-wrap:wrap;}
.bl-cta-input{padding:11px 16px;border-radius:9px;border:1.5px solid rgba(255,255,255,.12);background:rgba(255,255,255,.07);color:#fff;font-size:.82rem;font-family:'DM Sans',sans-serif;outline:none;width:210px;transition:border-color .2s,background .2s;}
.bl-cta-input::placeholder{color:rgba(255,255,255,.25);}
.bl-cta-input:focus{border-color:rgba(255,255,255,.35);background:rgba(255,255,255,.1);}
.bl-cta-btn{padding:11px 22px;border-radius:9px;background:#fff;color:#18181b;font-family:'Outfit',sans-serif;font-size:.82rem;font-weight:800;border:none;cursor:pointer;white-space:nowrap;transition:transform .2s cubic-bezier(.34,1.4,.64,1),box-shadow .2s;}
.bl-cta-btn:hover{transform:translateY(-2px) scale(1.03);box-shadow:0 8px 20px rgba(255,255,255,.16);}
.bl-modal-backdrop{position:fixed;inset:0;z-index:2000;background:rgba(0,0,0,.6);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:24px;animation:blFadeIn .2s ease;}
@keyframes blFadeIn{from{opacity:0;}to{opacity:1;}}
.bl-modal{background:#fff;border-radius:22px;width:100%;max-width:600px;max-height:88vh;display:flex;flex-direction:column;overflow:hidden;position:relative;animation:blSlideUp .3s cubic-bezier(.16,1,.3,1);box-shadow:0 40px 100px rgba(0,0,0,.35);}
@keyframes blSlideUp{from{opacity:0;transform:translateY(24px) scale(.97);}to{opacity:1;transform:none;}}
.bl-modal-close{position:absolute;top:14px;right:14px;z-index:10;width:32px;height:32px;border-radius:50%;background:rgba(0,0,0,.55);border:none;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;backdrop-filter:blur(6px);transition:background .15s,transform .15s;}
.bl-modal-close:hover{background:rgba(0,0,0,.85);transform:scale(1.08);}
.bl-modal-img{position:relative;height:260px;flex-shrink:0;overflow:hidden;background:#eee;}
.bl-modal-img img{width:100%;height:100%;object-fit:cover;object-position:center;display:block;}
.bl-modal-img-overlay{position:absolute;inset:0;background:linear-gradient(to bottom,transparent 40%,rgba(0,0,0,.15) 100%);}
.bl-modal-badge{position:absolute;bottom:14px;left:16px;padding:4px 11px;border-radius:99px;background:rgba(24,24,27,.78);backdrop-filter:blur(6px);font-size:.58rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.92);}
.bl-modal-body{padding:22px 26px 28px;overflow-y:auto;flex:1;}
.bl-modal-meta-top{display:flex;align-items:center;gap:10px;margin-bottom:14px;}
.bl-modal-av{width:38px;height:38px;border-radius:50%;overflow:hidden;border:2px solid #e4e4e7;flex-shrink:0;}
.bl-modal-av img{width:100%;height:100%;object-fit:cover;object-position:top;}
.bl-modal-author{font-size:.84rem;font-weight:700;color:#18181b;}
.bl-modal-date{font-size:.72rem;color:#a1a1aa;margin-top:2px;}
.bl-modal-title{font-family:'Outfit',sans-serif;font-size:clamp(1.25rem,3vw,1.65rem);font-weight:900;color:#18181b;line-height:1.2;letter-spacing:-.03em;margin-bottom:10px;}
.bl-modal-excerpt{font-size:.88rem;color:#52525b;line-height:1.68;font-style:italic;}
.bl-modal-divider{height:1px;background:#f0f0f0;margin:16px 0;}
.bl-modal-text{font-size:.87rem;color:#3f3f46;line-height:1.85;}
.bl-modal-btn{margin-top:22px;display:inline-flex;align-items:center;gap:7px;padding:11px 22px;border-radius:99px;background:#18181b;color:#fff;font-family:'Outfit',sans-serif;font-size:.8rem;font-weight:800;border:none;cursor:pointer;transition:opacity .2s;}
.bl-modal-btn:hover{opacity:.78;}
@media(max-width:1024px){.bl-desk-grid{grid-template-columns:1fr 1fr;}}
@media(max-width:768px){
.bl-pg{padding-top:64px;}
.bl-hdr{padding:28px 5% 26px;}
.bl-hdr-in{flex-direction:column;align-items:flex-start;gap:16px;}
.bl-hdr-title{font-size:1.7rem;}
.bl-hdr-search{width:100%;}
.bl-hero-wrap{padding:16px 5% 0;}
.bl-hero img{max-height:240px;}
.bl-hero-body{padding:14px 16px;flex-direction:column;align-items:flex-start;gap:10px;}
.bl-hero-title{font-size:1.05rem;margin-bottom:8px;}
.bl-hero-cta{align-self:flex-start;padding:8px 16px;font-size:.74rem;}
.bl-hero-time{display:none;}
.bl-bar{padding:16px 5% 0;flex-direction:column;align-items:flex-start;gap:10px;}
.bl-bar-cats{flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none;padding-bottom:2px;width:100%;}
.bl-bar-cats::-webkit-scrollbar{display:none;}
.bl-grid-wrap{padding:14px 5% 40px;}
.bl-desk-grid{display:flex;flex-direction:column;gap:12px;}
.bl-card{flex-direction:row;border-radius:14px;}
.bl-card-img{width:110px;height:auto;min-height:110px;flex-shrink:0;border-radius:0;}
.bl-card-img img{height:100%;}
.bl-card-body{padding:12px 14px;gap:5px;}
.bl-card-title{font-size:.84rem;-webkit-line-clamp:3;}
.bl-card-exc{display:none;}
.bl-card-foot{padding-top:8px;}
.bl-card-when{display:none;}
.bl-cta-wrap{padding:0 5% 36px;}
.bl-cta{flex-direction:column;padding:26px 22px;gap:20px;}
.bl-cta-h{font-size:1.3rem;}
.bl-cta-sub{display:none;}
.bl-cta-r{width:100%;flex-direction:column;gap:8px;}
.bl-cta-input,.bl-cta-btn{width:100%;}
.bl-cta-btn{text-align:center;padding:12px;}
.bl-modal-backdrop{padding:0;align-items:flex-end;}
.bl-modal{border-radius:20px 20px 0 0;max-height:90vh;animation:blSlideUpMob .3s cubic-bezier(.16,1,.3,1);}
.bl-modal-img{height:200px;}
.bl-modal-img::before{content:'';display:block;width:36px;height:4px;background:rgba(255,255,255,.5);border-radius:99px;position:absolute;top:10px;left:50%;transform:translateX(-50%);z-index:5;}
.bl-modal-body{padding:16px 18px 32px;}
.bl-modal-title{font-size:1.2rem;}
}
@keyframes blSlideUpMob{from{transform:translateY(100%);}to{transform:none;}}
`;

const POSTS = [
    {
        id: 1, category: 'Market Insights', readTime: '6 min', date: 'Mar 5, 2025',
        title: 'What Every Dubai Buyer Must Know in 2025',
        excerpt: 'Off-plan surges, golden visa thresholds, and the areas quietly outperforming the market right now.',
        body: 'Dubai real estate in 2025 is being shaped by three forces: a surge in off-plan launches, the AED 2M golden visa property threshold drawing global investors, and a rental market that has pushed yields above 7% in key corridors. Buyers entering the market today are navigating intense competition in premium districts while value pockets in emerging areas remain underpriced. This guide breaks down everything you need to know before signing a contract.',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=85',
        author: { name: 'Mohammed Al Areeq', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&q=80' },
    },
    {
        id: 2, category: 'Investment', readTime: '5 min', date: 'Feb 20, 2025',
        title: 'Business Bay: ROI and Rental Yields Explained',
        excerpt: "The numbers behind one of Dubai's most underrated investment corridors.",
        body: "Business Bay has quietly transformed from a corporate address into one of Dubai's most compelling investment stories. Average rental yields sit between 6.5% and 8.2% depending on unit size and floor. With direct Canal views commanding a 20-30% premium and supply constrained by limited new land, investors who moved early are already seeing strong capital appreciation alongside income returns.",
        image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
        author: { name: 'Mohammed Al Areeq', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&q=80' },
    },
    {
        id: 3, category: 'Lifestyle', readTime: '3 min', date: 'Feb 12, 2025',
        title: 'Relocating to Dubai: The Honest Guide',
        excerpt: 'Schools, commute, community. What clients wish they had known before moving.',
        body: 'Most relocation guides sell you the dream. This one tells you what our clients learned the hard way. School waitlists in top GEMS and GEMS-affiliated schools can run 12-18 months. Traffic on Sheikh Zayed between 7:30-9am is genuinely brutal. But the community infrastructure, the safety, the weather from October to April, and the tax-free income make the transition worth it for the vast majority of families who make the move.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80',
        author: { name: 'Sara Al Rashidi', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&q=80' },
    },
    {
        id: 4, category: 'Legal', readTime: '5 min', date: 'Jan 18, 2025',
        title: 'Freehold vs Leasehold: Plain English',
        excerpt: 'The most common question from new buyers -- finally answered without the jargon.',
        body: "Freehold means you own the property and the land it sits on outright, forever. Leasehold means you own the right to use the property for a fixed term -- typically 99 years in Dubai -- after which ownership reverts to the freeholder. As a foreign national, you can only buy in designated freehold zones. The good news: Dubai's freehold zones include nearly every premium development you'd want to buy in.",
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
        author: { name: 'Mohammed Al Areeq', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&q=80' },
    },
    {
        id: 5, category: 'Interior Design', readTime: '4 min', date: 'Feb 28, 2025',
        title: "Interiors Defining Dubai's Luxury Market",
        excerpt: 'Biophilic details, statement marble, and why minimalism is back in high-end builds.',
        body: "The interior language of Dubai's luxury tier has shifted dramatically. Gone is the maximalist gold-and-mirror aesthetic of the 2010s. The new benchmark is warm minimalism: fluted stone panels, Calacatta marble with subtle veining, integrated joinery in smoked oak, and biophilic elements like living walls and indoor water features. Developers who hit this brief are achieving per-sqft prices 35% above the district average.",
        image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80',
        author: { name: 'Sara Al Rashidi', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&q=80' },
    },
    {
        id: 6, category: 'Neighbourhoods', readTime: '4 min', date: 'Jan 5, 2025',
        title: 'JVC: The Quiet Neighbourhood That Boomed',
        excerpt: 'Overlooked for years, Jumeirah Village Circle is now one of the most searched addresses in Dubai.',
        body: 'Three years ago, JVC barely registered on investor radar. Today it tops the search volume charts on Bayut and Property Finder, driven by a combination of affordable entry prices, strong rental demand from young professionals, and steady infrastructure improvements. Studios and 1-beds are yielding 7-9%, and the completion of the Circle Mall has anchored the community in a way that was missing before.',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
        author: { name: 'Khalid Mansoor', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&q=80' },
    },
    {
        id: 7, category: 'Market Insights', readTime: '7 min', date: 'Jan 30, 2025',
        title: 'Where Rent Is Still Affordable in 2025',
        excerpt: 'Prices have climbed hard across the city. Here is where real value still exists.',
        body: "Dubai's rental market has seen 30-40% increases across many prime areas since 2022. But value pockets remain. International City, Discovery Gardens, and parts of Deira still offer 1-bedroom units under AED 50,000 annually with good transport links. For families, areas like Mirdif and Al Furjan offer spacious 3-beds at 60-70% of the price you would pay in Jumeirah or The Springs.",
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
        author: { name: 'Khalid Mansoor', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&q=80' },
    },
];

const CATS = ['All', 'Market Insights', 'Investment', 'Neighbourhoods', 'Legal', 'Lifestyle', 'Interior Design'];

type Post = typeof POSTS[0];

/* ── MODAL ── */
const PostModal = ({ post, onClose }: { post: Post; onClose: () => void }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
    }, [onClose]);

    return (
        <div className="bl-modal-backdrop" onClick={onClose}>
            <div className="bl-modal" onClick={e => e.stopPropagation()}>
                <button className="bl-modal-close" onClick={onClose} aria-label="Close">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
                <div className="bl-modal-img">
                    <img src={post.image} alt={post.title} />
                    <div className="bl-modal-img-overlay" />
                    <div className="bl-modal-badge">{post.category}</div>
                </div>
                <div className="bl-modal-body">
                    <div className="bl-modal-meta-top">
                        <div className="bl-modal-av"><img src={post.author.avatar} alt={post.author.name} /></div>
                        <div>
                            <div className="bl-modal-author">{post.author.name}</div>
                            <div className="bl-modal-date">{post.date} &bull; {post.readTime}</div>
                        </div>
                    </div>
                    <h2 className="bl-modal-title">{post.title}</h2>
                    <p className="bl-modal-excerpt">{post.excerpt}</p>
                    <div className="bl-modal-divider" />
                    <p className="bl-modal-text">{post.body}</p>
                    <button className="bl-modal-btn" onClick={onClose}>Back to Articles</button>
                </div>
            </div>
        </div>
    );
};

/* ── MAIN COMPONENT ── */
const Blog = () => {
    const [cat, setCat] = useState('All');
    const [q, setQ] = useState('');
    const [openPost, setOpenPost] = useState<Post | null>(null);
    const rootRef = useRef<HTMLDivElement>(null);

    const hero = POSTS[0];
    const grid = POSTS.slice(1).filter(p =>
        (cat === 'All' || p.category === cat) &&
        (q === '' || p.title.toLowerCase().includes(q.toLowerCase()))
    );

    useEffect(() => {
        const io = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    (e.target as HTMLElement).classList.add('vis');
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
        const delay = setTimeout(() => {
            rootRef.current?.querySelectorAll<HTMLElement>('.rv').forEach(el => io.observe(el));
        }, 80);
        return () => { clearTimeout(delay); io.disconnect(); };
    }, [cat]);

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: BLOG_STYLES }} />

            <Navbar />
            {openPost && <PostModal post={openPost} onClose={() => setOpenPost(null)} />}

            <div className="bl-pg" ref={rootRef}>

                {/* HEADER */}
                <div className="bl-hdr">
                    <div className="bl-hdr-in">
                        <div>
                            <div className="bl-hdr-eye">Al Areeq &nbsp;/&nbsp; Insights</div>
                            <h1 className="bl-hdr-title">Real Estate Intel,<br /><em>Straight from the Field.</em></h1>
                        </div>
                        <div className="bl-hdr-search">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                            <input placeholder="Search articles..." value={q} onChange={e => setQ(e.target.value)} />
                        </div>
                    </div>
                </div>

                {/* HERO */}
                <div className="bl-hero-wrap rv">
                    <button className="bl-hero" onClick={() => setOpenPost(hero)}>
                        <img src={hero.image} alt={hero.title} />
                        <div className="bl-hero-overlay" />
                        <div className="bl-hero-body">
                            <div className="bl-hero-left">
                                <div className="bl-hero-badge"><div className="bl-hero-badge-dot" />{hero.category}</div>
                                <div className="bl-hero-title">{hero.title}</div>
                                <div className="bl-hero-meta">
                                    <div className="bl-hero-av"><img src={hero.author.avatar} alt={hero.author.name} /></div>
                                    <div className="bl-hero-info"><strong>{hero.author.name}</strong><span>&bull;</span>{hero.date}</div>
                                    <div className="bl-hero-time">{hero.readTime}</div>
                                </div>
                            </div>
                            <div className="bl-hero-cta">
                                Read Article
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </div>
                        </div>
                    </button>
                </div>

                {/* FILTER BAR */}
                <div className="bl-bar rv">
                    <div className="bl-bar-label">Recent Posts <span>({grid.length})</span></div>
                    <div className="bl-bar-cats">
                        {CATS.map(c => (
                            <button key={c} className={`bl-bcat${cat === c ? ' on' : ''}`} onClick={() => setCat(c)}>{c}</button>
                        ))}
                    </div>
                </div>

                {/* GRID */}
                <div className="bl-grid-wrap" suppressHydrationWarning>
                    <div className="bl-desk-grid">
                        {grid.length > 0 ? grid.map(p => (
                            <article key={p.id} className="bl-card rv" onClick={() => setOpenPost(p)}>
                                <div className="bl-card-img">
                                    <img src={p.image} alt={p.title} loading="lazy" />
                                    <div className="bl-card-pill">{p.category}</div>
                                </div>
                                <div className="bl-card-body">
                                    <h3 className="bl-card-title">{p.title}</h3>
                                    <p className="bl-card-exc">{p.excerpt}</p>
                                    <div className="bl-card-foot">
                                        <div className="bl-card-av"><img src={p.author.avatar} alt={p.author.name} /></div>
                                        <div className="bl-card-name">{p.author.name}</div>
                                        <div className="bl-card-when">{p.date} &bull; {p.readTime}</div>
                                    </div>
                                </div>
                            </article>
                        )) : <div className="bl-empty">No posts match your search.</div>}
                    </div>
                </div>

                {/* NEWSLETTER */}
                <div className="bl-cta-wrap rv">
                    <div className="bl-cta">
                        <div className="bl-cta-l">
                            <div className="bl-cta-eye">Stay informed</div>
                            <div className="bl-cta-h">Monthly market intel,<br />direct to your inbox.</div>
                            <p className="bl-cta-sub">No noise. Just the data and trends that matter to Dubai buyers and investors.</p>
                        </div>
                        <div className="bl-cta-r">
                            <input className="bl-cta-input" type="email" placeholder="your@email.com" />
                            <button className="bl-cta-btn">Subscribe</button>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
};

export default Blog;