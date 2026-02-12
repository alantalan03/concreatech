import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import es from 'src/assets/i18n/es.json';
import en from 'src/assets/i18n/en.json';
import { AppLang } from '../../models/lang.type';

@Injectable({ providedIn: 'root' })
export class LanguageService {

  private langSubject = new BehaviorSubject<AppLang>('es');
  lang$ = this.langSubject.asObservable();

  constructor(private ngxTranslate: TranslateService) {
    // 👇 Cargar traducciones
    this.ngxTranslate.setTranslation('es', es, true);
    this.ngxTranslate.setTranslation('en', en, true);

    const lang = this.resolveInitialLang();
    this.setLang(lang);
  }

  private resolveInitialLang(): AppLang {
    const storedLang = localStorage.getItem('lang');
    return storedLang === 'en' ? 'en' : 'es';
  }

  get currentLang(): AppLang {
    return this.langSubject.value;
  }

  setLang(lang: AppLang) {
    localStorage.setItem('lang', lang);
    this.ngxTranslate.use(lang);
    this.langSubject.next(lang);
  }
}