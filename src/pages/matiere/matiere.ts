import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { IMatiere } from './i-matiere';
import { AddMatierePage } from '../add-matiere/add-matiere';
import { MatiereServiceProvider } from '../../providers/matiere-service/matiere-service';
import { EditMatierePage } from '../edit-matiere/edit-matiere';

@Component({
  template: `
    <ion-list>
      <button  ion-item small (click)="editMatiere()">Edit</button>
      <button  ion-item small (click)="deleteMatiere()">Delete</button>
  </ion-list>`
})
export class PopoverMatiere {
  selectedMatier:IMatiere;

  constructor(private navParams: NavParams,private alertCtrl:AlertController,private navCtrl:NavController,
    private matiereService:MatiereServiceProvider,private toastCtrl:ToastController) {
    
  }
  ngOnInit(): void {
    if (this.navParams.data) {
        this.selectedMatier = this.navParams.data.m;
    }
  }

  public deleteMatiere(): void{
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
            this.matiereService.deleteById(this.selectedMatier.numat).toPromise()
              .then(response=>{
                  let toast = this.toastCtrl.create({
                    message:'Supprimé avec succé',
                    duration:2000,
                    position:'middle'
                  });
                  toast.present();
              })
              .catch(error =>{
                  console.log(error);
              })
          }
        }
      ]
    });
    confirm.present()
  }

  public editMatiere(): void{
    
      this.navCtrl.push(EditMatierePage,{
        matiere:this.selectedMatier
      });
  }

}

@IonicPage()
@Component({
  selector: 'page-matiere',
  templateUrl: 'matiere.html',
})
export class MatierePage {
  @ViewChild('popoverContent',{read:ElementRef})
  content:ElementRef;
  @ViewChild('popverText',{read:ElementRef})
  text:ElementRef;
  matieres:Array<IMatiere> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,private popoverCtrl:PopoverController,
    private matiereService:MatiereServiceProvider) {
      this.matiereService.findAll().subscribe(
        data=>{
          this.matieres = data;
        }
        ,error=>{
            console.log(error);
        }
      )
  }

  public AddMatiere():void{
    this.navCtrl.push(AddMatierePage,{
      
    });
  }

  public presentPopover(event,matiere):void {
    const popover = this.popoverCtrl.create(PopoverMatiere,{
      m:matiere
    });

    popover.present({
      ev:event
    });

  }

}
