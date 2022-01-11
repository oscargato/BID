import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ServiciosService {
  
  public tramitesPendientes:number = 0;
  
  constructor(){}
}