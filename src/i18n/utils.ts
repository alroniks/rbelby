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

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof languages;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof languages) {
  return function t(key: string): string {
    return (ui[lang] as any)[key] || (ui[defaultLang] as any)[key] || key;
  };
}

export function useTranslatedPath(lang: keyof typeof languages) {
  return function translatePath(path: string, l: string = lang) {
    if (path.startsWith('http')) return path; // Skip external links

    // Normalize path to not have leading slash for processing
    const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
    const segments = normalizedPath.split('/').filter(Boolean);

    // If the path already has a locale prefix, remove it to normalize
    if (segments[0] in languages) {
      segments.shift();
    }

    const targetPath = '/' + segments.join('/');

    return !defaultLang || l === defaultLang
      ? targetPath === '/'
        ? '/'
        : targetPath
      : `/${l}${targetPath === '/' ? '' : targetPath}`;
  };
}
