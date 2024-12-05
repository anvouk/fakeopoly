import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { GameCreationOptions } from '../../services/game.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-modal',
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatInputModule, FormsModule],
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.scss']
})
export class CreateModalComponent {
  gameOpts: GameCreationOptions = {
    name: 'my game',
    minPlayers: 2,
    maxPlayers: 4,
  };

  constructor(
    public dialogRef: MatDialogRef<CreateModalComponent>,
  ) {}

  async cancel(): Promise<void> {
    this.dialogRef.close();
  }
}
