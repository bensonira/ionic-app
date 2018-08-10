import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ProfesseurProvider } from '../../providers/professeur/professeur';
import { IProfesseur } from '../professeur/i-professeur';

/**
 * Generated class for the AddProfesseurPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-professeur',
  templateUrl: 'add-professeur.html',
})
export class AddProfesseurPage {
  professeurName:any;
  prof:IProfesseur;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private professeurService:ProfesseurProvider,private toastCtrl:ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProfesseurPage');
  }
  public saveProfesseur() :void {
    this.prof = {
      matricule:null,
      montant:0,
      nom:this.professeurName
    };

    this.professeurService.save(this.prof).subscribe(
      (response)=>{
          this.professeurName = null;
          let toast = this.toastCtrl.create({
            message:'Enregistré avec succé',
            position:'middle',
            duration:2000
          })
              toast.present();
      },
      (err)=>{
        console.error(err);
      }
    )
  }
}
