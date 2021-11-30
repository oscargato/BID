import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})

export class PasswordComponent implements OnInit {
  
  public formulario:FormGroup;

  constructor(private formBuilder:FormBuilder,){}

  ngOnInit(){
    this.formulario = this.formBuilder.group({
      password: [ '',Validators.compose([Validators.required,Validators.minLength(3),]),],
      cPassword: ['',Validators.compose([Validators.required,Validators.minLength(3),]),],                    
    }); 
  }
}
