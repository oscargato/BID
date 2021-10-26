import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FRevisionPagoService } from './f-revision-pago.service'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import KTWizard from '../../../assets/js/components/wizard';
import { KTUtil } from '../../../assets/js/components/util';



@Component({
  selector: 'app-f-revision-pago',
  templateUrl: './f-revision-pago.component.html',
  styleUrls: ['./f-revision-pago.component.scss']
})

export class FRevisionPagoComponent implements OnInit, AfterViewInit, OnDestroy {


  //@ViewChild('wizard', { static: true }) el: ElementRef;

  model: any = {
    nombreProyecto: 'Banco Nacional de Panamá',
    banco: 'Banco Nacional de Panamá',
    nrecibo: '123a-456b',
    montototal: '$12,213,456.78',
    montopago: '$1213,456.70',
  
  };
  submitted = false;
  wizard: any;

  constructor(private fRevisionPagoService:FRevisionPagoService, 
              private router:Router)
              {}

  ngOnInit(){
    this.fRevisionPagoService.getRevision(1).subscribe(resp =>{
      console.log('Respuesta',resp);
    })

  }



 newRevisonPago(){

  const data = {
      "incorrecto": false,
        "t01_Rev_PermisoConstruccionMun": {
            "codUbicacion": true,
            "comentarios": "string",
            "comentariosCierre": "string",
            "comentariosInternos": "string",
            "comprobacionNegada": true,
            "corregimientoProyectoId": true,
            "descripcionProyecto": true,
            "distritoProyectoId": true,
            "fechaRevision": "2021-09-09T15:13:32.947Z",
            "fechaRevisionInspeccion": null,
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
            "nombreProyecto": true,
            "nombreResp": true,
            "numIdoneidad": true,
            "observacionComprobacion": "string",
            "observaciones": "string",
            "pagoElectronico": true,
            "pagoManual": true,
            "provinciaProyectoId": true,
            "revisionId": 1,
            "revisionNegada": true,
            "revisorId": {
                "revisorId": 2,
                "tipoRevisorId": {
                    "descripcion": "Secretaria Municipio",
                    "tipoRevisorId": 2
                }
            },
            "solicitudConfirmada": true,
            "solicitudId": {
          "solicitudId": 1
        },
            "tipoPropiedadId": true,
            "tomo": true,
            "valorAproxObra": true
        },
      "lstAdjuntos": [
        {
          "adjuntoId": 1,
          "fecha": "2021-09-09T15:13:32.947Z",
          "fechaRevision": "2021-09-09T15:13:32.947Z",
          "nombre": "Registro Público",
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

  this.fRevisionPagoService.newRevisionPago(data).subscribe(resp=>{

    if(resp.codigo === 0){
      this.registerAlert();
    }
    else{
      this.failSubsanar()
    }
  })
 }




  registerAlert(){  
    Swal.fire(  
      'Subsanacion de Tramite Exitosa!',
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
      text: 'Subsanacion Fallida!'
    })
  }










  ngAfterViewInit(): void {}

  ngOnDestroy() {
    this.wizard = undefined;
  }
}


