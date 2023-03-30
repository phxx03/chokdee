import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryStatusPage } from './delivery-status.page';

const routes: Routes = [
  {
    path: '',
    component: DeliveryStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryStatusPageRoutingModule {}
