import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


const API_USERS_URL = `${environment.apiUrl}`;


@Injectable({
  providedIn: 'root'
})


export class TramitesRevisarService {

  constructor(private httpClient:HttpClient){}
  
  getPendientesInspector(id:number): Observable<any>{
    return this.httpClient.get<any>(`${API_USERS_URL}/listadosController/pendientesInspector/${id}`).pipe(map(resp => resp.objeto));
  }  

  getPendientesArquitecto(id:number): Observable<any>{
    return this.httpClient.get<any>(`${API_USERS_URL}/listadosController/pendientesArquitecto/${id}`).pipe(map(resp => resp.objeto));
  }  

  getPendienteSecretariaMunicipal(id:number): Observable<any>{
    return this.httpClient.get<any>(`${API_USERS_URL}/listadosController/pendientes/${id}`).pipe(map(resp => resp.objeto));
  }  
}
