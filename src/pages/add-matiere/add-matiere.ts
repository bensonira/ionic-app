import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { IVolumeHoraire } from '../volume-horaire/i-volume-horaire';
import { ProfesseurProvider } from '../../providers/professeur/professeur';
import { IProfesseur } from '../professeur/i-professeur';
import { VolumeHoraireService } from '../../providers/volume-horaire-service/volume-horaire-service';
import { MatiereServiceProvider } from '../../providers/matiere-service/matiere-service';
import { IMatiere } from '../matiere/i-matiere';

@IonicPage()
@Component({
  selector: 'page-add-matiere',
  templateUrl: 'add-matiere.html',
})
export class AddMatierePage {
  
  selectedCOde:number;
  selectedMatricule: string;
  designation : string;
  nbHeure:number;

  matiereToSave:IMatiere;
  volumeHoraires:Array<IVolumeHoraire> = [];
  professeurs:Array<IProfesseur> = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private profService:ProfesseurProvider,
  private volumeHoraireService:VolumeHoraireService,private matiereService:MatiereServiceProvider,private toastCtrl:ToastController) {

    this.profService.findAll().subscribe(
      data=>{
        this.professeurs = data;
      },
      error=>{
        console.log(error);
      }
    );

    this.volumeHoraireService.findAll().subscribe(
      data => {
        this.volumeHoraires = data;
      },
      err => {
        console.log(err);
      }
    )

  }

  public saveMatiere():void {
    this.matiereToSave = {
      numat:null,
      designation:this.designation,
      nbheur:this.nbHeure,
      titulaire:{ matricule:this.selectedMatricule,nom:"",montant:null },
      volumeh:{ code:this.selectedCOde,tauxHoraire:null }
    };

    this.matiereService.save(this.matiereToSave).subscribe(
      data =>{
        this.designation = null;
        this.nbHeure = null;
        this.selectedMatricule = null;
        this.selectedCOde = null;
        let toast = this.toastCtrl.create({
          message:'Enrégistrement avec succé!',
          position:'middle',
          duration:2000
        });
        toast.present();
      },
      error =>{
        console.log(error);
      }
    )
  }

}
