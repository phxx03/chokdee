import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonnelAddPageRoutingModule } from './personnel-add-routing.module';

import { PersonnelAddPage } from './personnel-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonnelAddPageRoutingModule
  ],
  declarations: [PersonnelAddPage]
})
export class PersonnelAddPageModule {}
