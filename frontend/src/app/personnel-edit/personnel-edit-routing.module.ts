import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonnelEditPage } from './personnel-edit.page';

const routes: Routes = [
  {
    path: '',
    component: PersonnelEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonnelEditPageRoutingModule {}
