import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { IVolumeHoraire } from '../volume-horaire/i-volume-horaire';
import { VolumeHoraireService } from '../../providers/volume-horaire-service/volume-horaire-service';

@IonicPage()
@Component({
  selector: 'page-add-v-horaire',
  templateUrl: 'add-v-horaire.html',
})
export class AddVHorairePage {

  tauxHoraire:any;
  private volumeHoraire:IVolumeHoraire;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private volumeHoraireService:VolumeHoraireService,private toastCtrl:ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddVHorairePage');
  }

  public addVolumeHoraire(): void{
    this.volumeHoraire = {
      code:0,
      tauxHoraire:this.tauxHoraire
    };
    this.volumeHoraireService.save(this.volumeHoraire).subscribe(
      data => {
        this.tauxHoraire = null;
        let toast = this.toastCtrl.create({
            message:'Enregistré avec succé',
            position:'middle',
            duration:2000
        })
        toast.present();
      },
      error =>{
        console.log(error);
      }
    )
  }

}
