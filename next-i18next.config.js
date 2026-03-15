module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar', 'fr', 'es', 'de'], // Add more locales as needed
    localeDetection: false,
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};