import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const API_USERS_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class HistoricoTramitesService {

  constructor(private httpClient: HttpClient) {}

  getHistoricoTramite(id:number):Observable<any>{
    return this.httpClient.get<any>(`${API_USERS_URL}/listadosController/getHistoricoTramiteRevisor/${id}`).pipe(map(resp => resp.objeto));    
  }

}
