import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { map } from 'rxjs/operators';


const API_USERS_URL = `${environment.apiUrl}`;
const API_FILE_URL = `${environment.apiFILE}`;

@Injectable({
  providedIn: 'root'
})


export class FPermisoConstruccionService {

  constructor(private httpClient: HttpClient){}

  setRevision(user: any):Observable<any>{
    return this.httpClient.post<any>(`${API_USERS_URL}/T01/newRevision`,user);
  }  

  getRevision(idSolicitud:number):Observable<any>{
    return this.httpClient.get<any>(`${API_USERS_URL}/T01/getRevision/${idSolicitud}`).pipe(map(resp => resp.objeto));
  }

  getDownloadFile(idSolicitante:number, nameFile:string):Observable<Blob>{
    return this.httpClient.get(`${API_FILE_URL}/fileManager/download/${idSolicitante}/${nameFile}`,{responseType: 'blob'});
  }
}