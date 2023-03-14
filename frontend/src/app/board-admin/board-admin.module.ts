import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoardAdminPageRoutingModule } from './board-admin-routing.module';

import { BoardAdminPage } from './board-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoardAdminPageRoutingModule
  ],
  declarations: [BoardAdminPage]
})
export class BoardAdminPageModule {}
