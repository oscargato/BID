import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const API_USERS_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})

export class TramitesFinalizadosService {

  constructor(private httpClient: HttpClient){}

  getTramitesFinalizados(usuarioId:number):Observable<any>{
    return this.httpClient.get<any>(`${API_USERS_URL}/listadosController/getAllFinalizadosBySolicitanteId/${usuarioId}`).pipe(map(resp => resp.objeto));
  }
  
  obtencionPermisoConstruccion(id:number):Observable<Blob>{    
    return this.httpClient.get(`${API_USERS_URL}/g3n3r4d0rJ4sp3r/obtencionPermisoConstruccion/${id}`, { responseType: 'blob' });
  }
}
