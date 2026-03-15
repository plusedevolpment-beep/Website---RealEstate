'use client';

import { useEffect } from 'react';
import '../i18n/client';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // i18n is initialized in the client.ts file
  }, []);

  return <>{children}</>;
}