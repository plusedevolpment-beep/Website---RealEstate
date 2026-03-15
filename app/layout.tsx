import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from './components/LanguageProvider';

const inter = Inter({ subsets: ['latin'] });
const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Al Areeq - Luxury Real Estate',
  description: 'Find your perfect home with Al Areeq Luxury Real Estate',
};

const getInitialLanguage = async () => {
  const cookieStore = await cookies();
  const lang = cookieStore.get('lang')?.value;
  return lang === 'ar' ? 'ar' : 'en';
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialLanguage = await getInitialLanguage();
  const dir = initialLanguage === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={initialLanguage} dir={dir}>
      <body className={`${inter.className} ${outfit.className}`}>
        <LanguageProvider initialLanguage={initialLanguage}>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}