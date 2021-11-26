import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FSubsanarsolicitudService } from './f-subsanarsolicitud.service';
import { Router } from '@angular/router';
import KTWizard from '../../../assets/js/components/wizard';
import { KTUtil } from '../../../assets/js/components/util';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

interface DatosI{
  id:number;
  nombre:string;
}

@Component({
  selector: 'app-f-subsanarsolicitud',
  templateUrl: './f-subsanarsolicitud.component.html',
  styleUrls: ['./f-subsanarsolicitud.component.scss']
})

export class FSubsanarsolicitudComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('wizard', { static: true }) el: ElementRef;

  submitted = false;
  wizard: any;
  
  public formulario:FormGroup;
  public archivoRegistroPublico:string;
  public tramiteIdRegistroPublico:number;
  public archivoIdoneo:string;
  public tramiteIdIdoneo:number;
  public archivoPlanos:string;
  public tramiteIdPlanos:number;
  public revisionId:number;
  public montoPagar:boolean;
  public montoTotal:boolean;
  public pagoElectronico:boolean;
  public pagoManual:boolean;
  public revisionNegada:boolean;
  public solicitudId:number;
  public adjuntos: Array<any>;
  public tipoProp:string;
  public tipoPropiedad:Array<DatosI> = [];
  public subsanarNombreProyecto:boolean = false;
  public subsanarDescripcionProyecto:boolean = false;
  public subsanarProvincia:boolean = false;
  public subsanarDistrito:boolean = false;
  public subsanarCorregimiento:boolean = false;
  public subsanarTipoPropiedad:boolean = false;
  public subsanarCodigoUbicacion:boolean = false;
  public subsanarFinca:boolean = false;
  public subsanarTomo:boolean = false;
  public subsanarFolio:boolean = false;  
  public subsanarConstructor:boolean = false;
  public subsanarPropietarioTerreno:boolean = false;
  public subsanarValorObra:boolean = false;
  public subsanarNombreProfesionalIdoneo:boolean = false;
  public subsanarnumeroIdoneidad:boolean = false;
  public subsanarNombreProfesionalResidente:boolean = false;
  public subsanarRegistroPublico:boolean = false;
  public subsanarCertificacionIdonea:boolean = false;
  public subsanarPlanos:boolean = false;
  public loadRegistro:boolean = false;
  public loadIdoneidad: boolean;
  public loadPLanos: boolean;
  public uploadRegistroPublico:File;
  public uploadIdoneidad:File;
  public uploadPLanos:File;
  public urlRegistroPublico:string;
  public urlIdoneidad:string;
  public urlPLanos:string;
  public adjuntoRegistroPublico:string;
  public adjuntoCertificacionIdoneo:string;
  public adjuntoPlanos:string;
  public solicitanteTramiteId:number;
  public provincias:Array<any> = [];
  public distritos:Array<any> = [];
  public corregimientos:Array<any> = [];
  public indexProv:number = -1;
  public indexDist:number = 0;
  public indexCorr:number = 0;
  public provincia:string;  
  public distrito:string;
  public corregimiento:string;
  public tipoP:string;
  public solicitante:any;
  public solicitanteId:number;
  public tipoSubsanacion:number;
  public adjuntoIdRegistro:number;
  public adjuntoIdIdoneo:number;
  public adjuntoIdPlanos:number
  public propiedadId:number=0;

  constructor(private fSubsanarsolicitudService:FSubsanarsolicitudService, 
              private router:Router, 
              private formBuilder:FormBuilder, 
              private activatedRoute:ActivatedRoute)
              { this.adjuntos = []; }

  ngOnInit(){
    this.formulario = this.formBuilder.group({
  		nombreProyecto:['', Validators.compose([Validators.required,]),],  
  		descripcionProyecto:['', Validators.compose([Validators.required,]),],  
  		provincia:['', Validators.compose([Validators.required,]),],  
  		distrito:['', Validators.compose([Validators.required,]),],  
  		corregimiento:['', Validators.compose([Validators.required,]),],  
  		tipoPropiedad:['', Validators.compose([Validators.required,]),],  
  		codigoUbicacion:['', Validators.compose([Validators.required,]),],  
  		finca:['', Validators.compose([Validators.required,]),],  
  		tomo:['', Validators.compose([Validators.required,]),],  
  		folio:['', Validators.compose([Validators.required,]),],  
  		constructor:['', Validators.compose([Validators.required,]),],  
  		propietarioTerreno:['', Validators.compose([Validators.required,]),],  
  		valorObra:['', Validators.compose([Validators.required,]),],  
  		nombreProfesionalIdoneo:['', Validators.compose([Validators.required,]),],  
  		numeroIdoneidad:['', Validators.compose([Validators.required,]),],  
  		nombreProfesionalResidente:['', Validators.compose([Validators.required,]),],  
  		registroPublico:['', Validators.compose([Validators.required,]),],  
  		certificacionIdoneo:['', Validators.compose([Validators.required,]),],  
  		planos:['', Validators.compose([Validators.required,]),],  
    });

    this.getSubsanacion();
  }


 getSubsanacion()
 {this.fSubsanarsolicitudService.getSubsanacion(this.activatedRoute.snapshot.params.idSolicitud).subscribe(resp =>{
    console.log('Id',this.activatedRoute.snapshot.params.idSolicitud)
    console.log('Respuesta',resp);
    this.formulario.controls['nombreProyecto'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.nombreProyecto);
    this.formulario.controls['descripcionProyecto'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.descripcionProyecto);
    //this.formulario.controls['provincia'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.provinciaProyectoId.codProvincia);
    //this.formulario.controls['distrito'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.distritoProyectoId.codDistrito);
    //this.formulario.controls['corregimiento'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.corregimientoProyectoId.codCorregimiento);
    //this.formulario.controls['tipoPropiedad'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.tipoPropiedadId.descripcion);
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

    this.archivoRegistroPublico = resp.lstAdjuntos[0].urlAdjunto;
    this.tramiteIdRegistroPublico = resp.lstAdjuntos[0].solicitanteTramiteId.solicitanteTramiteId;
    this.archivoIdoneo = resp.lstAdjuntos[1].urlAdjunto;
    this.tramiteIdIdoneo = resp.lstAdjuntos[1].solicitanteTramiteId.solicitanteTramiteId;
    this.archivoPlanos = resp.lstAdjuntos[2].urlAdjunto;
    this.tramiteIdPlanos = resp.lstAdjuntos[2].solicitanteTramiteId.solicitanteTramiteId;
    this.revisionId = resp.t01_Rev_PermisoConstruccionMun.revisionId;
    this.montoPagar = resp.t01_Rev_PermisoConstruccionMun.montoPagar;
    this.montoTotal = resp.t01_Rev_PermisoConstruccionMun.montoTotal;
    this.pagoElectronico = resp.t01_Rev_PermisoConstruccionMun.pagoElectronico;
    this.pagoManual = resp.t01_Rev_PermisoConstruccionMun.pagoManual;
    this.revisionNegada = resp.t01_Rev_PermisoConstruccionMun.revisionNegada;
    this.solicitudId = parseInt(this.activatedRoute.snapshot.params.idSolicitud)//resp.t01_Rev_PermisoConstruccionMun.solicitudId.solicitudId;
    this.solicitanteTramiteId = resp.t01_Rev_PermisoConstruccionMun.solicitudId.solicitanteTramiteId.solicitanteTramiteId
    this.solicitante = resp.solicitante;
    this.solicitanteId = resp.t01_Rev_PermisoConstruccionMun.solicitudId.solicitanteTramiteId.solicitanteId.solicitanteId
    this.subsanarNombreProyecto = resp.t01_Rev_PermisoConstruccionMun.nombreProyecto;
    this.subsanarDescripcionProyecto = resp.t01_Rev_PermisoConstruccionMun.descripcionProyecto;
    this.subsanarProvincia = resp.t01_Rev_PermisoConstruccionMun.provinciaProyectoId;
    this.subsanarDistrito = resp.t01_Rev_PermisoConstruccionMun.distritoProyectoId;
    this.subsanarCorregimiento = resp.t01_Rev_PermisoConstruccionMun.corregimientoProyectoId;    
    this.subsanarTipoPropiedad = resp.t01_Rev_PermisoConstruccionMun.tipoPropiedadId;
    this.subsanarCodigoUbicacion = resp.t01_Rev_PermisoConstruccionMun.codUbicacion;
    this.subsanarFinca = resp.t01_Rev_PermisoConstruccionMun.finca;
    this.subsanarTomo = resp.t01_Rev_PermisoConstruccionMun.tomo;
    this.subsanarFolio = resp.t01_Rev_PermisoConstruccionMun.folio;
    this.subsanarConstructor = resp.t01_Rev_PermisoConstruccionMun.nombreResp;
    this.subsanarPropietarioTerreno = resp.t01_Rev_PermisoConstruccionMun.nombrePropietarioTerreno;
    this.subsanarValorObra = resp.t01_Rev_PermisoConstruccionMun.valorAproxObra;
    this.subsanarNombreProfesionalIdoneo = resp.t01_Rev_PermisoConstruccionMun.nombreProfesionalIdoneo;
    this.subsanarnumeroIdoneidad = resp.t01_Rev_PermisoConstruccionMun.numIdoneidad;
    this.subsanarNombreProfesionalResidente = resp.t01_Rev_PermisoConstruccionMun.nombreProfesionalResidente;
    this.subsanarRegistroPublico = resp.lstAdjuntos[0].rechazado;
    this.subsanarCertificacionIdonea = resp.lstAdjuntos[1].rechazado;
    this.subsanarPlanos = resp.lstAdjuntos[2].rechazado;

    this.adjuntoIdRegistro = resp.lstAdjuntos[0].adjuntoId;
    this.adjuntoIdIdoneo = resp.lstAdjuntos[1].adjuntoId;
    this.adjuntoIdPlanos = resp.lstAdjuntos[2].adjuntoId;
    
    this.loadRegistro = false;
    this.loadIdoneidad = false;
    this.loadPLanos = false;


    let i = 0;
    resp.lstAdjuntos.forEach(element => {
      this.adjuntos[i] = element
      i++;
    });

    let j = 0;
    resp.lstTiposPropiedad.forEach(element => {
      this.tipoPropiedad[j] = { id:element.tipoPropiedadId, nombre:element.descripcion  };
      j++;
    });

    let k= 0;
    resp.lstProvincias.forEach(element => {
      this.provincias[k] = element;
      k++;
    });

    this.indexProv = resp.t01_Rev_PermisoConstruccionMun.solicitudId.provinciaProyectoId.codProvincia;
    this.indexDist = resp.t01_Rev_PermisoConstruccionMun.solicitudId.distritoProyectoId.codDistrito;
    this.indexCorr = 0;
    this.getCargaGeneral(resp.t01_Rev_PermisoConstruccionMun.solicitudId.provinciaProyectoId.codProvincia)
    
    this.formulario.controls['tipoPropiedad'].setValue(2);    
    this.propiedadId = 2;//= resp.t01_Rev_PermisoConstruccionMun.solicitudId.tipoPropiedadId.tipoPropiedadId;
  })
}


  newSubsanacion(){

    if(this.activatedRoute.snapshot.params.estadoTramiteId == 3)
    { this.tipoSubsanacion = 1 }else 
    if(this.activatedRoute.snapshot.params.estadoTramiteId == 5)
    { this.tipoSubsanacion = 2; }

    const data = 
    { "tipoSubsanacion": this.tipoSubsanacion,
      "revisionId":this.revisionId,
      "t01_Sol_PermisoConstruccionMun":{
          "solicitudId":this.solicitudId,   
          "solicitanteTramiteId": { 
              "solicitanteTramiteId":this.solicitanteTramiteId,
          },
          "nombreProyecto":this.formulario.controls['nombreProyecto'].value,
          "descripcionProyecto": this.formulario.controls['descripcionProyecto'].value,
          "codUbicacion": this.formulario.controls['codigoUbicacion'].value,
          "finca": this.formulario.controls['finca'].value,
          "tomo": this.formulario.controls['tomo'].value,
          "folio": this.formulario.controls['folio'].value,
          "nombreResp": this.formulario.controls['constructor'].value,
          "nombrePropietarioTerreno": this.formulario.controls['propietarioTerreno'].value,
          "nombreProfesionalIdoneo": this.formulario.controls['nombreProfesionalIdoneo'].value,
          "numIdoneidad": this.formulario.controls['numeroIdoneidad'].value,
          "nombreProfesionalResidente": this.formulario.controls['nombreProfesionalResidente'].value,
          "valorAproxObra": this.formulario.controls['valorObra'].value,
          "tipoPropiedadId": {
              "descripcion": this.tipoPropiedad[this.tipoProp].nombre,
              "tipoPropiedadId": this.tipoPropiedad[this.tipoProp].id,
          },
          "provinciaProyectoId":{
             "provinciaId": this.provincias[this.indexProv].provinciaId,
              "regionId": {
                  "regionId": this.provincias[this.indexProv].regionId.regionId,
                  "codRegion": this.provincias[this.indexProv].regionId.codRegion,
                  "nomRegion": this.provincias[this.indexProv].regionId.nomRegion
              },
              "codProvincia": this.provincias[this.indexProv].codProvincia,
              "nomProvincia": this.provincias[this.indexProv].nomProvincia,
          },
          "distritoProyectoId":{
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
          "corregimientoProyectoId":{
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
          }
      },
      "lstAdjuntos": [{
          "adjuntoId": this.adjuntoIdRegistro,
          "solicitanteTramiteId": { 
              "solicitanteTramiteId": this.solicitanteTramiteId,
          },
          "tipoDocumentoId": { 
              "tipoDocumentoId": 1 
          },
          "solicitanteId": {
              "solicitanteId": this.solicitanteId,
          },
          "nombre": this.adjuntoRegistroPublico,
          "urlAdjunto": this.urlRegistroPublico
      },
      {   "adjuntoId": this.adjuntoIdIdoneo,
          "solicitanteTramiteId": { 
              "solicitanteTramiteId": this.solicitanteTramiteId
          },
          "tipoDocumentoId": { 
              "tipoDocumentoId": 2 
          },
          "solicitanteId": {
              "solicitanteId": this.solicitanteId,
          },
          "nombre": this.adjuntoCertificacionIdoneo,
          "urlAdjunto": this.urlIdoneidad
      },
      {   "adjuntoId": this.adjuntoIdPlanos,
          "solicitanteTramiteId": { 
              "solicitanteTramiteId": this.solicitanteTramiteId
          },
          "tipoDocumentoId": { 
              "tipoDocumentoId": 5
          },
          "solicitanteId": {
              "solicitanteId": this.solicitanteId,
          },
          "nombre": this.adjuntoPlanos,
          "urlAdjunto": this.urlPLanos
      }]
    }

    console.log(data)
    
    this.fSubsanarsolicitudService.newSubsanacion(data).subscribe(resp=>{
      console.log('newSubsanacion',resp)
      if(resp.codigo === 0)
      { this.registerAlert(); }
      else
      { this.failSubsanar() }
    }) 
  }

  getTipoPropiedad(){
    this.tipoP = this.tipoPropiedad[this.tipoProp].nombre;
  }

  getCarga(idCorregimiento:number){
    this.corregimiento = this.corregimientos[idCorregimiento].nomCorregimiento
  }

  getCargaDistritos(idProvincia:number){
    if(idProvincia >= 0){
      this.distritos = [];
      this.corregimientos = [];
      const id = this.provincias[idProvincia].provinciaId
      this.provincia = this.provincias[idProvincia].nomProvincia
      this.fSubsanarsolicitudService.getDistritos(id).subscribe(resp=>{
        let i = 0;
        resp.forEach(element => {
          this.distritos[i] = element;
          i++;
        });
      })
    }
  }
  
  getCargaCorregimientos(idDistrito:number){
    this.corregimientos = [];
    const id = this.distritos[idDistrito].distritoId
    this.distrito = this.distritos[idDistrito].nomDistrito
    this.fSubsanarsolicitudService.getCorregimientos(id).subscribe(resp=>{
      let i = 0;
      resp.forEach(element => {
        this.corregimientos[i] = element;
        i++;
      });
    })
  }  

  getCargaGeneral(idProvincia:number)
  { if(idProvincia >= 0){
      this.distritos = [];
      this.corregimientos = [];
      const id = this.provincias[idProvincia].provinciaId
      this.provincia = this.provincias[idProvincia].nomProvincia
      this.fSubsanarsolicitudService.getDistritos(id).subscribe(resp=>{
        let i = 0;
        resp.forEach(element => {
          this.distritos[i] = element;
          i++;
        });
      })
      this.getCargaCorregimientos(this.indexDist);
    }
  }


  fileChangeRegistro(element){
    this.uploadRegistroPublico = element.target.files[0];
    const formData = new FormData();
    formData.append('file', this.uploadRegistroPublico);
    this.fSubsanarsolicitudService.uploadArchivo(formData,this.solicitanteTramiteId).subscribe((resp) => { 
      this.urlRegistroPublico = resp.name;
      this.loadRegistro = true;
      let adjunto = this.formulario.controls['registroPublico'].value
      this.adjuntoRegistroPublico = adjunto.substring(adjunto.indexOf("h",10) + 2)
      this.archivoCargado();

    });
  }
  
  fileChangeIdoneo(element){
    this.uploadIdoneidad = element.target.files[0];
    const formData = new FormData();
    formData.append('file', this.uploadIdoneidad);
    this.fSubsanarsolicitudService.uploadArchivo(formData,this.solicitanteTramiteId).subscribe((resp) => {
      this.urlIdoneidad = resp.name;
      this.loadIdoneidad = true;
      let adjunto = this.formulario.controls['certificacionIdoneo'].value
      this.adjuntoCertificacionIdoneo = adjunto.substring(adjunto.indexOf("h",10) + 2)
      this.archivoCargado();
    });
  }  

  fileChangePlanos(element){
    this.uploadPLanos = element.target.files[0];
    const formData = new FormData();
    formData.append('file', this.uploadPLanos);
    this.fSubsanarsolicitudService.uploadArchivo(formData,this.solicitanteTramiteId).subscribe((resp) => {      
      this.urlPLanos = resp.name;
      this.loadPLanos = true;
      let adjunto = this.formulario.controls['planos'].value
      this.adjuntoPlanos = adjunto.substring(adjunto.indexOf("h",10) + 2)
      this.archivoCargado();
    });
  }

  fileDownloadRegistro(){
    this.fSubsanarsolicitudService.getDownloadFile(this.tramiteIdRegistroPublico,this.archivoRegistroPublico).subscribe(resp=>{
      saveAs(resp,this.archivoRegistroPublico),
      error => console.error(error)
    });
  }

  fileDownloadIdoneo(){
    this.fSubsanarsolicitudService.getDownloadFile(this.tramiteIdIdoneo,this.archivoIdoneo).subscribe(resp=>{
      saveAs(resp,this.archivoIdoneo),
      error => console.error(error)      
    });
  } 

  fileDownloadPlanos(){
    this.fSubsanarsolicitudService.getDownloadFile(this.tramiteIdPlanos,this.archivoPlanos).subscribe(resp=>{
      saveAs(resp,this.archivoPlanos),
      error => console.error(error)      
    });    
  }  

  registerAlert()
  { Swal.fire('Subsanacion de Solicitud Exitosa!',
              'Haga click para continuar',
              'success',
    ).then((result) => {
      this.router.navigate(['/tramites/tramites-pendientes/tramites-pendientes']);
    });  
  }

  failSubsanar()
  { Swal.fire({ icon: 'error',
                title: 'Error',
                text: 'Subsanacion Fallida!'
    })
  }

  archivoCargado()
  { Swal.fire({ position: 'center',
                icon: 'success',
                title: 'Archivo Cargado Exitosamente',
                showConfirmButton: false,
                timer: 1500
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

  onSubmit() 
  { this.submitted = true;  }

  ngOnDestroy() 
  { this.wizard = undefined;  }
}