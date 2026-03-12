// ─────────────────────────────────────────────────────────────────────────────
//  blogData.ts  —  Al Areeq Real Estate Blog
//
//  HOW TO CONNECT AN ADMIN PANEL LATER:
//  ─────────────────────────────────────
//  1. Replace getAllPosts():
//       export async function getAllPosts(): Promise<Post[]> {
//         const res = await fetch('https://your-api.com/api/posts');
//         return res.json();
//       }
//  2. Replace getPostBySlug():
//       export async function getPostBySlug(slug: string): Promise<Post | null> {
//         const res = await fetch(`/api/posts/${slug}`);
//         if (!res.ok) return null;
//         return res.json();
//       }
//
//  ADMIN PANEL CATEGORIES:
//  Buying Guide | Market Insights | Investment | Renting | Neighbourhood | Legal & Finance
// ─────────────────────────────────────────────────────────────────────────────

export type Post = {
    id: number;
    slug: string;
    category: string;
    title: string;
    excerpt: string;
    content: string;
    coverImage: string;
    author: {
        name: string;
        avatar: string;
        bio?: string;
    };
    readTime: string;
    date: string;
    featured: boolean;
    published: boolean;
    tags?: string[];
};

export const MOCK_POSTS: Post[] = [
    {
        id: 1,
        slug: 'first-time-buyer-guide-2026',
        category: 'Buying Guide',
        title: 'The Complete First-Time Buyer\'s Guide for 2026',
        excerpt: 'Everything you need to know before signing anything — from mortgage pre-approval to handing over the keys.',
        content: `
        <p>Buying your first home is one of the biggest decisions you'll ever make. The process can feel overwhelming, but with the right preparation it becomes one of the most rewarding experiences of your life. This guide walks you through every step.</p>
  
        <h2>Step 1 — Know Your Budget Before You Fall in Love</h2>
        <p>Before browsing listings, get a clear picture of what you can genuinely afford. A common rule of thumb is that your monthly housing costs shouldn't exceed 30% of your gross monthly income. Factor in not just the mortgage, but insurance, service charges, maintenance, and utilities.</p>
        <p>Speak to a mortgage advisor early. Getting a pre-approval letter puts you in a much stronger position when you find the right property — sellers take pre-approved buyers far more seriously.</p>
  
        <h2>Step 2 — Choose the Right Location</h2>
        <p>The property you can always renovate. The location you cannot change. Spend time in the neighbourhoods you're considering at different times of day. Check commute times, school ratings, proximity to amenities, and planned infrastructure developments nearby.</p>
  
        <h2>Step 3 — Work With a Trusted Agent</h2>
        <p>A good real estate agent saves you time, money, and stress. They know the local market, can identify overpriced listings, and will negotiate on your behalf. At Al Areeq, our agents work exclusively in your interest — we're paid on results, not volume.</p>
  
        <h2>Step 4 — The Offer and Negotiation</h2>
        <p>Once you've found the right property, your agent will help you determine a fair offer price based on comparable recent sales. Don't be afraid to negotiate — sellers expect it. Key points beyond price include the completion date, fixtures included, and any repairs needed.</p>
  
        <h2>Step 5 — Legal Checks and Completion</h2>
        <p>Your solicitor will conduct searches, review the title, and handle the transfer of funds. Never skip a professional survey — issues found before exchange give you leverage to renegotiate or walk away without losing your deposit.</p>
      `,
        coverImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&q=85',
        author: { name: 'Sarah Al Mansouri', avatar: 'https://i.pravatar.cc/48?img=47', bio: 'Senior property consultant with 12 years of residential sales experience.' },
        readTime: '6 min',
        date: '2026-03-09',
        featured: true,
        published: true,
        tags: ['Buying', 'First Home', 'Mortgage', 'Tips'],
    },
    {
        id: 2,
        slug: 'property-market-outlook-q1-2026',
        category: 'Market Insights',
        title: 'Property Market Outlook: What\'s Happening in Q1 2026',
        excerpt: 'Prices, demand trends, and the neighbourhoods seeing the strongest growth this quarter.',
        content: `
        <p>The real estate market has entered 2026 with strong momentum. Transaction volumes in the first quarter are tracking ahead of the same period last year, driven by renewed investor confidence, continued population growth, and attractive rental yields compared to global peers.</p>
  
        <h2>Price Trends</h2>
        <p>Residential prices have seen steady appreciation across most segments. Villas and townhouses continue to outperform apartments on a percentage basis, as demand for space and private outdoor areas remains elevated. Prime waterfront locations have seen the sharpest gains.</p>
  
        <h2>Off-Plan vs Ready Properties</h2>
        <p>Off-plan sales have surged, with developers offering flexible payment plans that allow buyers to enter the market with lower upfront capital. However, ready properties remain attractive for end-users who want immediate occupancy and for investors seeking rental income from day one.</p>
  
        <h2>Rental Yields</h2>
        <p>Gross rental yields are holding in the 6–8% range in most established communities — well above what investors can achieve in comparable global cities. This continues to attract international capital, particularly from European and South Asian investors.</p>
  
        <h2>What to Watch</h2>
        <p>Infrastructure announcements and new transport links have historically been reliable leading indicators of price growth in emerging neighbourhoods. Keeping an eye on planned metro extensions and road improvements can give buyers a significant head start.</p>
      `,
        coverImage: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=85',
        author: { name: 'Omar Khalid', avatar: 'https://i.pravatar.cc/48?img=33', bio: 'Head of market research, specialising in residential and commercial trends.' },
        readTime: '4 min',
        date: '2026-03-06',
        featured: false,
        published: true,
        tags: ['Market', 'Prices', 'Investment', '2026'],
    },
    {
        id: 3,
        slug: 'smart-ways-to-invest-in-property-2026',
        category: 'Investment',
        title: '5 Smart Ways to Invest in Property in 2026',
        excerpt: 'From buy-to-let to off-plan flips — a practical breakdown of the strategies working right now.',
        content: `
        <p>Property has consistently been one of the most reliable wealth-building vehicles over the long term. But not all strategies are equal, and what works in one market cycle may not work in another. Here are five approaches worth considering in 2026.</p>
  
        <h2>1. Buy-to-Let in High-Yield Communities</h2>
        <p>Established residential communities with strong tenant demand and limited new supply offer predictable income. Look for areas with high occupancy rates, quality amenities, and good transport links. Aim for gross yields of at least 6% before expenses.</p>
  
        <h2>2. Off-Plan Investment</h2>
        <p>Buying at launch price and selling before or shortly after handover has generated strong returns for investors with good timing. The key risk is developer reputation — stick to established names with a proven track record of on-time delivery.</p>
  
        <h2>3. Commercial Property</h2>
        <p>Retail units, offices, and warehouses typically offer higher yields than residential but come with longer void periods. Well-located commercial units in growing business districts have shown strong capital appreciation alongside income.</p>
  
        <h2>4. Short-Term Rentals</h2>
        <p>In the right location, furnished short-term lets can generate 40–70% more gross income than a standard tenancy. This strategy requires more active management but the returns justify it in high-demand tourist and business travel areas.</p>
  
        <h2>5. Land Banking</h2>
        <p>Acquiring plots in designated growth zones ahead of development activity is a higher-risk, higher-reward strategy. It requires patience — typically a 5–10 year horizon — but the gains when development arrives can be exceptional.</p>
      `,
        coverImage: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1400&q=85',
        author: { name: 'Layla Hassan', avatar: 'https://i.pravatar.cc/48?img=25', bio: 'Investment advisor specialising in residential and commercial property portfolios.' },
        readTime: '5 min',
        date: '2026-03-03',
        featured: false,
        published: true,
        tags: ['Investment', 'Buy-to-Let', 'Rental Yield', 'Strategy'],
    },
    {
        id: 4,
        slug: 'renting-vs-buying-2026',
        category: 'Renting',
        title: 'Renting vs Buying: Which Makes More Sense Right Now?',
        excerpt: 'A straight-talking comparison to help you decide based on your life stage, finances, and goals.',
        content: `
        <p>The rent-vs-buy debate never gets old — and for good reason. The right answer is genuinely different for different people, and the wrong choice is expensive either way. Here is a framework to help you think it through clearly.</p>
  
        <h2>When Renting Is the Smarter Move</h2>
        <p>Renting makes sense when you are uncertain about how long you will stay in the area. Buying, selling, and buying again within two or three years often results in a net loss once you account for transaction costs, agent fees, and registration charges. If you are in a transitional period — new job, new city, growing family — renting buys you time and flexibility.</p>
        <p>Renting also makes sense if the property you want is significantly overpriced relative to rental equivalents. If you can rent a property for far less than the monthly mortgage cost, the difference can be invested productively elsewhere.</p>
  
        <h2>When Buying Makes Sense</h2>
        <p>Buying becomes compelling when you plan to stay for five years or more, when rental yields in the area suggest good value, and when you have a stable income and sufficient deposit. Home ownership builds equity over time and provides stability that renting cannot match.</p>
  
        <h2>The Price-to-Rent Ratio</h2>
        <p>Divide the property purchase price by the annual rent for an equivalent property. A ratio below 15 generally favours buying; above 20 generally favours renting. This is not the only factor, but it is a useful starting point for any comparison.</p>
      `,
        coverImage: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1400&q=85',
        author: { name: 'Sarah Al Mansouri', avatar: 'https://i.pravatar.cc/48?img=47', bio: 'Senior property consultant with 12 years of residential sales experience.' },
        readTime: '3 min',
        date: '2026-02-28',
        featured: false,
        published: true,
        tags: ['Renting', 'Buying', 'Finance', 'Advice'],
    },
    {
        id: 5,
        slug: 'best-family-neighbourhoods-2026',
        category: 'Neighbourhood',
        title: 'The Best Family-Friendly Neighbourhoods to Live In Right Now',
        excerpt: 'Our agents share their picks for safe, well-connected communities with great schools and green spaces.',
        content: `
        <p>Choosing where to live is about much more than square footage and price per metre. For families, the neighbourhood itself — its schools, parks, safety record, community feel, and commute — often matters more than the property itself. Here are the areas our team recommends most frequently.</p>
  
        <h2>Al Raha Gardens</h2>
        <p>One of the most established family communities in the region, Al Raha Gardens offers spacious villas with private gardens, well-maintained parks, and a strong sense of community. The international school options within a short drive are among the best-rated in the area.</p>
  
        <h2>Saadiyat Island</h2>
        <p>For families who want space, culture, and proximity to the beach, Saadiyat delivers on all three. The neighbourhood is quiet and low-density, the schooling options are exceptional, and the beach is walkable. Prices reflect this premium, but residents consistently rate it as worth it.</p>
  
        <h2>Khalifa City</h2>
        <p>Khalifa City offers excellent value for families seeking large villas at more accessible price points. Wide roads, low traffic, and an abundance of parks make it popular with young families. It is also one of the most diverse and welcoming communities in the region.</p>
  
        <h2>Mohammed Bin Zayed City</h2>
        <p>Increasingly popular with families priced out of more central locations, MBZ City has seen significant investment in infrastructure and amenities. Strong rental demand and ongoing development make it one to watch for investors as well as end-users.</p>
      `,
        coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=85',
        author: { name: 'Omar Khalid', avatar: 'https://i.pravatar.cc/48?img=33', bio: 'Head of market research, specialising in residential and commercial trends.' },
        readTime: '4 min',
        date: '2026-02-24',
        featured: false,
        published: true,
        tags: ['Neighbourhood', 'Family', 'Schools', 'Community'],
    },
    {
        id: 6,
        slug: 'property-fees-and-costs-explained',
        category: 'Legal & Finance',
        title: 'Every Fee You Need to Know Before Buying Property',
        excerpt: 'Registration fees, agent commissions, mortgage costs — a clear breakdown so nothing catches you off guard.',
        content: `
        <p>One of the most common surprises for first-time buyers is discovering that the purchase price is only part of what they will spend. Understanding the full cost of acquisition upfront allows you to budget accurately and negotiate more confidently.</p>
  
        <h2>Registration Fee</h2>
        <p>Property transfer is subject to a registration fee paid to the land department. The rate varies by emirate and property type but typically sits between 2% and 4% of the purchase price. This is a one-time cost paid at the point of transfer and is non-negotiable.</p>
  
        <h2>Agent Commission</h2>
        <p>Real estate agent fees are typically 2% of the purchase price. In some transactions the seller covers this cost; in others it is split. Always clarify this in writing before engaging an agent. Be wary of agents who waive their fee — they are often compensated by developers in ways that may not align with your interests.</p>
  
        <h2>Mortgage Arrangement Fees</h2>
        <p>If you are financing the purchase, your bank will charge arrangement and processing fees typically amounting to 1% of the loan value. Some lenders also charge a separate valuation fee, which covers the independent assessment of the property.</p>
  
        <h2>Service Charges</h2>
        <p>Apartments and properties within managed communities are subject to annual service charges that cover maintenance of common areas, security, and facilities. Review the service charge history before buying to avoid surprises after completion.</p>
  
        <h2>Budgeting for the Total Cost</h2>
        <p>As a rule of thumb, budget an additional 6–8% on top of the property price to cover all acquisition costs. This buffer will ensure you are never caught short at completion.</p>
      `,
        coverImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1400&q=85',
        author: { name: 'Layla Hassan', avatar: 'https://i.pravatar.cc/48?img=25', bio: 'Investment advisor specialising in residential and commercial property portfolios.' },
        readTime: '5 min',
        date: '2026-02-20',
        featured: false,
        published: true,
        tags: ['Legal', 'Finance', 'Fees', 'Mortgage'],
    },
];

// ─────────────────────────────────────────────────────────────────────────────
//  DATA ACCESS FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

export function getAllPosts(): Post[] {
    return MOCK_POSTS.filter(p => p.published).sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export function getPostBySlug(slug: string): Post | null {
    return MOCK_POSTS.find(p => p.slug === slug && p.published) ?? null;
}

export function getRelatedPosts(currentSlug: string, category: string, limit = 3): Post[] {
    return MOCK_POSTS.filter(
        p => p.published && p.category === category && p.slug !== currentSlug
    ).slice(0, limit);
}

export function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric',
    });
}

export const CAT_COLORS: Record<string, string> = {
    'Buying Guide': '#0369a1',
    'Market Insights': '#0891b2',
    'Investment': '#059669',
    'Renting': '#7c3aed',
    'Neighbourhood': '#b45309',
    'Legal & Finance': '#be123c',
};