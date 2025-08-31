import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export type Language = 'en' | 'ar' | 'fr';

interface TranslationCache {
  timestamp: number;
  data: Record<string, string>;
}

type NestedTranslation = string | Record<string, unknown>;

interface TranslationResponse {
  [key: string]: {
    [key: string]: NestedTranslation;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLang = new BehaviorSubject<Language>('en');
  private translations = new Map<string, TranslationCache>();
  private readonly CACHE_DURATION = 3600000; // 1 hour
  private readonly VALID_LANGUAGES: Language[] = ['en', 'ar', 'fr'];

  constructor(private http: HttpClient) {
    const savedLang = localStorage.getItem('language');
    if (savedLang && this.isValidLanguage(savedLang)) {
      this.setLanguage(savedLang as Language);
    }
  }

  getCurrentLang(): Observable<Language> {
    return this.currentLang.asObservable();
  }

  setLanguage(lang: Language): void {
    if (!this.isValidLanguage(lang)) {
      console.error(`Invalid language code: ${lang}`);
      return;
    }
    this.currentLang.next(lang);
    localStorage.setItem('language', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    this.translations.clear();
  }

loadTranslations(page: string): Observable<Record<string, any>> {
  const lang = this.currentLang.value;
  const cacheKey = `${page}_${lang}`;

  const cached = this.translations.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
    return of(cached.data);
  }

  return this.http.get<any>(`assets/dictionary/${page}.${lang}.json`).pipe(
    map(response => {
      const data = response?.[page] || {};
      this.translations.set(cacheKey, { timestamp: Date.now(), data });
      return data;
    }),
    catchError(() => {
      if (lang !== 'en') {
        return this.http.get<any>(`assets/dictionary/${page}.en.json`).pipe(
          map(response => {
            const data = response?.[page] || {};
            this.translations.set(cacheKey, { timestamp: Date.now(), data });
            return data;
          }),
          catchError(() => of({}))
        );
      }
      return of({});
    })
  );
}


  async translate(key: string, page: string): Promise<string> {
    const translations = await this.loadTranslations(page).toPromise();
    return this.getNestedValue(translations, key) || key;
  }

  private isValidLanguage(lang: string): lang is Language {
    return this.VALID_LANGUAGES.includes(lang as Language);
  }

  private flattenObject(obj: Record<string, NestedTranslation>, prefix = ''): Record<string, string> {
    return Object.keys(obj).reduce((acc: Record<string, string>, key: string) => {
      const prefixedKey = prefix ? `${prefix}.${key}` : key;
      const value = obj[key];

      if (value !== null && typeof value === 'object') {
        Object.assign(acc, this.flattenObject(value as Record<string, NestedTranslation>, prefixedKey));
      } else if (typeof value === 'string') {
        acc[prefixedKey] = value;
      }

      return acc;
    }, {});
  }

  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((p, c) => (p && p[c] !== undefined) ? p[c] : null, obj);
  }
}
