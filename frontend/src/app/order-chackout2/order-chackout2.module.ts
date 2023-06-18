import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderChackout2PageRoutingModule } from './order-chackout2-routing.module';

import { OrderChackout2Page } from './order-chackout2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderChackout2PageRoutingModule
  ],
  declarations: [OrderChackout2Page]
})
export class OrderChackout2PageModule {}
