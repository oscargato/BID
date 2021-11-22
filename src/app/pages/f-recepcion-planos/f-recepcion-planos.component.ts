import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import KTWizard from '../../../assets/js/components/wizard';
import { KTUtil } from '../../../assets/js/components/util';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FRecepcionPlanosService } from './f-recepcion-planos.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-f-recepcion-planos',
  templateUrl: './f-recepcion-planos.component.html',
  styleUrls: ['./f-recepcion-planos.component.scss']
})


export class FRecepcionPlanosComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('wizard', { static: true }) el: ElementRef;
  wizard: any;

  public formulario:FormGroup;
  public registroPublico:string;
  public certificacion:string;
  public planos:string;
  public archivoRegistroPublico:string;
  public tramiteIdRegistroPublico:number;
  public archivoIdoneo:string;
  public tramiteIdIdoneo:number;
  public archivoPlanos:string;
  public tramiteIdPlanos:number;
  public adjuntos: Array<any>
  public solicitudId:number;
  public fechaDocRecibidos:string;
  public revisionId:number;
  public revisorId:number;

  public fecha1:string;
  public fechaRevision1:string;
  public fecha2:string;
  public fechaRevision2:string;
  public fecha3:string;
  public fechaRevision3:string;


  constructor(private formBuilder:FormBuilder, 
              private activatedRoute:ActivatedRoute,
              private router: Router,
              private fRecepcionPlanosService:FRecepcionPlanosService){
                this.adjuntos = [];
              }

  ngOnInit(){
    this.initFormulario();
    //this.getRevision();
  }


  initFormulario(){
    const today = new Date().toISOString();
    this.formulario = this.formBuilder.group({
  		nombre:['', Validators.compose([Validators.required]),],              
      descripcion:['', Validators.compose([Validators.required, Validators.minLength(5),Validators.maxLength(500)]),],               
      provincia:['', Validators.compose([Validators.required]),],
      distrito:['', Validators.compose([Validators.required]),],
      corregimiento:['', Validators.compose([Validators.required]),],
      tipoPropiedad:['', Validators.compose([Validators.required]),],
      codigoUbicacion:['', Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(50)]),],                      
      finca:['', Validators.compose([Validators.required, Validators.minLength(5),Validators.maxLength(60)]),],            
      tomo:['', Validators.compose([Validators.required, Validators.minLength(5),Validators.maxLength(50)]),],
      folio:['', Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(50)]),],      
      constructor:['', Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(120)]),],                       
      propietarioTerreno:['', Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(120)]),],
      valorObra:['', Validators.compose([Validators.required,Validators.minLength(2),Validators.maxLength(20)]),], 
      nombreProfesionalIdoneo:['', Validators.compose([Validators.required,Validators.minLength(2),Validators.maxLength(120)]),], 
      numeroIdoneidad:['', Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(120)]),],
      nombreProfesionalResidente:['', Validators.compose([Validators.required,Validators.minLength(2),Validators.maxLength(120)]),],
      registroPublico:['', Validators.compose([Validators.required]),],
      certificacionIdoneo:['',Validators.compose([Validators.required]), ],
      planos:['', Validators.compose([Validators.required]), ],
      checkboxPlanosRecibidos:[false, Validators.compose([Validators.required]),],   
      fechaInspeccion:[null, Validators.compose([Validators.required]),], 
      checkboxViable:[false, Validators.compose([Validators.required]),],
      observaciones:['', Validators.compose([Validators.required]),],               
    });


    this.fRecepcionPlanosService.getRevision(this.activatedRoute.snapshot.params.idRevision ).subscribe(resp =>{
      console.log('Respuesta',resp);
      this.formulario.controls['nombre'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.nombreProyecto);
      this.formulario.controls['descripcion'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.descripcionProyecto);
      this.formulario.controls['provincia'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.provinciaProyectoId.nomProvincia);
      this.formulario.controls['distrito'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.distritoProyectoId.nomDistrito);
      this.formulario.controls['corregimiento'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.corregimientoProyectoId.nomCorregimiento);
      this.formulario.controls['tipoPropiedad'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.tipoPropiedadId.descripcion);
      this.formulario.controls['codigoUbicacion'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.codUbicacion);
      this.formulario.controls['finca'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.finca);
      this.formulario.controls['tomo'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.tomo);
      this.formulario.controls['folio'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.folio);
      this.formulario.controls['constructor'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.nombreResp);
      this.formulario.controls['propietarioTerreno'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.nombrePropietarioTerreno);
      this.formulario.controls['valorObra'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.valorAproxObra);
      this.formulario.controls['nombreProfesionalIdoneo'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.nombreProfesionalIdoneo);
      this.formulario.controls['numeroIdoneidad'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.numIdoneidad);
      this.formulario.controls['nombreProfesionalResidente'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.nombreProfesionalResidente);
      
      const dateString = moment.unix(1637553600).format('DD/MM/YYYY HH:mm');
      console.log('Asigna',dateString);
      this.formulario.controls['fechaInspeccion'].setValue(dateString);


      this.solicitudId = resp.t01_Rev_PermisoConstruccionMun.solicitudId.solicitudId;
      this.fechaDocRecibidos = resp.t01_Rev_PermisoConstruccionMun.fechaDocRecibidos;
      this.revisionId = resp.t01_Rev_PermisoConstruccionMun.revisionId;
      this.revisorId = resp.t01_Rev_PermisoConstruccionMun.revisorId;

      this.archivoRegistroPublico = resp.lstAdjuntos[0].urlAdjunto;
      this.tramiteIdRegistroPublico = resp.lstAdjuntos[0].solicitanteTramiteId.solicitanteTramiteId;
      this.archivoIdoneo = resp.lstAdjuntos[1].urlAdjunto;
      this.tramiteIdIdoneo = resp.lstAdjuntos[1].solicitanteTramiteId.solicitanteTramiteId;
      this.archivoPlanos = resp.lstAdjuntos[2].urlAdjunto;
      this.tramiteIdPlanos = resp.lstAdjuntos[2].solicitanteTramiteId.solicitanteTramiteId;
      this.registroPublico = resp.lstAdjuntos[0].urlAdjunto;
      this.certificacion = resp.lstAdjuntos[1].urlAdjunto;
      this.planos = resp.lstAdjuntos[2].urlAdjunto;
      
      this.fecha1 = resp.resp.lstAdjuntos[0].fecha;
      this.fechaRevision1= resp.resp.lstAdjuntos[0].fechaRevision;
      this.fecha2= resp.resp.lstAdjuntos[1].fecha;
      this.fechaRevision2= resp.resp.resp.lstAdjuntos[1].fechaRevision;
      this.fecha3= resp.resp.lstAdjuntos[2].fecha;
      this.fechaRevision3=resp.resp.lstAdjuntos[2].fechaRevision;


      let i = 0;
      resp.lstAdjuntos.forEach(element => {
        this.adjuntos[i] = element
        i++;
      });
    })
  }

  fileDownloadRegistro(){
    this.fRecepcionPlanosService.getDownloadFile(this.tramiteIdRegistroPublico,this.archivoRegistroPublico).subscribe(resp=>{
      saveAs(resp,this.archivoRegistroPublico),
      error => console.error(error)
    });
  }
  
  fileDownloadIdoneo(){
    this.fRecepcionPlanosService.getDownloadFile(this.tramiteIdIdoneo,this.archivoIdoneo).subscribe(resp=>{
      saveAs(resp,this.archivoIdoneo),
      error => console.error(error)      
    });
  } 

  fileDownloadPlanos(){
    this.fRecepcionPlanosService.getDownloadFile(this.tramiteIdPlanos,this.archivoPlanos).subscribe(resp=>{
      saveAs(resp,this.archivoPlanos),
      error => console.error(error)      
    });    
  }

/*   getRevision(){
    this.fRecepcionPlanosService.getRevision(this.activatedRoute.snapshot.params.idRevision).subscribe(resp=>{
        console.log(resp);

    })
  } */

  recibirPlanos(){

    
    const fecha = this.formulario.controls['fechaInspeccion'].value

    const unixTimestamp = moment(fecha).unix();

    const dateString = moment.unix(unixTimestamp).format('DD/MM/YYYY');

    //const unixTimestamp2 = moment(dateString).unix();

    console.log('Fecha',fecha);
    console.log('unixTimestamp',unixTimestamp);
    console.log('dateString',dateString);
    //console.log('unixTimestamp2',unixTimestamp2);

 /*    const data = {
      "incorrecto": false,
      "docRecibido": this.formulario.controls['checkboxPlanosRecibidos'].value,
      "fechaInspeccion":this.formulario.controls['fechaInspeccion'].value,//Modificar
      "t01_Rev_PermisoConstruccionMun": {
          "codUbicacion": true,
          "comentarios": "string",
          "comentariosCierre": "string",
          "comentariosInternos": "string",
          "comprobacionNegada": true,
          "corregimientoProyectoId": true,
          "descripcionProyecto": true,
          "distritoProyectoId": true,
          "fechaRevision": null,
          "fechaRevisionInspeccion": null,
          "fechaRevisionPlanos": null,
          "fechaDocRecibidos": this.fechaDocRecibidos,
          "finca": true,
          "folio": true,
          "montoPagar": true,
          "montoPagarFunc": true,
          "montoTotal": true,
          "noViable": this.formulario.controls['checkboxViable'].value,
          "nombreEntidadEvaluadora": true,
          "nombreEntidadEvaluadoraFunc": true,
          "nombreProfesionalIdoneo": true,
          "nombreProfesionalResidente": true,
          "nombrePropietarioTerreno": true,
          "nombreProyecto": true,
          "nombreResp": true,
          "numIdoneidad": true,
          "observacionComprobacion": "string",
          "observaciones": this.formulario.controls['observaciones'].value,
          "pagoElectronico": true,
          "pagoManual": true,
          "provinciaProyectoId": true,
          "revisorRecepcionFisicaPlanos":{
              "revisorId": this.revisorId,
              "tipoRevisorId": {
                  "descripcion": "Arquitecto",
                  "tipoRevisorId": 3,
              }
          },
          "revisionId": this.revisionId,
          "revisionNegada": true,
          "revisorId": null,
          "solicitudConfirmada": true,
          "solicitudId": {
        "solicitudId": this.solicitudId,
      },
          "tipoPropiedadId": true,
          "tomo": true,
          "valorAproxObra": true
      },

      "lstAdjuntos": [
        { "adjuntoId": this.adjuntos[0].adjuntoId, 
          "fecha": this.fecha1,
          "fechaRevision": this.fechaRevision1,
          "nombre": this.adjuntos[0].nombre,
          "rechazado": null,
          "tipoDocumentoId": {
          "diasVigencia": 0, 
          "nombre": this.adjuntos[0].nombre, 
          "tipoDocumentoId": this.adjuntos[0].tipoDocumentoId.tipoDocumentoId,
          },
          "urlAdjunto": this.adjuntos[0].urlAdjunto, 
              "solicitanteId": {
                  "solicitanteId": this.adjuntos[0].solicitanteId.solicitanteId,
              }    
        },
        {
          "adjuntoId": this.adjuntos[1].adjuntoId,
          "fecha": this.fecha2,
          "fechaRevision": this.fechaRevision2,
          "nombre": this.adjuntos[1].nombre,
          "rechazado": null,
          "tipoDocumentoId": {
          "diasVigencia": 0,
          "nombre": this.adjuntos[1].nombre,
          "tipoDocumentoId": this.adjuntos[1].tipoDocumentoId.tipoDocumentoId,
          },
          "urlAdjunto": this.adjuntos[1].urlAdjunto,
              "solicitanteId": {
                  "solicitanteId": this.adjuntos[1].solicitanteId.solicitanteId,
              }
        },
        {
          "adjuntoId": this.adjuntos[2].adjuntoId,
          "fecha": this.fecha3,
          "fechaRevision": this.fechaRevision3,
          "nombre": this.adjuntos[2].nombre,
          "rechazado": null,
          "tipoDocumentoId": {
          "diasVigencia": 0,
          "nombre": this.adjuntos[2].nombre,
          "tipoDocumentoId": this.adjuntos[2].tipoDocumentoId.tipoDocumentoId,
          },
          "urlAdjunto": this.adjuntos[2].urlAdjunto,
              "solicitanteId": {
                  "solicitanteId": this.adjuntos[2].solicitanteId.solicitanteId,
              }
        }
        ]
    } */

    //console.log(data)

    /*this.fRecepcionPlanosService.newRecepcionFisicaPlanos(data).subscribe(resp=>{
      console.log('Respuesta!!!',resp);
      if(resp.codigo === 0)
      { this.register();  }
      else
      { this.fail() }
    })  */ 
    
  }

    register(){  
      Swal.fire(  
        'Recepción de Planos Exitosa!',
        'Haga click para continuar',
        'success',
      ).then((result) => {
        this.router.navigate(['/tramites/tramites-a-revisar/tramites-a-revisar']);
      });  
    }
  
    fail(){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Recepcion Fallida!'
      })
    }


  ngAfterViewInit(): void {
    this.wizard = new KTWizard(this.el.nativeElement, {
      startStep: 1,
      clickableSteps: true
    });

    this.wizard.on('beforeNext', (wizardObj) => {
      
      if (wizardObj.currentStep === 1) {
        if (this.wizard.invalid) {
            this.wizard.markAllAsTouched();
            wizardObj.stop();
          }
      }
    });

    this.wizard.on('change', () => {
      setTimeout(() => {
        KTUtil.scrollTop();
      }, 500);
    });
  }

  ngOnDestroy() 
  { this.wizard = undefined; } 
}