import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliveryStatusPageRoutingModule } from './delivery-status-routing.module';

import { DeliveryStatusPage } from './delivery-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliveryStatusPageRoutingModule
  ],
  declarations: [DeliveryStatusPage]
})
export class DeliveryStatusPageModule {}
