import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoardModeratorPage } from './board-moderator.page';

const routes: Routes = [
  {
    path: '',
    component: BoardModeratorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardModeratorPageRoutingModule {}
