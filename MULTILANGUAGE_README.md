# Multilanguage Support Setup

Your Next.js website now has full multilanguage support using next-i18next. Here's how it works and how to extend it:

## Current Setup

- **Supported Languages**: English (en), Arabic (ar), French (fr), Spanish (es), German (de)
- **Default Language**: English
- **Translation Files**: Located in `public/locales/{language}/common.json`

## How to Use Translations

In any React component:

```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation('common');

  return (
    <div>
      <h1>{t('navbar.home')}</h1>
      <p>{t('buy.housesForSale')}</p>
    </div>
  );
};
```

## How to Change Language

The language can be changed using the dropdown in the navbar or programmatically:

```tsx
import { useLanguage } from './components/LanguageProvider';

const MyComponent = () => {
  const { changeLanguage, currentLanguage, availableLanguages } = useLanguage();

  return (
    <button onClick={() => changeLanguage('ar')}>
      Switch to Arabic
    </button>
  );
};
```

## Adding a New Language

1. **Add to configuration**: Update `next-i18next.config.js` and `app/i18n/settings.ts`
2. **Create translation file**: Add `public/locales/{new-lang}/common.json`
3. **Update LanguageProvider**: Add the new language to `availableLanguages`

Example for adding Italian:

1. Update `next-i18next.config.js`:
```js
locales: ['en', 'ar', 'fr', 'es', 'de', 'it']
```

2. Update `app/i18n/settings.ts`:
```ts
export const languages = ['en', 'ar', 'fr', 'es', 'de', 'it'];
```

3. Create `public/locales/it/common.json` with translations

4. Update `LanguageProvider.tsx`:
```ts
{ code: 'it', name: 'Italian', nativeName: 'Italiano' }
```

## Features

- **Automatic RTL support**: Arabic language automatically sets `dir="rtl"`
- **Persistent language**: Language choice is saved in localStorage
- **SEO friendly**: Each language has its own URL structure (when using Next.js i18n routing)
- **Extensible**: Easy to add more languages and translation namespaces

## Translation Structure

The `common.json` file contains translations organized by sections:
- `navbar`: Navigation items
- `buy`, `rent`, `sell`, etc.: Page-specific content

Add more namespaces by creating additional JSON files (e.g., `about.json`, `contact.json`) and loading them with `useTranslation('about')`.