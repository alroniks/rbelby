export const languages: Record<string, string> = {
  ru: 'Русский',
  be: 'Беларускі',
  en: 'English'
};

export const defaultLang = 'ru';
export const showDefaultLang = true;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as keyof typeof languages;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof languages) {
  return function t(key: string): string {
    // Returns translation key for fallback
    return key;
  };
}
