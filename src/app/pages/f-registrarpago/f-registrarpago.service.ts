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


export class FRegistrarpagoService {

  constructor(private httpClient: HttpClient) { }

  uploadArchivo(formData:FormData,id:number): Observable<any>{
    return this.httpClient.post<any>(`${API_FILE_URL}/fileManager/upload/${id}`, formData);
  } 

  getDownloadFile(idSolicitante:number, nameFile:string):Observable<Blob>{
    return this.httpClient.get(`${API_FILE_URL}/fileManager/download/${idSolicitante}/${nameFile}`,{responseType: 'blob'});
  }

  getRegistroPago(idSolicitud:number):Observable<any>{
    return this.httpClient.get<any>(`${API_USERS_URL}/T01/getRegistroPago/${idSolicitud}`).pipe(map(resp => resp.objeto));
  }

  newPago(data: any):Observable<any>{
    return this.httpClient.post<any>(`${API_USERS_URL}/T01/newPago`,data);
  }  
}
