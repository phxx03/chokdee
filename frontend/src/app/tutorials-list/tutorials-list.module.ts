import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TutorialDetailsPageModule } from '../tutorial-details/tutorial-details.module'; // import the app-tutorial-details module

import { TutorialsListPageRoutingModule } from './tutorials-list-routing.module';

import { TutorialDetailsPage } from '../tutorial-details/tutorial-details.page';

import { TutorialsListPage } from './tutorials-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TutorialsListPageRoutingModule
  ],
  declarations: [TutorialsListPage
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class TutorialsListPageModule {}
