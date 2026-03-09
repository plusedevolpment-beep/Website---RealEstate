'use client';
import React, { useRef, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './contact.css';

const OFFICES = [
    { city: 'Dubai', address: 'Unit 2204, Marina Plaza, Dubai Marina', phone: '+971 4 123 4567', hours: 'Sun–Thu 9am–6pm' },
    { city: 'Abu Dhabi', address: 'Level 8, Etihad Towers, Corniche', phone: '+971 2 987 6543', hours: 'Sun–Thu 9am–6pm' },
];

const AGENTS = [
    { name: 'Mohammed Al Areeq', title: 'Senior Sales Director', phone: '+971 50 111 2222', email: 'mohammed@alareeq.com', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80', spec: 'Luxury Villas · Off-Plan' },
    { name: 'Sara Al Rashidi', title: 'Leasing Consultant', phone: '+971 50 333 4444', email: 'sara@alareeq.com', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80', spec: 'Apartments · Short-Term' },
    { name: 'Khalid Mansoor', title: 'Investment Advisor', phone: '+971 50 555 6666', email: 'khalid@alareeq.com', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80', spec: 'Commercial · ROI Analysis' },
];

const STATS = [
    { target: 2, suffix: ' hrs', label: 'Avg. response time' },
    { target: 12, suffix: '+', label: 'Years in Dubai' },
    { target: 4.9, suffix: '★', label: 'Client rating', decimals: 1 },
    { target: 850, suffix: '+', label: 'Deals closed' },
];

/* ── EASED COUNT UP ── */
function useCountUp(target: number, decimals = 0, duration = 2000) {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { setStarted(true); io.disconnect(); }
        }, { threshold: 0.4 });
        io.observe(el);
        return () => io.disconnect();
    }, []);

    useEffect(() => {
        if (!started) return;
        let startTime: number;
        const ease = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        const tick = (ts: number) => {
            if (!startTime) startTime = ts;
            const progress = Math.min((ts - startTime) / duration, 1);
            const value = target * ease(progress);
            setCount(parseFloat(value.toFixed(decimals)));
            if (progress < 1) requestAnimationFrame(tick);
            else setCount(target);
        };
        requestAnimationFrame(tick);
    }, [started, target, decimals, duration]);

    return { count, ref };
}

function StatItem({ target, suffix, label, decimals = 0, delay = 0 }: { target: number; suffix: string; label: string; decimals?: number; delay?: number }) {
    const { count, ref } = useCountUp(target, decimals, 2000);
    return (
        <div className="chdr-stat" ref={ref} style={{ animationDelay: `${delay}ms` }}>
            <div className="chdr-stat-val">
                {decimals ? count.toFixed(decimals) : Math.round(count)}{suffix}
            </div>
            <div className="chdr-stat-lbl">{label}</div>
        </div>
    );
}

/* ── FLOATING LABEL FIELD ── */
function FloatField({ label, type = 'text', placeholder, value, onChange }: {
    label: string; type?: string; placeholder?: string;
    value: string; onChange: (v: string) => void;
}) {
    const [focused, setFocused] = useState(false);
    const active = focused || value.length > 0;
    return (
        <div className={`cff${active ? ' cff-active' : ''}${focused ? ' cff-focused' : ''}`}>
            <label className="cff-label">{label}</label>
            <input
                type={type}
                className="cff-input"
                placeholder={active ? placeholder : ''}
                value={value}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onChange={e => onChange(e.target.value)}
            />
        </div>
    );
}

/* ── MAIN COMPONENT ── */
const Contact = () => {
    const rootRef = useRef<HTMLDivElement>(null);
    const [sent, setSent] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'Buy', message: '' });
    const [msgFocused, setMsgFocused] = useState(false);

    useEffect(() => {
        const io = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    (e.target as HTMLElement).classList.add('vis');
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.07, rootMargin: '0px 0px -20px 0px' });
        const t = setTimeout(() => {
            rootRef.current?.querySelectorAll<HTMLElement>('.rv').forEach((el, i) => {
                el.style.transitionDelay = `${i * 0.06}s`;
                io.observe(el);
            });
        }, 80);
        return () => { clearTimeout(t); io.disconnect(); };
    }, []);

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) return;
        setSent(true);
    };

    const filledFields = [form.name, form.email, form.message].filter(Boolean).length;
    const progress = Math.round((filledFields / 3) * 100);

    return (
        <>
            <Navbar />
            <div className="cpg" ref={rootRef}>

                {/* ── HEADER ── */}
                <div className="chdr">
                    <div className="chdr-mesh" aria-hidden="true" />
                    <div className="chdr-in">
                        <div className="chdr-left rv">
                            <div className="chdr-eye">
                                <span className="chdr-dot" />
                                Al Areeq &nbsp;/&nbsp; Contact
                            </div>
                            <h1 className="chdr-title">
                                Let's find your<br />
                                <em>perfect property.</em>
                            </h1>
                            <p className="chdr-sub">Our team responds within 2 business hours. No pressure, no spam — just expert guidance from people who know Dubai.</p>
                        </div>
                        <div className="chdr-stats-wrap rv">
                            <div className="chdr-stats">
                                {STATS.map((s, i) => (
                                    <StatItem key={s.label} target={s.target} suffix={s.suffix} label={s.label} decimals={s.decimals} delay={i * 120} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── MAIN ── */}
                <div className="cmain">

                    {/* FORM */}
                    <div className="cform-wrap rv">
                        {sent ? (
                            <div className="csent">
                                <div className="csent-ring">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                </div>
                                <h3>Message sent!</h3>
                                <p>We'll be in touch within 2 business hours.</p>
                                <button className="csent-back" onClick={() => setSent(false)}>Send another message</button>
                            </div>
                        ) : (
                            <>
                                <div className="cform-hd">
                                    <h2>Send us a message</h2>
                                    <p>Fill in the details below and one of our agents will reach out personally.</p>
                                    {/* Progress bar */}
                                    <div className="cform-prog">
                                        <div className="cform-prog-bar" style={{ width: `${progress}%` }} />
                                    </div>
                                    <div className="cform-prog-lbl">{progress === 100 ? 'Ready to send' : `${3 - filledFields} required field${3 - filledFields !== 1 ? 's' : ''} remaining`}</div>
                                </div>

                                <div className="cform-row">
                                    <FloatField label="Full name" placeholder="Ahmed Al Farsi" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} />
                                    <FloatField label="Email" type="email" placeholder="you@email.com" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} />
                                </div>

                                <div className="cform-row">
                                    <FloatField label="Phone (optional)" type="tel" placeholder="+971 50 000 0000" value={form.phone} onChange={v => setForm(f => ({ ...f, phone: v }))} />
                                    <div className="cfield">
                                        <label className="cfield-lbl">I&apos;m looking to</label>
                                        <div className="cselect-wrap">
                                            <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}>
                                                <option>Buy</option>
                                                <option>Rent</option>
                                                <option>Sell</option>
                                                <option>Invest</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className={`cmsg${msgFocused || form.message ? ' cmsg-active' : ''}`}>
                                    <label className="cmsg-label">Message</label>
                                    <textarea
                                        rows={5}
                                        className="cmsg-ta"
                                        placeholder={msgFocused || form.message ? 'Tell us about your property needs — budget, area, timeline...' : ''}
                                        value={form.message}
                                        onFocus={() => setMsgFocused(true)}
                                        onBlur={() => setMsgFocused(false)}
                                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                                    />
                                </div>

                                <div className="cform-footer">
                                    <span className="cform-note">Your info is never shared with third parties.</span>
                                    <button className="csubmit" onClick={handleSubmit} disabled={progress < 100}>
                                        Send Message
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* SIDEBAR */}
                    <div className="cside">

                        {/* Offices */}
                        <div className="ccard rv">
                            <div className="ccard-hd">Our Offices</div>
                            {OFFICES.map(o => (
                                <div key={o.city} className="coffice">
                                    <div className="coffice-city">{o.city}</div>
                                    <div className="coffice-row">
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                        {o.address}
                                    </div>
                                    <div className="coffice-row">
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 15 19.79 19.79 0 0 1 1.93 6.18 2 2 0 0 1 3.9 4h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 11.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                        {o.phone}
                                    </div>
                                    <div className="coffice-row coffice-hours">
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                        {o.hours}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Quick contact */}
                        <div className="ccard ccard-dark rv">
                            <div className="ccard-hd">Quick Contact</div>
                            <a href="tel:+97141234567" className="cquick">
                                <div className="cquick-icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 15 19.79 19.79 0 0 1 1.93 6.18 2 2 0 0 1 3.9 4h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 11.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                </div>
                                <div>
                                    <div className="cquick-label">Call us now</div>
                                    <div className="cquick-val">+971 4 123 4567</div>
                                </div>
                                <svg className="cquick-arr" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </a>
                            <a href="mailto:info@alareeq.com" className="cquick">
                                <div className="cquick-icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                                </div>
                                <div>
                                    <div className="cquick-label">Email us</div>
                                    <div className="cquick-val">info@alareeq.com</div>
                                </div>
                                <svg className="cquick-arr" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </a>
                            <a href="https://wa.me/97141234567" className="cquick cquick-wa">
                                <div className="cquick-icon cquick-icon-wa">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" /></svg>
                                </div>
                                <div>
                                    <div className="cquick-label">WhatsApp</div>
                                    <div className="cquick-val">Chat instantly</div>
                                </div>
                                <svg className="cquick-arr" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* ── AGENTS ── */}
                <div className="cagents-wrap">
                    <div className="cagents-hd rv">
                        <div className="cagents-eye">Our Team</div>
                        <h2>Speak to a specialist directly</h2>
                    </div>
                    <div className="cagents">
                        {AGENTS.map((a, i) => (
                            <div key={a.name} className="cagent rv" style={{ transitionDelay: `${i * 0.1}s` }}>
                                <div className="cagent-top">
                                    <div className="cagent-av">
                                        <img src={a.avatar} alt={a.name} />
                                    </div>
                                    <div className="cagent-info">
                                        <div className="cagent-name">{a.name}</div>
                                        <div className="cagent-title">{a.title}</div>
                                        <div className="cagent-spec">{a.spec}</div>
                                    </div>
                                </div>
                                <div className="cagent-actions">
                                    <a href={`tel:${a.phone.replace(/\s/g, '')}`} className="cagent-btn cagent-call">
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 15 19.79 19.79 0 0 1 1.93 6.18 2 2 0 0 1 3.9 4h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 11.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                        Call
                                    </a>
                                    <a href={`mailto:${a.email}`} className="cagent-btn cagent-email">
                                        Email
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
};

export default Contact;