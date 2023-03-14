import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoardAdminPage } from './board-admin.page';

const routes: Routes = [
  {
    path: '',
    component: BoardAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardAdminPageRoutingModule {}
