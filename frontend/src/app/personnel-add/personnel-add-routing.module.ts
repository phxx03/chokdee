import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonnelAddPage } from './personnel-add.page';

const routes: Routes = [
  {
    path: '',
    component: PersonnelAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonnelAddPageRoutingModule {}
