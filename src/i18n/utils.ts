import ru from './locales/ru.json';
import be from './locales/be.json';
import en from './locales/en.json';

const ui = {
  ru,
  be,
  en,
};

export const languages = {
  ru: 'Русский',
  be: 'Беларуская',
  en: 'English',
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
    return (ui[lang] as any)[key] || (ui[defaultLang] as any)[key] || key;
  };
}
