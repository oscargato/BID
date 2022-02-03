import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ServiciosService } from '../../pages/servicios/servicios.service';
import { UsuariosService } from './usuarios.service';

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
  public rol:string;
  public datos:any;
  
  constructor(private formBuilder:FormBuilder, 
              private router:Router,
              private serviciosService:ServiciosService,
              private usuariosService:UsuariosService)
              {  this.datos = this.serviciosService.getDatos();  }

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
    this.rol = localStorage.getItem('rol');
    
    this.formulario.controls['nombre'].setValue(this.datos.nombreCompleto);
    this.formulario.controls['numeroID'].setValue(this.datos.cedula);
    this.formulario.controls['password'].setValue('**********');
    this.formulario.controls['email'].setValue(this.datos.email);
    this.formulario.controls['phone'].setValue(this.datos.telefono);

    this.getDatosPerfil();
  }

  getDatosPerfil(){
    this.usuariosService.getDatosPerfil(this.datos.usuarioId).subscribe(resp=>{
      console.log('getDatosPerfil',resp);
      let i = 0;
      resp.lstProvincias.forEach(element => {
        this.provincias[i] = element;
        i++;
      });
    })
  }


  editarUsuario(){
    const data = {

        "solicitantes": { "solicitanteId": 2  },
        "pass": "May17782404*.",
        "celular": "3196776180",
        "direccion": "Carrera 11",
        "emailAlt": "mayra@gmail.com",
        "numCasa": "59-7411", 
        "residencia": "Terragrata 2",
        "calle": "11",
         "provincia":{
               "provinciaId": 4,
                "regionId": {
                    "regionId": 1,
                    "codRegion": 1,
                    "nomRegion": "CHIRIQUÍ"
                },
                "codProvincia": 4,
                "nomProvincia": "CHIRIQUÍ"
            },
            "distrito":{
                "distritoId": 6,
                "provinciaId": {
                    "provinciaId": 4,
                    "regionId": {
                        "regionId": 1,
                        "codRegion": 1,
                        "nomRegion": "CHIRIQUÍ"
                    },
                    "codProvincia": 4,
                    "nomProvincia": "CHIRIQUÍ"
                },
                "codDistrito": 3,
                "nomDistrito": "BOQUERÓN"
            },
            "corregimiento":{
                "corregimientoId": 29,
                "distritoId": {
                    "distritoId": 6,
                    "provinciaId": {
                        "provinciaId": 4,
                        "regionId": {
                            "regionId": 1,
                            "codRegion": 1,
                            "nomRegion": "CHIRIQUÍ"
                        },
                        "codProvincia": 4,
                        "nomProvincia": "CHIRIQUÍ"
                    },
                    "codDistrito": 3,
                    "nomDistrito": "BOQUERÓN"
                },
                "codCorregimiento": 3,
                "nomCorregimiento": "CORDILLERA"
            },
        "adjuntos":[{
            "tipoDocumentoId": { 
                "tipoDocumentoId": 8 
            },
            "solicitanteId": {
                "solicitanteId": 2
            },
            "nombre": "Foto",
            "urlAdjunto": "foto.pdf"
        }]
    };
    
    this.usuariosService.guardarPerfil(data).subscribe(resp=>{
      if(resp.codigo === 0)
      { this.registerAlert(); }
      else
      { this.failRegister();  }
    })
  }






  getCargaDistritos(idProvincia:number){
    if(idProvincia >= 0){
      this.distritos = [];
      this.corregimientos = [];
      const id = this.provincias[idProvincia].provinciaId
      this.provincia = this.provincias[idProvincia].nomProvincia
      this.usuariosService.getDistritos(id).subscribe(resp=>{
        let i = 0;
        resp.forEach(element => {
          this.distritos[i] = element;
          i++;
        });
      })
    }
  }


  getCargaCorregimientos(idDistrito:number){
    if(idDistrito >= 0){
      this.corregimientos = [];
      const id = this.distritos[idDistrito].distritoId
      this.distrito = this.distritos[idDistrito].nomDistrito
      this.usuariosService.getCorregimientos(id).subscribe(resp=>{
        let i = 0;
        resp.forEach(element => {
          this.corregimientos[i] = element;
          i++;
        });
      })     
    }
  }  

  getCarga(idCorregimiento:number){
    this.corregimiento = this.corregimientos[idCorregimiento].nomCorregimiento
  }

  subirAvatar(){

    this.archivoCargado();
  }

  registerAlert(){  
    Swal.fire(  
      'Usuario Editado!',
      'Haga click para continuar',
      'success',
    ).then((result) => {
      this.router.navigate(['/tramites/tramites-disponibles/tramites-disponibles']);
    });  
  } 

  failRegister(){
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Solicitud Fallida!'
    })
  }  
  
  archivoCargado(){
    Swal.fire({ position: 'center',
                icon: 'success',
                title: 'Imagen Cargada Exitosamente',
                showConfirmButton: false,
                timer: 1500
              })
  }
}
