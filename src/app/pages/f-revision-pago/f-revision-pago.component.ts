import { Component, OnInit } from '@angular/core';
import { FRevisionPagoService } from './f-revision-pago.service'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-f-revision-pago',
  templateUrl: './f-revision-pago.component.html',
  styleUrls: ['./f-revision-pago.component.scss']
})

export class FRevisionPagoComponent implements OnInit {
  public formulario:FormGroup;
  public tramiteIDComprobante:number;
  public archivoComprobante:string;
  public solicitudId: number;
  public revisorId:number;
  public tipoDocumentoId:number;
  public solicitanteId:number;
  public adjuntoId:number;
  public diasVigencia:number;
  public fecha:string;
  public fechaRevision:string;
  public nombre:string;
  public urlAdjunto:string;
  public fechaPago:number;

  constructor(private fRevisionPagoService:FRevisionPagoService, 
              private router:Router,
              private formBuilder:FormBuilder,
              private activatedRoute:ActivatedRoute){}

  ngOnInit(){
    this.iniciarFormulario();
    this.getRevision();
  }

  iniciarFormulario(){
    this.formulario = this.formBuilder.group({
  		nombre:['', Validators.compose([Validators.required]),],
      montoTotal:['', Validators.compose([Validators.required]),],              
      numRecibo:['', Validators.compose([Validators.required]),],
      checkboxNumRecibo:[false, Validators.compose([Validators.required]),],                  
      fechaPago:['', Validators.compose([Validators.required]),],
      checkboxFechaPago:[false, Validators.compose([Validators.required]),],                                       
      montoPago:['', Validators.compose([Validators.required]),],
      checkboxMontoPago:[false, Validators.compose([Validators.required]),],                 
      nombreEntidad:['', Validators.compose([Validators.required]),],
      checkboxNombreEntidad:[false, Validators.compose([Validators.required]),],
      comprobantePago:['', Validators.compose([Validators.required]),],
      checkboxComprobantePago:[false, Validators.compose([Validators.required]),],
      observaciones:['', Validators.compose([Validators.required,Validators.minLength(5)]),],
    });
  }


  getRevision(){
    this.fRevisionPagoService.getRevisionPago(this.activatedRoute.snapshot.params.tramiteId).subscribe(resp =>{
      console.log('Resp',resp);
      this.formulario.controls['nombre'].setValue(resp.nmProyecto);
      this.formulario.controls['montoTotal'].setValue(resp.montoPagar);
      this.formulario.controls['numRecibo'].setValue(resp.nroRecibo);
      this.formulario.controls['fechaPago'].setValue(resp.fechaPago);
      this.formulario.controls['montoPago'].setValue(resp.montoPagado);
      this.formulario.controls['nombreEntidad'].setValue(resp.nombreEntidad);      

      this.archivoComprobante = resp.adjuntos.urlAdjunto;
      this.tramiteIDComprobante = resp.adjuntos.solicitanteTramiteId.solicitanteTramiteId;      
      this.solicitudId = parseInt(this.activatedRoute.snapshot.params.tramiteId);      
      this.tipoDocumentoId = resp.adjuntos.tipoDocumentoId.tipoDocumentoId;
      this.solicitanteId = resp.adjuntos.solicitanteId.solicitanteId;
      this.adjuntoId = resp.adjuntos.adjuntoId;
      this.diasVigencia = resp.adjuntos.tipoDocumentoId.diasVigencia;
      this.fecha = resp.adjuntos.fecha;
      this.fechaRevision = resp.adjuntos.fechaRevision
      this.nombre = resp.adjuntos.nombre
      this.urlAdjunto = resp.adjuntos.urlAdjunto;

      let fecha = new Date(resp.fechaPago);
      fecha.setDate(fecha.getDate()+1);
      this.fechaPago = fecha.getTime();      
    })
  }


  newRevisonPago(){
    if(this.formulario.controls['observaciones'].valid == false)
    {   this.failObservacion();  }
    else
    {
      let incorrecto:boolean;
      if(this.formulario.controls['checkboxNumRecibo'].value === false &&
        this.formulario.controls['checkboxFechaPago'].value === false &&
        this.formulario.controls['checkboxMontoPago'].value === false &&
        this.formulario.controls['checkboxNombreEntidad'].value === false &&
        this.formulario.controls['checkboxComprobantePago'].value === false)
        { incorrecto = false; }
        else
        { incorrecto = true; }


        const data = 
        { "solicitudId": this.solicitudId,
          "montoPagar": false,
          "nroRecibo": this.formulario.controls['checkboxNumRecibo'].value,
          "fechaPago": this.formulario.controls['checkboxFechaPago'].value,
          "montoPagado": this.formulario.controls['checkboxMontoPago'].value,
          "nombreEntidad": this.formulario.controls['checkboxNombreEntidad'].value,
          "incorrecto": incorrecto,
          "observaciones": this.formulario.controls['observaciones'].value,
          "revisorId": Number(localStorage.getItem('id')), 
          "adjuntos": {
            "adjuntoId": this.adjuntoId,
            "fecha": this.fecha,//"2021-09-09T15:13:32.947Z",
            "fechaRevision": this.fechaRevision,//"2021-09-09T15:13:32.947Z",
            "nombre": this.nombre,
            "rechazado": this.formulario.controls['checkboxComprobantePago'].value,
            "tipoDocumentoId": {
              "diasVigencia": this.diasVigencia,
              "nombre": this.nombre,
              "tipoDocumentoId": this.tipoDocumentoId,
            },
            "urlAdjunto": this.urlAdjunto,
            "solicitanteId": {"solicitanteId":this.solicitanteId,}
          }
        }

        console.log(data);

      this.fRevisionPagoService.newRevisionPago(data).subscribe(resp=>{
        console.log('Respuesta',resp)
        if(resp.codigo === 0)
        { if(incorrecto == true)
          { this.solicitudSubsanar(); }
          else
          { this.registerAlert(); } 
        }
        else
        { this.failSubsanar(); }
      })
    }
  }

  fileDownloadComprobante(){
    this.fRevisionPagoService.getDownloadFile(this.tramiteIDComprobante,this.archivoComprobante).subscribe(resp=>{
      saveAs(resp,this.archivoComprobante),
      error => console.error(error)
    });
  }

  registerAlert(){  
    Swal.fire(  
      'Revisión de Pago Exitosa!',
      'Haga click para continuar',
      'success',
    ).then((result) => {
      this.router.navigate(['/tramites/tramites-a-revisar/tramites-a-revisar']);
    });  
  }

  failSubsanar(){
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Revisión Fallida!'
    })
  }

  solicitudSubsanar(){  
    Swal.fire(  
      'Trámite enviado a Subsanar!',
      'Haga click para continuar',
      'info',
      ).then((result) => {
      this.router.navigate(['/tramites/tramites-a-revisar/tramites-a-revisar']);
    });  
  }
  
  failObservacion(){
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'El campo Observación es obligatorio!'
    })
  }  
}