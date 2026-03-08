'use client';
import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import './globals.css';

const DreamHomes = () => {
  const [searchMode, setSearchMode] = useState('rent');

  // Two separate state values — avoids all DOM manipulation
  const [showLoader, setShowLoader] = useState(true);   // mounts/unmounts the element
  const [loaderOpen, setLoaderOpen] = useState(false);  // triggers CSS slide-out animation

  const [statsInView, setStatsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [listingsInView, setListingsInView] = useState(false);
  const [hasListingsAnimated, setHasListingsAnimated] = useState(false);
  const [aboutInView, setAboutInView] = useState(false);
  const [hasAboutAnimated, setHasAboutAnimated] = useState(false);
  const [counters, setCounters] = useState({ listings: 0, areas: 0, satisfaction: 0, support: 0 });
  const [activeFilter, setActiveFilter] = useState('all');
  const [priceCounters, setPriceCounters] = useState<{ [key: number]: number }>({ 1: 0, 2: 0, 3: 0 });
  const [hasCounterAnimated, setHasCounterAnimated] = useState(false);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const statsRef = useRef<HTMLElement>(null);
  const listingsRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);

  const heroImages = [
    { src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=85', label: 'Beverly Hills Estate', price: '$12,000/mo' },
    { src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85', label: 'Santa Monica Villa', price: '$850,000' },
    { src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85', label: 'Malibu Beach House', price: '$5,200/mo' },
    { src: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=85', label: 'Hollywood Hills Retreat', price: '$1,200,000' },
    { src: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=85', label: 'Bel Air Modern', price: '$18,000/mo' },
  ];

  const advanceSlide = (toIndex: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setPrevSlide(currentSlide);
    setCurrentSlide(toIndex);
    setTimeout(() => { setPrevSlide(null); setIsTransitioning(false); }, 900);
  };

  const startTimer = () => {
    if (carouselTimer.current) clearInterval(carouselTimer.current);
    carouselTimer.current = setInterval(() => {
      setCurrentSlide(prev => {
        const next = (prev + 1) % heroImages.length;
        setPrevSlide(prev);
        setIsTransitioning(true);
        setTimeout(() => { setPrevSlide(null); setIsTransitioning(false); }, 900);
        return next;
      });
    }, 4000);
  };

  useEffect(() => {
    startTimer();
    return () => { if (carouselTimer.current) clearInterval(carouselTimer.current); };
  }, []);

  const triggerHeroAnimations = () => {
    setTimeout(() => {
      (document.querySelector('.hero-decorations') as HTMLElement)?.classList.add('animate');
      (document.querySelector('.hero-left') as HTMLElement)?.classList.add('animate');
      (document.querySelector('.hero-right') as HTMLElement)?.classList.add('animate');
    }, 100);
  };

  // ── Loading screen: show once per browser session ──
  useEffect(() => {
    const alreadyLoaded = sessionStorage.getItem('hasLoaded');

    if (alreadyLoaded) {
      // Return visit — never show loader
      setShowLoader(false);
      triggerHeroAnimations();
    } else {
      // First visit — wait 2.5s, then animate it away, then remove it
      const t1 = setTimeout(() => setLoaderOpen(true), 2500);       // start slide-out CSS
      const t2 = setTimeout(() => {
        setShowLoader(false);                                          // unmount after slide-out
        sessionStorage.setItem('hasLoaded', 'true');
        triggerHeroAnimations();
      }, 3500);                                                        // 2500 + 1000ms transition
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      document.querySelectorAll<HTMLElement>('.decoration-circle').forEach((circle, i) => {
        circle.style.transform = `translateY(${scrolled * (i + 1) * 0.1}px)`;
      });
    };
    window.addEventListener('scroll', handleScroll);

    const statsObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setStatsInView(true); setHasAnimated(true);
        const targets = { listings: 2500, areas: 25, satisfaction: 98, support: 24 };
        let step = 0;
        const timer = setInterval(() => {
          step++;
          const p = step / 60;
          setCounters({ listings: Math.floor(targets.listings * p), areas: Math.floor(targets.areas * p), satisfaction: Math.floor(targets.satisfaction * p), support: Math.floor(targets.support * p) });
          if (step >= 60) { setCounters(targets); clearInterval(timer); }
        }, 2000 / 60);
      }
    }, { threshold: 0.3 });

    const listingsObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasListingsAnimated) { setListingsInView(true); setHasListingsAnimated(true); }
      if (entry.isIntersecting && !hasCounterAnimated) {
        setHasCounterAnimated(true);
        const targets: { [key: number]: number } = { 1: 12000, 2: 850000, 3: 5500 };
        let step = 0;
        const ease = (t: number) => 1 - Math.pow(1 - t, 4);
        const timer = setInterval(() => {
          step++;
          const p = ease(Math.min(step / 60, 1));
          setPriceCounters({ 1: Math.floor(targets[1] * p), 2: Math.floor(targets[2] * p), 3: Math.floor(targets[3] * p) });
          if (step >= 60) { setPriceCounters(targets); clearInterval(timer); }
        }, 1800 / 60);
      }
    }, { threshold: 0.1 });

    const aboutObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAboutAnimated) { setAboutInView(true); setHasAboutAnimated(true); }
    }, { threshold: 0.05 });

    if (statsRef.current) statsObserver.observe(statsRef.current);
    if (listingsRef.current) listingsObserver.observe(listingsRef.current);
    if (aboutRef.current) aboutObserver.observe(aboutRef.current);

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); } });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    setTimeout(() => {
      document.querySelectorAll<HTMLElement>('.reveal, .reveal-left, .reveal-scale').forEach((el, i) => {
        el.style.transitionDelay = (i * 0.04) + 's';
        revealObserver.observe(el);
      });
    }, 300);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const properties = [
    { id: 1, image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80', priceType: 'rent', period: '/mo', location: 'Beverly Hills, CA', beds: 4, baths: 3, area: '3,200', tag: 'Featured', tagColor: '#18181b', priceNum: 12000 },
    { id: 2, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80', priceType: 'sale', period: '', location: 'Santa Monica, CA', beds: 3, baths: 2, area: '2,100', tag: 'New', tagColor: '#22c55e', priceNum: 850000 },
    { id: 3, image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80', priceType: 'rent', period: '/mo', location: 'Downtown LA, CA', beds: 2, baths: 2, area: '1,450', tag: 'Hot', tagColor: '#ef4444', priceNum: 5500 },
  ];

  const filteredProperties = properties.filter(p =>
    activeFilter === 'all' || (activeFilter === 'rent' && p.priceType === 'rent') || (activeFilter === 'sale' && p.priceType === 'sale')
  );

  const formatPrice = (num: number, priceType: string) => {
    if (priceType === 'sale') {
      if (num >= 1000000) { const m = num / 1000000; return '$' + (Number.isInteger(m) ? m : m.toFixed(1)) + 'M'; }
      if (num >= 1000) return '$' + Math.floor(num / 1000) + 'K';
    }
    return '$' + num.toLocaleString();
  };

  const services = [
    { id: 0, icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>, title: 'Real Estate', description: 'Buy, sell, or invest with confidence. We match you to the right property at the right price.' },
    { id: 1, icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>, title: 'Home Maintenance', description: "Year-round care for your property. From routine inspections to urgent repairs." },
    { id: 2, icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>, title: 'Repair & Renovation', description: "Transform any space with our renovation experts. On time, on budget, every time." },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        :root { --gray-50:#fafafa; --gray-100:#f4f4f5; --gray-200:#e4e4e7; --gray-300:#d4d4d8; --gray-400:#a1a1aa; --gray-500:#71717a; --gray-600:#52525b; --gray-700:#3f3f46; --gray-800:#27272a; --gray-900:#18181b; }
        body { font-family:'Inter',-apple-system,sans-serif; background:#fff; overflow-x:hidden; -webkit-font-smoothing:antialiased; }

        /* ── LOADING SCREEN ── */
        .loading-screen { position:fixed; inset:0; z-index:10000; pointer-events:all; }
        .loading-top { position:absolute; top:0; left:0; width:100%; height:50%; background:#18181b; display:flex; justify-content:center; align-items:flex-end; padding-bottom:2.5rem; transition:transform 1s cubic-bezier(0.76,0,0.24,1); }
        .loading-bottom { position:absolute; bottom:0; left:0; width:100%; height:50%; background:#18181b; transition:transform 1s cubic-bezier(0.76,0,0.24,1); }
        .loading-screen.opening .loading-top { transform:translateY(-100%); }
        .loading-screen.opening .loading-bottom { transform:translateY(100%); }
        .loader { display:flex; align-items:center; gap:1rem; }
        .loader-icon { width:56px; height:56px; background:#fff; border-radius:14px; display:flex; align-items:center; justify-content:center; opacity:0; transform:scale(0.7); animation:logoAppear 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.2s forwards; }
        @keyframes logoAppear { to { opacity:1; transform:scale(1); } }
        .loader-text { font-family:'Outfit',sans-serif; font-size:2rem; font-weight:800; color:#fff; letter-spacing:-0.03em; opacity:0; overflow:hidden; white-space:nowrap; width:0; animation:textAppear 0.3s ease 0.9s forwards, typeWriter 0.7s steps(8) 1.2s forwards; }
        @keyframes textAppear { to { opacity:1; } }
        @keyframes typeWriter { to { width:200px; } }
        .loader-text::after { content:'|'; margin-left:2px; animation:blink 0.7s step-end infinite; }
        @keyframes blink { 50% { opacity:0; } }

        /* ── HERO ── */
        .hero { min-height:100vh; display:grid; grid-template-columns:1.1fr 1fr; align-items:center; padding:0 6%; gap:5rem; position:relative; background:linear-gradient(135deg,#f0f4f8 0%,#fff 50%,#fafbfc 100%); overflow:hidden; }
        .hero-decorations { position:absolute; inset:0; z-index:0; pointer-events:none; overflow:hidden; }
        .decoration-circle { position:absolute; border-radius:50%; opacity:0; }
        .hero-decorations.animate .circle-1 { animation:fadeInFloat 1.2s 0.2s forwards; }
        .hero-decorations.animate .circle-2 { animation:fadeInFloat 1.2s 0.4s forwards; }
        .hero-decorations.animate .circle-3 { animation:fadeInFloat 1.2s 0.6s forwards; }
        @keyframes fadeInFloat { to { opacity:0.03; } }
        .circle-1 { width:600px; height:600px; background:var(--gray-900); top:-200px; right:-100px; }
        .circle-2 { width:400px; height:400px; background:var(--gray-700); bottom:-150px; left:-100px; }
        .circle-3 { width:300px; height:300px; background:var(--gray-600); top:50%; left:20%; }
        .decoration-grid { position:absolute; inset:0; background-image:linear-gradient(rgba(0,0,0,0.01) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.01) 1px,transparent 1px); background-size:50px 50px; animation:fadeIn 1s ease forwards; opacity:0; }
        @keyframes fadeIn { to { opacity:1; } }
        .hero-left { position:relative; z-index:1; max-width:640px; }
        .hero-left > * { opacity:0; transform:translateY(30px); }
        .hero-left.animate .trust-badge { animation:fadeInUp 0.6s cubic-bezier(0.4,0,0.2,1) 0.1s forwards; }
        .hero-left.animate .hero-title { animation:fadeInUp 0.8s cubic-bezier(0.4,0,0.2,1) 0.4s forwards; }
        .hero-left.animate .hero-description { animation:fadeInUp 0.6s cubic-bezier(0.4,0,0.2,1) 0.6s forwards; }
        .hero-left.animate .hero-buttons { animation:fadeInUp 0.6s cubic-bezier(0.4,0,0.2,1) 0.9s forwards; }
        .hero-left.animate .search-toggle { animation:fadeInUp 0.7s cubic-bezier(0.4,0,0.2,1) 1s forwards; }
        .hero-left.animate .search-bar { animation:fadeInUp 0.7s cubic-bezier(0.4,0,0.2,1) 1.1s forwards; }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        .trust-badge { display:inline-flex; align-items:center; gap:0.5rem; background:linear-gradient(135deg,#18181b,#27272a); padding:0.5rem 1.25rem; border-radius:50px; margin-bottom:1.5rem; box-shadow:0 4px 16px rgba(0,0,0,0.15); }
        .badge-icon { width:16px; height:16px; background:white; border-radius:50%; display:flex; align-items:center; justify-content:center; }
        .badge-icon::before { content:'✓'; color:#18181b; font-size:10px; font-weight:bold; }
        .badge-text { font-size:0.8125rem; color:white; font-weight:600; }
        .hero-title { font-family:'Outfit',sans-serif; font-size:3.5rem; font-weight:800; line-height:1.15; color:var(--gray-900); margin-bottom:1.5rem; letter-spacing:-0.03em; }
        .hero-title-highlight { background:linear-gradient(135deg,#18181b,#3f3f46); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .hero-description { font-size:1.0625rem; color:var(--gray-600); line-height:1.7; margin-bottom:2.5rem; max-width:480px; }
        .mobile-description { display:none; }
        .hero-buttons { display:flex; margin-bottom:2.5rem; }
        .btn-primary { background:linear-gradient(135deg,#18181b,#27272a); color:#fff; padding:1rem 2.5rem; border-radius:12px; font-size:1rem; font-weight:700; border:none; cursor:pointer; box-shadow:0 4px 16px rgba(0,0,0,0.25); transition:all 0.3s; }
        .btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,0,0,0.3); }
        .search-toggle { display:inline-flex; background:white; border:2px solid var(--gray-200); border-radius:12px; padding:0.375rem; margin-bottom:1.25rem; gap:0.375rem; }
        .toggle-option { padding:0.625rem 1.75rem; border:none; background:transparent; color:var(--gray-600); font-size:0.9375rem; font-weight:700; cursor:pointer; border-radius:8px; transition:all 0.3s; font-family:'Inter',sans-serif; }
        .toggle-option.active { background:linear-gradient(135deg,#18181b,#27272a); color:white; box-shadow:0 2px 8px rgba(0,0,0,0.2); }
        .search-bar { background:#fff; border:1.5px solid var(--gray-200); border-radius:12px; padding:0.625rem; display:grid; grid-template-columns:1fr 1fr 1fr auto; gap:0.75rem; max-width:720px; align-items:center; }
        .search-field { padding:0.875rem 1rem; border:none; background:var(--gray-50); border-radius:8px; display:flex; flex-direction:column; gap:0.375rem; transition:all 0.2s; min-width:0; }
        .search-field:hover { background:var(--gray-100); }
        .search-field-label { font-size:0.6875rem; color:var(--gray-500); text-transform:uppercase; letter-spacing:0.08em; font-weight:600; }
        .search-field select { border:none; background:transparent; font-size:0.875rem; color:var(--gray-900); font-weight:500; outline:none; font-family:'Inter',sans-serif; -webkit-appearance:none; width:100%; }
        .search-button { background:linear-gradient(135deg,#18181b,#27272a); border:none; border-radius:10px; padding:0 2rem; cursor:pointer; display:flex; align-items:center; justify-content:center; min-width:72px; height:100%; min-height:52px; transition:transform 0.2s; }
        .search-button:hover { transform:scale(1.03); }
        .search-icon { width:22px; height:22px; stroke:#fff; stroke-width:2.5; fill:none; }

        /* CAROUSEL */
        .hero-right { position:relative; height:75vh; z-index:1; }
        .hero-right > * { opacity:0; }
        .hero-right.animate .carousel-shell { animation:fadeInScale 0.9s cubic-bezier(0.4,0,0.2,1) 0.5s forwards; }
        .hero-right.animate .floating-badge { animation:fadeInUp 0.6s cubic-bezier(0.4,0,0.2,1) 1.2s forwards; }
        @keyframes fadeInScale { from { opacity:0; transform:scale(0.95) translateY(20px); } to { opacity:1; transform:scale(1) translateY(0); } }
        .carousel-shell { position:absolute; inset:0; border-radius:22px; overflow:hidden; background:#0a0a0a; box-shadow:0 40px 100px rgba(0,0,0,0.22); }
        .carousel-slide { position:absolute; inset:0; opacity:0; z-index:1; transition:opacity 1s cubic-bezier(0.4,0,0.2,1); }
        .carousel-slide.active { opacity:1; z-index:2; }
        .carousel-slide img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
        .carousel-slide.active img { animation:kenBurns 5s cubic-bezier(0.25,0.46,0.45,0.94) both; }
        @keyframes kenBurns { from { transform:scale(1.12) translate(1%,1%); } to { transform:scale(1.0) translate(-1%,-0.5%); } }
        .carousel-slide::after { content:''; position:absolute; inset:0; z-index:1; background:linear-gradient(to top,rgba(0,0,0,0.62) 0%,rgba(0,0,0,0.04) 100%); pointer-events:none; }
        .slide-label { position:absolute; bottom:5.75rem; left:1.75rem; z-index:10; color:#fff; opacity:0; transform:translateY(14px); transition:opacity 0.7s ease 0.5s,transform 0.7s ease 0.5s; }
        .carousel-slide.active .slide-label { opacity:1; transform:translateY(0); }
        .slide-label-name { font-size:0.7rem; font-weight:700; letter-spacing:0.15em; text-transform:uppercase; color:rgba(255,255,255,0.65); margin-bottom:0.3rem; }
        .slide-label-price { font-family:'Outfit',sans-serif; font-size:1.625rem; font-weight:700; }
        .carousel-counter { position:absolute; top:1.25rem; right:1.25rem; z-index:10; color:rgba(255,255,255,0.9); font-size:0.8125rem; font-weight:600; background:rgba(0,0,0,0.32); backdrop-filter:blur(8px); padding:0.375rem 0.9rem; border-radius:50px; border:1px solid rgba(255,255,255,0.14); }
        .carousel-dots { position:absolute; bottom:1.75rem; left:1.75rem; display:flex; gap:0.5rem; z-index:10; }
        .carousel-dot { height:3px; border-radius:2px; background:rgba(255,255,255,0.3); border:none; cursor:pointer; padding:0; width:20px; transition:background 0.3s; }
        .carousel-dot.active { background:#fff; animation:dotGrow 4s linear forwards; }
        @keyframes dotGrow { from { width:20px; } to { width:54px; } }
        .floating-badge { position:absolute; top:1.5rem; left:1.75rem; background:rgba(255,255,255,0.96); backdrop-filter:blur(10px); padding:0.625rem 1.125rem; border-radius:50px; display:flex; align-items:center; gap:0.625rem; box-shadow:0 8px 24px rgba(0,0,0,0.12); z-index:20; }
        .badge-dot { width:8px; height:8px; background:#22c55e; border-radius:50%; animation:pulse 2s ease-in-out infinite; }
        @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.5; transform:scale(1.3); } }
        .badge-dot-text { font-size:0.8125rem; font-weight:600; color:var(--gray-900); }

        /* REVEAL */
        .reveal { opacity:0; transform:translateY(36px); transition:opacity 0.6s cubic-bezier(0.4,0,0.2,1),transform 0.6s cubic-bezier(0.4,0,0.2,1); }
        .reveal.visible { opacity:1; transform:translateY(0); }
        .reveal-left { opacity:0; transform:translateX(-36px); transition:opacity 0.6s cubic-bezier(0.4,0,0.2,1),transform 0.6s cubic-bezier(0.4,0,0.2,1); }
        .reveal-left.visible { opacity:1; transform:translateX(0); }
        .reveal-scale { opacity:0; transform:scale(0.93) translateY(24px); transition:opacity 0.55s cubic-bezier(0.34,1.56,0.64,1),transform 0.55s cubic-bezier(0.34,1.56,0.64,1); }
        .reveal-scale.visible { opacity:1; transform:scale(1) translateY(0); }
        .section-divider { width:40%; height:1px; margin:0 auto; background:linear-gradient(90deg,transparent,var(--gray-300),transparent); }

        /* LISTINGS */
        .listings-section { padding:3.5rem 6%; background:#fff; }
        .listings-section-header { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:1.75rem; flex-wrap:wrap; gap:1rem; }
        .listings-title-block { opacity:0; transform:translateY(30px); transition:all 0.7s cubic-bezier(0.4,0,0.2,1); }
        .listings-section.in-view .listings-title-block { opacity:1; transform:translateY(0); }
        .listings-eyebrow { display:inline-flex; align-items:center; gap:0.5rem; font-size:0.8125rem; font-weight:600; color:var(--gray-500); text-transform:uppercase; letter-spacing:0.1em; margin-bottom:0.75rem; }
        .listings-eyebrow-line { width:24px; height:2px; background:var(--gray-400); border-radius:2px; }
        .listings-heading { font-family:'Outfit',sans-serif; font-size:2.5rem; font-weight:800; color:var(--gray-900); letter-spacing:-0.03em; line-height:1.2; }
        .listings-heading span { background:linear-gradient(135deg,#18181b,#3f3f46); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .listings-view-all { display:inline-flex; align-items:center; gap:0.5rem; color:var(--gray-500); font-size:0.9375rem; font-weight:600; border:none; padding:0; opacity:0; transform:translateY(20px); transition:opacity 0.7s ease 0.2s,transform 0.7s ease 0.2s,color 0.2s; cursor:pointer; background:none; }
        .listings-section.in-view .listings-view-all { opacity:1; transform:translateY(0); }
        .listings-view-all:hover { color:var(--gray-900); }
        .filter-bar { display:flex; gap:0.875rem; margin-bottom:1.75rem; flex-wrap:wrap; opacity:0; transform:translateY(20px); transition:all 0.6s cubic-bezier(0.4,0,0.2,1) 0.15s; }
        .listings-section.in-view .filter-bar { opacity:1; transform:translateY(0); }
        .filter-btn { padding:0.5rem 1.125rem; border-radius:50px; border:1.5px solid var(--gray-200); background:#fff; color:var(--gray-600); font-size:0.875rem; font-weight:500; cursor:pointer; transition:all 0.2s; font-family:'Inter',sans-serif; }
        .filter-btn:hover { border-color:var(--gray-400); color:var(--gray-900); }
        .filter-btn.active { background:var(--gray-900); border-color:var(--gray-900); color:#fff; }
        .property-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1.75rem; }
        .property-card { background:#fff; border-radius:16px; overflow:hidden; border:1px solid var(--gray-200); transition:all 0.4s cubic-bezier(0.34,1.56,0.64,1); cursor:pointer; opacity:0; transform:translateY(50px) scale(0.96); }
        .listings-section.in-view .property-card { opacity:1; transform:translateY(0) scale(1); }
        .property-card:hover { transform:translateY(-8px) scale(1.02); box-shadow:0 24px 56px rgba(0,0,0,0.12); }
        .property-card:hover .card-img { transform:scale(1.06); }
        .card-img-wrapper { position:relative; height:200px; overflow:hidden; background:var(--gray-100); }
        .card-img { width:100%; height:100%; object-fit:cover; transition:transform 0.6s cubic-bezier(0.4,0,0.2,1); }
        .card-tag { position:absolute; top:1rem; left:1rem; padding:0.3125rem 0.75rem; border-radius:50px; font-size:0.75rem; font-weight:700; color:#fff; z-index:2; }
        .card-save-btn { position:absolute; top:1rem; right:1rem; width:34px; height:34px; background:rgba(255,255,255,0.95); border:none; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all 0.2s; z-index:2; }
        .card-save-btn svg { width:16px; height:16px; stroke:var(--gray-700); stroke-width:2; fill:none; }
        .card-body { padding:1.375rem 1.5rem 1.5rem; }
        .card-price-row { display:flex; align-items:baseline; gap:0.375rem; margin-bottom:0.5rem; }
        .card-price-main { font-family:'Outfit',sans-serif; font-size:1.375rem; font-weight:800; color:var(--gray-900); letter-spacing:-0.02em; }
        .card-price-period { font-size:0.8125rem; color:var(--gray-500); font-weight:500; }
        .card-location { display:flex; align-items:center; gap:0.375rem; color:var(--gray-500); font-size:0.8375rem; font-weight:500; margin-bottom:1rem; }
        .card-location svg { width:13px; height:13px; stroke:var(--gray-400); stroke-width:2; fill:none; flex-shrink:0; }
        .card-divider { height:1px; background:var(--gray-100); margin-bottom:1rem; }
        .card-specs { display:flex; gap:1.25rem; margin-bottom:1.25rem; }
        .card-spec { display:flex; align-items:center; gap:0.375rem; font-size:0.8125rem; font-weight:600; color:var(--gray-700); }
        .card-spec svg { width:14px; height:14px; stroke:var(--gray-400); stroke-width:2; fill:none; }
        .card-view-btn { width:100%; padding:0.75rem; background:var(--gray-50); border:1.5px solid var(--gray-200); border-radius:10px; font-size:0.875rem; font-weight:700; color:var(--gray-900); cursor:pointer; transition:all 0.25s; font-family:'Inter',sans-serif; display:flex; align-items:center; justify-content:center; gap:0.5rem; }
        .card-view-btn:hover { background:var(--gray-900); border-color:var(--gray-900); color:#fff; }
        .card-view-btn svg { width:14px; height:14px; stroke:currentColor; stroke-width:2.5; fill:none; }
        .no-results { grid-column:1/-1; text-align:center; padding:4rem 2rem; color:var(--gray-400); }

        /* STATS */
        .stats-section { padding:3.5rem 6%; background:linear-gradient(180deg,#fff 0%,var(--gray-50) 100%); }
        .stats-header { text-align:center; margin-bottom:2.5rem; opacity:0; transform:translateY(-30px); transition:all 0.8s cubic-bezier(0.4,0,0.2,1); }
        .stats-section.in-view .stats-header { opacity:1; transform:translateY(0); }
        .stats-header h2 { font-family:'Outfit',sans-serif; font-size:2.75rem; font-weight:700; margin-bottom:1rem; letter-spacing:-0.02em; background:linear-gradient(135deg,#18181b,#3f3f46); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .stats-header p { font-size:1.0625rem; color:var(--gray-600); max-width:560px; margin:0 auto; line-height:1.6; }
        .stats-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:2rem; max-width:1200px; margin:0 auto; }
        .stat-card { background:white; padding:2.5rem 2rem; border-radius:16px; text-align:center; border:1px solid var(--gray-200); transition:all 0.6s cubic-bezier(0.34,1.56,0.64,1); opacity:0; transform:translateY(60px) scale(0.9); position:relative; }
        .stat-card.animate { opacity:1; transform:translateY(0) scale(1); }
        .stat-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,#18181b,#3f3f46); border-radius:16px 16px 0 0; transform:scaleX(0); transform-origin:left; transition:transform 0.8s cubic-bezier(0.34,1.56,0.64,1); }
        .stat-card.animate::before { transform:scaleX(1); }
        .stat-card:hover { transform:translateY(-12px) scale(1.03); box-shadow:0 20px 50px rgba(0,0,0,0.12); }
        .stat-card-icon { width:56px; height:56px; background:linear-gradient(135deg,#18181b,#27272a); border-radius:12px; display:flex; align-items:center; justify-content:center; margin:0 auto 1.5rem; color:white; opacity:0; transform:scale(0) rotate(-180deg); transition:all 0.5s cubic-bezier(0.34,1.56,0.64,1); }
        .stat-card.animate .stat-card-icon { opacity:1; transform:scale(1) rotate(0deg); }
        .stat-card-number { font-family:'Outfit',sans-serif; font-size:2.75rem; font-weight:700; margin-bottom:0.5rem; letter-spacing:-0.02em; background:linear-gradient(135deg,#18181b,#3f3f46); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .stat-card-label { font-size:1rem; color:var(--gray-600); font-weight:500; }

        /* ABOUT */
        .about-section { background:#fff; padding:4.5rem 6%; overflow:hidden; border-top:1px solid var(--gray-100); }
        .about-inner { max-width:1200px; margin:0 auto; }
        .about-top { text-align:center; margin-bottom:2.5rem; opacity:0; transform:translateY(28px); transition:opacity 0.65s cubic-bezier(0.4,0,0.2,1),transform 0.65s cubic-bezier(0.4,0,0.2,1); }
        .about-section.in-view .about-top { opacity:1; transform:translateY(0); }
        .about-eyebrow { display:inline-block; font-size:0.7rem; font-weight:700; color:var(--gray-400); text-transform:uppercase; letter-spacing:0.15em; margin-bottom:0.75rem; }
        .about-title { font-family:'Outfit',sans-serif; font-size:2.25rem; font-weight:800; color:var(--gray-900); letter-spacing:-0.03em; line-height:1.15; }
        .about-title em { font-style:normal; color:var(--gray-400); }
        .about-bento { display:grid; grid-template-columns:1fr 1fr 1fr; grid-template-rows:280px 220px; gap:1rem; margin-bottom:1.5rem; }
        .bento-cell { opacity:0; transform:translateY(32px) scale(0.97); transition:opacity 0.55s cubic-bezier(0.4,0,0.2,1),transform 0.55s cubic-bezier(0.4,0,0.2,1); }
        .about-section.in-view .bento-cell { opacity:1; transform:translateY(0) scale(1); }
        .about-section.in-view .bento-cell:nth-child(1) { transition-delay:0.04s; }
        .about-section.in-view .bento-cell:nth-child(2) { transition-delay:0.10s; }
        .about-section.in-view .bento-cell:nth-child(3) { transition-delay:0.16s; }
        .about-section.in-view .bento-cell:nth-child(4) { transition-delay:0.22s; }
        .about-section.in-view .bento-cell:nth-child(5) { transition-delay:0.28s; }
        .bento-video-card { grid-column:1/3; grid-row:1; border-radius:18px; overflow:hidden; position:relative; background:#000; }
        .bento-video-card video { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
        .bento-video-card::after { content:''; position:absolute; inset:0; background:linear-gradient(to top,rgba(0,0,0,0.55) 0%,transparent 55%); pointer-events:none; z-index:1; }
        .bento-img-caption { position:absolute; bottom:1.5rem; left:1.75rem; z-index:2; }
        .bento-img-caption-label { font-size:0.68rem; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; color:rgba(255,255,255,0.5); margin-bottom:0.25rem; }
        .bento-img-caption-title { font-family:'Outfit',sans-serif; font-size:1.5rem; font-weight:700; color:#fff; }
        .bento-cta-card { grid-column:3; grid-row:2; border-radius:18px; background:var(--gray-900); display:flex; flex-direction:column; align-items:flex-start; justify-content:space-between; padding:1.625rem; transition:transform 0.3s,box-shadow 0.3s; }
        .bento-cta-card:hover { transform:translateY(-5px); box-shadow:0 20px 48px rgba(0,0,0,0.2); }
        .bento-cta-card-label { font-size:0.7rem; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:rgba(255,255,255,0.35); margin-bottom:0.375rem; }
        .bento-cta-card-title { font-family:'Outfit',sans-serif; font-size:1.25rem; font-weight:800; color:#fff; line-height:1.25; flex:1; margin-bottom:1.25rem; }
        .bento-cta-card-btn { display:inline-flex; align-items:center; gap:0.5rem; background:#fff; color:var(--gray-900); padding:0.625rem 1.25rem; border-radius:8px; font-size:0.8125rem; font-weight:700; border:none; cursor:pointer; font-family:'Inter',sans-serif; text-decoration:none; }
        .bento-cta-card-btn svg { width:12px; height:12px; stroke:currentColor; stroke-width:2.5; fill:none; }
        .about-learn-more { text-align:center; opacity:0; transform:translateY(16px); transition:opacity 0.6s ease 0.35s,transform 0.6s ease 0.35s; }
        .about-section.in-view .about-learn-more { opacity:1; transform:translateY(0); }
        .about-learn-btn { display:inline-flex; align-items:center; gap:0.625rem; background:var(--gray-900); color:#fff; padding:0.875rem 2rem; border-radius:10px; font-size:0.9rem; font-weight:700; border:none; cursor:pointer; font-family:'Inter',sans-serif; text-decoration:none; transition:background 0.22s,transform 0.22s; }
        .about-learn-btn:hover { background:var(--gray-700); transform:translateY(-2px); }
        .about-learn-btn svg { width:13px; height:13px; stroke:currentColor; stroke-width:2.5; fill:none; }
        .bento-svc-card { border-radius:18px; background:#fff; border:1.5px solid var(--gray-200); padding:1.625rem; display:flex; flex-direction:column; gap:0.75rem; transition:transform 0.3s,box-shadow 0.3s; position:relative; overflow:hidden; }
        .bento-svc-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:var(--gray-900); transform:scaleX(0); transform-origin:left; transition:transform 0.35s; border-radius:18px 18px 0 0; }
        .bento-svc-card:hover::before { transform:scaleX(1); }
        .bento-svc-card:hover { transform:translateY(-5px); box-shadow:0 16px 40px rgba(0,0,0,0.09); }
        .bento-svc-icon { width:40px; height:40px; border-radius:10px; background:var(--gray-100); display:flex; align-items:center; justify-content:center; color:var(--gray-600); flex-shrink:0; transition:background 0.25s,color 0.25s; }
        .bento-svc-card:hover .bento-svc-icon { background:var(--gray-900); color:#fff; }
        .bento-svc-title { font-family:'Outfit',sans-serif; font-size:1rem; font-weight:700; color:var(--gray-900); }
        .bento-svc-desc { font-size:0.8125rem; color:var(--gray-500); line-height:1.6; }

        /* MARQUEE */
        .marquee-section { padding:4rem 0; background:#fafafa; border-top:1px solid var(--gray-100); border-bottom:1px solid var(--gray-100); }
        .marquee-header { text-align:center; margin-bottom:2.5rem; padding:0 6%; }
        .marquee-eyebrow { display:inline-flex; align-items:center; gap:0.75rem; font-size:0.7rem; font-weight:700; color:var(--gray-400); text-transform:uppercase; letter-spacing:0.15em; margin-bottom:0.75rem; }
        .marquee-eyebrow-line { width:28px; height:1px; background:var(--gray-300); }
        .marquee-title { font-family:'Outfit',sans-serif; font-size:1.875rem; font-weight:800; color:var(--gray-900); letter-spacing:-0.03em; }
        .marquee-title span { color:var(--gray-400); }
        .marquee-track-wrap { overflow:hidden; position:relative; margin-bottom:0.875rem; height:76px; }
        .marquee-track-wrap::before,.marquee-track-wrap::after { content:''; position:absolute; top:0; bottom:0; width:100px; z-index:2; pointer-events:none; }
        .marquee-track-wrap::before { left:0; background:linear-gradient(to right,#fafafa,transparent); }
        .marquee-track-wrap::after { right:0; background:linear-gradient(to left,#fafafa,transparent); }
        .marquee-track { display:flex; gap:0.875rem; width:max-content; position:absolute; top:8px; left:0; }
        .marquee-track.forward { animation:marqueeLeft 36s linear infinite; }
        .marquee-track.backward { animation:marqueeRight 30s linear infinite; }
        @keyframes marqueeLeft { 0% { transform:translate3d(0,0,0); } 100% { transform:translate3d(-50%,0,0); } }
        @keyframes marqueeRight { 0% { transform:translate3d(-50%,0,0); } 100% { transform:translate3d(0,0,0); } }
        .marquee-logo { display:inline-flex; align-items:center; justify-content:center; background:#fff; border:1.5px solid var(--gray-200); border-radius:12px; padding:0.75rem 1.75rem; height:56px; min-width:130px; flex-shrink:0; }
        .marquee-logo-text { font-size:0.875rem; font-weight:700; color:var(--gray-600); }

        /* FOOTER */
        .footer-clean { background:#111; color:#fff; padding:4rem 6% 2rem; }
        .footer-cta { display:flex; justify-content:space-between; align-items:center; margin-bottom:3rem; padding-bottom:2rem; border-bottom:1px solid rgba(255,255,255,0.08); flex-wrap:wrap; gap:1.5rem; }
        .footer-cta h2 { font-family:'Outfit',sans-serif; font-size:1.6rem; font-weight:700; }
        .footer-cta-buttons { display:flex; gap:1rem; }
        .btn-footer-primary { background:#fff; color:#111; padding:0.7rem 1.4rem; border-radius:8px; font-weight:600; text-decoration:none; font-size:0.9rem; }
        .btn-outline { border:1px solid rgba(255,255,255,0.3); padding:0.7rem 1.4rem; border-radius:8px; color:#fff; text-decoration:none; font-size:0.9rem; }
        .footer-main { display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:3rem; margin-bottom:2.5rem; }
        .footer-brand h3 { font-family:'Outfit',sans-serif; font-size:1.3rem; margin-bottom:1rem; }
        .footer-brand p { color:rgba(255,255,255,0.5); font-size:0.9rem; line-height:1.6; max-width:300px; }
        .footer-main h4 { font-size:0.85rem; margin-bottom:1rem; color:rgba(255,255,255,0.6); text-transform:uppercase; letter-spacing:0.08em; }
        .footer-main ul { list-style:none; padding:0; }
        .footer-main ul li { margin-bottom:0.6rem; }
        .footer-main ul li a { color:rgba(255,255,255,0.5); text-decoration:none; font-size:0.9rem; transition:color 0.2s; }
        .footer-main ul li a:hover { color:#fff; }
        .footer-bottom { border-top:1px solid rgba(255,255,255,0.08); padding-top:1.5rem; display:flex; justify-content:space-between; flex-wrap:wrap; gap:1rem; }
        .footer-bottom p,.footer-legal a { font-size:0.8rem; color:rgba(255,255,255,0.4); text-decoration:none; }
        .footer-legal { display:flex; gap:1.5rem; }

        /* WHATSAPP */
        .floating-whatsapp { position:fixed; bottom:2rem; right:2rem; z-index:1000; display:flex; align-items:center; gap:0.75rem; background:#25D366; color:white; padding:0.875rem 1.5rem; border-radius:50px; box-shadow:0 8px 24px rgba(37,211,102,0.4); cursor:pointer; transition:all 0.3s; text-decoration:none; }
        .floating-whatsapp:hover { background:#20BA5A; transform:translateY(-4px) scale(1.05); }
        .whatsapp-icon { width:24px; height:24px; fill:white; }
        .whatsapp-text { font-size:0.9375rem; font-weight:600; }

        @media (max-width:1024px) { .hero { grid-template-columns:1fr; padding-top:7rem; gap:3rem; } .hero-title { font-size:3.25rem; } .hero-right { height:55vh; } .footer-main { grid-template-columns:1fr 1fr; } }
        @media (max-width:900px) { .property-grid { grid-template-columns:repeat(2,1fr); } }
        @media (max-width:768px) {
          .hero { grid-template-columns:1fr; padding:6rem 5% 3rem; gap:2rem; min-height:auto; text-align:center; }
          .hero-left { max-width:100%; display:flex; flex-direction:column; align-items:center; }
          .hero-title { font-size:2rem; margin-bottom:1rem; }
          .hero-description { font-size:0.875rem; margin:0 auto 1.5rem; }
          .desktop-description { display:none !important; }
          .mobile-description { display:inline !important; }
          .hero-buttons { flex-direction:column; gap:0.75rem; margin-bottom:1.5rem; width:100%; }
          .btn-primary { width:100%; justify-content:center; }
          .search-bar { grid-template-columns:1fr; max-width:100%; width:100%; }
          .search-button { min-height:52px; padding:0.875rem 2rem; height:52px; }
          .hero-right { display:none !important; }
          .listings-heading { font-size:2rem; }
          .floating-whatsapp { width:56px; height:56px; padding:0; bottom:1.5rem; right:1.5rem; border-radius:50%; justify-content:center; }
          .whatsapp-text { display:none !important; }
          .about-section { padding:2.5rem 1.25rem; }
          .about-title { font-size:1.5rem; }
          .about-bento { grid-template-columns:1fr 1fr; grid-template-rows:auto; gap:0.75rem; }
          .bento-video-card { grid-column:1/-1 !important; grid-row:auto !important; height:200px; }
          .bento-svc-card,.bento-cta-card { grid-column:auto !important; grid-row:auto !important; padding:1.125rem; }
          .bento-svc-desc { display:none; }
          .footer-clean { padding:3rem 5% 2rem; text-align:center; }
          .footer-cta { flex-direction:column; align-items:center; }
          .footer-main { grid-template-columns:1fr; gap:2rem; text-align:center; }
          .footer-bottom { flex-direction:column; align-items:center; }
          .footer-legal { justify-content:center; }
        }
        @media (max-width:560px) { .property-grid { grid-template-columns:1fr; } }
        @media (max-width:480px) { .hero { padding:5rem 4% 2rem; } .hero-title { font-size:1.75rem; } }
      `}</style>

      {/* Loading screen — React state controls mount/class, no DOM queries */}
      {showLoader && (
        <div className={`loading-screen${loaderOpen ? ' opening' : ''}`}>
          <div className="loading-top">
            <div className="loader">
              <div className="loader-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M16 3L1 16h4v13h8v-8h6v8h8V16h4L16 3z" fill="#18181b" />
                  <rect x="12" y="21" width="8" height="8" rx="1" fill="white" />
                </svg>
              </div>
              <div className="loader-text">Al Areeq</div>
            </div>
          </div>
          <div className="loading-bottom"></div>
        </div>
      )}

      <Navbar />

      <section className="hero">
        <div className="hero-decorations">
          <div className="decoration-grid"></div>
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
          <div className="decoration-circle circle-3"></div>
        </div>
        <div className="hero-left">
          <div className="trust-badge"><div className="badge-icon"></div><span className="badge-text">Trusted by 10,000+ Families</span></div>
          <h1 className="hero-title">Find Your Perfect <span className="hero-title-highlight">Home</span></h1>
          <p className="hero-description">
            <span className="desktop-description">Verified properties, transparent pricing, trusted by thousands.</span>
            <span className="mobile-description">Find your perfect home with verified listings.</span>
          </p>
          <div className="hero-buttons"><button className="btn-primary">Get </button></div>
          <div className="search-toggle">
            <button className={`toggle-option ${searchMode === 'rent' ? 'active' : ''}`} onClick={() => setSearchMode('rent')}>For Rent</button>
            <button className={`toggle-option ${searchMode === 'buy' ? 'active' : ''}`} onClick={() => setSearchMode('buy')}>For Sale</button>
          </div>
          <div className="search-bar">
            <div className="search-field"><div className="search-field-label">Location</div><select><option>Los Angeles, California</option><option>New York, New York</option><option>Miami, Florida</option></select></div>
            <div className="search-field"><div className="search-field-label">Property Type</div><select><option>Classic Apartment</option><option>Modern Villa</option><option>Luxury Condo</option></select></div>
            <div className="search-field"><div className="search-field-label">{searchMode === 'rent' ? 'Monthly Rent' : 'Price Range'}</div>
              <select>{searchMode === 'rent' ? <><option>$8,000–$12,000/mo</option><option>$12,000–$20,000/mo</option></> : <><option>$500K–$1M</option><option>$1M–$2M</option></>}</select>
            </div>
            <button className="search-button"><svg className="search-icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg></button>
          </div>
        </div>
        <div className="hero-right">
          <div className="carousel-shell">
            {heroImages.map((img, i) => (
              <div key={i} className={`carousel-slide ${i === currentSlide ? 'active' : i === prevSlide ? 'leaving' : ''}`}>
                <img src={img.src} alt={img.label} />
                <div className="slide-label"><div className="slide-label-name">{img.label}</div><div className="slide-label-price">{img.price}</div></div>
              </div>
            ))}
            <div className="carousel-counter">{String(currentSlide + 1).padStart(2, '0')} / {String(heroImages.length).padStart(2, '0')}</div>
            <div className="carousel-dots">{heroImages.map((_, i) => (<button key={i} className={`carousel-dot ${i === currentSlide ? 'active' : ''}`} onClick={() => { advanceSlide(i); startTimer(); }} />))}</div>
          </div>
          <div className="floating-badge"><div className="badge-dot"></div><span className="badge-dot-text">Available Now</span></div>
        </div>
      </section>

      <div className="section-divider reveal"></div>

      <section id="properties" className={`listings-section ${listingsInView ? 'in-view' : ''}`} ref={listingsRef}>
        <div className="listings-section-header reveal">
          <div className="listings-title-block reveal-left">
            <div className="listings-eyebrow"><div className="listings-eyebrow-line"></div>Featured Listings</div>
            <h2 className="listings-heading">Handpicked <span>Properties</span> For You</h2>
          </div>
          <button className="listings-view-all">View All <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg></button>
        </div>
        <div className="filter-bar reveal">
          {[['all', 'All'], ['rent', 'For Rent'], ['sale', 'For Sale']].map(([val, label]) => (
            <button key={val} className={`filter-btn ${activeFilter === val ? 'active' : ''}`} onClick={() => setActiveFilter(val)}>{label}</button>
          ))}
        </div>
        <div className="property-grid">
          {filteredProperties.length > 0 ? filteredProperties.map((p, i) => (
            <div key={p.id} className="property-card reveal-scale" style={{ transitionDelay: listingsInView ? `${0.05 + i * 0.07}s` : '0s' }}>
              <div className="card-img-wrapper">
                <img src={p.image} alt={p.location} className="card-img" loading="lazy" />
                <div className="card-tag" style={{ background: p.tagColor }}>{p.tag}</div>
                <button className="card-save-btn"><svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg></button>
              </div>
              <div className="card-body">
                <div className="card-price-row"><span className="card-price-main">{formatPrice(priceCounters[p.id] ?? 0, p.priceType)}</span><span className="card-price-period">{p.period}</span></div>
                <div className="card-location"><svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>{p.location}</div>
                <div className="card-divider"></div>
                <div className="card-specs">
                  <div className="card-spec"><svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>{p.beds} Beds</div>
                  <div className="card-spec"><svg viewBox="0 0 24 24"><path d="M4 12h16M4 6h16M4 18h16" /></svg>{p.baths} Baths</div>
                  <div className="card-spec"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /></svg>{p.area} ft²</div>
                </div>
                <button className="card-view-btn">View Details <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg></button>
              </div>
            </div>
          )) : <div className="no-results"><p>🏠 No properties match your filters.</p></div>}
        </div>
      </section>

      <div className="section-divider reveal"></div>

      <section className={`stats-section ${statsInView ? 'in-view' : ''}`} ref={statsRef}>
        <div className="stats-header"><h2>Why Choose Dream Homes</h2><p>Join thousands of satisfied clients who found their perfect property with us</p></div>
        <div className="stats-grid">
          {[
            { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>, number: `${counters.listings.toLocaleString()}+`, label: 'Verified Listings', delay: '0.1s' },
            { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>, number: `${counters.areas}+`, label: 'Areas Covered', delay: '0.2s' },
            { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>, number: `${counters.satisfaction}%`, label: 'Client Satisfaction', delay: '0.3s' },
          ].map((s, i) => (
            <div key={i} className={`stat-card ${statsInView ? 'animate' : ''}`} style={{ transitionDelay: s.delay }}>
              <div className="stat-card-icon" style={{ transitionDelay: `${parseFloat(s.delay) + 0.1}s` }}>{s.icon}</div>
              <div className="stat-card-number">{s.number}</div>
              <div className="stat-card-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider reveal"></div>

      <section id="about" className={`about-section ${aboutInView ? 'in-view' : ''}`} ref={aboutRef}>
        <div className="about-inner">
          <div className="about-top"><span className="about-eyebrow">What We Offer</span><h2 className="about-title">Everything your <em>property needs.</em></h2></div>
          <div className="about-bento">
            <div className="bento-video-card bento-cell">
              <video autoPlay muted loop playsInline preload="metadata" src="https://www.pexels.com/download/video/7578552/" />
              <div className="bento-img-caption"><div className="bento-img-caption-label">Est. 2012 · Los Angeles</div><div className="bento-img-caption-title">Trusted by 10,000+ Families</div></div>
            </div>
            <div className="bento-svc-card bento-cell" style={{ gridColumn: 3, gridRow: 1 }}><div className="bento-svc-icon">{services[0].icon}</div><div className="bento-svc-title">{services[0].title}</div><div className="bento-svc-desc">{services[0].description}</div></div>
            <div className="bento-svc-card bento-cell" style={{ gridColumn: 1, gridRow: 2 }}><div className="bento-svc-icon">{services[1].icon}</div><div className="bento-svc-title">{services[1].title}</div><div className="bento-svc-desc">{services[1].description}</div></div>
            <div className="bento-svc-card bento-cell" style={{ gridColumn: 2, gridRow: 2 }}><div className="bento-svc-icon">{services[2].icon}</div><div className="bento-svc-title">{services[2].title}</div><div className="bento-svc-desc">{services[2].description}</div></div>
            <div className="bento-cta-card bento-cell"><div><div className="bento-cta-card-label">Ready to start?</div><div className="bento-cta-card-title">Let's find your perfect home today.</div></div><a href="/contact" className="bento-cta-card-btn">Get<svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg></a></div>
          </div>
          <div className="about-learn-more"><a href="/about" className="about-learn-btn">Learn More <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg></a></div>
        </div>
      </section>

      {(() => {
        const row1 = ['Zillow', 'Realtor.com', 'Compass', 'Redfin', 'eXp Realty', 'Coldwell Banker', 'Keller Williams', 'RE/MAX'];
        const row2 = ['Century 21', "Sotheby's", 'JLL', 'CBRE', 'Berkshire Hathaway', 'Engel & Völkers', 'HomeLight', 'Opendoor'];
        const LogoChip = ({ name }: { name: string }) => <div className="marquee-logo"><span className="marquee-logo-text">{name}</span></div>;
        const dup = (arr: string[]) => [...arr, ...arr];
        return (
          <section className="marquee-section">
            <div className="marquee-header"><div className="marquee-eyebrow"><div className="marquee-eyebrow-line"></div>Partners<div className="marquee-eyebrow-line"></div></div><h2 className="marquee-title">Trusted by <span>industry leaders</span></h2></div>
            <div className="marquee-track-wrap"><div className="marquee-track forward">{dup(row1).map((name, i) => <LogoChip key={i} name={name} />)}</div></div>
            <div className="marquee-track-wrap"><div className="marquee-track backward">{dup(row2).map((name, i) => <LogoChip key={i} name={name} />)}</div></div>
          </section>
        );
      })()}

      <a href="https://wa.me/123456789" target="_blank" rel="noopener noreferrer" className="floating-whatsapp">
        <svg className="whatsapp-icon" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
        <span className="whatsapp-text">Talk to Agent</span>
      </a>

      <footer className="footer-clean">
        <div className="footer-cta"><h2>Find your dream home today.</h2><div className="footer-cta-buttons"><a href="/listings" className="btn-footer-primary">Browse Listings</a><a href="/contact" className="btn-outline">Contact Agent</a></div></div>
        <div className="footer-main">
          <div className="footer-brand"><h3>DreamHomes</h3><p>Trusted real estate partner helping families buy, rent and invest in premium properties since 2012.</p></div>
          <div><h4>Properties</h4><ul><li><a href="#">Buy</a></li><li><a href="#">Rent</a></li><li><a href="#">Luxury</a></li></ul></div>
          <div><h4>Company</h4><ul><li><a href="#">About</a></li><li><a href="#">Agents</a></li><li><a href="#">Contact</a></li></ul></div>
          <div><h4>Resources</h4><ul><li><a href="#">Mortgage Calculator</a></li><li><a href="#">Market Reports</a></li></ul></div>
        </div>
        <div className="footer-bottom"><p>© {new Date().getFullYear()} DreamHomes. All rights reserved.</p><div className="footer-legal"><a href="#">Privacy</a><a href="#">Terms</a></div></div>
      </footer>
    </>
  );
};

export default DreamHomes;