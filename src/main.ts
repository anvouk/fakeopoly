import { AppComponent } from './app/app.component';
import { provideRouter, withHashLocation } from "@angular/router";
import { routes } from './app/app.routes';
import { enableProdMode, importProvidersFrom, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withHashLocation()),
    importProvidersFrom(BrowserAnimationsModule),
    provideExperimentalZonelessChangeDetection()
  ],
}).catch(err => console.error(err));
