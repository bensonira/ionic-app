import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { IVolumeHoraire } from '../../pages/volume-horaire/i-volume-horaire';

@Injectable()
export class VolumeHoraireService {
  
  private URL:string = "http://localhost:6591/volumehoraires";
  
  constructor(public http: HttpClient) {
    console.log('Hello VolumeHoraireService Provider');
    
  }
  public findAll(): Observable<IVolumeHoraire[]> {
    
    return this.http.get<IVolumeHoraire[]>(this.URL);
    
  }
  
  public save(volH:IVolumeHoraire):Observable<IVolumeHoraire>{

    return this.http.post<IVolumeHoraire>(this.URL,volH);

  }
  
  public deleteById(id:number):Observable<any>{

    return this.http.delete(this.URL+'/'+id);

  }

  public update(volHoraire:IVolumeHoraire): Observable<IVolumeHoraire> {

    return this.http.put<IVolumeHoraire>(this.URL+'/'+volHoraire.code,volHoraire);

  }
  
}
