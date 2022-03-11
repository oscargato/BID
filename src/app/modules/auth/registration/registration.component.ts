import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { UModel } from '../_models/user.model';
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
  
  private unsubscribe: Subscription[] = [];
  public ver:boolean = false;
  public letraMayuscula:boolean = false;
  public letraMinuscula:boolean = false;
  public unNumero:boolean = false;
  public unCaracter:boolean = false;
  public minimoCaracteres:boolean = false;
  public maximoCaracteres:boolean = false;
  public iguales:boolean = false;
  public clave:string = '';
  public cclave:string = '';
  public passValido:boolean = false;

  constructor( private fb: FormBuilder, 
               private authService: AuthService, 
               private router: Router) 
  {
    this.isLoading$ = this.authService.isLoading$;    
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
      { tipoID: [ '',Validators.compose([Validators.required]),],
        numeroID: [ '',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(15),]),],        
        firstname: [ '',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(100),]),],
        lastname: [ '',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(100),]),],
        phone: [ '',Validators.compose([Validators.required,]),],                
        email: [ '',Validators.compose([Validators.required,Validators.email,Validators.minLength(3),Validators.maxLength(360), ]),],
        password: [ '',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(100),]),],
        cPassword: ['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(100),]),],
      },
      { validator: ConfirmPasswordValidator.MatchPassword,}
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



  
  validatePassword(){    
    if(this.clave.length < 8)
    { this.minimoCaracteres = false; }
    else
    { this.minimoCaracteres = true; }
    

    if(this.clave.length >=1 && this.clave.length <= 20)
    { this.maximoCaracteres = true; }
    else
    { this.maximoCaracteres = false; }    


    const numero = /\d/; 
    if(numero.test(this.clave))
    { this.unNumero = true; }
    else
    { this.unNumero = false; }


    const mayuscula = /[A-Z]/; 
    if(mayuscula.test(this.clave))
    { this.letraMayuscula = true; }
    else
    { this.letraMayuscula = false; }


    const minuscula = /[a-z]/; 
    if(minuscula.test(this.clave))
    { this.letraMinuscula = true; }
    else
    { this.letraMinuscula = false; }


    const caracter = /[${}"><@&%#!¡¿?()|+*-/:;_.,=]/
    if(caracter.test(this.clave))
    { this.unCaracter = true; }
    else
    { this.unCaracter = false; }

    if(this.clave == this.cclave)
    { this.iguales = true; }
    else
    { this.iguales = false; }
    
    if(this.letraMayuscula && this.letraMinuscula && this.unNumero && this.unCaracter && this.minimoCaracteres && this.maximoCaracteres && this.iguales){
      this.passValido = true;
    }else{
      this.passValido = false;
    }
  }


  validateConfirmPassword(){
    if(this.clave == this.cclave)
    { this.iguales = true; }
    else
    { this.iguales = false; }


    if(this.letraMayuscula && this.letraMinuscula && this.unNumero && this.unCaracter && this.minimoCaracteres && this.maximoCaracteres && this.iguales){
      this.passValido = true;
    }else{
      this.passValido = false;
    }
  }



  inputValidator(event: any){
    const pattern = /^[a-zA-Z0-9]*$/;   
    if (!pattern.test(event.target.value))
    {  event.target.value = event.target.value.replace(/[^a-zA-Z0-9]/g,"");  }
  }

  verRequerimientos(){
    this.ver = !this.ver ;
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
