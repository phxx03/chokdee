import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TutorialDetailsPage } from './tutorial-details.page';

const routes: Routes = [
  {
    path: '',
    component: TutorialDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutorialDetailsPageRoutingModule {}
