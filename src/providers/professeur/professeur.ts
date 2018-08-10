import { Injectable } from '@angular/core';
import { IProfesseur } from '../../pages/professeur/i-professeur';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { IMatiere } from '../../pages/matiere/i-matiere';

@Injectable()
export class ProfesseurProvider {

  private URL = 'http://localhost:6591/professeurs';

  constructor(public httpClient: HttpClient) {
    console.log('Hello ProfesseurProvider Provider');
  }

  public findAll():Observable<IProfesseur[]> {

    return this.httpClient.get<IProfesseur[]>(this.URL);

  }

  public save(prof:IProfesseur):Observable<IProfesseur>{

    return this.httpClient.post<IProfesseur>(this.URL,prof);

  }

  public deleteById(id:String):Observable<any>{

    return this.httpClient.delete(this.URL+'/'+id);

  }

  public update(prof:IProfesseur){

    return this.httpClient.put(this.URL+'/'+prof.matricule,prof);
    
  }

  public bulletinPaieOf(profId:string):Promise<IMatiere[]>{
    console.log(this.URL +'/'+ profId + '/hc');
    return this.httpClient.get<IMatiere[]>(this.URL+'/'+profId+'/hc').toPromise();
  }

}
