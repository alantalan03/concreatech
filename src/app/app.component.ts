import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

import { ThemeService } from './core/services/theme.service';
import { LanguageService } from './core/services/translate/language.service';
import { LocaleService } from './core/services/translate/locale.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatDialogModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useFactory: (localeService: LocaleService) =>
        localeService.getLocale(),
      deps: [LocaleService],
    },
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private themeService: ThemeService,
    private languageService: LanguageService,
    private localeService: LocaleService
  ) {}

  ngOnInit(): void {
    // 🎨 Tema
    this.themeService.initializeTheme();

    // 🌍 Timezone del dispositivo
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    localStorage.setItem('deviceTimezone', timezone);

    // 🌐 Sincronizar idioma → locale
    this.languageService.lang$.subscribe(lang => {
      const locale = lang === 'es' ? 'es-ES' : 'en-US';
      this.localeService.changeLocale(locale);
    });
  }
}