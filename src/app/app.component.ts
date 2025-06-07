import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServiceLogComponent } from './service-log/service-log.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule, ServiceLogComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
