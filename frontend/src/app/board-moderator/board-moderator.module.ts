import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoardModeratorPageRoutingModule } from './board-moderator-routing.module';

import { BoardModeratorPage } from './board-moderator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoardModeratorPageRoutingModule
  ],
  declarations: [BoardModeratorPage]
})
export class BoardModeratorPageModule {}
