import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopupCartPageRoutingModule } from './popup-cart-routing.module';

import { PopupCartPage } from './popup-cart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopupCartPageRoutingModule
  ],
  declarations: [PopupCartPage]
})
export class PopupCartPageModule {}
