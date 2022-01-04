import { Stat } from './../modele/stat';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {
  private url= 'http://127.0.0.1:8000/api';

  httpOption={
    headers:new HttpHeaders({
      'Content-Type':'Application/json',
    }),
  };

  constructor(private http:HttpClient) {

  }

  getStat():Observable<Stat[]>
  {
    return this.http.get<Stat[]>(this.url +'/count');
  }

  getcountStat(region:any):Observable<Stat[]>
  {
    return this.http.get<Stat[]>(this.url +'/countvr/'+region);
  }

}
