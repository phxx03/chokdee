import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenubarPage } from './menubar.page';

const routes: Routes = [
  {
    path: '',
    component: MenubarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenubarPageRoutingModule {}
