import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API_USERS_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})

export class TramitesDisponiblesService{

  callback:EventEmitter<any> = new EventEmitter<any>()

  constructor(private httpClient:HttpClient){}

  tramitesDisponibles(): Observable<any>{
    return this.httpClient.get<any>(`${API_USERS_URL}/tramites/getAll`).pipe(map(resp => resp.objeto));
  }
}