import { FTareaInspeccionService } from './f-tarea-inspeccion.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-f-tarea-inspeccion',
  templateUrl: './f-tarea-inspeccion.component.html',
  styleUrls: ['./f-tarea-inspeccion.component.scss']
})


export class FTareaInspeccionComponent implements OnInit {

  public formulario:FormGroup;
  public loadInforme: boolean;
  public uploadInforme:File;
  public adjuntoInforme:string;
  public urlInforme:string;
  public solicitanteTramiteId:number;
  public revisionId:number;
  public revisionNegada:boolean;
  public solicitudId:number;

  constructor(private fTareaInspeccionService:FTareaInspeccionService, 
              private router:Router, 
              private formBuilder:FormBuilder, 
              private activatedRoute:ActivatedRoute){}

  ngOnInit() {

    this.formulario = this.formBuilder.group({  

  		nombreProyecto:['', Validators.compose([
                          Validators.required,
                        ]),
                     ],

      inspeccion:[true, Validators.compose([
                        Validators.required
                    ]),
                 ], 

  		observaciones:['', Validators.compose([
                         Validators.required,
                      ]),
                    ],

      informe:['', Validators.compose([
                   Validators.required
                ]),
              ], 
    });

    this.loadInforme = false;
    this.getTareaInspeccion();
  }


  getTareaInspeccion()
  { this.fTareaInspeccionService.getRevision(this.activatedRoute.snapshot.params.idRevision ).subscribe(resp =>{
      console.log('Respuesta',resp);
      this.formulario.controls['nombreProyecto'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.nombreProyecto);
      this.formulario.controls['inspeccion'].setValue(resp.t01_Rev_PermisoConstruccionMun.inspeccionAprobada);
      this.formulario.controls['observaciones'].setValue(resp.t01_Rev_PermisoConstruccionMun.observacionInspeccion);
      this.solicitanteTramiteId = resp.t01_Rev_PermisoConstruccionMun.solicitudId.solicitanteTramiteId.solicitanteTramiteId;      
      this.revisionId = resp.t01_Rev_PermisoConstruccionMun.revisionId;
      this.revisionNegada = resp.t01_Rev_PermisoConstruccionMun.revisionNegada;
      this.solicitudId = resp.t01_Rev_PermisoConstruccionMun.solicitudId.solicitudId
    })
  }


  newRevisionInspeccion(){

    const hoy = new Date();
    
    const data = 
    {
      "incorrecto": false,
        "t01_Rev_PermisoConstruccionMun": {
            "inspeccionAprobada": this.formulario.controls['inspeccion'].value,
            "codUbicacion": true,
            "comentarios": "string",
            "comentariosCierre": "string",
            "comentariosInternos": "string",
            "comprobacionNegada": true,
            "corregimientoProyectoId": true,
            "descripcionProyecto": true,
            "distritoProyectoId": true,
            "fechaRevision": hoy.toISOString(),
            "fechaRevisionInspeccion": hoy.toISOString(),
            "fechaRevisionPlanos": null,
            "finca": true,
            "folio": true,
            "montoPagar": true,
            "montoPagarFunc": true,
            "montoTotal": true,
            "noViable": false,
            "nombreEntidadEvaluadora": true,
            "nombreEntidadEvaluadoraFunc": true,
            "nombreProfesionalIdoneo": true,
            "nombreProfesionalResidente": true,
            "nombrePropietarioTerreno": true,
            "nombreProyecto": this.formulario.controls['nombreProyecto'].value,
            "nombreResp": true,
            "numIdoneidad": true,
            "observacionComprobacion": "string",
            "observaciones": this.formulario.controls['observaciones'].value,
            "pagoElectronico": true,
            "pagoManual": true,
            "provinciaProyectoId": true,
            "revisionId": this.revisionId,
            "revisionNegada": this.revisionNegada,
            "revisorId": null,
            "revisorInspeccionId": {
                "revisorId": 4,
                "tipoRevisorId": {
                    "descripcion": "Inspector",
                    "tipoRevisorId": Number(localStorage.getItem('id'))
                }
            },
            "solicitudConfirmada": true,
            "solicitudId": {
          "solicitudId": this.solicitudId
        },
            "tipoPropiedadId": true,
            "tomo": true,
            "valorAproxObra": true
        },
      "lstAdjuntos": [
        {
          "adjuntoId": 1,
          "fecha": hoy.toISOString(),
          "fechaRevision": hoy.toISOString(),
          "nombre": 1,
          "rechazado": true,
          "tipoDocumentoId": {
          "diasVigencia": 0,
          "nombre": "Registro Público",
          "tipoDocumentoId": 1
          },
          "urlAdjunto": "RegistroPublico1.pdf",
               "solicitanteId": {
                   "solicitanteId":1
               }
        }
        ]
    }

    console.log('data',data);
    /*
    this.fTareaInspeccionService.newRevisionInspeccion(data).subscribe(resp=>{
      if(resp.codigo === 0)
      { this.registerAlert(); }
      else
      { this.failRevision()   }
    })
    */  
  }


  fileChangeInforme(element){
    this.uploadInforme = element.target.files[0];
    const formData = new FormData();
    formData.append('file', this.uploadInforme);
    this.fTareaInspeccionService.uploadArchivo(formData,this.solicitanteTramiteId).subscribe((resp) => {      
      this.urlInforme = resp.name;
      this.loadInforme = true;
      let adjunto = this.formulario.controls['informe'].value
      this.adjuntoInforme = adjunto.substring(adjunto.indexOf("h",10) + 2)
      this.archivoCargado();
    });

  } 


  archivoCargado(){
    Swal.fire({ 
      position: 'center',
      icon: 'success',
      title: 'Informe de Inspeccion Cargado Exitosamente',
      showConfirmButton: false,
      timer: 1500
    })
  }


  registerAlert(){  
    Swal.fire(  
      'Inspeccion Exitosa!',
      'Haga click para continuar',
      'success',
      ).then((result) => {
      this.router.navigate(['/tramites/tramites-a-revisar/tramites-a-revisar']);
    });  
  }


  failRevision(){
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Inspeccion Fallida!'
    })
  }
}