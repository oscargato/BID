import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { UserModel } from '../_models/user.model';
import { AuthService } from '../_services/auth.service';
import { AuthHTTPService } from '../_services/auth-http';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})


export class LoginComponent implements OnInit, OnDestroy {

  defaultAuth: any = {
    email: 'siliceContribuyente1@hotmail.com',
    //email: 'siliceContribuyente2@hotmail.com',
    //email: 'siliceContribuyente3@hotmail.com',
    //email: 'siliceContribuyente4@hotmail.com',
    //email: 'secretariaMunicipio@gmail.com',
    //email: 'arquitectoMunicipio@gmail.com',
    //email: 'inspectorMunicio@gmail.com',
    //email: '',
    password:'Silice2021*',
  };

  loginForm: FormGroup;
  errores: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;


  private unsubscribe: Subscription[]=[];

  constructor(  private fb: FormBuilder, 
                private authService: AuthService, 
                private authHTTPService:AuthHTTPService,
                private route: ActivatedRoute,
                private router: Router ) 
              { this.isLoading$ = this.authService.isLoading$;
                if (this.authService.currentUserValue) 
                { this.router.navigate(['/']);  }
              }


  ngOnInit():void 
  { this.initForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
    this.errores = false;
  }

  get f() { return this.loginForm.controls; }

  initForm(){
    this.loginForm = this.fb.group({
      email: [this.defaultAuth.email,
              Validators.compose([
              Validators.required,
              Validators.email,
              Validators.minLength(3),
              Validators.maxLength(320), 
              ]),
            ],

      password: [this.defaultAuth.password,
                 Validators.compose([
                 Validators.required,
                 Validators.minLength(3),
                 Validators.maxLength(100),
                 ]),
                ],
    });
  }


  submit(){
    this.errores = false;
    const loginSubscr = this.authHTTPService
      .login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe((user: UserModel) => {
        if (user) {
          let us:any;
          us = user;
          if(user.codigo === 0)
          { let token = 'autenticado'
            localStorage.setItem("token", token);
            localStorage.setItem("rol", us.objeto.rol);
            localStorage.setItem("nombre", us.objeto.nombreCompleto);
            if(us.objeto.rol === 'SOL')
            { localStorage.setItem("id", us.objeto.solicitante.solicitanteId);              
              this.router.navigate(['/tramites/tramites-disponibles/tramites-disponibles']); 
            }
            else
            { if(us.objeto.rol === 'REV')
              { localStorage.setItem("id", us.objeto.revisor.tipoRevisorId.tipoRevisorId);
                this.router.navigate(['/tramites/tramites-a-revisar/tramites-a-revisar']); }     
            }
          }else if(user.codigo === 1)
                { 
                  this.errores = true;
          }else if(user.codigo === 2)
                { this.errores = true; }
          }else 
              { this.errores = true; }
      });
    this.unsubscribe.push(loginSubscr);
  }


  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
