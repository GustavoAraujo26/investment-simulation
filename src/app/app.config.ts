import { ApplicationConfig, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StoreModule } from '@ngrx/store';
import { titleReducer } from './state/title/title.reducer';

import localePt from '@angular/common/locales/pt';
import { DatePipe, registerLocaleData } from '@angular/common';
import { loadingReducer } from './state/loading/loading.reducer';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpErrorInterceptor } from './interceptors/http-error-interceptor';
import { stocksContainerReducer } from './state/stocks-container/stocks-container.reducer';

registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    importProvidersFrom(StoreModule.forRoot({
      title: titleReducer,
      loading: loadingReducer,
      stocksContainer: stocksContainerReducer
    })),
    {
      provide: LOCALE_ID, useValue: 'pt-BR'
    },
    importProvidersFrom(HttpClientModule),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    DatePipe
  ]
};
