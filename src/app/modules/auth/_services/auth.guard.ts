import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate 
{ 
  constructor(private authService: AuthService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) 
  { let variable = localStorage.getItem("token");

    if(variable === 'autenticado')
    {   return true;  }
    else
    {   this.authService.logout();
        return false;  
    }
  }
}
