import { Component, OnInit } from '@angular/core';
import { FRegistrarpagoService } from './f-registrarpago.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-f-registrarpago',
  templateUrl: './f-registrarpago.component.html',
  styleUrls: ['./f-registrarpago.component.scss']
})

export class FRegistrarpagoComponent implements OnInit {
  public formulario:FormGroup;
  public comprobantePago:string;
  public uploadComprobante:File;
  public solicitanteTramiteId:number;
  public urlComprobante:string;
  public loadComprobante: boolean;
  public adjuntoComprobante:string;
  public solicitudId:number;
  public tipoDocumentoId:string;
  public solicitanteId:number;
  
  constructor(private fRegistrarpagoService:FRegistrarpagoService, 
              private router:Router, 
              private formBuilder:FormBuilder, 
              private activatedRoute:ActivatedRoute){}

  ngOnInit(){
    this.formulario = this.formBuilder.group({
      nombre:['', Validators.compose([Validators.required,]),],
  		montoTotal:['', Validators.compose([Validators.required,]),],  
  		numeroRecibo:['', Validators.compose([Validators.required,]),],
  		fechaPago:['', Validators.compose([Validators.required,]),],
  		montoPago:['', Validators.compose([Validators.required,]),], 
  		bancoPago:['', Validators.compose([Validators.required,]),],
      comprobantePago:['', Validators.compose([Validators.required,]),],
    });

    this.loadComprobante = false;

    this.fRegistrarpagoService.getRegistroPago(this.activatedRoute.snapshot.params.idSolicitud).subscribe(resp =>{
      console.log('Respuesta',resp);
      this.formulario.controls['nombre'].setValue(resp.nmProyecto);
      this.formulario.controls['montoTotal'].setValue(resp.montoPagar);
      this.solicitudId = parseInt(this.activatedRoute.snapshot.params.idSolicitud);//resp.solicitudId;
      this.solicitanteTramiteId = resp.solicitanteTramiteId;
      this.solicitanteId = resp.solicitanteId;
      this.tipoDocumentoId = resp.lstTiposDocumentos[0].tipoDocumentoId.tipoDocumentoId;
    })
  }


  newPago(){
    const hoy = new Date();

    const data = 
    {
      "solicitudId": this.solicitudId,
      "pagoManual_T01_Sol":{
          "comentarios" : "Comentario 1",
          "numRecibo": this.formulario.controls['numeroRecibo'].value,
          "montoPago": this.formulario.controls['montoPago'].value,
          "fechaPago": hoy.toISOString(),//this.formulario.controls['fechaPago'].value,
          "nombreEntidadBancaria": this.formulario.controls['bancoPago'].value,
      },
      "lstAdjuntosPagos": [{
          "solicitanteTramiteId": { 
              "solicitanteTramiteId":this.solicitanteTramiteId,
          },
          "tipoDocumentoId": { 
              "tipoDocumentoId":this.tipoDocumentoId,
          },
          "solicitanteId": {
              "solicitanteId":this.solicitanteId,
          },
          "nombre": this.adjuntoComprobante,
          "urlAdjunto": this.urlComprobante,
      }
      ]
    }
    
    console.log(data)

    this.fRegistrarpagoService.newPago(data).subscribe(resp=>{
      console.log(resp)
      if(resp.codigo === 0)
      { this.registerAlert(); }
      else
      { this.failSubsanar() }
    }) 
  }
  
  
  fileChangeComprobante(element){
    this.uploadComprobante = element.target.files[0];
    const formData = new FormData();
    formData.append('file', this.uploadComprobante);
    this.fRegistrarpagoService.uploadArchivo(formData,this.solicitanteTramiteId).subscribe((resp) => { 
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
      'Registro de Pago Exitoso!',
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
      text: 'Pago Fallido!'
    })
  }  
}