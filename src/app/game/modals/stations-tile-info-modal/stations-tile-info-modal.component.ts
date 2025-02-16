import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { TileStationInfo } from '../../fakeopoly/fake-data';
import { MatButton } from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef, MatTable,
} from '@angular/material/table';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-stations-tile-info-modal',
  imports: [
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatInput,
    MatLabel,
    MatRow,
    MatRowDef,
    MatTable,
    ReactiveFormsModule,
    FormsModule,
    MatHeaderCellDef,
  ],
  templateUrl: './stations-tile-info-modal.component.html',
  styleUrl: './stations-tile-info-modal.component.scss',
})
export class StationsTileInfoModalComponent {
  constructor(
    public dialogRef: MatDialogRef<StationsTileInfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public tileInfo: TileStationInfo,
  ) {}

  async close(): Promise<void> {
    this.dialogRef.close();
  }
}
