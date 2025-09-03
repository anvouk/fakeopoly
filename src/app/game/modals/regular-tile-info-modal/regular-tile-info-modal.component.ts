import { Component, Inject, signal, WritableSignal } from '@angular/core';
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
import { BoardTile } from '../../fakeopoly/board-tile';
import { TileRegularInfo } from '../../fakeopoly/fake-data';
import { GameLogService } from '../../../services/game-log.service';

interface HousesRent {
  buyHouse: boolean;
  canBuy: boolean;
  canSell: boolean;
  houseCost: number;
  rent: number;
}

@Component({
  selector: 'app-regular-tile-info-modal',
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
  readonly housesRent: WritableSignal<HousesRent[]> = signal([]);

  readonly tileInfo: TileRegularInfo;

  constructor(
    public dialogRef: MatDialogRef<RegularTileInfoModalComponent>,
    private readonly gameLogService: GameLogService,
    @Inject(MAT_DIALOG_DATA) public tile: BoardTile,
  ) {
    this.tileInfo = tile.tileInfo as TileRegularInfo;

    // first entry is for tile rent with no houses.
    this.housesRent.update(array => {
      return [...array, {
        buyHouse: false,
        canBuy: false,
        canSell: false,
        rent: this.tileInfo.regularData.rents[0],
        houseCost: 0,
      }];
    });
    for (let i = 1; i < this.tileInfo.regularData.rents.length; i++) {
      this.housesRent.update(array => {
        return [...array, {
          buyHouse: this.tile.houses < i,
          canBuy: this.tile.houses >= i - 1,
          canSell: this.tile.houses <= i,
          rent: this.tileInfo.regularData.rents[i],
          // every fifth house is a hotel
          houseCost: i % 5 === 0 ? this.tileInfo.regularData.hotelCost : this.tileInfo.regularData.houseCost,
        }];
      });
    }
  }

  private async updateList(index: number) {
    this.housesRent.update(array => {
      for (let i = 1; i < array.length; i++){
        array[i].canBuy = this.tile.houses >= i - 1;
        array[i].canSell = this.tile.houses <= i;
      }
      array[index].buyHouse = this.tile.houses < index;
      return [...array];
    });
  }

  async buyHouse(index: number): Promise<void> {
    this.tile.houses += 1;
    await this.updateList(index);
    this.gameLogService.postNotice({
      msg: `You bought a house on ${this.tileInfo.name}`,
      expirySecs: 3,
    });
  }

  async sellHouse(index: number): Promise<void> {
    this.tile.houses -= 1;
    await this.updateList(index);
    this.gameLogService.postNotice({
      msg: `You sold an house on ${this.tileInfo.name}`,
      expirySecs: 3,
    });
  }

  async close(): Promise<void> {
    this.dialogRef.close();
  }
}
