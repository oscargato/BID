import { FRevisionDocumentosSellosService } from './f-revision-documentos-sellos.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import KTWizard from '../../../assets/js/components/wizard';
import { KTUtil } from '../../../assets/js/components/util';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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

  @ViewChild('wizard', { static: true }) el: ElementRef;

  model: any = {
    pname: 'Edicion John Wick',
    dproyecto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sed mollis sem, sit amet dictum tortor. Aenean tortor ex, suscipit tempus viverra in, lacinia vel sem.',
    provincia: '8',
    distrito: '8',
    corregimiento: '8',
    tpropiedad: 'Tipo 2',
    cubicacion: 'La Floresta',
    finca: '6',
    tomo: '10',
    folio: '6',
    cresponsable: 'John Wick',
    pterreno: 'Propietario',
    iinspeccion: 'Viggo Tarasov',
    valorobra: '$12,213,456.78',
    npidonio: 'Mrs Wick',
    nidoneidad: '456-879-123',
    npresidente: 'Jose Perez',
    rpublico: '123-564-789',
    cidoneo: 'VIC',
    ccedula: '6-706-1850',
    pasaporte: '1-231-456',
    campos: 'John Wick',
    observaciones: 'John Wick',
  };
  submitted = false;
  wizard: any;

  constructor(private fRevisionDocumentosSellosService:FRevisionDocumentosSellosService, 
    private router:Router, private formBuilder:FormBuilder, 
    private activatedRoute:ActivatedRoute) {}

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
      this.registroPublico = resp.lstAdjuntos[0].urlAdjunto;
      this.certificacion = resp.lstAdjuntos[1].urlAdjunto;
      this.planos = resp.lstAdjuntos[2].urlAdjunto; 
    })

  }


  newRevision(){

    const data = {}
  
    this.fRevisionDocumentosSellosService.newRevision(data).subscribe(resp=>{
  
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
      'Revision de Tramite Exitosa!',
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

  ngAfterViewInit(): void {

   
    // Initialize form wizard
    this.wizard = new KTWizard(this.el.nativeElement, {
      startStep: 1,
      clickableSteps: true
    });

    // Validation before going to next page
    this.wizard.on('beforeNext', (wizardObj) => {
      // https://angular.io/guide/forms
      // https://angular.io/guide/form-validation

      // validate the form and use below function to stop the wizard's step
      // wizardObj.stop();
      if (wizardObj.currentStep === 1) {
        if (this.wizard.invalid) {
            this.wizard.markAllAsTouched();
            wizardObj.stop();
          }
      }
    });

    // Change event
    this.wizard.on('change', () => {
      setTimeout(() => {
        KTUtil.scrollTop();
      }, 500);
    });
  }

  onSubmit() {
    this.submitted = true;
  }

  ngOnDestroy() {
    this.wizard = undefined;
  }
  
}




