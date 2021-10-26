import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel,UModel } from '../../_models/user.model';
import { environment } from '../../../../../environments/environment';
import { AuthModel } from '../../_models/auth.model';

const API_USERS_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root',
})


export class AuthHTTPService {
  constructor(private http: HttpClient){}


  login(email: string, password: string): Observable<any> {
    return this.http.post<AuthModel>(`${API_USERS_URL}/usuarios/login`, { email, password });
  }


  createUser(user: UModel): Observable<UModel> {
    return this.http.post<UModel>(`${API_USERS_URL}/registros/saveRegistroUsuario`, user);
  }

  
  forgotPassword(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${API_USERS_URL}/forgot-password`, { email,});
  }


  getUserByToken(token): Observable<UserModel> {
    const httpHeaders = new HttpHeaders({ Authorization: `Bearer ${token}`,});
    return this.http.get<UserModel>(`${API_USERS_URL}/me`, {headers: httpHeaders,});
  }
}
