import { Electeur } from './../modele/electeur';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Voter } from '../modele/voter';

@Injectable({
  providedIn: 'root'
})
export class VoterService {

  private url= 'http://127.0.0.1:8000/api';


  httpOption={
    headers:new HttpHeaders({
      'Content-Type':'Application/json',
    }),
  };
  constructor(private http:HttpClient) { }


  AjouterElecteur(param:any) {
    return this.http.post<Voter>(this.url +'/voter',JSON.stringify(param),this.httpOption);
  }

  Edit_commune_Electeur(id :any,param:Electeur)
  {
    console.log("in getEdit : "+JSON.stringify(param));
    return   this.http.put<Electeur>(this.url+'/electeurs/'+id,param,this.httpOption);
  }
}
