import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenubarPageRoutingModule } from './menubar-routing.module';

import { MenubarPage } from './menubar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenubarPageRoutingModule
  ],
  declarations: [MenubarPage]
})
export class MenubarPageModule {}
