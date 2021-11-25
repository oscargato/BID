import { Component, OnInit } from '@angular/core';
import { FSubsanarpagosService } from './f-subsanarpagos.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-f-subsanarpagos',
  templateUrl: './f-subsanarpagos.component.html',
  styleUrls: ['./f-subsanarpagos.component.scss']
})

export class FSubsanarpagosComponent implements OnInit {
  public formulario:FormGroup;
  public archivoRegistroPublico:string;
  public tramiteIdRegistroPublico:number;
  public subsanarNumeroRecibo:boolean = false;
  public subsanarFechaPago:boolean = false;
  public subsanarMontoPago:boolean = false;
  public subsanarBanco:boolean = false;
  public subsanarComprobante:boolean = false;
  public loadComprobante:boolean = false;
  public tramiteIdComprobante:number;
  public archivoComprobante:string;
  public uploadComprobante:File;
  public solicitanteTramiteId:number;
  public urlComprobante:string;
  public adjuntoComprobante:string;
  public solicitanteId:number;
  public solicitudId:number;
  public adjuntoIdComprobante:number;

  constructor(private fSubsanarpagosService:FSubsanarpagosService, 
              private router:Router, 
              private formBuilder:FormBuilder, 
              private activatedRoute:ActivatedRoute){}

    ngOnInit(){
      this.formulario = this.formBuilder.group({
        nombreProyecto:['', Validators.compose([Validators.required,]),],  
        montoTotal:['', Validators.compose([Validators.required,]),],  
        numeroRecibo:['', Validators.compose([Validators.required,]),],
        fechaPago:['', Validators.compose([Validators.required,]),],
        montoPago:['', Validators.compose([Validators.required,]),],
        bancoPago:['', Validators.compose([Validators.required,]),],
        comprobantePago:['', Validators.compose([Validators.required]),],
      });
    
      this.fSubsanarpagosService.getSubsanarRegistroPago(this.activatedRoute.snapshot.params.idSolicitud).subscribe(resp =>{
        console.log('Respuesta',resp);
        this.formulario.controls['nombreProyecto'].setValue(resp.pagoSol.solicitudId.nombreProyecto);
        this.formulario.controls['montoTotal'].setValue(resp.pagoRev.pagoManualSolId.solicitudId.montoPagar);
        this.formulario.controls['numeroRecibo'].setValue(resp.pagoSol.numRecibo);
        this.formulario.controls['fechaPago'].setValue(resp.pagoSol.fechaPago);
        this.formulario.controls['montoPago'].setValue(resp.pagoSol.montoPago);
        this.formulario.controls['bancoPago'].setValue(resp.pagoSol.nombreEntidadBancaria); 
        
        this.subsanarNumeroRecibo = resp.pagoRev.numeroDeposito
        this.subsanarFechaPago = resp.pagoRev.fechaPago
        this.subsanarMontoPago = resp.pagoRev.montoPago
        this.subsanarBanco = resp.pagoRev.nombreEntidadBancaria
        this.subsanarComprobante = resp.pagoSol.adjuntoId.rechazado

        this.tramiteIdComprobante = resp.pagoRev.pagoManualSolId.adjuntoId.solicitanteTramiteId;
        this.archivoComprobante = resp.pagoRev.pagoManualSolId.adjuntoId.urlAdjunto;
        this.solicitanteTramiteId = resp.pagoSol.solicitudId.solicitanteTramiteId.solicitanteTramiteId; 
        this.solicitanteId = resp.pagoSol.solicitudId.solicitanteTramiteId.solicitanteId.solicitanteId;
        this.solicitudId = resp.pagoSol.solicitudId.solicitudId;
        this.adjuntoIdComprobante = resp.pagoSol.adjuntoId.adjuntoId;
    })
  }

  newSubsanacionPago(){
    const hoy = new Date();

    const data = 
    { "solicitudId": this.solicitudId,
      "pagoManual_T01_Sol":{
          "comentarios" : "Comentario 1",
          "numRecibo": this.formulario.controls['numeroRecibo'].value,
          "montoPago": this.formulario.controls['montoPago'].value,
          "fechaPago": hoy.toISOString(),//this.formulario.controls['fechaPago'].value,
          "nombreEntidadBancaria": this.formulario.controls['bancoPago'].value,
      },
      "lstAdjuntosPagos": [{
          "adjuntoId": this.adjuntoIdComprobante,
          "solicitanteTramiteId": { 
              "solicitanteTramiteId":this.solicitanteTramiteId
          },
          "tipoDocumentoId": { 
              "tipoDocumentoId": 6 
          },
          "solicitanteId": {
              "solicitanteId": this.solicitanteId,
          },
          "nombre": this.adjuntoComprobante,
          "urlAdjunto": this.urlComprobante,
      }
      ]
    }
    console.log(data);
    this.fSubsanarpagosService.newSubsanacionPago(data).subscribe(resp=>{
      console.log('Respuesta',resp)
      if(resp.codigo === 0)
      { this.registerAlert(); }
      else
      { this.failSubsanar() }
    })
   }
  

  fileDownloadComprobante(){
    this.fSubsanarpagosService.getDownloadFile(this.tramiteIdComprobante,this.archivoComprobante).subscribe(resp=>{
      saveAs(resp,this.archivoComprobante),
      error => console.error(error)
    });
  }

  fileChangeComprobante(element){
    this.uploadComprobante = element.target.files[0];
    const formData = new FormData();
    formData.append('file', this.uploadComprobante);
    this.fSubsanarpagosService.uploadArchivo(formData,this.solicitanteTramiteId).subscribe((resp) => { 
      this.urlComprobante = resp.name;
      this.loadComprobante = true;
      let adjunto = this.formulario.controls['comprobantePago'].value
      this.adjuntoComprobante = adjunto.substring(adjunto.indexOf("h",10) + 2)
      this.archivoCargado(); 
    });
  }

  archivoCargado(){ 
     Swal.fire({ position: 'center',
                 icon: 'success',
                 title: 'Archivo Cargado Exitosamente',
                 showConfirmButton: false,
                 timer: 1500
     })
   }

  registerAlert(){  
    Swal.fire(  
      'Subsanacion de Tramite Exitosa!',
      'Haga click para continuar',
      'success',
    ).then((result) => {
      this.router.navigate(['/tramites/tramites-pendientes/tramites-pendientes']);
    });  
  }

  failSubsanar(){
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Subsanacion Fallida!'
    })
  }
}