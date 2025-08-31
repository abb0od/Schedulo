import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslationService, Language } from './core/services/translation.service';
import { LanguageSelectorComponent } from './shared/components/language-dropdown/language-selector';
import { ThemeToggleComponent } from './shared/components/theme-toggle/theme-toggle.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LanguageSelectorComponent, ThemeToggleComponent, HeaderComponent, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'], // fixed
})
export class AppComponent implements OnInit, OnDestroy {
  protected readonly title = signal('schedulo');
  currentLang: Language = 'en';
  private langChangeSubscription!: Subscription;

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    this.langChangeSubscription = this.translationService.getCurrentLang().subscribe(
      (lang: Language) => {
        this.currentLang = lang;
      }
    );
  }
  get hasToken(): boolean {
    return !!localStorage.getItem('jwe_token');  
  }
  ngOnDestroy(): void {
    this.langChangeSubscription?.unsubscribe();
  }
}
