import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditMatierePage } from './edit-matiere';

@NgModule({
  declarations: [
    EditMatierePage,
  ],
  imports: [
    IonicPageModule.forChild(EditMatierePage),
  ],
})
export class EditMatierePageModule {}
