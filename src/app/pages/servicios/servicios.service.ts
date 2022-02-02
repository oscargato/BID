import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ServiciosService {
  
  public tramitesPendientes:number = 0;
  public datos:any;

  constructor(){}

  getDatos(){
    if(localStorage.getItem('datos') != null)
    { this.datos = JSON.parse(localStorage.getItem('datos')); }
  	return this.datos;
  }
}