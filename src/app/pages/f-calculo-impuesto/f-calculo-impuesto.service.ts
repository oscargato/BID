import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { map } from 'rxjs/operators';

const API_USERS_URL = `${environment.apiUrl}`;
const API_FILE_URL = `${environment.apiFILE}`;

@Injectable({
  providedIn: 'root'
})
export class FCalculoImpuestoService {


  constructor(private httpClient: HttpClient) { }

  newCalculoImpuesto(data: any):Observable<any>{
    return this.httpClient.post<any>(`${API_USERS_URL}/T01/newCalculoImpuesto`,data);
  } 

  getRevision(idRevision:number):Observable<any>{
    return this.httpClient.get<any>(`${API_USERS_URL}/T01/getRevision/${idRevision}`).pipe(map(resp => resp.objeto));
  }
}
