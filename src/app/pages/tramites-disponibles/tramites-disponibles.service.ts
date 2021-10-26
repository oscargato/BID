import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const API_USERS_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})

export class TramitesDisponiblesService{

  constructor(private httpClient:HttpClient){}

  tramitesDisponibles(): Observable<any>{
    return this.httpClient.get<any>(`${API_USERS_URL}/tramites/getAll`).pipe(map(resp => resp.objeto));
  }
}