import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TutorialDetailsPageRoutingModule } from './tutorial-details-routing.module';

import { TutorialDetailsPage } from './tutorial-details.page';
import { TutorialsListPage } from '../tutorials-list/tutorials-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TutorialDetailsPageRoutingModule
  ],
  declarations: [
  ],
})
export class TutorialDetailsPageModule {}
