import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderChackout2Page } from './order-chackout2.page';

const routes: Routes = [
  {
    path: '',
    component: OrderChackout2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderChackout2PageRoutingModule {}
