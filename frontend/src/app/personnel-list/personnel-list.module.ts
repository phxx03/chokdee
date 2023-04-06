import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonnelListPageRoutingModule } from './personnel-list-routing.module';

import { PersonnelListPage } from './personnel-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonnelListPageRoutingModule
  ],
  declarations: [PersonnelListPage]
})
export class PersonnelListPageModule {}
