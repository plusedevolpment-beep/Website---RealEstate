'use client';
import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';

const AboutUs = () => {
    const heroRef = useRef<HTMLElement>(null);
    const heroWrapRef = useRef<HTMLDivElement>(null);
    const ceoRef = useRef<HTMLElement>(null);
    const whoWrapRef = useRef<HTMLDivElement>(null);
    const whoRef = useRef<HTMLElement>(null);
    const servRef = useRef<HTMLElement>(null);
    const statRefs = useRef<HTMLDivElement[]>([]);
    const [activeService, setActiveService] = useState(0);

    useEffect(() => {
        const t = setTimeout(() => heroRef.current?.classList.add('animate'), 80);

        const ceoObs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { ceoRef.current?.classList.add('in-view'); }
            else { ceoRef.current?.classList.remove('in-view'); }
        }, { threshold: 0.3 });
        if (ceoRef.current) ceoObs.observe(ceoRef.current);

        const onScroll1 = () => {
            const wrap = heroWrapRef.current;
            const hero = heroRef.current;
            const ceo = ceoRef.current;
            if (!wrap || !hero || !ceo) return;
            const scrolled = Math.max(0, -wrap.getBoundingClientRect().top);
            const p = Math.min(1, scrolled / window.innerHeight);
            ceo.style.transform = `translateY(${((1 - p) * 100).toFixed(2)}%)`;
            hero.style.filter = `blur(${(p * 5).toFixed(2)}px)`;
        };

        const onScroll2 = () => {
            const wrap = whoWrapRef.current;
            const who = whoRef.current;
            const serv = servRef.current;
            if (!wrap || !who || !serv) return;
            const scrolled = Math.max(0, -wrap.getBoundingClientRect().top);
            const p = Math.min(1, scrolled / window.innerHeight);
            serv.style.transform = `translateY(${((1 - p) * 100).toFixed(2)}%)`;
            who.style.filter = `blur(${(p * 4).toFixed(2)}px)`;
        };

        window.addEventListener('scroll', onScroll1, { passive: true });
        window.addEventListener('scroll', onScroll2, { passive: true });
        onScroll1(); onScroll2();

        const countUp = (el: HTMLElement, target: number, suffix: string) => {
            let start: number | null = null;
            const step = (ts: number) => {
                if (!start) start = ts;
                const p = Math.min((ts - start) / 1800, 1);
                el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target) + suffix;
                if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        };

        const whoObs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                whoRef.current?.classList.add('in-view');
                statRefs.current.forEach((el, i) => {
                    if (!el) return;
                    setTimeout(() => {
                        el.classList.add('card-in');
                        const numEl = el.querySelector('.stat-num') as HTMLElement | null;
                        if (numEl) countUp(numEl, +(el.dataset.target ?? '0'), el.dataset.suffix || '');
                    }, 350 + i * 140);
                });
            } else {
                whoRef.current?.classList.remove('in-view');
                statRefs.current.forEach(el => {
                    if (!el) return;
                    el.classList.remove('card-in');
                    const numEl = el.querySelector('.stat-num') as HTMLElement | null;
                    if (numEl) numEl.textContent = '0' + (el.dataset.suffix || '');
                });
            }
        }, { threshold: 0.05 });
        if (whoRef.current) whoObs.observe(whoRef.current);

        return () => {
            clearTimeout(t);
            ceoObs.disconnect();
            whoObs.disconnect();
            window.removeEventListener('scroll', onScroll1);
            window.removeEventListener('scroll', onScroll2);
        };
    }, []);

    const stats = [
        { target: 500, suffix: '+', label: 'Properties Sold', desc: 'Across Dubai & the UAE' },
        { target: 12, suffix: '+', label: 'Years Experience', desc: 'Licensed since 2012' },
        { target: 1000, suffix: '+', label: 'Happy Clients', desc: 'Families & investors' },
    ];

    const serviceCategories = [
        { id: 0, tab: 'Home Maintenance' },
        { id: 1, tab: 'Repair Work' },
        { id: 2, tab: 'House Renovation' },
    ];


    const serviceDetails = [
        {
            headline: 'Proactive care, year-round.',
            body: 'We keep your property in peak condition so small issues never become expensive ones.',
            groups: [
                { label: 'Upkeep', items: ['AC servicing', 'Deep cleaning'] },
                { label: 'Checks', items: ['Plumbing & electrical', 'Pest control'] },
            ],
            cta1: { label: 'Get a Maintenance Plan', href: '/contact' },
            cta2: { label: 'View Packages', href: '/services/maintenance' },
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85',
            steps: ['Contact us via call or WhatsApp', 'Free on-site assessment', 'We schedule & execute the work', 'Sign-off when you are satisfied'],
        },
        {
            headline: 'Fast fixes. Zero hassle.',
            body: 'Our vetted team responds the same day and gets it right the first time — 7 days a week.',
            groups: [
                { label: 'Common', items: ['Plumbing & electrical', 'Carpentry & flooring'] },
                { label: 'Finishes', items: ['Painting & patching', 'Fixture replacement'] },
            ],
            cta1: { label: 'Request a Repair', href: '/contact' },
            cta2: { label: 'See All Repair Jobs', href: '/services/repairs' },
            image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=85',
            steps: ['Describe the issue to our team', 'Technician arrives same day', 'Repair completed & tested', 'You approve before we leave'],
        },
        {
            headline: 'Reimagine your space.',
            body: 'From a single room to a full fit-out — on budget, on schedule, beautifully finished.',
            groups: [
                { label: 'Spaces', items: ['Kitchen & bathroom', 'Full interior fit-out'] },
                { label: 'Finishes', items: ['Flooring & tiling', 'Painting & joinery'] },
            ],
            cta1: { label: 'Start Your Renovation', href: '/contact' },
            cta2: { label: 'View Past Projects', href: '/services/renovation' },
            image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=85',
            steps: ['Share your vision & budget', 'We present a design proposal', 'Construction begins on schedule', 'Final walkthrough & handover'],
        },
    ];

    const svc = serviceDetails[activeService];

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior:smooth; }
        body { font-family:'DM Sans',sans-serif; background:#18181b; -webkit-font-smoothing:antialiased; overflow-x:hidden; }

        @keyframes fadeUp   { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeDown { from{opacity:0;transform:translateY(-16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes popIn    { from{opacity:0;transform:scale(0.55)} to{opacity:1;transform:scale(1)} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse    { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.25;transform:scale(1.9)} }
        @keyframes float1   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-13px)} }
        @keyframes float2   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes float3   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-15px)} }
        @keyframes float4   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes shimmer  { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes panelIn    { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes iconBounce { 0%{opacity:0;transform:scale(0.4) rotate(-8deg)} 60%{transform:scale(1.12) rotate(3deg)} 80%{transform:scale(0.95) rotate(-1deg)} 100%{opacity:1;transform:scale(1) rotate(0deg)} }
        @keyframes slideUp    { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes stepIn     { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:translateX(0)} }
        @keyframes lineDraw   { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes numFlip    { from{opacity:0;transform:translateY(6px) scale(0.8)} to{opacity:1;transform:translateY(0) scale(1)} }

        
        .hero-wrap   { position:relative; height:200vh; }
        .hero-sticky { position:sticky; top:0; height:100vh; overflow:hidden; background:#18181b; }
        .hero { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:#f8f7f4; overflow:hidden; will-change:filter; }
        .hero::before { content:''; position:absolute; inset:0; background-image:radial-gradient(circle,rgba(0,0,0,.05) 1px,transparent 1px); background-size:28px 28px; pointer-events:none; }
        .desktop-layout { position:relative; z-index:1; display:grid; grid-template-columns:160px 400px 160px; gap:0 72px; align-items:center; padding:120px 0 80px; }
        .side-col { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:44px; }
        .photo-item { width:140px; height:140px; flex-shrink:0; position:relative; display:flex; align-items:center; justify-content:center; opacity:0; }
        .photo-item::before { content:''; position:absolute; width:170px; height:170px; border-radius:50%; top:50%; left:50%; transform:translate(-50%,-50%); border:1.5px solid rgba(24,24,27,.10); }
        .photo-item::after  { content:''; position:absolute; width:200px; height:200px; border-radius:50%; top:50%; left:50%; transform:translate(-50%,-50%); border:1px solid rgba(24,24,27,.05); }
        .photo-circle { width:140px; height:140px; border-radius:50%; overflow:hidden; position:relative; z-index:1; }
        .photo-circle img { width:100%; height:100%; object-fit:cover; object-position:center top; display:block; transition:transform .5s cubic-bezier(.16,1,.3,1); }
        .photo-item:hover .photo-circle img { transform:scale(1.08); }
        .hero.animate .p1 { animation:popIn .65s cubic-bezier(.34,1.5,.64,1) .28s forwards, float1 5.5s ease-in-out 1.4s infinite; }
        .hero.animate .p2 { animation:popIn .65s cubic-bezier(.34,1.5,.64,1) .42s forwards, float2 6.0s ease-in-out 1.6s infinite; }
        .hero.animate .p3 { animation:popIn .65s cubic-bezier(.34,1.5,.64,1) .56s forwards, float3 5.0s ease-in-out 1.8s infinite; }
        .hero.animate .p4 { animation:popIn .65s cubic-bezier(.34,1.5,.64,1) .70s forwards, float4 4.8s ease-in-out 2.0s infinite; }
        .center-text { text-align:center; display:flex; flex-direction:column; align-items:center; }
        .center-text > * { opacity:0; }
        .hero.animate .badge   { animation:fadeDown .55s cubic-bezier(.34,1.2,.64,1) .08s forwards; }
        .hero.animate .heading { animation:fadeUp   .75s cubic-bezier(.16,1,.3,1)    .22s forwards; }
        .hero.animate .sub     { animation:fadeUp   .65s ease                        .40s forwards; }
        .hero.animate .buttons { animation:fadeUp   .65s ease                        .56s forwards; }
        .badge { display:inline-flex; align-items:center; gap:7px; background:#18181b; padding:6px 16px; border-radius:999px; margin-bottom:24px; box-shadow:0 4px 16px rgba(0,0,0,.2); transition:transform .2s,box-shadow .2s; }
        .badge:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,0,0,.28); }
        .dot { width:7px; height:7px; border-radius:50%; background:#22c55e; animation:pulse 2s ease-in-out infinite; flex-shrink:0; }
        .badge span { font-size:.67rem; font-weight:700; letter-spacing:.09em; text-transform:uppercase; color:rgba(255,255,255,.88); }
        .heading { font-family:'Outfit',sans-serif; font-size:3.4rem; font-weight:900; line-height:1.08; letter-spacing:-.05em; color:#18181b; margin-bottom:16px; }
        .heading em { font-style:normal; background:linear-gradient(120deg,#18181b,#52525b); -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; }
        .sub { font-size:.95rem; color:#71717a; line-height:1.72; max-width:280px; margin-bottom:30px; }
        .buttons { display:flex; gap:10px; justify-content:center; }
        .btn-dark  { display:inline-flex; align-items:center; gap:8px; background:#18181b; color:#fff; padding:13px 26px; border-radius:12px; font-family:'DM Sans',sans-serif; font-size:.875rem; font-weight:700; text-decoration:none; border:none; cursor:pointer; box-shadow:0 6px 20px rgba(0,0,0,.22); transition:transform .22s cubic-bezier(.34,1.4,.64,1),box-shadow .22s; }
        .btn-dark:hover { transform:translateY(-3px); box-shadow:0 14px 32px rgba(0,0,0,.3); }
        .btn-dark svg { transition:transform .22s; }
        .btn-dark:hover svg { transform:translateX(4px); }
        .btn-ghost { display:inline-flex; align-items:center; background:transparent; color:#3f3f46; padding:13px 20px; border-radius:12px; font-family:'DM Sans',sans-serif; font-size:.875rem; font-weight:600; text-decoration:none; border:1.5px solid #d4d4d8; cursor:pointer; transition:all .22s cubic-bezier(.34,1.2,.64,1); }
        .btn-ghost:hover { border-color:#a1a1aa; color:#18181b; background:#fff; transform:translateY(-3px); }
        .ceo-section { position:absolute; inset:0; background:#18181b; display:flex; justify-content:center; align-items:center; overflow:hidden; transform:translateY(100%); will-change:transform; z-index:10; }
        .ceo-section::before { content:'\u201C'; position:absolute; top:-20px; left:50%; transform:translateX(-50%); font-family:'Outfit',sans-serif; font-size:28rem; font-weight:900; color:rgba(255,255,255,.025); line-height:1; pointer-events:none; user-select:none; }
        .ceo-inner { position:relative; z-index:1; max-width:780px; width:100%; padding:0 40px; display:flex; flex-direction:column; align-items:center; text-align:center; }
        .ceo-label { display:inline-flex; align-items:center; gap:10px; margin-bottom:48px; opacity:0; }
        .ceo-label-line { width:32px; height:1px; background:rgba(255,255,255,.2); }
        .ceo-label span { font-size:.68rem; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:rgba(255,255,255,.35); }
        .ceo-quote { font-family:'Outfit',sans-serif; font-size:clamp(1.6rem,3.2vw,2.6rem); font-weight:800; line-height:1.3; letter-spacing:-.03em; color:#fff; margin-bottom:52px; max-width:680px; opacity:0; }
        .ceo-quote em { font-style:normal; background:linear-gradient(90deg,#a1a1aa 0%,#fff 40%,#a1a1aa 60%,#fff 100%); background-size:200% auto; -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; }
        .ceo-section.in-view .ceo-quote em { animation:shimmer 3.5s linear 1.2s infinite; }
        .ceo-divider { width:48px; height:1px; background:rgba(255,255,255,.15); margin-bottom:40px; opacity:0; }
        .ceo-identity { display:flex; flex-direction:column; align-items:center; gap:16px; opacity:0; }
        .ceo-avatar-wrap { position:relative; width:72px; height:72px; }
        .ceo-avatar-wrap::before { content:''; position:absolute; inset:-5px; border-radius:50%; border:1px solid rgba(255,255,255,.12); }
        .ceo-avatar-wrap::after  { content:''; position:absolute; inset:-11px; border-radius:50%; border:1px solid rgba(255,255,255,.05); }
        .ceo-avatar { width:72px; height:72px; border-radius:50%; object-fit:cover; object-position:center top; display:block; border:2px solid rgba(255,255,255,.1); transition:transform .4s cubic-bezier(.34,1.4,.64,1); }
        .ceo-avatar:hover { transform:scale(1.07); }
        .ceo-name { font-family:'Outfit',sans-serif; font-size:1.1rem; font-weight:800; letter-spacing:-.02em; color:#fff; }
        .ceo-title-text { font-size:.8rem; font-weight:500; color:rgba(255,255,255,.38); letter-spacing:.04em; margin-top:-8px; }
        .ceo-section.in-view .ceo-label    { animation:fadeInUp .65s cubic-bezier(.16,1,.3,1) .10s forwards; }
        .ceo-section.in-view .ceo-quote    { animation:fadeInUp .8s  cubic-bezier(.16,1,.3,1) .26s forwards; }
        .ceo-section.in-view .ceo-divider  { animation:fadeInUp .55s ease .52s forwards; }
        .ceo-section.in-view .ceo-identity { animation:fadeInUp .65s cubic-bezier(.16,1,.3,1) .66s forwards; }

  
        .who-wrap   { position:relative; height:200vh; }
        .who-sticky { position:sticky; top:0; height:100vh; overflow:hidden; background:#f8f7f4; }
        .who-section { position:absolute; inset:0; background:#fff; display:flex; align-items:center; justify-content:center; overflow:hidden; will-change:filter; opacity:0; transition:opacity .9s cubic-bezier(.16,1,.3,1); }
        .who-section.in-view { opacity:1; }
        .who-section::before { content:''; position:absolute; inset:0; pointer-events:none; background-image:radial-gradient(circle,rgba(0,0,0,.035) 1px,transparent 1px); background-size:28px 28px; }
        .who-inner { position:relative; z-index:1; max-width:1040px; width:100%; padding:0 40px; }
        .who-top { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center; margin-bottom:56px; }
        .who-img-wrap { border-radius:24px; overflow:hidden; aspect-ratio:4/3; box-shadow:0 24px 64px rgba(0,0,0,.12); clip-path:inset(0 100% 0 0 round 24px); transition:clip-path .9s cubic-bezier(.16,1,.3,1) .15s, box-shadow .3s; }
        .who-section.in-view .who-img-wrap { clip-path:inset(0 0% 0 0 round 24px); }
        .who-img-wrap img { width:100%; height:100%; object-fit:cover; display:block; transform:scale(1.08); transition:transform .9s cubic-bezier(.16,1,.3,1) .15s; }
        .who-section.in-view .who-img-wrap img { transform:scale(1); }
        .who-img-wrap:hover { box-shadow:0 32px 80px rgba(0,0,0,.18); }
        .who-img-wrap:hover img { transform:scale(1.04) !important; }
        .who-text { display:flex; flex-direction:column; }
        .who-eyebrow { display:inline-flex; align-items:center; gap:8px; margin-bottom:16px; font-size:.67rem; font-weight:700; letter-spacing:.13em; text-transform:uppercase; color:#a1a1aa; opacity:0; transform:translateY(12px); transition:opacity .55s ease .3s, transform .55s ease .3s; }
        .who-section.in-view .who-eyebrow { opacity:1; transform:translateY(0); }
        .who-eyebrow-line { width:0; height:1.5px; background:#d4d4d8; transition:width .6s cubic-bezier(.16,1,.3,1) .55s; }
        .who-section.in-view .who-eyebrow-line { width:20px; }
        .who-title { font-family:'Outfit',sans-serif; font-size:clamp(1.8rem,3vw,2.6rem); font-weight:900; line-height:1.1; letter-spacing:-.04em; color:#18181b; margin-bottom:20px; opacity:0; transform:translateY(18px); transition:opacity .7s cubic-bezier(.16,1,.3,1) .38s, transform .7s cubic-bezier(.16,1,.3,1) .38s; }
        .who-section.in-view .who-title { opacity:1; transform:translateY(0); }
        .who-body { font-size:.97rem; color:#52525b; line-height:1.82; margin-bottom:14px; opacity:0; transform:translateY(14px); transition:opacity .65s ease .5s, transform .65s ease .5s; }
        .who-section.in-view .who-body { opacity:1; transform:translateY(0); }
        .who-body-2 { font-size:.92rem; color:#71717a; line-height:1.78; opacity:0; transform:translateY(14px); transition:opacity .65s ease .62s, transform .65s ease .62s; }
        .who-section.in-view .who-body-2 { opacity:1; transform:translateY(0); }
        .who-rule { width:100%; height:1px; background:#ebebeb; margin-top:28px; transform:scaleX(0); transform-origin:left; transition:transform .8s cubic-bezier(.16,1,.3,1) .75s; }
        .who-section.in-view .who-rule { transform:scaleX(1); }
        .who-stats { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
        .stat-card { background:#fafafa; border:1.5px solid #ebebeb; border-radius:20px; padding:28px 24px 24px; display:flex; flex-direction:column; gap:6px; position:relative; overflow:hidden; opacity:0; transform:translateY(32px); transition:opacity .65s cubic-bezier(.16,1,.3,1), transform .65s cubic-bezier(.16,1,.3,1), box-shadow .25s, border-color .25s; }
        .stat-card.card-in { opacity:1; transform:translateY(0); }
        .stat-card:nth-child(1) { transition-delay:.05s; }
        .stat-card:nth-child(2) { transition-delay:.16s; }
        .stat-card:nth-child(3) { transition-delay:.27s; }
        .stat-card:hover { box-shadow:0 16px 44px rgba(0,0,0,.1); border-color:#d4d4d8; transform:translateY(-6px) !important; }
        .stat-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:#18181b; transform:scaleX(0); transform-origin:left; transition:transform .4s cubic-bezier(.16,1,.3,1); }
        .stat-card:hover::before { transform:scaleX(1); }
        .stat-card::after { content:''; position:absolute; inset:0; background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,.6) 50%,transparent 60%); transform:translateX(-100%); transition:transform .5s ease; pointer-events:none; }
        .stat-card:hover::after { transform:translateX(100%); }
        .stat-icon-wrap { width:44px; height:44px; border-radius:12px; background:#f0f0f0; display:flex; align-items:center; justify-content:center; margin-bottom:8px; flex-shrink:0; color:#18181b; transition:background .25s, transform .3s cubic-bezier(.34,1.4,.64,1); }
        .stat-card:hover .stat-icon-wrap { background:#e8e8e8; transform:scale(1.1); }
        .stat-num   { font-family:'Outfit',sans-serif; font-size:2.4rem; font-weight:900; letter-spacing:-.04em; color:#18181b; line-height:1; }
        .stat-label { font-size:.82rem; font-weight:700; color:#18181b; margin-top:4px; }
        .stat-desc  { font-size:.78rem; color:#a1a1aa; }

   
        .serv-section { position:absolute; inset:0; background:#fff; display:flex; align-items:center; justify-content:center; overflow:hidden; transform:translateY(100%); will-change:transform; z-index:10; }
        .serv-section::before { content:''; position:absolute; inset:0; pointer-events:none; background-image:radial-gradient(circle,rgba(0,0,0,.033) 1px,transparent 1px); background-size:28px 28px; }
        .serv-inner { position:relative; z-index:1; max-width:960px; width:100%; padding:0 40px; }
        .serv-header { text-align:center; margin-bottom:36px; padding-top:32px; }
        .serv-eyebrow { display:inline-flex; align-items:center; gap:8px; margin-bottom:14px; font-size:.67rem; font-weight:700; letter-spacing:.13em; text-transform:uppercase; color:#a1a1aa; }
        .serv-eyebrow-line { width:20px; height:1.5px; background:#d4d4d8; }
        .serv-title { font-family:'Outfit',sans-serif; font-size:clamp(1.9rem,3.5vw,2.8rem); font-weight:900; line-height:1.08; letter-spacing:-.04em; color:#18181b; margin-bottom:10px; }
        .serv-subtitle { font-size:.96rem; color:#71717a; line-height:1.75; max-width:480px; margin:0 auto; }

        .serv-tabs-wrap { display:flex; justify-content:center; margin-bottom:32px; }
        .serv-tabs { display:inline-flex; gap:6px; padding:6px; background:#f4f4f5; border-radius:16px; }
        .serv-tab { padding:10px 22px; border-radius:11px; border:none; cursor:pointer; font-family:'DM Sans',sans-serif; font-size:.875rem; font-weight:600; color:#71717a; background:transparent; transition:background .25s, color .25s, box-shadow .25s, transform .2s cubic-bezier(.34,1.4,.64,1); }
        .serv-tab:hover:not(.active) { color:#3f3f46; background:rgba(255,255,255,.6); }
        .serv-tab.active { background:#fff; color:#18181b; box-shadow:0 2px 12px rgba(0,0,0,.1); transform:translateY(-1px); }

        .serv-panel { display:grid; grid-template-columns:1fr 1fr; gap:48px; align-items:start; animation:panelIn .4s cubic-bezier(.16,1,.3,1) forwards; }

        /* Left column */
        .serv-panel-left-wrap { display:flex; flex-direction:column; }
        .serv-panel-category-label { font-size:.67rem; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:#a1a1aa; margin-bottom:10px; }
        .serv-panel-headline { font-family:'Outfit',sans-serif; font-size:clamp(1.4rem,2.2vw,1.9rem); font-weight:900; letter-spacing:-.03em; color:#18181b; margin-bottom:10px; line-height:1.15; }
        .serv-panel-body { font-size:.92rem; color:#52525b; line-height:1.75; margin-bottom:28px; }

        .serv-groups { display:grid; grid-template-columns:1fr 1fr; gap:16px 28px; margin-bottom:28px; }
        .serv-group-label { font-size:.63rem; font-weight:700; letter-spacing:.10em; text-transform:uppercase; color:#a1a1aa; margin-bottom:9px; }
        .serv-group-items { display:flex; flex-direction:column; gap:7px; }
        .serv-group-item { display:flex; align-items:center; gap:9px; font-size:.86rem; font-weight:500; color:#3f3f46; }
        .serv-group-dot { width:5px; height:5px; border-radius:50%; background:#d4d4d8; flex-shrink:0; }

        .serv-divider { width:100%; height:1px; background:#f0f0f0; margin-bottom:24px; }
        .serv-ctas { display:flex; gap:10px; flex-wrap:wrap; }
        .serv-ctas-mobile { display:none; }
        .serv-img-wrap-mobile { display:none; }
        .serv-btn-primary { display:inline-flex; align-items:center; gap:8px; background:#18181b; color:#fff; padding:12px 22px; border-radius:11px; font-family:'DM Sans',sans-serif; font-size:.875rem; font-weight:700; text-decoration:none; border:none; cursor:pointer; box-shadow:0 4px 16px rgba(0,0,0,.18); transition:transform .22s cubic-bezier(.34,1.4,.64,1),box-shadow .22s; }
        .serv-btn-primary:hover { transform:translateY(-3px); box-shadow:0 10px 28px rgba(0,0,0,.25); }
        .serv-btn-primary svg { transition:transform .22s; }
        .serv-btn-primary:hover svg { transform:translateX(3px); }
        .serv-btn-secondary { display:inline-flex; align-items:center; background:transparent; color:#3f3f46; padding:12px 20px; border-radius:11px; font-family:'DM Sans',sans-serif; font-size:.875rem; font-weight:600; text-decoration:none; border:1.5px solid #d4d4d8; cursor:pointer; transition:all .22s cubic-bezier(.34,1.2,.64,1); }
        .serv-btn-secondary:hover { border-color:#a1a1aa; color:#18181b; transform:translateY(-2px); background:#fafafa; }

        /* Right column */
        .serv-panel-right { display:flex; flex-direction:column; gap:16px; }
        .serv-img-wrap { display:none; }
        .serv-img { width:100%; height:100%; object-fit:cover; display:block; }

        /* Process card */
        .serv-visual { background:#18181b; border-radius:18px; padding:26px 24px; position:relative; overflow:hidden; box-shadow:0 12px 36px rgba(0,0,0,.16); }
        .serv-visual::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 80% 20%,rgba(255,255,255,.05) 0%,transparent 60%); pointer-events:none; }
        .serv-visual-label { font-size:.63rem; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:rgba(255,255,255,.3); margin-bottom:18px; }
        .serv-step { display:flex; align-items:flex-start; gap:14px; padding:13px 0; border-bottom:1px solid rgba(255,255,255,.07); }
        .serv-step:last-child { border-bottom:none; padding-bottom:0; }
        .serv-step-num { width:26px; height:26px; border-radius:50%; background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.15); color:rgba(255,255,255,.8); display:flex; align-items:center; justify-content:center; font-family:'Outfit',sans-serif; font-size:.7rem; font-weight:900; flex-shrink:0; transition:background .25s, transform .3s cubic-bezier(.34,1.4,.64,1); }
        .serv-step:hover .serv-step-num { background:rgba(255,255,255,.2); transform:scale(1.12); }
        .serv-step-title { font-size:.84rem; font-weight:600; color:rgba(255,255,255,.85); line-height:1.4; }
        .serv-step-sub { font-size:.78rem; color:rgba(255,255,255,.35); margin-top:2px; }

   
        .mobile-layout { display:none; }

        @media (max-width:640px) {
          .desktop-layout { display:none; }
          .hero { align-items:flex-start; }
          .mobile-layout { display:flex; flex-direction:column; align-items:center; width:100%; padding:96px 24px 60px; position:relative; z-index:1; }
          .mob-text { text-align:center; display:flex; flex-direction:column; align-items:center; margin-bottom:36px; }
          .mob-text > * { opacity:0; }
          .hero.animate .mob-heading { animation:fadeUp .7s cubic-bezier(.16,1,.3,1) .25s forwards; }
          .hero.animate .mob-sub     { animation:fadeUp .6s ease .42s forwards; }
          .mob-heading { font-family:'Outfit',sans-serif; font-size:2.4rem; font-weight:900; line-height:1.08; letter-spacing:-.05em; color:#18181b; margin-bottom:14px; }
          .mob-heading em { font-style:normal; background:linear-gradient(120deg,#18181b,#52525b); -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; }
          .mob-sub { font-size:.88rem; color:#71717a; line-height:1.7; max-width:260px; }
          .mob-photos { display:grid; grid-template-columns:1fr 1fr; gap:20px; width:100%; max-width:280px; margin-bottom:36px; }
          .mob-photo-item { width:120px; height:120px; position:relative; display:flex; align-items:center; justify-content:center; opacity:0; margin:0 auto; }
          .mob-photo-item::before { content:''; position:absolute; width:144px; height:144px; border-radius:50%; top:50%; left:50%; transform:translate(-50%,-50%); border:1.5px solid rgba(24,24,27,.09); }
          .mob-photo-circle { width:120px; height:120px; border-radius:50%; overflow:hidden; position:relative; z-index:1; }
          .mob-photo-circle img { width:100%; height:100%; object-fit:cover; object-position:center top; display:block; }
          .hero.animate .mp1 { animation:popIn .6s cubic-bezier(.34,1.5,.64,1) .55s forwards, float1 5.5s ease-in-out 1.4s infinite; }
          .hero.animate .mp2 { animation:popIn .6s cubic-bezier(.34,1.5,.64,1) .68s forwards, float2 6.0s ease-in-out 1.6s infinite; }
          .hero.animate .mp3 { animation:popIn .6s cubic-bezier(.34,1.5,.64,1) .81s forwards, float3 5.0s ease-in-out 1.8s infinite; }
          .hero.animate .mp4 { animation:popIn .6s cubic-bezier(.34,1.5,.64,1) .94s forwards, float4 4.8s ease-in-out 2.0s infinite; }
          .mob-buttons { display:flex; flex-direction:column; gap:10px; width:100%; max-width:280px; opacity:0; }
          .hero.animate .mob-buttons { animation:fadeUp .6s ease 1.1s forwards; }
          .mob-buttons .btn-dark, .mob-buttons .btn-ghost { justify-content:center; width:100%; padding:14px; }
          .ceo-inner { padding:0 24px; }
          .ceo-section::before { font-size:10rem; }
          .ceo-quote { font-size:1.35rem; margin-bottom:28px; }
          .who-top { grid-template-columns:1fr 1fr; gap:16px; margin-bottom:20px; }
          .who-img-wrap { aspect-ratio:3/4; border-radius:14px; }
          .who-text { align-items:flex-start; text-align:left; }
          .who-eyebrow { font-size:.58rem; margin-bottom:8px; }
          .who-eyebrow-line { display:none; }
          .who-title { font-size:1.1rem; margin-bottom:8px; }
          .who-body { font-size:.77rem; line-height:1.6; margin-bottom:0; }
          .who-body-2 { display:none; }
          .who-rule { display:none; }
          .who-stats { grid-template-columns:repeat(3,1fr); gap:8px; }
          .stat-card { padding:14px 10px 12px; border-radius:14px; gap:3px; }
          .stat-icon-wrap { width:28px; height:28px; border-radius:8px; margin-bottom:4px; }
          .stat-icon-wrap svg { width:14px; height:14px; }
          .stat-num { font-size:1.35rem; }
          .stat-label { font-size:.6rem; }
          .stat-desc { display:none; }

          /* ─── SERVICES: mobile overhaul ─── */

          /* Scrollable container, no clipping */
          .serv-section {
            overflow-y: auto;
            overflow-x: hidden;
            -webkit-overflow-scrolling: touch;
            align-items: flex-start;
          }

          /* Centered column layout */
          .serv-inner {
            padding: 28px 20px 48px;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          /* Header */
          .serv-header { margin-bottom: 18px; width: 100%; }
          .serv-eyebrow { display: none; }
          .serv-title { font-size: 1.35rem; letter-spacing: -.03em; }
          .serv-subtitle { font-size: .82rem; max-width: 100%; margin-top: 5px; line-height: 1.6; }

          /* Animated underline accent under title */
          .serv-title::after {
            content: '';
            display: block;
            height: 2.5px;
            width: 36px;
            background: #18181b;
            border-radius: 2px;
            margin: 8px auto 0;
            animation: lineDraw .6s cubic-bezier(.16,1,.3,1) .2s both;
            transform-origin: left;
          }

          /* Tabs: all 3 fit centered on one line */
          .serv-tabs-wrap {
            justify-content: center;
            margin-bottom: 22px;
            width: 100%;
            overflow: visible;
          }
          .serv-tabs {
            display: flex;
            flex-wrap: nowrap;
            gap: 4px;
            padding: 4px;
            border-radius: 12px;
            width: 100%;
          }
          .serv-tab {
            flex: 1;
            padding: 8px 2px;
            font-size: .69rem;
            border-radius: 9px;
            white-space: nowrap;
            text-align: center;
            letter-spacing: -.01em;
          }

          /* Panel: single centered column, smooth fade+lift on tab change */
          .serv-panel {
            grid-template-columns: 1fr;
            gap: 16px;
            width: 100%;
            animation: none;
          }
          .serv-panel { opacity: 0; animation: slideUp .35s cubic-bezier(.16,1,.3,1) .04s forwards; }

          /* Left column: centered flex */
          .serv-panel > div:first-child {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          /* Icon row stays centered inline */
          .serv-panel-icon-row {
            justify-content: center;
            margin-bottom: 14px;
          }
          .serv-panel-category-label { display: none; }

          /* Hide desktop right column (image + card) on mobile */
          .serv-panel-right { display: none; }

          /* Mobile image: shown inline in left column, full width, rounded */
          .serv-img-wrap-mobile {
            display: block;
            width: 100%;
            border-radius: 14px;
            overflow: hidden;
            aspect-ratio: 16/9;
            margin-top: 18px;
            margin-bottom: 4px;
            box-shadow: 0 10px 32px rgba(0,0,0,.13);
            animation: slideUp .4s cubic-bezier(.16,1,.3,1) .28s both;
          }
          .serv-img-wrap-mobile .serv-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transform: none;
          }

          /* Headline: delayed slide-up */
          .serv-panel-headline {
            font-size: 1.2rem;
            margin-bottom: 8px;
            line-height: 1.2;
            animation: slideUp .4s cubic-bezier(.16,1,.3,1) .18s both;
          }

          /* Body: slightly more delayed */
          .serv-panel-body {
            font-size: .875rem;
            line-height: 1.65;
            margin-bottom: 0;
            color: #52525b;
            animation: slideUp .4s cubic-bezier(.16,1,.3,1) .26s both;
          }

          /* Hide service groups on mobile */
          .serv-groups { display: none; }

          /* Desktop CTAs hidden */
          .serv-ctas { display: none; }

          /* Mobile CTAs: stacked, animated */
          .serv-ctas-mobile {
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100%;
            margin-top: 18px;
            margin-bottom: 0;
            animation: slideUp .4s cubic-bezier(.16,1,.3,1) .34s both;
          }
          .serv-ctas-mobile .serv-btn-primary,
          .serv-ctas-mobile .serv-btn-secondary {
            width: 100%;
            justify-content: center;
            font-size: .875rem;
            padding: 13px 16px;
            border-radius: 12px;
          }

          /* "How it works" card: dark card adapted for mobile */
          .serv-visual {
            padding: 20px 18px 16px;
            border-radius: 18px;
            margin-top: 0;
            text-align: left;
            animation: slideUp .45s cubic-bezier(.16,1,.3,1) .3s both;
            background: #18181b;
          }
          .serv-visual-label {
            font-size: .63rem;
            margin-bottom: 14px;
            text-align: center;
            letter-spacing: .14em;
          }

          /* Steps: each step slides in with stagger */
          .serv-step {
            padding: 11px 0;
            gap: 13px;
            opacity: 0;
            animation: stepIn .4s cubic-bezier(.16,1,.3,1) forwards;
          }
          .serv-step:nth-child(2) { animation-delay: .38s; }
          .serv-step:nth-child(3) { animation-delay: .48s; }
          .serv-step:nth-child(4) { animation-delay: .58s; }
          .serv-step:nth-child(5) { animation-delay: .68s; }

          .serv-step-num {
            width: 26px;
            height: 26px;
            font-size: .7rem;
            flex-shrink: 0;
            animation: numFlip .35s cubic-bezier(.34,1.4,.64,1) .4s both;
          }
          .serv-step-title { font-size: .84rem; line-height: 1.4; }
        }

        @media (min-width:641px) and (max-width:1024px) {
          .desktop-layout { grid-template-columns:130px 320px 130px; gap:0 48px; }
          .photo-item,.photo-circle { width:118px; height:118px; }
          .photo-item::before { width:144px; height:144px; }
          .photo-item::after  { width:170px; height:170px; }
          .heading { font-size:2.6rem; }
          .who-top { gap:40px; }
          .serv-panel { gap:36px; }
        }
      `}</style>

            <Navbar />

            {/* BLOCK 1: Hero + CEO overlay */}
            <div className="hero-wrap" ref={heroWrapRef}>
                <div className="hero-sticky">
                    <section className="hero" ref={heroRef}>
                        <div className="desktop-layout">
                            <div className="side-col">
                                <div className="photo-item p1"><div className="photo-circle"><img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=85" alt="Agent" /></div></div>
                                <div className="photo-item p2"><div className="photo-circle"><img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=85" alt="Consultant" /></div></div>
                            </div>
                            <div className="center-text">
                                <div className="badge"><div className="dot" /><span>RERA Licensed · Est. 2012 · UAE</span></div>
                                <h1 className="heading">Real estate,<br />done the <em>right way.</em></h1>
                                <p className="sub">12 years of honest deals.<br />Built on referrals, not ads.</p>
                                <div className="buttons">
                                    <a href="#our-story" className="btn-dark">Our Story <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg></a>
                                    <a href="#team" className="btn-ghost">Meet the Team</a>
                                </div>
                            </div>
                            <div className="side-col">
                                <div className="photo-item p3"><div className="photo-circle"><img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=85" alt="Broker" /></div></div>
                                <div className="photo-item p4"><div className="photo-circle"><img src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&q=85" alt="Advisor" /></div></div>
                            </div>
                        </div>
                        <div className="mobile-layout">
                            <div className="mob-text">
                                <h1 className="mob-heading">Real estate,<br />done the <em>right way.</em></h1>
                                <p className="mob-sub">12 years of honest deals. Built on referrals, not ads.</p>
                            </div>
                            <div className="mob-photos">
                                <div className="mob-photo-item mp1"><div className="mob-photo-circle"><img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=85" alt="" /></div></div>
                                <div className="mob-photo-item mp2"><div className="mob-photo-circle"><img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=85" alt="" /></div></div>
                                <div className="mob-photo-item mp3"><div className="mob-photo-circle"><img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=85" alt="" /></div></div>
                                <div className="mob-photo-item mp4"><div className="mob-photo-circle"><img src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&q=85" alt="" /></div></div>
                            </div>
                            <div className="mob-buttons">
                                <a href="#our-story" className="btn-dark">Our Story <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg></a>
                                <a href="#team" className="btn-ghost">Meet the Team</a>
                            </div>
                        </div>
                    </section>

                    <section className="ceo-section" ref={ceoRef}>
                        <div className="ceo-inner">
                            <div className="ceo-label"><div className="ceo-label-line" /><span>A message from our founder</span><div className="ceo-label-line" /></div>
                            <p className="ceo-quote">"Real estate should feel like <em>empowerment, not a trap.</em> We built Al Areeq on one promise — to always put our clients first, no matter what."</p>
                            <div className="ceo-divider" />
                            <div className="ceo-identity">
                                <div className="ceo-avatar-wrap"><img className="ceo-avatar" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=85" alt="Mohammed Al Areeq" /></div>
                                <div className="ceo-name">Mohammed Al Areeq</div>
                                <div className="ceo-title-text">Founder & CEO · Al Areeq Real Estate</div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* BLOCK 2: Who + Services overlay */}
            <div className="who-wrap" ref={whoWrapRef}>
                <div className="who-sticky">
                    <section className="who-section" ref={whoRef}>
                        <div className="who-inner">
                            <div className="who-top">
                                <div className="who-img-wrap">
                                    <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=85" alt="Al Areeq Real Estate Dubai" />
                                </div>
                                <div className="who-text">
                                    <div className="who-eyebrow"><div className="who-eyebrow-line" />Who We Are</div>
                                    <h2 className="who-title">A Dubai agency you can actually trust.</h2>
                                    <p className="who-body">Founded in Dubai in 2012, Al Areeq is a RERA-licensed agency built on one principle — honest, pressure-free guidance for every client.</p>
                                    <p className="who-body-2">Every client we have ever had came through a referral. No ads, no gimmicks — just 12 years of deals done right.</p>
                                    <div className="who-rule" />
                                </div>
                            </div>
                            <div className="who-stats">
                                {stats.map((s, i) => (
                                    <div key={i} className="stat-card" data-target={s.target} data-suffix={s.suffix} ref={el => { if (el) statRefs.current[i] = el; }}>
                                        <div className="stat-icon-wrap">
                                            {i === 0 && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" /><path d="M9 21V12h6v9" /></svg>}
                                            {i === 1 && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>}
                                            {i === 2 && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>}
                                        </div>
                                        <div className="stat-num">0{s.suffix}</div>
                                        <div className="stat-label">{s.label}</div>
                                        <div className="stat-desc">{s.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="serv-section" ref={servRef}>
                        <div className="serv-inner">
                            <div className="serv-header">
                                <div className="serv-eyebrow"><div className="serv-eyebrow-line" />Our Services<div className="serv-eyebrow-line" /></div>
                                <h2 className="serv-title">Everything your property needs.</h2>
                                <p className="serv-subtitle">From routine maintenance to full renovations — all under one roof.</p>
                            </div>

                            <div className="serv-tabs-wrap">
                                <div className="serv-tabs">
                                    {serviceCategories.map(cat => (
                                        <button key={cat.id} className={`serv-tab${activeService === cat.id ? ' active' : ''}`} onClick={() => setActiveService(cat.id)}>
                                            {cat.tab}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="serv-panel" key={activeService}>
                                {/* Left column */}
                                <div className="serv-panel-left-wrap">
                                    <div className="serv-panel-category-label">{serviceCategories[activeService].tab}</div>
                                    <div className="serv-panel-headline">{svc.headline}</div>
                                    <p className="serv-panel-body">{svc.body}</p>

                                    <div className="serv-groups">
                                        {svc.groups.map((group, gi) => (
                                            <div key={gi}>
                                                <div className="serv-group-label">{group.label}</div>
                                                <div className="serv-group-items">
                                                    {group.items.map((item, ii) => (
                                                        <div key={ii} className="serv-group-item">
                                                            <div className="serv-group-dot" />{item}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="serv-divider" />
                                    <div className="serv-ctas">
                                        <a href={svc.cta1.href} className="serv-btn-primary">{svc.cta1.label} <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg></a>
                                        <a href={svc.cta2.href} className="serv-btn-secondary">{svc.cta2.label}</a>
                                    </div>
                                    {/* Mobile image shown between body and CTAs */}
                                    <div className="serv-img-wrap-mobile">
                                        <img src={svc.image} alt={svc.headline} className="serv-img" />
                                    </div>
                                    <div className="serv-ctas-mobile">
                                        <a href={svc.cta1.href} className="serv-btn-primary">{svc.cta1.label} <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg></a>
                                        <a href={svc.cta2.href} className="serv-btn-secondary">{svc.cta2.label}</a>
                                    </div>
                                </div>

                                {/* Right column: image + process card */}
                                <div className="serv-panel-right">
                                    <div className="serv-img-wrap">
                                        <img src={svc.image} alt={svc.headline} className="serv-img" />
                                    </div>
                                    <div className="serv-visual">
                                        <div className="serv-visual-label">How it works</div>
                                        {svc.steps.map((step, j) => (
                                            <div key={j} className="serv-step">
                                                <div className="serv-step-num">{j + 1}</div>
                                                <div><div className="serv-step-title">{step}</div></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default AboutUs;