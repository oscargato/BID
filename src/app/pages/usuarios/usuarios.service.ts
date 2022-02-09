import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const API_USERS_URL = `${environment.apiUrl}`;
const API_FILE_URL = `${environment.apiFILE}`;

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  constructor(private httpClient: HttpClient){}
  
  guardarPerfil(user: any):Observable<any>{
    return this.httpClient.post<any>(`${API_USERS_URL}/usuarios/guardarPerfil`, user);
  }

  getDatosPerfil(id:number):Observable<any>{
    return this.httpClient.get<any>(`${API_USERS_URL}/usuarios/getDatosPerfil/${id}`).pipe(map(resp => resp.objeto));
  }

  getDistritos(idProvincia:number):Observable<any>{
    return this.httpClient.get<any>(`${API_USERS_URL}/distritos/getByProvinciaId/${idProvincia}`).pipe(map(resp => resp.objeto));
  }

  getCorregimientos(id:number):Observable<any>{
    return this.httpClient.get<any>(`${API_USERS_URL}/corregimientos/getByDistritoId/${id}`).pipe(map(resp => resp.objeto));    
  }

  uploadArchivo(formData:FormData,id:number): Observable<any>{
    return this.httpClient.post<any>(`${API_FILE_URL}/fileManager/upload/${id}`, formData);
  }
}
