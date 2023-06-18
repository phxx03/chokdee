import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderChackoutPage } from './order-chackout.page';

const routes: Routes = [
  {
    path: '',
    component: OrderChackoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderChackoutPageRoutingModule {}
