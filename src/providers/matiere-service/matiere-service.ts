import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMatiere } from '../../pages/matiere/i-matiere';
import { Observable } from '../../../node_modules/rxjs/Observable';

@Injectable()
export class MatiereServiceProvider {

  private URL:string = "http://localhost:6591/matieres";
  
  constructor(public http: HttpClient) {
    console.log('Hello MatiereServiceProvider Provider');
  }

  public findAll(): Observable<IMatiere[]> {
    
    return this.http.get<IMatiere[]>(this.URL);
    
  }
  
  public save(matiere:IMatiere):Observable<IMatiere>{
    // "/professeurs/{professeurId}/matieres"
    let url = 'http://localhost:6591/professeurs';
    return this.http.post<IMatiere>(url +'/'+ matiere.titulaire.matricule + '/matieres',matiere);

  }
  
  public deleteById(id:number):Observable<any>{

    return this.http.delete(this.URL+'/'+id);

  }

  public update(matiere:IMatiere): Observable<IMatiere> {
    let url = 'http://localhost:6591/professeurs';
    return this.http.put<IMatiere>(url+'/'+matiere.titulaire.matricule+'/matieres/'+matiere.numat,matiere);

  }

}
