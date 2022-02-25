import { Component, OnInit } from '@angular/core';
import { AltaFuncionarioService } from './alta-funcionario.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

interface TipoFuncionario{
  id:number;
  nombre:string;
}

@Component({
  selector: 'app-alta-funcionario',
  templateUrl: './alta-funcionario.component.html',
  styleUrls: ['./alta-funcionario.component.scss']
})

export class AltaFuncionarioComponent implements OnInit {
  public TiposFuncionarios: Array<TipoFuncionario> = [];
  public provincias:Array<any> = [];
  public formulario:FormGroup;

  constructor(private altaFuncionarioService:AltaFuncionarioService,
              private formBuilder:FormBuilder,
              private router:Router){}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
  		tipoFuncinario:['', Validators.compose([Validators.required]),],
      provincia:['', Validators.compose([Validators.required]),],
      nombre:['', Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(60)]),],
      email: ['',Validators.compose([Validators.required,Validators.email,Validators.minLength(3),Validators.maxLength(360), ]),],
      password: ['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(100),]),],
    });

    this.getDatosFuncionarios();
  }
   
  
  getDatosFuncionarios(){
    this.altaFuncionarioService.getDatosFuncionarios().subscribe(resp=>{
      console.log('respu',resp);

      let i = 0;
      resp.lstTiposRevisores.forEach(element => {
        this.TiposFuncionarios[i] = {
          id:element.tipoRevisorId,
          nombre:element.descripcion,
        };
        i++;
      });

      let j = 0;
      resp.lstProvincias.forEach(element => {
        this.provincias[j] = element;
        j++;
      });      
    })
  }


  crearRevisor(){
    const data = 
    { "nombre": this.formulario.controls['nombre'].value,
      "password": this.formulario.controls['password'].value,
      "tiposRevisores":{  "tipoRevisorId": 2,
                          "descripcion": "Secretaria Municipio"
                       },
      "provinciaId":{
          "provinciaId": 1,
          "regionId": { "regionId": 9,
                        "codRegion": 9,
                        "nomRegion": "BOCAS DEL TORO"
                      },
          "codProvincia": 1,
          "nomProvincia": "BOCAS DEL TORO"
      },
      "email": this.formulario.controls['email'].value,
      "distritoId": {
          "distritoId": 1,
          "provinciaId": {  "provinciaId": 1,
                            "regionId": { "regionId": 9,
                                          "codRegion": 9,
                                          "nomRegion": "BOCAS DEL TORO"
                                        },
                            "codProvincia": 1,
                            "nomProvincia": "BOCAS DEL TORO"
          },
          "codDistrito": 1,
          "nomDistrito": "BOCAS DEL TORO"
      },
      "lstTramites":[{  "tramiteId": 3,
                        "nombre": "Solicitud de Obtención Permiso de Construcción Municipio de Bocas del Toro",
                        "descripcion": "Descripción - Obtención Permiso de Construcción",
                        "fechaBaja": null,
                        "institucionId": {  "institucionId": 1,
                                            "nombre": "BID",
                                          "fechaBaja": null
                                         },
                        "rutaProceso": "obtencionPermisoConstruccion",
                        "nombreProceso": "T01_Sol_PermisoConstruccionMun",
                        "codigo": "T01",
                        "siglas": "OPC",
                        "flujoId": {  "flujoId": 1,
                                      "nombre": "Flujo Complejo"
                                   },
                        "reglasVisibilidad": null,
                        "emailJuridico": false,
                        "tablaSolicitud": "T01_Sol_PermisoConstruccionMun",
                        "tablaRevision": "T01_Rev_PermisoConstruccionMun",
                        "distritoId": { "distritoId": 1,
                                        "provinciaId": {  "provinciaId": 1,
                                                          "regionId": { "regionId": 9,
                                                                        "codRegion": 9,
                                                                        "nomRegion": "BOCAS DEL TORO"
                                                                      },
                                                          "codProvincia": 1,
                                                          "nomProvincia": "BOCAS DEL TORO"
                                                       },
                                        "codDistrito": 1,
                                        "nomDistrito": "BOCAS DEL TORO"
                                      }
                    }]
    }

    this.altaFuncionarioService.crearRevisor(data).subscribe(resp=>{
      console.log(resp)
      if(resp.codigo === 0)
      { this.registerAlert(); }
      else
      { this.failSubsanar() }      
    })
  }

  registerAlert(){  
    Swal.fire(  
      'Registro Exitoso!',
      'Haga click para continuar',
      'success',
    ).then((result) => {
      this.router.navigate(['/tramites/tramites-adm/tramites-adm']);
    });  
  }

  failSubsanar(){
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Creacion Fallida!'
    })
  }  
}