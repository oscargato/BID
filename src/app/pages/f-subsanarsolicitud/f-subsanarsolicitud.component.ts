import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FSubsanarsolicitudService } from './f-subsanarsolicitud.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import KTWizard from '../../../assets/js/components/wizard';
import { KTUtil } from '../../../assets/js/components/util';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


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
  public adjuntos: Array<any>

  
  constructor(private fSubsanarsolicitudService:FSubsanarsolicitudService, 
              private router:Router, 
              private formBuilder:FormBuilder, 
              private activatedRoute:ActivatedRoute){
                this.adjuntos = [];
              }

  ngOnInit() {

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

  		certificacion:['', Validators.compose([
          Validators.required,
        ]),
      ],  

  		planos:['', Validators.compose([
          Validators.required,
        ]),
      ],  

    });



    this.getSubsanacion();
  }


 getSubsanacion()
 {
  this.fSubsanarsolicitudService.getSubsanacion(this.activatedRoute.snapshot.params.idSolicitud ).subscribe(resp =>{
    console.log('Respuesta AAA',resp);
    
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




    let i = 0;
    resp.lstAdjuntos.forEach(element => {
      this.adjuntos[i] = element
      i++;
    });
    
  })
 }





  newSubsanacion(){

    const hoy = new Date();

    let incorrecto:boolean;

    if(this.formulario.controls['checkboxNombreProyecto'].value === false &&
       this.formulario.controls['checkboxDescripcionProyecto'].value === false &&
       this.formulario.controls['checkboxProvincia'].value === false &&
       this.formulario.controls['checkboxDistrito'].value === false &&
       this.formulario.controls['checkboxCorregimiento'].value === false &&
       this.formulario.controls['checkboxTipoPropiedad'].value === false &&
       this.formulario.controls['checkboxCodigoUbicacion'].value === false &&
       this.formulario.controls['checkboxFinca'].value === false &&
       this.formulario.controls['checkboxTomo'].value === false &&
       this.formulario.controls['checkboxFolio'].value === false &&
       this.formulario.controls['checkboxConstructor'].value === false &&
       this.formulario.controls['checkboxPropietarioTerreno'].value === false &&
       this.formulario.controls['checkboxValorObra'].value === false &&
       this.formulario.controls['checkboxNombreProfesionalIdoneo'].value === false &&
       this.formulario.controls['checkboxNumeroIdoneidad'].value === false &&
       this.formulario.controls['checkboxNombreProfesionalResidente'].value === false &&
       this.formulario.controls['checkboxRegistroPublico'].value === false &&
       this.formulario.controls['checkboxCertificacionIdoneo'].value === false &&
       this.formulario.controls['checkboxPlanos'].value === false)
      { incorrecto = false; }
      else
      { incorrecto = true; }

   

    const data = {
      
    }
    
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







  fileDownloadRegistro(){
    console.log('Nombre Archivo',this.tramiteIdRegistroPublico);
    console.log('Nombre Archivo',this.archivoRegistroPublico);
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
  { Swal.fire(  
      'Subsanacion de Tramite Exitosa!',
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
