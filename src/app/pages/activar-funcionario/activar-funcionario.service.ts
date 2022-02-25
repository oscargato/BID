import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const API_USERS_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})

export class ActivarFuncionarioService {

  constructor(private httpClient: HttpClient){}

  getAllListadoRevisores():Observable<any>{
    return this.httpClient.get<any>(`${API_USERS_URL}/revisores/getAllListadoRevisores`).pipe(map(resp => resp.objeto));
  }

  activarRevisor(usuarioId:number):Observable<any>{
    console.log('Activar');
    return this.httpClient.post<any>(`${API_USERS_URL}/usuarios/activarRevisor/${usuarioId}`,{});
  }

  desactivarRevisor(usuarioId:number):Observable<any>{
    console.log('Desactivar');
    return this.httpClient.post<any>(`${API_USERS_URL}/usuarios/desactivarRevisor/${usuarioId}`,{});
  }
}