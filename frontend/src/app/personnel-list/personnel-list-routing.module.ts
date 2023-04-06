import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonnelListPage } from './personnel-list.page';

const routes: Routes = [
  {
    path: '',
    component: PersonnelListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonnelListPageRoutingModule {}
