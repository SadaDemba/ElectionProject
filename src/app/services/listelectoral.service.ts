import { ListElectoral } from 'src/app/modele/listelectoral';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ListelectoralService {
  private url= 'http://127.0.0.1:8000/api';


  httpOption={
    headers:new HttpHeaders({
      'Content-Type':'Application/json',

    }),
  };
  constructor(private http:HttpClient) { }

  getListes():Observable<ListElectoral[]>
  {
    return this.http.get<ListElectoral[]>(this.url +'/candidats');
  }
  AjouterListe(param:any) {
    return this.http.post<ListElectoral>(this.url +'/candidats',param,this.httpOption);
  }

  getcandidats(param:any)
  {
    return this.http.get<ListElectoral[]>(this.url +'/candidat/'+param);
  }

  Edit_Candidat(id :any,param:ListElectoral)
  {
    console.log("in getEdit : "+JSON.stringify(param));
    return   this.http.put<ListElectoral>(this.url+'/candidats/'+id,param,this.httpOption);
  }

}
