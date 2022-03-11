import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthHTTPService } from '../../../auth/_services/auth-http/auth-http.service';
import { Router, UrlTree } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})

export class PasswordComponent implements OnInit {
  public formulario:FormGroup;
  private hash:string;
  private urlTree:UrlTree;
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
  
  constructor(private formBuilder:FormBuilder, 
              private authHTTPService:AuthHTTPService,
              private router:Router){}

  ngOnInit(){
    this.formulario = this.formBuilder.group({
      password: [ '',Validators.compose([Validators.required,Validators.minLength(3),]),],
      cPassword: ['',Validators.compose([Validators.required,Validators.minLength(3),]),],                    
    }); 
  }

  recuperarPassCorrecto(){
    this.urlTree = this.router.parseUrl(this.router.url);
    this.hash = this.urlTree.queryParams.hash;

    const data = {  "pass": this.formulario.controls['password'].value,
                    "hash": this.hash,
                 }
    this.authHTTPService.recuperarPassCorrecto(data).subscribe(resp=>{
      this.router.navigate(['/auth/login']);
    }) 
  }

  verRequerimientos(){
    this.ver = !this.ver ;
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
    if(this.clave === this.cclave)
    { this.iguales = true; }
    else
    { this.iguales = false; }

    if(this.letraMayuscula && this.letraMinuscula && this.unNumero && this.unCaracter && this.minimoCaracteres && this.maximoCaracteres && this.iguales){
      this.passValido = true;
    }else{
      this.passValido = false;
    }
  }
}