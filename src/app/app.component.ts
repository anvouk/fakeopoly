import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PouchserverService } from './services/pouchserver.service';
import { GameService } from './services/game.service';
import { PlayerService } from './services/player.service';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HomeComponent,
  ],
  providers: [
    PouchserverService,
    PlayerService,
    GameService,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angularFakeopoly';

  constructor(
  ) {}

  ngOnInit(): void {
  }
}
