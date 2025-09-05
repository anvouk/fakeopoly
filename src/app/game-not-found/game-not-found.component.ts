import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game-not-found',
  imports: [MatButton],
  templateUrl: './game-not-found.component.html',
  styleUrl: './game-not-found.component.scss',
})
export class GameNotFoundComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  gameId: string = '';

  ngOnInit(): void {
    this.route.queryParams.subscribe(async (params) => {
      this.gameId = params['id'];
    });
  }

  async goToHomepage() {
    await this.router.navigate(['home']);
  }
}
