import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ServiciosService } from '../../pages/servicios/servicios.service';
import { UsuariosService } from './usuarios.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgxSpinnerService } from "ngx-spinner";


interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

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
  public file:File;
  public photoSelected: any;//string | ArrayBuffer;
  public cambiarFoto:boolean;
  public urlFoto:string;
  public nombreFoto:string;
  public image: SafeUrl | null = null;
  public adjuntoId:number
  public spinnerType:string;
  public spinnerName:string;

  constructor(private formBuilder:FormBuilder, 
              private router:Router,
              private serviciosService:ServiciosService,
              private usuariosService:UsuariosService,
              private domSanitizer:DomSanitizer,
              private ngxSpinnerService:NgxSpinnerService)
              {  this.datos = this.serviciosService.getDatos();  }

  ngOnInit(): void{
    this.formulario = this.formBuilder.group({      
      photo:['', Validators.compose([Validators.required,]),],
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
    this.cambiarFoto = false;

    this.getDatosPerfil();

    this.getSpinner();
  }

  getDatosPerfil(){
    this.formulario.controls['nombre'].setValue(this.datos.nombreCompleto);
    this.formulario.controls['numeroID'].setValue(this.datos.cedula);
    this.formulario.controls['password'].setValue('**********');
    this.formulario.controls['email'].setValue(this.datos.email);
    
    this.usuariosService.getDatosPerfil(this.datos.usuarioId).subscribe(resp=>{
      console.log('getDatosPerfil',resp);
      this.formulario.controls['phone'].setValue(resp.celular);
      this.formulario.controls['direccion'].setValue(resp.direccion);
      this.formulario.controls['residencia'].setValue(resp.residencia);
      this.formulario.controls['calle'].setValue(resp.calle);
      this.formulario.controls['casa'].setValue(resp.numCasa);

      let i = 0;
      resp.lstProvincias.forEach(element => {
        this.provincias[i] = element;
        i++;
      });


      if(resp.provincia !== null && resp.distrito !== null && resp.corregimiento !== null)
      { this.getCargaCombo(resp.provincia.nomProvincia,
                           resp.distrito.nomDistrito,
                           resp.corregimiento.nomCorregimiento)         
      }

       if(resp.foto !== null){        
        this.usuariosService.getDownloadFile(this.datos.id,resp.foto.urlAdjunto).subscribe(resp=>{
          console.log('IMG',resp);

          const unsafeImg = URL.createObjectURL(resp);
          this.photoSelected = this.domSanitizer.bypassSecurityTrustUrl(unsafeImg);
                
          error => console.error(error)
        });

        this.adjuntoId = resp.foto.adjuntoId;
      }      
    })
  }


  getCargaCombo(nomProvincia:string, nomDistrito:string, nomCorregimiento:string){
    const posProvincias = this.provincias.findIndex(resp => resp.nomProvincia === nomProvincia);
    this.indexProv = posProvincias;
    if(this.indexProv >= 0){
      this.distritos = [];
      this.corregimientos = [];
      const id = this.provincias[this.indexProv].provinciaId
      this.provincia = this.provincias[this.indexProv].nomProvincia
      this.usuariosService.getDistritos(id).subscribe(resp=>{
        let i = 0;
        resp.forEach(element => {
          this.distritos[i] = element;
          i++;
        });
        const posDistritos = this.distritos.findIndex(resp => resp.nomDistrito === nomDistrito);
        this.indexDist = posDistritos;
         if(this.indexDist >= 0){
          this.corregimientos = [];
          const id2 = this.distritos[this.indexDist].distritoId
          this.distrito = this.distritos[this.indexDist].nomDistrito
          this.usuariosService.getCorregimientos(id2).subscribe(respuesta=>{
            let j = 0;
            respuesta.forEach(elemento => {
              this.corregimientos[j] = elemento;
              j++;
            });
            const posCorregimiento = this.corregimientos.findIndex(resp => resp.nomCorregimiento === nomCorregimiento);
            this.indexCorr = posCorregimiento;
          })
        }  
      })
    }
  }


  editarUsuario(){
        
    const data = {
        "solicitantes": { "solicitanteId": this.datos.id  },        
        "celular": this.formulario.controls['phone'].value,
        "direccion": this.formulario.controls['direccion'].value,
        "emailAlt": this.formulario.controls['email'].value,
        "numCasa": this.formulario.controls['casa'].value, 
        "residencia": this.formulario.controls['residencia'].value,
        "calle": this.formulario.controls['calle'].value,

        "provincia":{
            "provinciaId": this.provincias[this.indexProv].provinciaId,
            "regionId": {
                "regionId": this.provincias[this.indexProv].regionId.regionId,
                "codRegion": this.provincias[this.indexProv].regionId.codRegion,
                "nomRegion": this.provincias[this.indexProv].regionId.nomRegion,
            },
            "codProvincia": this.provincias[this.indexProv].codProvincia,
            "nomProvincia": this.provincias[this.indexProv].nomProvincia,
        },

        "distrito":{
            "distritoId": this.distritos[this.indexDist].distritoId,
            "provinciaId": {
                "provinciaId": this.distritos[this.indexDist].provinciaId.provinciaId,
                    "regionId": {
                        "regionId": this.distritos[this.indexDist].provinciaId.regionId.regionId,
                        "codRegion": this.distritos[this.indexDist].provinciaId.regionId.codRegion,
                        "nomRegion": this.distritos[this.indexDist].provinciaId.regionId.nomRegion,
                    },
                    "codProvincia": this.distritos[this.indexDist].provinciaId.codProvincia,
                    "nomProvincia": this.distritos[this.indexDist].provinciaId.nomProvincia,
                },
                "codDistrito": this.distritos[this.indexDist].codDistrito,
                "nomDistrito": this.distritos[this.indexDist].nomDistrito,
        },

        "corregimiento":{
                "corregimientoId": this.corregimientos[this.indexCorr].corregimientoId,
                "distritoId": {
                    "distritoId": this.corregimientos[this.indexCorr].distritoId.distritoId,
                    "provinciaId": {
                        "provinciaId": this.corregimientos[this.indexCorr].distritoId.provinciaId.provinciaId,
                        "regionId": {
                            "regionId": this.corregimientos[this.indexCorr].distritoId.provinciaId.regionId.regionId,
                            "codRegion": this.corregimientos[this.indexCorr].distritoId.provinciaId.regionId.codRegion,
                            "nomRegion": this.corregimientos[this.indexCorr].distritoId.provinciaId.regionId.nomRegion,
                        },
                        "codProvincia": this.corregimientos[this.indexCorr].distritoId.provinciaId.codProvincia,
                        "nomProvincia": this.corregimientos[this.indexCorr].distritoId.provinciaId.nomProvincia,
                    },
                    "codDistrito": this.corregimientos[this.indexCorr].distritoId.codDistrito,
                    "nomDistrito": this.corregimientos[this.indexCorr].distritoId.nomDistrito,
                },
                "codCorregimiento": this.corregimientos[this.indexCorr].codCorregimiento,
                "nomCorregimiento": this.corregimientos[this.indexCorr].nomCorregimiento,
        },

        "adjuntos":[{
          "adjuntoId": this.adjuntoId,
          "tipoDocumentoId": { "tipoDocumentoId": 8 },
          "solicitanteId": {  "solicitanteId": this.datos.id  },
          "nombre": this.nombreFoto,
          "urlAdjunto": this.urlFoto,
        }]
    };

    console.log('data',data);      

    this.usuariosService.guardarPerfil(data).subscribe(resp=>{      
      if(resp.codigo === 0)
      { this.registerAlert(); }
      else
      { this.failRegister();  }
    });
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

  cambiarAvatar(event: HTMLInputEvent):void{
    if(event.target.files && event.target.files[0]){
      this.file = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
      this.cambiarFoto = true;

      const formData = new FormData();
      formData.append('file', this.file);
      this.usuariosService.uploadArchivo(formData,this.datos.id).subscribe(resp =>{
        console.log('CarFot',resp);
        this.urlFoto = resp.name;
        let adjunto = this.formulario.controls['photo'].value
        this.nombreFoto = adjunto.substring(adjunto.indexOf("h",10) + 2)
      })
    }
  }


  getSpinner(){
    this.spinnerName = 'sp3';
    this.spinnerType = 'ball-spin-clockwise';
    this.ngxSpinnerService.show(this.spinnerName);

    setTimeout(()=>{
      this.ngxSpinnerService.hide(this.spinnerName);
    },3000);
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
