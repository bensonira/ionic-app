import { NgModule, ErrorHandler } from '@angular/core';
import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicApp, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProfesseurProvider } from '../providers/professeur/professeur';
import { MatiereServiceProvider } from '../providers/matiere-service/matiere-service';
import { VolumeHoraireService } from '../providers/volume-horaire-service/volume-horaire-service';
import { MatierePage, PopoverMatiere } from '../pages/matiere/matiere';
import { ProfesseurPage, PopoverEnseignant } from '../pages/professeur/professeur';
import { VolumeHorairePage, PopoverVhorairePage } from '../pages/volume-horaire/volume-horaire';
import { BulletinPaiePage } from '../pages/bulletin-paie/bulletin-paie';
import { AddMatierePage } from '../pages/add-matiere/add-matiere';
import { AddVHorairePage } from '../pages/add-v-horaire/add-v-horaire';
import { AddProfesseurPage } from '../pages/add-professeur/add-professeur';
import { EditMatierePage } from '../pages/edit-matiere/edit-matiere';


@NgModule({
    declarations: [
      MyApp,
      HomePage,
      MatierePage,
      ProfesseurPage,
      VolumeHorairePage,
      BulletinPaiePage,
      AddMatierePage,
      AddVHorairePage,
      AddProfesseurPage,
      PopoverEnseignant,
      PopoverMatiere,
      PopoverVhorairePage,
      EditMatierePage
    ],
    imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      IonicModule.forRoot(MyApp),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
      MyApp,
      HomePage,
      MatierePage,
      ProfesseurPage,
      VolumeHorairePage,
      BulletinPaiePage,
      AddMatierePage,
      AddVHorairePage,
      AddProfesseurPage,
      PopoverEnseignant,
      PopoverMatiere,
      PopoverVhorairePage,
      EditMatierePage
    ],
    providers: [
      StatusBar,
      SplashScreen,
      {provide: ErrorHandler, useClass: IonicErrorHandler},
      MatiereServiceProvider,
      ProfesseurProvider,
      VolumeHoraireService
    ]
  })
  export class AppModule {}