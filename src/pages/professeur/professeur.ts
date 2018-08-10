import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController, ToastController } from 'ionic-angular';
import { ProfesseurProvider } from '../../providers/professeur/professeur';
import { IProfesseur } from './i-professeur';
import { AddProfesseurPage } from '../add-professeur/add-professeur';
import { BulletinPaiePage } from '../bulletin-paie/bulletin-paie';

@Component({
  template: `
    <ion-list>
      <button  ion-item small (click)="editEnseignant()">Edit</button>
      <button  ion-item small (click)="deleteEnseignant()">Delete</button>
      <button  ion-item small (click)="showBulletin()">Bulletin de paie</button>
  </ion-list>`
})
export class PopoverEnseignant {
  
  private professeur:IProfesseur;

  constructor(private navCtrl:NavController,private navParams: NavParams,private alertCtrl:AlertController,
    private professeurService:ProfesseurProvider,private toastCtrl:ToastController) {
    
  }
  ngOnInit(): void {
    if (this.navParams.data) {
      this.professeur = this.navParams.data.prof;
      console.log(this.professeur);
    }

  }

  public editEnseignant():void{
    let prompt = this.alertCtrl.create({
      title: 'Mise à jours!',
      inputs: [
        {
          name: 'nom',
          placeholder: 'Enseignant',
          value:this.professeur.nom
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: (data) => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Mettre à jours',
          handler: (data) => {
              this.professeur = {
                matricule:this.professeur.matricule,
                nom:data.nom,
                montant:this.professeur.montant
              }
              this.professeurService.update(this.professeur).subscribe(
                data=>{
                    let toast = this.toastCtrl.create({
                        message:'Mise à jours avec succé!',
                        position:'middle',
                        duration:3000
                    });
                    toast.present();
                },
                error=>{
                    console.log(error);
                }
              )
          }
        }
      ]
    });
    prompt.present();
  }

  public deleteEnseignant():void{
    let confirm = this.alertCtrl.create({
      title: 'Suppression!',
      message: 'Voulez vous supprimer cette enrégistrement?',
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Accepter',
          handler: () => {
            this.professeurService.deleteById(this.professeur.matricule)
                  .subscribe(
                      data =>{
                        let toast = this.toastCtrl.create({
                          message:'Supprimé avec succé!',
                          position:'middle',
                          duration:300
                        });
                        toast.present();
                      },
                      error =>{
                          console.log(error);
                      }
                  );
          }
        }
      ]
    });
    confirm.present()
  }

  public showBulletin():void {
    this.navCtrl.push(BulletinPaiePage,{
      p:this.professeur
    });
  }

}


@IonicPage()
@Component({
  selector: 'page-professeur',
  templateUrl: 'professeur.html',
})
export class ProfesseurPage {
  @ViewChild('popoverContent',{read:ElementRef})
  content:ElementRef;
  @ViewChild('popverText',{read:ElementRef})
  text:ElementRef;
  professeurs:Array<IProfesseur> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private profProvider:ProfesseurProvider,private popoverCtrl:PopoverController) {
      this.profProvider.findAll().subscribe(
        data=>{
          this.professeurs = data;
        },error=>{
          console.log(error);
        }
      )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfesseurPage');
  }

  public AddProfesseur():void{
    this.navCtrl.push(AddProfesseurPage);
  }

  public presentPopover(event,p):void {

    const popover = this.popoverCtrl.create(PopoverEnseignant,{
      prof:p
    });

    popover.present({
      ev:event
    });

  }

}
