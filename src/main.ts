import { AppComponent } from './app/app.component';
import { provideRouter, withHashLocation } from "@angular/router";
import { routes } from './app/app.routes';
import { importProvidersFrom, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withHashLocation()),
    importProvidersFrom(BrowserAnimationsModule),
    provideExperimentalZonelessChangeDetection()
  ],
}).catch(err => console.error(err));
