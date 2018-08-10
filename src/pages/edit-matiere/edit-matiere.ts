import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { IMatiere } from '../matiere/i-matiere';
import { ProfesseurProvider } from '../../providers/professeur/professeur';
import { VolumeHoraireService } from '../../providers/volume-horaire-service/volume-horaire-service';
import { MatiereServiceProvider } from '../../providers/matiere-service/matiere-service';
import { IProfesseur } from '../professeur/i-professeur';
import { IVolumeHoraire } from '../volume-horaire/i-volume-horaire';

@IonicPage()
@Component({
  selector: 'page-edit-matiere',
  templateUrl: 'edit-matiere.html',
})
export class EditMatierePage {
  matiere:IMatiere;
  professeurs:Array<IProfesseur> = [];
  volumeHoraires:Array<IVolumeHoraire> = [];
  designation:string;
  nbHeure:number;
  selectedMatricule:string;
  selectedCOde:number;

  constructor(public navCtrl: NavController, public navParams: NavParams,private profService:ProfesseurProvider,
    private volumeHoraireService:VolumeHoraireService,private matiereService:MatiereServiceProvider,private toastCtrl:ToastController) {
      this.profService.findAll()
          .toPromise()
          .then(data=>{
                this.professeurs = data;
          })
          .catch(err => {
                console.log(err);
          });

      this.volumeHoraireService.findAll()
            .toPromise()
            .then(data => {
              this.volumeHoraires = data;
            })
            .catch(error => {
              console.log(error);
            });
  }

  ngOnInit(): void {
    if(this.navParams.data){
      this.matiere = this.navParams.data.matiere;
      this.designation = this.matiere.designation;
      this.nbHeure = this.matiere.nbheur;
    }
  }

  public updateMatiere(): void {

    this.matiere.designation = this.designation;
    this.matiere.nbheur = this.nbHeure;
    this.matiere.titulaire.matricule = this.selectedMatricule;
    this.matiere.volumeh.code = this.selectedCOde;
    
    this.matiereService.update(this.matiere).subscribe(
        data=>{
          let toast = this.toastCtrl.create({
            message:'Mise à jour avec succé!',
            position:'middle',
            duration:2000
          });
          toast.present();
        },
        error=>{
          console.log(error);
        }
    )
  }

}
