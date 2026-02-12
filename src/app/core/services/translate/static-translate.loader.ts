import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

import es from 'src/assets/i18n/es.json';
import en from 'src/assets/i18n/en.json';

export class StaticTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    switch (lang) {
      case 'en':
        return of(en);
      case 'es':
      default:
        return of(es);
    }
  }
}