import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonnelDetailsPage } from './personnel-details.page';

const routes: Routes = [
  {
    path: '',
    component: PersonnelDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonnelDetailsPageRoutingModule {}
