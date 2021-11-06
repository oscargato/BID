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
export class FSubsanarsolicitudService {

  
  constructor(private httpClient: HttpClient){}


  getDownloadFile(idSolicitante:number, nameFile:string):Observable<Blob>{
    return this.httpClient.get(`${API_FILE_URL}/fileManager/download/${idSolicitante}/${nameFile}`,{responseType: 'blob'});
  }

  uploadArchivo(formData:FormData,id:number): Observable<any>{
    return this.httpClient.post<any>(`${API_FILE_URL}/fileManager/upload/${id}`, formData);
  } 

  getSubsanacion(idSolicitud:number):Observable<any>{
    return this.httpClient.get<any>(`${API_USERS_URL}/T01/getSubsanacion/${idSolicitud}`).pipe(map(resp => resp.objeto));
  }

  newSubsanacion(data: any):Observable<any>{
    return this.httpClient.post<any>(`${API_USERS_URL}/T01/newSubsanacion`,data);
  }
  
  getSolicitud(idSolicitud:number):Observable<any>{
    return this.httpClient.get<any>(`${API_USERS_URL}/T01/getSolicitud/${idSolicitud}`).pipe(map(resp => resp.objeto));
  }

  getDistritos(idProvincia:number):Observable<any>{
    return this.httpClient.get<any>(`${API_USERS_URL}/distritos/getByProvinciaId/${idProvincia}`).pipe(map(resp => resp.objeto));
  }

  getCorregimientos(id:number):Observable<any>{
    return this.httpClient.get<any>(`${API_USERS_URL}/corregimientos/getByDistritoId/${id}`).pipe(map(resp => resp.objeto));    
  }
}
