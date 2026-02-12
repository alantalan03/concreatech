import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { LanguageService } from 'src/app/core/services/translate/language.service';

type LangOption = {
  code: 'es' | 'en' | 'pt';
  label: string;
  country: string;
};

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent {
  open = false;

  options: LangOption[] = [
    { code: 'en', country: 'US', label: 'English' },
    { code: 'es', country: 'ES', label: 'Español' },
    { code: 'pt', country: 'BR', label: 'Português' },
  ];

  constructor(public langService: LanguageService) {}

  toggle() {
    this.open = !this.open;
  }

  select(lang: 'es' | 'en' | 'pt') {
    this.langService.setLang(lang === 'pt' ? 'en' : lang); // si aún no soportas pt
    this.open = false;
  }

  get currentLabel() {
    return this.langService.currentLang === 'es'
      ? 'MX ES'
      : 'US EN';
  }

  // 🔒 cerrar al click fuera
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.language-selector')) {
      this.open = false;
    }
  }
}