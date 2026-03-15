export type Locale = 'en' | 'ar';

export interface Translations {
  navbar: {
    home: string;
    buy: string;
    rent: string;
    sell: string;
    projects: string;
    agents: string;
    about: string;
    blog: string;
    contact: string;
    search: string;
    saved: string;
    phone: string;
    email: string;
    languages: Record<Locale, string>;
  };
  buy: {
    propertyTypes: string;
    housesForSale: string;
    apartments: string;
    luxuryHomes: string;
    newProjects: string;
    openHouses: string;
    tools: string;
    mortgageCalculator: string;
    priceTrends: string;
    neighborhoodGuide: string;
  };
  rent: {
    housesForRent: string;
    apartmentsForRent: string;
    commercialRentals: string;
  };
  sell: {
    sellYourProperty: string;
    freePropertyValuation: string;
    sellerGuide: string;
  };
  projects: {
    newLaunches: string;
    upcomingProjects: string;
    investmentOpportunities: string;
  };
  agents: {
    meetTheTeam: string;
    agentProfiles: string;
    becomeAnAgent: string;
  };
  about: {
    companyOverview: string;
    missionVision: string;
    meetTheTeam: string;
    testimonials: string;
    page: {
      hero: {
        badge: string;
        title: string;
        titleAccent: string;
        subtitle: string;
        buttonStory: string;
        buttonTeam: string;
      };
      ceo: {
        title: string;
        quote: string;
        name: string;
        role: string;
      };
      who: {
        eyebrow: string;
        title: string;
        body1: string;
        body2: string;
      };
      stats: {
        yearsExperience: string;
        happyClients: string;
        starLabel: string;
        clientLabel: string;
        dealsLabel: string;
      };
      services: {
        header: string;
        title: string;
        subtitle: string;
        categories: {
          maintenance: string;
          repairs: string;
          renovation: string;
        };
        items: {
          [key: string]: {
            headline: string;
            body: string;
            groups: {
              label: string;
              items: string[];
            }[];
            cta1: string;
            cta2: string;
            steps: string[];
          };
        };
      };
      team: {
        eyebrow: string;
        title: string;
        subtitle: string;
        swipeHint: string;
        dealsClosed: string;
        speciality: string;
      };
    };
  };
  blog: {
    marketTrends: string;
    investmentTips: string;
    newsUpdates: string;
  };
  branding: {
    name: string;
    tag: string;
  };
  mobile: {
    utilTag: string;
    searchPlaceholder: string;
    login: string;
    signup: string;
    listProperty: string;
    bookViewing: string;
  };
  search: {
    locationPlaceholder: string;
    typeLabel: string;
    priceLabel: string;
    goButton: string;
    anyType: string;
    anyPrice: string;
    typeApartment: string;
    typeVilla: string;
    typePenthouse: string;
    priceUnder500: string;
    price500to1: string;
    price1to3: string;
    price3Plus: string;
  };
  home: {
    hero: {
      trustBadge: string;
      title: string;
      titleAccent: string;
      description: string;
      mobileDescription: string;
      cta: string;
      search: {
        rentTab: string;
        buyTab: string;
        locationLabel: string;
        propertyTypeLabel: string;
        rentLabel: string;
        priceLabel: string;
        rentOption1: string;
        rentOption2: string;
        saleOption1: string;
        saleOption2: string;
      };
      availableNow: string;
    };
    listings: {
      eyebrow: string;
      heading: string;
      viewAll: string;
      filters: {
        all: string;
        rent: string;
        sale: string;
      };
      noResults: string;
      stats: {
        title: string;
        subtitle: string;
        verifiedListings: string;
        areasCovered: string;
        clientSatisfaction: string;
      };
    };
    aboutSection: {
      eyebrow: string;
      title: string;
      trustedBy: string;
      ctaTitle: string;
      ctaSubtitle: string;
      ctaButton: string;
      learnMore: string;
    };
    services: {
      realEstate: {
        title: string;
        description: string;
      };
      maintenance: {
        title: string;
        description: string;
      };
      renovation: {
        title: string;
        description: string;
      };
    };
    propertyTags: {
      featured: string;
      new: string;
      hot: string;
    };
    propertySpecs: {
      beds: string;
      baths: string;
      area: string;
    };
    footer: {
      ctaTitle: string;
      browseListings: string;
      contactAgent: string;
      brandDesc: string;
      properties: string;
      company: string;
      resources: string;
      buy: string;
      rent: string;
      luxury: string;
      about: string;
      agents: string;
      contact: string;
      mortgageCalculator: string;
      marketReports: string;
      privacy: string;
      terms: string;
      copyright: string;
    };
  };
}

export const translations: Record<Locale, Translations> = {
  en: {
    navbar: {
      home: 'Home',
      buy: 'Buy',
      rent: 'Rent',
      sell: 'Sell',
      projects: 'Projects',
      agents: 'Agents',
      about: 'About',
      blog: 'Blog',
      contact: 'Contact',
      search: 'Search',
      saved: 'Saved',
      phone: '+971 4 123 4567',
      email: 'info@alareeq.com',
      languages: {
        en: 'English',
        ar: 'العربية',
      },
    },
    buy: {
      propertyTypes: 'Property Types',
      housesForSale: 'Houses for Sale',
      apartments: 'Apartments',
      luxuryHomes: 'Luxury Homes',
      newProjects: 'New Projects',
      openHouses: 'Open Houses',
      tools: 'Tools',
      mortgageCalculator: 'Mortgage Calculator',
      priceTrends: 'Price Trends',
      neighborhoodGuide: 'Neighborhood Guide',
    },
    rent: {
      housesForRent: 'Houses for Rent',
      apartmentsForRent: 'Apartments for Rent',
      commercialRentals: 'Commercial Rentals',
    },
    sell: {
      sellYourProperty: 'Sell Your Property',
      freePropertyValuation: 'Free Property Valuation',
      sellerGuide: 'Seller Guide',
    },
    projects: {
      newLaunches: 'New Launches',
      upcomingProjects: 'Upcoming Projects',
      investmentOpportunities: 'Investment Opportunities',
    },
    agents: {
      meetTheTeam: 'Meet The Team',
      agentProfiles: 'Agent Profiles',
      becomeAnAgent: 'Become an Agent',
    },
    about: {
      companyOverview: 'Company Overview',
      missionVision: 'Mission & Vision',
      meetTheTeam: 'Meet The Team',
      testimonials: 'Testimonials',
      page: {
        hero: {
          badge: 'RERA Licensed · Est. 2012 · UAE',
          title: 'Real estate, done the',
          titleAccent: 'right way.',
          subtitle: '12 years of honest deals. Built on referrals, not ads.',
          buttonStory: 'Our Story',
          buttonTeam: 'Meet the Team',
        },
        ceo: {
          title: 'A message from our founder',
          quote: 'Real estate should feel like empowerment, not a trap. We built Al Areeq on one promise — to always put our clients first, no matter what.',
          name: 'Mohammed Al Areeq',
          role: 'Founder & CEO · Al Areeq Real Estate',
        },
        who: {
          eyebrow: 'Who We Are',
          title: 'A Dubai agency you can actually trust.',
          body1: 'Founded in Dubai in 2012, Al Areeq is a RERA-licensed agency built on one principle — honest, pressure-free guidance for every client.',
          body2: 'Every client we have ever had came through a referral. No ads, no gimmicks — just 12 years of deals done right.',
        },
        stats: {
          yearsExperience: 'Years Experience',
          happyClients: 'Happy Clients',
          starLabel: 'Licensed since 2012',
          clientLabel: 'Families & investors',
          coverage: 'Across Dubai & the UAE',
          dealsLabel: 'Deals closed',
        },
        services: {
          header: 'Our Services',
          title: 'Everything your property needs.',
          subtitle: 'From routine maintenance to full renovations — all under one roof.',
          howItWorks: 'How it works',
          categories: {
            maintenance: 'Maintenance',
            repairs: 'Repairs',
            renovation: 'Renovation',
          },
          items: {
            maintenance: {
              headline: 'Proactive care, year-round.',
              body: 'We keep your property in peak condition so small issues never become expensive ones.',
              groups: [
                { label: 'Upkeep', items: ['AC servicing', 'Deep cleaning'] },
                { label: 'Checks', items: ['Plumbing & electrical', 'Pest control'] },
              ],
              cta1: 'Get a Maintenance Plan',
              cta2: 'View Packages',
              steps: ['Contact us via call or WhatsApp', 'Free on-site assessment', 'We schedule & execute the work', 'Sign-off when you are satisfied'],
            },
            repairs: {
              headline: 'Fast fixes. Zero hassle.',
              body: 'Our vetted team responds the same day and gets it right the first time — 7 days a week.',
              groups: [
                { label: 'Common', items: ['Plumbing & electrical', 'Carpentry & flooring'] },
                { label: 'Finishes', items: ['Painting & patching', 'Fixture replacement'] },
              ],
              cta1: 'Request a Repair',
              cta2: 'See All Repair Jobs',
              steps: ['Describe the issue to our team', 'Technician arrives same day', 'Repair completed & tested', 'You approve before we leave'],
            },
            renovation: {
              headline: 'Reimagine your space.',
              body: 'From a single room to a full fit-out — on budget, on schedule, beautifully finished.',
              groups: [
                { label: 'Spaces', items: ['Kitchen & bathroom', 'Full interior fit-out'] },
                { label: 'Finishes', items: ['Flooring & tiling', 'Painting & joinery'] },
              ],
              cta1: 'Start Your Renovation',
              cta2: 'View Past Projects',
              steps: ['Share your vision & budget', 'We present a design proposal', 'Construction begins on schedule', 'Final walkthrough & handover'],
            },
          },
        },
        team: {
          eyebrow: 'The People Behind Every Deal',
          title: 'Meet our team.',
          subtitle: 'Specialists across every segment of Dubai real estate — residential, commercial, and beyond.',
          swipeHint: 'swipe',
          dealsClosed: 'Deals closed',
          speciality: 'Speciality',
          members: [
            {
              name: 'Mohammed Al Areeq',
              role: 'Founder & CEO',
              specialty: 'Luxury Residential',
              deals: '+340',
              langs: ['ar', 'en'],
              image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=85',
            },
            {
              name: 'Sara Al Mansouri',
              role: 'Senior Property Advisor',
              specialty: 'Off-Plan & Investment',
              deals: '+180',
              langs: ['ar', 'en', 'fr'],
              image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=85',
            },
            {
              name: 'James Harrington',
              role: 'Head of Leasing',
              specialty: 'Commercial & Retail',
              deals: '+220',
              langs: ['en'],
              image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=85',
            },
            {
              name: 'Priya Sharma',
              role: 'Client Relations Lead',
              specialty: 'Expat & Family Homes',
              deals: '+150',
              langs: ['en', 'hi'],
              image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&q=85',
            },
          ],
        },
        vision: {
          eyebrow: 'Our Purpose',
          headingPrefix: 'Vision &',
          headingEm: 'Mission.',
          sub: 'Two sides of the same promise — where we stand today, and where we\'re taking our clients tomorrow.',
          cards: {
            mission: {
              tag: 'Mission',
              title: 'What we do, every single day.',
              body: 'We deliver honest, expert guidance to every client — buyers, sellers, and investors alike. No pressure, no gimmicks. Just 12 years of doing the right thing, one deal at a time.',
              pills: ['Transparent Advice', 'Client-First', 'RERA Licensed'],
            },
            vision: {
              tag: 'Vision',
              title: 'Where we\'re heading.',
              body: 'To become Dubai\'s most trusted real estate name — not the largest, but the most referred. A firm where every client becomes a lifelong advocate because we never stopped earning their trust.',
              pills: ['Long-Term Trust', 'Built on Referrals', 'Dubai & Beyond'],
            },
          },
          nav: {
            mission: 'Mission',
            vision: 'Vision',
          },
        },
        testimonials: {
          badge: 'Client Reviews',
          heading: 'Trusted by clients',
          headingMuted: 'across Dubai.',
          sub: 'Every client we\'ve worked with came through a referral. Here\'s what they say.',
        },
        cta: {
          eyebrow: 'Let\'s Get Started',
          headingPrefix: 'Ready to Find Your',
          headingEm: 'Dream Property?',
          sub: 'Whether you\'re buying, selling, or investing — our team is ready to guide you every step of the way.',
          primary: 'Contact Us',
          secondary: 'View Listings',
          stats: {
            deals: 'Deals Closed',
            experience: 'Experience',
            satisfaction: 'Client Satisfaction',
            rating: 'Average Rating',
          },
        },
        footer: {
          rera: 'RERA Licensed',
        },
      },
    },
    blog: {
      marketTrends: 'Market Trends',
      investmentTips: 'Investment Tips',
      newsUpdates: 'News & Updates',
    },
    mega: {
      newLaunchesSub: 'Discover premium projects before they sell out.',
    },
    branding: {
      name: 'Al Areeq',
      tag: 'Luxury Real Estate',
    },
    mobile: {
      utilTag: 'Luxury Real Estate',
      searchPlaceholder: 'Search properties...',
      login: 'Log In',
      signup: 'Sign Up',
      listProperty: 'List Your Property',
      bookViewing: 'Book a Viewing',
    },
    search: {
      locationPlaceholder: 'City or area...',
      typeLabel: 'Type',
      priceLabel: 'Price',
      goButton: 'Go',
      anyType: 'Any Type',
      anyPrice: 'Any Price',
      typeApartment: 'Apartment',
      typeVilla: 'Villa',
      typePenthouse: 'Penthouse',
      priceUnder500: 'Under $500K',
      price500to1: '$500K-$1M',
      price1to3: '$1M-$3M',
      price3Plus: '$3M+',
    },
    home: {
      hero: {
        trustBadge: 'Trusted by 10,000+ Families',
        title: 'Find Your Perfect',
        titleAccent: 'Home',
        description: 'Verified properties, transparent pricing, trusted by thousands.',
        mobileDescription: 'Find your perfect home with verified listings.',
        cta: 'Get Started',
        search: {
          rentTab: 'For Rent',
          buyTab: 'For Sale',
          locationLabel: 'Location',
          propertyTypeLabel: 'Property Type',
          rentLabel: 'Monthly Rent',
          priceLabel: 'Price Range',
          rentOption1: '$8,000–$12,000/mo',
          rentOption2: '$12,000–$20,000/mo',
          saleOption1: '$500K–$1M',
          saleOption2: '$1M–$2M',
        },
        availableNow: 'Available Now',
      },
      listings: {
        eyebrow: 'Featured Listings',
        heading: 'Handpicked Properties For You',
        viewAll: 'View All',
        filters: {
          all: 'All',
          rent: 'For Rent',
          sale: 'For Sale',
        },
        noResults: '🏠 No properties match your filters.',
        stats: {
          title: 'Why Choose Dream Homes',
          subtitle: 'Join thousands of satisfied clients who found their perfect property with us',
          verifiedListings: 'Verified Listings',
          areasCovered: 'Areas Covered',
          clientSatisfaction: 'Client Satisfaction',
        },
      },
      aboutSection: {
        eyebrow: 'What We Offer',
        title: 'Everything your property needs.',
        trustedBy: 'Trusted by 10,000+ Families',
        ctaTitle: 'Ready to start?',
        ctaSubtitle: "Let's find your perfect home today.",
        ctaButton: 'Get Started',
        learnMore: 'Learn More',
      },
      services: {
        realEstate: {
          title: 'Real Estate',
          description: 'Buy, sell, or invest with confidence. We match you to the right property at the right price.',
        },
        maintenance: {
          title: 'Home Maintenance',
          description: 'Year-round care for your property. From routine inspections to urgent repairs.',
        },
        renovation: {
          title: 'Repair & Renovation',
          description: 'Transform any space with our renovation experts. On time, on budget, every time.',
        },
      },
      propertyTags: {
        featured: 'Featured',
        new: 'New',
        hot: 'Hot',
      },
      propertySpecs: {
        beds: 'Beds',
        baths: 'Baths',
        area: 'ft²',
      },
      footer: {
        ctaTitle: 'Find your dream home today.',
        browseListings: 'Browse Listings',
        contactAgent: 'Contact Agent',
        brandDesc: 'Trusted real estate partner helping families buy, rent and invest in premium properties since 2012.',
        properties: 'Properties',
        company: 'Company',
        resources: 'Resources',
        buy: 'Buy',
        rent: 'Rent',
        luxury: 'Luxury',
        about: 'About',
        agents: 'Agents',
        contact: 'Contact',
        mortgageCalculator: 'Mortgage Calculator',
        marketReports: 'Market Reports',
        privacy: 'Privacy',
        terms: 'Terms',
        copyright: '© {year} {brand}. All rights reserved.',
      },
    },
  },
  ar: {
    navbar: {
      home: 'الرئيسية',
      buy: 'شراء',
      rent: 'إيجار',
      sell: 'بيع',
      projects: 'المشاريع',
      agents: 'الوكلاء',
      about: 'حولنا',
      blog: 'المدونة',
      contact: 'اتصل بنا',
      search: 'بحث',
      saved: 'المحفوظات',
      phone: '+971 4 123 4567',
      email: 'info@alareeq.com',
      languages: {
        en: 'English',
        ar: 'العربية',
      },
    },
    buy: {
      propertyTypes: 'أنواع العقارات',
      housesForSale: 'منازل للبيع',
      apartments: 'شقق',
      luxuryHomes: 'منازل فاخرة',
      newProjects: 'مشاريع جديدة',
      openHouses: 'منازل مفتوحة',
      tools: 'أدوات',
      mortgageCalculator: 'حاسبة الرهن العقاري',
      priceTrends: 'اتجاهات الأسعار',
      neighborhoodGuide: 'دليل الأحياء',
    },
    rent: {
      housesForRent: 'منازل للإيجار',
      apartmentsForRent: 'شقق للإيجار',
      commercialRentals: 'إيجارات تجارية',
    },
    sell: {
      sellYourProperty: 'بيع عقارك',
      freePropertyValuation: 'تقييم عقاري مجاني',
      sellerGuide: 'دليل البائع',
    },
    projects: {
      newLaunches: 'إطلاقات جديدة',
      upcomingProjects: 'مشاريع قادمة',
      investmentOpportunities: 'فرص استثمارية',
    },
    agents: {
      meetTheTeam: 'تعرف على الفريق',
      agentProfiles: 'ملفات الوكلاء',
      becomeAnAgent: 'كن وكيلاً',
    },
    about: {
      companyOverview: 'نظرة عامة على الشركة',
      missionVision: 'الرسالة والرؤية',
      meetTheTeam: 'تعرف على الفريق',
      testimonials: 'الشهادات',
      page: {
        hero: {
          badge: 'مرخصة من هيئة التنظيم العقاري · منذ 2012 · الإمارات',
          title: 'العقارات،',
          titleAccent: 'على النحو الصحيح.',
          subtitle: '12 سنة من الصفقات النزيهة. مبنية على الإحالات، لا الإعلانات.',
          buttonStory: 'قصتنا',
          buttonTeam: 'تعرف على الفريق',
        },
        ceo: {
          title: 'رسالة من مؤسسنا',
          quote: 'يجب أن يشعر العقار بأنه تمكين، لا فخ. بنينا ألعريق على وعد واحد — أن نضع عملائنا أولاً دائمًا، بغض النظر عن أي شيء.',
          name: 'محمد العريق',
          role: 'المؤسس والرئيس التنفيذي · ألعريق للعقارات',
        },
        who: {
          eyebrow: 'من نحن',
          title: 'وكالة دبي يمكنك الوثوق بها فعليًا.',
          body1: 'تأسست في دبي عام 2012، ألعريق وكالة مرخّصة من هيئة التنظيم العقاري وتعمل بمبدأ واحد — توجيه نزيه بدون ضغط لكل عميل.',
          body2: 'جميع عملائنا الذين تعاملنا معهم جاءوا عبر إحالة. لا إعلانات، لا حيل — فقط 12 سنة من الصفقات الصحيحة.',
        },
        stats: {
          yearsExperience: 'سنوات الخبرة',
          happyClients: 'عملاء سعداء',
          starLabel: 'مرخصة منذ 2012',
          clientLabel: 'عائلات ومستثمرون',
          coverage: 'في جميع أنحاء دبي والإمارات',
          dealsLabel: 'الصفقات المغلقة',
        },
        services: {
          header: 'خدماتنا',
          title: 'كل ما يحتاجه عقارك.',
          subtitle: 'من الصيانة الروتينية إلى التجديدات الكاملة — كل شيء تحت سقف واحد.',
          howItWorks: 'كيف يعمل',
          categories: {
            maintenance: 'الصيانة',
            repairs: 'الإصلاحات',
            renovation: 'التجديد',
          },
          items: {
            maintenance: {
              headline: 'رعاية استباقية على مدار العام.',
              body: 'نحافظ على عقارك في أفضل حالاته حتى لا تتحول المشاكل الصغيرة إلى مكلفة.',
              groups: [
                { label: 'الصيانة', items: ['صيانة التكييف', 'تنظيف عميق'] },
                { label: 'الفحوصات', items: ['السباكة والكهرباء', 'مكافحة الحشرات'] },
              ],
              cta1: 'احصل على خطة صيانة',
              cta2: 'عرض الباقات',
              steps: ['اتصل بنا عبر الهاتف أو الواتسآب', 'تقييم مجاني في الموقع', 'نحدد موعدًا وننفذ العمل', 'التوقيع عند رضاك'],
            },
            repairs: {
              headline: 'حلول سريعة بلا عناء.',
              body: 'فريقنا الموثوق يتجاوب في نفس اليوم ويصلح بشكل صحيح من المرة الأولى — 7 أيام في الأسبوع.',
              groups: [
                { label: 'شائع', items: ['السباكة والكهرباء', 'النجارة والأرضيات'] },
                { label: 'التشطيبات', items: ['الطلاء والتصليحات', 'استبدال التجهيزات'] },
              ],
              cta1: 'اطلب إصلاحًا',
              cta2: 'عرض جميع أعمال الإصلاح',
              steps: ['وصف المشكلة لفريقنا', 'الوصول بنفس اليوم', 'الإصلاح واختباره', 'أنت توافق قبل المغادرة'],
            },
            renovation: {
              headline: 'أعد تصور مساحتك.',
              body: 'من غرفة واحدة إلى تجديد كامل — ضمن الميزانية والجدول، وبلمسة أنيقة.',
              groups: [
                { label: 'المساحات', items: ['المطبخ والحمام', 'التجهيزات الداخلية الكاملة'] },
                { label: 'التشطيبات', items: ['الأرضيات والبلاط', 'الطلاء والنجارة'] },
              ],
              cta1: 'ابدأ تجديدك',
              cta2: 'عرض مشاريع سابقة',
              steps: ['شارك رؤيتك وميزانيتك', 'نقدم عرض تصميم', 'يبدأ البناء حسب الجدول', 'جولة ختامية وتسليم'],
            },
          },
        },
        team: {
          eyebrow: 'الناس وراء كل صفقة',
          title: 'تعرف على فريقنا.',
          subtitle: 'المتخصصون في كل جانب من جوانب سوق دبي العقاري — سكني، تجاري، وأكثر.',
          swipeHint: 'اسحب',
          dealsClosed: 'الصفقات المغلقة',
          speciality: 'التخصص',
        },
        vision: {
          eyebrow: 'هدفنا',
          headingPrefix: 'الرؤية و',
          headingEm: 'المهمة.',
          sub: 'جانبان من نفس الوعد — أين نحن اليوم، وإلى أين نأخذ عملائنا غدًا.',
          cards: {
            mission: {
              tag: 'المهمة',
              title: 'ما نقوم به كل يوم.',
              body: 'نقدم إرشادًا صادقًا وخبيرًا لكل عميل — المشترين والبائعين والمستثمرين على حد سواء. لا ضغط، ولا حيل. فقط 12 سنة من القيام بالأمر الصحيح، صفقة بعد صفقة.',
              pills: ['نصيحة شفافة', 'العميل أولاً', 'مرخصة من جهة التنظيم'],
            },
            vision: {
              tag: 'الرؤية',
              title: 'إلى أين نتجه.',
              body: 'أن نصبح الاسم الأكثر ثقة في دبي في مجال العقارات — ليس الأكبر، بل الأكثر إحالة. شركة يصبح كل عميل فيها مدافعًا مدى الحياة لأننا لم نتوقف عن كسب ثقته.',
              pills: ['ثقة طويلة الأمد', 'مبني على التوصيات', 'دبي وما بعدها'],
            },
          },
          nav: {
            mission: 'المهمة',
            vision: 'الرؤية',
          },
        },
        testimonials: {
          badge: 'آراء العملاء',
          heading: 'موثوق به من قبل العملاء',
          headingMuted: 'في جميع أنحاء دبي.',
          sub: 'كل عميل عملنا معه جاء عبر إحالة. هذا ما يقولونه.',
        },
        cta: {
          eyebrow: 'لنبدأ',
          headingPrefix: 'هل أنت مستعد للعثور على',
          headingEm: 'عقار أحلامك؟',
          sub: 'سواء كنت تشتري، تبيع، أو تستثمر — فريقنا جاهز لإرشادك في كل خطوة.',
          primary: 'اتصل بنا',
          secondary: 'عرض العقارات',
          stats: {
            deals: 'الصفقات المغلقة',
            experience: 'الخبرة',
            satisfaction: 'رضا العملاء',
            rating: 'متوسط التقييم',
          },
        },
        footer: {
          rera: 'مرخصة من هيئة التنظيم العقاري',
        },
      },
    },
    blog: {
      marketTrends: 'اتجاهات السوق',
      investmentTips: 'نصائح الاستثمار',
      newsUpdates: 'الأخبار والتحديثات',
    },
    mega: {
      newLaunchesSub: 'اكتشف المشاريع المميزة قبل أن تنفد.',
    },
    branding: {
      name: 'أل عريق',
      tag: 'العقارات الفاخرة',
    },
    mobile: {
      utilTag: 'العقارات الفاخرة',
      searchPlaceholder: 'ابحث عن عقارات...',
      login: 'تسجيل الدخول',
      signup: 'إنشاء حساب',
      listProperty: 'أضف عقارًا',
      bookViewing: 'حجز زيارة',
    },
    search: {
      locationPlaceholder: 'المدينة أو المنطقة...',
      typeLabel: 'النوع',
      priceLabel: 'السعر',
      goButton: 'اذهب',
      anyType: 'أي نوع',
      anyPrice: 'أي سعر',
      typeApartment: 'شقة',
      typeVilla: 'فيلا',
      typePenthouse: 'بنغل',
      priceUnder500: 'أقل من 500 ألف$',
      price500to1: '500 ألف$ - 1 مليون$',
      price1to3: '1 مليون$ - 3 مليون$',
      price3Plus: 'أكثر من 3 مليون$',
    },
    home: {
      hero: {
        trustBadge: 'موثوق من قبل أكثر من 10,000 عائلة',
        title: 'اعثر على',
        titleAccent: 'المنزل المثالي',
        description: 'عقارات موثوقة، أسعار شفافة، موثوق من قبل الآلاف.',
        mobileDescription: 'اعثر على منزلك المثالي مع قوائم موثوقة.',
        cta: 'ابدأ الآن',
        search: {
          rentTab: 'للإيجار',
          buyTab: 'للبيع',
          locationLabel: 'الموقع',
          propertyTypeLabel: 'نوع العقار',
          rentLabel: 'الإيجار الشهري',
          priceLabel: 'نطاق السعر',
          rentOption1: '8,000$–12,000$/شهري',
          rentOption2: '12,000$–20,000$/شهري',
          saleOption1: '500 ألف$–1 مليون$',
          saleOption2: '1 مليون$–2 مليون$',
        },
        availableNow: 'متاح الآن',
      },
      listings: {
        eyebrow: 'القوائم المميزة',
        heading: 'عقارات مختارة خصيصًا لك',
        viewAll: 'عرض الكل',
        filters: {
          all: 'الكل',
          rent: 'للإيجار',
          sale: 'للبيع',
        },
        noResults: '🏠 لا توجد عقارات تطابق فلترتك.',
        stats: {
          title: 'لماذا تختارنا؟',
          subtitle: 'انضم إلى آلاف العملاء الراضين الذين وجدوا عقارهم المثالي معنا',
          verifiedListings: 'إعلانات موثوقة',
          areasCovered: 'المناطق المغطاة',
          clientSatisfaction: 'رضا العملاء',
        },
      },
      aboutSection: {
        eyebrow: 'ماذا نقدم',
        title: 'كل ما يحتاجه عقارك.',
        trustedBy: 'موثوق من قبل أكثر من 10,000 عائلة',
        ctaTitle: 'هل أنت مستعد للبدء؟',
        ctaSubtitle: 'لنجد منزلك المثالي اليوم.',
        ctaButton: 'ابدأ الآن',
        learnMore: 'تعرف أكثر',
      },
      services: {
        realEstate: {
          title: 'العقارات',
          description: 'اشترِ، بِع، أو استثمر بثقة. نساعدك في العثور على العقار المناسب بالسعر المناسب.',
        },
        maintenance: {
          title: 'صيانة المنزل',
          description: 'رعاية سنوية لعقارك. من الفحوصات الدورية إلى الإصلاحات العاجلة.',
        },
        renovation: {
          title: 'الترميم والتجديد',
          description: 'حوّل أي مساحة مع خبراء الترميم. في الوقت المحدد، ضمن الميزانية، دائماً.',
        },
      },
      propertyTags: {
        featured: 'مميز',
        new: 'جديد',
        hot: 'رائج',
      },
      propertySpecs: {
        beds: 'غرف',
        baths: 'حمامات',
        area: 'قدم²',
      },
      footer: {
        ctaTitle: 'اعثر على منزل أحلامك اليوم.',
        browseListings: 'تصفح العقارات',
        contactAgent: 'اتصل بوكيل',
        brandDesc: 'شريك عقاري موثوق يساعد العائلات على الشراء والإيجار والاستثمار في عقارات مميزة منذ 2012.',
        properties: 'العقارات',
        company: 'الشركة',
        resources: 'الموارد',
        buy: 'شراء',
        rent: 'إيجار',
        luxury: 'فاخرة',
        about: 'حول',
        agents: 'الوكلاء',
        contact: 'اتصل',
        mortgageCalculator: 'حاسبة الرهن العقاري',
        marketReports: 'تقارير السوق',
        privacy: 'الخصوصية',
        terms: 'الشروط',
        copyright: '© {year} {brand}. جميع الحقوق محفوظة.',
      },
    },
  },
};
