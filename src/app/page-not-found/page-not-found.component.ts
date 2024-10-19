import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    MatButton,
  ],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {
  constructor(
    private readonly router: Router,
  ) {}

  async goToHomepage() {
    await this.router.navigate(['home']);
  }
}
