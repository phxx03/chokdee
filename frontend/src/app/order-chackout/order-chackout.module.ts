import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderChackoutPageRoutingModule } from './order-chackout-routing.module';

import { OrderChackoutPage } from './order-chackout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderChackoutPageRoutingModule
  ],
  declarations: [OrderChackoutPage]
})
export class OrderChackoutPageModule {}
