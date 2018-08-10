import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IProfesseur } from '../professeur/i-professeur';
import { ProfesseurProvider } from '../../providers/professeur/professeur';
import { IMatiere } from '../matiere/i-matiere';

@IonicPage()
@Component({
  selector: 'page-bulletin-paie',
  templateUrl: 'bulletin-paie.html',
})
export class BulletinPaiePage {
  
  professeur:IProfesseur;
  matieres:Array<IMatiere> =[];
  montantTotal:number;

  constructor(public navCtrl: NavController, public navParams: NavParams,private professeurService:ProfesseurProvider) {
    this.professeur = this.navParams.get('p');
    this.professeurService
            .bulletinPaieOf(this.professeur.matricule)
                .then(data =>{
                  this.matieres = data;
                  this.montantTotal = this.amountTotal(this.matieres);
                })
                    .catch(error =>{console.log(error)});
    
  }

  ionViewDidLoad() {
    console.log('Bulletin page loaded!');
  }

  private amountTotal(inputs:Array<IMatiere>):number {
    let total = 0;
    inputs.forEach(matiere=>{
      total = total+ (matiere.volumeh.tauxHoraire*matiere.nbheur);
    })
    return total;
  }
}
