import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FSubsanarsolicitudService } from './f-subsanarsolicitud.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import KTWizard from '../../../assets/js/components/wizard';
import { KTUtil } from '../../../assets/js/components/util';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


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


  constructor(private fSubsanarsolicitudService:FSubsanarsolicitudService, 
              private router:Router, 
              private formBuilder:FormBuilder, 
              private activatedRoute:ActivatedRoute)
              { this.adjuntos = []; }

  ngOnInit(){

    this.formulario = this.formBuilder.group({
      
  		nombreProyecto:['', Validators.compose([
          Validators.required,
        ]),
      ],  

  		descripcionProyecto:['', Validators.compose([
          Validators.required,
        ]),
      ],  

  		provincia:['', Validators.compose([
          Validators.required,
        ]),
      ],  

  		distrito:['', Validators.compose([
          Validators.required,
        ]),
      ],  

  		corregimiento:['', Validators.compose([
          Validators.required,
        ]),
      ],  

  		tipoPropiedad:['', Validators.compose([
          Validators.required,
        ]),
      ],  

  		codigoUbicacion:['', Validators.compose([
          Validators.required,
        ]),
      ],  

  		finca:['', Validators.compose([
          Validators.required,
        ]),
      ],  

  		tomo:['', Validators.compose([
          Validators.required,
        ]),
      ],  

  		folio:['', Validators.compose([
          Validators.required,
        ]),
      ],  

  		constructor:['', Validators.compose([
          Validators.required,
        ]),
      ],  

  		propietarioTerreno:['', Validators.compose([
          Validators.required,
        ]),
      ],  

  		valorObra:['', Validators.compose([
          Validators.required,
        ]),
      ],  

  		nombreProfesionalIdoneo:['', Validators.compose([
          Validators.required,
        ]),
      ],  

  		numeroIdoneidad:['', Validators.compose([
          Validators.required,
        ]),
      ],  

  		nombreProfesionalResidente:['', Validators.compose([
          Validators.required,
        ]),
      ],  

  		registroPublico:['', Validators.compose([
          Validators.required,
        ]),
      ],  

  		certificacionIdoneo:['', Validators.compose([
          Validators.required,
        ]),
      ],  

  		planos:['', Validators.compose([
          Validators.required,
        ]),
      ],  

    });

    this.getSubsanacion();
    this.subsanarNombreProyecto = false;
    this.subsanarDescripcionProyecto = true;
    this.subsanarProvincia = true;
    this.subsanarDistrito = true;
    this.subsanarCorregimiento = true;    
    this.subsanarTipoPropiedad = true;
    this.subsanarCodigoUbicacion = true;
    this.subsanarFinca = true;
    this.subsanarTomo = true;
    this.subsanarFolio = true;
    this.subsanarConstructor = true;
    this.subsanarPropietarioTerreno = true;
    this.subsanarValorObra = true;
    this.subsanarNombreProfesionalIdoneo = true;
    this.subsanarnumeroIdoneidad = true;
    this.subsanarNombreProfesionalResidente = true;

    this.subsanarRegistroPublico = false;
    this.subsanarCertificacionIdonea = false;
    this.subsanarPlanos = false;


    this.loadRegistro = false;
    this.loadIdoneidad = false;
    this.loadPLanos = false;
  }


 getSubsanacion()
 {
  this.fSubsanarsolicitudService.getSubsanacion(this.activatedRoute.snapshot.params.idSolicitud ).subscribe(resp =>{
    console.log('Resp AAA',resp);
    this.formulario.controls['nombreProyecto'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.nombreProyecto);
    this.formulario.controls['descripcionProyecto'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.descripcionProyecto);
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
    this.solicitudId = resp.t01_Rev_PermisoConstruccionMun.solicitudId.solicitudId
    this.solicitanteTramiteId = resp.t01_Rev_PermisoConstruccionMun.solicitudId.solicitanteTramiteId.solicitanteTramiteId

    /*
    this.subsanarNombreProyecto
    this.subsanarDescripcionProyecto
    this.subsanarCodigoUbicacion
    */

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
  })
 }


  newSubsanacion(){
    const hoy = new Date();
    let incorrecto:boolean;
    const data = {}
    
    /*
    this.fSubsanarsolicitudService.newSubsanacion(data).subscribe(resp=>{
      console.log('newSubsanacion',resp)
      if(resp.codigo === 0)
      { this.registerAlert(); }
      else
      { this.failSubsanar() }
    })
    */
  }






  getTipoPropiedad(){
    //this.tipoPropiedad = resp.
  }













  fileChangeRegistro(element){
    this.uploadRegistroPublico = element.target.files[0];
    const formData = new FormData();
    formData.append('file', this.uploadRegistroPublico);
    this.fSubsanarsolicitudService.uploadArchivo(formData,this.solicitanteTramiteId).subscribe((resp) => { 
      console.log('D',resp);
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
      console.log('D',resp);
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
      console.log('D',resp);
      this.urlPLanos = resp.name;
      this.loadPLanos = true;
      let adjunto = this.formulario.controls['planos'].value
      this.adjuntoPlanos = adjunto.substring(adjunto.indexOf("h",10) + 2)
      this.archivoCargado();
    });
  }

  fileDownloadRegistro(){
    console.log(this.tramiteIdRegistroPublico)
    console.log(this.archivoRegistroPublico)
    this.fSubsanarsolicitudService.getDownloadFile(this.tramiteIdRegistroPublico,this.archivoRegistroPublico).subscribe(resp=>{
      console.log('DownloadRegistro',resp);
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
  { Swal.fire(  
      'Subsanacion de Solicitud Exitosa!',
      'Haga click para continuar',
      'success',
    ).then((result) => {
      this.router.navigate(['/tramites/tramites-a-revisar/tramites-a-revisar']);
    });  
  }

  failSubsanar()
  { Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Subsanacion Fallida!'
    })
  }


  archivoCargado(){
    Swal.fire({ position: 'center',
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
