import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import KTWizard from '../../../assets/js/components/wizard';
import { KTUtil } from '../../../assets/js/components/util';


@Component({
  selector: 'app-f-aprobacion-tramite',
  templateUrl: './f-aprobacion-tramite.component.html',
  styleUrls: ['./f-aprobacion-tramite.component.scss']
})

export class FAprobacionTramiteComponent implements OnInit, AfterViewInit, OnDestroy {


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
    pterreno: 'Arrendador',
    iinspeccion: '',
    valorobra: '$12,213,456.78',
    npidonio: 'Mrs Wick',
    nidoneidad: '456-879-123',
    npresidente: 'Jose Perez',
    rpublico: '123-564-789',
    cidoneo: 'VIC',
    ccedula: '6-706-1850',
    pasaporte: '1-231-456',
    monto: '$12,213,456.78',
    observaciones: 'John Wick',
  };
  submitted = false;
  wizard: any;

  constructor() {}

  ngOnInit() {
  }

  /*openDialog3() {
    const dialogRef = this.dialog.open(Modal3Component, {
      height: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }*/

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


