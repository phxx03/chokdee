import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonnelDetailsPageRoutingModule } from './personnel-details-routing.module';

import { PersonnelDetailsPage } from './personnel-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonnelDetailsPageRoutingModule
  ],
  declarations: [PersonnelDetailsPage]
})
export class PersonnelDetailsPageModule {}
