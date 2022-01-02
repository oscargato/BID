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
  public solicitanteId:number;
  public adjunto: Array<any> = [];
  public visible:boolean = false;

  constructor(private fTareaInspeccionService:FTareaInspeccionService, 
              private router:Router, 
              private formBuilder:FormBuilder, 
              private activatedRoute:ActivatedRoute){}

  ngOnInit(){
    this.formulario = this.formBuilder.group({  
  		nombreProyecto:['', Validators.compose([Validators.required,]),],
      inspeccion:[true, Validators.compose([Validators.required]),], 
  		observaciones:['', Validators.compose([Validators.required,Validators.minLength(5)]),],
      informe:['', Validators.compose([Validators.required]),], 
    });

    this.loadInforme = false;
    this.getTareaInspeccion();
  }


  getTareaInspeccion()
  { this.fTareaInspeccionService.getRevision(this.activatedRoute.snapshot.params.idRevision ).subscribe(resp =>{
      console.log('Respuesta',resp);
      this.formulario.controls['nombreProyecto'].setValue(resp.nmProyecto);
      this.solicitanteTramiteId = resp.solicitanteTramite.solicitanteTramiteId;
      this.adjunto[0] = resp.lstDocumentos[0];
      this.revisionId = resp.revisionId;
      this.solicitudId = resp.solicitudId;
      this.solicitanteId = resp.solicitanteTramite.solicitanteId.solicitanteId;
    })
  }

  verObservaciontrue(){
    this.visible = true

  }

  verObservacionfalse(){
    this.visible = false
  }


  newRevisionInspeccion(){
    console.log(this.formulario.controls);
    if(this.formulario.controls['informe'].value == ""){
      this.failInforme();
    }
    else
    { if(this.formulario.controls['inspeccion'].value == false && this.formulario.controls['observaciones'].valid == false )
      { this.failObservacion(); }
      else
      {
        const data = 
        { "solicitudId": this.solicitudId,
          "revisionId": this.revisionId,
          "revisorId": 4,
          "inspeccionAprobada": this.formulario.controls['inspeccion'].value,
          "observaciones": this.formulario.controls['observaciones'].value,
          "lstAdjuntos": [{
              "solicitanteTramiteId": { 
                  "solicitanteTramiteId": this.solicitanteTramiteId,
              },
              "tipoDocumentoId": { 
                  "tipoDocumentoId": this.adjunto[0].tipoDocumentoId.tipoDocumentoId,
              },
              "solicitanteId": {
                  "solicitanteId": this.solicitanteId,
              },
              "nombre": this.adjunto[0].tipoDocumentoId.nombre,
              "urlAdjunto": this.urlInforme,
          }]
        }

        console.log(data)
      
        this.fTareaInspeccionService.newRevisionInspeccion(data).subscribe(resp=>{
          console.log('Carga',resp)
          if(resp.codigo === 0)
          { if(this.formulario.controls['inspeccion'].value == true)
            { this.registerAlert(); }
            else
            { this.noAprobada(); }        
          }
          else
          { this.failRevision()   }
        })  
      }
    }
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
      title: 'Informe de Inspección Cargado Exitosamente',
      showConfirmButton: false,
      timer: 1500
    })
  }

  registerAlert(){  
    Swal.fire(  
      'Inspección Aprobada!',
      'Haga click para continuar',
      'success',
      ).then((result) => {
      this.router.navigate(['/tramites/tramites-a-revisar/tramites-a-revisar']);
    });  
  }

  noAprobada(){  
    Swal.fire(  
      'Trámite No Aprobado!',
      'Haga click para continuar',
      'info',
      ).then((result) => {
      this.router.navigate(['/tramites/tramites-a-revisar/tramites-a-revisar']);
    });  
  }  

  failRevision(){
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Inspección Fallida!'
    })
  }

  failInforme(){
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Debe Adjuntar el Informe de Inspección!'
    })
  }
  
  failObservacion(){
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'El campo Observación es obligatorio!'
    })
  }
}