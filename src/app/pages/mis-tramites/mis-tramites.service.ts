import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const API_USERS_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})


export class MisTramitesService {

  constructor(private httpClient: HttpClient){}

  getTramitesSolicitante(id:number):Observable<any>{
    return this.httpClient.get<any>(`${API_USERS_URL}/listadosController/getHistoricoTramiteSolicitante/${id}`).pipe(map(resp => resp.objeto));    
  }

  getTramitesRevisor(id:number):Observable<any>{
    return this.httpClient.get<any>(`${API_USERS_URL}/listadosController/getHistoricoTramiteRevisor/${id}`).pipe(map(resp => resp.objeto));    
  }

  getTramitesAdministrador(id:number):Observable<any>{
    return this.httpClient.get<any>(`${API_USERS_URL}/listadosController/getHistoricoTramiteAdministrador/${id}`).pipe(map(resp => resp.objeto));    
  }
}
