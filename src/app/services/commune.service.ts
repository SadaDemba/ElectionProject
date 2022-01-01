import { Comm } from './../modele/Comm';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommuneService {
  private url= 'http://127.0.0.1:8000/api';


  httpOption={
    headers:new HttpHeaders({
      'Content-Type':'Application/json',
    }),
  };
  constructor(private http:HttpClient) { }

  getCommunes():Observable<Comm[]>
  {
    return this.http.get<Comm[]>(this.url +'/comm');
  }
}
