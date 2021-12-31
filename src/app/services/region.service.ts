import { Centre } from './../modele/centre';
import { Commune } from './../modele/commune';
import { Region } from './../modele/region';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comm } from '../modele/Comm';
@Injectable({
  providedIn: 'root'
})
export class RegionService {

  private url= 'http://127.0.0.1:8000/api';


  httpOption={
    headers:new HttpHeaders({
      'Content-Type':'Application/json',
    }),
  };
  constructor(private http:HttpClient) { }

  getRegions():Observable<Region[]>
  {
    return this.http.get<Region[]>(this.url +'/regions');
  }

  getCommunes(id:number):Observable<Commune[]>
  {
    return this.http.get<Commune[]>(this.url +'/communes/find/'+id);
  }
  getCentres(id:number):Observable<Centre[]>
  {
    return this.http.get<Centre[]>(this.url +'/communes/findcentre/'+id);
  }
  getComms(id:number):Observable<Comm[]>
  {
    return this.http.get<Comm[]>(this.url +'/arrondissement/findcommune/'+id);
  }
}
