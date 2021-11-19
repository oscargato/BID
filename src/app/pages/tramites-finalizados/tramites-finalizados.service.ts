import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { map } from 'rxjs/operators';

const API_USERS_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})

export class TramitesFinalizadosService {

  constructor(private httpClient: HttpClient) { }

  getTramitesFinalizados(usuarioId:number):Observable<any>{
    return this.httpClient.get<any>(`${API_USERS_URL}/listadosController/getAllFinalizadosBySolicitanteId/${usuarioId}`).pipe(map(resp => resp.objeto));
  }
}
