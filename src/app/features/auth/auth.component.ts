import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslationService, Language } from '../../core/services/translation.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
 @Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  credentials = {
    email: '',
    password: ''
  };

translations: Record<string, any> = {};
  private langSub!: Subscription;

  constructor(private translationService: TranslationService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadTranslations();
     // Reload translations whenever the language changes
    this.langSub = this.translationService.getCurrentLang().subscribe(() => {
      this.loadTranslations();
    });
  }

  ngOnDestroy() {
    this.langSub?.unsubscribe();
  }

private async loadTranslations() {
  const loaded = await this.translationService.loadTranslations('auth').toPromise();
  this.translations = loaded || {}; // fallback to empty object
 }

  translate(key: string): string {
    return this.translations[key] || key;
  }

  onSignIn(event: Event) {
    event.preventDefault();
    console.log('Sign in attempt with:', this.credentials);
    this.authService.signIn(this.credentials).subscribe({
      next: (res) => {
        localStorage.setItem('jwe_token', res.token);
        // Navigate to main page
        this.router.navigate(['/main']);

      },
      error: (err) => {
        console.error('Sign-up failed', err);
      }
    });
  }
}
