import { Electeur } from './../modele/electeur';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElecteurService {


  private url= 'http://127.0.0.1:8000/api';


  httpOption={
    headers:new HttpHeaders({
      'Content-Type':'Application/json',
    }),
  };

  constructor(private http:HttpClient) { }

  AjouterElecteur(param:any) {
    return this.http.post<Electeur>(this.url +'/electeurs',JSON.stringify(param),this.httpOption);
  }

  verifierCni(cni:any)
{
  return this.http.get<Electeur[]>(this.url +'/electeur/'+cni);
}

verfiercitoyens(cni:any)
{
  return this.http.get<Electeur[]>(this.url +'/citoyens/'+cni);
}


}
