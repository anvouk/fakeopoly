import { Component, Inject, Input } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { TileInfo } from '../../fakeopoly/fake-data';

@Component({
  selector: 'app-propery-info-modal',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatLabel,
  ],
  templateUrl: './tile-info-modal.component.html',
  styleUrl: './tile-info-modal.component.scss'
})
export class TileInfoModalComponent {
  constructor(
    public dialogRef: MatDialogRef<TileInfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public tileInfo: TileInfo
  ) {}

  async close(): Promise<void> {
    this.dialogRef.close();
  }
}
