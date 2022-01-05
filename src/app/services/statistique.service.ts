import { Stat } from './../modele/stat';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatPrime } from '../modele/stat-prime';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Statcommune } from '../modele/statcommune';
import { StatTotal } from '../modele/stat-total';



@Injectable({
  providedIn: 'root'
})
export class StatistiqueService implements CanActivate {
  private url= 'http://127.0.0.1:8000/api';
  tabDeNoms!: string[] ;
  tabDeVotes:number[]=[];
  a:string[] = [];
  httpOption={
    headers:new HttpHeaders({
      'Content-Type':'Application/json',
    }),
  };

  constructor(private http:HttpClient, private route:Router) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.tabDeNoms==undefined)
    {
      window.alert("Selectionnez une région!");
      this.route.navigate(["/carte"]);
      return false;
    }
    else
    {
      return true;
    }
  }
 
  getStat():Observable<Stat[]>
  {
    return this.http.get<Stat[]>(this.url +'/count');
  }

  getcountStat(region:any):Observable<Stat[]>
  {
    return this.http.get<Stat[]>(this.url +'/countvr/'+region);
  }

  getcountStatByCandidate(region:any):Observable<StatPrime[]>
  {
    return this.http.get<StatPrime[]>(this.url +'/countcr/'+region);
  }

  getcommunesByRegion(region:any):Observable<Statcommune[]>
  {
    return this.http.get<Statcommune[]>(this.url +'/commune/'+region);
  }


  getcountStatByCandidateInComm(commune:any):Observable<StatPrime[]>
  {
    return this.http.get<StatPrime[]>(this.url +'/countcc/'+commune);
  }

  getcountStatVotantInRegion(region:any):Observable<StatTotal[]>
  {
    return this.http.get<StatTotal[]>(this.url +'/votant/region/'+region);
  }
  getcountStatInscritInRegion(region:any):Observable<StatTotal[]>
  {
    return this.http.get<StatTotal[]>(this.url +'/inscrit/region/'+region);
  }

}
