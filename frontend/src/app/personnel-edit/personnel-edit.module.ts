import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonnelEditPageRoutingModule } from './personnel-edit-routing.module';

import { PersonnelEditPage } from './personnel-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonnelEditPageRoutingModule
  ],
  declarations: [PersonnelEditPage]
})
export class PersonnelEditPageModule {}
