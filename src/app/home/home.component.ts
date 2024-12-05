import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import gameService, { GameCreationOptions } from '../services/game.service';
import { Router } from '@angular/router';
import { CreateModalComponent } from './create-modal/create-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    private readonly router: Router,
    private readonly dialog: MatDialog
  ) {}

  async beginNewGameCreation() {
    console.log('beginNewGameCreation');
    this.openCreateNewGameDialog();
  }

  openCreateNewGameDialog() {
    const dialogRef = this.dialog.open(CreateModalComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result != null) {
        await this.createNewGame(result);
      }
    });
  }

  async createNewGame(gameOpts: GameCreationOptions) {
    console.log(`creating new game with options: ${JSON.stringify(gameOpts)}`);
    const game = await gameService.createNewGame(gameOpts);
    await this.router.navigate(['game'], {
      queryParams: {
        id: game._id,
      }
    });
  }

  async joinGame() {
    console.log('joinGame');
  }
}
