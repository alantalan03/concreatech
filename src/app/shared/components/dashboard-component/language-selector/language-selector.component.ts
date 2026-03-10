import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppLang } from 'src/app/core/models/lang.type';
import { LanguageService } from 'src/app/core/services/translate/language.service';

interface LanguageOption {
  code: AppLang;
  label: string;
  flag: string;
}

@Component({
  selector: 'app-language-selector',
  imports:[CommonModule],
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent {

  isOpen = false;

  languages: LanguageOption[] = [
    { code: 'es', label: 'Español', flag: '🇲🇽' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'pt', label: 'Português', flag: '🇧🇷' }
  ];

  constructor(public langService: LanguageService) {}

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  changeLang(lang: AppLang) {
    this.langService.setLang(lang);
    this.isOpen = false;
  }

  get currentLang() {
    return this.languages.find(
      l => l.code === this.langService.currentLang
    );
  }
}