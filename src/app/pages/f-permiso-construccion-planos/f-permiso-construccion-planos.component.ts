import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FPermisoConstruccionPlanosService } from './f-permiso-construccion-planos.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import KTWizard from '../../../assets/js/components/wizard';
import { KTUtil } from '../../../assets/js/components/util';


@Component({
  selector: 'app-f-permiso-construccion-planos',
  templateUrl: './f-permiso-construccion-planos.component.html',
  styleUrls: ['./f-permiso-construccion-planos.component.scss']
})

export class FPermisoConstruccionPlanosComponent implements OnInit, AfterViewInit, OnDestroy {


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
    pterreno: 'regular',
    valorobra: '$12,213,456.78',
    npidonio: 'Mrs Wick',
    nidoneidad: '456-879-123',
    npresidente: '3072',
    rpublico: '123-564-789',
    cidoneo: 'VIC',
    ccedula: '6-706-1850',
    pasaporte: '1-231-456',
    campos: 'John Wick',
    observaciones: 'John Wick',
  };
  submitted = false;
  wizard: any;

  constructor(private fPermisoConstruccionPlanosService:FPermisoConstruccionPlanosService, 
    private router:Router) {}

  ngOnInit() {
    this.fPermisoConstruccionPlanosService.getRevision(1).subscribe(resp =>{
      console.log('Respuesta',resp);
    })
  }



  newRevision(){

    const data = {}
  
    this.fPermisoConstruccionPlanosService.newRevisionPlanos(data).subscribe(resp=>{
  
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


