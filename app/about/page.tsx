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
    const teamRef = useRef<HTMLElement>(null);
    const visionRef = useRef<HTMLElement>(null);
    const testimonialsRef = useRef<HTMLElement>(null);
    const statRefs = useRef<HTMLDivElement[]>([]);
    const teamCardRefs = useRef<HTMLDivElement[]>([]);
    const teamGridRef = useRef<HTMLDivElement>(null);
    const [activeService, setActiveService] = useState(0);
    const [activeDot, setActiveDot] = useState(0);
    const [activeVision, setActiveVision] = useState(0);
    const [activeReview, setActiveReview] = useState(0);
    const [ctaInView, setCtaInView] = useState(false);
    const [ctaCounters, setCtaCounters] = useState({ deals: 0, exp: 0, sat: 0, rating: 0 });
    const ctaRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const t = setTimeout(() => heroRef.current?.classList.add('animate'), 80);

        const ceoObs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) ceoRef.current?.classList.add('in-view');
            else ceoRef.current?.classList.remove('in-view');
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
            const team = teamRef.current;
            const vision = visionRef.current;
            const testimonials = testimonialsRef.current;
            if (!wrap || !who || !serv || !team || !vision || !testimonials) return;

            const scrolled = Math.max(0, -wrap.getBoundingClientRect().top);

            const pServ = Math.min(1, scrolled / window.innerHeight);
            serv.style.transform = `translateY(${((1 - pServ) * 100).toFixed(2)}%)`;
            who.style.filter = `blur(${(pServ * 4).toFixed(2)}px)`;

            const pTeam = Math.min(1, Math.max(0, (scrolled - window.innerHeight) / window.innerHeight));
            team.style.transform = `translateY(${((1 - pTeam) * 100).toFixed(2)}%)`;

            const pVision = Math.min(1, Math.max(0, (scrolled - window.innerHeight * 2) / window.innerHeight));
            vision.style.transform = `translateY(${((1 - pVision) * 100).toFixed(2)}%)`;

            const pTest = Math.min(1, Math.max(0, (scrolled - window.innerHeight * 3) / window.innerHeight));
            testimonials.style.transform = `translateY(${((1 - pTest) * 100).toFixed(2)}%)`;

            if (pTeam > 0.18 && !team.classList.contains('in-view')) {
                team.classList.add('in-view');
                teamCardRefs.current.forEach((el, i) => {
                    if (!el) return;
                    setTimeout(() => el.classList.add('card-in'), 160 + i * 110);
                });
            }
            if (pTeam <= 0.02) {
                team.classList.remove('in-view');
                teamCardRefs.current.forEach(el => el?.classList.remove('card-in'));
            }

            if (pVision > 0.18 && !vision.classList.contains('in-view')) vision.classList.add('in-view');
            if (pVision <= 0.02) vision.classList.remove('in-view');

            if (pTest > 0.18 && !testimonials.classList.contains('in-view')) testimonials.classList.add('in-view');
            if (pTest <= 0.02) testimonials.classList.remove('in-view');
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

        const ctaObs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                setCtaInView(true);
                const duration = 1800;
                const ease = (t: number) => 1 - Math.pow(1 - t, 3);
                const targets = { deals: 850, exp: 12, sat: 98, rating: 49 };
                let start: number | null = null;
                const animate = (ts: number) => {
                    if (!start) start = ts;
                    const p = ease(Math.min((ts - start) / duration, 1));
                    setCtaCounters({
                        deals: Math.floor(targets.deals * p),
                        exp: Math.floor(targets.exp * p),
                        sat: Math.floor(targets.sat * p),
                        rating: Math.floor(targets.rating * p),
                    });
                    if (p < 1) requestAnimationFrame(animate);
                    else setCtaCounters(targets);
                };
                requestAnimationFrame(animate);
                ctaObs.disconnect();
            }
        }, { threshold: 0.25 });
        if (ctaRef.current) ctaObs.observe(ctaRef.current);

        return () => {
            clearTimeout(t);
            ceoObs.disconnect();
            whoObs.disconnect();
            ctaObs.disconnect();
            window.removeEventListener('scroll', onScroll1);
            window.removeEventListener('scroll', onScroll2);
        };
    }, []);

    useEffect(() => {
        const grid = teamGridRef.current;
        if (!grid) return;
        const onCarouselScroll = () => {
            const cardWidth = grid.scrollWidth / 4;
            const idx = Math.round(grid.scrollLeft / cardWidth);
            setActiveDot(Math.min(3, Math.max(0, idx)));
        };
        grid.addEventListener('scroll', onCarouselScroll, { passive: true });
        return () => grid.removeEventListener('scroll', onCarouselScroll);
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

    const team = [
        {
            name: 'Mohammed Al Areeq',
            role: 'Founder & CEO',
            specialty: 'Luxury Residential',
            deals: '340+',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=85',
            langs: ['Arabic', 'English'],
        },
        {
            name: 'Sara Al Mansouri',
            role: 'Senior Property Advisor',
            specialty: 'Off-Plan & Investment',
            deals: '180+',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=85',
            langs: ['Arabic', 'English', 'French'],
        },
        {
            name: 'James Harrington',
            role: 'Head of Leasing',
            specialty: 'Commercial & Retail',
            deals: '220+',
            image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=85',
            langs: ['English'],
        },
        {
            name: 'Priya Sharma',
            role: 'Client Relations Lead',
            specialty: 'Expat & Family Homes',
            deals: '150+',
            image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&q=85',
            langs: ['English', 'Hindi'],
        },
    ];

    const svc = serviceDetails[activeService];

    // Photo data for infinite scroll columns
    // Left column scrolls UP, Right column scrolls DOWN
    const leftPhotos = [
        { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=85', h: 180 },
        { src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=85', h: 220 },
        { src: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=85', h: 195 },
        { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=85', h: 205 },
        // duplicated for seamless loop
        { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=85', h: 180 },
        { src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=85', h: 220 },
        { src: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=85', h: 195 },
        { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=85', h: 205 },
    ];

    const rightPhotos = [
        { src: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=85', h: 210 },
        { src: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=300&q=85', h: 175 },
        { src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=85', h: 225 },
        { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=85', h: 190 },
        // duplicated for seamless loop
        { src: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=85', h: 210 },
        { src: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=300&q=85', h: 175 },
        { src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=85', h: 225 },
        { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=85', h: 190 },
    ];

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
        @keyframes panelIn  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideUp  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes stepIn   { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:translateX(0)} }
        @keyframes lineDraw { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes numFlip  { from{opacity:0;transform:translateY(6px) scale(0.8)} to{opacity:1;transform:translateY(0) scale(1)} }

        /* ── Infinite scroll strip animations ── */
        /* Left col scrolls continuously UPWARD */
        @keyframes stripUp {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        /* Right col scrolls continuously DOWNWARD */
        @keyframes stripDown {
          0%   { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }

        /* ─── BLOCK 1: HERO ─── */
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

        /* CEO */
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

        /* ─── BLOCK 2 ─── */
        .who-wrap   { position:relative; height:500vh; }
        .who-sticky { position:sticky; top:0; height:100vh; overflow:hidden; background:#f8f7f4; }

        /* WHO */
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

        /* SERVICES */
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
        .serv-panel-right { display:flex; flex-direction:column; gap:16px; }
        .serv-img-wrap { display:none; }
        .serv-img { width:100%; height:100%; object-fit:cover; display:block; }
        .serv-visual { background:#18181b; border-radius:18px; padding:26px 24px; position:relative; overflow:hidden; box-shadow:0 12px 36px rgba(0,0,0,.16); }
        .serv-visual::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 80% 20%,rgba(255,255,255,.05) 0%,transparent 60%); pointer-events:none; }
        .serv-visual-label { font-size:.63rem; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:rgba(255,255,255,.3); margin-bottom:18px; }
        .serv-step { display:flex; align-items:flex-start; gap:14px; padding:13px 0; border-bottom:1px solid rgba(255,255,255,.07); }
        .serv-step:last-child { border-bottom:none; padding-bottom:0; }
        .serv-step-num { width:26px; height:26px; border-radius:50%; background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.15); color:rgba(255,255,255,.8); display:flex; align-items:center; justify-content:center; font-family:'Outfit',sans-serif; font-size:.7rem; font-weight:900; flex-shrink:0; transition:background .25s, transform .3s cubic-bezier(.34,1.4,.64,1); }
        .serv-step:hover .serv-step-num { background:rgba(255,255,255,.2); transform:scale(1.12); }
        .serv-step-title { font-size:.84rem; font-weight:600; color:rgba(255,255,255,.85); line-height:1.4; }

        /* TEAM */
        .team-section { position:absolute; inset:0; background:#fff; display:flex; align-items:center; justify-content:center; overflow:hidden; transform:translateY(100%); will-change:transform; z-index:20; }
        .team-section::before { content:''; position:absolute; inset:0; background-image:radial-gradient(circle,rgba(0,0,0,.033) 1px,transparent 1px); background-size:28px 28px; pointer-events:none; }
        .team-inner { position:relative; z-index:1; max-width:1040px; width:100%; padding:0 40px; }
        .team-header { margin-bottom:44px; opacity:0; transform:translateY(20px); transition:opacity .7s cubic-bezier(.16,1,.3,1) .1s, transform .7s cubic-bezier(.16,1,.3,1) .1s; }
        .team-section.in-view .team-header { opacity:1; transform:translateY(0); }
        .team-eyebrow { display:inline-flex; align-items:center; gap:8px; margin-bottom:12px; font-size:.67rem; font-weight:700; letter-spacing:.13em; text-transform:uppercase; color:#a1a1aa; }
        .team-eyebrow-line { width:0; height:1.5px; background:#d4d4d8; transition:width .6s cubic-bezier(.16,1,.3,1) .4s; }
        .team-section.in-view .team-eyebrow-line { width:20px; }
        .team-title { font-family:'Outfit',sans-serif; font-size:clamp(1.9rem,3vw,2.6rem); font-weight:900; line-height:1.08; letter-spacing:-.04em; color:#18181b; }
        .team-subtitle { font-size:.93rem; color:#71717a; line-height:1.7; margin-top:10px; max-width:420px; }
        .team-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
        .team-card { background:#fafafa; border:1.5px solid #ebebeb; border-radius:20px; padding:24px 20px 20px; display:flex; flex-direction:column; position:relative; overflow:hidden; opacity:0; transform:translateY(36px); transition:opacity .6s cubic-bezier(.16,1,.3,1), transform .6s cubic-bezier(.16,1,.3,1), border-color .25s, background .25s, box-shadow .25s; }
        .team-card.card-in { opacity:1; transform:translateY(0); }
        .team-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:#18181b; transform:scaleX(0); transform-origin:left; transition:transform .4s cubic-bezier(.16,1,.3,1); }
        .team-card::after { content:''; position:absolute; inset:0; background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,.6) 50%,transparent 60%); transform:translateX(-100%); transition:transform .5s ease; pointer-events:none; }
        .team-card:hover { box-shadow:0 16px 44px rgba(0,0,0,.1); border-color:#d4d4d8; transform:translateY(-6px) !important; }
        .team-card:hover::before { transform:scaleX(1); }
        .team-card:hover::after  { transform:translateX(100%); }
        .team-photo-wrap { width:76px; height:76px; border-radius:50%; overflow:hidden; margin-bottom:16px; border:2px solid #e8e8e8; transition:border-color .25s, transform .35s cubic-bezier(.34,1.4,.64,1); }
        .team-card:hover .team-photo-wrap { border-color:#d4d4d8; transform:scale(1.05); }
        .team-photo-wrap img { width:100%; height:100%; object-fit:cover; object-position:center top; display:block; }
        .team-card-name { font-family:'Outfit',sans-serif; font-size:.97rem; font-weight:800; letter-spacing:-.02em; color:#18181b; margin-bottom:2px; }
        .team-card-role { font-size:.74rem; font-weight:600; color:#a1a1aa; margin-bottom:14px; }
        .team-card-divider { width:100%; height:1px; background:#ebebeb; margin-bottom:13px; }
        .team-card-specialty-label { font-size:.59rem; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:#a1a1aa; margin-bottom:4px; }
        .team-card-specialty { font-size:.82rem; font-weight:600; color:#3f3f46; margin-bottom:16px; }
        .team-card-meta { display:flex; align-items:center; justify-content:space-between; margin-top:auto; }
        .team-card-deals { display:flex; flex-direction:column; gap:1px; }
        .team-card-deals-num { font-family:'Outfit',sans-serif; font-size:1.2rem; font-weight:900; letter-spacing:-.03em; color:#18181b; line-height:1; }
        .team-card-deals-label { font-size:.63rem; font-weight:600; color:#a1a1aa; letter-spacing:.05em; text-transform:uppercase; }
        .team-card-langs { display:flex; flex-wrap:wrap; gap:4px; justify-content:flex-end; max-width:90px; }
        .team-card-lang { font-size:.59rem; font-weight:700; letter-spacing:.03em; padding:3px 7px; border-radius:99px; background:#f0f0f0; border:1px solid #e4e4e7; color:#71717a; transition:background .2s, color .2s; }
        .team-card:hover .team-card-lang { background:#e8e8e8; color:#3f3f46; }
        .team-dots { display:none; }
        .team-swipe-hint { display:none; }

        /* VISION */
        .vision-section { position:absolute; inset:0; background:#f8f7f4; display:flex; align-items:center; justify-content:center; overflow:hidden; transform:translateY(100%); will-change:transform; z-index:30; }
        .vision-section::before { content:''; position:absolute; inset:0; background-image:radial-gradient(circle,rgba(0,0,0,.035) 1px,transparent 1px); background-size:28px 28px; pointer-events:none; }
        .vision-inner { position:relative; z-index:1; max-width:700px; width:100%; padding:0 40px; display:flex; flex-direction:column; align-items:center; }
        .vision-header { text-align:center; margin-bottom:44px; width:100%; opacity:0; transform:translateY(18px); transition:opacity .65s cubic-bezier(.16,1,.3,1) .05s, transform .65s cubic-bezier(.16,1,.3,1) .05s; }
        .vision-section.in-view .vision-header { opacity:1; transform:translateY(0); }
        .vision-eyebrow { display:inline-flex; align-items:center; gap:8px; margin-bottom:12px; font-size:.65rem; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:#a1a1aa; }
        .vision-eyebrow-line { width:20px; height:1.5px; background:#d4d4d8; }
        .vision-heading { font-family:'Outfit',sans-serif; font-size:clamp(2rem,3.2vw,2.6rem); font-weight:900; line-height:1.08; letter-spacing:-.04em; color:#18181b; }
        .vision-heading em { font-style:normal; background:linear-gradient(120deg,#18181b 0%,#52525b 100%); -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; }
        .vision-sub { font-size:.92rem; color:#71717a; line-height:1.75; margin-top:10px; }
        .vision-carousel { width:100%; position:relative; opacity:0; transform:translateY(24px); transition:opacity .65s cubic-bezier(.16,1,.3,1) .2s, transform .65s cubic-bezier(.16,1,.3,1) .2s; }
        .vision-section.in-view .vision-carousel { opacity:1; transform:translateY(0); }
        .vision-track-wrap { width:100%; overflow:hidden; border-radius:24px; }
        .vision-track { display:flex; transition:transform .52s cubic-bezier(.77,0,.18,1); will-change:transform; }
        .vision-card { flex:0 0 100%; width:100%; background:#fff; border:1.5px solid #ebebeb; border-radius:24px; padding:44px 44px 40px; position:relative; overflow:hidden; box-sizing:border-box; transition:box-shadow .3s; }
        .vision-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:#18181b; transform:scaleX(0); transform-origin:left; transition:transform .5s cubic-bezier(.16,1,.3,1); }
        .vision-section.in-view .vision-card::before { transform:scaleX(1); transition-delay:.55s; }
        .vision-card.vision-card--dark { background:#18181b; border-color:#18181b; }
        .vision-card--dark::before { background:rgba(255,255,255,.15); }
        .vision-card-icon { width:50px; height:50px; border-radius:14px; background:#f4f4f5; display:flex; align-items:center; justify-content:center; color:#18181b; margin-bottom:26px; }
        .vision-card--dark .vision-card-icon { background:rgba(255,255,255,.1); color:#fff; }
        .vision-card-tag { display:inline-flex; align-items:center; gap:5px; font-size:.6rem; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:#a1a1aa; background:#f4f4f5; border:1px solid #ebebeb; padding:4px 11px; border-radius:99px; margin-bottom:18px; }
        .vision-card--dark .vision-card-tag { color:rgba(255,255,255,.4); background:rgba(255,255,255,.08); border-color:rgba(255,255,255,.12); }
        .vision-card-tag-dot { width:5px; height:5px; border-radius:50%; background:#18181b; flex-shrink:0; }
        .vision-card--dark .vision-card-tag-dot { background:rgba(255,255,255,.5); }
        .vision-card-title { font-family:'Outfit',sans-serif; font-size:1.55rem; font-weight:900; letter-spacing:-.035em; color:#18181b; margin-bottom:14px; line-height:1.15; }
        .vision-card--dark .vision-card-title { color:#fff; }
        .vision-card-body { font-size:.94rem; color:#52525b; line-height:1.82; margin-bottom:30px; }
        .vision-card--dark .vision-card-body { color:rgba(255,255,255,.5); }
        .vision-card-pills { display:flex; flex-wrap:wrap; gap:8px; }
        .vision-pill { font-size:.72rem; font-weight:600; color:#3f3f46; background:#f4f4f5; border:1px solid #e4e4e7; padding:5px 13px; border-radius:99px; }
        .vision-card--dark .vision-pill { color:rgba(255,255,255,.6); background:rgba(255,255,255,.08); border-color:rgba(255,255,255,.1); }
        .vision-nav { display:flex; align-items:center; justify-content:space-between; width:100%; margin-top:28px; }
        .vision-nav-dots { display:flex; gap:7px; }
        .vision-nav-dot { width:7px; height:7px; border-radius:50%; background:#d4d4d8; border:none; padding:0; cursor:pointer; transition:background .25s, transform .25s; }
        .vision-nav-dot.active { background:#18181b; transform:scale(1.25); }
        .vision-nav-arrows { display:flex; gap:10px; }
        .vision-arrow { width:42px; height:42px; border-radius:50%; background:#fff; border:1.5px solid #e4e4e7; display:flex; align-items:center; justify-content:center; cursor:pointer; color:#18181b; transition:background .22s, border-color .22s, transform .22s cubic-bezier(.34,1.4,.64,1), box-shadow .22s; box-shadow:0 2px 8px rgba(0,0,0,.06); }
        .vision-arrow:hover { background:#18181b; color:#fff; border-color:#18181b; transform:scale(1.08); box-shadow:0 6px 20px rgba(0,0,0,.18); }
        .vision-arrow:disabled { opacity:.3; cursor:default; pointer-events:none; }
        .vision-nav-label { font-size:.72rem; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:#a1a1aa; }

        /* ══════════════════════════════════════════════════════
           TESTIMONIALS — infinite scroll columns + big card slider
        ══════════════════════════════════════════════════════ */
        .test-section {
          position: absolute; inset: 0;
          background: #fafafa;
          display: flex;
          flex-direction: row;
          align-items: stretch;
          overflow: hidden;
          transform: translateY(100%);
          will-change: transform;
          z-index: 40;
        }
        .test-section::before {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(0,0,0,.028) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none; z-index: 0;
        }

        /* ── Infinite scroll photo columns ── */
        .test-col {
          width: 160px; flex-shrink: 0; overflow: hidden; position: relative;
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%);
          mask-image: linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%);
          opacity: 0; transition: opacity .9s cubic-bezier(.16,1,.3,1);
        }
        .test-section.in-view .test-col { opacity: 1; }
        .test-col--left  { transition-delay: .1s; }
        .test-col--right { transition-delay: .28s; }
        .test-strip { display: flex; flex-direction: column; gap: 10px; padding: 0 10px 0 0; will-change: transform; }
        .test-col--right .test-strip { padding: 0 0 0 10px; }
        .test-strip--up   { animation: stripUp   30s linear infinite; }
        .test-strip--down { animation: stripDown 26s linear infinite; }
        .test-col:hover .test-strip { animation-play-state: paused; }
        .test-strip-photo { width: 100%; border-radius: 14px; overflow: hidden; flex-shrink: 0; box-shadow: 0 4px 16px rgba(0,0,0,.09); border: 1.5px solid #ebebeb; background: #f0f0f0; }
        .test-strip-photo img { width: 100%; display: block; object-fit: cover; object-position: center top; }

        /* ── Center panel ── */
        .test-center {
          flex: 1; position: relative; z-index: 2;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 40px 36px; min-width: 0; overflow: hidden;
        }

        /* Header */
        .test-badge {
          display: inline-flex; align-items: center; gap: 7px;
          background: #fff; border: 1.5px solid #e4e4e7;
          padding: 5px 14px; border-radius: 99px; margin-bottom: 14px;
          font-size: .62rem; font-weight: 700; letter-spacing: .12em;
          text-transform: uppercase; color: #71717a;
          opacity: 0; transform: translateY(14px);
          transition: opacity .6s cubic-bezier(.16,1,.3,1) .12s, transform .6s cubic-bezier(.16,1,.3,1) .12s;
        }
        .test-section.in-view .test-badge { opacity: 1; transform: translateY(0); }
        .test-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #18181b; flex-shrink: 0; }

        .test-heading {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(1.6rem, 2.6vw, 2.4rem);
          font-weight: 900; line-height: 1.08; letter-spacing: -.04em; color: #18181b;
          text-align: center; margin-bottom: 6px;
          opacity: 0; transform: translateY(16px);
          transition: opacity .65s cubic-bezier(.16,1,.3,1) .22s, transform .65s cubic-bezier(.16,1,.3,1) .22s;
        }
        .test-heading-muted { color: #a1a1aa; font-weight: 800; }
        .test-section.in-view .test-heading { opacity: 1; transform: translateY(0); }

        .test-sub {
          font-size: .84rem; color: #71717a; line-height: 1.7; text-align: center;
          margin-bottom: 28px; max-width: 360px;
          opacity: 0; transform: translateY(12px);
          transition: opacity .6s cubic-bezier(.16,1,.3,1) .3s, transform .6s cubic-bezier(.16,1,.3,1) .3s;
        }
        .test-section.in-view .test-sub { opacity: 1; transform: translateY(0); }

        /* ── Big review slider ── */
        .trev-slider {
          width: 100%; max-width: 540px;
          opacity: 0; transform: translateY(20px);
          transition: opacity .7s cubic-bezier(.16,1,.3,1) .4s, transform .7s cubic-bezier(.16,1,.3,1) .4s;
        }
        .test-section.in-view .trev-slider { opacity: 1; transform: translateY(0); }

        .trev-track-wrap { width: 100%; overflow: hidden; border-radius: 24px; }
        .trev-track { display: flex; transition: transform .52s cubic-bezier(.77,0,.18,1); will-change: transform; }

        .trev-card {
          flex: 0 0 100%; width: 100%;
          background: #fff;
          border: 1.5px solid #ebebeb;
          border-radius: 24px;
          padding: 36px 36px 30px;
          display: flex; flex-direction: column; gap: 20px;
          position: relative; overflow: hidden;
          box-sizing: border-box;
        }
        /* Top accent bar */
        .trev-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: #18181b; border-radius: 24px 24px 0 0;
          transform: scaleX(0); transform-origin: left;
          transition: transform .5s cubic-bezier(.16,1,.3,1);
        }
        .test-section.in-view .trev-card::before { transform: scaleX(1); transition-delay: .65s; }
        /* Big decorative quote mark */
        .trev-card::after {
          content: '\u201C';
          position: absolute; top: -10px; right: 24px;
          font-family: 'Outfit', sans-serif; font-size: 8rem; font-weight: 900;
          color: #f0f0f0; line-height: 1; pointer-events: none; user-select: none;
        }

        .trev-stars { display: flex; gap: 4px; }
        .trev-star { width: 14px; height: 14px; fill: #18181b; flex-shrink: 0; }

        .trev-quote {
          font-size: 1.05rem; color: #27272a; line-height: 1.8;
          font-style: italic; position: relative; z-index: 1; margin: 0; flex: 1;
        }

        .trev-author {
          display: flex; align-items: center; gap: 14px;
          border-top: 1px solid #f0f0f0; padding-top: 18px;
          position: relative; z-index: 1;
        }
        .trev-avatar {
          width: 52px; height: 52px; border-radius: 50%; overflow: hidden;
          border: 2px solid #e4e4e7; flex-shrink: 0; background: #f0f0f0;
        }
        .trev-avatar img { width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block; }
        .trev-author-info { display: flex; flex-direction: column; gap: 3px; }
        .trev-name { font-family: 'Outfit', sans-serif; font-size: .95rem; font-weight: 800; color: #18181b; letter-spacing: -.01em; }
        .trev-loc { display: flex; align-items: center; gap: 4px; font-size: .74rem; color: #a1a1aa; font-weight: 500; }
        .trev-loc svg { width: 10px; height: 10px; stroke: #a1a1aa; stroke-width: 2; fill: none; flex-shrink: 0; }

        /* ── Slider navigation ── */
        .trev-nav {
          display: flex; align-items: center; justify-content: space-between;
          width: 100%; max-width: 540px; margin-top: 18px;
        }
        .trev-nav-dots { display: flex; gap: 7px; }
        .trev-nav-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #d4d4d8; border: none; padding: 0; cursor: pointer;
          transition: background .25s, transform .25s;
        }
        .trev-nav-dot.active { background: #18181b; transform: scale(1.3); }
        .trev-nav-counter { font-family: 'Outfit', sans-serif; font-size: .78rem; font-weight: 700; color: #a1a1aa; letter-spacing: .04em; }
        .trev-nav-arrows { display: flex; gap: 8px; }
        .trev-arrow {
          width: 40px; height: 40px; border-radius: 50%;
          border: 1.5px solid #e4e4e7; background: #fff;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #18181b;
          transition: background .2s, border-color .2s, transform .22s cubic-bezier(.34,1.4,.64,1), box-shadow .2s;
        }
        .trev-arrow:hover:not(:disabled) { background: #18181b; border-color: #18181b; color: #fff; transform: scale(1.08); box-shadow: 0 6px 18px rgba(0,0,0,.18); }
        .trev-arrow:disabled { opacity: .3; cursor: not-allowed; }
        .trev-arrow svg { stroke: currentColor; }

        /* ══════════════════════════════════════════════════════
           CTA SECTION
        ══════════════════════════════════════════════════════ */
        .cta-section {
          background: #18181b;
          min-height: 100vh;
          display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden;
          padding: 100px 40px 80px;
        }
        .cta-section::before {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,.04) 1px, transparent 1px);
          background-size: 32px 32px; pointer-events: none;
        }
        .cta-section::after {
          content: 'AL AREEQ';
          position: absolute; bottom: -40px; left: 50%; transform: translateX(-50%);
          font-family: 'Outfit', sans-serif; font-size: clamp(5rem, 14vw, 13rem);
          font-weight: 900; letter-spacing: -.04em;
          color: rgba(255,255,255,.03); white-space: nowrap; pointer-events: none;
          user-select: none; line-height: 1;
        }
        .cta-inner {
          position: relative; z-index: 1;
          display: flex; flex-direction: column; align-items: center;
          text-align: center; max-width: 720px; width: 100%;
        }
        .cta-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.12);
          padding: 6px 16px; border-radius: 99px; margin-bottom: 28px;
          font-size: .65rem; font-weight: 700; letter-spacing: .14em;
          text-transform: uppercase; color: rgba(255,255,255,.45);
        }
        .cta-eyebrow-dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(255,255,255,.4); }
        .cta-heading {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(2.4rem, 5.5vw, 4.5rem);
          font-weight: 900; line-height: 1.04; letter-spacing: -.045em;
          color: #fff; margin-bottom: 20px;
        }
        .cta-heading em { font-style: normal; color: rgba(255,255,255,.35); }
        .cta-sub {
          font-size: 1rem; color: rgba(255,255,255,.45); line-height: 1.75;
          max-width: 420px; margin-bottom: 44px;
        }
        /* Buttons — always horizontal */
        .cta-buttons {
          display: flex; gap: 14px; flex-direction: row;
          justify-content: center; flex-wrap: wrap; width: 100%;
        }
        .cta-btn-primary {
          display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          background: #fff; color: #18181b;
          padding: 15px 32px; border-radius: 99px;
          font-family: 'Outfit', sans-serif; font-size: .95rem; font-weight: 800;
          text-decoration: none; border: none; cursor: pointer;
          box-shadow: 0 4px 24px rgba(255,255,255,.15);
          transition: transform .25s cubic-bezier(.34,1.4,.64,1), box-shadow .25s;
          white-space: nowrap;
        }
        .cta-btn-primary:hover { transform: translateY(-3px) scale(1.03); box-shadow: 0 14px 40px rgba(255,255,255,.22); }
        .cta-btn-primary svg { flex-shrink: 0; transition: transform .22s cubic-bezier(.34,1.4,.64,1); }
        .cta-btn-primary:hover svg { transform: translateX(3px); }
        .cta-btn-secondary {
          display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          background: transparent; color: rgba(255,255,255,.8);
          padding: 15px 32px; border-radius: 99px;
          font-family: 'Outfit', sans-serif; font-size: .95rem; font-weight: 700;
          text-decoration: none; border: 1.5px solid rgba(255,255,255,.2); cursor: pointer;
          transition: all .25s cubic-bezier(.34,1.2,.64,1);
          white-space: nowrap;
        }
        .cta-btn-secondary:hover { border-color: rgba(255,255,255,.6); color: #fff; transform: translateY(-3px); background: rgba(255,255,255,.06); }
        .cta-btn-secondary svg { flex-shrink: 0; transition: transform .22s cubic-bezier(.34,1.4,.64,1); }
        .cta-btn-secondary:hover svg { transform: translateX(3px); }

        /* Stats row */
        .cta-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          width: 100%;
          margin-top: 64px;
          padding-top: 40px;
          border-top: 1px solid rgba(255,255,255,.1);
        }
        .cta-stat {
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          padding: 0 16px;
          border-right: 1px solid rgba(255,255,255,.08);
        }
        .cta-stat:last-child { border-right: none; }
        .cta-stat-num {
          font-family: 'Outfit', sans-serif; font-size: 2.4rem; font-weight: 900;
          letter-spacing: -.04em; color: #fff; line-height: 1;
          transition: all .3s;
        }
        .cta-stat-label {
          font-size: .68rem; font-weight: 600; color: rgba(255,255,255,.32);
          letter-spacing: .09em; text-transform: uppercase; text-align: center;
          line-height: 1.4;
        }

        /* Mobile CTA overrides */
        @media (max-width: 640px) {
          .cta-section { padding: 72px 22px 64px; }
          .cta-heading { font-size: 2rem; }
          .cta-sub { font-size: .88rem; margin-bottom: 32px; }
          /* Buttons stay horizontal on mobile but may wrap */
          .cta-buttons { gap: 10px; }
          .cta-btn-primary, .cta-btn-secondary { padding: 13px 22px; font-size: .85rem; }
          /* Stats: 2x2 grid on mobile */
          .cta-stats { grid-template-columns: 1fr 1fr; gap: 28px 0; margin-top: 44px; padding-top: 32px; }
          .cta-stat { border-right: none; padding: 0 8px; }
          .cta-stat:nth-child(1), .cta-stat:nth-child(2) { border-bottom: 1px solid rgba(255,255,255,.08); padding-bottom: 24px; }
          .cta-stat:nth-child(3), .cta-stat:nth-child(4) { padding-top: 24px; }
          .cta-stat-num { font-size: 1.8rem; }
          .cta-stat-label { font-size: .62rem; }
        }

        /* ══════════════════════════════════════════════════════
           FOOTER
        ══════════════════════════════════════════════════════ */
        .about-footer { background: #111; color: #fff; padding: 4rem 6% 2rem; }
        .about-footer-cta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem; padding-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,.08); flex-wrap: wrap; gap: 1.5rem; }
        .about-footer-cta h2 { font-family: 'Outfit', sans-serif; font-size: 1.6rem; font-weight: 700; letter-spacing: -.02em; }
        .about-footer-cta-buttons { display: flex; gap: 1rem; flex-wrap: wrap; }
        .about-footer-btn-primary { background: #fff; color: #111; padding: .7rem 1.4rem; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: .9rem; font-family: 'Outfit', sans-serif; transition: opacity .2s; }
        .about-footer-btn-primary:hover { opacity: .85; }
        .about-footer-btn-outline { border: 1px solid rgba(255,255,255,.3); padding: .7rem 1.4rem; border-radius: 8px; color: #fff; text-decoration: none; font-size: .9rem; font-family: 'Outfit', sans-serif; transition: border-color .2s; }
        .about-footer-btn-outline:hover { border-color: rgba(255,255,255,.7); }
        .about-footer-main { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; margin-bottom: 2.5rem; }
        .about-footer-brand h3 { font-family: 'Outfit', sans-serif; font-size: 1.3rem; font-weight: 800; margin-bottom: 1rem; letter-spacing: -.02em; }
        .about-footer-brand p { color: rgba(255,255,255,.45); font-size: .88rem; line-height: 1.65; max-width: 300px; }
        .about-footer-main h4 { font-size: .75rem; margin-bottom: 1rem; color: rgba(255,255,255,.4); text-transform: uppercase; letter-spacing: .1em; font-weight: 700; }
        .about-footer-main ul { list-style: none; padding: 0; }
        .about-footer-main ul li { margin-bottom: .55rem; }
        .about-footer-main ul li a { color: rgba(255,255,255,.5); text-decoration: none; font-size: .88rem; transition: color .2s; }
        .about-footer-main ul li a:hover { color: #fff; }
        .about-footer-bottom { border-top: 1px solid rgba(255,255,255,.08); padding-top: 1.5rem; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
        .about-footer-bottom p, .about-footer-legal a { font-size: .78rem; color: rgba(255,255,255,.35); text-decoration: none; }
        .about-footer-legal { display: flex; gap: 1.5rem; }
        .about-footer-legal a:hover { color: rgba(255,255,255,.7); }

        @media (max-width: 860px) {
          .about-footer-main { grid-template-columns: 1fr 1fr; gap: 2rem; }
        }
        @media (max-width: 560px) {
          .about-footer { padding: 3rem 5% 2rem; text-align: center; }
          .about-footer-cta { flex-direction: column; align-items: center; text-align: center; }
          .about-footer-cta h2 { font-size: 1.3rem; }
          .about-footer-main { grid-template-columns: 1fr; gap: 1.75rem; text-align: center; }
          .about-footer-brand p { max-width: 100%; margin: 0 auto; }
          .about-footer-bottom { flex-direction: column; align-items: center; }
          .about-footer-legal { justify-content: center; }
        }

        /* ─── MOBILE ─── */
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
          .serv-section { overflow-y:auto; overflow-x:hidden; -webkit-overflow-scrolling:touch; align-items:flex-start; }
          .serv-inner { padding:28px 20px 48px; width:100%; display:flex; flex-direction:column; align-items:center; text-align:center; }
          .serv-header { margin-bottom:18px; width:100%; }
          .serv-eyebrow { display:none; }
          .serv-title { font-size:1.35rem; letter-spacing:-.03em; }
          .serv-subtitle { font-size:.82rem; max-width:100%; margin-top:5px; line-height:1.6; }
          .serv-title::after { content:''; display:block; height:2.5px; width:36px; background:#18181b; border-radius:2px; margin:8px auto 0; animation:lineDraw .6s cubic-bezier(.16,1,.3,1) .2s both; transform-origin:left; }
          .serv-tabs-wrap { justify-content:center; margin-bottom:22px; width:100%; }
          .serv-tabs { display:flex; flex-wrap:nowrap; gap:4px; padding:4px; border-radius:12px; width:100%; }
          .serv-tab { flex:1; padding:8px 2px; font-size:.69rem; border-radius:9px; white-space:nowrap; text-align:center; }
          .serv-panel { grid-template-columns:1fr; gap:16px; width:100%; opacity:0; animation:slideUp .35s cubic-bezier(.16,1,.3,1) .04s forwards; }
          .serv-panel > div:first-child { display:flex; flex-direction:column; align-items:center; }
          .serv-panel-category-label { display:none; }
          .serv-panel-right { display:none; }
          .serv-img-wrap-mobile { display:block; width:100%; border-radius:14px; overflow:hidden; aspect-ratio:16/9; margin-top:18px; margin-bottom:4px; box-shadow:0 10px 32px rgba(0,0,0,.13); }
          .serv-img-wrap-mobile .serv-img { width:100%; height:100%; object-fit:cover; display:block; }
          .serv-panel-headline { font-size:1.2rem; margin-bottom:8px; line-height:1.2; }
          .serv-panel-body { font-size:.875rem; line-height:1.65; margin-bottom:0; }
          .serv-groups { display:none; }
          .serv-ctas { display:none; }
          .serv-ctas-mobile { display:flex; flex-direction:column; gap:10px; width:100%; margin-top:18px; }
          .serv-ctas-mobile .serv-btn-primary, .serv-ctas-mobile .serv-btn-secondary { width:100%; justify-content:center; padding:13px 16px; border-radius:12px; }
          .serv-visual { padding:20px 18px 16px; border-radius:18px; text-align:left; }
          .serv-visual-label { margin-bottom:14px; text-align:center; }
          .serv-step { padding:11px 0; gap:13px; }
          .serv-step-num { width:26px; height:26px; font-size:.7rem; }
          .serv-step-title { font-size:.84rem; line-height:1.4; }
          .team-section { overflow-y:auto; overflow-x:hidden; -webkit-overflow-scrolling:touch; align-items:flex-start; }
          .team-inner { padding:56px 0 48px; display:flex; flex-direction:column; align-items:center; }
          .team-header { margin-bottom:28px; padding:0 24px; text-align:center; width:100%; }
          .team-eyebrow { justify-content:center; }
          .team-title { font-size:1.6rem; text-align:center; }
          .team-subtitle { font-size:.82rem; max-width:280px; text-align:center; margin:8px auto 0; }
          .team-grid { display:flex; flex-direction:row; grid-template-columns:unset; gap:0; width:100%; overflow-x:scroll; overflow-y:visible; -webkit-overflow-scrolling:touch; scroll-snap-type:x mandatory; scroll-behavior:smooth; padding:8px 24px 16px; scrollbar-width:none; -ms-overflow-style:none; }
          .team-grid::-webkit-scrollbar { display:none; }
          .team-card { flex:0 0 72vw; max-width:300px; min-width:220px; scroll-snap-align:center; margin-right:14px; padding:24px 20px 20px; border-radius:20px; display:flex; flex-direction:column; align-items:center; text-align:center; }
          .team-card:last-child { margin-right:24px; }
          .team-photo-wrap { width:80px; height:80px; margin:0 auto 16px; }
          .team-card-name { font-size:.97rem; text-align:center; }
          .team-card-role { font-size:.74rem; text-align:center; margin-bottom:14px; }
          .team-card-divider { width:100%; }
          .team-card-specialty-label { text-align:center; }
          .team-card-specialty { font-size:.82rem; text-align:center; margin-bottom:16px; }
          .team-card-meta { flex-direction:column; align-items:center; gap:10px; width:100%; }
          .team-card-deals { align-items:center; }
          .team-card-langs { max-width:100%; justify-content:center; }
          .team-dots { display:flex; gap:6px; justify-content:center; margin-top:4px; }
          .team-dot { width:6px; height:6px; border-radius:50%; background:#d4d4d8; transition:background .2s, transform .2s; flex-shrink:0; }
          .team-dot.active { background:#18181b; transform:scale(1.3); }
          .team-swipe-hint { display:flex; align-items:center; gap:6px; font-size:.68rem; font-weight:600; color:#a1a1aa; letter-spacing:.06em; text-transform:uppercase; margin-bottom:16px; }
          .team-swipe-hint svg { opacity:.5; }

          /* ── Testimonials mobile ── */
          .test-col { display: none; }
          .test-center { padding: 32px 18px 40px; justify-content: center; }
          .test-heading { font-size: 1.6rem; }
          .trev-card { padding: 24px 22px 20px; }
          .trev-card::after { font-size: 5.5rem; }
          .trev-quote { font-size: .9rem; }
          .trev-avatar { width: 42px; height: 42px; }
          .trev-name { font-size: .85rem; }
          .trev-nav { max-width: 100%; }
        }

        @media (max-width:640px) {
          .vision-section { overflow-y:auto; overflow-x:hidden; -webkit-overflow-scrolling:touch; align-items:flex-start; }
          .vision-inner { padding:36px 20px 52px; }
          .vision-header { margin-bottom:28px; }
          .vision-heading { font-size:1.6rem; }
          .vision-sub { font-size:.82rem; }
          .vision-card { padding:28px 22px 26px; border-radius:18px; }
          .vision-card-icon { width:42px; height:42px; border-radius:11px; margin-bottom:18px; }
          .vision-card-title { font-size:1.2rem; }
          .vision-card-body { font-size:.87rem; margin-bottom:22px; }
          .vision-track-wrap { border-radius:18px; }
          .vision-nav { margin-top:22px; }
          .vision-arrow { width:38px; height:38px; }
        }

        @media (min-width:641px) and (max-width:1024px) {
          .desktop-layout { grid-template-columns:130px 320px 130px; gap:0 48px; }
          .photo-item,.photo-circle { width:118px; height:118px; }
          .photo-item::before { width:144px; height:144px; }
          .photo-item::after  { width:170px; height:170px; }
          .heading { font-size:2.6rem; }
          .who-top { gap:40px; }
          .serv-panel { gap:36px; }
          .team-grid { grid-template-columns:repeat(2,1fr); gap:16px; }
          /* Testimonials tablet: narrower columns */
          .test-col { width: 120px; }
          .trev-slider { max-width: 420px; }
        }
      `}</style>

            <Navbar />

            {/* BLOCK 1 */}
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

            {/* BLOCK 2 */}
            <div className="who-wrap" ref={whoWrapRef} id="team">
                <div className="who-sticky">

                    {/* Layer 0 — Who We Are */}
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

                    {/* Layer 1 — Services */}
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
                                                        <div key={ii} className="serv-group-item"><div className="serv-group-dot" />{item}</div>
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
                                    <div className="serv-img-wrap-mobile"><img src={svc.image} alt={svc.headline} className="serv-img" /></div>
                                    <div className="serv-ctas-mobile">
                                        <a href={svc.cta1.href} className="serv-btn-primary">{svc.cta1.label} <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg></a>
                                        <a href={svc.cta2.href} className="serv-btn-secondary">{svc.cta2.label}</a>
                                    </div>
                                </div>
                                <div className="serv-panel-right">
                                    <div className="serv-img-wrap"><img src={svc.image} alt={svc.headline} className="serv-img" /></div>
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

                    {/* Layer 2 — Team */}
                    <section className="team-section" ref={teamRef}>
                        <div className="team-inner">
                            <div className="team-header">
                                <div className="team-eyebrow">
                                    <div className="team-eyebrow-line" />
                                    The People Behind Every Deal
                                    <div className="team-eyebrow-line" />
                                </div>
                                <h2 className="team-title">Meet our team.</h2>
                                <p className="team-subtitle">Specialists across every segment of Dubai real estate — residential, commercial, and beyond.</p>
                            </div>
                            <div className="team-swipe-hint">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
                                swipe
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </div>
                            <div className="team-grid" ref={teamGridRef}>
                                {team.map((member, i) => (
                                    <div key={i} className="team-card" ref={el => { if (el) teamCardRefs.current[i] = el; }}>
                                        <div className="team-photo-wrap"><img src={member.image} alt={member.name} /></div>
                                        <div className="team-card-name">{member.name}</div>
                                        <div className="team-card-role">{member.role}</div>
                                        <div className="team-card-divider" />
                                        <div className="team-card-specialty-label">Speciality</div>
                                        <div className="team-card-specialty">{member.specialty}</div>
                                        <div className="team-card-meta">
                                            <div className="team-card-deals">
                                                <div className="team-card-deals-num">{member.deals}</div>
                                                <div className="team-card-deals-label">Deals closed</div>
                                            </div>
                                            <div className="team-card-langs">
                                                {member.langs.map((lang, li) => (
                                                    <span key={li} className="team-card-lang">{lang}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="team-dots">
                                {team.map((_, i) => (
                                    <div key={i} className={`team-dot${activeDot === i ? ' active' : ''}`} />
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Layer 3 — Vision & Mission */}
                    <section className="vision-section" ref={visionRef}>
                        <div className="vision-inner">
                            <div className="vision-header">
                                <div className="vision-eyebrow">
                                    <div className="vision-eyebrow-line" />
                                    Our Purpose
                                    <div className="vision-eyebrow-line" />
                                </div>
                                <h2 className="vision-heading">Vision &amp; <em>Mission.</em></h2>
                                <p className="vision-sub">Two sides of the same promise — where we stand today, and where we&#39;re taking our clients tomorrow.</p>
                            </div>
                            <div className="vision-carousel">
                                <div className="vision-track-wrap">
                                    <div className="vision-track" style={{ transform: `translateX(-${activeVision * 100}%)` }}>
                                        <div className="vision-card">
                                            <div className="vision-card-icon">
                                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>
                                            </div>
                                            <div className="vision-card-tag"><div className="vision-card-tag-dot" />Mission</div>
                                            <div className="vision-card-title">What we do, every single day.</div>
                                            <p className="vision-card-body">We deliver honest, expert guidance to every client — buyers, sellers, and investors alike. No pressure, no gimmicks. Just 12 years of doing the right thing, one deal at a time.</p>
                                            <div className="vision-card-pills">
                                                <span className="vision-pill">Transparent Advice</span>
                                                <span className="vision-pill">Client-First</span>
                                                <span className="vision-pill">RERA Licensed</span>
                                            </div>
                                        </div>
                                        <div className="vision-card vision-card--dark">
                                            <div className="vision-card-icon">
                                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                            </div>
                                            <div className="vision-card-tag"><div className="vision-card-tag-dot" />Vision</div>
                                            <div className="vision-card-title">Where we&#39;re heading.</div>
                                            <p className="vision-card-body">To become Dubai&#39;s most trusted real estate name — not the largest, but the most referred. A firm where every client becomes a lifelong advocate because we never stopped earning their trust.</p>
                                            <div className="vision-card-pills">
                                                <span className="vision-pill">Long-Term Trust</span>
                                                <span className="vision-pill">Built on Referrals</span>
                                                <span className="vision-pill">Dubai &amp; Beyond</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="vision-nav">
                                    <div className="vision-nav-dots">
                                        <button className={`vision-nav-dot${activeVision === 0 ? ' active' : ''}`} onClick={() => setActiveVision(0)} aria-label="Mission" />
                                        <button className={`vision-nav-dot${activeVision === 1 ? ' active' : ''}`} onClick={() => setActiveVision(1)} aria-label="Vision" />
                                    </div>
                                    <div className="vision-nav-label">{activeVision === 0 ? 'Mission' : 'Vision'}</div>
                                    <div className="vision-nav-arrows">
                                        <button className="vision-arrow" onClick={() => setActiveVision(0)} disabled={activeVision === 0} aria-label="Previous">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                                        </button>
                                        <button className="vision-arrow" onClick={() => setActiveVision(1)} disabled={activeVision === 1} aria-label="Next">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ═══════════════════════════════════════════════════
                        Layer 4 — Testimonials: big slider + arrow nav
                    ═══════════════════════════════════════════════════ */}
                    <section className="test-section" ref={testimonialsRef}>

                        {/* LEFT COLUMN — scrolls upward */}
                        <div className="test-col test-col--left">
                            <div className="test-strip test-strip--up">
                                {leftPhotos.map((p, i) => (
                                    <div key={i} className="test-strip-photo" style={{ height: p.h }}>
                                        <img src={p.src} alt="" style={{ height: p.h }} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CENTER */}
                        <div className="test-center">
                            <div className="test-badge"><div className="test-badge-dot" />Client Reviews</div>
                            <h2 className="test-heading">Trusted by clients<br /><span className="test-heading-muted">across Dubai.</span></h2>
                            <p className="test-sub">Every client we&#39;ve worked with came through a referral. Here&#39;s what they say.</p>

                            {/* Big slider */}
                            <div className="trev-slider">
                                <div className="trev-track-wrap">
                                    <div className="trev-track" style={{ transform: `translateX(-${activeReview * 100}%)` }}>

                                        {/* Review 1 */}
                                        <div className="trev-card">
                                            <div className="trev-stars">{[0, 1, 2, 3, 4].map(s => <svg key={s} className="trev-star" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>)}</div>
                                            <p className="trev-quote">"Al Areeq found us our dream villa in under two weeks. Mohammed was honest, never pushy, and negotiated an incredible deal on our behalf. From first call to keys in hand, every step felt effortless. We felt like family, not just clients."</p>
                                            <div className="trev-author">
                                                <div className="trev-avatar"><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=85" alt="Sarah" /></div>
                                                <div className="trev-author-info">
                                                    <div className="trev-name">Sarah &amp; James Mitchell</div>
                                                    <div className="trev-loc"><svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>Dubai Hills, UAE</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Review 2 */}
                                        <div className="trev-card">
                                            <div className="trev-stars">{[0, 1, 2, 3, 4].map(s => <svg key={s} className="trev-star" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>)}</div>
                                            <p className="trev-quote">"As a first-time investor I was nervous about every decision. Sara guided me through every step — market data, contract terms, risk, everything. Transparent, patient, and deeply results-driven. The best financial decision I've made in Dubai."</p>
                                            <div className="trev-author">
                                                <div className="trev-avatar"><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=85" alt="Carlos" /></div>
                                                <div className="trev-author-info">
                                                    <div className="trev-name">Carlos Reyes</div>
                                                    <div className="trev-loc"><svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>Downtown Dubai, UAE</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Review 3 */}
                                        <div className="trev-card">
                                            <div className="trev-stars">{[0, 1, 2, 3, 4].map(s => <svg key={s} className="trev-star" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>)}</div>
                                            <p className="trev-quote">"We relocated from London with two kids and zero knowledge of Dubai. Al Areeq handled everything — school district advice, contract review, neighbourhood walkthroughs, the lot. They went far beyond what any agency would do. Genuinely the best service experience we've ever had."</p>
                                            <div className="trev-author">
                                                <div className="trev-avatar"><img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=85" alt="Priya" /></div>
                                                <div className="trev-author-info">
                                                    <div className="trev-name">Priya &amp; Arjun Shah</div>
                                                    <div className="trev-loc"><svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>Palm Jumeirah, UAE</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Review 4 */}
                                        <div className="trev-card">
                                            <div className="trev-stars">{[0, 1, 2, 3, 4].map(s => <svg key={s} className="trev-star" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>)}</div>
                                            <p className="trev-quote">"I've dealt with agencies across three countries. Al Areeq stands alone. No hard selling, no hidden agendas — just honest professionals who know their market cold. Closed my penthouse in Business Bay in 9 days. Extraordinary."</p>
                                            <div className="trev-author">
                                                <div className="trev-avatar"><img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=85" alt="David" /></div>
                                                <div className="trev-author-info">
                                                    <div className="trev-name">David Okonkwo</div>
                                                    <div className="trev-loc"><svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>Business Bay, UAE</div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                {/* Arrow navigation */}
                                <div className="trev-nav">
                                    <div className="trev-nav-dots">
                                        {[0, 1, 2, 3].map(i => (
                                            <button key={i} className={`trev-nav-dot${activeReview === i ? ' active' : ''}`} onClick={() => setActiveReview(i)} aria-label={`Review ${i + 1}`} />
                                        ))}
                                    </div>
                                    <div className="trev-nav-counter">{activeReview + 1} / 4</div>
                                    <div className="trev-nav-arrows">
                                        <button className="trev-arrow" onClick={() => setActiveReview(r => Math.max(0, r - 1))} disabled={activeReview === 0} aria-label="Previous review">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                                        </button>
                                        <button className="trev-arrow" onClick={() => setActiveReview(r => Math.min(3, r + 1))} disabled={activeReview === 3} aria-label="Next review">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN — scrolls downward */}
                        <div className="test-col test-col--right">
                            <div className="test-strip test-strip--down">
                                {rightPhotos.map((p, i) => (
                                    <div key={i} className="test-strip-photo" style={{ height: p.h }}>
                                        <img src={p.src} alt="" style={{ height: p.h }} />
                                    </div>
                                ))}
                            </div>
                        </div>

                    </section>

                </div>{/* end who-wrap */}
            </div>{/* end outer wrapper */}

            {/* ═══════════════════════════════════════════════════════════
                SECTION 8 — Call To Action
            ═══════════════════════════════════════════════════════════ */}
            <section className="cta-section" ref={ctaRef}>
                <div className="cta-inner">
                    <div className="cta-eyebrow"><div className="cta-eyebrow-dot" />Let&#39;s Get Started</div>
                    <h2 className="cta-heading">
                        Ready to Find Your<br /><em>Dream Property?</em>
                    </h2>
                    <p className="cta-sub">
                        Whether you&#39;re buying, selling, or investing — our team is ready to guide you every step of the way.
                    </p>
                    <div className="cta-buttons">
                        <a href="#contact" className="cta-btn-primary">
                            Contact Us
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </a>
                        <a href="#listings" className="cta-btn-secondary">
                            View Listings
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </a>
                    </div>
                    <div className="cta-stats">
                        <div className="cta-stat">
                            <div className="cta-stat-num">{ctaInView ? ctaCounters.deals : 0}+</div>
                            <div className="cta-stat-label">Deals Closed</div>
                        </div>
                        <div className="cta-stat">
                            <div className="cta-stat-num">{ctaInView ? ctaCounters.exp : 0}yr</div>
                            <div className="cta-stat-label">Experience</div>
                        </div>
                        <div className="cta-stat">
                            <div className="cta-stat-num">{ctaInView ? ctaCounters.sat : 0}%</div>
                            <div className="cta-stat-label">Client Satisfaction</div>
                        </div>
                        <div className="cta-stat">
                            <div className="cta-stat-num">{ctaInView ? (ctaCounters.rating / 10).toFixed(1) : '0.0'}★</div>
                            <div className="cta-stat-label">Average Rating</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                FOOTER
            ═══════════════════════════════════════════════════════════ */}
            <footer className="about-footer">
                <div className="about-footer-cta">
                    <h2>Find your dream home today.</h2>
                    <div className="about-footer-cta-buttons">
                        <a href="/listings" className="about-footer-btn-primary">Browse Listings</a>
                        <a href="/contact" className="about-footer-btn-outline">Contact Agent</a>
                    </div>
                </div>
                <div className="about-footer-main">
                    <div className="about-footer-brand">
                        <h3>Al Areeq</h3>
                        <p>Trusted real estate partner helping families buy, rent and invest in premium Dubai properties since 2012.</p>
                    </div>
                    <div>
                        <h4>Properties</h4>
                        <ul>
                            <li><a href="#">Buy</a></li>
                            <li><a href="#">Rent</a></li>
                            <li><a href="#">Luxury</a></li>
                            <li><a href="#">Off-Plan</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4>Company</h4>
                        <ul>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Agents</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4>Resources</h4>
                        <ul>
                            <li><a href="#">Mortgage Calculator</a></li>
                            <li><a href="#">Market Reports</a></li>
                            <li><a href="#">Area Guides</a></li>
                            <li><a href="#">Blog</a></li>
                        </ul>
                    </div>
                </div>
                <div className="about-footer-bottom">
                    <p>© {new Date().getFullYear()} Al Areeq Real Estate. All rights reserved.</p>
                    <div className="about-footer-legal">
                        <a href="#">Privacy</a>
                        <a href="#">Terms</a>
                        <a href="#">RERA Licensed</a>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default AboutUs;