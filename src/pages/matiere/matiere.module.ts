import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MatierePage } from './matiere';

@NgModule({
  declarations: [
    MatierePage,
  ],
  imports: [
    IonicPageModule.forChild(MatierePage),
  ],
})
export class MatierePageModule {}
