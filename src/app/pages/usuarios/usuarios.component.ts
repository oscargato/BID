import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})


export class UsuariosComponent implements OnInit {
  public formulario:FormGroup;
  public indexProv:number=-1;
  public indexDist:number=-1;
  public indexCorr:number=-1;
  public provincias:Array<any> = [];
  public distritos:Array<any> = [];
  public corregimientos:Array<any> = [];
  public provincia:string;
  public distrito:string;
  public corregimiento:string; 
  
  constructor(private formBuilder:FormBuilder){}

  ngOnInit(): void{
    this.formulario = this.formBuilder.group({
      nombre:['', Validators.compose([Validators.required,]),],
      numeroID:['', Validators.compose([Validators.required,]),],
      password:['', Validators.compose([Validators.required,]),],
      email:['', Validators.compose([Validators.required,]),],
      phone:['', Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(15)]),],
      direccion:['', Validators.compose([Validators.required,]),],
      provincia:['', Validators.compose([Validators.required,]),],
      distrito:['', Validators.compose([Validators.required,]),],
      corregimiento:['', Validators.compose([Validators.required,]),],
      residencia:['', Validators.compose([Validators.required,]),],
      calle:['', Validators.compose([Validators.required,]),],
      casa:['', Validators.compose([Validators.required,]),],
    }); 
    
    
    this.provincias = [];
    this.distritos = [];
    this.corregimientos = [];
  }

  getCargaDistritos(idProvincia:number){
    if(idProvincia >= 0){
      this.distritos = [];
      this.corregimientos = [];
      const id = this.provincias[idProvincia].provinciaId
      this.provincia = this.provincias[idProvincia].nomProvincia
/*       this.disponiblesService.getDistritos(id).subscribe(resp=>{
        let i = 0;
        resp.forEach(element => {
          this.distritos[i] = element;
          i++;
        });
      }) */
    }
  }


  getCargaCorregimientos(idDistrito:number){
    if(idDistrito >= 0){
      this.corregimientos = [];
      const id = this.distritos[idDistrito].distritoId
      this.distrito = this.distritos[idDistrito].nomDistrito
      /* this.disponiblesService.getCorregimientos(id).subscribe(resp=>{
        let i = 0;
        resp.forEach(element => {
          this.corregimientos[i] = element;
          i++;
        });
      }) */      
    }
  }  

  getCarga(idCorregimiento:number){
    this.corregimiento = this.corregimientos[idCorregimiento].nomCorregimiento
  }

  subirAvatar(){

  }

  editarUsuario(){
  }
}
