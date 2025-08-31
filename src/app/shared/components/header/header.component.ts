import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../../../app/core/services/translation.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(public translationService: TranslationService) { }

 
}
