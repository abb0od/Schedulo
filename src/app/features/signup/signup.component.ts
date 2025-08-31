import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule} from '@angular/forms';
import { TranslationService, Language } from '../../core/services/translation.service';
import { Subscription } from 'rxjs';
import { AuthService, SignUpDto, UserType } from '../../core/services/auth.service';
 
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class SignupComponent {
   translations: Record<string, any> = {};
    private langSub!: Subscription;

  constructor(private fb: FormBuilder, private translateService: TranslationService, private authService: AuthService) {
  }
    credentials: SignUpDto = {
    fullName: '',
    email: '',
    password: '',
    type:UserType.Normal
  };

  userTypes = UserType;
    ngOnInit() {
    this.loadTranslations();
     // Reload translations whenever the language changes
    this.langSub = this.translateService.getCurrentLang().subscribe(() => {
      this.loadTranslations();
    });
  }
  ngOnDestroy() {
    this.langSub?.unsubscribe();
  }
  onSubmit(): void {
    debugger
        if (!this.credentials.email|| !this.credentials.password) return;
    this.authService.signUp(this.credentials).subscribe({
      next: (res) => {
        localStorage.setItem('jwe_token', res.token);
        // Navigate to dashboard if needed
      },
      error: (err) => {
        console.error('Sign-up failed', err);
      }
    });
    }
  
  translate(key: string): string {
    return this.translations[key] || key;
  }
private async loadTranslations() {
  const loaded = await this.translateService.loadTranslations('auth').toPromise();
  this.translations = loaded || {}; // fallback to empty object
 }

}
