import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef, MatTable,
} from '@angular/material/table';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { TileRegularInfo } from '../../fakeopoly/fake-data';

interface HousesRent {
  buyHouse: boolean;
  houseCost: number;
  rent: number;
}

@Component({
  selector: 'app-regular-tile-info-modal',
  standalone: true,
  imports: [
    FormsModule,
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
    MatIcon,
    MatInput,
    MatLabel,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
  ],
  templateUrl: './regular-tile-info-modal.component.html',
  styleUrl: './regular-tile-info-modal.component.scss',
})
export class RegularTileInfoModalComponent {
  readonly housesRent: HousesRent[] = [];

  constructor(
    public dialogRef: MatDialogRef<RegularTileInfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public tileInfo: TileRegularInfo,
  ) {
    for (let i = 0; i < this.tileInfo.regularData.rents.length; i++) {
      this.housesRent.push({
        buyHouse: false,
        rent: this.tileInfo.regularData.rents[i],
        // every fifth house is a hotel
        houseCost: i % 5 === 0 ? this.tileInfo.regularData.hotelCost : this.tileInfo.regularData.houseCost,
      });
    }
    this.housesRent[1].buyHouse = true;
  }

  async buyHouse(): Promise<void> {
    console.log('buying house');
  }

  async sellHouse(): Promise<void> {
    console.log('selling house');
  }

  async close(): Promise<void> {
    this.dialogRef.close();
  }
}
