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
  public clave:string = '';
  public cclave:string = '';
  
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
}