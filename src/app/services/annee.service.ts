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

  Edit_Annee(id :any,param:Annee)
  {
    console.log("in getEdit : "+JSON.stringify(param));
    return   this.http.put<Annee>(this.url+'/annees/'+id,param,this.httpOption);
  }

  delete_Annee(id:number){
    return this.http.delete<Annee>(this.url+'/annees/'+id,this.httpOption);
  }


}
