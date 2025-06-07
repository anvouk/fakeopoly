import { Component, signal, ViewChild, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HudComponent } from './hud/hud.component';
import { MatDivider } from '@angular/material/divider';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterModule,
    HudComponent,
    MatSidenavContent,
    MatSidenav,
    MatSidenavContainer,
    MatListItem,
    MatIcon,
    MatDivider,
    MatIconButton,
    MatTooltip,
    MatNavList,
  ],
  providers: [],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  protected isSideNavClosed: WritableSignal<boolean> = signal(true);

  isInGame() {
    return window.location.href.includes('/game');
  }

  async openSideNav() {
    this.isSideNavClosed.update(_ => false);
    await this.sidenav.open();
  }

  async closeSideNav() {
    this.isSideNavClosed.update(_ => true);
    await this.sidenav.close();
  }
}
