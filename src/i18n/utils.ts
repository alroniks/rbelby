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

/**
 * Parses an entry ID to separate the base canonical ID from its language suffix.
 * E.g. "2026/22-rajona.en" -> { baseId: "2026/22-rajona", lang: "en" }
 */
export function parseEntryId(id: string): { baseId: string; lang: string } {
  const parts = id.split('.');
  const lastSegment = parts[parts.length - 1];
  const hasLocale = ['en', 'be'].includes(lastSegment);
  const lang = hasLocale ? lastSegment : 'ru';
  const baseId = hasLocale ? parts.slice(0, -1).join('.') : id;
  return { baseId, lang };
}

/**
 * Returns the correct localized content entry for a specific base entry and target language,
 * with a reliable fallback path.
 */
export function getEntryForLang<T>(
  entries: T[],
  baseId: string,
  targetLang: string
): T | undefined {
  // 1. Try exact match for target language (e.g. baseId.en or baseId if target is default)
  const targetId =
    targetLang === defaultLang ? baseId : `${baseId}.${targetLang}`;
  let entry = (entries as any[]).find((e) => e.id === targetId);
  if (entry) return entry;

  // 2. Fall back to default language (e.g. baseId)
  entry = (entries as any[]).find((e) => e.id === baseId);
  if (entry) return entry;

  // 3. Fall back to first available translation as a last resort
  return (entries as any[]).find((e) => {
    const { baseId: bId } = parseEntryId(e.id);
    return bId === baseId;
  });
}

/**
 * Filters a collection to return only the single most appropriate translation for each unique entry
 * based on the target language.
 */
export function getLocalizedCollection<T>(
  entries: T[],
  targetLang: string
): T[] {
  // Find all unique base canonical IDs
  const uniqueBaseIds = Array.from(
    new Set(
      (entries as any[]).map((e) => {
        const { baseId } = parseEntryId(e.id);
        return baseId;
      })
    )
  );

  return uniqueBaseIds
    .map((baseId) => getEntryForLang(entries, baseId, targetLang))
    .filter(Boolean) as T[];
}
