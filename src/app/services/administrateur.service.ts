import { Administrateur } from './../modele/administrateur';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministrateurService {

  private url= 'http://127.0.0.1:8000/api';


  httpOption={
    headers:new HttpHeaders({
      'Content-Type':'Application/json',
    }),
  };

  constructor(private http:HttpClient) {

  }

    authentification(login:String,mdp:String)
    {
      return   this.http.post<Administrateur>(this.url+'/administrateur/'+login+'/'+mdp,this.httpOption);
    }


}
