import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const API_USERS_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})

export class AltaFuncionarioService {

  constructor(private httpClient: HttpClient){}

  getDatosFuncionarios():Observable<any>{
    return this.httpClient.get<any>(`${API_USERS_URL}/revisores/getDatosFuncionarios`).pipe(map(resp => resp.objeto));
  }

  crearRevisor(data: any):Observable<any>{
    return this.httpClient.post<any>(`${API_USERS_URL}/revisores/crearRevisor`,data);
  }

  getTramitesByDistritoId(id:number){
    return this.httpClient.get<any>(`${API_USERS_URL}/tramites/getTramitesByDistritoId/${id}`).pipe(map(resp => resp.objeto));
  }   
}