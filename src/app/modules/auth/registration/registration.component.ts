import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { UserModel, UModel } from '../_models/user.model';
import { first } from 'rxjs/operators';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})


export class RegistrationComponent implements OnInit, OnDestroy {
  registrationForm: FormGroup;
  hasError: boolean;
  isLoading$: Observable<boolean>;
  

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor( private fb: FormBuilder, private authService: AuthService, private router: Router) 
  {
    this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  get f(){ return this.registrationForm.controls;  }

  initForm(){
      this.registrationForm = this.fb.group(
      { tipoID: [ '',
                  Validators.compose([
                  Validators.required
                  ]),
                ],        

        numeroID: [ '',
                    Validators.compose([
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(20),                    
                    ]),
                  ],
        
        firstname: [ '',
                     Validators.compose([
                     Validators.required,
                     Validators.minLength(3),
                     Validators.maxLength(100),
                    ]),
                  ],

        lastname: [ '',
                  Validators.compose([
                  Validators.required,
                  Validators.minLength(3),
                  Validators.maxLength(100),
                 ]),
                ],

        phone: [ '',
                Validators.compose([
                Validators.required,
               ]),
              ],                

        email: [ '',
               Validators.compose([
               Validators.required,
               Validators.email,
               Validators.minLength(3),
               Validators.maxLength(360), 
              ]),
            ],

        password: [ '',
                  Validators.compose([
                  Validators.required,
                  Validators.minLength(3),
                  Validators.maxLength(100),
                  ]),
                ],

        cPassword: ['',
                    Validators.compose([
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(100),
                    ]),
                  ],
      },
      { validator: ConfirmPasswordValidator.MatchPassword,  }
    );
  }


  submit(){
    this.hasError = false;

    const newUser = new UModel();
      newUser.tipoIdentificacionId = { "tipoIdentificacionId": this.registrationForm.controls['tipoID'].value}
      newUser.cedula = this.registrationForm.controls['numeroID'].value
      newUser.nombreCompleto = this.registrationForm.controls['firstname'].value
      newUser.apellido = this.registrationForm.controls['lastname'].value
      newUser.celular = this.registrationForm.controls['phone'].value
      newUser.email = this.registrationForm.controls['email'].value
      newUser.contrasena = this.registrationForm.controls['password'].value

    const registrationSubscr = this.authService.registration(newUser)
                                               .pipe(first())
                                               .subscribe((user: UModel) => { 
            if (user)
            {}
            else 
            { this.hasError = true; }
      });      
      this.unsubscribe.push(registrationSubscr);
  }


  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
