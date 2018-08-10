import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController, ToastController } from 'ionic-angular';
import { IVolumeHoraire } from './i-volume-horaire';
import { AddVHorairePage } from '../add-v-horaire/add-v-horaire';
import { VolumeHoraireService } from '../../providers/volume-horaire-service/volume-horaire-service';


@Component({
  template: `
    <ion-list>
      <button  ion-item small (click)="editVolumeHoraire()">Edit</button>
      <button  ion-item small (click)="removeVolumeHoraire()">Delete</button>
  </ion-list>`
})
export class PopoverVhorairePage {
  
  volumeHoraire:IVolumeHoraire;
  constructor(private navParams: NavParams,private alertCtrl:AlertController,
    private volumeHoraireService:VolumeHoraireService,private toastCtrl:ToastController) {
    
  }
  ngOnInit(): void {
    if (this.navParams.data) {
      this.volumeHoraire = this.navParams.data.volH;
      console.log(this.volumeHoraire);
    }
  }


  public editVolumeHoraire():void {
    let prompt = this.alertCtrl.create({
      title: 'Mise à jours!',
      inputs: [
        {
          name: 'tauxHoraire',
          placeholder: 'Taux horaire',
          value:<any>this.volumeHoraire.tauxHoraire
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
            this.volumeHoraire = {
              code:this.volumeHoraire.code,
              tauxHoraire:data.tauxHoraire
            };
            this.volumeHoraireService.update(this.volumeHoraire).subscribe(res=>{
                    let toast = this.toastCtrl.create({
                      message:'mise à jours avec succé',
                      duration:200,
                      position:'middle'
                    });
                    toast.present();
              },err=>{
                console.log(err);
            });
          }
        }
      ]
    });
    prompt.present();
  }

  public removeVolumeHoraire():void {
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
            this.volumeHoraireService.deleteById(this.volumeHoraire.code)
                .subscribe(res=>{
                  let toast = this.toastCtrl.create({
                      message:'suppression avec succé!',
                      duration:300,
                      position:'middle',
                  });
                  toast.present();
                },err=>{
                  console.log(err);
            });
          }
        }
      ]
    });

    confirm.present()
  }

}

@IonicPage()
@Component({
  selector: 'page-volume-horaire',
  templateUrl: 'volume-horaire.html',
})
export class VolumeHorairePage {
  
  @ViewChild('popoverContent',{read:ElementRef})
  content:ElementRef;
  @ViewChild('popverText',{read:ElementRef})
  text:ElementRef;

  volumeHoraires: Array<IVolumeHoraire> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public popoverCtrl:PopoverController,private volumeHoraireService:VolumeHoraireService) {
      
    this.volumeHoraireService.findAll().subscribe((data)=>{
            this.volumeHoraires = data;
        },
      (error)=>{
          console.log(error);
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VolumeHorairePage');
  }

  public onAddVolumeHoraire(): void {
    this.navCtrl.push(AddVHorairePage);
  }

  public presentPopover(event,volumeH):void {

    const popover = this.popoverCtrl.create(PopoverVhorairePage,{
      volH:volumeH
    });

    popover.present({
      ev:event
    });
  }

}
