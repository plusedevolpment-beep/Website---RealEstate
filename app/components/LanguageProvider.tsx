'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Locale, translations } from '../i18n/translations';

interface LanguageContextType {
  currentLanguage: Locale;
  changeLanguage: (lang: Locale) => void;
  availableLanguages: { code: Locale; name: string; nativeName: string }[];
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
  initialLanguage?: Locale;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
  initialLanguage = 'en',
}) => {
  const [currentLanguage, setCurrentLanguage] = useState<Locale>(initialLanguage);

  const availableLanguages: { code: Locale; name: string; nativeName: string }[] = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  ];

  const setLangCookie = (lang: Locale) => {
    if (typeof document === 'undefined') return;
    document.cookie = `lang=${lang}; path=/; max-age=${60 * 60 * 24 * 365}`;
  };

  const changeLanguage = (lang: Locale) => {
    setCurrentLanguage(lang);
    setLangCookie(lang);
  };

  useEffect(() => {
    // Always keep document attributes in sync.
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const t = useMemo(() => (key: string) => {
    const parts = key.split('.');
    let current: any = translations[currentLanguage];
    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part as keyof typeof current];
      } else {
        return key;
      }
    }
    return current;
  }, [currentLanguage]);

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        changeLanguage,
        availableLanguages,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};