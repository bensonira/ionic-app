import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddProfesseurPage } from './add-professeur';

@NgModule({
  declarations: [
    AddProfesseurPage,
  ],
  imports: [
    IonicPageModule.forChild(AddProfesseurPage),
  ],
})
export class AddProfesseurPageModule {}
