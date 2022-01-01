import { Annee } from './../modele/annee';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnneeService {
  private url= 'http://127.0.0.1:8000/api';


  httpOption={
    headers:new HttpHeaders({
      'Content-Type':'Application/json',
    }),
  };
  constructor(private http:HttpClient) { }

  getAnnees():Observable<Annee[]>
  {
    return this.http.get<Annee[]>(this.url +'/annees');
  }


  AjouterAnnee(param:any) {
    return this.http.post<Annee>(this.url +'/annees',JSON.stringify(param),this.httpOption);
  }

  AnneeEncours():Observable<Annee[]>
  {
    return this.http.get<Annee[]>(this.url +'/annee/encours');
  }
}
