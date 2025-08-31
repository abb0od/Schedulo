import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TranslationService, Language } from '../../../core/services/translation.service';

interface LanguageOption {
  code: Language;
  label: string;
}

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-selector.html',
  styleUrls: ['./language-selector.scss'], // fixed
})
export class LanguageSelectorComponent implements OnInit, OnDestroy {
  currentLang: Language = 'en';
  languages: LanguageOption[] = [
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'العربية' },
    { code: 'fr', label: 'Français' }
  ];

  private langChangeSubscription!: Subscription;

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    this.langChangeSubscription = this.translationService.getCurrentLang().subscribe(
      (lang: Language) => {
        this.currentLang = lang;
      }
    );
  }

  ngOnDestroy(): void {
    this.langChangeSubscription.unsubscribe();
  }

  changeLanguage(lang: Language): void {
    this.translationService.setLanguage(lang); // synchronous
  }
}
