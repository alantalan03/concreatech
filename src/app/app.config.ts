import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { StaticTranslateLoader } from './core/services/translate/static-translate.loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),

    // 🔥 ESTA LÍNEA ES LA CLAVE
    provideRouter(routes),

    importProvidersFrom(
      TranslateModule.forRoot({
        fallbackLang: 'es',
        loader: {
          provide: TranslateLoader,
          useClass: StaticTranslateLoader
        }
      })
    )
  ]
};