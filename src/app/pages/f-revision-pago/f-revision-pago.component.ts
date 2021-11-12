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
      montototal:['', Validators.compose([Validators.required]),],              
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
    });
  }


  getRevision(){
    this.fRevisionPagoService.getRevisionPago(this.activatedRoute.snapshot.params.tramiteId).subscribe(resp =>{
      console.log('Respuesta',resp);
      this.formulario.controls['nombre'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.nombreProyecto);
      
      /*
      this.tramiteIDComprobante =
      this.archivoComprobante =
      */
    })
  }


  newRevisonPago(){
    const data = 
    {
      "solicitudId": 1, 
      "montoPagar": true,
      "nroRecibo": true,
      "fechaPago": true,
      "montoPagado": true,
      "nombreEntidad": true,
      "incorrecto": true,
      "observaciones": "Esta muy correcto",
      "revisorId": 2, 
      "adjuntos": {
        "adjuntoId": 1,
        "fecha": "2021-09-09T15:13:32.947Z",
        "fechaRevision": "2021-09-09T15:13:32.947Z",
        "nombre": "Comprobante de Pago",
        "rechazado": true,
        "tipoDocumentoId": {
          "diasVigencia": 0,
          "nombre": "Comprobante de Pago",
          "tipoDocumentoId":6
        },
        "urlAdjunto": "ComprobantePago.pdf",
            "solicitanteId": {
          "solicitanteId":1
            }
      }
    }

    this.fRevisionPagoService.newRevisionPago(data).subscribe(resp=>{
      console.log(resp)
      if(resp.codigo === 0)
      { this.registerAlert(); }
      else
      { this.failSubsanar(); }
    })
  }

  fileDownloadComprobante(){
    this.fRevisionPagoService.getDownloadFile(this.tramiteIDComprobante,this.archivoComprobante).subscribe(resp=>{
      saveAs(resp,this.archivoComprobante),
      error => console.error(error)
    });
  }

  registerAlert(){  
    Swal.fire(  
      'Revision de Pago Exitosa!',
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
      text: 'Revision Fallida!'
    })
  }
}