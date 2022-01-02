import { FRevisionDocumentosSellosService } from './f-revision-documentos-sellos.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { KTUtil } from '../../../assets/js/components/util';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import KTWizard from '../../../assets/js/components/wizard';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-f-revision-documentos-sellos',
  templateUrl: './f-revision-documentos-sellos.component.html',
  styleUrls: ['./f-revision-documentos-sellos.component.scss']
})

export class FRevisionDocumentosSellosComponent implements OnInit, AfterViewInit, OnDestroy {
  public formulario:FormGroup;
  public registroPublico:string;
  public certificacion:string;
  public planos:string;
  public checkboxDocRecibido:boolean;
  public checkboxSellos:boolean;
  public fechaInspeccion:number;
  public observaciones:string;
  public archivoRegistroPublico:string;
  public tramiteIdRegistroPublico:number;
  public archivoIdoneo:string;
  public tramiteIdIdoneo:number;
  public archivoPlanos:string;
  public tramiteIdPlanos:number;
  public archivoInformeInspeccion:string;
  public tramiteIdInformeInspeccion:number;
  public solicitudId:number;
  public revisionId:number;
  public revisorId:number;
  public visible:boolean = false;

  @ViewChild('wizard', { static: true }) el: ElementRef;
  wizard: any;

  constructor(private fRevisionDocumentosSellosService:FRevisionDocumentosSellosService, 
              private router:Router, 
              private formBuilder:FormBuilder, 
              private activatedRoute:ActivatedRoute){}

  ngOnInit() {
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
  		certificacion:['', Validators.compose([Validators.required,]),],  
  		planos:['', Validators.compose([Validators.required,]),],
      checkboxRecibidos:[false, Validators.compose([Validators.required,]),],
      fechaInspeccion:[null, Validators.compose([Validators.required,]),],
  		completo:[false, Validators.compose([Validators.required,]),],
      incompleto:[false, Validators.compose([Validators.required,]),],
      noviable:[false, Validators.compose([Validators.required]),],
      informe:['', Validators.compose([Validators.required,]),],
      observaciones:['', Validators.compose([Validators.required,Validators.minLength(5)]),],      
    });

    this.fRevisionDocumentosSellosService.getRevision(this.activatedRoute.snapshot.params.idRevision ).subscribe(resp =>{
      console.log('Respuesta',resp);
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
      this.formulario.controls['checkboxRecibidos'].setValue(resp.t01_Rev_PermisoConstruccionMun.solicitudId.docRecibido);                  
      
      this.archivoRegistroPublico = resp.lstAdjuntos[0].urlAdjunto;
      this.tramiteIdRegistroPublico = resp.lstAdjuntos[0].solicitanteTramiteId.solicitanteTramiteId;        
      this.archivoIdoneo = resp.lstAdjuntos[1].urlAdjunto;
      this.tramiteIdIdoneo = resp.lstAdjuntos[1].solicitanteTramiteId.solicitanteTramiteId;        
      this.archivoPlanos = resp.lstAdjuntos[2].urlAdjunto;
      this.tramiteIdPlanos = resp.lstAdjuntos[2].solicitanteTramiteId.solicitanteTramiteId;
      this.archivoInformeInspeccion = resp.adjuntoInspeccion.urlAdjunto;
      this.tramiteIdInformeInspeccion = resp.adjuntoInspeccion.solicitanteTramiteId.solicitanteTramiteId;
      
      this.solicitudId = resp.t01_Rev_PermisoConstruccionMun.solicitudId.solicitudId;
      this.revisionId = resp.t01_Rev_PermisoConstruccionMun.revisionId;
      this.revisorId = resp.t01_Rev_PermisoConstruccionMun.revisorId; 
    
      let fecha = new Date(resp.t01_Rev_PermisoConstruccionMun.solicitudId.fechaInspeccion);
      fecha.setDate(fecha.getDate()+1);
      this.fechaInspeccion = fecha.getTime();    
    })
  }

  fileDownloadRegistro(){
    this.fRevisionDocumentosSellosService.getDownloadFile(this.tramiteIdRegistroPublico,this.archivoRegistroPublico).subscribe(resp=>{
      saveAs(resp,this.archivoRegistroPublico),
      error => console.error(error)
    });
  }
  
  fileDownloadIdoneo(){
    this.fRevisionDocumentosSellosService.getDownloadFile(this.tramiteIdIdoneo,this.archivoIdoneo).subscribe(resp=>{
      saveAs(resp,this.archivoIdoneo),
      error => console.error(error)      
    });
  } 

  fileDownloadPlanos(){
    this.fRevisionDocumentosSellosService.getDownloadFile(this.tramiteIdPlanos,this.archivoPlanos).subscribe(resp=>{
      saveAs(resp,this.archivoPlanos),
      error => console.error(error)      
    });    
  }

  fileDownloadInformeInspeccion(){
    this.fRevisionDocumentosSellosService.getDownloadFile(this.tramiteIdInformeInspeccion,this.archivoInformeInspeccion).subscribe(resp=>{
      saveAs(resp,this.archivoInformeInspeccion),
      error => console.error(error)
    });
  }

  opcionNoViable(){
    if(this.formulario.controls['noviable'].value == false){
      this.formulario.controls['noviable'].setValue(true);
      this.formulario.controls['completo'].setValue(false);
      this.formulario.controls['incompleto'].setValue(false);
      this.visible = false;
    }
  }

  completo(){
    if(this.formulario.controls['completo'].value == false){
      this.formulario.controls['noviable'].setValue(false);
      this.formulario.controls['completo'].setValue(true);
      this.formulario.controls['incompleto'].setValue(false);
      this.visible = false;
    }
  }

  incompleto(){
    if(this.formulario.controls['incompleto'].value == false){
      this.formulario.controls['noviable'].setValue(false);
      this.formulario.controls['completo'].setValue(false);
      this.formulario.controls['incompleto'].setValue(true);
      this.visible = true;
    }
    else
    { this.visible = false; }
  }


  registrarData(){
    let incorrecto:boolean;

    if(this.formulario.controls['checkboxRecibidos'].value == true &&
        this.formulario.controls['completo'].value == true)
    { incorrecto = false; }
    else
    { incorrecto = true; }

    const data =
    { "solicitudId": this.solicitudId,
      "revisionId": this.revisionId,
      "incorrecto": incorrecto,
      "noViable": this.formulario.controls['noviable'].value,
      "sellosCompletos": this.formulario.controls['completo'].value, 
      "revisorId":this.revisorId,
      "observaciones": this.formulario.controls['observaciones'].value
    }

    console.log(data)

    this.fRevisionDocumentosSellosService.newRevision(data).subscribe(resp=>{
      if(resp.codigo === 0)
      { if(this.formulario.controls['noviable'].value == true)
        { this.noViable();  }
        else
        { if(this.formulario.controls['completo'].value == false){
            this.sellosIncompletos();
          }
          else
          {  this.registerAlert();  } 
        }
      }
      else
      { this.failSubsanar(); }
    })

  }

  newRevision(){
    console.log(this.formulario.controls)
    if(this.formulario.controls['noviable'].value == true || 
       this.formulario.controls['completo'].value == true || 
       this.formulario.controls['incompleto'].value == true)
    { if(this.formulario.controls['incompleto'].value == true && this.formulario.controls['observaciones'].valid == false)
      { this.failObservacion(); }
      else
      { this.registrarData();  }   
    }
    else
    { this.failOpciones(); }    
  }


  registerAlert(){  
    Swal.fire(  
      'Revisión de Trámite Exitosa!',
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
  
  noViable(){  
    Swal.fire(  
      'Trámite No Viable!',
      'Haga click para continuar',
      'info',
      ).then((result) => {
      this.router.navigate(['/tramites/tramites-a-revisar/tramites-a-revisar']);
    });  
  }

  sellosIncompletos(){  
    Swal.fire(  
      '¡Documentos y Sellos Incompletos!',
      'Haga click para continuar',
      'info',
      ).then((result) => {
      this.router.navigate(['/tramites/tramites-a-revisar/tramites-a-revisar']);
    });  
  }  
  
  failOpciones(){
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Debe elegir una opción, Trámite No es Viable o Documentos y Sellos otras entidades'
    })
  }
  
  failObservacion(){
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'El campo Observación es obligatorio!'
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