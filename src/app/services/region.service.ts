import { Region } from './../modele/region';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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
}
