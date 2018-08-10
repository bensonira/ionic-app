import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddMatierePage } from './add-matiere';

@NgModule({
  declarations: [
    AddMatierePage,
  ],
  imports: [
    IonicPageModule.forChild(AddMatierePage),
  ],
})
export class AddMatierePageModule {}
