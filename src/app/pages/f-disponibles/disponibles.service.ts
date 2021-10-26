import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


const API_USERS_URL = `${environment.apiUrl}`;
const API_FILE_URL = `${environment.apiFILE}`;


@Injectable({
  providedIn: 'root'
})


export class DisponiblesService {

  constructor(private httpClient: HttpClient){}

  solicitantesTramites(solicId:number, tramId:number): Observable<any>{
      const data = {
          "solicitanteId": {
              "solicitanteId": solicId
          },
          "tramiteId": {
              "tramiteId":tramId
          },
          "cesionPoderId": null,
          "empresaId": null
      };
    return this.httpClient.post<any>(`${API_USERS_URL}/solicitantesTramites/save`,data).pipe(map(resp => resp.objeto));
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

  registrarSolicitud(user: any):Observable<any>{
    return this.httpClient.post<any>(`${API_USERS_URL}/T01/newSolicitud`, user);
  }

  uploadArchivo(formData:FormData,id:number): Observable<any>{
    return this.httpClient.post<any>(`${API_FILE_URL}/fileManager/upload/${id}`, formData);
  }  
}