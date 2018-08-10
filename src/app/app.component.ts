import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ProfesseurPage } from '../pages/professeur/professeur';
import { MatierePage } from '../pages/matiere/matiere';
import { VolumeHorairePage } from '../pages/volume-horaire/volume-horaire';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) 
  nav:Nav;
  rootPage:any = HomePage;
  pages: Array<{title:string,component:any}>;
 

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public loadingCtrl:LoadingController) {  
      
    this.pages = [
      {title : 'Home',component: HomePage},
      {title : 'Enseignants',component: ProfesseurPage},
      {title : 'Matieres',component: MatierePage},
      {title : 'Volume Horaire',component: VolumeHorairePage}
    ];
      this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  onPage(page){
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  
}

