'use client';
import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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

/* ── FULL POST MODAL ── */
const PostModal = ({ post, onClose }: { post: Post; onClose: () => void }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
    }, [onClose]);

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose} aria-label="Close">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
                <div className="modal-img">
                    <img src={post.image} alt={post.title} />
                    <div className="modal-img-overlay" />
                    <div className="modal-badge">{post.category}</div>
                </div>
                <div className="modal-body">
                    <div className="modal-meta-top">
                        <div className="modal-av"><img src={post.author.avatar} alt={post.author.name} /></div>
                        <div>
                            <div className="modal-author">{post.author.name}</div>
                            <div className="modal-date">{post.date} &bull; {post.readTime}</div>
                        </div>
                    </div>
                    <h2 className="modal-title">{post.title}</h2>
                    <p className="modal-excerpt">{post.excerpt}</p>
                    <div className="modal-divider" />
                    <p className="modal-text">{post.body}</p>
                    <button className="modal-btn" onClick={onClose}>Back to Articles</button>
                </div>
            </div>
        </div>
    );
};

/* ── MAIN BLOG COMPONENT ── */
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
            rootRef.current?.querySelectorAll<HTMLElement>('.rv').forEach((el) => {
                io.observe(el);
            });
        }, 80); return () => { clearTimeout(delay); io.disconnect(); };
    }, [cat]);

    return (
        <>
            <Navbar />
            {openPost && <PostModal post={openPost} onClose={() => setOpenPost(null)} />}

            <div className="pg" ref={rootRef}>

                {/* HEADER */}
                <div className="hdr">
                    <div className="hdr-in">
                        <div>
                            <div className="hdr-eye">Al Areeq &nbsp;/&nbsp; Insights</div>
                            <h1 className="hdr-title">Real Estate Intel,<br /><em>Straight from the Field.</em></h1>
                        </div>
                        <div className="hdr-search">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                            </svg>
                            <input placeholder="Search articles..." value={q} onChange={e => setQ(e.target.value)} />
                        </div>
                    </div>
                </div>

                {/* HERO — single full image */}
                <div className="hero-wrap rv">
                    <button className="hero" onClick={() => setOpenPost(hero)}>
                        <img src={hero.image} alt={hero.title} />
                        <div className="hero-overlay" />
                        <div className="hero-body">
                            <div className="hero-left">
                                <div className="hero-badge"><div className="hero-badge-dot" />{hero.category}</div>
                                <div className="hero-title">{hero.title}</div>
                                <div className="hero-meta">
                                    <div className="hero-av"><img src={hero.author.avatar} alt={hero.author.name} /></div>
                                    <div className="hero-info">
                                        <strong>{hero.author.name}</strong><span>&bull;</span>{hero.date}
                                    </div>
                                    <div className="hero-time">{hero.readTime}</div>
                                </div>
                            </div>
                            <div className="hero-cta">
                                Read Article
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </div>
                        </div>
                    </button>
                </div>

                {/* FILTER BAR */}
                <div className="bar rv">
                    <div className="bar-label">Recent Posts <span>({grid.length})</span></div>
                    <div className="bar-cats">
                        {CATS.map(c => (
                            <button key={c} className={`bcat${cat === c ? ' on' : ''}`} onClick={() => setCat(c)}>{c}</button>
                        ))}
                    </div>
                </div>

                {/* GRID */}
                <div className="grid-wrap" suppressHydrationWarning>
                    <div className="desk-grid">
                        {grid.length > 0 ? grid.map((p, i) => (
                            <article key={p.id} className="card rv" onClick={() => setOpenPost(p)}>
                                <div className="card-img">
                                    <img src={p.image} alt={p.title} loading="lazy" />
                                    <div className="card-pill">{p.category}</div>
                                </div>
                                <div className="card-body">
                                    <h3 className="card-title">{p.title}</h3>
                                    <p className="card-exc">{p.excerpt}</p>
                                    <div className="card-foot">
                                        <div className="card-av"><img src={p.author.avatar} alt={p.author.name} /></div>
                                        <div className="card-name">{p.author.name}</div>
                                        <div className="card-when">{p.date} &bull; {p.readTime}</div>
                                    </div>
                                </div>
                            </article>
                        )) : <div className="empty">No posts match your search.</div>}
                    </div>
                </div>

                {/* NEWSLETTER */}
                <div className="cta-wrap rv">
                    <div className="cta">
                        <div className="cta-l">
                            <div className="cta-eye">Stay informed</div>
                            <div className="cta-h">Monthly market intel,<br />direct to your inbox.</div>
                            <p className="cta-sub">No noise. Just the data and trends that matter to Dubai buyers and investors.</p>
                        </div>
                        <div className="cta-r">
                            <input className="cta-input" type="email" placeholder="your@email.com" />
                            <button className="cta-btn">Subscribe</button>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}
export default Blog;